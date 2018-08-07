import React, {Component} from 'react';
import {View} from 'react-native';
import {Card, Header, Button, Spinner, CardSection} from './Components/Common';
import LoginForm from './Components/LoginForm';

class App extends Component {
  state = {loggedIn  : null};

  componentWillMount() {
    const firebase = require("firebase");

    // Initialize Firebase
    var config = {apiKey: 'AIzaSyDhSideaiFAfWe7a1v5AFEz4-l4rCOfPSQ',
        authDomain: 'auth-eea23.firebaseapp.com',
        databaseURL: 'https://auth-eea23.firebaseio.com',
        projectId: 'auth-eea23',
        storageBucket: 'auth-eea23.appspot.com',
        messagingSenderId: '562295927995'
    };

    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged((user) => {
        if(user){
            this.setState({loggedIn : true});
        }else{
            this.setState({loggedIn :  true});
        }
    }); 
     
  }

   showLoginOrLogoutForm(){
      switch(this.state.loggedIn){
          case true:
             return (
                 <Card>
                     <CardSection>
                         <Button onPress = {() => firebase.auth().signOut()}>
                         Log Out
                         </Button>
                     </CardSection>
                  </Card>   
            );
          case false:
             return <LoginForm />
          default:
             return <Spinner />
      }
   }

    render(){
        return(
            <View>
                <Header headerTitle = "Authentication"/>
                {this.showLoginOrLogoutForm()}
            </View>
        );
    }
}

export default App;