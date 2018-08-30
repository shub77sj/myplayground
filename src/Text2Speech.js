/**
 * @flow
 */

import React, { Component } from "react";
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    FlatList,
    Slider,
    TextInput,
    Keyboard
} from "react-native";
import Tts from "react-native-tts";


export default class Text2Speech extends Component {
    state = {
        voices: [],
        ttsStatus: "initiliazing",
        selectedVoice: null,
        speechRate: 0.5,
        speechPitch: 1,
        text: "This is an example text"
    };

    constructor(props) {
        super(props);
        Tts.addEventListener("tts-start", event =>
            this.setState({ ttsStatus: "started" })
        );
        Tts.addEventListener("tts-finish", event =>
            this.setState({ ttsStatus: "finished" })
        );
        Tts.addEventListener("tts-cancel", event =>
            this.setState({ ttsStatus: "cancelled" })
        );
        Tts.setDefaultRate(this.state.speechRate);
        Tts.setDefaultPitch(this.state.speechPitch);
        Tts.getInitStatus().then(this.initTts);
    }

    componentWillUpdate(nextProps, nextState) {
        console.log(nextProps);
        //console.log(nextState);
        // console.log(nextProps.screenProps.serverList);
        if (nextProps.readText !== this.props.readText) {
            this.setState({
                text: nextProps.readText
            }, () => this.readText());
        }
    }

    initTts = async () => {

        const voices = await Tts.voices();
        console.log(voices);

        const availableVoices = voices
            .filter(v => !v.networkConnectionRequired && !v.notInstalled)
            .map(v => {
                return { id: v.id, name: v.name, language: v.language };
            });
        console.log(availableVoices);

        let selectedVoice = null;
        if (voices && voices.length > 0) {
            selectedVoice = voices[8].id;
            try {
                await Tts.setDefaultLanguage(voices[8].language);
            } catch (err) {
                // My Samsung S9 has always this error: "Language is not supported"
                console.log(`setDefaultLanguage error `, err);
            }
            try {
                await Tts.setDefaultVoice(voices[8].id);
                this.setState({
                    voices: availableVoices,
                    selectedVoice,
                    ttsStatus: "initialized"
                });
            } catch (err) {
                // My Samsung S9 has always this error: "Language is not supported"
                console.log(`setDefaultVoice error `, err);
            }


        } else {
            this.setState({ ttsStatus: "initialized" });
        }
    };

    readText = async () => {
        Tts.stop();
        Tts.speak(this.state.text);
    };

    setSpeechRate = async rate => {
        await Tts.setDefaultRate(rate);
        this.setState({ speechRate: rate });
    };

    setSpeechPitch = async rate => {
        await Tts.setDefaultPitch(rate);
        this.setState({ speechPitch: rate });
    };

    // onVoicePress = async voice => {
    //     try {
    //         await Tts.setDefaultLanguage(voice.language);
    //     } catch (err) {
    //         // My Samsung S9 has always this error: "Language is not supported"
    //         console.log(`setDefaultLanguage error `, err);
    //     }
    //     await Tts.setDefaultVoice(voice.id);
    //     this.setState({ selectedVoice: voice.id });
    // };

    // renderVoiceItem = ({ item }) => {
    //     return (
    //         <Button
    //             title={`${item.language} - ${item.name || item.id}`}
    //             color={this.state.selectedVoice === item.id ? undefined : "#969696"}
    //             onPress={() => this.onVoicePress(item)}
    //         />
    //     );
    // };

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.label}>{`Status: ${this.state.ttsStatus ||
                    ""}`}</Text>
                <Text style={styles.label}>{`Selected Voice: ${this.state
                    .selectedVoice || ""}`}</Text>
                <View style={styles.sliderContainer}>
                    <Text
                        style={styles.sliderLabel}
                    >{`Speed: ${this.state.speechRate.toFixed(2)}`}</Text>
                    <Slider
                        style={styles.slider}
                        minimumValue={0.01}
                        maximumValue={0.99}
                        value={this.state.speechRate}
                        onSlidingComplete={this.setSpeechRate}
                    />
                </View>

                <View style={styles.sliderContainer}>
                    <Text
                        style={styles.sliderLabel}
                    >{`Pitch: ${this.state.speechPitch.toFixed(2)}`}</Text>
                    <Slider
                        style={styles.slider}
                        minimumValue={0.5}
                        maximumValue={2}
                        value={this.state.speechPitch}
                        onSlidingComplete={this.setSpeechPitch}
                    />
                </View>

                <TextInput
                    editable={false}
                    selectTextOnFocus={false}
                    style={styles.textInput}
                    multiline={true}
                    onChangeText={text => this.setState({ text })}
                    value={this.state.text}
                    onSubmitEditing={Keyboard.dismiss}
                />


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 26,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        margin: 10
    },
    label: {
        textAlign: "center"
    },
    sliderContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    sliderLabel: {
        textAlign: "center",
        marginRight: 20
    },
    slider: {
        width: 150
    },
    textInput: {
        borderColor: "gray",
        borderWidth: 1,
        flex: 1,

    }
});
