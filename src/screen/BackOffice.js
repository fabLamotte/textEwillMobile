import React from 'react'
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native'
import Announces from './../component/Announces'

const BackOffice = (props) => {

    const qsd = ({item}) =>(
        <Text>{item.nom}</Text>
    )

    return (
        <FlatList
            data={props.announces}
            renderItem={qsd}
            keyExtractor={item => item.id}
        />
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default BackOffice