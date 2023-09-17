const { createContext, useState, useEffect } = require("react");

const NotificationContext = createContext({
    notification: null,
    showNotification: () => { },
    hideNotification: () => { },
});

export function NotificationContextProvider({ children }) {
    const [activeNotification, setActiveNotification] = useState({});

    useEffect(() => {
        if (
            activeNotification &&
            (activeNotification.status === "success" ||
                activeNotification.status === "error")
        ) {
            const timer = setTimeout(() => {
                setActiveNotification(null);
            }, 3000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [activeNotification]);

    function showNotification(notificationData) {
        setActiveNotification(notificationData);
    }

    function hideNotification() {
        setActiveNotification(null);
    }

    return (
        <NotificationContext.Provider
            value={{
                showNotification,
                hideNotification,
                notification: activeNotification,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

export default NotificationContext;
