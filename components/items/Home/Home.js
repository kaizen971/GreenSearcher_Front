import * as React from 'react';
import { Button, View,TouchableOpacity,Text,Image,StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';



export default function HomeScreen({ navigation }) {

    const {  isconnect } = useSelector(state => state.userReducer);

    return (
      <View style={styles.containerHome}>
      <View style={styles.containerTitle}><Text style={styles.title}>GreenSearcher</Text></View>
      <Image 
        source={require('../assets/fondHome.png')}  
        style={{width: 300, height: 300 }}
      />
        <View style={styles.containerBtnHome}>
        {!isconnect &&<TouchableOpacity style={styles.containerTouchBtn} onPress={() => navigation.navigate('Connexion')}><Text style={styles.textBtn}>Connexion/Inscription</Text></TouchableOpacity>}
        {isconnect &&<TouchableOpacity style={styles.containerTouchBtn} onPress={() => navigation.navigate('Feed')}><Text style={styles.textBtn}>Ouvrir le menu</Text></TouchableOpacity>}
        </View>
        <TouchableOpacity style={styles.containerSkip} onPress={() => navigation.navigate('Feed')}><Text style={styles.skipLabel}>Passer l'Inscription</Text></TouchableOpacity>
      </View>
    );
  }

  const styles = StyleSheet.create({
    containerHome: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor:"#e8f4c7"
    },
    containerTitle:{
      flexDirection:'row',
      justifyContent:'space-around',
      marginBottom:50
    },
    title:{
      fontSize:42, 
      fontWeight:"bold",
      color:"#719d0d"
    },
    containerBtnHome:{
      flexDirection:'row',
      justifyContent:'space-around', 
      marginTop:50
    },
    containerTouchBtn:{
      backgroundColor:'#81c684',
      paddingHorizontal:50,
      borderRadius:100,
      paddingVertical:20
    },
    textBtn:{
      color:"white",
      fontWeight:"bold",
      fontSize:18
    },
    containerSkip:{
      justifyContent:"center", 
      alignItems:"center",
      marginTop:30,
      color:"black"
    },
    skipLabel:{
      fontSize:20,
      textDecorationLine:"underline"
    }
})