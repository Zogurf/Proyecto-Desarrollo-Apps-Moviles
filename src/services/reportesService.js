import { collection, onSnapshot, query, orderBy, doc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/Firebase';

export const reportesService = {
    suscribirseAReportes: (onSuccess, onError) => {
        const q = query(collection(db, 'reportes'), orderBy('fecha', 'desc'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const reportesArray = [];
            querySnapshot.forEach((docSnapshot) => {
                const data = docSnapshot.data();

                let fechaFormateada = '';
                if (data.fecha) {
                    const date = data.fecha.toDate();
                    fechaFormateada = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
                }

                let textColor = '#B7950B'; // pendiente
                if (data.status === 'En Proceso') textColor = '#2E86C1';
                if (data.status === 'Solucionado') textColor = '#1E8449';

                reportesArray.push({
                    id: docSnapshot.id,
                    ...data,
                    title: data.titulo,
                    tower: data.torre,
                    floor: data.piso,
                    category: data.categoria,
                    date: fechaFormateada || 'Sin fecha',
                    textColor: textColor,
                    classroom: data.ambiente
                });
            });
            onSuccess(reportesArray);
        }, (error) => {
            onError(error);
        });

        return unsubscribe;
    },

    actualizarEstadoReporte: async (id, nuevoEstado) => {
        const reporteRef = doc(db, 'reportes', id);
        await updateDoc(reporteRef, {
            status: nuevoEstado
        });
    },

    crearReporte: async (datosReporte, userId) => {
        const reportesRef = collection(db, 'reportes');
        await addDoc(reportesRef, {
            ...datosReporte,
            status: 'Pendiente',
            usuarioId: userId,
            fecha: serverTimestamp()
        });
    }
};
