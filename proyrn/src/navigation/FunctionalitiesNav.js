import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Feed from '../screens/Feed'
import Comments from '../screens/Comments'
import ProfileAmigo from '../screens/ProfileAmigo'
const Stack = createNativeStackNavigator()

function FunctionalitiesNav() {
    return (
      <Stack.Navigator>
        <Stack.Screen
            name='Feed'
            component={Feed}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name='Comments'
            component={Comments}
            options={{headerShown: false}}
        />
         <Stack.Screen
            name='ProfileAmigo'
            component={ProfileAmigo}
            options={{headerShown: false}}
        />
      </Stack.Navigator>
    )
}

export default FunctionalitiesNav