import { Text, View } from 'react-native'
import React from 'react'
import { styles } from '../styles/components/ScreenHeaderStyles'

const ScreenHeader = ({titulo, subTitulo}) => {
    return (
        <View style={styles.cabezeraContenedor}>
            <Text style={styles.titulo}>{titulo}</Text>
            <Text style={styles.subTitulo}>{subTitulo}</Text>
        </View>
    )
}

export default ScreenHeader;
