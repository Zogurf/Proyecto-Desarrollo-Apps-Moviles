import { Text, View, Image, TextInput, Alert, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import TopBar from '../components/Topbar';
import ScreenHeader from '../components/ScreenHeader';
import { styles } from '../styles/screens/AgregarReporteStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { reportesService } from '../services/reportesService';

export default function AgregarReporte(props) {
    const [titulo, setTitulo] = useState('');
    const [torre, setTorre] = useState(null);
    const [ambiente, setAmbiente] = useState('');
    const [piso, setPiso] = useState(null);
    const [descripcion, setDescripcion] = useState('');
    const [errores, setErrores] = useState({});

    const torres = [
        { label: 'Torre A', value: 'A' },
        { label: 'Torre B', value: 'B' }
    ];

    const pisos = Array.from({ length: 15 }, (_, i) => {
        const num = (i + 1).toString().padStart(2, '0');
        return { label: num, value: num };
    });

    const categoria = [
        { label: 'Infraestructura', value: 'infraestructura' },
        { label: 'Equipos', value: 'equipos' },
        { label: 'Servicios', value: 'servicios' }
    ];
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

    const guardarReporte = async () => {
        const nuevosErrores = {};
        if (!titulo.trim()) nuevosErrores.titulo = "El título es obligatorio";
        if (!torre) nuevosErrores.torre = "La torre es obligatoria";
        if (!piso) nuevosErrores.piso = "El piso es obligatorio";
        if (!ambiente.trim()) nuevosErrores.ambiente = "El ambiente es obligatorio";
        if (!categoriaSeleccionada) nuevosErrores.categoria = "Seleccione una categoría";
        if (!descripcion.trim()) nuevosErrores.descripcion = "La descripción es obligatoria";

        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return;
        }

        try {
            const userId = await AsyncStorage.getItem('userToken');

            await reportesService.crearReporte({
                titulo,
                torre,
                piso,
                ambiente,
                categoria: categoriaSeleccionada,
                descripcion
            }, userId);

            Alert.alert("Exito", "Reporte creado correctamente");
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
                <TextInput style={[styles.input, errores.titulo && styles.inputError]} placeholder="Ej: Proyector no enciende" onChangeText={(text) => { setTitulo(text); setErrores({ ...errores, titulo: null }); }} value={titulo} />
                {errores.titulo && <Text style={styles.errorText}>{errores.titulo}</Text>}

                <Text style={styles.label}>Torre</Text>
                <Dropdown
                    placeholder="Seleccione la torre"
                    style={[styles.dropdown, errores.torre && styles.inputError]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    labelField="label"
                    valueField="value"
                    data={torres}
                    value={torre}
                    onChange={item => { setTorre(item.value); setErrores({ ...errores, torre: null }); }}
                />
                {errores.torre && <Text style={styles.errorText}>{errores.torre}</Text>}

                <Text style={styles.label}>Piso</Text>
                <Dropdown
                    placeholder="Seleccione el piso"
                    style={[styles.dropdown, errores.piso && styles.inputError]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    labelField="label"
                    valueField="value"
                    data={pisos}
                    value={piso}
                    maxHeight={250}
                    onChange={item => { setPiso(item.value); setErrores({ ...errores, piso: null }); }}
                />
                {errores.piso && <Text style={styles.errorText}>{errores.piso}</Text>}

                <Text style={styles.label}>Ambiente</Text>
                <TextInput style={[styles.input, errores.ambiente && styles.inputError]} placeholder="Ingresa el ambiente" onChangeText={(text) => { setAmbiente(text); setErrores({ ...errores, ambiente: null }); }} value={ambiente} />
                {errores.ambiente && <Text style={styles.errorText}>{errores.ambiente}</Text>}

                <Text style={styles.label}>Categoría</Text>
                <Dropdown placeholder="Ingrese la categoría" style={[styles.dropdown, errores.categoria && styles.inputError]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    labelField="label"
                    valueField="value"
                    data={categoria} value={categoriaSeleccionada} onChange={item => { setCategoriaSeleccionada(item.value); setErrores({ ...errores, categoria: null }); }}></Dropdown>
                {errores.categoria && <Text style={styles.errorText}>{errores.categoria}</Text>}

                <Text style={styles.label}>Descripción</Text>
                <TextInput style={[styles.input, errores.descripcion && styles.inputError]} placeholder="Describe la incidencia" onChangeText={(text) => { setDescripcion(text); setErrores({ ...errores, descripcion: null }); }} value={descripcion} />
                {errores.descripcion && <Text style={styles.errorText}>{errores.descripcion}</Text>}

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
