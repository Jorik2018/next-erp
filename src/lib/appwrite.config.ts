import { Client, Databases, Messaging, TablesDB, Users, Storage } from "node-appwrite";

export const {
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
} = process.env;

const client = new Client();

client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!);

export const databases = new Databases(client);
export const users = new Users(client);
export const messaging = new Messaging(client);
export const storage = new Storage(client);
export const tablesDB = new TablesDB(client);
