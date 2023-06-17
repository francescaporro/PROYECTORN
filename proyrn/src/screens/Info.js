import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import MyImagePicker from '../components/MyImagePicker'
import { db } from '../firebase/config'
export default class Info extends Component {
  constructor(props){
    super(props)
    this.state ={
        fotoDePerfil:''
    }
  }

  actualizarEstadoFotoDePerfil(url){
    this.setState({fotoDePerfil: url})
  }

  actualizarDocDelUsuario(){
    console.log(this.props.route.params.docId)
    db
    .collection('users')
    .doc(this.props.route.params.docId)
    .update({
        fotoPerfil: this.state.fotoDePerfil
    })
    .then(resp => {
        this.props.navigation.navigate('HomeNav')
    })
  }
  
  
    render() {
    return (
      <View>
        <Text>Aqui vamos a cargar la informacion adicional</Text>
        <MyImagePicker actualizarFotoPerfil={(url)=> this.actualizarEstadoFotoDePerfil(url)} />
        {
            this.state.fotoDePerfil !== '' ?
        <TouchableOpacity
        onPress={()=> this.actualizarDocDelUsuario()}
        >
            <Text>
                Añadir foto de perfil
            </Text>
        </TouchableOpacity>
        : null
        }
        <TouchableOpacity>
            <Text>
                Omitir este paso
            </Text>
        </TouchableOpacity>
      </View>
    )
  }
}