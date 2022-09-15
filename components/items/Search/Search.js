import * as React from 'react';
import { Button, View,TouchableOpacity,Text,ScrollView,SafeAreaView ,StyleSheet, TextInput,Image} from 'react-native';
import axios from 'axios';
import Icon from "react-native-vector-icons/Ionicons";
import Loader from 'react-native-three-dots-loader'
import { BASE_URL } from '../constants/base_URL.js';

export default function Search({ navigation }) {
    const [text, onChangeText] = React.useState("");
    const [data,setData]  = React.useState(null);
    const [loading,setloading] = React.useState(false);

      const getFoodDetail = (text) => {
      setloading(true);
        if(text != ""){
          axios.get(`${BASE_URL}/product/search/${text}`).then((response) => {
            setloading(false);
            setData(response.data)
          });
        }
        else{
          setData(null)
        }
      }
      return (
      <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
      <ScrollView>
      <TouchableOpacity style={{flexDirection:"row",marginTop:20,marginLeft:10}} onPress={() => navigation.navigate('Feed')}>
      <Image 
        source={require('../assets/icons/MenuIcon.png')}  
        style={{width: 24, height: 24 }}
      />
      <Text style={{fontWeight:"bold",marginLeft:8}}>Retour</Text>
      </TouchableOpacity>
      <View style={{flex:1,flexDirection:"column",marginTop:20}}>
      <View style={{flex:0.75,flexDirection:"row",alignItems:"center",justifyContent:"center",marginHorizontal:10}}>
      <TextInput
        style={styles.input}
        onChangeText={text => {onChangeText(text)}}
        clearTextOnFocus={true}
        value={text}
        placeholder={"Rechercher"}
      />
      <TouchableOpacity onPress={()=>{getFoodDetail(text)}}>
       <Icon
            name="md-search"
            color="black"
            size={30}
            />
      </TouchableOpacity>
      </View>
      <View style={{flex:1,justifyContent:'center',alignItems:"center"}}>     
      {loading == false && data !=null &&data.map((data) => (
        <TouchableOpacity key={data.nom_francais} className="data" style={{flexDirection:"row",width:"100%",marginVertical:10}} onPress={()=>{navigation.navigate("ProductDetail",{ data: data })}}>
            <Icon
            name="md-search"
            color="black"
            size={30}
            style={{marginLeft:10}}
            />
            <Text style={{marginLeft:10,marginBottom:10,fontSize:20,color:"black"}}>{`${data.nom_francais}`}</Text>
        </TouchableOpacity>
      )) } 
      {loading ==  true &&<Loader/>}
      </View>
      </View>
      </ScrollView>
      </SafeAreaView>
    );
  }



  const styles = StyleSheet.create({
    input: {
      flex:1,
      height: 40,
      margin: 12,
      padding: 10,
      borderRadius:80,
      backgroundColor:"#eee"
    },
  });