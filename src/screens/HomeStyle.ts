import { StyleSheet } from "react-native";
import { colors } from "../Themes/Colors";
import { horizontalScale, moderateScale, verticalScale } from "../Themes/Metrics";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.lightPink,
    },
    bgImg:{
        flex:1,
        alignItems: 'center',
    },
    femaleImg:{
        height:verticalScale(310),
        width:horizontalScale(260),
        marginTop: verticalScale(30),
        marginLeft:horizontalScale(30)
    },
    onBoardText:{
        fontSize:moderateScale(30),
        fontWeight:"bold",
        margin:moderateScale(30),
        textAlign:'center',
    },
    subText:{
        fontSize:moderateScale(20),
        marginHorizontal:horizontalScale(30),
        color:colors.Secondary,
        textAlign:'center',
    },
    startBtn:{
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:colors.Primary,
        marginTop:verticalScale(50),
        paddingHorizontal:horizontalScale(30),
        paddingVertical:verticalScale(15),
        borderRadius:moderateScale(14),
        justifyContent: 'space-between',
        marginHorizontal: horizontalScale(20)
    },
    btnText:{
        color:colors.white,
        fontSize:moderateScale(20),
        fontWeight:"bold",
        textAlign: 'center',
        flex: 1,
    },
    arrowRight:{
        height:moderateScale(25),
        width:moderateScale(25),
        marginLeft:horizontalScale(40),
        color:colors.white,
    }
});