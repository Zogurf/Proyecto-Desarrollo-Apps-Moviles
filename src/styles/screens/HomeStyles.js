import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    body: {
        flex: 1,
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
