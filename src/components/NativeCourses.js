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
    View,
    Button,
    Image,
    ListView
} from 'react-native';
import data from '../data/courses.json'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {getTheme} from 'react-native-material-kit'
const theme = getTheme();

const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 != r2
});

const toDelete   = new Set(['react']);
const newData    = data.filter(obj=> !toDelete.has(obj.category));
const dataSource = ds.cloneWithRows(newData);
// const dataSource = ds.cloneWithRows(data);

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class NativeCourses extends Component<{}> {

    static navigationOptions = {
        tabBarLabel: 'React Native Courses',
        tabBarIcon: ({tintColor}) => (
            <Icon name={'settings-cell'}
                  size={26}
                  style={{color: tintColor}}/>
        )
    }

    render() {

        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to Native Courses!
                </Text>
                <ListView
                    dataSource = {dataSource}
                    renderRow={(rowData) =>
                        <View style={theme.cardStyle}>
                            <Image source={{uri: rowData.image}}
                                   style={theme.cardImageStyle}
                            />
                            <Text style={[theme.cardTitleStyle, styles.title]} >{rowData.title}</Text>
                            <Text style={theme.cardContentStyle}>{rowData.description}</Text>
                            <Text style={[theme.cardActionStyle, styles.action]}
                                  onPress={()=>{
                                      this.handleClick(rowData.link)
                                  }}>
                                Tap to course
                            </Text>
                        </View>

                    }
                />

                <Text style={styles.instructions}>
                    {instructions}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        paddingTop: 10
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        margin: 10
    },
    icon: {
        width: 26,
        height: 26
    },
    card: {
        marginTop: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    list: {
        paddingLeft: 5,
        paddingRight: 5,

    },
    title: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 363,
        left: 0,
        fontSize: 15,
        backgroundColor: 'rgba(245, 252, 255, 0.60)'
    },
    action: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#F5FCFF'
    }
});