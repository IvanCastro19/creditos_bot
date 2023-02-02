# SERVICIO BOT CRÉDITOS
###### tags: `readme` `bot`
#### Ruta: /bot
#### Entrada: Petición de servicio de caché
#### Salida: Petición a 360 por cada respuesta al usuario
#### Flujo:

1. Analisa mensaje que recibe de servicio caché.
2. Se analisa el body de la petición, se obtiene el mensaje y el wa_id
(wa_id: IDENTIFICADOR DE WHATSAPP DEL CLIENTE QUE ENVÍO EL MENSAJE A NUESTRO BOT).
3. Se analiza el wa_id y se envía al servicio de CLIENTE:
4. Se espera respuesta de servicio cliente con objeto tipo cliente.
5. Se envía id de agente al servicio AGENTE.
6. Se espera respuesta del servicio agente con objeto tipo agente.
7. Una vez obtenida información de cliente y agente se evalua el mensaje y se agregan a arreglo de respuestas.
8. Se hace una petición a la api de 360 por cada mensaje.
9. Se guarda el mensaje de cliente y la respuesta en la base de datos.

```sequence
Tracker->Bot: {wa_id: "5214991036055", msg: "Hola"}
Note right of Bot: Bot analiza
Bot->Clientes: {wa_id: "5214991036055"}
Note left of Clientes: Cliente verifica si existe o no
Clientes->Bot: {customer: {...data}, agent: {...data} }
Note right of Bot: Bot construye arreglo de mensajes
Bot->MongoDb: Guarda mensaje de cliente y las respuestas en la DB
Bot->Api360: Por cada respuesta bot envía una petición a 360
Api360->Customer: 360 Envía respuestas al whatsapp del cliente
```

# INSTALACIÓN

Colócate en la raíz del proyecto y ejecuta el comando:
```
npm install
```

Agrega el archivo .env a la raíz del proyecto con las variables de entorno

Para correr el proyecto en local ejecuta el comando:
```
npm run dev
```

# DOCKER 

Colócate en la raíz del proyecto y ejecuta el comando para compilar: 
```
docker-compose build
```
Para levantar el proyecto en docker ejecuta:
```
docker-compose up
```

# SH

Para compilar el proyecto ejecuta:
```
sh compile.sh
```
Para ejecutar el proyecto ejecuta:
```
sh run.sh
```