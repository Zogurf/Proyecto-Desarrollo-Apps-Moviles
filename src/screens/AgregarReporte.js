import { Text, View, Image, TextInput, Alert, Pressable, ScrollView  } from 'react-native'
import React, { useState } from 'react'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import TopBar from '../components/Topbar';
import ScreenHeader from '../components/ScreenHeader';
import { styles } from '../styles/screens/AgregarReporteStyles';

export default function AgregarReporte(props) {
    const [ambiente, setAmbiente] = useState('');
    const [piso, setPiso] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const categoria = [
        { label: 'Infraestructura', value: 'infraestructura' },
        { label: 'Equipos', value: 'equipos' },
        { label: 'Servicios', value: 'servicios' }
    ];
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

    return (
        <ScrollView contentContainerStyle={styles.body}>
            <TopBar />

            <ScreenHeader titulo="Agregar Reporte" subTitulo="Registra una nueva incidencia en tu ambiente" />

            <View style={styles.formulario}>
                <Text style={styles.label}>Torre</Text>
                <TextInput style={styles.input} placeholder="Ingrese tu Torre" />

                <Text style={styles.label}>Piso</Text>
                <TextInput style={styles.input} placeholder="Ingrese el piso" />

                <Text style={styles.label}>Ambiente</Text>
                <TextInput style={styles.input} placeholder="Ingresa el ambiente" />

                <Text style={styles.label}>Categoria</Text>
                <Dropdown placeholder="Ingrese la categoria" style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    labelField="label"
                    valueField="value"
                    data={categoria} value={categoriaSeleccionada} onChange={item => { setCategoriaSeleccionada(item.value) }}></Dropdown>

                <Text style={styles.label}>Descripción</Text>
                <TextInput style={styles.input} placeholder="Describe la incidencia" />

                <Text style={styles.label}>Agrega una imagen (si es necesario) </Text>
                <TextInput style={styles.input} placeholder="png, jpg, camara" readOnly />

                <Pressable onPress={() => props.navigation.navigate('Home')} style={({ pressed }) => [styles.boton, {
                    transform: [{ scale: pressed ? 0.85 : 1 }],
                    opacity: pressed ? 0.5 : 1
                }]}>

                    <Text style={styles.botonText}>Agregar Reporte</Text>
                </Pressable>

            </View>
        </ScrollView>
    )
}

