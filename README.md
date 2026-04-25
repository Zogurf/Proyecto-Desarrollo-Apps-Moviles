# Proyecto UTPreport

## Descripcion

**UTPreport** es una aplicacion movil desarrollada para registrar y dar seguimiento a incidencias dentro de la UTP (sede Lima Norte). La app permite que los estudiantes se autentiquen con su correo institucional, consulten el estado de sus reportes y gestionen nuevas incidencias de manera organizada.

## Funcionalidades principales

- Registro e inicio de sesion con Firebase Authentication.
- Validacion de correo institucional (@utp.edu.pe) en el registro.
- Visualizacion de reportes en formato de tarjetas.
- Filtros por estado: Todos, Pendientes, En Proceso y Solucionados.
- Pantalla para agregar nuevos reportes con datos del ambiente, categoria y descripcion.

## Tecnologias usadas

### Frontend
- React Native
- Expo
- Componentes React Navigation
- Componentes Dropdown

### Backend
- Firebase

## Instalacion y Uso

1.  Instalar dependencias
```cmd
npm install
```
2. Ejecutar con Expo
```cmd
npx expo start
```

## Estructura de Carpetas

```cmd
├── src/
│   ├── assets/          # Imagenes
│   ├── screens/         # Pantallas de la app
│   ├── data/            # Modelos de datos
├── App.js               # Raiz del proyecto
```

## Autor

Jair Villalta 
- Github: [@Zogurf](https://github.com/Zogurf)
