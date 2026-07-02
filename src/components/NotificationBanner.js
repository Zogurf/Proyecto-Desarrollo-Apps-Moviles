import { Text, Animated, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { notificacionService } from '../services/NotificacionService'

export default function NotificationBanner() {
    const [notification, setNotification] = useState(null);
    const translateY = useRef(new Animated.Value(-120)).current;
    const timeoutRef = useRef(null);

    useEffect(() => {
        const unsub = notificacionService.suscribir((notif) => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setNotification(notif);
        });
        return unsub;
    }, []);

    useEffect(() => {
        if (!notification) return;

        translateY.setValue(-120);
        Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            damping: 15,
            stiffness: 200,
        }).start();

        timeoutRef.current = setTimeout(() => {
            Animated.timing(translateY, {
                toValue: -120,
                duration: 250,
                useNativeDriver: true,
            }).start(() => setNotification(null));
        }, 6000);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [notification]);

    const cerrar = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        Animated.timing(translateY, {
            toValue: -120,
            duration: 200,
            useNativeDriver: true,
        }).start(() => setNotification(null));
    }, []);

    if (!notification) return null;

    return (
        <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
            <TouchableOpacity style={styles.content} activeOpacity={1} onPress={cerrar}>
                <Text style={styles.title}>{notification.title}</Text>
                <Text style={styles.body}>{notification.body}</Text>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        paddingTop: 50,
        paddingHorizontal: 15,
        paddingBottom: 15,
        backgroundColor: '#C8102E',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
    },
    content: {
        flex: 1,
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
    },
    body: {
        color: '#fff',
        fontSize: 14,
    },
});
