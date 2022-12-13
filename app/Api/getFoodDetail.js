import axios from "axios";
import { Alert } from "react-native";
import { BASE_URL } from "../../constants/base_URL";




export const getFoodDetail = async (text) => {
    try{
     const response = await axios.get(`${BASE_URL}/product/search/${text}`).then((response) => {
        return response
      });

      return response

    }
    catch(error){
        Alert.alert(`Problème rencontré : ${error}`)
    }
}