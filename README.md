# Proyecto UTPreport

## Objetivo

La aplicación busca centralizar los reportes y mejorar la comunicación sobre el estado de los mismos dentro del campus UTP Lima Norte.

## Descripcion

**UTPreport** es una aplicacion movil desarrollada para registrar y dar seguimiento a reportes de incidencias dentro de la UTP (sede Lima Norte). La app permite que los estudiantes se autentiquen con su correo institucional, consulten el estado de sus reportes y gestionen nuevas incidencias de manera organizada.

## Funcionalidades principales

- **Autenticación**: Registro e inicio de sesión con `Firebase` Authentication (Validación de correo @utp.edu.pe)
- **Gestión de Reportes**: Consumo de API de `Firebase` para obtener y renderizar la lista de incidencias en formato de tarjetas
- **Experiencia de usuarios**: Implementación de indicadores de carga y mensajes de error o estados vacíos al procesar peticiones
- **Persistencia Local**: Uso de `AsyncStorage` para guardar información de la sesión del usuario en el dispositivo
- **Filtrado de datos**: Filtros por estado: Todos, Pendientes, En Proceso y Solucionados
- **Creación de incidencias**: Pantalla para agregar nuevos reportes con datos de la incidencia

## Tecnologias usadas

### Frontend
- React Native & Expo
- React Navigation
- Dropdown, FlatList
- Ionicons & MaterialCommunityIcons
- React Hooks: `useState`, `useEffect`
- AsyncStorage: Persistencia de datos locales

### Backend
- Firebase
- Javascript

## Estructura de Carpetas

```cmd
├── src/
│   ├── assets/                # Recursos visuales
│   │   └── logo.png
│   ├── components/            # Componentes reutilizables de la interfaz
│   │   ├── AuthHeader.js
│   │   ├── ReporteItem.js
│   │   ├── ScreenHeader.js
│   │   └── Topbar.js
│   ├── config/                # Conexión y configuración de Firebase
│   │   └── Firebase.js        
│   ├── screens/               # Pantallas principales de la aplicación
│   │   ├── AgregarReporte.js
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Profile.js         
│   │   └── Registro.js
│   ├── services/              # Consumo de APIs
│   │   └── reportesService.js
│   └── styles/                # Estilos separados para mantener el código limpio
│       ├── components/
│       └── screens/
├── App.js                     # Raíz principal y enrutamiento de la app
```

## Instalacion y Uso

**Requisitos**: `Node.js` & `npm`

1.  Clonar proyecto
```cmd
git clone https://github.com/Zogurf/Proyecto-Desarrollo-Apps-Moviles.git
```
1.  Instalar dependencias
```cmd
npm install
```
1. Ejecutar con Expo
```cmd
npx expo start
```

## Autor
Villalta Vitanzo, Angelo Jair 
- Github: [@Zogurf](https://github.com/Zogurf)
