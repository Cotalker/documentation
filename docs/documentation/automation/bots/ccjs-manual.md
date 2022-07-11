import useBaseUrl from '@docusaurus/useBaseUrl';

<img alt="title image" className="img_title" src={useBaseUrl('img/design/Main_menu.svg')} />
<br/>

## Overview {#overview}

With the _Custom JavaScript Code_ stage-bot, you can add extra customization to your routines. This powerful tool runs safely in a sandboxed _node.js_ environment with the ability to extract, process, and return data for use in the rest of your routine. The stage-bot can also access the Axios library, allowing it to make network requests.

Simply add your JavaScript code into the **source code** field in the stage-bot's settings panel:

<img alt="ccjs settings panel" className="img_sizing item shadow--tl" src={useBaseUrl('img/automations_routines_stage_ccjs_00.png')} />
<br/>

### Default Variables {#default-variables}

By default, your function can access two variables:

- `value` is an object that contains the [context](/docs/documentation/automation/triggers_and_contexts) data. The _context data_ depends on the [trigger](/docs/documentation/automation/triggers_and_contexts).
- `output` is an array of objects -e.g.,`{ key: 'step-name', result: Object }`- with all the previous executed steps.

:::caution Attention:
- The JavaScript code runs in a sandboxed _node.js_ environment without access to `require`, `Buffer`, or `process.env`.
Therefore no network or IO activity will work. This means that this block is intended to transform data from the `value` and `output` variables, not to store o gather external information.
- Access to the _Axios_ library is available. With the _Axios_ library, the stage-bot can make network requests.
- The code must always return a value. This value can later be used in the following stages as [COTLang](/docs/documentation/automation/admin_cotlang) script, e.g., `$OUTPUT#step-name#data`.
:::

<div className="alert alert--secondary">

### <span className="hero__subtitle">Examples:</span> {#example}
This tool is typically used for –but not limited to– automated data extraction from _collections_ and then returning the results in string format for use in the routine's upcoming stage.

Another example –like the one shown below– takes a _list-input_ value of `email` or `name`, to convert a list of `COTUsers` into a list of `emails` or `names`.

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