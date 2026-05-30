import { Text, View, Image, TextInput, Pressable, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import appFirebase, { db } from '../config/Firebase'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import AuthHeader from '../components/AuthHeader.js';
import { styles } from '../styles/screens/LoginStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const auth = getAuth(appFirebase)

export default function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errores, setErrores] = useState({});

    const logear = async () => {
        const nuevosErrores = {};
        if (!email.trim()) nuevosErrores.email = "El correo es obligatorio";
        if (!password.trim()) nuevosErrores.password = "La contraseña es obligatoria";

        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            let rol = 'usuario'; // por defecto
            try {
                const userDocRef = doc(db, 'usuarios', user.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists() && userDocSnap.data().rol) {
                    rol = userDocSnap.data().rol;
                }
            } catch (roleError) {
                console.error("Error al obtener rol:", roleError);
            }

            await AsyncStorage.setItem('userToken', user.uid)
            await AsyncStorage.setItem('userRole', rol)

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

                <TextInput placeholder="Email" style={[styles.input, errores.email && styles.inputError]} keyboardType="email-address"
                    onChangeText={(text) => { setEmail(text); setErrores({ ...errores, email: null }); }} />
                {errores.email && <Text style={styles.errorText}>{errores.email}</Text>}

                <TextInput placeholder="Contraseña" style={[styles.input, errores.password && styles.inputError]}
                    secureTextEntry={true}
                    onChangeText={(text) => { setPassword(text); setErrores({ ...errores, password: null }); }} />
                {errores.password && <Text style={styles.errorText}>{errores.password}</Text>}

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
