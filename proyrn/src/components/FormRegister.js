import { Text, View, TextInput, TouchableOpacity, StyleSheet, Touchable } from 'react-native'
import React, { Component } from 'react'
import {auth} from '../firebase/config'

class FormRegister extends Component {
    constructor(){
        super()
        this.state = {
            inputMail: '',
            inputPassword:''
        }
    }

    registrarUsuario(mail, password){
        auth.createUserWithEmailAndPassword(mail, password)
        .then( data => console.log(data))
        .catch(err => console.log(err))
    }

    loguearUsuario(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

  render() {
    return (
      <View>
        <TextInput
            style={styles.input}
            placeholder='Digita su correo electronico'
            keyboardType='email-address'
            onChangeText={(text)=> this.setState({inputMail: text}) }
            value={this.state.inputMail}
        />
        <TextInput
            style={styles.input}
            placeholder='Digita tu password'
            onChangeText={(text) => this.setState({inputPassword: text})}
            value={this.state.inputPassword}
            secureTextEntry={true}
        />
        <TouchableOpacity
            style={styles.btn}
            onPress={()=> this.registrarUsuario(this.state.inputMail, this.state.inputPassword)}
        >
            <Text style={styles.btnText}>Registrar mi usuario</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.btn}
            onPress={()=> this.loguearUsuario(this.state.inputMail, this.state.inputPassword)}
        >
            <Text style={styles.btnText}>Loguear mi usuario</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    input:{
        borderWidth:1,
        borderColor: '#3d3d3d',
        marginTop: 24,
        height:24,
        padding:5
    },
    btn:{
        marginTop:32,
        backgroundColor: '#54d0e0',
        padding: 10,
        borderRadius:20,
    },
    btnText:{
        textAlign:'center',
        fontWeight:'bold',
        color:'white'
    }
})

export default FormRegister