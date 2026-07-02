const listeners = new Set();

export const notificacionService = {
    inicializar: async () => true,

    mostrarNotificacion({ title, body }) {
        listeners.forEach(cb => cb({ title, body }));
    },

    suscribir(callback) {
        listeners.add(callback);
        return () => listeners.delete(callback);
    },
};
