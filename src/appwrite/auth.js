import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)  // Set Appwrite endpoint
            .setProject(conf.appwriteProjectId);  // Set Appwrite project ID
        this.account = new Account(this.client);  // Initialize the Account service
    }

    // Create a new user account and log in
    async createAccount({ email, password, name }) {
        const userAccount = await this.account.create(ID.unique(), email, password, name);  // Create the user account
        if (userAccount) {
            return this.login({ email, password });  // Automatically log in after account creation
        } else {
            return userAccount;
        }
    }

    // Log in with email and password
    async login({ email, password }) {
        return await this.account.createEmailPasswordSession(email, password);  // Create a session for the user
    }

    // Get the currently logged-in user
    async getCurrentUser() {
        return await this.account.get();  // Fetch the current user
    }

    // Log out the current user
    async logout() {
        return await this.account.deleteSessions();  // Delete all sessions for the user
    }
}

const authService = new AuthService();

export default authService;
