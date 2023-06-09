import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { db } from '../firebase/config'

export default class ProfileAmigo extends Component {
    
        constructor(props){
            super(props)
            this.state = {
                infoUser:[],
                posteos:[],
                owner: this.props.route.params.user
            }
        }
    componentDidMount(){
        db.collection('users')
        .where('owner', '==', this.props.route.params.email)
        .onSnapshot(docs => {
            let arrUser = []

            docs.forEach(doc=> arrUser.push({id: doc.id}))
        })
    }
    render() {
        return (
            <View>
                <Text> {this.props.route.params.email} </Text>
            </View>
        )
    }
}
