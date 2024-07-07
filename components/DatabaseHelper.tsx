import * as FileSystem from 'expo-file-system';

import * as SQLite from 'expo-sqlite';

import { Asset } from 'expo-asset';

import { DATABASE_NAME } from '@/constants/DatabaseConst';

export class DatabaseHelper {

    private SPADatabaseName: any;

    private openDatabaseStep: any;

    private db: any;

    private dbStep: any;

    private dbDir: any;

    constructor (SPADatabaseName, openDatabaseStep) {

        this.SPADatabaseName = SPADatabaseName;

        this.openDatabaseStep = openDatabaseStep;

    }

    async getDirInfo () {

        let dirInfo = await FileSystem.getInfoAsync(this.dbDir);

        return dirInfo;

    }

    async createDir () {

        console.log(`Db directory doesn't exist, creating…`);

        await FileSystem.makeDirectoryAsync(this.dbDir, { intermediates: true });

    }

    openDatabase(openDatabaseStep)  {

        this.openDatabaseStep = openDatabaseStep;

        switch (this.openDatabaseStep) {

            case 0:

                this.dbDir = FileSystem.cacheDirectory + 'db/';

                console.log(`dbDir: ${this.dbDir}`);

                let dirInfo = this.getDirInfo();

                console.log(`dirInfo: ${dirInfo} `);

                dirInfo.then(dirInfo => {

                    if (!dirInfo.exists) {

                        console.log("Gif directory doesn't exist, creating…");

                        this.createDir().then(r => console.log(`create db dir result ${r}`));

                    }

                })

                break;
            
            default:
                
                console.log(`Error! openDatabaseStep: ${this.openDatabaseStep}`);

        }

        return this.dbStep;

    }




}