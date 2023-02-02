const SERVER_HOST = process.env.SERVER_HOST
const SERVER_PORT = process.env.PORT
const SERVER_SECRET = process.env.SERVER_SECRET

export const SERVER = {
    hostname: SERVER_HOST,
    port: SERVER_PORT,
    secret_key:SERVER_SECRET
};