import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, FlatList, StyleSheet} from 'react-native';
import { db } from '../firebase/config';


export default class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busqueda: '',
      usuarios: [], 
      usuariosBackup: []
    };
  }

  componentDidMount() {
    db.collection('users').onSnapshot((docs) => {
      let arrUsers = [];
      docs.forEach((doc) => {
        arrUsers.push({
          id: doc.id,
          data: doc.data()
        });
      });
      this.setState({ 
        usuarios: arrUsers,
        usuariosBackup: arrUsers
      });
    });
  }

  metodoQueFiltra(text) {
    let arrFiltrado = this.state.usuariosBackup.filter(
      (usuario) => usuario.data.owner.toLowerCase().includes(text.toLowerCase())
    );
    this.setState({ usuarios: arrFiltrado });
  }

  render() {
    return (
      <View style={styles.conteiner}>
        <View style={styles.search}>
        
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu email"
          onChangeText={(text) => this.metodoQueFiltra(text)}
        />
        </View>
        <FlatList
          style={styles.conteinerFlatlist}
          data={this.state.usuarios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('ProfileAmigo', {
                  email: item.data.owner
                })
              }
            >
              <Text>{item.data.owner}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: 'rgb(251,246,247)', 
    
  },
  conteinerFlatlist:{
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 20,
  },
  input: {
      borderWidth: 3,
      borderColor: 'rgb(229,209,218)',
      marginTop: 24,
      marginLeft: 20,
      marginRight: 20,
      height: 35,
      padding: 5,
      backgroundColor: 'rgb(255,255,255)',
      borderRadius: 20,
  }
  
  
})