import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'

import Connexion from './src/screen/Connexion'
import BackOffice from './src/screen/BackOffice'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const App = () => {
  // Initialisation d'une variable de récupération des données de l'api
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [announces, setAnnounces] = useState([])
    const [token, setToken] = useState('')
    const Stack = createStackNavigator()

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator headerMode={{headerShown:false}}>
          {
            !isSignedIn ? 
              <Stack.Screen name="Connexion">
                {(props) => (
                    <Connexion {...props} 
                      email={email} 
                      setEmail={setEmail} 
                      password={password} 
                      setPassword={setPassword}
                      setAnnounces={setAnnounces} 
                      setIsSignedIn={setIsSignedIn}
                      setToken={setToken}
                      />
                  ) 
                }
              </Stack.Screen>
            :
              <Stack.Screen name="BackOffice">
                {(props) => (
                    <BackOffice {...props} 
                      announces={announces} 
                      setAnnounces={setAnnounces}
                      token={token}
                    />
                  ) 
                }
              </Stack.Screen>
          }
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
})

export default App
