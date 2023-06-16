import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
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
        <Image source={require('../../assets/user.png')} style={styles.image}/>
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
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: 'rgb(251,246,247)', 
    
  },
  text1: {
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    paddingTop: 20,
    letterSpacing: 2,
  },
  text2: {
    marginVertical: 32,
    backgroundColor: 'rgb(194,149,160)',
    padding: 10,
    borderRadius: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  image: {
    height: 200, 
    width: 200,
    margin: 'auto',
  },
})
export default Register