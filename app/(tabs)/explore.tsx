import Ionicons from '@expo/vector-icons/Ionicons';
import {
    StyleSheet,
    Image,
    Platform,
    TextInput,
    Text,
    View,
    TouchableHighlight,
    Alert,
    TouchableOpacity, SafeAreaView, FlatList
} from 'react-native';

import {Collapsible} from '@/components/Collapsible';
import {ExternalLink} from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {useState, useEffect} from "react";

import * as SQLite from 'expo-sqlite';
import {DatabaseHelper} from "@/components/DatabaseHelper";
import { dbName } from "@/constants/DatabaseConst";

let dbStep : number = 0;

let dbPreviousStep : number = 0;

export default function TabTwoScreen() {

    const [note, setNote] = useState("");

    const [noteArr, setNoteArr] = useState([]);

    const [visible, setVisible] = useState(false);

    const [Id, setId] = useState("");

    const [avatar, setAvatar] = useState("");

    const [userName, setUserName] = useState("");

    const [email, setEmail] = useState("");

    const [homePage, setHomePage] = useState("");

    const [captcha, setCaptcha] = useState("");

    const [text, setText] = useState("");

    const [rows, setRows] = useState([]);

    const onPressCreateUser = () => {

        Alert.alert('Create user');

        console.log('Create user');

    }



    useEffect(() => {

        const databaseHelper = new DatabaseHelper(dbName);

        console.log(`Start Explore!`);

        this.getRowsResults = () => {

            return databaseHelper.getRows();

        }

        const interval = setInterval(async () => {

            if (dbStep === 2) {

                console.log(`newRows`);

                const newRows = await databaseHelper.getRows();

                if (newRows !== undefined && newRows !== null && Array.isArray(newRows) && newRows.length > 0) {

                    console.log(`newRows.length ${newRows.length}`);

                    for (const row of newRows) {

                        console.log(`In Explore id: ${row.id}, avatar: ${row.avatar}, user_name: ${row.user_name}, email: ${row.email}, home_page: ${row.home_page}, captcha: ${row.captcha}, text: ${row.text}`);

                    }

                    setRows(newRows);

                }



                dbStep = 3;

            }

            if (dbStep < 2) {

                dbStep = databaseHelper.openDatabase(dbStep);

                console.log(`dbStep: ${dbStep}`);

                if (dbStep !== dbPreviousStep) {

                    dbPreviousStep = dbStep;

                }

            }



        }, 5000);

    });

    type ItemProps = {title: string};

    const Item = ({title, avatar, user_name, email, home_page, captcha, text}: ItemProps) => (
        <View style={styles.flexItem}>
            <Text style={styles.flexTitle}>{title}</Text>
            <Text style={styles.flexItem}>{avatar}</Text>
            <Text style={styles.flexItem}>{user_name}</Text>
            <Text style={styles.flexItem}>{email}</Text>
            <Text style={styles.flexItem}>{home_page}</Text>
            <Text style={styles.flexItem}>{captcha}</Text>
            <Text style={styles.flexItem}>{text}</Text>
        </View>
    );

    return (

        <SafeAreaView style={styles.safeContainer}>

            {/*<ThemedView style={styles.titleContainer}>*/}

            {/*    <ThemedText type="title">Comments:</ThemedText>*/}

            {/*</ThemedView>*/}


            {/*    <View style={styles.textViewInputs}>*/}

            {/*        <TextInput*/}
            {/*            style={styles.textInputs}*/}
            {/*            placeholder="Input new id"*/}
            {/*            onChangeText={newTextId => setId(newTextId)}*/}
            {/*            defaultValue={Id}*/}
            {/*        />*/}

            {/*    </View>*/}

            {/*    <View style={styles.textViewInputs}>*/}

            {/*        <TextInput*/}
            {/*            style={styles.textInputs}*/}
            {/*            placeholder="Input new avatar"*/}
            {/*            onChangeText={avatar => setAvatar(avatar)}*/}
            {/*            defaultValue={avatar}*/}
            {/*        />*/}

            {/*    </View>*/}

            {/*    <View style={styles.textViewInputs}>*/}

            {/*        <TextInput*/}
            {/*            style={styles.textInputs}*/}
            {/*            placeholder="Input new user name"*/}
            {/*            onChangeText={userName => setUserName(userName)}*/}
            {/*            defaultValue={userName}*/}
            {/*        />*/}

            {/*    </View>*/}

            {/*    <View style={styles.textViewInputs}>*/}

            {/*        <TextInput*/}
            {/*            style={styles.textInputs}*/}
            {/*            placeholder="Input new email"*/}
            {/*            onChangeText={userEmail => setEmail(userName)}*/}
            {/*            defaultValue={userName}*/}
            {/*        />*/}

            {/*    </View>*/}

            {/*    <View style={styles.textViewInputs}>*/}

            {/*        <TextInput*/}
            {/*            style={styles.textInputs}*/}
            {/*            placeholder="Input new home page"*/}
            {/*            onChangeText={userHomePage => setHomePage(userHomePage)}*/}
            {/*            defaultValue={homePage}*/}
            {/*        />*/}

            {/*    </View>*/}

            {/*    <View style={styles.textViewInputs}>*/}

            {/*        <TextInput*/}
            {/*            style={styles.textInputs}*/}
            {/*            placeholder="Input new captcha"*/}
            {/*            onChangeText={userCaptcha => setCaptcha(userCaptcha)}*/}
            {/*            defaultValue={captcha}*/}
            {/*        />*/}

            {/*    </View>*/}

            {/*    <View style={styles.textViewInputs}>*/}

            {/*        <TextInput*/}
            {/*            style={styles.textInputs}*/}
            {/*            placeholder="Input new captcha"*/}
            {/*            onChangeText={userCaptcha => setCaptcha(userCaptcha)}*/}
            {/*            defaultValue={captcha}*/}
            {/*        />*/}

            {/*    </View>*/}

            {/*    <View style={styles.textViewInputs}>*/}

            {/*        <TextInput*/}
            {/*            style={styles.textInputs}*/}
            {/*            placeholder="Input new text"*/}
            {/*            onChangeText={userText => setText(userText)}*/}
            {/*            defaultValue={text}*/}
            {/*        />*/}

            {/*    </View>*/}

            {/*    <View style={styles.textViewInputs}>*/}

            {/*        <TouchableOpacity*/}

            {/*            onPress={onPressCreateUser}*/}

            {/*            >*/}

            {/*            <View style={styles.button}>*/}

            {/*                <Text style={styles.buttonText}>Touch for user creating</Text>*/}

            {/*            </View>*/}

            {/*        </TouchableOpacity>*/}

            {/*    </View>*/}

                <FlatList
                    data={rows}
                    renderItem={({item}) => <Item title={item.id.toString()} avatar={item.avatar} user_name={item.user_name} email={item.email} home_page={item.home_page} captcha={item.captcha} text={item.text} />}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    headLogo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    collapsible: {
        height: 40,
        backgroundColor: "#ffffff",
        fontSize: 30
    },
    textInputs: {
        height: 40,
        backgroundColor: "#eeeeee",
        fontSize: 23
    },
    textViewInputs: {
        padding: 10,
        margin: 10,
        backgroundColor: "#eeeeee",
    },
    container: {
        paddingTop: 60,
        alignItems: 'center',
    },
    button: {
        marginBottom: 30,
        width: 260,
        alignItems: 'center',
        backgroundColor: '#2196F3',

    },
    buttonText: {
        textAlign: 'center',
        padding: 20,
        color: 'white',
        fontSize: 25
    },
    safeContainer: {
        flex: 1,
        marginTop: 0,
    },
    flexItem: {
        backgroundColor: '#caffc2',
        padding: 10,
        marginVertical: 3,
        marginHorizontal: 3,
    },
    flexTitle: {
        fontSize: 25,
    },
    flexRow: {
        fontSize: 20,
    }
});
