import React, { Component }  from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { http, setAuthorizationToken } from '../Global.js'
import { styles, fontColor, bgColor } from './LoginPageStyles.js'
import { globalStyles} from "../GlobalStyles";



export default class LoginPage extends Component {
    
    state = {
        loggedIn: false,
        login: '',
        password: ''
    }

    handleLogin = (text) => {
        this.setState({ login: text })
    }

    handlePassword = (text) => {
        this.setState({ password: text })
    }

    handleAuth = () => {
        if (this.state.login != '' && this.state.password != '') {
            http.post('/login', {
                login: this.state.login,
                password: this.state.password
            }).then((response) => {
                setAuthorizationToken(response.data.token);
                this.setState({ loggedIn: true });
                this.props.navigation.navigate('prices')
            })
            .catch(err => alert("Invalid login or password!"));
        }
    }

    handleForgottenPassword = () => {
        
    }

    checkAuth = () => {
        http.get('/login')
        .then((response) => response.data)
        .then((responseJson) =>  alert(responseJson.message))            
        .catch(err => alert("User not logged in!"));
    }

    render() {
        return (
            <View style = { globalStyles.mainContainer }>
                <Text style = { globalStyles.title }>Beertrade</Text>
                <TextInput style = { globalStyles.input }
                underlineColorAndroid = 'transparent'
                placeholder = 'Login'
                placeholderTextColor = { fontColor }
                autoCapitalize = 'none'
                onChangeText = { this.handleLogin }
                />
                <TextInput style = { globalStyles.input }
                secureTextEntry={ true }
                underlineColorAndroid = 'transparent'
                placeholder = 'Password'
                placeholderTextColor = { fontColor }
                autoCapitalize = 'none'
                onChangeText = { this.handlePassword }
                />
                <View style = { globalStyles.buttonContainer }>
                    <TouchableOpacity onPress={ this.handleAuth } style={ styles.logInPageButton }>
                        <Text style={ { color: bgColor } }>Log in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => this.props.navigation.navigate('registration') } style={ styles.logInPageButton }>
                        <Text style={ { color: bgColor } }>Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ this.checkAuth } style={ styles.logInPageButton }>
                        <Text style={ { color: bgColor } }>Check auth</Text>
                    </TouchableOpacity>
                </View>
                <Text style = { styles.forgottenPasswordText } onPress={ this.handleForgottenPassword }>Forgotten password</Text>
            </View>
        )
    }

}