import { Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import TopBar from '../components/Topbar.js';
import ScreenHeader from '../components/ScreenHeader';
import ReporteItem from '../components/ReporteItem';
import { styles } from '../styles/screens/HomeStyles';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../config/Firebase';

export default function Home(props) {
    const [filtroActivo, setFiltroActivo] = useState('Todos');
    const [reportes, setReportes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const filtros = ['Todos', 'Pendientes', 'En Proceso', 'Solucionados'];

    useEffect(() => {
        const q = query(collection(db, 'reportes'), orderBy('fecha', 'desc'));
        
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const reportesArray = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                
                // Formatear la fecha para que se vea bien en la app si existe el timestamp
                let fechaFormateada = '';
                if (data.fecha) {
                    const date = data.fecha.toDate();
                    fechaFormateada = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
                }

                // Asignar colores según el status para mantener tu diseño original
                let textColor = '#B7950B'; // Default Pendiente
                if (data.status === 'En Proceso') textColor = '#2E86C1';
                if (data.status === 'Solucionado') textColor = '#1E8449';

                reportesArray.push({
                    id: doc.id,
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
            setReportes(reportesArray);
            setCargando(false);
        }, (error) => {
            console.error("Error al obtener reportes:", error);
            setCargando(false);
        });

        return () => unsubscribe();
    }, []);

    const reportesFiltrados = reportes.filter(reporte => {
        if (filtroActivo === 'Todos') return true;

        const statusBusqueda = filtroActivo === 'Pendientes' ? 'Pendiente' : filtroActivo === 'En Proceso' ? 'En Proceso' : 'Solucionado';
        return reporte.status === statusBusqueda;
    });

    return (
        <View style={styles.body}>
            <TopBar />

            <ScreenHeader titulo="Mis Reportes" subTitulo="Gestiona y monitorea las incidencias registradas en UTP sede LN" />

            <View style={styles.filtrosContenedor}>
                {filtros.map((filtro) => (
                    <TouchableOpacity key={filtro} style={[styles.btnFiltro, filtroActivo === filtro && styles.btnFiltroActivo]}
                        onPress={() => setFiltroActivo(filtro)}>

                        <Text style={[styles.txtFiltro, filtroActivo === filtro && styles.txtFiltroActivo]}>
                            {filtro}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {cargando ? (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={{marginTop: 10}}>Cargando reportes...</Text>
                </View>
            ) : (
                <FlatList // renderiza los datos
                    data={reportesFiltrados}
                    renderItem={({ item }) => <ReporteItem item={item} />}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={<Text style={{textAlign: 'center', marginTop: 50}}>No hay reportes para mostrar</Text>}
                />
            )}

            {/* Boton agreggar */}
            <TouchableOpacity style={styles.agregar} onPress={() => props.navigation.navigate('AgregarReporte')}>
                <Ionicons name="add" size={30} color="white" />
            </TouchableOpacity>
        </View>
    )
}

