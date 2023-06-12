import { Text, View, TextInput, TouchableOpacity, StyleSheet, Touchable, Image } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
import Camara from '../components/Camara'

class FormRegister extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputMail: '',
            inputPassword: '',
            nombreDeUsuario: '',
            bio: '',
            fotoDePerfil: '',
        }
    }

    registrarUsuario(mail, password, nombreDeUsuario, bio) {
        auth.createUserWithEmailAndPassword(mail, password)
            .then(data => {
                
                db.collection('users').add({
                    owner: auth.currentUser.email,
                    createdAt: Date.now(),
                    nombreDeUsuario: this.state.nombreDeUsuario,
                    bio: this.state.bio,
                    fotoDePerfil: this.state.fotoDePerfil, 
                })

                    .then(resp => console.log(resp))
                    .catch(err => console.log(err))
                    this.props.navigation.navigate('HomeNav')
            })
            .catch(err => console.log(err))

    }

    componentDidMount(){
        auth.onAuthStateChanged( user =>{
            if (user){
                this.props.navigation.navigate('HomeNav')
            }
        })
    }

  

    render() {
        return (
            <View>
                <TextInput
                    style={styles.input}
                    placeholder='Digita su correo electronico'
                    keyboardType='email-address'
                    onChangeText={(text) => this.setState({ inputMail: text })}
                    value={this.state.inputMail}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Digita tu password'
                    onChangeText={(text) => this.setState({ inputPassword: text })}
                    value={this.state.inputPassword}
                    secureTextEntry={true}
                />

                <TextInput
                    style={styles.input}
                    placeholder='Cree su nombre de usuario'
                    keyboardType="default"
                    onChangeText={(text) => this.setState({ nombreDeUsuario: text })}
                    value={this.state.nombreDeUsuario}
                />

                <TextInput
                    style={styles.input}
                    placeholder='Escriba una bio'
                    keyboardType="default"
                    onChangeText={(text) => this.setState({ bio: text })}
                    value={this.state.bio}
                />

               
                
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => this.registrarUsuario(this.state.inputMail, this.state.inputPassword, this.state.nombreDeUsuario, this.state.bio)}
                > {/* creo que aca faltaria lo de la foto*/}

                    <Text style={styles.btnText}>Registrar mi usuario</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#3d3d3d',
        marginTop: 24,
        height: 24,
        padding: 5
    },
    btn: {
        marginVertical: 32,
        backgroundColor: '#54d0e0',
        padding: 10,
        borderRadius: 20,
    },
    btnText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    }, 
  

})

export default FormRegister;