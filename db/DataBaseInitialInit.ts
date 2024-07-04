import * as SQLite from 'expo-sqlite';


export default class DataBaseInitialInit {

    async constructor (users) {

        this.users = users;

        this.db = await SQLite.openDatabaseAsync('databaseName');


    }

}