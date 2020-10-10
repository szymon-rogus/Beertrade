import { StyleSheet } from 'react-native';

export const fontColor = 'white'
export const bgColor = 'darkorchid'

export const styles = StyleSheet.create({
    logInPageButton: {
        backgroundColor: 'white',
        elevation: 8,
        paddingVertical: 10,
        paddingHorizontal: 12,
        margin: 15
    },
    forgottenPasswordText: {
        color: fontColor,
        textDecorationLine: 'underline'
    }
})