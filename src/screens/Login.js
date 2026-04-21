import { Text, StyleSheet, View, Image, TextInput, Pressable, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import appFirebase from '../../credenciales.js'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

// Inicializar la funcion Auth de firebase
const auth = getAuth(appFirebase)

export default function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const logear = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Por favor ingresa tu email y contraseña')
            return
        }

        try {
            await signInWithEmailAndPassword(auth, email, password)
            Alert.alert('Iniciando sesion', 'Bienvenido(a)')
            props.navigation.navigate('Home')

        } catch (error) {
            console.error('Error:', error)
            Alert.alert('El usuario y/o la contraseña son incorrectos')
        }
    }

    return (
        <View style={styles.body}>
            <View style={styles.cabezeraContenedor}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
                <Text style={styles.cabezeraTitulo}>UNIreport</Text>
            </View>

            <View style={styles.contenedor}>
                <Text style={styles.titulo}>Iniciar Sesion</Text>

                <TextInput placeholder="Email" style={styles.input}
                    onChangeText={(text) => setEmail(text)} />

                <TextInput placeholder="Contraseña" style={styles.input}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)} />

                <Pressable
                    onPress={logear}
                    style={({ pressed }) => [styles.boton, {
                        transform: [{ scale: pressed ? 0.85 : 1 }],
                        opacity: pressed ? 0.5 : 1
                    }]}>

                    <Text style={styles.botonText}>Login</Text>
                </Pressable>

                <TouchableOpacity style={styles.botonRegistro} onPress={() => props.navigation.navigate('Registro')}>
                    <Text style={styles.registroText}>No tienes una cuenta? Registrate </Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1
    },

    cabezeraContenedor: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    contenedor: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '90%',
        backgroundColor: '#ffffff',
        marginTop: 50,
        borderRadius: 50,
        paddingBottom: 20
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
    titulo: {
        fontSize: 30,
        marginVertical: 20
    },
    input: {
        backgroundColor: '#edf2fc',
        width: '80%',
        borderWidth: 2,
        borderColor: 'rgb(167, 167, 167)',
        borderRadius: 50,
        marginBottom: 20,
        padding: 10
    },
    boton: {
        backgroundColor: '#C8102E',
        width: '30%',
        padding: 10,
        borderRadius: 50,
        alignItems: 'center'
    },
    botonText: {
        color: '#ffffff',
        fontSize: 20
    },
    botonRegistro: {
        marginTop: 20,
    },
    registroText: {
        color: '#C8102E'
    }
})