import { SurveyChatGetCollection, Configuration, V2SurveychatsApi} from "@cotalker/cotalker-api";

const api = new V2SurveychatsApi(new Configuration({
    basePath: 'https://www.cotalker.com/api',
    accessToken: process.env.ACCESS_TOKEN,
    apiKey: 'true',
}));

async function getSurveyChats(): Promise<SurveyChatGetCollection | undefined> {
    const response = await api.getV2Surveychats();
    return response.data?.data;
}

getSurveyChats().then(surveyChats => console.log(surveyChats)).catch(e=>console.log(e))