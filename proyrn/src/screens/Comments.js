import { Text, View, FlatList, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import CommentsForm from '../components/CommentsForm'
import { db } from '../firebase/config'
export default class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
  }
  componentDidMount() {
    db.collection('posts')
      .doc(this.props.route.params.id)
      .onSnapshot(doc => {
        this.setState({
          data: doc.data()
        }, () => console.log(this.state.data))
      })
  }
  render() {
    return (
      <View style={styles.conteiner}>

        
          <Text>Aqui vamos a cargar todos los comentarios del posteo</Text>
          
          <FlatList
            style={styles.comments}
            data={this.state.data.comments}
            keyExtractor={item => item.createdAt.toString()}
            renderItem={({ item }) => <Text style={styles.comentario}>{item.comentario}</Text>}
          />
          


        <CommentsForm idPost={this.props.route.params.id} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: 'rgb(251,246,247)',

  },
  comments: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 20,
  },
  noCom:{
    color: 'red',
  }
  ,
  comentario:{
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
  }

})