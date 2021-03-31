import { Configuration, COTUser, V2UsersApi } from "@cotalker/cotalker-api";

const api = new V2UsersApi(new Configuration({
    basePath: 'https://www.cotalker.com/api',
    accessToken: process.env.ACCESS_TOKEN,
}));


async function getMe(): Promise<COTUser | undefined> {
    const response = await api.getV2UsersMe();
    return response.data?.data;
}

getMe().then(user => console.log(user)).catch(e=>console.log(e))

