import { ChannelGetCollectionChannels, Configuration, V2ChannelsApi } from "@cotalker/cotalker-api";

const api = new V2ChannelsApi(new Configuration({
    basePath: 'https://www.cotalker.com/api',
    accessToken: process.env.ACCESS_TOKEN,
    apiKey: 'true',
}));

// { id: "5fb4324f2d8a0df350d08b85" } is fictional example.
async function getChannel(): Promise<ChannelGetCollectionChannels | undefined> {
    const response = await api.getV2ChannelsId( { id:"619b847aa07ea3000776c220" } );
    return response.data?.data;
}

getChannel().then(channel => console.log(channel)).catch(e=>console.log(e))
