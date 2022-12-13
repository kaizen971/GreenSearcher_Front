import { styles } from '../styles';
import { View, TouchableOpacity, Text, SafeAreaView, Image,StyleSheet } from 'react-native';

export default IsAuthentify = (props) => {
   
   
   return(<View style={styles.containerAuth}>
          <TouchableOpacity style={styles.containerTouchAuth} onPress={() => props.navigation.navigate('Home')}>
            <Image
              source={require('../../assets/icons/MenuIcon.png')}
              style={{ width: 24, height: 24 }}
            />
            <Text style={styles.labelback}>Retour</Text>
          </TouchableOpacity>
          <Text style={styles.labelAuth}>Vous êtes authentifiez !</Text>
          <Image
            source={require('../../assets/LogoConnexion.png')}
            style={{width: 300, height: 280}}
          />
    </View>)
}