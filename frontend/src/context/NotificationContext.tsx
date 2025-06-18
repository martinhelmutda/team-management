
import React, { createContext, useState, useContext } from "react";

type NotificationType = "success" | "error";

type Notification = {
    type: NotificationType;
    message: string;
};

type NotificationContextType = {
    notification: Notification | null;
    setNotification: (notif: Notification | null) => void;
    // showNotification: (message: string, type?: NotificationType) => void;
    // hideNotification: () => void;
};

const NotificationContext = createContext<NotificationContextType>({
    notification: null,
    setNotification: () => { },
    // showNotification: () => { },
    // hideNotification: () => { },
});

export function useNotification() {
    return useContext(NotificationContext);
}

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const [notification, setNotification] = useState<Notification | null>(null);


    // const showNotification = (message: string, type: NotificationType = 'success') => {
    //     setNotification({ message, type });

    //     // Auto-hide after 4 seconds
    //     setTimeout(() => {
    //         setNotification(null);
    //     }, 4000);
    // };

    // const hideNotification = () => {
    //     setNotification(null);
    // };

    return (
        <NotificationContext.Provider value={{
            notification,
            setNotification
            // showNotification,
            // hideNotification
        }}>
            {children}
        </NotificationContext.Provider>
    );
};