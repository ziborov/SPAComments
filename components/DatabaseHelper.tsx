import * as FileSystem from 'expo-file-system';

import * as SQLite from 'expo-sqlite';

import {Asset} from 'expo-asset';

import {DATABASE_NAME} from '@/constants/DatabaseConst';

const util = require('util');

export class DatabaseHelper {

    private readonly SPADatabaseName: string = "";

    private openDatabaseStep: number = 0;

    private dbName: string = "";

    private dbStep: number = 0;

    private readonly dbDir: string = "";

    constructor(SPADatabaseName) {

        this.SPADatabaseName = SPADatabaseName;

        this.openDatabaseStep = 0;

        this.dbDir = FileSystem.cacheDirectory + 'db/';

    }

    async getDirInfo() {

        let dirInfo = await FileSystem.getInfoAsync(this.dbDir);

        return dirInfo;

    }

    async createDir() {

        console.log(`Db directory doesn't exist, ${this.dbDir} creating… `);

        const createdDbDirResult = await FileSystem.makeDirectoryAsync(this.dbDir, {intermediates: true});

        return createdDbDirResult;

    }

    async createSQLLite(sqlLiteName) {

        const db = await SQLite.openDatabaseAsync(sqlLiteName);

        console.log(`db isPromise ${util.types.isPromise(db)}`);

        await db.execAsync(`
PRAGMA journal_mode = WAL;
CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, avatar TEXT NOT NULL, user_name TEXT NOT NULL,  email TEXT NOT NULL,  home_page TEXT NOT NULL,  captcha TEXT NOT NULL,  text TEXT NOT NULL);
INSERT INTO users (id, avatar, user_name, email, home_page, captcha, text) VALUES (0, 'SPA01.png', 'Rum_8', 'Rum_8@gmail.com', 'https://www.linkedin.com/in/oleksandr-ziborov-10589192/', '12345', 'Everybody of us understood clear things: Eliminating external contradictions provides ample opportunities!' );
INSERT INTO users (id, avatar, user_name, email, home_page, captcha, text) VALUES (1, 'SPA02.png', 'Anonym', 'Anonym@gmail.com', 'https://www.linkedin.com/in/oleksandr-ziborov-10589192/', '67890', 'Suddenly, careful research of competitors, which represent a clear example of the continental European type of political culture, will be associatively distributed across industries.' );

`);

        const firstRow = await db.getFirstAsync('SELECT * FROM users');

        console.log(`id: ${firstRow.id}, avatar: ${firstRow.avatar}, user_name: ${firstRow.user_name}`);


        return db;

    }

    async dbUsersCreated(dbTable) {

        const dbTableCreate = await dbTable.execAsync(`
CREATE TABLE users ( "id" INTEGER, "avatar" TEXT, "email" TEXT, "home_page" TEXT, "captcha" TEXT, "text" TEXT, PRIMARY KEY("id" AUTOINCREMENT) );
INSERT INTO users (value, intValue) VALUES ('test1', 123);
`);

        return dbTableCreate;

    }

    async initTableDB(db) {


    }

    openDatabase(openDatabaseStep) {

        this.openDatabaseStep = openDatabaseStep;

        switch (this.openDatabaseStep) {

            case 0: //Db directory doesn't exist, ${this.dbDir} creating…

                console.log(`dbDir: ${this.dbDir}`);

                let dirInfo = this.getDirInfo();

                console.log(`dirInfo: ${dirInfo} `);

                dirInfo.then(dirInfo => {

                    if (!dirInfo.exists) {

                        this.createDir().then(r => console.log(`Dir created!!`));

                    } else {

                        this.dbStep = 1;

                        this.dbName = this.dbDir + this.SPADatabaseName;

                    }

                })

                break;

            case 1:

                console.log(`Create SQLite db ${this.SPADatabaseName}`);

                const dbSQLLite = this.createSQLLite(this.SPADatabaseName);

                this.dbStep = 2;

                break;

            // default:
            //
            //     console.log(`Error! openDatabaseStep: ${this.openDatabaseStep}`);

        }

        return this.dbStep;

    }


}