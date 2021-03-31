import { Configuration, GroupGetCollection, V2GroupsApi } from "@cotalker/cotalker-api";

const api = new V2GroupsApi(new Configuration({
    basePath: 'https://www.cotalker.com/api',
    accessToken: process.env.ACCESS_TOKEN,
}));


async function getGroups(): Promise<GroupGetCollection | undefined> {
    const response = await api.getV2Groups();
    return response.data?.data;
}

getGroups().then(groups => console.log(groups)).catch(e=>console.log(e))
