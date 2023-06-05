import { Camera } from 'expo-camera'
import React, { Component } from 'react'
import { Text, View , StyleSheet, TouchableOpacity , Image } from 'react-native'
import { storage } from '../firebase/config'

class Camara extends Component {
    constructor(props){
        super(props)
        this.state = {
            fotoTomada : '',
            mostrarCamara: false,
            rechazoPermiso: false
        }
        this.metodosDeCamara =  null
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(resp => this.setState({ mostrarCamara: true }))
        .catch(err => this.setState({ rechazoPermiso: true }))
    }

    tomarFoto(){
        this.metodosDeCamara.takePictureAsync()
        .then(dataFoto => {
            this.setState({
                mostrarCamara: false,
                fotoTomada: dataFoto.uri
            })
        })
        .catch(err => console.log(err))
    }

    subirFotoAlStorage(){
        fetch(this.state.fotoTomada)
        .then(res => res.blob())
        .then( image => {
            const ref = storage.ref(`foto/${Date.now()}.jpg`)
            ref.put(image)
            .then(()=>{
                ref.getDownloadURL()
                .then((url)=> {
                    this.props.actualizarFoto(url)
                })
            })
        })
        .catch(err => console.log(err))
    }

    rechazarFoto(){
        this.setState({
            fotoTomada:'',
            mostrarCamara:true
        })
    }

    render(){
        return(
        <View style={styles.container}>
            {
                this.state.mostrarCamara && this.state.fotoTomada === '' ?
                <>
                    <Camera
                        style={styles.camara}
                        type= {Camera.Constants.Type.back}
                        ref={metodosDelComponente => this.metodosDeCamara = metodosDelComponente}
                    />
                    <TouchableOpacity
                        style={styles.btnCam}
                        onPress={()=> this.tomarFoto()}
                    >
                        <Text>Tomar foto</Text>
                    </TouchableOpacity>
                </>
                : this.state.mostrarCamara === false && this.state.fotoTomada !== '' ?
                    <>
                        <Image
                        source={{ uri: this.state.fotoTomada }}
                        style = {styles.foto}
                        />
                        <View
                        style={styles.btnsContainer}
                        >
                            <TouchableOpacity
                            onPress={()=> this.subirFotoAlStorage()}
                            >
                                <Text>
                                    Aceptar foto
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            onPress={()=> this.rechazarFoto()}
                            >
                                <Text>
                                    Rechazar foto
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                
                :this.state.nosDioPermiso === false && this.state.rechazoPermiso === true ?
                <View>
                    <Text>Rechazaste los permisos</Text>
                    <TouchableOpacity>
                        <Text>
                            Solicitalos de nuevo aqui
                        </Text>
                    </TouchableOpacity>
                </View> 
                :
                <Text>
                    Solicitando permisos
                </Text>
            }
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    camara:{
        flex:2
    },
    btnCam:{
        flex:1
    },
    foto:{
        flex:2
    },
    btnsContainer:{
        flex:1
    }
})

export default Camara