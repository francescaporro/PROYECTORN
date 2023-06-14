import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, FlatList } from 'react-native';
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
      <View>
        <Text>Buscador</Text>
        <TextInput
          placeholder="Ingresa tu email"
          onChangeText={(text) => this.metodoQueFiltra(text)}
        />
        <FlatList
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