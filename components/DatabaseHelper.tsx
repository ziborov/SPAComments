import * as FileSystem from 'expo-file-system';

import * as SQLite from 'expo-sqlite';

import { Asset } from 'expo-asset';

import { DATABASE_NAME } from '@/constants/DatabaseConst';

export class DatabaseHelper {

    private SPADatabaseName: any;

    private SQLLiteStep: any;

    constructor (SPADatabaseName, SQLLiteStep) {

        this.SPADatabaseName = SPADatabaseName;

        this.SQLLiteStep = SQLLiteStep;

    }




}