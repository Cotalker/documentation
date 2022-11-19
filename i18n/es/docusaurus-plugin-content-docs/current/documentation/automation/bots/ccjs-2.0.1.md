---  
title: Custom Javascript Code-2.0.1  
displayed_sidebar: documentation  
---  
import useBaseUrl from '@docusaurus/useBaseUrl';

## Overview {#overview}

With the _Custom JavaScript Code_ stage-bot, you can add extra customization to your [routines](/docs/documentation/automation/admin_routine). This powerful tool runs safely in a sandboxed _node.js_ environment with the ability to extract, process, and return data for use in the rest of your routine. 

Simply add your JavaScript code into the **source code** field in the stage-bot's settings panel:

<img alt="ccjs settings panel" className="img_sizing_small item shadow--tl" src={useBaseUrl('img/automations_routines_stage_ccjs_00.png')} />
<br/>

:::info Accepted Libraries

_The stage-bot can access the following libraries:_
- [**axios**](https://axios-http.com/): Use Axios 0.27.2 and above to make HTTP requests.
- [**date-fns**](https://date-fns.org/): Use date-fns 2.28.0 and above for manipulating Javascript dates.
- [**form-data**](https://www.npmjs.com/package/form-data): A library to create readable "multipart/form-data" streams. Can be used to submit forms and file uploads to other web applications.
- [**qs**](https://www.npmjs.com/package/qs): A query string parsing and stringifying library with some added security.
- [**querystring**](https://nodejs.org/api/querystring.html): Provides utilities for parsing and formatting URL query strings.

:::

:::note Asynchronicity
- Asynchronous code is supported, `await` can be used.
:::

:::note Legacy Versions
- Code can still be wrapped in backticks (but it is not required): ` ``` `. Just remember to use the backslash before a backtick in case they are used within the code: ``` \` ```
- Versions prior to 2.0.1 cannot handle asynchronous code.
:::

:::caution Attention
All functions have a 30-second timeout limit.
:::

:::tip
- See the [Embedded Code Editor](/docs/documentation/automation/code_editor) section for more information on how to use the editor. Running test directly from the code editor is not available.
- To test your code, you must use the Routine Builder's _Run Routine_ option.
:::

### Default Variables {#default-variables}
By default, your function can access the followigng variables:

variable | description | syntax
--- | --- | ---
**input** | An object that contains the [context](/docs/documentation/automation/cotlang/triggers_and_contexts) data. The _context data_ depends on the [trigger](/docs/documentation/automation/cotlang/triggers_and_contexts). | Context sturctures depend on the respective [Data Model](/docs/documentation/models/overview_model).
**output** | An array of objects with all the returned results of previously executed steps in the routine. | `[{ key: 'step-name', result: Object }]`
**data** | Provides access to data inserted within the _Optional Inputs_ field. | Follows JSON format. COTLang can be used within values.
**env** | Used as URL for network requests within the Cotalker environment. | `env.EXTERNAL_API_URL`, `env.EXTERNAL_APP_URL`

### Return Statements {#return}
- The code **must** always return an object. 
- The returned object can later be used on the following routine stages and accessed using [COTLang](/docs/documentation/automation/cotlang/admin_cotlang) script, e.g., `$OUTPUT#step-name#data`.

### Network Requets {#network-requests}
- The JavaScript code runs in a sandboxed _node.js_ environment without access to `require`, `Buffer`, or `process.env`. Therefore, network or IO activity will not work directly. This code block is intended to transform data from the `input` and `output` variables, not to store or gather external information.
- Nonetheless, access to the _Axios_ library is available. With the _Axios_ library, the stage-bot can make network requests. See below for a code sample.
- An authentication token can be automatically included for Coltalker API requests. [See below for details](#auth).

### Optional Inputs {#optional}
Use _optional inputs_ to include data not found in the _source code_, _context_, or available through a network request. [Input types](#types) are described below.

_To add optional inputs:_

<img alt="ccjs settings panel" className="img_sizing_small item shadow--tl" src={useBaseUrl('img/automations_routines_stage_ccjs_01.png')} />
<br/>

<div className="margin margin-left--lg">

1. Press the **Add Optional Inputs** button.
2. The _New input_ field appears. Choose an [input type](#types) from the list.
3. Once the input is chosen, press the **Add Input** button.

:::note
Repeat the steps to add another input type.
:::

<div className="alert alert--secondary">

#### <span className="hero__subtitle">Optional Input Types</span> {#types}

_Optional Input types_ are described below:

#### - Use Default Cotalker Auth {#auth}
For safety reasons, it is best not to include authentication tokens in your _source code_. To let Cotalker automatically provide the bot's authentication token to make Cotalker API requests, turn on the option once the _Use Default Cotalker Auth_ input type has been selected.

<img alt="ccjs settings panel" className="img_sizing item shadow--tl" src={useBaseUrl('img/automations_routines_stage_ccjs_02.png')} />
<br/>

#### - Data Object {#data}
Add a JSON object to include extra data the _source code_ can fetch. _COTLang_ expressions can also be used as values to contextualize data gathering.

<img alt="ccjs settings panel" className="img_sizing item shadow--tl" src={useBaseUrl('img/automations_routines_stage_ccjs_03.png')} />
<br/>

</div>
<br/>

</div>

### Code Samples {#example}

#### - Payload Sample {#payload}
```javascript
data: {
  input: {
    one: '1',
  },
  output: [{ a: 'A', b: 'B' }],
  code: `
    console.log('input', input);
    console.log('dateFns', dateFns.format(new Date(), 'yyyy-MM-dd'));
    await axios.get('http://webcode.me').then(resp => {
      console.log('axios response', resp.data);
    });
    return event;
  `
},
```

#### - Data Extraction Sample {#extract}
This tool is typically used for –but not limited to– automated data extraction from data sources, like _collections_, and then returning the results in string format for use in the routine's upcoming stage.

Below is a code sample that takes a _list-input_ value of `email` or `name` to convert a list of `COTUsers` into a list of `emails` or `names`.

```javascript
const users = output.find(o => o.key === 'user_step').data;
const type = input.answer.data.find(d => d.identifier === 'survey_identifier').result;

switch (type) {
  case 'email': return users.map(u => u.email);
  case 'name': return users.map(u => `${u.name.names} ${u.name.lastName || ''}`);
  default throw new Error('Unknown type');
}
```

#### - cURL Network Request Sample {#sample-curl}
```bash
curl -X "POST" "https://server.com/" \
-H 'Content-Type: application/json; charset=utf-8' \
-d $'{ "code": "return await axios.get(\'http://webcode.me\').then(resp => { return resp.data;});"}'
```

#### - Javascript Network Request Sample {#javascript-request}
This network request obtains the current user's data. The _Use Default Cotalker Auth_ option must be used for this script to work.
```javascript
const response = await axios({
    url: env.EXTERNAL_API_URL + '/api/users/me',
    method: 'get'
});

return {
    me: response.data
};
```

#### - dateFns Sample {#datefns}
This _dateFns_ sample returns the current day of the week and two current time values separated by 5 seconds. 
```javascript
const nameOfDay = dateFns.format(new Date(), "'Today is a' eeee");

// Wait 'n' seconds sync
const waitSeconds = (n) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, n * 1000);
    });
};
const start = new Date();
await waitSeconds(5);
const end = new Date();

return {
    today: nameOfDay,
    wait: {
        start,
        end
    }
};
```


-----------  
**FAAS JS runner.**  
key: CCJS  
## Inputs  
### 1. Use Default Cotalker Auth (key: useDefaultCotalkerAuth)  
This will add a contextual authentication token to the requests made to Cotalker API in Source Code  
Required: no  
Data Type: boolean   
### 2. Data (key: data)  
Data to use in Source Code  
Required: no  
Data Type: object   
### 3. Source Code (key: src)  
Must return an Object. e.g., return { hello: 'world' };. Variables 'input', 'output', 'data' and 'env' can be read.  
Required: true  
Data Type: code javascript  
## Next Stages  
### 1. SUCCESS  
  
### 2. ERROR  
  
## Outputs  
### 1. error  
Error message.  
Required: no  
Data Type: string   
### 2. data  
Returned value.  
Required: no  
Data Type: any 
