import * as FileSystem from 'expo-file-system';

import * as SQLite from 'expo-sqlite';

import { Asset } from 'expo-asset';

import { DATABASE_NAME } from '@/constants/DatabaseConst';



export async function openDatabase(pathToDatabaseFile: string): Promise<SQLite.WebSQLDatabase> {
    if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
    }
    const asset = await Asset.fromModule(require(pathToDatabaseFile)).downloadAsync();
    // await FileSystem.copyAsync({
    //     from: asset.localUri,
    //     to: FileSystem.documentDirectory + 'SQLite/myDatabaseName.db',
    // });
    return SQLite.openDatabase('myDatabaseName.db');
}