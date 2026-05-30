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
    },

    // modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        width: '90%',
        borderRadius: 15,
        padding: 20,
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    modalLabel: {
        fontWeight: 'bold',
        marginTop: 10,
        color: '#666',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    modalDesc: {
        fontSize: 15,
        color: '#444',
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 8,
        marginTop: 5,
        marginBottom: 15,
    },
    // Editar estado
    actionsContainer: {
        marginTop: 20,
    },
    actionTitle: {
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    statusButtonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    statusBtn: {
        flex: 1,
        padding: 10,
        borderRadius: 8,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    statusBtnPendiente: { backgroundColor: '#Fef9E7' },
    statusBtnProceso: { backgroundColor: '#EAF2F8' },
    statusBtnSolucionado: { backgroundColor: '#E9F7EF' },
    statusBtnText: {
        fontWeight: 'bold',
        fontSize: 12,
    },
    closeButton: {
        backgroundColor: '#333',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    }
});
