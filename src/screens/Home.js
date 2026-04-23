import { Text, StyleSheet, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { REPORTES } from '../data/reportes.js'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


const mostrarItem = ({ item }) => {
    return (
        <View style={styles.tarjeta}>
            <View style={styles.tarjetaHeader}>

                <View style={[styles.estado]}>
                    <Text style={[styles.estadoText, { color: item.textColor }]}>{item.status}</Text>
                </View>

                <Text>{item.date}</Text>
            </View>

            <Text style={styles.reporteTitulo}>{item.title}</Text>

            <View style={styles.tarjetaFooter}>
                <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="door" size={16} />
                    <Text style={styles.infoTexto}>{item.tower} - {item.classroom}</Text>
                </View>

                <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="wrench-outline" size={16} />
                    <Text style={styles.infoTexto}>{item.category}</Text>
                </View>
            </View>
        </View>
    );
};


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
            <View style={styles.topBar}>
                <Text style={styles.topBarTitulo}>UTPreport</Text>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
            </View>

            <View style={styles.cabezeraContenedor}>
                <Text style={styles.titulo}>Mis Reportes</Text>
                <Text style={styles.subTitulo}>Gestiona y monitorea las incidencias registradas en UTP sede LN</Text>
            </View>

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
                renderItem={mostrarItem}
                keyExtractor={item => item.id}
            />

            {/* Boton agreggar */}
            <TouchableOpacity style={styles.agregar} onPress={() => props.navigation.navigate('AgregarReporte')}>
                <Ionicons name="add" size={30} color="white" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },

    // topBar
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    topBarTitulo: {
        fontSize: 25,
        color: '#C8102E',
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 50
    },

    // header
    cabezeraContenedor: {
        paddingHorizontal: 20,
        marginTop: 25,
        marginBottom: 20,
    },
    titulo: {
        fontSize: 32,
        marginBottom: 8,
    },
    subTitulo: {
        fontSize: 18,
    },

    // filtrar
    filtrosContenedor: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    btnFiltro: {
        backgroundColor: '#E6E9EE',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginRight: 10,
        marginBottom: 10,
    },
    btnFiltroActivo: {
        backgroundColor: '#C8102E',
    },
    txtFiltro: {
        fontWeight: '600',
    },
    txtFiltroActivo: {
        color: '#FFFFFF',
    },

    // Cards
    tarjeta: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        marginBottom: 15,
        marginHorizontal: 20,
        borderRadius: 20,
    },
    tarjetaHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    estado: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 15,
    },
    estadoText: {
        fontSize: 11,
        fontWeight: 'bold',
    },
    reporteTitulo: {
        fontSize: 20,
        marginBottom: 15,
    },
    tarjetaFooter: {
        flexDirection: 'row',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 80,
    },
    infoTexto: {
        fontSize: 14,
        marginLeft: 5,
    },

    agregar: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#C8102E',
        width: 65,
        height: 65,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    }
});