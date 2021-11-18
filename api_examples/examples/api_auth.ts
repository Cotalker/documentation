//NOT WORKING

import { ConfigurationParameters, CotalkerApi, Configuration } from "@cotalker/cotalker-api";

const config: ConfigurationParameters = {
    // TODO MISSING KEYS
    basePath: 'https://www.cotalker.com/api',
};

const api = new CotalkerApi(new Configuration(config));

(async () => {
    const email = 'jane@company.com';
    const password = '1234';
    const response = await api.login(email, password);
    console.log(response);
})();