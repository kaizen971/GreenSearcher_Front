import { styles } from '../containers/styles';
import { View, TouchableOpacity, Text, SafeAreaView, Image,StyleSheet } from 'react-native';
import GoBack from '../../../../ComponentsGeneral/goBack/index.js';

export default IsAuthentify = (props) => {
   
   
   return(<View style={styles.containerAuth}>
          <GoBack navigation={navigation} />
          <Text style={styles.labelAuth}>Vous êtes authentifiez !</Text>
          <Image
            source={require('../../../assets/LogoConnexion.png')}
            style={{width: 300, height: 280}}
          />
    </View>)
}