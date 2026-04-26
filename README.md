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
- React Navigation
- Dropdown
- FlatList
- Ionicons
- MaterialCommunityIcons

### Backend
- Firebase
- Javascript

## Instalacion y Uso
1.  Instalar dependencias
```cmd
git clone https://github.com/Zogurf/Proyecto-Desarrollo-Apps-Moviles.git
```
2.  Instalar dependencias
```cmd
npm install
```
3. Ejecutar con Expo
```cmd
npx expo start
```

## Estructura de Carpetas

```cmd
├── src/
│   ├── assets/                # Recursos visuales
│   │   └── logo.png
│   ├── data/                  # Datos y reportes
│   │   └── reportes.js
│   └── screens/               # Pantallas de la aplicación
│       ├── AgregarReporte.js
│       ├── Home.js
│       ├── Login.js
│       └── Registro.js
├── App.js                     # Raíz principal de la app
├── app.json                   # Configuración del proyecto
└── credenciales.js            # Conexion con Firebase
```

## Autor

Jair Villalta 
- Github: [@Zogurf](https://github.com/Zogurf)
