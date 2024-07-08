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
    TouchableOpacity
} from 'react-native';

import {Collapsible} from '@/components/Collapsible';
import {ExternalLink} from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {useState, useEffect} from "react";

import * as SQLite from 'expo-sqlite';


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

    const onPressCreateUser = () => {

        Alert.alert('Create user');

        console.log('Create user');

    }


    return (

        <ParallaxScrollView

            headerBackgroundColor={{light: '#D0D0D0', dark: '#353636'}}

            headerImage={

                <Image
                    source={require('@/assets/images/SPA02.png')}
                    style={styles.headLogo}
                />

            }>

            <ThemedView style={styles.titleContainer}>

                <ThemedText type="title">Comments:</ThemedText>

            </ThemedView>

            <Collapsible style={styles.collapsible} title="This text inputs will allow you to add new users:">

                <View style={styles.textViewInputs}>

                    <TextInput
                        style={styles.textInputs}
                        placeholder="Input new id"
                        onChangeText={newTextId => setId(newTextId)}
                        defaultValue={Id}
                    />

                </View>

                <View style={styles.textViewInputs}>

                    <TextInput
                        style={styles.textInputs}
                        placeholder="Input new avatar"
                        onChangeText={avatar => setAvatar(avatar)}
                        defaultValue={avatar}
                    />

                </View>

                <View style={styles.textViewInputs}>

                    <TextInput
                        style={styles.textInputs}
                        placeholder="Input new user name"
                        onChangeText={userName => setUserName(userName)}
                        defaultValue={userName}
                    />

                </View>

                <View style={styles.textViewInputs}>

                    <TextInput
                        style={styles.textInputs}
                        placeholder="Input new email"
                        onChangeText={userEmail => setEmail(userName)}
                        defaultValue={userName}
                    />

                </View>

                <View style={styles.textViewInputs}>

                    <TextInput
                        style={styles.textInputs}
                        placeholder="Input new home page"
                        onChangeText={userHomePage => setHomePage(userHomePage)}
                        defaultValue={homePage}
                    />

                </View>

                <View style={styles.textViewInputs}>

                    <TextInput
                        style={styles.textInputs}
                        placeholder="Input new captcha"
                        onChangeText={userCaptcha => setCaptcha(userCaptcha)}
                        defaultValue={captcha}
                    />

                </View>

                <View style={styles.textViewInputs}>

                    <TextInput
                        style={styles.textInputs}
                        placeholder="Input new captcha"
                        onChangeText={userCaptcha => setCaptcha(userCaptcha)}
                        defaultValue={captcha}
                    />

                </View>

                <View style={styles.textViewInputs}>

                    <TextInput
                        style={styles.textInputs}
                        placeholder="Input new text"
                        onChangeText={userText => setText(userText)}
                        defaultValue={text}
                    />

                </View>

                <View style={styles.textViewInputs}>

                    <TouchableOpacity

                        onPress={onPressCreateUser}

                        >

                        <View style={styles.button}>

                            <Text style={styles.buttonText}>Touch for user creating</Text>

                        </View>

                    </TouchableOpacity>

                </View>

            </Collapsible>

            {/*<ThemedText>This app includes example code to help you get started.</ThemedText>*/}
            {/*<Collapsible title="File-based routing">*/}
            {/*    <ThemedText>*/}
            {/*        This app has two screens:{' '}*/}
            {/*        <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}*/}
            {/*        <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>*/}
            {/*    </ThemedText>*/}
            {/*    <ThemedText>*/}
            {/*        The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}*/}
            {/*        sets up the tab navigator.*/}
            {/*    </ThemedText>*/}
            {/*    <ExternalLink href="https://docs.expo.dev/router/introduction">*/}
            {/*        <ThemedText type="link">Learn more</ThemedText>*/}
            {/*    </ExternalLink>*/}
            {/*</Collapsible>*/}
            {/*<Collapsible title="Android, iOS, and web support">*/}
            {/*    <ThemedText>*/}
            {/*        You can open this project on Android, iOS, and the web. To open the web version, press{' '}*/}
            {/*        <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.*/}
            {/*    </ThemedText>*/}
            {/*</Collapsible>*/}
            {/*<Collapsible title="Images">*/}
            {/*    <ThemedText>*/}
            {/*        For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}*/}
            {/*        <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for*/}
            {/*        different screen densities*/}
            {/*    </ThemedText>*/}
            {/*    <Image source={require('@/assets/images/react-logo.png')} style={{alignSelf: 'center'}}/>*/}
            {/*    <ExternalLink href="https://reactnative.dev/docs/images">*/}
            {/*        <ThemedText type="link">Learn more</ThemedText>*/}
            {/*    </ExternalLink>*/}
            {/*</Collapsible>*/}
            {/*<Collapsible title="Custom fonts">*/}
            {/*    <ThemedText>*/}
            {/*        Open <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText> to see how to load{' '}*/}
            {/*        <ThemedText style={{fontFamily: 'SpaceMono'}}>*/}
            {/*            custom fonts such as this one.*/}
            {/*        </ThemedText>*/}
            {/*    </ThemedText>*/}
            {/*    <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">*/}
            {/*        <ThemedText type="link">Learn more</ThemedText>*/}
            {/*    </ExternalLink>*/}
            {/*</Collapsible>*/}
            {/*<Collapsible title="Light and dark mode components">*/}
            {/*    <ThemedText>*/}
            {/*        This template has light and dark mode support. The{' '}*/}
            {/*        <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect*/}
            {/*        what the user's current color scheme is, and so you can adjust UI colors accordingly.*/}
            {/*    </ThemedText>*/}
            {/*    <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">*/}
            {/*        <ThemedText type="link">Learn more</ThemedText>*/}
            {/*    </ExternalLink>*/}
            {/*</Collapsible>*/}
            {/*<Collapsible title="Animations">*/}
            {/*    <ThemedText>*/}
            {/*        This template includes an example of an animated component. The{' '}*/}
            {/*        <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses*/}
            {/*        the powerful <ThemedText type="defaultSemiBold">react-native-reanimated</ThemedText> library*/}
            {/*        to create a waving hand animation.*/}
            {/*    </ThemedText>*/}
            {/*    {Platform.select({*/}
            {/*        ios: (*/}
            {/*            <ThemedText>*/}
            {/*                The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}*/}
            {/*                component provides a parallax effect for the header image.*/}
            {/*            </ThemedText>*/}
            {/*        ),*/}
            {/*    })}*/}
            {/*</Collapsible>*/}


        </ParallaxScrollView>
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
});
