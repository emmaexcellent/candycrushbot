import { Query } from "appwrite";
import { databases } from "./config";


const databaseId = `${process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!}`;

const collectionId = `${process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID!}`;

// Function to create a user
export async function createUser(address: string) {
  try {
    const response = await databases.createDocument(
      databaseId,
      collectionId,
      "unique()",
      {
        address,
        claimed_coin: 0
      }
    );
    console.log("User created successfully:", response);
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

// Function to fetch users ordered by points
export async function fetchUsersOrderedByPoints() {
  try {
    const response = await databases.listDocuments(databaseId, collectionId, [
      Query.orderAsc('claimed_coin')
    ]);
    console.log('Users ordered by points:', response.documents);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

// Function to fetch users with a specific address value
export async function fetchUsersByAddress(address: string) {
  try {
    const response = await databases.listDocuments(databaseId, collectionId, [
      Query.equal('address', address)
    ]);
    return response.documents[0];
  } catch (error) {
    console.error('Error fetching users:', error);
    return null
  }
}

// Function to update user's claimed_coin and score
export const updateUserScore = async (
  userId: string,
  data: { credit_points: number }
) => {
  return await databases.updateDocument(databaseId, collectionId, userId, data);
};