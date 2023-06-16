import { Text, View, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import firebase from 'firebase'

export default class CommentsForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            comentario:''
        }
    }
 
    crearComentario(comentario){
        db.collection('posts')
        .doc(this.props.idPost)
        .update({
            comments: firebase.firestore.FieldValue.arrayUnion({
                owner: auth.currentUser.email,
                createdAt: Date.now(),
                comentario: comentario
            })
        })
    }

  render() {
    return (
      <View>
        <TextInput
        keyboardType='default'
        style = {styles.input}
        onChangeText={text => this.setState({comentario: text})}
        value={this.state.comentario}
        placeholder='Crea tu comentario'
        />
        <TouchableOpacity
        style={styles.btn}
        onPress={()=> this.crearComentario(this.state.comentario)}
        >
            <Text style={styles.btnText}>Enviar comentario</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    input:{
        borderWidth: 1,
        borderColor: 'rgb(229,209,218)',
        marginTop: 24,
        marginLeft: 20,
        marginRight: 20,
        height: 35,
        padding: 5,
        backgroundColor: 'rgb(255,255,255)',
        borderRadius: 20,
    },
    btn:{
        marginVertical: 32,
        backgroundColor: 'rgb(194,149,160)',
        padding: 10,
        borderRadius: 20,
        margin: 'auto',
    },
    btnText:{
        textAlign: 'center',
        fontWeight: 'bold',
        
    }
})