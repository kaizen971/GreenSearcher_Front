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

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Provider store={Store}>

    <Stack.Navigator initialRouteName="Home"  screenOptions={{headerShown: false}}>

      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Feed" component={FeedScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Connexion" component={ConnexionScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="FavorisDetail" component={FavorisDetail} />
      <Stack.Screen name="Infos" component={InfoDetail} />


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