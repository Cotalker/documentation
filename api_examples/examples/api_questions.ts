import { QuestionGetCollection, Configuration, V2QuestionsApi} from "@cotalker/cotalker-api";

const api = new V2QuestionsApi(new Configuration({
    basePath: 'https://www.cotalker.com/api',
    accessToken: process.env.ACCESS_TOKEN,
    apiKey: 'true',
}));

async function getQuestions(): Promise<QuestionGetCollection | undefined> {
    const response = await api.getV2Questions();
    return response.data?.data;
}

getQuestions().then(questions => console.log(questions)).catch(e=>console.log(e))