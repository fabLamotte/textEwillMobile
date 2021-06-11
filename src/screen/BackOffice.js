import React, {useState} from 'react'
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native'
import Announces from './../component/Announces'

const BackOffice = (props) => {
    const {
        announces,
        token,
        setAnnounces
    } = props

    // Variable servant de coef multiplicateur pour l'insertion de nouvelles données
    const [page, setPage] = useState(1)

    // Appel de l'api pour fetch les données à volonté
    const makeRemoteRequest = () => {
        fetch("https://walter.dev.ewill.fr/api/annonces/", {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token}`,
            }),
        })
        .then(function (response) {
            return response.json()
        })
        .then(function (result) {
            // On ré ordonne les id de l'objet avant de le stocker
            result.sort((a, b) => (a.id > b.id) ? 1 : -1)
            // On réattribut les id des blocks qui seront créé pour éviter les doublons
            result.forEach(element => {
                element.id = element.id + (11 * page)
            });
            // ajout des nouveaux blocks
            setAnnounces([...announces, ...result])
        });
    }

    // Ajout d'une page et appel de l'api
    const handleLoadMore = () => {
        setPage(page+1)
        makeRemoteRequest()
    }

    return (
        <FlatList
            style={styles.container}
            data={announces}
            renderItem={Announces}
            keyExtractor={item => item.id}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={800} // Hauteur à partir du bas de la liste dans laquelle la fonction onEndReached est lancée
        />
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#081826"
    }
})

export default BackOffice