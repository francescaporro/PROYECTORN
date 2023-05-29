import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import FormPost from '../components/FormPost'
import { db, auth } from '../firebase/config'

class NewPosts extends Component {
    constructor(props){
        super(props)
        this.state = {
            descripcion: '',
            
            likes:[],
           
        }
    }

    actualizarDescripcion(text){
        this.setState({
            descripcion: text
        })
    }

    crearPosteo({descripcion, likes}){

        db.collection('posts').add({
            owner: auth.currentUser.email,
            descripcion: descripcion,
           
            likes: likes,
           
            createdAt: Date.now(),
        })
        .then((resp)=>{
            this.props.navigation.navigate('Feed')
        })
        .catch(err => console.log(err))
    }


    render() {
        return (
        <View>
            <FormPost stateDescripcion={this.state.descripcion} actualizarDescripcion={(text) => this.actualizarDescripcion(text) } />
            <TouchableOpacity
                onPress={()=> this.crearPosteo({
                    descripcion:this.state.descripcion,
                   
                    likes: this.state.likes,
                    
                })}
            >
                <Text>Enviar el posteo</Text>
            </TouchableOpacity>
        </View>
        )
    }
}


export default NewPosts