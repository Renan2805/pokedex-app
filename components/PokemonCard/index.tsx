import { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import axios from 'axios'
import { capitalizeFirstLetter } from '../../utils/functions'

interface Props {
  pokemonUrl: string
}

const PokemonCard = (props: Props) => {

  const [pokemon, setPokemon] = useState({
    name: '',
    url: '#',
    sprites: {
      front_default: ''
    },
    types: [
      {
        type: {
          name: ''
        }
      }
    ],
    height: 0,
    weight: 0
  })

  useEffect(() => {
    axios
      .get(props.pokemonUrl)
      .then(res => {
        setPokemon(res.data)
      })
      .catch(err => console.log(err))
  }, [])
  if(pokemon.url === '#') return (
    <></>
  )
  else return (
    <View style={styles.card}>
      <Image 
        source={{uri: pokemon.sprites.front_default}}
        style={styles.sprite}
      />
      <View style={{width: '100%', marginLeft: 10}}>
        <Text style={styles.name}>{capitalizeFirstLetter(pokemon.name)}</Text>
        
        <View style={styles.types}>
          {
            pokemon.types.map((type, index) => (
              <Text key={index} style={styles.type}>{type.type.name}</Text>
            ))
          }
        </View>
        <View style={styles.types}>
          <Text>{pokemon.weight}</Text>
          <Text>{pokemon.height}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '80%',
    minHeight: 100,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#6589b8',
    marginVertical: 20,
    borderRadius: 15
  },
  sprite: {
    width: 100, 
    height: 100, 
    backgroundColor: '#333333', 
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15
  },
  name: {
    fontSize: 24,
    width: '100%',
  },
  types: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: 120,
  },
  type: {
    fontSize: 18,
    color: 'black',
  }
})

export default PokemonCard