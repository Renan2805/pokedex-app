import React, { useState } from 'react'
import { View, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
// Icons
import { FontAwesome } from '@expo/vector-icons';

// Screens
import PokemonList from './screens/PokemonList'
import Pokemon from './screens/Pokemon';

// Fonts
import { useFonts } from 'expo-font'
import {
  Poppins_400Regular,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'

export default function App() {

  const [loaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold
  })

  const BottomTab = createBottomTabNavigator()

  if(loaded) return (
    <NavigationContainer>
      <BottomTab.Navigator 
        initialRouteName='PokemonList'
        screenOptions={{
          headerShown: false
        }}
      >
        <BottomTab.Screen 
          name={'PokemonList'}
          component={PokemonStack}
          options={{
            tabBarIcon: ({color}) => <FontAwesome name="th-list" size={24} color={color} />
          }}
        />
        <BottomTab.Screen 
          name={'BerryList'}
          component={PokemonList}
          options={{
            tabBarIcon: ({color}) => <FontAwesome name="th-list" size={24} color={color} />
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  )
  else return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator 
        size={'large'}
      />
    </View>
  )
}

const PokemonStack = () => {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={'PokemonList'} component={PokemonList} />
      <Stack.Screen name={'Pokemon'} component={Pokemon} initialParams={{url: ''}}/>
    </Stack.Navigator>
  )
}