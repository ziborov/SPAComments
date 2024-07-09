import * as FileSystem from 'expo-file-system';

import * as SQLite from 'expo-sqlite';

const util = require('util');

export class DatabaseHelper {

    private readonly SPADatabaseName: string = "";

    private openDatabaseStep: number = 0;

    private dbName: string = "";

    private dbStep: number = 0;

    private readonly dbDir: string = "";

    private db : any;

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

        this.db = await SQLite.openDatabaseAsync(sqlLiteName);

        console.log(`db isPromise ${util.types.isPromise(this.db)}`);

        await this.db.execAsync(`
PRAGMA journal_mode = WAL;
CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, avatar TEXT NOT NULL, user_name TEXT NOT NULL,  email TEXT NOT NULL,  home_page TEXT NOT NULL,  captcha TEXT NOT NULL,  text TEXT NOT NULL);
`);

        await this.db.execAsync(`
INSERT INTO users (id, avatar, user_name, email, home_page, captcha, text) VALUES (0, 'user01.png', 'Rum_8', 'Rum_8@gmail.com', 'https://www.linkedin.com/in/oleksandr-ziborov-10589192/', '12345', 'Everybody of us understood clear things: Eliminating external contradictions provides ample opportunities!' );
INSERT INTO users (id, avatar, user_name, email, home_page, captcha, text) VALUES (1, 'user02.png', 'Anonym', 'Anonym@gmail.com', 'https://www.linkedin.com/in/oleksandr-ziborov-10589192/', '67890', 'Suddenly, careful research of competitors, which represent a clear example of the continental European type of political culture, will be associatively distributed across industries.' );
INSERT INTO users (id, avatar, user_name, email, home_page, captcha, text) VALUES (2, 'user03.png', 'Oleks', 'oleksandrziborov@gmail.com', 'https://www.linkedin.com/in/oleksandr-ziborov-10589192/', '09876', 'Life is life.' );
`);

        const firstRow = await this.db.getFirstAsync('SELECT * FROM users');

        console.log(firstRow.id, firstRow.avatar, firstRow.user_name, firstRow.email, firstRow.home_page, firstRow.captcha, firstRow.text);

        const allRows = await this.db.getAllAsync('SELECT * FROM users');

        for (const row of allRows) {

            console.log(`id: ${row.id}, avatar: ${row.avatar}, user_name: ${row.user_name}, email: ${row.email}, home_page: ${row.home_page}, captcha: ${row.captcha}, text: ${row.text}`);

        }

        //return this.db;

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