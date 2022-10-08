import * as React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/items/Home/Home.js';
import FeedScreen from './components/items/Feed/feed.js'
import SearchScreen from './components/items/Search/Search.js';
import ProductDetail from './components/items/ProductDetail/ProductDetail.js';
import ConnexionScreen from './components/items/Connexion/ConnexionScreen.js'
import { Provider } from 'react-redux';
import { Store } from './redux/store';
import FavorisDetail from './components/items/FavorisDetail/FavorisDetail.js';
import InfoDetail from './components/items/Infos/InfosDetail.js';
import ScanFood from './components/items/ScanFood/ScanFood.js';
const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    // Provider permettant irriguer mes écrans avec Redux
    <Provider store={Store}>
    <Stack.Navigator initialRouteName="Home"  screenOptions={{headerShown: false}}>
      {/* Premier écran de l'application */}
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* Menu de l'application */}
      <Stack.Screen name="Feed" component={FeedScreen} />
      {/* Ecran de recherche d'un produit*/}
      <Stack.Screen name="Search" component={SearchScreen} />
      {/* Ecran de connexion et d'inscripption*/}
      <Stack.Screen name="Connexion" component={ConnexionScreen} />
      {/* Ecran de connexion et d'inscripption*/}
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      {/* Ecran détaillant tes produit préféré*/}
      <Stack.Screen name="FavorisDetail" component={FavorisDetail} />
      {/* Ecran d'information sur l'application*/}
      <Stack.Screen name="Infos" component={InfoDetail} />
      <Stack.Screen name="ScanFood" component={ScanFood} />

    </Stack.Navigator>
    </Provider>

  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}