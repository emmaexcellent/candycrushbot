import { Client, Databases } from 'appwrite';

// Initialize the Appwrite client
const client = new Client();
client
  .setEndpoint(`${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!}`) // Your Appwrite Endpoint
  .setProject(`${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!}`); // Your project ID

// Initialize the Databases service
const databases = new Databases(client);

export { client, databases };