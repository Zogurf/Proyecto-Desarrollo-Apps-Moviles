import { Text, View, Image } from 'react-native'
import React from 'react'
import { styles } from '../styles/components/TopbarStyles'

const TopBar = () => {
    return (
        <View style={styles.topBar}>
            <Text style={styles.titulo}>UTPreport</Text>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>
    )
}

export default TopBar;
