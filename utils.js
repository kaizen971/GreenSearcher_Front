export default function scaleScore(score){

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