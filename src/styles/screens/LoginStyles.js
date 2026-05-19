import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    body: {
        flex: 1
    },
    contenedor: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '90%',
        backgroundColor: '#ffffff',
        marginTop: 50,
        borderRadius: 50,
        paddingBottom: 20,
        paddingTop: 20
    },
    titulo: {
        fontSize: 30,
        marginVertical: 20
    },
    input: {
        backgroundColor: '#edf2fc',
        width: '80%',
        borderWidth: 2,
        borderColor: 'rgb(167, 167, 167)',
        borderRadius: 50,
        marginBottom: 20,
        padding: 10
    },
    boton: {
        backgroundColor: '#C8102E',
        width: '30%',
        padding: 10,
        borderRadius: 50,
        alignItems: 'center'
    },
    botonText: {
        color: '#ffffff',
        fontSize: 20
    },
    botonRegistro: {
        marginTop: 20,
    },
    registroText: {
        color: '#C8102E'
    }
});
