import React, { useState, useEffect } from 'react';
import { Button, View, TouchableOpacity, Text, ScrollView, SafeAreaView, StyleSheet, TextInput, Image } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../constants/base_URL.js';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'react-native-three-dots-loader'
import scaleScore from '../../../utils.js';


export default function InfoDetail({ navigation }) {
  const { isconnect, email } = useSelector(state => state.userReducer);
  const [loading, setloading] = React.useState(false);
  const [data, setData] = React.useState(null);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View>
      <TouchableOpacity style={{flexDirection:"row",marginBottom:20,marginTop:20}} onPress={() => navigation.navigate('Feed')}>
      <Image 
        source={require('../assets/icons/MenuIcon.png')}  
        style={{width: 24, height: 24 }}
      />
      <Text style={{fontWeight:"bold",marginLeft:8}}>Retour</Text>
      </TouchableOpacity>
        <Text style={{fontWeight:"bold", fontSize:28,textAlign:"center",marginBottom:18}}>Information sur l'application</Text>
        <Text style={{fontWeight:"normal",fontStyle:"italic", fontSize:20,textAlign:"center",marginBottom:30}}>Bienvenue sur GreenSearcher, cette application permet de connaitre l'impact environnemental d'un aliment en France</Text>
        <Text style={{fontWeight:"normal", fontSize:14,textAlign:"center",marginBottom:20,marginHorizontal:10}}>Nous utilisons le <Text style={{fontWeight:"bold"}}>score</Text> unique du produit pour noter le produit. Voir l'image ci-dessous : </Text>
        <View style={{justifyContent:"center",alignContent:"center",alignItems:"center"}}>
        <Text style={{color:'#1E8F4E',fontSize:20}}>{`0-0.28 : Très Bon`}</Text>
        <Text style={{color:'#30CC71',fontSize:20}}>{`0.28-0.43 : Bon`}</Text>
        <Text style={{color:'#FFC900',fontSize:20}}>{`0.43-0.75 : Moyen`}</Text>
        <Text style={{color:'#E72D19',fontSize:20}}>{`1.5-<3: Mauvais`}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
