import * as FileSystem from 'expo-file-system';

import * as SQLite from 'expo-sqlite';

import { Asset } from 'expo-asset';

import { DATABASE_NAME } from '@/constants/DatabaseConst';

export class DatabaseHelper {

    private SPADatabaseName: string = "";

    private openDatabaseStep: number = 0;

    private db: any = null;

    private dbStep: number = 0;

    private dbDir: string = "";

    constructor (SPADatabaseName) {

        this.SPADatabaseName = SPADatabaseName;

        this.openDatabaseStep = 0;

    }

    async getDirInfo () {

        let dirInfo = await FileSystem.getInfoAsync(this.dbDir);

        return dirInfo;

    }

    async createDir () {

        console.log(`Db directory doesn't exist, ${this.dbDir} creating… `);

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

                        this.createDir().then(r => console.log(`Create dir result ${r}`));

                    } else {

                        this.dbStep = 1;

                    }

                })

                break;
            
            default:
                
                console.log(`Error! openDatabaseStep: ${this.openDatabaseStep}`);

        }

        return this.dbStep;

    }




}