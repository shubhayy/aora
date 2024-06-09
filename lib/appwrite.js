import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
    Storage,
  } from "react-native-appwrite";
  

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.aora',
    projectId: '6664ec42000f3ef3c342',
    databaseId: '6664ed460006c20583f1',
    userCollectionId: '6664ed600014bef025c9',
    videoCollectionId: '6664ed7d000ecb269e8a',
    storageId: '6664ee7900382cd70cb5'
}


const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;


const account = new Account(client);
const avatars = new Avatars(client)
const databases = new Databases(client)

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(), 
            email,
            password,
            username
        )

        if (!newAccount) throw error

        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password)

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
              accountId: newAccount.$id,
              email: email,
              username: username,
              avatar: avatarUrl,
            }
          );
            

        return newUser
    } catch (error) {
      console.log(error)
      throw new Error(error)
 }}


export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password)

        return session
    } catch (error) {
        throw new Error(error)
    }
}