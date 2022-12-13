import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({

    containerConnexion:{
      flex: 1, 
      justifyContent: "center", 
      backgroundColor: "#e8f4c7"
    },
    containerAuth:{
      height: "100%", 
      alignItems: "center", 
      justifyContent: "center"
    },
    containerTouchAuth:{
      flexDirection: "row", 
      position: "absolute", 
      top: 10, 
      marginLeft: 10, 
      left: 10
    },
    labelback:{
      fontWeight: "bold", 
      marginLeft: 8
    },
    labelAuth:{
      marginLeft: 10, 
      fontSize: 35, 
      marginVertical: 10, 
      textAlign: "center", 
      fontWeight: "bold", 
      color: '#81c684' 
    },
    containerBack:{
      flexDirection: "row", 
      marginTop: 40, 
      marginLeft: 10
    },
    labelConnect:{
      marginLeft: 10, 
      fontSize: 35, 
      marginVertical: 10, 
      textAlign: "center", 
      fontWeight: "bold", 
      color: '#81c684'
    },
    titleConnect:{
      marginLeft: 10, 
      fontSize: 25, 
      marginVertical: 10,  
      textDecorationStyle: 'solid'
    },
    input:{
      marginLeft: 10
      
    },
    containerTouchConnect:{
      marginHorizontal: 30, 
      backgroundColor: '#81c684', 
      paddingHorizontal: 20, 
      borderRadius: 100, 
      paddingVertical: 20    
    },
    textLabel:{
  
      color: "white", 
      fontWeight: "bold", 
      fontSize: 24, 
      textAlign: "center" 
  
    }
  
  })