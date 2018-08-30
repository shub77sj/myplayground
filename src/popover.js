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
import { Popover, PopoverContainer } from 'react-native-simple-popover';


export default class App extends Component {

    state = {
        isPopoverVisible: true,
        popoverPlacement: 'bottom',
        arraylist: [
            {
                "name": "Huber Vazquez",
                "gender": "male"
            },
            {
                "name": "Alisha Calderon",
                "gender": "female"
            },
            {
                "name": "Spencer Moody",
                "gender": "male"
            },
            {
                "name": "Barker May",
                "gender": "male"
            },
            {
                "name": "Figueroa Burnett",
                "gender": "male"
            },
            {
                "name": "Maude Sandoval",
                "gender": "female"
            },

        ]
    };

    render() {
        const list = this.state.arraylist.map((data) => {
            return (
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    backgroundColor: '#FFFFFF',
                    borderBottomColor: '#AAAAAA',
                    marginVertical: 1,
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    elevation: 2,
                    position: 'relative'
                }}>
                    <Text style={styles.popoverText}>{data.name}</Text>
                </View>
            )
        })
        // var list = <Text style={styles.popoverText}>
        //   hello
        //   </Text>;
        // this.state.arraylist.map((list) => {
        //   console.log(list.name);
        //   list += <Text style={styles.popoverText}>
        //     hello
        //   </Text>;
        // })
        return (
            <PopoverContainer padding={20}>
                <View style={styles.container}>
                    <Popover
                        placement='bottom'
                        arrowColor="#114B5F"
                        arrowWidth={20}
                        arrowHeight={8}
                        offset={{ x: 60, y: 0 }}
                        isVisible={this.state.isPopoverVisible}
                        component={() => (
                            <View style={styles.popoverContainer}>
                                {list}
                            </View>
                        )}
                    >
                        <Text onPress={() => {
                            this.setState({ isPopoverVisible: !this.state.isPopoverVisible });
                        }} style={styles.welcome}>
                            TATACLICK
          </Text>
                    </Popover>


                </View>
            </PopoverContainer>
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
    welcome: {
        fontSize: 20,
        textAlign: 'right',
        margin: 10,
    },
    popoverContainer: {
        backgroundColor: '#fff',
        padding: 2,
        marginRight: 80,
    },
    popoverText: {
        color: '#111',
        margin: 5
    }
});