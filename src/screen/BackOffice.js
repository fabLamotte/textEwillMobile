import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'

const BackOffice = (props) => {
    const {
        email
    } = props
    return (
        <Text>bonjour {email} !</Text>
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