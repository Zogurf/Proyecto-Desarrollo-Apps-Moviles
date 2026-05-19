import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
});
