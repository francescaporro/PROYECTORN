import { View, Text } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Feed from '../screens/Feed'
import Profile from '../screens/Profile'
import NewPost from '../screens/NewPost'
import Buscador from '../screens/Buscador'
import FunctionalitiesNav from './FunctionalitiesNav';
const Tab = createBottomTabNavigator()

export default function HomeNav() {
  return (
    
    <Tab.Navigator 
    screenOptions={{ tabBarShowLabel: false }} 
    
    >
        <Tab.Screen name='FunctionalitiesNav' component={FunctionalitiesNav} options={{headerShown: false}}  options= { {tabBarIcon : ()=> <AntDesign name="home" size={24} color='rgb(97,74,80)' />} }/>
        <Tab.Screen name= 'NewPost' component={NewPost} options={{headerShown: false}} options= {{tabBarIcon: ()=> <AntDesign name="pluscircleo" size={24} color='rgb(97,74,80)' />}}/>
        <Tab.Screen name='Profile' component={Profile} options={{headerShown: false}}  options= {{tabBarIcon: ()=> <AntDesign name="user" size={24} color='rgb(97,74,80)' />}} />
        <Tab.Screen name='Buscador' component={Buscador} options={{headerShown: false}} options= {{tabBarIcon: ()=> <AntDesign name="search1" size={24} color='rgb(97,74,80)' />}} />
        
    </Tab.Navigator>
  )
}