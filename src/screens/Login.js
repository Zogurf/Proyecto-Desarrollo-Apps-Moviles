import { Text, View, Image, TextInput, Pressable, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import appFirebase from '../config/Firebase'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import AuthHeader from '../components/AuthHeader.js';
import { styles } from '../styles/screens/LoginStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            await AsyncStorage.setItem('userToken', user.uid)
            Alert.alert('Iniciando sesion', 'Bienvenido(a)')
            props.navigation.navigate('Home')

        } catch (error) {
            console.error('Error:', error)
            Alert.alert('El usuario y/o la contraseña son incorrectos')
        }
    }

    return (
        <View style={styles.body}>
            <AuthHeader />

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
