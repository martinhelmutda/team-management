
import React, { createContext, useState, useContext } from "react";

type NotificationType = "success" | "error";

type Notification = {
    type: NotificationType;
    message: string;
};

type NotificationContextType = {
    notification: Notification | null;
    setNotification: (notif: Notification | null) => void;
};

const NotificationContext = createContext<NotificationContextType>({
    notification: null,
    setNotification: () => { },
});

export function useNotification() {
    return useContext(NotificationContext);
}

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const [notification, setNotification] = useState<Notification | null>(null);

    return (
        <NotificationContext.Provider value={{
            notification,
            setNotification
        }}>
            {children}
        </NotificationContext.Provider>
    );
};