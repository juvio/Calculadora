import React from 'react';
import { StyleSheet, Text, Dimensions, TouchableHighlight, Image } from 'react-native';

const styles = StyleSheet.create({
    button: {
        fontSize: 38,
        height: Dimensions.get('window').width/4,
        width: Dimensions.get('window').width/4,
        padding: 20,
        //backgroundColor: '#f0f0f0',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#888',
    },
    operationButton: {
        color: '#fff',
        //backgroundColor: '#fa8231',
    },
    buttonDouble: {
        width: (Dimensions.get('window').width/4)*2,
    },
    buttonTriple: {
        width: (Dimensions.get('window').width/4)*3,
    },
    numberButton: {
        backgroundColor: '#FFFACD',
    }
})

export default props => {

    const stylesButton = [styles.button];
    if(props.double) stylesButton.push(styles.buttonDouble);
    if(props.triple) stylesButton.push(styles.buttonTriple);
    if(props.operation) stylesButton.push(styles.operationButton);
    if(props.number) stylesButton.push(styles.numberButton);
 
    return(
        <TouchableHighlight onPress={props.onClick}>  
        <Text style={stylesButton}>{props.label}</Text>  
        </TouchableHighlight>
    )
}