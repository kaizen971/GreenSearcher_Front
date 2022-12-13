'use strict';
import axios from 'axios';
import React, { useState, useEffect, Fragment, } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
  Image,
  ImageBackground, Dimensions
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { BASE_URL, BASE_URL_FOOD } from '../constants/base_URL';
import image from "../assets/bg.png"
import Icon from "react-native-vector-icons/Ionicons";


export default function ScanFood({ navigation }) {
  const onSuccess = e => {
    // setQRcode(e.data)
    axios.get(`${BASE_URL_FOOD}/${e.data}.json`)
      .then((response) => {
        if (response.data.status != 0) {
          setunknownCode(false);
          setResponse(response.data);
        } else {
          setunknownCode(true);
        }
      })
  };
  const [response, setResponse] = React.useState(null);
  const [unknownCode, setunknownCode] = React.useState(false);

  const [QRcode, setQRcode] = React.useState(false);
  const [showsingrédient, setshowsingrédient] = React.useState(false);


  const onclick = (id) => {
    if (id) {
      axios.get(`${BASE_URL}/product/favoris/id/${id}`).then((response) => {
        if (response.data != null) {
          navigation.navigate("ProductDetail", { data: response.data })
        }
      });
    }
  }
  const showingrédients = (state) => {
    if (state == false) {
      setshowsingrédient(true)

    } else {

      setshowsingrédient(false)

    }




  }

  const switchIngredientAnalyse = (name) => {
    switch (name) {
      case "en:palm-oil":
        return "Contient de l'huile de palme";
      case "en:palm-oil-free":
        return "Contient ne contient pas d'huile d'huile de palme";
      case "en:non-vegan":
        return "Ingrédient non vegan";
      case 'en:vegetarian-status-unknown':
        return "Ingrédient inconnus pour les végétariens"
      case 'en:vegan-status-unknown':
        return "Ingrédient inconnus pour les végans"
      case 'en:non-vegetarian':
        return "Ingrédient non végétarien"
      default:
        return (name)
    }



  }

  const SCREEN_HEIGHT = Dimensions.get("window").height;
  return (
    <Fragment>
      <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
        {response == null ?

          <Fragment>
            <QRCodeScanner
              reactivate={true}
              showMarker={true}
              onRead={onSuccess}
              cameraStyle={{ height: SCREEN_HEIGHT }}
              //flashMode={RNCamera.Constants.FlashMode.torch}
              customMarker={
                <View style={styles.rectangleContainer}>
                  <View style={styles.topOverlay}>
                  </View>
                  <View style={styles.topOverlay}>
                  </View>

                  <View style={{ flexDirection: "row" }}>
                    <View style={styles.leftAndRightOverlay} />

                    <View style={styles.rectangle}>

                      <View
                        style={styles.scanBar}
                        direction="alternate-reverse"
                        iterationCount="infinite"
                        duration={1700}
                        easing="linear"
                      />
                    </View>

                    <View style={styles.leftAndRightOverlay} />
                  </View>

                  <View style={styles.bottomOverlay} />
                </View>
              }




            />
            <GoBack navigation={navigation} color={"white"}/>
          </Fragment>
          :
          <ScrollView style={styles.buttonTouchable}>
            <TouchableOpacity style={styles.touchGoHome} onPress={() => navigation.navigate('Feed')}>
              <Image
                source={require('../assets/icons/MenuIcon.png')}
                style={{ width: 15, height: 15 }}
              />
            </TouchableOpacity>
            <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20, color: "#81c684", marginBottom: 10 }}>{response.product.generic_name}</Text>
            <Image
              source={{ uri: response.product.image_front_small_url }}
              style={{ width: 200, height: 200, justifyContent: "center", alignItems: "center", alignSelf: 'center', borderRadius: 20 }}
              resizeMode="contain"
            />
            {response.product.ingredients_analysis_tags != null && response.product.ingredients_analysis_tags.length > 0 &&
              <View style={{ borderWidth: 1, padding: 10, justifyContent: "center", marginVertical: 30, borderRadius: 20 }}>
                {response.product.ingredients_analysis_tags.map((item) => {
                  return (
                    <View >
                      <Text style={{ color: 'red', textAlign: "center", fontWeight: "bold" }}>{switchIngredientAnalyse(item)}</Text>
                    </View>)
                })}
              </View>
            }
            <TouchableOpacity onPress={() => showingrédients(showsingrédient)}><Text style={{ color: "white", backgroundColor: "#81c684", textAlign: "center", borderRadius: 20, padding: 5 }}>Afficher la liste d'ingrèdient</Text></TouchableOpacity>
            {showsingrédient && response.product.ingredients &&
              <View>
                {response.product.ingredients.map((item) => {
                  return (
                    <View >
                      <Text style={{ color: 'black', textAlign: "center" }}>{item.text}</Text>
                    </View>)
                })}
              </View>
            }
            {response.product.ecoscore_data?.agribalyse?.agribalyse_food_code && <TouchableOpacity onPress={() => { onclick(response.product.ecoscore_data?.agribalyse?.agribalyse_food_code) }} style={{ backgroundColor: '#81c684', borderRadius: 80, padding: 30, marginTop: 20 }}><Text style={{ textAlign: "center", fontSize: 20, color: "white" }}>Voir les impacts</Text></TouchableOpacity>}
            {!response.product.ecoscore_data?.agribalyse?.agribalyse_food_code && <Text style={{ textAlign: "center", fontSize: 16, color: "black", marginTop: 80 }}>Désolé, nous ne trouvons pas les impacts environnementals de ce produit</Text>}
          </ScrollView>
        }
      </ImageBackground>
    </Fragment>
  );
}
const SCREEN_WIDTH = Dimensions.get("window").width;

const overlayColor = "rgba(0,0,0,0.5)"; // this gives us a black color with a 50% transparency

const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = "white";

const scanBarWidth = SCREEN_WIDTH * 0.46; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = "white";

const iconScanColor = "white";


const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  touchGoHome: {
    position: "absolute",
    marginTop: 10,
    marginBottom: 40,
    top: 20,
    left: 20
  },
  centerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    padding: 32,
    color: 'white',
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
    textAlign: "center"
  },
  buttonTouchable: {
    padding: 16
  },
  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: rectBorderColor,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 8
  },

  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    justifyContent: "center",
    alignItems: "center"

  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    paddingBottom: SCREEN_WIDTH * 0.25
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,

  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor
  }
});

AppRegistry.registerComponent('default', () => ScanFood);