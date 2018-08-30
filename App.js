/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, Button
} from 'react-native';
import Speech2Text from './src/Speech2Text';
import Text2Speech from './src/Text2Speech';
import Snackbar from 'react-native-snackbar';


export default class App extends Component {

  state = {
    userVoice: [],
    voiceReply: ''
  }


  // Speech2Text
  handleVoiceStart = (voiceStart) => {
    console.log('voiceStart- ' + voiceStart);
    this.setState({
      voiceReply: ''
    });
  }

  handleUserVoice = (userVoice) => {
    console.log(userVoice);
    this.setState({
      userVoice: userVoice
    });
    var { userVoice } = this.state;
    var reply='';

    if ((userVoice[0].includes('create') || userVoice[0].includes('add')) && userVoice[0].includes('project')) {
      console.log('Project created successfully');
      reply = 'Project created successfully';
    }
    else if ((userVoice[0].includes('create') || userVoice[0].includes('add')) && userVoice[0].includes('group')) {
      console.log('Group created successfully');
      reply = 'Group created successfully';
    }
    else if ((userVoice[0].includes('hello') || userVoice[0].includes('hi'))) {
      console.log(userVoice[0]);
      reply = `${userVoice[0]} Shubham`;
      Snackbar.show({
        title: 'Hello world',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
    else {
      console.log(`I think I did't recognize you`);
      reply = `I think I did't recognize you!!! You have only two option either create a project or create a group`;
    }

    // userVoice.map(result => {
    //   // if (result.includes('create') || result.includes('add') && result.includes('project')) {
    //   //   console.log('Project created successfully');
    //   //  reply='Project created successfully';
    //   // }
    //   // else if (result.includes('create') || result.includes('add') && result.includes('group')) {
    //   //   console.log('Group created successfully');
    //   //   reply='Group created successfully';
    //   // }
    //   // else {
    //   //   console.log(`I think I did't recognize you`);
    //   //   reply = `I think I did't recognize you!!! You have only two option either create a project or create a group `;
    //   // }

    // });

    this.setState({
      voiceReply: reply
    });
  }

  handleVoiceError = (error) => {
    console.log('Error:- ' + error);
    this.setState({
      voiceReply: error
    });
  }


  render() {
    const voice = this.state.userVoice.map((data, index) => {
      return (
        <Text key={index}>{data}</Text>
      )
    })
    return (
      <View style={styles.container}>
          <Speech2Text  
            voice={this.handleUserVoice}
            voiceError={this.handleVoiceError}
            voiceStart={this.handleVoiceStart} />
          {
            //voice
          }
          <Text>{this.state.userVoice[0]}</Text>
          <Text2Speech
            readText={this.state.voiceReply}
          />
      </View>
    );
  }
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 15
  },

});