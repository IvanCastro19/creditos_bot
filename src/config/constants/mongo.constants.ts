const MONGO_DB = process.env.MONGO_DB;
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const AUX = process.env.AUX;

export const MONGO_OPTIONS = {
    useUnifiedtopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    maxPoolSize: 50,
    autoIndex: false,
    retrywrites: false,
    dbName: MONGO_DB
};

export const MONGO = {
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    options: MONGO_OPTIONS,
    url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_DB}.${AUX}.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
};