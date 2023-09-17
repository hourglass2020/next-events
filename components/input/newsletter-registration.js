import { useContext, useRef } from "react";
import classes from "./newsletter-registration.module.css";
import NotificationContext from "@/store/notification-context";

function NewsletterRegistration() {
    const { showNotification } = useContext(NotificationContext);
    const emailInputRef = useRef();

    function registrationHandler(event) {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;

        showNotification({
            title: "Loading...",
            message: "Registering for new acount.",
            status: "pending",
        });

        fetch("api/newsletter", {
            method: "POST",
            body: JSON.stringify({ email: enteredEmail }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) =>
                showNotification({
                    title: "Success!",
                    message: "Registered Successfully!",
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
        <section className={classes.newsletter}>
            <h2>Sign up to stay updated!</h2>
            <form onSubmit={registrationHandler}>
                <div className={classes.control}>
                    <input
                        type="email"
                        id="email"
                        placeholder="Your email"
                        aria-label="Your email"
                        ref={emailInputRef}
                    />
                    <button>Register</button>
                </div>
            </form>
        </section>
    );
}

export default NewsletterRegistration;
