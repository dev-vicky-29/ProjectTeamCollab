import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

// Create the context
export const NotificationContext = createContext({
  notifications: [],
  fetchNotifications: () => {},
  markAsRead: () => {},
});

// NotificationProvider component
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchNotifications = async () => {
    if (user) {
      try {
        const response = await fetch("http://localhost:5000/api/notifications", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    }
  };

  const markAsRead = async (id) => {
    if (user) {
      try {
        await fetch("http://localhost:5000/api/notifications/mark-read", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ notificationId: id }),
        });
        setNotifications(notifications.map((notif) => (notif._id === id ? { ...notif, isRead: true } : notif)));
      } catch (error) {
        console.error("Error marking notification as read:", error);
      }
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [user]);

  return (
    <NotificationContext.Provider value={{ notifications, fetchNotifications, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

// No need for export default here as we've explicitly exported NotificationContext