import * as React from 'react';
import { Button, ImageBackground, View, TouchableOpacity, Text, ScrollView, SafeAreaView, Image, StyleSheet } from 'react-native';
import { Card } from 'react-native-shadow-cards';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setlastName, setisConnect, setfirstName, setEmail } from '../../../redux/action';
import { BASE_URL } from '../constants/base_URL';
import image from "../assets/bg.png"
import GoBack from '../../../ComponentsGeneral/goBack';

export default function Feed({ navigation }) {
  const { isconnect, firstname, lastname, email } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(setisConnect(false));
    dispatch(setfirstName(null));
    dispatch(setlastName(null));
    dispatch(setEmail(null));
    axios.get(`${BASE_URL}/product/logout`)
  }
  return (
    <SafeAreaView style={styles.containerFeed}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <ScrollView style={styles.scrollView}>

        <View style={styles.viewBtn}>
          {isconnect && <TouchableOpacity style={styles.touchlogout} onPress={() => logout()}>
            <Text style={styles.labelBtn}>😴 Deconnexion</Text>
          </TouchableOpacity>}
        </View>
        <TouchableOpacity style={styles.containerProfil}>
          <View style={styles.containerImageProfil}>
            <Image
              source={require('../assets/user.png')}
              style={{ width: 82, height: 82 }}
            />
          </View>
          {isconnect ? <View style={{ alignSelf: "center" }}>
            <Text style={{color:'gray'}}>Salut 👋,</Text>
            <Text style={{color:'gray'}}>{`${firstname} ${lastname}`}</Text>
            <Text style={{color:'gray'}}>{`${email}`}</Text>
          </View>
            :
            <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => navigation.navigate('Connexion')}>
              <Text style={{color:"gray"}}>Salut 👋,</Text>
              <Text style={{ width: 200,color:"gray" }}>Vous n'êtes pas encore connecté</Text>
              <Text style={{ width: 200, fontWeight: "bold", marginTop: 10,color:"gray" }}>Cliquez pour vous connecter</Text>
            </TouchableOpacity>
          }

        </TouchableOpacity>
        <View style={{ flexDirection: "row", marginTop: 20, marginBottom: 30 }}>

          <Card style={styles.btnFeed}>
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <Image
                source={require('../assets/plat1.png')}
                style={{ width: 100, height: 100, position: "absolute", bottom: -60,right:-40 }}
              />
              <Text style={[styles.titleBtn,{color:"gray"}]}>Recherche l'impact environnemental de tes aliments !</Text>
            </TouchableOpacity>
          </Card>
          <Card style={styles.btnFeed}>
            <TouchableOpacity onPress={() => navigation.navigate('FavorisDetail')}>
              <Image
                source={require('../assets/plat2.png')}
                style={{width: 80, height: 70, position: "absolute", bottom: -60,right:-50  }}
              />
              <Text style={[styles.titleBtn,{color:"gray"}]}>Tes plats favoris !</Text>
              <View>
              </View>
            </TouchableOpacity>
          </Card>
        </View>
        <View style={{ flexDirection: "row", marginTop: 20, marginBottom: 30 }}>
        <Card style={styles.btnFeed}>
          <Image
              source={require('../assets/plat4.png')}
              style={{width: 75, height: 75, position: "absolute", bottom: -30,right:-25  }}
            />
          <TouchableOpacity onPress={() => navigation.navigate('ScanFood')}>
            <Text style={[styles.titleBtn,{color:"gray"}]}>Scanne ton produit</Text>
            <View>
            </View>
          </TouchableOpacity>
        </Card>
        <Card style={styles.btnFeed}>
          <TouchableOpacity onPress={() => navigation.navigate('Infos')}>
            <Image
              source={require('../assets/plat3.png')}
              style={{width: 75, height: 75, position: "absolute", bottom: -60,right:-50  }}
            />
            <Text style={[styles.titleBtn,{color:"gray"}]}>En savoir plus sur l'application</Text>
            <View>
            </View>
          </TouchableOpacity>
        </Card>
        </View>
      </ScrollView>
      </ImageBackground>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  containerFeed: {
    flex: 1,
    backgroundColor:'white'
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  scrollView: {
    marginHorizontal: 8,
  },
  viewBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom:50
  },
  touchGoHome:{

    flexDirection: "row", 
    marginTop: 40 

  },
  touchlogout:{
    flexDirection: "row", 
    marginTop: 40, 
    marginRight: 8, 
    borderRadius: 80, 
    borderWidth: 1, 
    padding: 5 


  },
  labelBtn:{
    fontWeight: "bold", 
    marginLeft: 8
  },
  containerProfil:{
    flexDirection: "row", 
    backgroundColor: "white", 
    width: 300, 
    height: 120, 
    marginTop: 20, 
    borderRadius: 20, 
    borderWidth: 1, 
    marginLeft: 25 
  },
  containerImageProfil:{

    backgroundColor: "green", 
    width: 82, 
    height: 82, 
    borderRadius: 80, 
    alignSelf: "center", 
    marginHorizontal: 11

  },
  btnFeed:{

    flex: 1, height: 130, margin: 20, borderWidth: 1, borderRadius: 20, padding: 10, alignItems: "center", justifyContent: "center", shadowColor: "black", shadowOffset: { width: 10, height: 10 }, shadowRadius: 0.7, elevation: 20 

  },
  imagestyle:{
    width: 80, height: 70, position: "absolute", bottom: -30


  },
  titleBtn:{

    fontWeight: "bold", fontStyle: "italic", marginBottom: 30 

  }


})