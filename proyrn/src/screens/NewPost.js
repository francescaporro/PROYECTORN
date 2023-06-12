import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import FormPost from '../components/FormPost'
import { db, auth } from '../firebase/config'
import Camara from '../components/Camara'
class NewPosts extends Component {
    constructor(props){
        super(props)
        this.state = {
            descripcion: '',
            foto: '',
            likes:[],
            comments: []
           
        }
    }

    actualizarDescripcion(text){
        this.setState({
            descripcion: text
        })
    }

    actualizarFoto(url){
        this.setState({
            foto: url
        })
    }

    crearPosteo({descripcion, foto, likes}){

        db.collection('posts').add({
            owner: auth.currentUser.email,
            descripcion: descripcion,
            foto: foto,
            likes: likes,
            comments: this.state.comments,
            createdAt: Date.now(),
        })
        .then((resp)=>{
            this.props.navigation.navigate('Feed')
        })
        .catch(err => console.log(err))
    }


    render() {
        return (
        <View style={styles.container}>
            {
                this.state.foto !== '' ?
                <View>
                    <FormPost stateDescripcion={this.state.descripcion} actualizarDescripcion={(text) => this.actualizarDescripcion(text) } />
                    <TouchableOpacity
                        onPress={()=> this.crearPosteo({
                            descripcion:this.state.descripcion,
                            foto:this.state.foto,
                            likes: this.state.likes,
                           
                        })}
                    >
                        <Text>Enviar el posteo</Text>
                    </TouchableOpacity>
                </View>
                :
                <Camara actualizarFoto={(url)=> this.actualizarFoto(url)} />
            }
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})

export default NewPosts