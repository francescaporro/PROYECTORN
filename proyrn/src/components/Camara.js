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
                        <Text style={styles.tomarFoto}>Tomar foto</Text>
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
                            style={styles.aceptarFoto}
                            onPress={()=> this.subirFotoAlStorage()}
                            >
                                <Text style={styles.textFoto}>
                                    Aceptar foto
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            style={styles.rechazarFoto}
                            onPress={()=> this.rechazarFoto()}
                            >
                                <Text style={styles.textFoto}>
                                    Rechazar foto
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                
                :this.state.nosDioPermiso === false && this.state.rechazoPermiso === true ?
                <View>
                    <Text>Rechazaste los permisos</Text>
                    <TouchableOpacity>
                        <Text >
                            Solicitalos de nuevo aqui
                        </Text>
                    </TouchableOpacity>
                </View> 
                :
                <Text style={styles.solicitar}>
                    Solicitando permisos...
                </Text>
            }
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'rgb(239,219,224)'
    },
    camara:{
        flex:2,
        margin: 10,
        
    },
    btnCam:{
        marginVertical: 32,
        backgroundColor: 'rgb(194,149,160)',
        padding: 10,
        borderRadius: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    tomarFoto: {
        textAlign: 'center',
        fontSize: 20, 
        color: 'white',
        fontWeight: 'bold',
    },
    aceptarFoto: {
        marginVertical: 32,
        backgroundColor: 'rgb(197,225,185)',
        padding: 10,
        borderRadius: 20,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,
    },
    textFoto:{
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    rechazarFoto:{
        marginVertical: 32,
        backgroundColor: 'rgb(227,117,117)',
        padding: 10,
        borderRadius: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    foto:{
        flex:2,
        margin: 10,
    },
    btnsContainer:{
        flex:1,
    },
    solicitar:{
        textAlign: 'center',
        fontSize: 20,
        margin: 'auto',
        fontWeight: 'bold',
        color: 'white'
    }
})

export default Camara