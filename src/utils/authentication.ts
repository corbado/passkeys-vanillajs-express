import { Config, SDK } from "@corbado/node-sdk";
import { Request } from "express";

const projectID = process.env.CORBADO_PROJECT_ID;
const apiSecret = process.env.CORBADO_API_SECRET;
if (!projectID) {
    throw Error("Project ID is not set");
}
if (!apiSecret) {
    throw Error("API secret is not set");
}
const frontendAPI = process.env.CORBADO_FRONTEND_API;
const backendAPI = process.env.CORBADO_BACKEND_API;
if (!frontendAPI) {
    throw Error("Frontend API URL is not set");
}
if (!backendAPI) {
    throw Error("Backend API URL is not set");
}

// Initialize the Corbado Node.js SDK with the configuration
const config = new Config(projectID, apiSecret, frontendAPI, backendAPI);
const sdk = new SDK(config);

export async function getAuthenticatedUserFromCookie(req: Request) {
    // Assuming you're using a cookie parsing middleware like cookie-parser
    const sessionToken = req.cookies?.cbo_session_token;

    if (!sessionToken) {
        return null;
    }

    try {
        // Your existing token validation logic
        return await sdk.sessions().validateToken(sessionToken);
    } catch (error) {
        // Log the error if needed
        return null;
    }
}

export async function getAuthenticatedUserFromAuthorizationHeader(
    req: Request,
) {
    const sessionToken = req.headers.authorization?.replace("Bearer ", "");
    if (!sessionToken) {
        return null;
    }
    try {
        return await sdk.sessions().validateToken(sessionToken);
    } catch {
        return null;
    }
}

// Retrieve all identifiers for a given user ID
export function getUserIdentifiers(userId: string) {
    // List user identifiers sorted by creation date in descending order
    return sdk.identifiers().listByUserId(userId);
}
