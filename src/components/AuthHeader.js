import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const AuthHeader = () => {
    return (
        <View style={styles.cabezeraContenedor}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <Text style={styles.cabezeraTitulo}>UTPreport</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    cabezeraContenedor: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    cabezeraTitulo: {
        fontSize: 30,
        color: '#C8102E',
        marginTop: 10
    },
})

export default AuthHeader;