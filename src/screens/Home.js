import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { REPORTES } from '../data/reportes.js'
import { Ionicons } from '@expo/vector-icons';
import TopBar from '../components/Topbar.js';
import ScreenHeader from '../components/ScreenHeader';
import ReporteItem from '../components/ReporteItem';
import { styles } from '../styles/screens/HomeStyles';

export default function Home(props) {
    const [filtroActivo, setFiltroActivo] = useState('Todos');
    const filtros = ['Todos', 'Pendientes', 'En Proceso', 'Solucionados'];

    const reportesFiltrados = REPORTES.filter(reporte => {
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

            <FlatList // renderiza los datos
                data={reportesFiltrados}
                renderItem={({ item }) => <ReporteItem item={item} />}
                keyExtractor={item => item.id}
            />

            {/* Boton agreggar */}
            <TouchableOpacity style={styles.agregar} onPress={() => props.navigation.navigate('AgregarReporte')}>
                <Ionicons name="add" size={30} color="white" />
            </TouchableOpacity>
        </View>
    )
}

