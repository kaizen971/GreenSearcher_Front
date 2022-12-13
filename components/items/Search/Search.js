import * as React from 'react';
import { Button, ImageBackground, View,TouchableOpacity,Text,ScrollView,SafeAreaView ,StyleSheet, TextInput,Image} from 'react-native';
import axios from 'axios';
import Icon from "react-native-vector-icons/Ionicons";
import Loader from 'react-native-three-dots-loader'
import { BASE_URL } from '../constants/base_URL.js';
import image from "../assets/bg.png"
import GoBack from '../../../ComponentsGeneral/goBack/index.js';

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
      const onchangeInput = (text) => {
           onChangeText(text);
      }
      return (
      <SafeAreaView style={{flex:1}}>
      <ImageBackground source={image} resizeMode="cover" style={{flex: 1,justifyContent: "center"}}>
      <ScrollView nestedScrollEnabled={true} style={{ width: "100%" }}>
      <GoBack navigation={navigation}/>
      <View style={{flex:1,flexDirection:"column",marginTop:60}}>
      <View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center",marginHorizontal:10}}>
      <TextInput
        style={styles.input}
        onChangeText={text => {onchangeInput(text)}}
        value={text}
        clearButtonMode="always"
        autoFocus={true}
        placeholder={"Rechercher un plat ici"}
      />
      <TouchableOpacity style={{borderWidth:1,justifyContent:"center",alignContent:"center",alignItems:"center", backgroundColor:"white",borderRadius:5,padding:5,flexDirection:"row"}} onPress={()=>{getFoodDetail(text)}}>
       <Text style={{color:"black",marginRight:5}}>Rechercher</Text>
       <Icon
            name="md-search"
            color="black"
            size={15}
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
      {loading ==  false && data !=null && data.length == 0 &&<View><Text style={{fontSize:20}}>Aucun résultat trouvé</Text></View>}

      </View>
      </View>
      </ScrollView>
      </ImageBackground>
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
      backgroundColor:"#eee",
      borderWidth:1
    },
  });