import { Text, View, Image, TextInput, Alert, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import TopBar from '../components/Topbar';
import ScreenHeader from '../components/ScreenHeader';
import { styles } from '../styles/screens/AgregarReporteStyles';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/Firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AgregarReporte(props) {
    const [titulo, setTitulo] = useState('');
    const [torre, setTorre] = useState('');
    const [ambiente, setAmbiente] = useState('');
    const [piso, setPiso] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const categoria = [
        { label: 'Infraestructura', value: 'infraestructura' },
        { label: 'Equipos', value: 'equipos' },
        { label: 'Servicios', value: 'servicios' }
    ];
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

    const guardarReporte = async () => {
        if (!titulo || !torre || !piso || !ambiente || !categoriaSeleccionada || !descripcion) {
            Alert.alert("Campos incompletos", "Por favor, completa todos los campos del formulario.");
            return;
        }

        try {
            const userId = await AsyncStorage.getItem('userToken');

            const reportesRef = collection(db, 'reportes');
            await addDoc(reportesRef, {
                titulo: titulo,
                torre: torre,
                piso: piso,
                ambiente: ambiente,
                categoria: categoriaSeleccionada,
                descripcion: descripcion,
                status: 'Pendiente',
                usuarioId: userId,
                fecha: serverTimestamp()
            });

            Alert.alert("Éxito", "Reporte creado correctamente");
            props.navigation.navigate('Home');

        } catch (error) {
            console.error("Error al guardar el reporte: ", error);
            Alert.alert("Error", "No se pudo guardar el reporte.");
        }
    }

    return (
        <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 40 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
        >
            <TopBar />

            <ScreenHeader titulo="Agregar Reporte" subTitulo="Registra una nueva incidencia en tu ambiente" />

            <View style={styles.formulario}>
                <Text style={styles.label}>Título de la incidencia</Text>
                <TextInput style={styles.input} placeholder="Ej. Proyector no enciende" onChangeText={setTitulo} value={titulo} />

                <Text style={styles.label}>Torre</Text>
                <TextInput style={styles.input} placeholder="Ingrese tu Torre" onChangeText={setTorre} value={torre} />

                <Text style={styles.label}>Piso</Text>
                <TextInput style={styles.input} placeholder="Ingrese el piso" onChangeText={setPiso} value={piso} />

                <Text style={styles.label}>Ambiente</Text>
                <TextInput style={styles.input} placeholder="Ingresa el ambiente" onChangeText={setAmbiente} value={ambiente} />

                <Text style={styles.label}>Categoria</Text>
                <Dropdown placeholder="Ingrese la categoria" style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    labelField="label"
                    valueField="value"
                    data={categoria} value={categoriaSeleccionada} onChange={item => { setCategoriaSeleccionada(item.value) }}></Dropdown>

                <Text style={styles.label}>Descripción</Text>
                <TextInput style={styles.input} placeholder="Describe la incidencia" onChangeText={setDescripcion} value={descripcion} />

                <Text style={styles.label}>Agrega una imagen (si es necesario) </Text>
                <TextInput style={styles.input} placeholder="png, jpg, camara" readOnly />

                <Pressable onPress={guardarReporte} style={({ pressed }) => [styles.boton, {
                    transform: [{ scale: pressed ? 0.85 : 1 }],
                    opacity: pressed ? 0.5 : 1
                }]}>

                    <Text style={styles.botonText}>Agregar Reporte</Text>
                </Pressable>

            </View>
        </ScrollView>
    )
}
