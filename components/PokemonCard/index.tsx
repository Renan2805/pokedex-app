import { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { addCommaBeforeLastNumber, capitalizeFirstLetter, setTypeBackgroundColor } from '../../utils/functions'

interface Props {
  pokemonUrl: string
}

const PokemonCard = (props: Props) => {

  const navigation = useNavigation()

  const [pokemon, setPokemon] = useState({
    name: '',
    url: '#',
    sprites: {
      front_default: '',
      other: {
        'official-artwork': {
          front_default: ''
        }
      }
    },
    types: [
      {
        type: {
          name: ''
        }
      }
    ],
    height: 0,
    weight: 0,
    order: 0
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
    // @ts-ignore
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Pokemon', {url: props.pokemonUrl})}>
      <Image 
        source={{uri: pokemon.sprites.other['official-artwork'].front_default}}
        style={styles.sprite}
      />
      <View style={{width: '100%', marginLeft: 10}}>
        <View style={[styles.types, {alignItems: 'center', width: '70%'}]}>
          <Text style={styles.name}>{capitalizeFirstLetter(pokemon.name)}</Text>
          <Text style={styles.type}>#{pokemon.order}</Text>
        </View>
        <View style={styles.types}>
          {
            pokemon.types.map((type, index) => {
              const bgColor = setTypeBackgroundColor(type.type.name)
              return (
                <Text key={index} style={[styles.type, {backgroundColor: setTypeBackgroundColor(type.type.name)}]}>{capitalizeFirstLetter(type.type.name)}</Text>
              )
            })
          }
        </View>
        <View style={styles.types}>
          <Text>{addCommaBeforeLastNumber(pokemon.weight) + ' Kg'}</Text>
          <Text>{pokemon.height + '"'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    minHeight: 100,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 15
  },
  sprite: {
    width: '25%',
    aspectRatio: 1 / 1, 
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15
  },
  name: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 24,
    width: 242,
  },
  types: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: 120,
  },
  type: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 18,
    color: 'black',
    alignSelf: 'center',
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 5
  }
})

export default PokemonCard