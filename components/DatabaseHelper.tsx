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

        //const db = await SQLite.openDatabaseAsync(sqlLiteName);
        const db = await SQLite.openDatabaseAsync("sqlLiteName");

        return db;

    }

    async dbUsersCreated(dbTable) {

        const dbTableCreate = await dbTable.execAsync(`
CREATE TABLE "users" ( "id" INTEGER, "avatar" TEXT, "email" TEXT, "home_page" TEXT, "captcha" TEXT, "text" TEXT, PRIMARY KEY("id" AUTOINCREMENT) )
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

                //console.log(`Create SQLite db ${this.dbName}`);
                console.log(`Create SQLite: sqlLiteName`);

                const db = this.createSQLLite(this.dbName);

                console.log(`db isPromise ${util.types.isPromise(db)}`);

                if (util.types.isPromise(db)) {

                    db.then(dbBase => {

                        const dbUsers = this.dbUsersCreated(dbBase);

                        console.log(`dbUsers isPromise ${util.types.isPromise(dbUsers)}`);

                        // if (util.types.isPromise(dbUsers)) {
                        //
                        //     this.dbUsersCreate(dbUsers).then(res => {
                        //
                        //         console.log(``)
                        //
                        //     })
                        //
                        // }

                    })

                }


                // this.initTableDB(db).then(r => {
                //
                //     console.log(`initTableDB worked`);
                //
                //     this.dbStep = 2;
                //
                //     }
                // );

                this.dbStep = 2;

                break;

            // default:
            //
            //     console.log(`Error! openDatabaseStep: ${this.openDatabaseStep}`);

        }

        return this.dbStep;

    }


}