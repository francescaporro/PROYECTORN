import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import FormRegister from '../components/FormRegister'
import { FontAwesome } from '@expo/vector-icons'

class Register extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={styles.conteiner}>
       
        <Text style={styles.text1}>Crea tu cuenta</Text>
        <FormRegister />
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
          <Text  style={styles.text2}>Ya tienes cuenta? Vamos a Login</Text></TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  conteiner: {
    padding: 15,
    justifyContent: 'space-around',
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

})
export default Register