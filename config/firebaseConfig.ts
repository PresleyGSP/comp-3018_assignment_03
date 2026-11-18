import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
// Replace with your actual service account file name
import serviceAccount from "../comp-3018-assignment-03-f60a2-firebase-adminsdk-fbsvc-f75968a633.json";

// Initialize the Firebase app with the service account credentials
initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
});

// Get a reference to the Firestore service
const db: Firestore = getFirestore();

export { db };