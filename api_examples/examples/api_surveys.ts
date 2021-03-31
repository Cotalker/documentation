import { SurveyGetCollection, Configuration, V2SurveysApi} from "@cotalker/cotalker-api";

const api = new V2SurveysApi(new Configuration({
    basePath: 'https://www.cotalker.com/api',
    accessToken: process.env.ACCESS_TOKEN,
    apiKey: 'true',
}));

async function getSurveys(): Promise<SurveyGetCollection | undefined> {
    const response = await api.getV2Surveys();
    return response.data?.data;
}

getSurveys().then(surveys => console.log(surveys)).catch(e=>console.log(e))