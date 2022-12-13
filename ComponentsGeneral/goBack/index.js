import * as React from 'react';
import {  TouchableOpacity, Text,  Image } from 'react-native';
import {styles} from './styles'
import  Ionicons from 'react-native-vector-icons/Ionicons';

export default GoBack = (props) => {
    return(<TouchableOpacity style={[styles.containerTouchAuth]} onPress={() => props.navigation.goBack()}>
    <Ionicons style={{color:`${props.color ? props.color : 'gray'}`}} name="ios-chevron-back" size={50}  />

    </TouchableOpacity>);
}