import React from 'react';
import {Text} from 'react-native';


export function scaleScore(score){
if(0<score<=0.28){

    return('#1E8F4E')

    
}
else if(0.28<score<=0.43){

    return('#30CC71')


}
else if(0.43<score<=0.75){

    return('#FFC900')

    
}
else if(0.75<score<=1.5){
    return('#EF7E1B')   
}
else if(1.5<score<=3){
    return('#E72D19')   
}



}

export function scaleResultat(score){

    if(0<score<=0.28){
    
        return(<Text style={{color:"#1E8F4E",textAlign:"center",fontWeight:"bold"}}>Très Bon</Text>)
        
    }
    else if(0.28<score<=0.43){
    

        return(<Text style={{color:"#30CC71",textAlign:"center",fontWeight:"bold",marginTop:10,fontSize:20}}>Bon</Text>)

    
    }
    else if(0.43<score<=0.75){
    
        return(<Text style={{color:"#FFC900",textAlign:"center",fontWeight:"bold",marginTop:10,fontSize:20}}>Moyen</Text>)

        
    }
    else if(0.75<score<=1.5){
        return(<Text style={{color:"#EF7E1B",textAlign:"center",fontWeight:"bold",marginTop:10,fontSize:20}}>Mauvais</Text>)
    }
    else if(1.5<score<=3){
        return(<Text style={{color:"#E72D19",textAlign:"center",fontWeight:"bold",marginTop:10,fontSize:20}}>Médiocre</Text>)
    }
    
    
    
    }
    