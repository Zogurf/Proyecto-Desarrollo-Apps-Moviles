import { Text, View, Image, TextInput, Pressable, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import appFirebase, { db } from '../config/Firebase.js';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import AuthHeader from '../components/AuthHeader.js';
import { styles } from '../styles/screens/RegistroStyles';

const auth = getAuth(appFirebase);

export default function Registro(props) {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const registrar = async () => {
        if (!nombre.trim() || !apellido.trim()) {
            Alert.alert('Error', 'Por favor ingresa tus nombres y apellidos');
            return;
        }
        
        if (password !== password2) {
            Alert.alert('Error', 'Las contraseas no coinciden');
            return;
        }
        if (!email.trim() || !password.trim()) {
            Alert.alert('Error', 'Ingresa un email y contrasea para registrarte');
            return;
        }

        if (!email.trim().toLowerCase().endsWith('@utp.edu.pe')) {
            Alert.alert('Error', 'Por favor usa el correo institucional para registrarte');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "usuarios", user.uid), {
                nombre: nombre.trim(),
                apellido: apellido.trim(),
                email: email.trim().toLowerCase(),
                fechaRegistro: serverTimestamp()
            });

            Alert.alert('Bienvenido(a)', 'Bienvenido a UTPreport');
            props.navigation.navigate('Login');

        } catch (error) {
            console.error('Error:', error);
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert('Error', 'Este correo ya esta registrado');
            } else if (error.code === 'auth/weak-password') {
                Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
            } else {
                Alert.alert('Error', 'Hubo un problema al crear la cuenta');
            }
        }
    }

    return (
        <View style={styles.body}>
            <AuthHeader />

            <View style={styles.contenedor}>
                <Text style={styles.titulo}>Crear Cuenta</Text>

                <TextInput placeholder="Ingrese sus nombres" style={styles.input} onChangeText={(text) => setNombre(text)} />
                <TextInput placeholder="Ingrese sus apellidos" style={styles.input} onChangeText={(text) => setApellido(text)} />
                <TextInput placeholder="Ingrese su email UTP" style={styles.input} onChangeText={(text) => setEmail(text)} />
                <TextInput placeholder="Ingrese su contraseña" style={styles.input} secureTextEntry={true} onChangeText={(text) => setPassword(text)} />
                <TextInput placeholder="Confirme su contraseña" style={styles.input} secureTextEntry={true} onChangeText={(text) => setPassword2(text)} />
                
                <Pressable onPress={registrar}
                    style={({ pressed }) => [styles.boton, {
                        transform: [{ scale: pressed ? 0.85 : 1 }],
                        opacity: pressed ? 0.5 : 1
                    }]}>

                    <Text style={styles.botonText}>Registrar</Text>
                </Pressable>

                <TouchableOpacity style={styles.botonRegistro} onPress={() => props.navigation.navigate('Login')}>
                    <Text style={styles.registroText}>Ya tienes una cuenta?</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}
