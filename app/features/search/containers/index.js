import * as React from 'react';
import { ImageBackground, View, ScrollView, SafeAreaView } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../../../../constants/base_URL.js';
import image from "../../../assets/bg.png"
import GoBack from '../../../../ComponentsGeneral/goBack/index.js';
import styles from './styles.js'
import SearchBarScreen from '../components/searchBar.js';
import ProductList from '../components/productList.js';
import { useSelector, useDispatch } from 'react-redux';
import { connexionOn } from '../actions.js';

export default function Search({ navigation }) {

  const dispatch = useDispatch()
  const getFoodDetail = (text) => {
    if (text != "") {
      axios.get(`${BASE_URL}/product/search/${text}`).then((response) => {
      });
    }
    else {
    }
  }
  
  const onchangeInput = (text) => {
    dispatch(connexionOn(text))
  }
  const { text ,isLoading,data } = useSelector(state => state.SearchBarReducer);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={image} resizeMode="cover" style={styles.imageBackground}>
        <ScrollView nestedScrollEnabled={true} style={styles.scrollView}>
          <GoBack navigation={navigation} />
          <View style={styles.containerSearch}>
            <SearchBarScreen text={text} onchangeInput={(text) => onchangeInput(text)} getFoodDetail={(text) => getFoodDetail(text)} />
            <ProductList loading={isLoading} data={data} navigation={navigation} />
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}



