import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import firebase from 'firebase'


export default class Post extends Component {

  constructor(props) {
    super(props)
    this.state = {
      cantidadDeLikes: this.props.data.data.likes.length,
      isLiked: false,
      
    }
  }

  componentDidMount() {
    let estaMiLike = this.props.data.data.likes.includes(auth.currentUser.email)
    if (estaMiLike === true) {
      this.setState({
        isLiked: true
      })
    }
  }


  like() {
    db.collection('posts')
      .doc(this.props.data.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
      })
      .then((resp) => {
        this.setState({
          cantidadDeLikes: this.state.cantidadDeLikes +1,
          isLiked: true
        })
      })
      .catch(err => console.log(err))

  }

  unlike() {
    db.collection('posts').doc(this.props.data.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
      })
      .then((resp) => this.setState({
        cantidadDeLikes: this.state.cantidadDeLikes -1,
        isLiked: false
      }))
      .catch(err => console.log(err))


  }

  borrarFoto(){
    if(auth.currentUser.email == this.props.data.owner){
        db.collection('posts')
    .doc(this.props.data.id) //identificar el documento
    .delete({
    })
    .then(()=> {
        console.log('Documento borrado')
        this.props.navigation.navigate('Home')
        location.reload(true)
    })
    .catch(e=>console.log(e))
    }
}


  render() {
    return (
      <View>

        <TouchableOpacity onPress={() => this.props.navigation.navigate(
          'ProfileAmigo', 
          {email: this.props.data.data.owner}
        )}>
          <Text>{this.props.data.data.owner}</Text></TouchableOpacity>

        <Image
          source={{ uri: this.props.data.data.foto }}
          style={styles.img}
        />
        
        <Text>{this.props.data.data.descripcion}</Text>
        {
          this.state.isLiked ?
            <TouchableOpacity
              onPress={() => this.unlike()}
            >
              <FontAwesome
                name='heart'
                size={24}
                color='red'
              /> 
              {this.state.cantidadDeLikes}
            </TouchableOpacity>
            :
            <TouchableOpacity
              onPress={() => this.like()}
            >
              <FontAwesome
                name='heart-o'
                size={24}
                color='red'
              />
            </TouchableOpacity>
        }
         {auth.currentUser.email == this.props.data.owner
                ?<TouchableOpacity onPress={ ()=> this.borrarFoto() }>
                    <Text style={styles.thing}><FontAwesome name='trash' size={17} color='tomato'/> Borrar Post</Text>
                    </TouchableOpacity>  : <Text></Text> 
                }
        <View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Comments', { id: this.props.data.id })}
          >
            <Text>Agregar comentario</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}
const styles = StyleSheet.create({
  img: {
    height: 200
  }
})