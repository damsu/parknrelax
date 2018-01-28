import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Park|n|Relax'
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <View style={{marginTop: 25}}>
		<Button
          onPress={() => navigate('Login')}
          title="Sign In"
        />
		</View>
		<View style={{marginTop: 25}}>
		<Button
          onPress={() => navigate('SignUp')}
          title="Sign Up"
        />
		</View>
		<View style={{marginTop: 25}}>
		<Button
          onPress={() => navigate('Available Parking Spots')}
          title="Available Parking Spots"
        />
		</View>
      </View>
    );
  }
}

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };
  render() {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }
}

class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign Up',
  };
  render() {
    return (
      <View>
        <Text>Sign Up</Text>
      </View>
    );
  }
}

class ListScreen extends React.Component {
  static navigationOptions = {
    title: 'Available Parking Spots',
  };
  render() {
    return (
      <View>
        <Text>Available Parking Spots</Text>
      </View>
    );
  }
}

const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Login: { screen: LoginScreen },
  SignUp: { screen: SignUpScreen },
  List: { screen: ListScreen },
});

export default class App extends React.Component {
  render() {
    return <SimpleApp />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  button: {
	  width: 150, height: 150, backgroundColor: 'steelblue'
  }
});
