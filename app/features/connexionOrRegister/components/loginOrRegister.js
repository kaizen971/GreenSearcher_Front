import { Fragment } from 'react';
import * as React from 'react';
import { Input } from 'react-native-elements';
import { styles } from '../containers/styles';
import { View, TouchableOpacity, Text, Image } from 'react-native';


export default LoginOrRegister = (props) => {

const {onChangeData,IsConnexion,changeIsConnexion,isconnect,data,textFirstName,onChangePasswordConnexion,onChangeTextEmail,textEmail,textPasswordConnexion,onChangeTextName,textName,onChangeTextFirstName,onChangeTextPassword,textPassword,onChangeTextConfirmPassword,textConfirmPassword,getConnexion,getSubscribe} = props;

return(<Fragment>      
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          {IsConnexion && <Image
            source={require('../../../assets/LogoConnexion.png')}
            style={{ width: 300, height: 280 }}
          />}
          <View style={{ flexDirection: 'row',marginTop : IsConnexion ? 0 : 50  }}>
            <TouchableOpacity onPress={() => { changeIsConnexion(true),onChangeData(null) }} ><Text style={[styles.titleConnect,{textDecorationLine: IsConnexion ? 'underline' : 'none'}]}>CONNEXION</Text></TouchableOpacity>
            <Text style={{ marginLeft: 10, fontSize: 25, marginVertical: 10 }}> | </Text>
            <TouchableOpacity onPress={() => { changeIsConnexion(false),onChangeData(null) }}><Text style={[styles.titleConnect,{textDecorationLine: IsConnexion ? 'none' : 'underline'}]}>INSCRIPTION</Text></TouchableOpacity>
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




</Fragment>)
}