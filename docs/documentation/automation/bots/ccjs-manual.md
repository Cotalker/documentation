import useBaseUrl from '@docusaurus/useBaseUrl';

<img alt="title image" className="img_sizing" src={useBaseUrl('img/design/Main_menu.svg')} />
<br/>

## Overview {#overview}

With the _Custom Javascript Code_ stage-bot, you can add extra customization to your routines. This powerful tool runs safely in a sandboxed _node.js_ enviornment with the ability to extract, process, and return data for use in the rest of your routine.

Simply add your Javascript code into the **source code** field in the stage-bot's settings panel:

<img alt="ccjs settings panel" className="img_sizing item shadow--tl" src={useBaseUrl('img/automations_routines_stage_ccjs_00.png')} />
<br/>

### Default Variables {#default-variables}

By default, your function can access two variables:

- **Value** is an object that contains the [context](/docs/documentation/automation/triggers_and_contexts) data, this will depend on the [trigger](/docs/documentation/automation/triggers_and_contexts).
- **Output** is an array of objects `{ key: 'step-name', result: Object }` with all the previous executed steps.

**NOTE**: The code runs in a sandboxed _node.js_ environment. No _requires_ are allowed (or _will_ word) - so no storage or network requests will work.

<div className="alert alert--secondary">

### <span className="hero__subtitle">Examples:</span> {#example}

One common example of how this tool can be used -but not limited to- is automated data extraction from _collections_ and returning the results in string format for use in the routine's upcoming stage.

Another example -shown below- has data taken from multiple stages and then processed to generate data for other steps.

```javascript
const users = output.find(o => o.key === 'user_step').data;
const type = value.answer.data.find(d => d.identifier === 'survey_identifier').result;

switch (type) {
  case 'email': return users.map(u => u.email);
  case 'name': return users.map(u => `${u.name.names} ${u.name.lastName || ''}`);
  default throw new Error('Unknown type');
}
```

</div>
<br/>

-----------