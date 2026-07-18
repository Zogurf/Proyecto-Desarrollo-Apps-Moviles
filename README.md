# Proyecto UTPreport

## Objetivo

La aplicación busca centralizar los reportes y mejorar la comunicación sobre el estado de los mismos dentro del campus UTP Lima Norte.

## Descripcion

**UTPreport** es una aplicacion movil desarrollada para registrar y dar seguimiento a reportes de incidencias dentro de la UTP (sede Lima Norte). La app permite que los estudiantes se autentiquen con su correo institucional, consulten el estado de sus reportes y gestionen nuevas incidencias de manera organizada.

## Funcionalidades principales

- **Autenticación**: Registro e inicio de sesión con `Firebase`, validando correos institucionales `@utp.edu.pe`.
- **Persistencia de sesión**: Uso de `AsyncStorage` para guardar el token y el rol del usuario en el dispositivo.
- **Navegación por módulos**: Acceso a las pantallas de Inicio, Notificaciones y Perfil mediante navegación con pestañas.
- **Gestión de reportes**: Suscripción en tiempo real a los reportes almacenados en `Firestore` y renderizado en formato de tarjetas.
- **Filtrado de datos**: Filtros por estado: Todos, Pendientes, En Proceso y Solucionados.
- **Detalle de incidencias**: Visualización de ubicación, categoría, descripción e imagen de evidencia desde un modal.
- **Creación de incidencias**: Pantalla para agregar nuevos reportes con datos de la incidencia y evidencia fotográfica.
- **Cambio de estado**: Actualización del estado de los reportes por parte del usuario administrador.
- **Notificaciones**: Alerta dentro de la app y historial local de notificaciones cuando un reporte cambia de estado.
- **Perfil de usuario**: Visualización de datos básicos de la cuenta y cierre de sesión.

## Flujo de uso

1. El usuario se registra con su correo institucional `@utp.edu.pe`.
2. Luego inicia sesión con sus credenciales y la app guarda su token y rol.
3. Desde Inicio puede ver, filtrar y revisar el detalle de sus reportes.
4. Si su rol es `usuario`, puede crear nuevas incidencias desde el botón flotante.
5. Si su rol es `admin`, puede cambiar el estado de los reportes desde el detalle.
6. Las actualizaciones generan notificaciones y se guardan en el historial local.

## Roles y permisos

- **usuario**: puede consultar reportes y crear nuevas incidencias.
- **admin**: puede consultar reportes y actualizar su estado a Pendiente, En Proceso o Solucionado.

## Notificaciones

- La app muestra una notificación cuando cambia el estado de un reporte asociado al usuario.
- El historial de notificaciones se almacena localmente en `AsyncStorage`.
- La pantalla de Notificaciones permite revisar y limpiar ese historial.

## Permisos requeridos

- Acceso a cámara para tomar evidencia fotográfica al crear un reporte.
- Conexión a internet para autenticar usuarios y sincronizar datos con `Firebase`.
- Permisos para instalar el APK

## Tecnologias usadas

### Frontend
- React Native & Expo
- React Navigation
- Dropdown, FlatList
- Ionicons & MaterialCommunityIcons
- React Hooks: `useState`, `useEffect`
- AsyncStorage: Persistencia de datos locales
- Expo Image Picker: Captura de evidencia fotográfica
- Expo Notifications: Gestión de alertas locales

### Backend
- Firebase Authentication
- Firestore
- Javascript

## Estructura de Carpetas

```cmd
├── src/
│   ├── assets/                # Recursos visuales
│   │   └── logo.png
│   ├── components/            # Componentes reutilizables de la interfaz
│   │   ├── AuthHeader.js
│   │   ├── NotificationBanner.js
│   │   ├── ReporteItem.js
│   │   ├── ScreenHeader.js
│   │   └── Topbar.js
│   ├── config/                # Conexión y configuración de Firebase
│   │   └── Firebase.js        
│   ├── screens/               # Pantallas principales de la aplicación
│   │   ├── AgregarReporte.js
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Notificaciones.js
│   │   ├── Profile.js         
│   │   └── Registro.js
│   ├── services/              # Consumo de APIs
│   │   ├── NotificacionService.js
│   │   └── reportesService.js
│   └── styles/                # Estilos separados para mantener el código limpio
│       ├── components/
│       └── screens/
├── App.js                     # Raíz principal y enrutamiento de la app
```

## Instalacion y Uso

### Ver el codigo fuente y ejecutar desde PC:

**Requisitos**: `Node.js` & `npm`

1.  Clonar proyecto
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

### Descargar el apk para android:
[Click aqui](https://expo.dev/accounts/zogf/projects/Proyecto/builds/c24a6a04-fe12-4ad5-b761-5bd559d412b9)

**Siguiente**
1. Registrar Cuenta (@utp.edu.pe)

2. Logearse con la nueva cuenta

3. Si vas a agregar evidencias fotográficas, concede el permiso de cámara cuando la app lo solicite

4. Disfruta la App

## Autor
Villalta Vitanzo, Angelo Jair 
- Github: [@Zogurf](https://github.com/Zogurf)
