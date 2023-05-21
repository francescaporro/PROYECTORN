import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home'
import Profile from '../screens/Profile'

const Tab = createBottomTabNavigator()

export default function HomeNav() {
  return (
    <Tab.Navigator>
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='Profile' component={Profile} />
    </Tab.Navigator>
  )
}