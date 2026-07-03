import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; // Para recargar cuando entras a la pantalla

const Notificaciones = () => {
    const [notificaciones, setNotificaciones] = useState([]);

    // Esta función carga las notificaciones cada vez que el usuario abre esta pestaña
    useFocusEffect(
        useCallback(() => {
            cargarHistorial();
        }, [])
    );

    const cargarHistorial = async () => {
        try {
            const historialGuardado = await AsyncStorage.getItem('@notificaciones_historial');
            if (historialGuardado) {
                setNotificaciones(JSON.parse(historialGuardado));
            }
        } catch (error) {
            console.error('Error cargando historial:', error);
        }
    };

    const limpiarHistorial = async () => {
        await AsyncStorage.removeItem('@notificaciones_historial');
        setNotificaciones([]);
    };

    const renderItem = ({ item }) => {
        // Formatear la fecha para que se vea amigable
        const fechaFormateada = new Date(item.fecha).toLocaleString('es-ES', {
            day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
        });

        return (
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.date}>{fechaFormateada}</Text>
                </View>
                <Text style={styles.body}>{item.body}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.pageTitle}>Notificaciones</Text>
                {notificaciones.length > 0 && (
                    <TouchableOpacity onPress={limpiarHistorial}>
                        <Text style={styles.clearText}>Limpiar</Text>
                    </TouchableOpacity>
                )}
            </View>

            {notificaciones.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No tienes notificaciones nuevas.</Text>
                </View>
            ) : (
                <FlatList
                    data={notificaciones}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContainer}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#e1e1e1',
    },
    pageTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#800000', // Rojo UT
    },
    clearText: {
        color: '#2E86C1',
        fontWeight: '600',
    },
    listContainer: {
        padding: 15,
    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 2, // Sombra Android
        shadowColor: '#000', // Sombra iOS
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    date: {
        fontSize: 12,
        color: '#888',
        marginLeft: 10,
    },
    body: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: '#999',
        fontSize: 16,
    }
});

export default Notificaciones;