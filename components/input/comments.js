import { useContext, useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "@/store/notification-context";

function Comments(props) {
    const { eventId } = props;

    const { showNotification, hideNotification } = useContext(NotificationContext);

    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);

    useEffect(() => {
        if (showComments) {
            fetch(`/api/comments/${eventId}`)
                .then((res) => res.json())
                .then((data) => setComments(data));
        }
    }, [showComments]);

    function toggleCommentsHandler() {
        setShowComments((prevStatus) => !prevStatus);
    }

    function addCommentHandler(commentData) {
        showNotification({
            title: "Loading...",
            message: "Loading event's comments.",
            status: "pending",
        });

        fetch(`/api/comments/${eventId}`, {
            method: "POST",
            body: JSON.stringify(commentData),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) =>
                showNotification({
                    title: "Success!",
                    message: "Loaded Successfully!",
                    status: "success",
                })
            )
            .catch((error) =>
                showNotification({
                    title: "Error!",
                    message: "Try Again!",
                    status: "error",
                })
            );
    }

    return (
        <section className={classes.comments}>
            <button onClick={toggleCommentsHandler}>
                {showComments ? "Hide" : "Show"} Comments
            </button>
            {showComments && <NewComment onAddComment={addCommentHandler} />}
            {showComments && <CommentList items={comments} />}
        </section>
    );
}

export default Comments;
