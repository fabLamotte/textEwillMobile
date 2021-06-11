import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'

import Connexion from './src/screen/Connexion'
import BackOffice from './src/screen/BackOffice'

const App = () => {
  // Initialisation d'une variable de récupération des données de l'api
  const [connexionAPI, setConnexionAPI] = useState('')
  const [connected, setConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const [announces, setAnnounces] = useState([])

  // Récupération des données de l'api au chargement de la page
  useEffect(() =>{
      fetch("https://www.postman.com/collections/b5255e84b3807256fc8e")
      .then((response) => response.json())
      .then((responseJson) => {
        setConnexionAPI(responseJson.item[0])
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(setIsLoading(false))
  }, [])

  return (
    <View style={styles.container}>
        {
          (!connected)? 
            <Connexion 
              email={email} 
              password={password} 
              token={token}
              setConnected={setConnected} 
              setEmail={setEmail} 
              setPassword={setPassword} 
              setToken={setToken}
              setAnnounces={setAnnounces}
            />
          :
            <BackOffice 
              email={email}
            />
        }
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
})

export default App
