import React, {Component} from 'react'
import {Text, View, TouchableOpacity, TextInput, StyleSheet} from 'react-native'
import { auth } from '../firebase/config'


class FormLogin extends Component {
    constructor(props){
        super(props)
        this.state = {
            email:'',
            password:''
        }
    }

    ingresar(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then( resp => this.props.navigation.navigate('HomeNav'))
        .catch( err => console.log(err))
    }

    componentDidMount(){
        auth.onAuthStateChanged( user =>{
            if (user){
                this.props.navigation.navigate('HomeNav')
            }
        })
    }

    render(){
        return(
            <View>
                <TextInput
                    style={styles.input}
                    placeholder='Correo electronico'
                    keyboardType='email-address'
                    value={this.state.email}
                    onChangeText={(text)=> this.setState({email : text})}
                />

                <TextInput
                    placeholder='Contraseña'
                    keyboardType='default'
                    value={this.state.password}
                    onChangeText={(text)=> this.setState({password : text})}
                    style={styles.input}
                    secureTextEntry={true}
                />
                <TouchableOpacity
                    style={styles.btn}
                    onPress={()=> this.ingresar(this.state.email, this.state.password)}
                >
                    <Text style={styles.btnText}>Ingresar</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 15,
        justifyContent: 'center',
    },
    input:{
        borderWidth: 1,
        borderColor: 'rgb(229,209,218)',
        marginTop: 24,
        height: 24,
        padding: 5,
        backgroundColor: 'rgb(255,255,255)',
    },
    btn:{
        marginVertical: 32,
        backgroundColor: 'rgb(194,149,160)',
        padding: 10,
        borderRadius: 20,
    },
    btnText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    }
})

export default FormLogin