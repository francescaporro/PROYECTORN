import { View, Text, FlatList  } from 'react-native'
import React, {Component} from 'react'
import ProfileData from '../components/ProfileData'
import {db} from '../firebase/config'

class Profile extends Component {

  constructor(props){
    super(props)
    this.state = {
      usuarios: [],
      loading: true
    }
  }

  componentDidMount(){
    db.collection('users').onSnapshot(
      docs => {
        let arrUsuarios = []

        docs.forEach(doc => arrUsuarios.push({
          id: doc.id,
          data: doc.data()
        }))

        this.setState({
          usuarios: arrUsuarios,
          loading:false
        })
      }
    )
    
  }

  render(){
    return (
      <View>
        <Text>Aqui va a ir toda la infor y acciones de nuestro Profile</Text>

        <ProfileData navigation={this.props.navigation} />
        <FlatList
          data={this.state.usuarios}
          keyExtractor={ (item) => item.id.toString()}
          renderItem={({item}) => <Text>{item.data.owner}</Text>}
        />
      </View>
    )
  }
}

export default Profile
