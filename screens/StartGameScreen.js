import React, {useState, useEffect} from 'react'
import {View, StyleSheet, Button, Alert, 
    TouchableWithoutFeedback, Keyboard, 
    Dimensions, ScrollView, KeyboardAvoidingView} from 'react-native'

import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText'
import MainButton from '../components/MainButton'

import Colors from '../constants/colors';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const restInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }

    useEffect(() => {
        const updateLayout = () => {
            (Dimensions.get('window').width / 4)
        }

        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    })
    const confirmInputHandler = () => {
        Keyboard.dismiss();
        const chosenNumber = parseInt(enteredValue);
        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number', 'Number has to be number between 1 and 99', [{text: 'ok', style: 'destructive', onPress: restInputHandler}])
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
    };

    let confirmedOuput;

    if (confirmed) {
    confirmedOuput = (
        <Card style={styles.summaryContainer}>
            <BodyText>You  Selected</BodyText>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <MainButton onPress={() => props.onStartGame(selectedNumber)}>
                START GAME
            </MainButton>
        </Card>
    )
    }

    return(
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
                <View style={styles.screen}>
                    <TitleText style={styles.title}>Start a New Game!</TitleText>
                    <Card style={styles.inputContainer}>
                        <BodyText >Select a Number</BodyText>
                        <Input style={styles.input} blurOnSubmit autoCapitalize='none' 
                        autoCorrect={false} keyboardType="number-pad" maxLength={2}
                        onChangeText = {numberInputHandler} value={enteredValue}
                        />
                        <View style={styles.buttonContainer}>
                            <View style={{width: buttonWidth}}><Button title="Reset" onPress={restInputHandler} color={Colors.accent}/></View>
                            <View style={{width: buttonWidth}}><Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary}/></View> 
                        </View>
                    </Card>
                    {confirmedOuput}
                </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        width: '80%',
        // maxWidth: '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: "center"
    },
    buttonContainer: {
        flexDirection: "row",
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    // button: {
    //     // width: 120
    //     width: Dimensions.get('window').width / 4
    // },
    input: {
        width: 50,
        textAlign: "center"
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: "center"
    },
    text: {
        fontFamily: 'open-sans'
    }
})

export default StartGameScreen;