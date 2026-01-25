// useFCMToken.js
import { useState } from "react";
import { getToken } from "firebase/messaging";
import { messaging } from "../firebaseConfig"; // your FCM config

export default function useFCMToken() {
  const [tokenFCM, setTokenFCM] = useState(null);

  const requestFCMToken = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        alert("Notification permission denied");
        return null;
      }

      const currentToken = await getToken(messaging, {
        vapidKey:
          "BJaCVlPk2rtyvZVHINMRXmFq7kHIF2PoabZtauusqaqlZbScEUSw5TZz1itfV9vOwIsx6-qzlkDC3HRO_Ypo9kU",
      });

      if (currentToken) {
        setTokenFCM(currentToken);
        return currentToken;
      }
      return null;
    } catch (err) {
      console.error("Error getting FCM token:", err);
      return null;
    }
  };

  return { tokenFCM, requestFCMToken };
}
