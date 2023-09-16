import { connectDatabase, insertDocument } from "@/helpers/db-util";

async function handler(req, res) {
    if (req.method === "POST") {
        const userEmail = req.body.email;

        if (!userEmail || !userEmail.includes("@")) {
            res.status(422).json({ message: "Invalid email address" });
            return;
        }

        let client;

        try {
            client = await connectDatabase();
            await insertDocument(client, 'newsletter', { email: userEmail });
        } catch (error) {
            res
                .status(500)
                .json({ message: "There is something wrong in using database" });
        }

        client.close();
        res.status(201).json({ message: "Signed up!" });
    }
}

export default handler;
