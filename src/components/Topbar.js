import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const TopBar = () => {
    return (
        <View style={styles.topBar}>
            <Text style={styles.titulo}>UTPreport</Text>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>
    )
}

const styles = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    titulo: {
        fontSize: 25,
        color: '#C8102E',
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
})

export default TopBar;
