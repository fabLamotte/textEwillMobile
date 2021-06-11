import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import moment from 'moment'

const Announces = ({item}) => {
    let photo = item.createur.storageFolder + item.createur.photo

    return (
        <View style={styles.block}>
            <View style={styles.header}>
                <Text style={styles.title}>{item.nom}</Text>
            </View>
            <View style={{ 
                    backgroundColor:item.type.couleur,
                }}>
                <Text style={styles.subtitle}>{item.type.nom} | {moment(item.crdate).subtract(10, 'days').calendar()}</Text>
            </View>
            <View style={styles.desc}>
                <Text style={styles.descText}>{item.description}</Text>
            </View>
            <View>
                <View style={styles.creator}>
                    <View style={styles.photoZone}>
                        <Image
                            style={styles.photoCreateur}
                            source={{
                                uri: photo,
                            }}
                        />
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.email}>{item.createur.username}</Text>
                        <Text>{item.createur.nom} {item.createur.prenom}</Text>
                        <Text style={styles.appartement}>Appartement : {item.createur.appartement}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    block:{
        flex:1,
        marginHorizontal:20,
        marginVertical:20,
        backgroundColor:"white",
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
    },
    header:{
        height:100,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#e1e1e1',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
    },
    title:{
        fontWeight:'bold',
        fontSize:25,
        textAlign:'center'
    },
    desc:{
        textAlign:'center'
    },
    creator:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        height:150
    },
    photoZone:{
        width:100,
        height:100
    },
    photoCreateur:{
        borderRadius:50,
        width:100,
        height:100
    },
    subtitle:{
        color:'white',
        fontWeight:'bold',
        textAlign:'center',
        marginVertical:5
    },
    email:{
        fontWeight:'bold'
    },
    appartement:{
        fontSize:18
    },
    desc:{
        paddingHorizontal:10,
        paddingBottom:5,
        backgroundColor:"#353535",
        justifyContent:'center',
        alignItems:'center'
    },
    descText:{
        color:'white'
    },
    creatortitle:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize:20,
        textTransform:'uppercase'
    }
})

export default Announces