import * as React from 'react';
import { Button, View,TouchableOpacity,Text,Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setlastName,setisConnect,setfirstName,setEmail } from '../../../redux/action';



export default function HomeScreen({ navigation }) {

  const {  isconnect } = useSelector(state => state.userReducer);

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:"#e8f4c7"}}>
        {/* <Button
          title="Go to Profile"
          onPress={() => navigation.navigate('Profile')}
        /> */}
      <View style={{flexDirection:'row',justifyContent:'space-around',marginBottom:50,}}><Text style={{fontSize:42, fontWeight:"bold",color:"#719d0d"}}>GreenSearcher</Text></View>


      <Image 
        source={require('../assets/fondHome.png')}  
        style={{width: 300, height: 300 }}
      />
        <View style={{flexDirection:'row',justifyContent:'space-around', marginTop:50}}>
        {!isconnect &&<TouchableOpacity style={{ backgroundColor:'#81c684',paddingHorizontal:50,borderRadius:100,paddingVertical:20}} onPress={() => navigation.navigate('Connexion')}><Text style={{color:"white",fontWeight:"bold",fontSize:18}}>Connexion/Inscription</Text></TouchableOpacity>}
        {isconnect &&<TouchableOpacity style={{ backgroundColor:'#81c684',paddingHorizontal:50,borderRadius:100,paddingVertical:20}} onPress={() => navigation.navigate('Feed')}><Text style={{color:"white",fontWeight:"bold",fontSize:18}}>Ouvrir le menu</Text></TouchableOpacity>}
        </View>
        <TouchableOpacity style={{justifyContent:"center", alignItems:"center",marginTop:30}} onPress={() => navigation.navigate('Feed')}><Text style={{fontSize:20,textDecorationLine:"underline"}}>Skip All</Text></TouchableOpacity>
      </View>
    );
  }