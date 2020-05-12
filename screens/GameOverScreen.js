import React from 'react';
import {View, StyleSheet, Button, Image, Text, Dimensions, ScrollView,} from 'react-native';

import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import MainButton from '../components/MainButton'

import Colors from '../constants/colors'

const GameOverScreen = props => {
    return (
            <ScrollView>
            <View style={styles.screen} >
                <TitleText>The Game is Over!</TitleText>
                <View style={styles.imageContainer}>
                <Image 
                source={require('../assets/success.png')} 
                // source={{uri: 'https://pixabay.com/get/54e2d2434353af14f6da8c7dda6d49214b6ac3e45659754c772a7cdc91/landscape-2270913_1280.png'}} 
                style={styles.image}
                resizeMode="cover"/>
                </View>
                <View style={styles.resultContainer}>
                <BodyText style = {styles.resultText}>Your phone needed 
                    <Text style={styles.highlight}> {props.roundsnumber} </Text> 
                    rounds to guess the number 
                    <Text style={styles.highlight}> {props.userNumber} </Text></BodyText>
                </View>
                <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
            </View>
            </ScrollView>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: (Dimensions.get('window').width * 0.7)/2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30
    },
    image: {
        width: '100%',
        height: '100%'
    },
    resultContainer: {
        marginHorizontal: 20,
        marginVertical: Dimensions.get('window').height / 60
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold',
       
    },
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20
    }
});

export default GameOverScreen