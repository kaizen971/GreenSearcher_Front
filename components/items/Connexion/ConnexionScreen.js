import axios from 'axios';
import * as React from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, Image } from 'react-native';
import { Input } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { BASE_URL } from '../constants/base_URL';
import { useSelector, useDispatch } from 'react-redux';
import { setlastName, setisConnect, setfirstName, setEmail } from '../../../redux/action';


export default function Feed({ navigation }) {
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

  const getSubscribe = () => {
    axios.post(`${BASE_URL}/posts/inscription`, {
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
    axios.post(`${BASE_URL}/posts/connexion`, {
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
    <SafeAreaView style={{ flex: 1, justifyContent: "center", backgroundColor: "#e8f4c7" }}>

      {isconnect &&
        <View style={{ height: "100%", alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity style={{ flexDirection: "row", position: "absolute", top: 10, marginLeft: 10, left: 10 }} onPress={() => navigation.navigate('Home')}>
            <Image
              source={require('../assets/icons/MenuIcon.png')}
              style={{ width: 24, height: 24 }}
            />
            <Text style={{ fontWeight: "bold", marginLeft: 8 }}>Retour</Text>
          </TouchableOpacity>
          <Text style={{ marginLeft: 10, fontSize: 35, marginVertical: 10, textAlign: "center", fontWeight: "bold", color: '#81c684' }}>Vous êtes authentifiez !</Text>
          <Image
            source={require('../assets/LogoConnexion.png')}
            style={{ width: 300, height: 280 }}
          />
        </View>
      }

      {!isconnect && <ScrollView>
        <TouchableOpacity style={{ flexDirection: "row", marginTop: 40, marginLeft: 10 }} onPress={() => navigation.navigate('Home')}>
          <Image
            source={require('../assets/icons/MenuIcon.png')}
            style={{ width: 24, height: 24 }}
          />
          <Text style={{ fontWeight: "bold", marginLeft: 8 }}>Retour</Text>

        </TouchableOpacity>
        {IsConnexion && <Text style={{ marginLeft: 10, fontSize: 35, marginVertical: 10, textAlign: "center", fontWeight: "bold", color: '#81c684' }}>Connectez - vous</Text>}
        {!IsConnexion && <Text style={{ marginLeft: 10, fontSize: 35, marginVertical: 10, textAlign: "center", fontWeight: "bold", color: '#81c684' }}>Inscrivez - vous</Text>}
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          {IsConnexion && <Image
            source={require('../assets/LogoConnexion.png')}
            style={{ width: 300, height: 280 }}
          />}
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => { changeIsConnexion(true) }} ><Text style={{ marginLeft: 10, fontSize: 25, marginVertical: 10, textDecorationLine: IsConnexion ? 'underline' : 'none', textDecorationStyle: 'solid' }}>CONNEXION</Text></TouchableOpacity>
            <Text style={{ marginLeft: 10, fontSize: 25, marginVertical: 10 }}> | </Text>
            <TouchableOpacity onPress={() => { changeIsConnexion(false) }}><Text style={{ marginLeft: 10, fontSize: 25, marginVertical: 10, textDecorationLine: IsConnexion ? 'none' : 'underline', textDecorationStyle: 'solid' }}>INSCRIPTION</Text></TouchableOpacity>
          </View>
        </View>
        {IsConnexion &&
          <View>
            {!isconnect && <View style={{ justifyContent: "center" }}>

              {data != null && data.length > 0 && data.map((response, id) =>
                <Text key={id} style={{ color: "red", textAlign: "center" }}>{`${response}`}</Text>
              )}
            </View>}
            <Text style={{ marginLeft: 10 }}>Utilisateur</Text>
            <Input
              onChangeText={onChangeTextEmail}
              value={textEmail}
            />
            <Text style={{ marginLeft: 10 }}>Mot de passe</Text>
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

            <Text style={{ marginLeft: 10 }}>Nom</Text>
            <Input
              onChangeText={onChangeTextName}
              value={textName}
            />
            <Text style={{ marginLeft: 10 }}>Prenom</Text>
            <Input
              onChangeText={onChangeTextFirstName}
              value={textFirstName}
            />
            <Text style={{ marginLeft: 10 }}>Email</Text>
            <Input
              onChangeText={onChangeTextEmail}
              value={textEmail}
            />
            <Text style={{ marginLeft: 10 }}>Mot de passe</Text>
            <Input
              onChangeText={onChangeTextPassword}
              value={textPassword}
              secureTextEntry={true}
            />
            <Text style={{ marginLeft: 10 }}>Confirme ton mot de passe</Text>
            <Input
              onChangeText={onChangeTextConfirmPassword}
              value={textConfirmPassword}
              secureTextEntry={true}
            />
          </View>
        }
        {IsConnexion && <TouchableOpacity style={{ marginHorizontal: 30, backgroundColor: '#81c684', paddingHorizontal: 20, borderRadius: 100, paddingVertical: 20 }} onPress={() => getConnexion()}><Text style={{ color: "white", fontWeight: "bold", fontSize: 24, textAlign: "center" }}>Connexion</Text></TouchableOpacity>}
        {!IsConnexion && <TouchableOpacity style={{ marginHorizontal: 30, backgroundColor: '#81c684', paddingHorizontal: 20, borderRadius: 100, paddingVertical: 20 }} onPress={() => getSubscribe()}><Text style={{ color: "white", fontWeight: "bold", fontSize: 24, textAlign: "center" }}>Inscription</Text></TouchableOpacity>}
      </ScrollView>}
    </SafeAreaView>
  );
}