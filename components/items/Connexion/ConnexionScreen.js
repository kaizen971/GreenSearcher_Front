import axios from 'axios';
import * as React from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, Image,StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { BASE_URL } from '../constants/base_URL';
import { useSelector, useDispatch } from 'react-redux';
import { setlastName, setisConnect, setfirstName, setEmail } from '../../../redux/action';


export default function Feed({ navigation }) {

  //Variables objet state
  const { isconnect } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const [IsConnexion, changeIsConnexion] = React.useState(true);
  const [textEmail, onChangeTextEmail] = React.useState(null);
  const [textName, onChangeTextName] = React.useState(null);
  const [textFirstName, onChangeTextFirstName] = React.useState(null);
  const [textPassword, onChangeTextPassword] = React.useState(null);
  const [textConfirmPassword, onChangeTextConfirmPassword] = React.useState(null);
  const [textPasswordConnexion, onChangePasswordConnexion] = React.useState(null);
  const [data, onChangeData] = React.useState(null);


  // Requete Back
  const getSubscribe = () => {
    axios.post(`${BASE_URL}/product/inscription`, {
      "firstName": textFirstName,
      "lastName": textName,
      "email": textEmail,
      "password": textPassword,
      "password_confirm": textConfirmPassword
    }).then((response) => {
      onChangeData(response.data);
      console.log(response.data)

      if (response.data[0] == "Inscription réussie") {
        dispatch(setisConnect(true))
        dispatch(setfirstName(response.data[1]))
        dispatch(setlastName(response.data[2]))
        dispatch(setEmail(response.data[3]))
        navigation.navigate('Feed');
      }

    }).catch((response) => {
      console.log(response);
    });
  }
  const getConnexion = () => {
    axios.post(`${BASE_URL}/product/connexion`, {
      "email": textEmail,
      "password": textPasswordConnexion,
    }).then((response) => {
      onChangeData(response.data);
      if (response.data[0] == "connexion reussie") {
        dispatch(setisConnect(true))
        dispatch(setfirstName(response.data[1]))
        dispatch(setlastName(response.data[2]))
        dispatch(setEmail(textEmail))
        navigation.navigate('Feed');
      }
    }).catch((response) => {
      onChangeData(["Authentification failed : Vérifier votre mot de passe ouu votre email"]);
    });
  }


  return (
    <SafeAreaView style={styles.containerConnexion}>

      {isconnect &&
        <View style={styles.containerAuth}>
          <TouchableOpacity style={styles.containerTouchAuth} onPress={() => navigation.navigate('Home')}>
            <Image
              source={require('../assets/icons/MenuIcon.png')}
              style={{ width: 24, height: 24 }}
            />
            <Text style={styles.labelback}>Retour</Text>
          </TouchableOpacity>
          <Text style={styles.labelAuth}>Vous êtes authentifiez !</Text>
          <Image
            source={require('../assets/LogoConnexion.png')}
            style={{ width: 300, height: 280 }}
          />
        </View>
      }

      {!isconnect && <ScrollView>
        <TouchableOpacity style={styles.containerBack} onPress={() => navigation.navigate('Home')}>
          <Image
            source={require('../assets/icons/MenuIcon.png')}
            style={{ width: 24, height: 24 }}
          />
          <Text style={styles.labelback}>Retour</Text>

        </TouchableOpacity>
        {IsConnexion && <Text style={styles.labelConnect}>Connectez - vous</Text>}
        {!IsConnexion && <Text style={styles.labelConnect}>Inscrivez - vous</Text>}
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          {IsConnexion && <Image
            source={require('../assets/LogoConnexion.png')}
            style={{ width: 300, height: 280 }}
          />}
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => { changeIsConnexion(true) }} ><Text style={[styles.titleConnect,{textDecorationLine: IsConnexion ? 'underline' : 'none'}]}>CONNEXION</Text></TouchableOpacity>
            <Text style={{ marginLeft: 10, fontSize: 25, marginVertical: 10 }}> | </Text>
            <TouchableOpacity onPress={() => { changeIsConnexion(false) }}><Text style={[styles.titleConnect,{textDecorationLine: IsConnexion ? 'none' : 'underline'}]}>INSCRIPTION</Text></TouchableOpacity>
          </View>
        </View>
        {IsConnexion &&
          <View>
            {!isconnect && <View style={{ justifyContent: "center" }}>

              {data != null && data.length > 0 && data.map((response, id) =>
                <Text key={id} style={{ color: "red", textAlign: "center" }}>{`${response}`}</Text>
              )}
            </View>}
            <Text style={styles.input}>Utilisateur</Text>
            <Input
              onChangeText={onChangeTextEmail}
              value={textEmail}
            />
            <Text style={styles.input}>Mot de passe</Text>
            <Input
              onChangeText={onChangePasswordConnexion}
              value={textPasswordConnexion}
              secureTextEntry={true}
            />
          </View>
        }
        {!IsConnexion &&
          <View>
            {data && <Text style={{ color: "red", textAlign: "center" }}>Erreur de saisie :</Text>}
            {!isconnect && <View style={{ justifyContent: "center" }}>

              {data != null && data.length > 0 && data.map((response, id) =>
                <Text key={id} style={{ color: "red", textAlign: "center" }}>{`${response}`}</Text>
              )}
            </View>}

            <Text style={styles.input}>Nom</Text>
            <Input
              onChangeText={onChangeTextName}
              value={textName}
            />
            <Text style={styles.input}>Prenom</Text>
            <Input
              onChangeText={onChangeTextFirstName}
              value={textFirstName}
            />
            <Text style={styles.input}>Email</Text>
            <Input
              onChangeText={onChangeTextEmail}
              value={textEmail}
            />
            <Text style={styles.input}>Mot de passe</Text>
            <Input
              onChangeText={onChangeTextPassword}
              value={textPassword}
              secureTextEntry={true}
            />
            <Text style={styles.input}>Confirme ton mot de passe</Text>
            <Input
              onChangeText={onChangeTextConfirmPassword}
              value={textConfirmPassword}
              secureTextEntry={true}
            />
          </View>
        }
        {IsConnexion && <TouchableOpacity style={styles.containerTouchConnect} onPress={() => getConnexion()}><Text style={styles.textLabel}>Connexion</Text></TouchableOpacity>}
        {!IsConnexion && <TouchableOpacity style={styles.containerTouchConnect} onPress={() => getSubscribe()}><Text style={styles.textLabel}>Inscription</Text></TouchableOpacity>}
      </ScrollView>}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

  containerConnexion:{
    flex: 1, 
    justifyContent: "center", 
    backgroundColor: "#e8f4c7"
  },
  containerAuth:{
    height: "100%", 
    alignItems: "center", 
    justifyContent: "center"
  },
  containerTouchAuth:{
    flexDirection: "row", 
    position: "absolute", 
    top: 10, 
    marginLeft: 10, 
    left: 10
  },
  labelback:{
    fontWeight: "bold", 
    marginLeft: 8
  },
  labelAuth:{
    marginLeft: 10, 
    fontSize: 35, 
    marginVertical: 10, 
    textAlign: "center", 
    fontWeight: "bold", 
    color: '#81c684' 
  },
  containerBack:{
    flexDirection: "row", 
    marginTop: 40, 
    marginLeft: 10
  },
  labelConnect:{
    marginLeft: 10, 
    fontSize: 35, 
    marginVertical: 10, 
    textAlign: "center", 
    fontWeight: "bold", 
    color: '#81c684'
  },
  titleConnect:{
    marginLeft: 10, 
    fontSize: 25, 
    marginVertical: 10,  
    textDecorationStyle: 'solid'
  },
  input:{
    marginLeft: 10
    
  },
  containerTouchConnect:{
    marginHorizontal: 30, 
    backgroundColor: '#81c684', 
    paddingHorizontal: 20, 
    borderRadius: 100, 
    paddingVertical: 20    
  },
  textLabel:{

    color: "white", 
    fontWeight: "bold", 
    fontSize: 24, 
    textAlign: "center" 

  }

})