'use strict';
import axios from 'axios';
import React, { useState, useEffect, Fragment } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
  Image,
  ImageBackground
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { BASE_URL, BASE_URL_FOOD } from '../constants/base_URL';
import image from "../assets/bg.png"


export default function ScanFood({ navigation }) {
  const onSuccess = e => {
    // setQRcode(e.data)
    axios.get(`${BASE_URL_FOOD}/${e.data}.json`)
    .then((response) => {
      if(response.data.status != 0){
        setunknownCode(false);
        setResponse(response.data);
      }else{
        setunknownCode(true);
      }
    })
  };
  const [response, setResponse] = React.useState(null);
  const [unknownCode, setunknownCode] = React.useState(false);

  const [QRcode, setQRcode] = React.useState(false);
  const [showsingrédient, setshowsingrédient] = React.useState(false);


  const onclick = (id) =>{
    if(id){
    axios.get(`${BASE_URL}/product/favoris/id/${id}`).then((response) => {
      if (response.data != null) {
        navigation.navigate("ProductDetail", { data: response.data })
      }
    });
    }
  }
  const showingrédients = (state) =>{
    if(state==false){
      setshowsingrédient(true)
      
    }else{

      setshowsingrédient(false)

    }




  }

  const switchIngredientAnalyse = (name) =>{
    switch (name) {
      case "en:palm-oil":
        return"Contient de l'huile de palme";
      case "en:palm-oil-free":
        return"Contient ne contient pas d'huile d'huile de palme";
      case "en:non-vegan":
        return"Ingrédient non vegan";
      case 'en:vegetarian-status-unknown':
        return"Ingrédient inconnus pour les végétariens"
      case 'en:vegan-status-unknown':
          return"Ingrédient inconnus pour les végans"
      case 'en:non-vegetarian':
          return"Ingrédient non végétarien"
      default:
        return(name)
    }



  }
    return (
      <Fragment>
      <ImageBackground source={image} resizeMode="cover" style={{flex: 1,justifyContent: "center"}}>
      {response == null ? <QRCodeScanner
        onRead={onSuccess}
        //flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <TouchableOpacity onPress={()=>{navigation.navigate("Feed")}}>
          <Text style={styles.centerText}>Retour</Text>
          </TouchableOpacity>
        }
        bottomContent={
          <View>
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text>{QRcode}</Text>
            {unknownCode &&<Text style={{color:"red",fontWeight:"bold"}}>Ce produit n'est pas présent dans notre base de donnée</Text>}
            <Text style={styles.buttonText}>Scannez un QR code</Text>
          </TouchableOpacity>
          </View>
        }
      /> :
      <ScrollView style={styles.buttonTouchable}>
          <TouchableOpacity style={styles.touchGoHome} onPress={() => navigation.navigate('Feed')}>
            <Image
              source={require('../assets/icons/MenuIcon.png')}
              style={{ width: 24, height: 24 }}
            />
            <Text style={styles.labelBtn}>Retour</Text>
          </TouchableOpacity>
      <Text style={{textAlign:"center", fontWeight:"bold",fontSize:20,color:"#81c684",marginBottom:10}}>{response.product.generic_name}</Text>
      <Image
          source={{uri: response.product.image_front_small_url}}
          style={{width:200,height:200, justifyContent:"center",alignItems:"center",alignSelf:'center',borderRadius:20 }}
          resizeMode="contain"
      />
      {response.product.ingredients_analysis_tags !=null && response.product.ingredients_analysis_tags.length >0 && 
      <View style={{borderWidth:1,padding:10,justifyContent:"center",marginVertical:30,borderRadius:20}}>
      {response.product.ingredients_analysis_tags.map((item)=>{
        return(
        <View >
        <Text style={{color:'red',textAlign:"center",fontWeight:"bold"}}>{switchIngredientAnalyse(item)}</Text>
        </View>)
      })}
      </View>
      }
      <TouchableOpacity onPress={()=>showingrédients(showsingrédient)}><Text style={{color:"white",backgroundColor:"#81c684",textAlign:"center",borderRadius:20,padding:5}}>Afficher la liste d'ingrèdient</Text></TouchableOpacity>
      {showsingrédient && response.product.ingredients &&
      <View>
      {response.product.ingredients.map((item)=>{
        return(
        <View >
        <Text style={{color:'black',textAlign:"center"}}>{item.text}</Text>
        </View>)
      })}
      </View>
      }
      {response.product.ecoscore_data?.agribalyse?.agribalyse_food_code &&<TouchableOpacity onPress={()=>{onclick(response.product.ecoscore_data?.agribalyse?.agribalyse_food_code)}} style={{backgroundColor: '#81c684',borderRadius:80,padding:30,marginTop:20}}><Text style={{textAlign:"center",fontSize:20,color:"white"}}>Voir les impacts</Text></TouchableOpacity>}
      {!response.product.ecoscore_data?.agribalyse?.agribalyse_food_code && <Text style={{textAlign:"center",fontSize:16,color:"black",marginTop:80}}>Désolé, nous ne trouvons pas les impacts environnementals de ce produit</Text>}
      </ScrollView>
      }
      </ImageBackground>
      </Fragment>
    );
  }


const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  touchGoHome:{

    flexDirection: "row", 
    marginTop: 10 ,
    marginBottom:40

  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
    textAlign:"center"
  },
  buttonTouchable: {
    padding: 16
  }
});

AppRegistry.registerComponent('default', () => ScanFood);