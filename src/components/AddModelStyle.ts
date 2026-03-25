import { StyleSheet } from "react-native";
import { colors } from "../Themes/Colors";
import { horizontalScale, moderateScale, verticalScale,} from "../Themes/Metrics";

export const styles = StyleSheet.create({
    mainView:{
        flex:1,
        paddingTop:verticalScale(80),
        padding:moderateScale(15),
    },
    topView:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingBottom:verticalScale(20),
    },
    titleText:{
        fontSize:moderateScale(19),
        fontWeight:"600",
    },
    inputView:{
        flex:1,
        rowGap:verticalScale(4)
    },
    text:{
        fontSize:moderateScale(16),
        marginLeft:horizontalScale(4)
    },
    textInput:{
        borderWidth:2,
        padding:moderateScale(10),
        borderColor:colors.lightGrey,
        borderRadius:moderateScale(10),
        fontSize:moderateScale(16),
        backgroundColor:colors.white,
        marginBottom:verticalScale(4),
    },
    placeholderStyle:{
        color:colors.lightGrey
    },
    startBtn:{
        alignItems:"center",
        backgroundColor:colors.Primary,
        marginTop:verticalScale(30),
        paddingHorizontal:horizontalScale(40),
        paddingVertical:verticalScale(15),
        borderRadius:moderateScale(14),
        marginHorizontal: horizontalScale(10)
    },
    btnText:{
        color:colors.white,
        fontSize:moderateScale(20),
        fontWeight:"bold",
        textAlign: 'center',
        flex: 1,
    },
    dateView:{
        flexDirection:'row',
        justifyContent:"space-around",
        gap:moderateScale(20),
    },
    cancelbtn:{
        alignItems:"center",
        marginTop:verticalScale(30),
        paddingHorizontal:horizontalScale(50),
        paddingVertical:verticalScale(15),
        borderRadius:moderateScale(14),
       backgroundColor:colors.lightPurple,
    },
    textCancel:{
        fontSize:moderateScale(20),
        fontWeight:"bold",
        textAlign: 'center',
        flex: 1,
        color:colors.Primary,
    },
     selectedBtn:{
        backgroundColor:colors.Primary,  
    },
    errorText:{
        color:colors.red,
    }
});