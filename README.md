# Oxygen App

Prueba técnica para oxygen
[Sitio de prueba](https://oxygen-app-julian.netlify.app/ "Sitio de prueba")

![](https://i.imgur.com/erycxvF.png)

## Funcionalidad

La aplicación te ofrece una conversión instantánea de unidades al escribir en el input de unidades (raya de la derecha), también se corrige automáticamente al cambiar la unidad (al darle a las flechas para alternar, o al seleccionar nuevas unidades). El botón del corazón te permite guardar las conversiones y la pequeña cruz en cada conversión guardada te permite borrarlas.

A su vez, la información se obtiene de una base de datos, y si no esta disponible, se guarda en tu navegador para visitas posteriores.

## Cómo desplegar

El backend utiliza MongoDB, por lo que es necesario preparar una base de datos en MongoDB con una colección llamada "unidades", y en el lado del servidor, añadir como variable de entorno la variable "MONGODB_URI" con el link de conexión a tu base de datos.

## Retos

Dado que se me propuso que la información se almacenara por medio de localStorage en el navegador, y si lo era capaz que lo quitara para obtener la información de una base de datos por medio de una API, decidí hacer un híbrido para plantear como haría ambas opciones, por lo cual lo he diseñado de forma que, si el servidor es accesible, obtenga los datos del servidor, y si no esta accesible los guarde en tu navegador.