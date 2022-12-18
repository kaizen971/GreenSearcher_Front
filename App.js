import * as React from 'react';
import { Button, View,ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/items/Home/Home.js';
import FeedScreen from './components/items/Feed/feed.js'
import ProductDetail from './components/items/ProductDetail/ProductDetail.js';
import { Provider } from 'react-redux';
import FavorisDetail from './components/items/FavorisDetail/FavorisDetail.js';
import InfoDetail from './components/items/Infos/InfosDetail.js';
import ScanFood from './components/items/ScanFood/ScanFood.js';
import configureStore from './store/index.js';
import { PersistGate } from 'redux-persist/es/integration/react';
import Search from './app/features/search/containers/index.js';
import ConnexionScreen from './app/features/connexionOrRegister/containers/index.js';


const Stack = createNativeStackNavigator();
const { persistor, store } = configureStore();

function MyStack() {
  return (
    // Provider permettant irriguer mes écrans avec Redux
    <Provider store={store}>
    <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
    <Stack.Navigator initialRouteName="Home"  screenOptions={{headerShown: false}}>
      {/* Premier écran de l'application */}
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* Menu de l'application */}
      <Stack.Screen name="Feed" component={FeedScreen} />
      {/* Ecran de recherche d'un produit*/}
      <Stack.Screen name="Search" component={Search} />
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
    </PersistGate>
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