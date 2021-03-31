import { PropertyTypeGetCollection, Configuration, V2PropertyTypesApi} from "@cotalker/cotalker-api";

const api = new V2PropertyTypesApi(new Configuration({
    basePath: 'https://www.cotalker.com/api',
    accessToken: process.env.ACCESS_TOKEN,
    apiKey: 'true',
}));

async function getPropertyTypes(): Promise<PropertyTypeGetCollection | undefined> {
    const response = await api.getV2PropertyTypes();
    return response.data?.data;
}

getPropertyTypes().then(propertyTypes => console.log(propertyTypes)).catch(e=>console.log(e))