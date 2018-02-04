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
import {
  StackNavigator,
} from 'react-navigation';
const { width, height } = Dimensions.get('window');

export default class LoginScreen extends React.Component {
static navigationOptions = {
    title: 'Sign In',
  };
    state = {
        login: '',
        password: '',
		image: '',
        isLoggingIn: false,
        message: ''
    }

    _userLogin = () => {

        this.setState({ isLoggingIn: true, message: '' });

        var params = {
            login: this.state.login,
            password: this.state.password
        };

        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(property + "=" + params[property]);
        }
        formBody = formBody.join("&");

        var proceed = false;
        fetch("https://parking-app-server.herokuapp.com/api/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formBody
            })
            .then((response) => response.json())
            .then((response) => {
                if (response.login == this.state.login) proceed = true;
                else this.setState({ message: response.error });
            })
            .then((response) => {
                this.setState({ isLoggingIn: false })
                if (proceed) this._onLoginPress(response);
            })
            .catch(err => {
				this.setState({ message: err.message });
				this.setState({ isLoggingIn: false })
			});
    }
	
	_onLoginPress = (response) => {
		console.log(response);
		try {
		  AsyncStorage.setItem('user', response);
		  this._goToProfile();
		} catch (error) {
		  console.log("Error saving data" + error);
		}
	}
	
	_goToProfile = () => {
    this.props.navigation.navigate('Profile');
  }

    clearlogin = () => {
        this._login.setNativeProps({ text: '' });
        this.setState({ message: '' });
    }

    clearPassword = () => {
        this._password.setNativeProps({ text: '' });
        this.setState({ message: '' });
    }

    render() {
        return (
            <ScrollView style={{padding: 20}}>
				<TextInput
				style={styles.input}
					ref={component => this._login = component}
					placeholder='Login' 
					onChangeText={(login) => this.setState({login})}
					autoFocus={true}
					onFocus={this.clearlogin}
				/>
				<TextInput 
					ref={component => this._password = component}
					placeholder='Password' 
					onChangeText={(password) => this.setState({password})}
					secureTextEntry={true}
					onFocus={this.clearPassword}
					onSubmitEditing={this._userLogin}
				/>
				{!!this.state.message && (
					<Text
						style={{fontSize: 14, color: 'red', padding: 5}}>
						{this.state.message}
					</Text>
				)}
				{this.state.isLoggingIn && <ActivityIndicator />}
				<View style={{margin:7}} />
				<Button 
				styles={styles.button}
					disabled={this.state.isLoggingIn||!this.state.login||!this.state.password}
		      		onPress={this._userLogin}
		      		title="Submit"
		      	/>
	      </ScrollView>
        )
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
  Button: {
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