import { Text, View, Image } from 'react-native';
import React from 'react';
import { styles } from '../styles/components/AuthHeaderStyles';

const AuthHeader = () => {
    return (
        <View style={styles.cabezeraContenedor}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <Text style={styles.cabezeraTitulo}>UTPreport</Text>
        </View>
    )
}

export default AuthHeader;
