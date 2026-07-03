import AsyncStorage from '@react-native-async-storage/async-storage';

const listeners = new Set();

export const notificacionService = {
    inicializar: async () => true,

    async mostrarNotificacion({ title, body }) {
        listeners.forEach(cb => cb({ title, body }));

        await notificacionService.guardarEnHistorial(title, body);
    },

    suscribir(callback) {
        listeners.add(callback);
        return () => listeners.delete(callback);
    },

    async guardarEnHistorial(title, body) {
        try {
            const nuevaNotificacion = {
                id: Date.now().toString(),
                title: title,
                body: body,
                fecha: new Date().toISOString(),
            };

            const historialGuardado = await AsyncStorage.getItem('@notificaciones_historial');
            let historial = historialGuardado ? JSON.parse(historialGuardado) : [];

            historial.unshift(nuevaNotificacion);

            await AsyncStorage.setItem('@notificaciones_historial', JSON.stringify(historial));
        } catch (error) {
            console.error('Error guardando historial de notificaciones:', error);
        }
    }
};
