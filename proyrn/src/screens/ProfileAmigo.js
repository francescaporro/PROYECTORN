import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { db } from '../firebase/config'
import { disableExpoCliLogging } from 'expo/build/logs/Logs'
import Posteos from '../components/Posteos'

export default class ProfileAmigo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            posteos: [],
        }
    }
    componentDidMount() {
            db.collection('users')
            .where('owner', '==', this.props.route.params.email)
            .onSnapshot(docs => {
                let arrUser = []
    
                docs.forEach(doc => arrUser.push({
                    id: doc.id,
                    data: doc.data(),
                }))
    
                this.setState({
                    users: arrUser[0]
                }, ()=> console.log(this.state))
            })

        db.collection('posts')
            .where('owner', '==', this.props.route.params.email)
            .onSnapshot(docs => {
                let arrPosts = []
                docs.forEach(doc => arrPosts.push({
                    id: doc.id,
                    data: doc.data()
                }))

                this.setState({
                    posteos: arrPosts
                })
            })
    }
    render() {
        return (
            <View>
                 <Text style={styles.user}>@{this.state.users?.nombreDeUsuario}</Text>
                 <Text style={styles.bio}> Biografia: {this.state.users?.bio}</Text>
                <Posteos
                    data={this.state.posteos}
                    navigation={this.props.navigation}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    user:{
        textAlign: 'center',
        fontFamily: 'sans-serif',
        fontSize: 15,
        marginTop: 10,
        fontWeight:'bold'
    },
    bio:{
        textAlign: 'center',
        fontWeight: 'semi-bold',
        fontSize: 12,
        marginTop: 3,
    },
}) 
