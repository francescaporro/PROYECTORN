import React, { Component } from 'react'
import { Text, View, TextInput } from 'react-native'

export default class FormPost extends Component {
    render() {
        return (
            <View>
                <TextInput 
                style
                keyboardType='default'
                value=''
                onChangeText={(text) => this.props.actualizarDescripcion(text)}
                />
            </View>
        )
    }
}

const styles = StyleSheet