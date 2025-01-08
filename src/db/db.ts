import { JSONFilePreset } from "lowdb/node";

export interface User {
    id: string;
    corbado_user_id: string;
    city: string | null;
}

// use lowdb for a simple in-memory json database, that persists to disk
const defaultData: { users: User[] } = { users: [] };
const db = await JSONFilePreset(`${process.cwd()}/db.json`, defaultData);

export default db;
