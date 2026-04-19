import { Text, StyleSheet, View, Image, TextInput, Alert, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


export default function AgregarReporte(props) {
    const [ambiente, setAmbiente] = useState('');
    const [piso, setPiso] = useState('');
    const [descripcion, setDescripcion] = useState('');

    return (
        <View style={styles.body}>
            <View style={styles.topBar}>
                <Text style={styles.topBarTitulo}>UniReport</Text>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
            </View>

            <View style={styles.cabezeraContenedor}>
                <Text style={styles.titulo}>Agregar Reporte</Text>
                <Text style={styles.subTitulo}>Registra una nueva incidencia en tu ambiente</Text>
            </View>

            <View style={styles.formulario}>

                <Text style={styles.label}>Piso</Text>
                <TextInput style={styles.input} placeholder="Ingrese el piso" />

                <Text style={styles.label}>Ambiente</Text>
                <TextInput style={styles.input} placeholder="Ingresa el ambiente" />

                <Text style={styles.label}>Categoria</Text>
                <TextInput style={styles.input} placeholder=" -- " />

                <Text style={styles.label}>Descripción</Text>
                <TextInput style={styles.input} placeholder="Describe la incidencia" />

                <Text style={styles.label}>Agrega una imagen (si es necesario) </Text>

                <Pressable onPress={() => props.navigation.navigate('Home')} style={({ pressed }) => [styles.boton, {
                        transform: [{ scale: pressed ? 0.85 : 1 }],
                        opacity: pressed ? 0.5 : 1
                    }]}>

                    <Text style={styles.botonText}>AgregarReporte</Text>
                </Pressable>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },

    // topBar
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    topBarTitulo: {
        fontSize: 25,
        color: '#C8102E',
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 50
    },

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

    // formulario
    formulario: {
        alignSelf: 'center',
        width: '90%',
        backgroundColor: '#ffffff',
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 20,
    },

    label: {
        fontSize: 16,
        marginBottom: 5,
        marginLeft: 20,
    },
    input: {
        backgroundColor: '#edf2fc',
        width: '80%',
        borderWidth: 2,
        borderColor: 'rgb(167, 167, 167)',
        borderRadius: 50,
        marginBottom: 25,
        padding: 10,
    },
    boton: {
        backgroundColor: '#C8102E',
        width: '50%',
        padding: 10,
        borderRadius: 50,
        alignItems: 'center',
        marginTop: 100
    },
    botonText: {
        color: '#ffffff',
        fontSize: 20
    },
})