// userModel.ts
import db, { User } from "./db.js";

/**
 * Retrieves a user by their corbadoUserId.
 * @param corbadoUserId - The unique corbadoUserId of the user.
 * @returns The user object or undefined if not found.
 */
export function getUser(corbadoUserId?: string): User | undefined {
    return db.data.users.find((user) => user.corbado_user_id === corbadoUserId);
}

/**
 * Inserts a new user into the database.
 * @param corbadoUserId - The unique corbadoUserId of the user.
 * @returns The newly created user object.
 */
export async function insertUser(corbadoUserId: string) {
    // check if user already exists
    if (getUser(corbadoUserId)) {
        throw new Error("User already exists");
    }
    const user = {
        id: crypto.randomUUID(),
        corbado_user_id: corbadoUserId,
        city: null,
    };
    await db.update(({ users }) => users.push(user));
    return user;
}

/**
 * Updates the city of a user identified by corbadoUserId.
 * @param corbadoUserId - The unique corbadoUserId of the user.
 * @param city - The new city to set.
 */
export async function updateUserCity(corbadoUserId: string, city: string) {
    await db.update(({ users }) => {
        const user = users.find(
            (user) => user.corbado_user_id === corbadoUserId,
        );
        if (user) {
            user.city = city;
        }
    });
}
