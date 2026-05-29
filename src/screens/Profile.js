import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import appFirebase, { db } from '../config/Firebase';
import ScreenHeader from '../components/ScreenHeader';
import TopBar from '../components/Topbar';
import { styles } from '../styles/screens/ProfileStyles';

const auth = getAuth(appFirebase);

export default function Profile({ navigation }) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const userId = await AsyncStorage.getItem('userToken');
            if (userId) {
                const userDocRef = doc(db, 'usuarios', userId);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    setUserData(userDocSnap.data());
                } else {
                    console.log("No se encontro el documento del usuario");
                }
            }
        } catch (error) {
            console.error("Error al cargar los datos del usuario: ", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            await AsyncStorage.removeItem('userToken');
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            console.error("Error al cerrar sesion: ", error);
            Alert.alert("Error", "No se pudo cerrar sesion");
        }
    };

    const getInicial = (nombre) => {
        if (!nombre) return "?";
        return nombre.charAt(0).toUpperCase();
    }

    return (
        <View style={styles.container}>
            <TopBar />
            <ScreenHeader titulo="Mi Perfil" subTitulo="Gestiona tu cuenta y configuracion" />
            
            {loading ? (
                 <View style={styles.loadingContainer}>
                     <ActivityIndicator size="large" color="#C8102E" />
                 </View>
            ) : (
                <View style={styles.content}>
                    {userData && (
                        <View style={styles.profileCard}>
                            <View style={styles.avatarPlaceholder}>
                                <Text style={styles.avatarText}>{getInicial(userData.nombre)}</Text>
                            </View>
                            <Text style={styles.userName}>{`${userData.nombre} ${userData.apellido}`}</Text>
                            <Text style={styles.userEmail}>{userData.email}</Text>
                        </View>
                    )}
                    
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.logoutText}>Cerrar Sesion</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}
