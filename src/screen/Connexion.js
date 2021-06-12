import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image, Platform, TextInput, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const Connexion = (props) => {
    const {
        email,
        password,
        setEmail,
        setPassword,
        setAnnounces,
        navigation,
        setIsSignedIn,
        setToken
    } = props

    // Initialisation des principales variables
        const [errorEmail, setErrorEmail] = useState('')
        const [errorPassword, setErrorPassword] = useState('')
        const [passDiscover, setPassDiscover] = useState(true)
        const [errorForm, setErrorForm] = useState('')

    // Gestion des icones
        const loginIcon = (Platform.OS === 'ios') ? "person-outline" : "person-sharp"
        const passIcon = (Platform.OS === 'ios') ? "key-outline" : "key-sharp"
        const eyeCovered = (Platform.OS === 'ios') ? "eye-off-outline" : "eye-off-sharp"
        const eyeDiscovered = (Platform.OS === 'ios') ? "eye-outline" : "eye-sharp"
        const passEyedIcon = (!passDiscover) ? eyeCovered : eyeDiscovered

    // Fonction de gestion de l'affichage du mot de passe en clair ou non
        const SwitchEye = () => {
            (passDiscover) ? setPassDiscover(false) : setPassDiscover(true)
        }

    // Fonction vérification champs vide email 
        const verifyEmail = () => {
            let result = (!email) ? "Veuillez rentrer votre adresse e-mail." : null
            setErrorEmail(result)
        }

    // Fonction vérification champs vide password
        const verifyPassword = () => {
            let result = (!password) ? "Veuillez rentrer votre mot de passe." : null
            setErrorPassword(result)
        }

    // Fonction submit
        const testValidate = async () => {

            // Envoi des données dans l'api
            const token = await fetch("https://walter.dev.ewill.fr/api/login_check", {
                method: 'POST',
                body: JSON.stringify({
                    username: email,
                    password: password
                })
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (result) {
                    (result.code == '401') ? setErrorForm('Identifiants invalides') : setErrorForm('')

                    if (result.token) {
                        
                        setToken(result.token)
                        return result.token
                    }
                });
            
            if(token){
                const data = await fetch("https://walter.dev.ewill.fr/api/annonces/", {
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
                        setAnnounces(result)
                        setIsSignedIn(true)
                        navigation.navigate('BackOffice')
                    });
                }
            }

    return (
        <View style={styles.container}>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <Image
                        source={require('../images/devMobile.jpg')}
                        style={styles.bannerHeader}
                        resizeMode='stretch'
                    />
                    <View style={styles.darkFilter}></View>
                    <Text style={styles.headerText}>Test développeur</Text>
                </View>
                <View style={styles.connectBlock}>
                    <Text style={styles.connexionTitle}>Connexion</Text>
                    <View style={styles.form}>

                        <View style={styles.formBlock}>
                            <View style={styles.iconBlock}>
                                <Icon name={loginIcon} style={styles.icon} />
                            </View>
                            <View style={styles.inputBlock}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setEmail}
                                    onBlur={verifyEmail}
                                    value={email}
                                    defaultValue="antoine@ewill.fr"
                                />
                            </View>
                        </View>
                        <Text style={styles.errorText}>{errorEmail}</Text>

                        <View style={styles.formBlock}>
                            <View style={styles.iconBlock}>
                                <Icon name={passIcon} style={styles.icon} />
                            </View>
                            <View style={styles.inputBlock}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setPassword}
                                    value={password}
                                    onBlur={verifyPassword}
                                    secureTextEntry={passDiscover}
                                    defaultValue="antoine"
                                />
                                <Icon name={passEyedIcon} style={styles.iconPassEyed} onPress={() => SwitchEye()} />
                            </View>
                        </View>
                        <Text style={styles.errorText}>{errorPassword}</Text>

                        {/* Boutton disabled si les deux champs ne sont pas remplis */}
                        <View style={styles.submitZone}>
                            <TouchableOpacity style={styles.submitButton} onPress={() => testValidate()}
                                disabled={(!email && !password) ? true : false}
                                 >
                                <Text style={styles.submitText}>Se connecter</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.errorText}>{errorForm}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#081826',
        width: '100%',
    },
    header: {
        backgroundColor: "#4A4747",
        position: 'relative',
    },
    darkFilter: {
        position: 'absolute',
        backgroundColor: 'black',
        zIndex: 2,
        height: 175,
        width: 450,
        opacity: 0.3
    },
    bannerHeader: {
        position: 'absolute',
        height: 175,
        zIndex: 1
    },
    headerText: {
        textTransform: 'uppercase',
        color: 'white',
        fontSize: 44,
        textAlign: 'center',
        marginVertical: 30,
        fontWeight: 'bold',
        zIndex: 3
    },
    connectBlock: {
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 50,
        marginHorizontal:20,
        marginTop:20,
        width: '90%'
    },
    connexionTitle: {
        fontSize: 25,
        textAlign: 'center',
        position: 'relative',
        textTransform: 'uppercase',
        color: '#E0AF25',
        fontWeight: 'bold',
    },
    formBlock: {
        borderWidth: 1,
        borderColor: "#C0B8B8",
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%",
        marginTop: 30
    },
    iconBlock: {
        width: "20%",
    },
    icon: {
        fontSize: 30,
        textAlign: 'center',
        margin: 5,
        paddingRight: 5,
        borderRightColor: 'black',
        borderRightWidth: 1,
        color: '#E0AF25'
    },
    inputBlock: {
        width: "80%",
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    input: {
        width: "80%",
        height: 50,
        fontSize: 15,
    },
    iconPassEyed: {
        width: "20%",
        fontSize: 20,
        textAlign: 'center'
    },
    submitZone: {
        marginVertical: 30,
        marginHorizontal: 50,
    },
    submitButton: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#25A9E0',
        borderRadius: 10
    },
    submitText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    errorText: {
        color: 'red',
        textAlign: 'center'
    }
})

export default Connexion