import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../styles/components/ReporteItemStyles';

const ReporteItem = ({ item }) => {
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

export default ReporteItem;
