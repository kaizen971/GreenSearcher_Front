
import * as React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import styles from '../containers/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator } from 'react-native-paper';


export default ProductList = ({ loading, data, navigation }) => {
    return (
        <View style={styles.containerProductList}>
            {loading == false && data != null && data.map((data) => (
                <TouchableOpacity key={data.nom_francais} className="data" style={styles.touchableLabelProduct} onPress={() => { navigation.navigate("ProductDetail", { data: data }) }}>
                    <Ionicons
                        name="md-search"
                        color="black"
                        size={30}
                        style={styles.iconListProduct}
                    />
                    <Text style={styles.nameOfProduct}>{`${data.nom_francais}`}</Text>
                </TouchableOpacity>
            ))}
            {loading == true && <ActivityIndicator color={"green"}/>}
            {loading == false && data != null && data.length == 0 && <View><Text style={styles.sizeNotFound}>Aucun résultat trouvé</Text></View>}
        </View>
    )
}