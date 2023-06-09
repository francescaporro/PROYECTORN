import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import HomeNav from './src/navigation/Home'; 
import Register from './src/screens/Register';
import Login from './src/screens/Login';
import { NavigationContainer } from '@react-navigation/native'; // solo puede haber un navigation container por eso lo ponemos en app
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Info from './src/screens/Info';


const Stack = createNativeStackNavigator()

export default function App() {
 
  return (
    // falta login en los stack.screen
      <NavigationContainer> 
      <Stack.Navigator> 
        <Stack.Screen name='Register' component={Register} options={{headerShown: false}}/>
        <Stack.Screen name='HomeNav' component={HomeNav} options={{headerShown: false}}/>
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
        <Stack.Screen name='Info'  component={Info} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
