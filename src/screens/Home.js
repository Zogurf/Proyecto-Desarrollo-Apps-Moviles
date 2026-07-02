import { Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator, Modal, Alert } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { Ionicons } from '@expo/vector-icons';
import TopBar from '../components/Topbar.js';
import ScreenHeader from '../components/ScreenHeader';
import ReporteItem from '../components/ReporteItem';
import { styles } from '../styles/screens/HomeStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { reportesService } from '../services/reportesService';
import { notificacionService } from '../services/NotificacionService';

export default function Home(props) {
    const [filtroActivo, setFiltroActivo] = useState('Todos');
    const [reportes, setReportes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [userRole, setUserRole] = useState('usuario');
    const [modalVisible, setModalVisible] = useState(false);
    const [reporteSeleccionado, setReporteSeleccionado] = useState(null);

    const filtros = ['Todos', 'Pendientes', 'En Proceso', 'Solucionados'];
    const unsubscribeRef = useRef(null);

    useEffect(() => {
        const cargarUserId = async () => {
            const role = await AsyncStorage.getItem('userRole');
            if (role) {
                setUserRole(role);
            }
            return await AsyncStorage.getItem('userToken');
        };

        const setup = async () => {
            const userId = await cargarUserId();

            await notificacionService.inicializar();

            unsubscribeRef.current = reportesService.suscribirseAReportes(
                (reportesArray) => {
                    setReportes(reportesArray);
                    setCargando(false);
                },
                (error) => {
                    console.error("Error al obtener reportes:", error);
                    setCargando(false);
                },
                async (cambios) => {
                    for (const cambio of cambios) {
                        if (cambio.usuarioId === userId) {
                            await notificacionService.mostrarNotificacion({
                                title: 'Estado actualizado',
                                body: `Tu reporte "${cambio.titulo}" cambió a ${cambio.newStatus}`,
                            });
                        }
                    }
                }
            );
        };

        setup();

        return () => {
            if (unsubscribeRef.current) {
                unsubscribeRef.current();
                unsubscribeRef.current = null;
            }
        };
    }, []);

    const reportesFiltrados = reportes.filter(reporte => {
        if (filtroActivo === 'Todos') return true;

        const statusBusqueda = filtroActivo === 'Pendientes' ? 'Pendiente' : filtroActivo === 'En Proceso' ? 'En Proceso' : 'Solucionado';
        return reporte.status === statusBusqueda;
    });

    const abrirDetalles = (reporte) => {
        setReporteSeleccionado(reporte);
        setModalVisible(true);
    };

    const actualizarEstado = async (nuevoEstado) => {
        if (!reporteSeleccionado) return;

        try {
            await reportesService.actualizarEstadoReporte(reporteSeleccionado.id, nuevoEstado);
            Alert.alert('Éxito', `Estado actualizado a ${nuevoEstado}`);
            setModalVisible(false);
        } catch (error) {
            console.error("Error al actualizar el estado:", error);
            Alert.alert('Error', 'No se pudo actualizar el estado');
        }
    };

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
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#C8102E" />
                    <Text style={{ marginTop: 10 }}>Cargando reportes...</Text>
                </View>
            ) : (
                <FlatList
                    data={reportesFiltrados}
                    renderItem={({ item }) => (
                        <ReporteItem
                            item={item}
                            onPress={() => abrirDetalles(item)}
                        />
                    )}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 50 }}>No hay reportes para mostrar</Text>}
                />
            )}

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {reporteSeleccionado && (
                            <>
                                <Text style={styles.modalTitle}>{reporteSeleccionado.title}</Text>

                                <Text style={styles.modalLabel}>Estado Actual:</Text>
                                <Text style={[styles.modalText, { color: reporteSeleccionado.textColor, fontWeight: 'bold' }]}>
                                    {reporteSeleccionado.status}
                                </Text>

                                <Text style={styles.modalLabel}>Ubicacion:</Text>
                                <Text style={styles.modalText}>
                                    Torre {reporteSeleccionado.tower}, Piso {reporteSeleccionado.floor}, Ambiente {reporteSeleccionado.classroom}
                                </Text>

                                <Text style={styles.modalLabel}>Catedoria:</Text>
                                <Text style={styles.modalText}>{reporteSeleccionado.category}</Text>

                                <Text style={styles.modalLabel}>Descripcion:</Text>
                                <Text style={styles.modalDesc}>{reporteSeleccionado.descripcion || 'Sin descripcion'}</Text>
                                {reporteSeleccionado.imagenUrl && (
                                    <View style={{ marginTop: 15, alignItems: 'center' }}>
                                        <Text style={[styles.modalLabel, { alignSelf: 'flex-start' }]}>Evidencia Fotográfica:</Text>
                                        <Image
                                            source={{ uri: reporteSeleccionado.imagenUrl }}
                                            style={{
                                                width: '100%',
                                                height: 200,
                                                borderRadius: 10,
                                                marginTop: 5,
                                                backgroundColor: '#e1e1e1'
                                            }}
                                            resizeMode="cover"
                                        />
                                    </View>
                                )}
                                {userRole === 'admin' && (
                                    <View style={styles.actionsContainer}>
                                        <Text style={styles.actionTitle}>Cambiar Estado (Admin):</Text>
                                        <View style={styles.statusButtonsRow}>
                                            <TouchableOpacity
                                                style={[styles.statusBtn, styles.statusBtnPendiente]}
                                                onPress={() => actualizarEstado('Pendiente')}>
                                                <Text style={[styles.statusBtnText, { color: '#B7950B' }]}>Pendiente</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={[styles.statusBtn, styles.statusBtnProceso]}
                                                onPress={() => actualizarEstado('En Proceso')}>
                                                <Text style={[styles.statusBtnText, { color: '#2E86C1' }]}>En Proceso</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={[styles.statusBtn, styles.statusBtnSolucionado]}
                                                onPress={() => actualizarEstado('Solucionado')}>
                                                <Text style={[styles.statusBtnText, { color: '#1E8449' }]}>Solucionado</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}

                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => setModalVisible(false)}>
                                    <Text style={styles.closeButtonText}>Cerrar</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </Modal>

            {userRole === 'usuario' && (
                <TouchableOpacity style={styles.agregar} onPress={() => props.navigation.navigate('AgregarReporte')}>
                    <Ionicons name="add" size={30} color="white" />
                </TouchableOpacity>
            )}
        </View>
    )
}
