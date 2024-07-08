import {Image, StyleSheet, Platform} from 'react-native';

import {HelloWave} from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect } from "react/index";
import * as SQLite from 'expo-sqlite';
import { DatabaseHelper } from "@/components/DatabaseHelper";

let dbStep : number = 0;


export default function HomeScreen() {

    let db: any = null;

    let dbPreviousStep : number = 0;

    const dbName: string = `spa_comments`;

    useEffect(() => {

        console.log(`Start App!`);

        const interval = setInterval(() => {

            if(dbStep < 2) {

                dbStep = databaseHelper.openDatabase(dbStep);

                console.log(`dbStep: ${dbStep}`);

                if (dbStep !== dbPreviousStep) {

                    dbPreviousStep = dbStep;

                }

            }

        }, 1000);

        const databaseHelper = new DatabaseHelper(dbName);

    });


    return (
        <ParallaxScrollView
            headerBackgroundColor={{light: '#A1CEDC', dark: '#1D3D47'}}
            headerImage={
                <Image
                    source={require('@/assets/images/SPA01.png')}
                    style={styles.headLogo}
                />
            }>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Welcome SPA comments!</ThemedText>
                <HelloWave/>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Step 1: Select user</ThemedText>
                <ThemedText>
                    Press <ThemedText type="defaultSemiBold">Explore</ThemedText>.
                    Explore user's events.
                </ThemedText>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Step 2: Read users events. </ThemedText>
                <ThemedText>
                    You can list users events and read every event.
                </ThemedText>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Step 3: Add comments to user's event.</ThemedText>
                <ThemedText>
                    When you're ready, add{' '}!

                </ThemedText>
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    headLogo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
});
