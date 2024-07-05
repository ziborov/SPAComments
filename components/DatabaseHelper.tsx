import * as SQLite from 'expo-sqlite';
import { DATABASE_NAME } from '@/constants/DatabaseConst';

const db = await SQLite.openDatabaseAsync(DATABASE_NAME);


export async function InitDBTable() {

    await db.execAsync(`
PRAGMA journal_mode = WAL;
CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
INSERT INTO test (value, intValue) VALUES ('test1', 123);
INSERT INTO test (value, intValue) VALUES ('test2', 456);
INSERT INTO test (value, intValue) VALUES ('test3', 789);
`);


}