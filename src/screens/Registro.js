import { Text, StyleSheet, View, Image, TextInput, Pressable, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import appFirebase from '../config/Firebase.js';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import AuthHeader from '../components/AuthHeader.js';

const auth = getAuth(appFirebase);

export default function Registro(props) {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const registrar = async () => {
        if (password !== password2) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return;
        }
        if (!email.trim() || !password.trim()) {
            Alert.alert('Error', 'Ingresa un email y contraseña para registrarte');
            return;
        }

        if (!email.trim().toLowerCase().endsWith('@utp.edu.pe')) {
            Alert.alert('Error', 'Por favor usa el correo institucional para registrarte');
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
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

const styles = StyleSheet.create({
    body: {
        flex: 1
    },
    contenedor: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '90%',
        backgroundColor: '#ffffff',
        marginTop: 50,
        borderRadius: 50,
        paddingBottom: 20,
        paddingTop: 20
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
        width: '40%', padding: 10,
        borderRadius: 50,
        alignItems: 'center'
    },
    botonText: {
        color: '#ffffff',
        fontSize: 20
    },
    botonRegistro: {
        marginTop: 20
    },
    registroText: { color: '#C8102E' }
});