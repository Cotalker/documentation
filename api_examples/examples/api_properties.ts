import { PropertyGetCollection, Configuration, V2PropertiesApi} from "@cotalker/cotalker-api";

const api = new V2PropertiesApi(new Configuration({
    basePath: 'https://www.cotalker.com/api',
    accessToken: process.env.ACCESS_TOKEN,
    apiKey: 'true',
}));

async function getProperties(): Promise<PropertyGetCollection | undefined> {
    const response = await api.getV2Properties();
    return response.data?.data;
}

getProperties().then(properties => console.log(properties)).catch(e=>console.log(e))