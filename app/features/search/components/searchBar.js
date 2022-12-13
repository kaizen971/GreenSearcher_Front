
import * as React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import styles from '../containers/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default SearchBarScreen = ({ text, onchangeInput, getFoodDetail }) => {
  return (
    <View style={styles.containerSearchBar}>
      <TextInput
        style={styles.input}
        onChangeText={text => { onchangeInput(text) }}
        value={text}
        clearButtonMode="always"
        autoFocus={true}
        placeholder={"Rechercher un plat ici"}
      />
      <TouchableOpacity style={styles.buttonSearch} onPress={() => { getFoodDetail(text) }}>
        <Text style={styles.labelSearch}>Rechercher</Text>
        <Ionicons
          name="md-search"
          color="black"
          size={15}
        />
      </TouchableOpacity>
    </View>
  )
}