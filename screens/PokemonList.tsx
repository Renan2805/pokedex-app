import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, ScrollView, Image, StatusBar, View } from 'react-native';
import * as ExpoStatusBar from 'expo-status-bar'
import axios, { CancelTokenSource } from 'axios';
import SelectDropdown from 'react-native-select-dropdown';

import { useFonts } from 'expo-font'
import {
  Poppins_400Regular,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'

import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SeacrhBar';

const PokemonList = () => {

  const [loaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold
  })

  const [pokemons, setPokemons] = useState(
    [
      {
        url: '',
        name: ''
      }
    ]
  )

  const [generation, setGeneration] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8>(1)

  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setLoading(true)
    const token = fetchPokemons()

    return () => {
      token.cancel()
    }
  }, [])

  const fetchPokemons = () => {
    let options = handleGen(generation)
    let token = axios.CancelToken.source()
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?offset=${options.offset}&limit=${options.limit}`, {
        cancelToken: token.token
      })
      .then(res => {
        setPokemons(res.data.results)
        setLoading(false)
      })
      .catch(err => {
        console.log(err);
      })
    return token
  }

  const handleGen = (generation: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8) => {
    switch(generation) {
      case 1:
        return {offset: 0, limit: 151}
      case 2:
        return {offset: 151, limit: 100}
      case 3:
        return {offset: 251, limit: 135}
      case 4:
        return {offset: 386, limit: 107}
      case 5:
        return {offset: 494, limit: 156}
      case 6:
        return {offset: 649, limit: 72}
      case 7:
        return {offset: 721, limit: 88}
      case 8:
        return {offset: 809, limit: 96}
    }
  }

  if(!loading) return (
    <View style={{flex: 1, padding: 10, backgroundColor: 'white'}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontFamily: 'Poppins_700Bold', fontSize: 36}}>Pokemons</Text>
        <SelectDropdown 
          data={[1, 2, 3,4, 5, 6, 7, 8]}
          onSelect={(sel, index) => {
            setLoading(true)
            setPokemons([{url: '', name: ''}])
            setGeneration(sel)
            fetchPokemons()
          }}
          rowTextForSelection={(item) => { return item }}
          buttonTextAfterSelection={(sel) => { return sel }}
          defaultButtonText={'Geração'}
          buttonTextStyle={{fontFamily: 'Poppins_400Regular'}}
          rowTextStyle={{fontFamily: 'Poppins_400Regular', fontSize: 24}}
          buttonStyle={{width: '40%', borderRadius: 10}}
        />

      </View>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} >
        <ExpoStatusBar.StatusBar />
        {
          pokemons.map((poke, index) => (
            
            <PokemonCard 
              pokemonUrl={poke.url}
              key={index}  
            />
          ))
        }
      </ScrollView>
    </View>
  )
  else return (
    <Text>Loading...</Text>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

export default PokemonList