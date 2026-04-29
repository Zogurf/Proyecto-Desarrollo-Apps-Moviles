import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ScreenHeader = ({titulo, subTitulo}) => {
    return (
        <View style={styles.cabezeraContenedor}>
            <Text style={styles.titulo}>{titulo}</Text>
            <Text style={styles.subTitulo}>{subTitulo}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    // header
    cabezeraContenedor: {
        paddingHorizontal: 20,
        marginTop: 25,
        marginBottom: 20,
    },
    titulo: {
        fontSize: 32,
        marginBottom: 8,
    },
    subTitulo: {
        fontSize: 18,
    },
})

export default ScreenHeader;