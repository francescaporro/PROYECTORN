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
            error: '',
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

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate('HomeNav')
            }
        })
    }



    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder='Correo electronico*'
                    keyboardType='email-address'
                    onChangeText={(text) => this.setState({ inputMail: text })}
                    value={this.state.inputMail}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Contraseña*'
                    onChangeText={(text) => this.setState({ inputPassword: text })}
                    value={this.state.inputPassword}
                    secureTextEntry={true}
                />

                <TextInput
                    style={styles.input}
                    placeholder='Nombre de usuario*'
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


                
                {this.state.inputMail && this.state.inputPassword && this.state.nombreDeUsuario && this.state.error === '' ? (
                    <TouchableOpacity
                        style={styles.btn}
                    
                        onPress={() => this.registrarUsuario(this.state.inputMail, this.state.inputPassword, this.state.nombreDeUsuario, this.state.bio)}
                    >
                        <Text style={styles.btnText}>Registrar mi usuario</Text>
                    </TouchableOpacity>
                ) : this.state.error ? (
                    <Text style={styles.error}>{this.state.error}</Text>
                ) : (
                    
                    <Text style={styles.alerta}>* Los campos de email, contraseña y nombre de usuario son obligatorios para registrarse</Text>
                    
                )}

                
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
    input: {
        borderWidth: 1,
        borderColor: 'rgb(229,209,218)',
        marginTop: 24,
        height: 24,
        padding: 5,
        backgroundColor: 'rgb(255,255,255)',
    },
    btn: {
        marginVertical: 32,
        backgroundColor: 'rgb(194,149,160)',
        padding: 10,
        borderRadius: 20,
    },
    btnText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    },
    alerta: {
        color: 'rgb(122,0,18)',
        fontWeight: 'bold',
        fontSize: 12,
    }


})

export default FormRegister;