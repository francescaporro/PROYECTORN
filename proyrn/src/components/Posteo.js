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
      <View style={styles.conteiner}>

        <TouchableOpacity onPress={() => this.props.navigation.navigate(
          'ProfileAmigo', 
          {email: this.props.data.data.owner}
        )}>
          <Text style={styles.textUser}>{this.props.data.data.owner}</Text></TouchableOpacity>

        <Image
          source={{ uri: this.props.data.data.foto }}
          style={styles.img}
        />
        
        {
          this.state.isLiked ?
            <TouchableOpacity
              onPress={() => this.unlike()}
              style={styles.likes}
            >
              <FontAwesome
                name='heart'
                size={24}
                color='rgb(216,166,178)'
              /> 
              <Text style={styles.textCantidadLikes}> {this.state.cantidadDeLikes} </Text>
            </TouchableOpacity>
            :
            <TouchableOpacity
              onPress={() => this.like()}
            >
              <FontAwesome
                name='heart-o'
                size={24}
                color='rgb(216,166,178)'
              />
            </TouchableOpacity>
        }
         {auth.currentUser.email == this.props.data.owner
                ?<TouchableOpacity onPress={ ()=> this.borrarFoto() }>
                    <Text style={styles.thing}><FontAwesome name='trash' size={17} color='tomato'/> Borrar Post</Text>
                    </TouchableOpacity>  : <Text></Text> 
                }
        
        <Text style={styles.textDescription}>{this.props.data.data.descripcion}</Text>
        <View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Comments', { id: this.props.data.id })}
            style={styles.comentariobtn}
          >
            <FontAwesome name='comment-o' size={24} color='rgb(216,166,178)'/>

            <Text style={styles.textCometario}>Agregar comentario</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}
const styles = StyleSheet.create({
  img: {
    height: 200
  }, 
  conteiner: {
    padding: 10,
  },
  textUser: {
    color: 'rgb(86,66,71)',
    fontSize: 15,
    fontWeight: 'bold',
  }, 
  textCometario: {
    padding: 15,
    fontSize: 15,
    color:'rgb(216,166,178)',
  },
 comentariobtn: {
  flex:1,
  flexDirection: 'row',
  justifyContent: 'flex-start', 
 },
  textDescription: {
    fontSize:12,
    color: 'rgb(68,68,68)',
  }, 
  textCantidadLikes: {
    fontSize: 12,
    color:'rgb(216,166,178)',
    paddingTop: 5,
  },
  likes: {
    flex:1,
    flexDirection: 'row',
  }
})