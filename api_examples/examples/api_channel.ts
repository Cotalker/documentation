import { ChannelGetCollection, Configuration, V2ChannelsApi} from "@cotalker/cotalker-api";

const api = new V2ChannelsApi(new Configuration({
    basePath: 'https://www.cotalker.com/api',
    accessToken: process.env.ACCESS_TOKEN,
    apiKey: 'true',
}));

async function getChannels(): Promise<ChannelGetCollection | undefined> {
    const response = await api.getV2Channels();
    return response.data?.data;
}

getChannels().then(channels => console.log(channels)).catch(e=>console.log(e))
