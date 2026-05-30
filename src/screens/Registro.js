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
    const [errores, setErrores] = useState({});

    const registrar = async () => {
        const nuevosErrores = {};

        if (!nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio";
        if (!apellido.trim()) nuevosErrores.apellido = "El apellido es obligatorio";
        
        if (!email.trim()) {
            nuevosErrores.email = "El correo es obligatorio";
        } else if (!email.trim().toLowerCase().endsWith('@utp.edu.pe')) {
            nuevosErrores.email = "Por favor usa tu correo institucional (@utp.edu.pe)";
        }

        if (!password.trim()) {
            nuevosErrores.password = "La contraseña es obligatoria";
        } else if (password.length < 6) {
            nuevosErrores.password = "La contraseña debe tener al menos 6 caracteres";
        }
        
        if (password !== password2) {
            nuevosErrores.password2 = "Las contraseñas no coinciden";
        }

        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "usuarios", user.uid), {
                nombre: nombre.trim(),
                apellido: apellido.trim(),
                email: email.trim().toLowerCase(),
                rol: 'usuario',
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

                <TextInput placeholder="Ingrese sus nombres" style={[styles.input, errores.nombre && styles.inputError]} onChangeText={(text) => {setNombre(text); setErrores({...errores, nombre: null});}} />
                {errores.nombre && <Text style={styles.errorText}>{errores.nombre}</Text>}

                <TextInput placeholder="Ingrese sus apellidos" style={[styles.input, errores.apellido && styles.inputError]} onChangeText={(text) => {setApellido(text); setErrores({...errores, apellido: null});}} />
                {errores.apellido && <Text style={styles.errorText}>{errores.apellido}</Text>}

                <TextInput placeholder="Ingrese su email UTP" style={[styles.input, errores.email && styles.inputError]} autoCapitalize="none" keyboardType="email-address" onChangeText={(text) => {setEmail(text); setErrores({...errores, email: null});}} />
                {errores.email && <Text style={styles.errorText}>{errores.email}</Text>}

                <TextInput placeholder="Ingrese su contraseña" style={[styles.input, errores.password && styles.inputError]} secureTextEntry={true} onChangeText={(text) => {setPassword(text); setErrores({...errores, password: null});}} />
                {errores.password && <Text style={styles.errorText}>{errores.password}</Text>}

                <TextInput placeholder="Confirme su contraseña" style={[styles.input, errores.password2 && styles.inputError]} secureTextEntry={true} onChangeText={(text) => {setPassword2(text); setErrores({...errores, password2: null});}} />
                {errores.password2 && <Text style={styles.errorText}>{errores.password2}</Text>}
                
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
