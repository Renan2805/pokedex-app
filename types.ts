import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  App: NavigatorScreenParams<RootTabParamList> | undefined;
  
};



export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  PokemonList: {
    generation: number
  };
  BerryList: undefined
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

type Type = {
  type: {
    name: string
  }
}

export type PokemonType = {
  name: string,
  sprites: {
    front_default: string,
    other: {
      'official-artwork': {
        front_default: string
      }
    }
  },
  types: Array<Type>
}