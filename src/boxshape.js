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
    View, Button, Dimensions
} from 'react-native';
import { Popover, PopoverContainer } from 'react-native-simple-popover';


export default class App extends Component {



    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    overflow: 'hidden',
                    width: 0,
                    height: 0,
                    backgroundColor: 'transparent',
                    borderStyle: 'solid',
                    borderLeftWidth: Dimensions.get('window').width - 100,
                    borderRightWidth: 40,
                    //borderBottomWidth: 10,
                    borderTopWidth: 300,
                    borderLeftColor: '#fff',
                    borderRightColor: 'transparent',
                    borderTopColor: '#fff',
                    borderBottomColor: '#fff',
                }}>
                    <Text>Hello</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ccc',
    },

});