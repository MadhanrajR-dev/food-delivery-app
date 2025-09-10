import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path'

const serviceAccountPath = path.resolve('./config/serviceAccountKey.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath,'utf-8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const handleNotification = async (title, body, token) => {
  if(!token || typeof token !== "string"){
    console.log("token is not valid");
    return;  
  }
  const message = {
    notification: { title, body },
    token,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log(" Message sent successfully!",response);
  } catch (error) {
    console.error(" Error sending message:", error);
  }
};

export default handleNotification;
