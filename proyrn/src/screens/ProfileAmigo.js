import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { db } from '../firebase/config'
import { disableExpoCliLogging } from 'expo/build/logs/Logs'
import Posteos from '../components/Posteos'

export default class ProfileAmigo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            infoUser: [],
            posteos: [],
            owner: this.props.route.params.user,
        }
    }
    componentDidMount() {
            db.collection('users')
            .where('owner', '==', this.props.route.params.email)
            .onSnapshot(docs => {
                let arrUser = []
    
                docs.forEach(doc => arrUser.push({
                    id: doc.id,
                    data: doc.data()
                }))
    
                this.setState({
                    infoUser:arrUser[0]
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
               
                <Posteos
                    data={this.state.posteos}
                    navigation={this.props.navigation}
                />
            </View>
        )
    }
}
