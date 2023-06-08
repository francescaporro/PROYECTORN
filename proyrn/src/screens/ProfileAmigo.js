import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { db } from '../firebase/config'


export default class ProfileAmigo extends Component {
    constructor(props){
        super(props)
        this.state={
            infoUser:''
        }
    }
    componentDidMount(){
        db
        .collection('users')
        .where('owner', '==', this.props.route.params.email)
        .onSnapshot(docs => {
            let arrUser = []

            docs.forEach(doc=> arrUser.push({
                id: doc.id,
                data: doc.data()
            }))
            this.setState({
                infoUser:arrUser[0]
            },()=>console.log(this.state))
        })
       
    }
    render() {
        return (
            <View>
                {
                    this.state.infoUser !== ''?
                    <>
                    <Text>{this.state.infoUser.data.owner}</Text>
                    <Text>{this.state.infoUser.data.createdAt}</Text>
                    </>
                    : 
                    null
                }
                
            </View>
        )
    }
}
