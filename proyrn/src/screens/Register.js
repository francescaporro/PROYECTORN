import { Text, View, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import FormRegister from '../components/FormRegister'

class Register extends Component {
    constructor(props){
        super(props)
    }
  render() {
    return (
      <View>
        <Text>Aqui vamos a tener nuestro Registro</Text>
        <FormRegister />
        <TouchableOpacity onPress={()=> this.props.navigation.navigate('HomeNav')}><Text>No tienes cuenta? Vamos a Home</Text></TouchableOpacity>
      </View>
    )
  }
}

export default Register