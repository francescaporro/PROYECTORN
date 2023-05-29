import { View, Text } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Feed from '../screens/Feed'
import Profile from '../screens/Profile'
import NewPost from '../screens/NewPost'
const Tab = createBottomTabNavigator()

export default function HomeNav() {
  return (
    
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
        <Tab.Screen name='Feed' component={Feed}  options= { {tabBarIcon : ()=> <AntDesign name="home" size={24} color="black" />}}/>
        <Tab.Screen name='Profile' component={Profile} options= {{tabBarIcon: ()=> <AntDesign name="user" size={24} color="black" />}} />
        <Tab.Screen name= 'NewPost' component={NewPost} options= {{tabBarIcon: ()=> <AntDesign name="pluscircleo" size={24} color="black" />}}/>
    </Tab.Navigator>
  )
}