// search done using `/user` request parameters
// available parameters and their formats are found in: api_examples/node_modules/@cotalker/cotalker-api/dist/apis/v2-users-api.d.ts

import { Configuration, UserGetCollectionUsers, V2UsersApi } from "@cotalker/cotalker-api";

const api = new V2UsersApi(new Configuration({
    basePath: 'https://www.cotalker.com/api',
    accessToken: process.env.ACCESS_TOKEN,
    apiKey: 'true',
}));
    

async function getUsersByEmail(): Promise<UserGetCollectionUsers[] | undefined> {
    const response = await api.getV2Users({ email: ["nick@wuxi.com", "yanxiang@wuxi.com"] });
    return response.data?.data?.users;
}

getUsersByEmail().then(users => console.log(users)).catch(e=>console.log(e))

