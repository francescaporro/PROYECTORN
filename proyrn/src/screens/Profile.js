import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import { auth, db } from "../firebase/config";
import Post from '../components/Posteos';
import Posteos from '../components/Posteos';


class Profile extends Component{

    constructor(props){
        super(props)
        this.state={
            users: {},
            posts: []
        }
    }


    componentDidMount () {
        db.collection('users')
        .where('owner', '==', auth.currentUser.email)
        .onSnapshot(
            docs => {
                docs.forEach(doc => {
                    this.setState({
                        users: doc.data()
                    })
                })
            })

        db.collection('posts')
        .where('owner', '==', auth.currentUser.email)
        .onSnapshot(
            docs => {
                let posts = []
                
                docs.forEach(doc => { 
                  posts.push({ 
                    id: doc.id,
                    data: doc.data()
                  })
                  this.setState({
                    posts: posts,
                   
                  })  
                  })
                }
              
        )
    }
  

    Logout(){
        auth.signOut();
        this.props.navigation.navigate('Login');
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.profileCon}>
                <Text style={styles.user}>@{this.state.users?.nombreDeUsuario}</Text>
                <Text style={styles.bio}> Biografia: {this.state.users?.bio}</Text>
                </View>
                <TouchableOpacity onPress={ ()=> this.Logout()} >
                    <Text style={styles.log}>Logout</Text>
                </TouchableOpacity>
                <Text>Tus posts: {auth.currentUser.email}</Text>
                
                <FlatList
                    data={this.state.posts}//renderizamos posteos que seteamos en el estado anterior
                    keyExtractor={item=>item.id.toString()}
                    renderItem={({item}) => <Posteos data={this.state.posts} navigation={this.props.navigation}/> }
                />
                
            </View>

        )
    }
}

const styles = StyleSheet.create({
    photo:{
        flex:1,
        borderRadius:40,
        justifyContent: 'center',
    },
    container:{
        margin:10, 
        
    },
    profileCon: {
        backgroundColor: 'rgb(239,219,224)',
    },
    user:{
        textAlign: 'center',
        fontFamily: 'sans-serif',
        fontSize: 15,
        marginTop: 10,
        fontWeight:'bold'
    },
    log:{
        textAlign: 'center',
        fontFamily: 'sans-serif',
        fontSize: 11,
        marginTop: 7,
        color: 'grey',
        fontStyle: 'italic'
    },
    bio:{
        textAlign: 'center',
        fontWeight: 'semi-bold',
        fontSize: 12,
        marginTop: 3,
    },
}) 

export default Profile;