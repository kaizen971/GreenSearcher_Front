import axios from 'axios';
import * as React from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, Image,StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { BASE_URL } from '../constants/base_URL';
import { useSelector, useDispatch } from 'react-redux';
import { setlastName, setisConnect, setfirstName, setEmail } from '../../../redux/action';
import {connexionOn} from './Connexionredux/action'
import { styles } from './styles';
import IsAuthentify  from './Component/isAuthentify';
import GoBack from '../../../ComponentsGeneral/goBack';
import LoginOrRegister from './Component/loginOrRegister';

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
    dispatch(connexionOn());
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
      <IsAuthentify navigation={navigation}/>
      }
      {!isconnect && <ScrollView>
        <LoginOrRegister onChangeData={(data)=>onChangeData(data)} textFirstName={textFirstName} getSubscribe={(text)=> getSubscribe(text)} getConnexion={()=>getConnexion()} IsConnexion={IsConnexion} changeIsConnexion={(boolean) => changeIsConnexion(boolean)} onChangeTextName={(text)=> onChangeTextName(text) } textName={textName} onChangeTextPassword={(text)=> onChangeTextPassword(text)} textConfirmPassword={textConfirmPassword} onChangeTextConfirmPassword={(text)=> onChangeTextConfirmPassword(text)} textPassword={textPassword} onChangeTextFirstName={(text)=>onChangeTextFirstName(text)} isconnect={isconnect} data={data} textEmail={textEmail}  textPasswordConnexion={textPasswordConnexion} onChangeTextEmail={(text)=> onChangeTextEmail(text)} onChangePasswordConnexion={(text)=> onChangePasswordConnexion(text)}/>
        <GoBack navigation={navigation}/>
      </ScrollView>}
    </SafeAreaView>
  );
}
