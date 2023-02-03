const API_URL = process.env.DIALOG_API_URL;
const API_KEY = process.env.DIALOG_API_KEY;
const NAME_SPACE = process.env.DIALOG_NAMESPACE || "";

export const API_360 = {
    KEY: API_KEY,
    URL: API_URL,
    NAMESPACE: NAME_SPACE,
};