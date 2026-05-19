import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    body: {
        paddingBottom: 30,
    },
    // formulario
    formulario: {
        alignSelf: 'center',
        width: '90%',
        backgroundColor: '#ffffff',
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        marginLeft: 20,
    },
    input: {
        backgroundColor: '#edf2fc',
        width: '95%',
        borderWidth: 2,
        borderColor: 'rgb(167, 167, 167)',
        borderRadius: 50,
        marginBottom: 25,
        padding: 10,
    },
    boton: {
        backgroundColor: '#C8102E',
        width: '75%',
        padding: 10,
        borderRadius: 50,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20
    },
    botonText: {
        color: '#ffffff',
        fontSize: 20
    },
    // dropdown 
    placeholderStyle: {
        backgroundColor: '#edf2fc',
        borderWidth: 2,
        borderColor: 'rgb(167, 167, 167)',
        borderRadius: 50,
        marginBottom: 25,
        padding: 10,
    },
    selectedTextStyle: {
        backgroundColor: '#edf2fc',
        borderWidth: 2,
        borderColor: 'rgb(167, 167, 167)',
        padding: 10,
        borderRadius: 50,
        marginBottom: 20,
    }
});
