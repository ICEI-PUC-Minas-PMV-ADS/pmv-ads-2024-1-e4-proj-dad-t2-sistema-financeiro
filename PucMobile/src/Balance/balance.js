import { React } from 'react';
import { View, Text, StyleSheet,} from 'react-native'

export default function Balance({gastos}) {
 return (
            <View style={styles.container}>
                    <View style={styles.item}> 
                    <Text style={styles.itemTitle}>Gastos</Text>
                     <View style={styles.content}>
                        <Text style={styles.currencySymbol}>R$</Text>
                        <Text style={styles.gastos}>{gastos}</Text>
                    </View>
                    </View>

            </View>
            
  );
}

const styles = StyleSheet.create({
    container:{
    backgroundColor: '#FFF',
    flexDirection: 'row',
 
    paddingStart: 18,
    paddingEnd: 18,
    marginTop:-24,
    marginStart: 14,
    marginEnd:14,
    borderRadius:4,
    paddingTop:22,
    paddingBottom:22,
    zIndex:99,

    },
    itemTitle:{
        fontSize:20,
        color: '#dadada'
    },
    content:{
        flexDirection:'row',
        alignItems:'center'
    },
    currencySymbol:{
        color:' #dadada ',
        marginRight:6,
    },
    gastos:{
        fontSize:22,
        color:'#e74e3c'
    }
})