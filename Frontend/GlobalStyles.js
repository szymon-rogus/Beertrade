import {StyleSheet} from "react-native";
import {bgColor, fontColor} from "./LoginPage/LoginPageStyles";

export const globalStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: bgColor,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: fontColor,
        fontSize: 48
    },
    input: {
        margin: 15,
        height: 40,
        width: 300,
        borderColor: 'white',
        borderWidth: 1
    },
})