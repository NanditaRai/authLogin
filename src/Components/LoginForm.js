import React, {Component} from 'react';
import {Text} from 'react-native';
import {Card, Button, CardSection, Input, Spinner} from './Common';

class LoginForm extends Component {
    state = { email : '', password: '', error: '', loading : false};

    onButtonPress(){
        const {email, password} = this.state;
        const firebase = require("firebase");

        this.setState({ error : '', loading :  true});

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(this.onLoginFailure.bind(this));
        });
    }

    onLoginSuccess(){
        this.setState({
            email : '',
            password : '',
            error : '',
            loading : false
        });
    }

    onLoginFailure(){
        this.setState({
            error : "Authentication Failed.",
            loading : false
        });
    }

    showButtonOrLoading(){
        if(this.state.loading){
            return(
                <Spinner />
            );
        }

        return(
            <Button onPress = {this.onButtonPress.bind(this)}>
            Log In
            </Button>
        );
    }

    render() {
        return(
            <Card>
                <CardSection>
                    <Input        
                     placeholder = "user@gmail.com"
                     label = "Email"
                     value = {this.state.email}
                     onChangeText = {email => this.setState({email})}
                     />
                </CardSection>

                <CardSection>
                    <Input
                    secureTextEntry 
                    placeholder = "password"
                    label = "Password"
                    value = {this.state.password}
                    onChangeText = {password => this.setState({password})}
                    />
                </CardSection>

                <Text style = {styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                   { this.showButtonOrLoading() }
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle : {
        fontSize :20,
        alignSelf : 'center',
        color : 'red'
    }
};

export default LoginForm;