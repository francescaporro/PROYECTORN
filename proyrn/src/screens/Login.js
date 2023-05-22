import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import FormLogin from '../components/FormLogin'

class Login extends Component {
  render() {
    return (
      <View>
        <Text>Login</Text>
        <FormLogin navigation={this.props.navigation} />
        <Text>
            Aún no tienes una cuenta?
            <TouchableOpacity
                onPress={()=> this.props.navigation.navigate('Register')}
            >
                <Text>Registrate aquí</Text>
            </TouchableOpacity>
        </Text>
      </View>
    )
  }
}

export default Login