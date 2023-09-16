import {
    connectDatabase,
    getAllDocuments,
    insertDocument,
} from "@/helpers/db-util";

export default async function handler(req, res) {
    const eventId = req.query.eventId;

    const client = await connectDatabase();

    if (req.method === "POST") {
        const { email, name, text } = req.body;

        if (
            !email ||
            !email.includes("@") ||
            !name ||
            name.trim() === "" ||
            !text ||
            text.trim() === ""
        ) {
            res.status(422).json({ message: "Invalid Inputs." });
            return;
        }

        const newComment = {
            email,
            name,
            text,
            _eventId: eventId,
        };

        const comment = await insertDocument(client, "comments", newComment);

        res.status(201).json({ message: "Added comment.", comment });
    }

    if (req.method === "GET") {
        const comments = await getAllDocuments(
            client,
            "comments",
            { _id: -1 },
            { _eventId: eventId }
        );

        res.status(200).json(comments);
    }

    client.close();
}
