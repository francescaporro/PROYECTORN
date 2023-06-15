import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import FormLogin from '../components/FormLogin'

class Login extends Component {
  render() {
    return (
      <View style={styles.conteiner}>
        <Text style={styles.text1}>Login</Text>
        <FormLogin navigation={this.props.navigation} />
        <Text style={styles.text3}>
            Aún no tienes una cuenta?
            <TouchableOpacity
                onPress={()=> this.props.navigation.navigate('Register')}
            >
                <Text style={styles.text2}>Registrate aquí</Text>
            </TouchableOpacity>
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  conteiner: {
    padding: 15,
    justifyContent: 'center',
  },
  text1: {
   
    fontSize: 25,
    fontWeight: 'bold',
  },
  text2: {
    marginVertical: 32,
    backgroundColor: 'rgb(194,149,160)',
    padding: 10,
    borderRadius: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  text2: {
    marginVertical: 32,
    padding: 10,
    fontWeight: 'bold',
    color: 'black'
  },

})

export default Login