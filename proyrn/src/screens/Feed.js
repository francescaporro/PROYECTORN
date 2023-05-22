import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { db } from '../firebase/config'

export default class Feed extends Component {
    componentDidMount(){
        db.collection('posts').onSnapshot( docs=> {
            let arrDocs=[]

            docs.forEach(doc=> arrDocs.push({
                id: doc.id,
                data: doc.data()
            }
            ))
        })
    }
    render() {
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}
