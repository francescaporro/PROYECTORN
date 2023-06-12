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
            nombreDeUsario: '',
            bio: '',
            fotoDePerfil: '',
        }
    }

    registrarUsuario(mail, password, nombreDeUsario, bio) {
        auth.createUserWithEmailAndPassword(mail, password)
            .then(data => {
                this.props.navigation.navigate('HomeNav')
                db.collection('users').add({
                    owner: auth.currentUser.email,
                    createdAt: Date.now(),
                    nombreDeUsario: this.state.nombreDeUsario,
                    bio: this.state.bio,
                    fotoDePerfil: this.state.fotoDePerfil,
                })
                    .then(resp => console.log(resp))
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    /* esto tambien es de la foto de perfil, no se si dejar actualizar footo o meterlo adentro del register, o antes*/
    actualizarFoto(url) {
        this.setState({
            fotoDePerfil: url
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

                {/*Esto es lo de camera no se si esta bien, no se si es necesario ese if*/}
                <View style={styles.container}>
                    {
                        this.state.foto !== '' ?
                            <View>
                                <TouchableOpacity
                                    onPress={() => this.crearPosteo({
                                        foto: this.state.fotoDePerfil,
                                    })}
                                >
                                    <Text>Enviar foto</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <Camara actualizarFoto={(url) => this.actualizarFoto(url)} />
                    }
                </View>
                
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => this.registrarUsuario(this.state.inputMail, this.state.inputPassword, this.state.nombreDeUsario, this.state.bio)}
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
    container:{
        flex:1,
    }

})

export default FormRegister;