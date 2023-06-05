import { View, Text, FlatList } from 'react-native'
import React from 'react'
import Post from './Posteo'

export default function Posteos(props) {
  return (
    <View>
      <FlatList
        data={props.data}
        keyExtractor={(item)=> item.id.toString()}
        renderItem={({ item }) => <Post navigation={props.navigation} data={ item } /> }
      />
    </View>
  )
}