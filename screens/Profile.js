import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    Alert,
    ActivityIndicator,
	StyleSheet,
	Dimensions,
	AsyncStorage
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import LoginScreen from './Login';
const { width, height } = Dimensions.get('window');

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };
  state = {
        user: ''
    };
	componentWillMount(){
        this.checkLoginState();
    }
  render() {
	  if (this.state.user == '') {
    return (
		<View style={{justifyContent: 'center', flex: 1}}>
			<Button onPress={this._goToSignIn}
			title="Sign In"
			styles={styles.button}/>
			<Text style={{textAlign: 'center'}}>{this.state.user}</Text>
			<Button onPress={this._goToSignUp}
			title="Sign Up"
			styles={styles.button}/>
		  </View>
	)}
	  else if (this.state.user != '') {
    return (
		<View style={{justifyContent: 'center', flex: 1}}>
		<Text style={{textAlign: 'center'}}>{this.state.user}</Text>
			<Button onPress={this.resetLoginState}
			title="Sign Out"
			styles={styles.button}/>
		  </View>
	 )}
  }

  _goToSignIn = () => {
    this.props.navigation.navigate('SignIn');
  }
  
  _goToSignUp = () => {
    this.props.navigation.navigate('SignUp');
  }
  
  checkLoginState = () => {
	   AsyncStorage.getItem('user').then((value) => {
      this.setState({
        user: value
      });
    });
  }
  
  resetLoginState = () => {
	   AsyncStorage.removeItem('user').then((value) => {
      this.setState({
        user: ''
      });
    });
  }
}

var styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#324563',
    height:height
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: '#324563',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});