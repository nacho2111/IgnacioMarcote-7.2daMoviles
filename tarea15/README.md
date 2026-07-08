# AppListaProductos

Práctica 15 – Despliegue y Testing.

## Probar la app

```
npm install
npx expo start
```

Escaneá el QR con Expo Go (Android/iOS) para probarla en un dispositivo real.

## Generar una build

```
npx expo login
eas build -p android --profile preview
```

## Antes de publicar

- Revisar que no queden `console.log` de prueba.
- Probar todas las rutas de navegación.
- Verificar la conexión a la API en red móvil.
- Cambiar `name`, `slug` e ícono en `app.json` (ya actualizados).
