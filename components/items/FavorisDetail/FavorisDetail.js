import React, { useState, useEffect } from 'react';
import { Button, View, TouchableOpacity, Text, ScrollView, SafeAreaView, StyleSheet, TextInput, Image } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../constants/base_URL.js';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'react-native-three-dots-loader'
import scaleScore from '../../../utils.js';


export default function FavorisDetail({ navigation }) {
  const { isconnect, email } = useSelector(state => state.userReducer);
  const [loading, setloading] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [itemClick, setItemClick] = React.useState(null);

  const checkFavoris = (id) => {
    setloading(true);
    axios.get(`${BASE_URL}/product/favoris`).then((response) => {
      setloading(false);
      if (response.data == "Problème d'authentification") {
        console.log(response.data)
        return setData(null)
      }
      setData(response.data)
    }).catch((response) => {
      setloading(false);

      console.log("failed")

    });
  }

  useEffect(() => {
    // Met à jour le titre du document via l’API du navigateur
    checkFavoris()
  }, []);

  const onclickItem = (id) => {

    if (id != null) {
      axios.get(`${BASE_URL}/product/favoris/id/${id}`).then((response) => {
        setItemClick(response.data)
        if (response.data != null) {
          navigation.navigate("ProductDetail", { data: response.data })
        }
      });
    }
    else {
      setItemClick(null)
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        {!loading ?
          <View>
            <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 35 }}>Favoris</Text>
            {data != null && data.length > 0 &&
              data.map((response,index) => {
                return (

                  <TouchableOpacity key={index} style={{ flexDirection: 'row', justifyContent: "space-around", borderWidth: 1, marginHorizontal: 15, marginVertical: 10, borderRadius: 20, padding: 10 }} onPress={() => onclickItem(response.id)}>
                    <Text style={{ flex: 0.8, fontSize: 20 }}>{response.nom}</Text>
                    <Text style={{ fontSize: 16, color: scaleScore(response.scoreEF.synthese) }}>{Math.round((response.scoreEF.synthese) * 100) / 100}</Text>
                  </TouchableOpacity>


                )
              })
            }
            {data == null && <View><Text style={{textAlign:"center"}}>Pas de favoris , ajoutez le dans la partie Recherche ou Authentifiez vous si vous ne l'êtes pas</Text></View>}


          </View>

          :

          <Loader />}
      </ScrollView>
    </SafeAreaView>
  );
}
