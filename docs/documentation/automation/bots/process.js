const fs = require('fs');
const axios = require('axios');

//  Data type:
//  {
//    key: 'PBUpdateUser',
//    type: 'normal',
//    display: 'Update User',
//    description: 'Update a User',
//    dataType: [ [Object], [Object], [Object], [Object], [Object], [Object] ],
//    nextType: [ [Object] ],
//    resultType: [ [Object], [Object] ]
//  }

const args = process.argv.slice(2);

if (args.length !== 2) {
  console.log(`usage: node process.js ENV AUTH  
ENV: prod | local | dev
AUTH: "Bearer abcde..."  
`);
  process.exit(1);
}

const getEnv = () => {
  switch (args[0]) {
    case 'prod': return 'https://www.cotalker.com';
    case 'local': return 'http://cotalker'; 
    case 'dev': return 'https://dev.cotalker.com';
    default: {
      console.log('Unknown ENV'); 
      process.exit(1)
    }
  }
}

const getBotRawDocumentation = async () => {
  const options = { headers: { Authorization: args[1] } };
  const response = await axios.get(getEnv() + '/api/uservices/parametrizedBots/doc', options);
  return response.data;
}

const generateInputOutputDoc = (bot, inputs, count, isNext) => {
  const name = inputs.display || inputs.key;
  if (name === inputs.key) {
    bot.push(`### ${count}. ${name}`);
  } else {
    bot.push(`### ${count}. ${name} (key: ${inputs.key})`);
  }
  bot.push(`${inputs.description || ''}`);

  if (isNext) {
    // skip required and data-type
  } else {
    bot.push(`Required: ${inputs.required || 'no'}`);
    bot.push(`Data Type: ${inputs.type} ${inputs.subType || ''}`);
  }
}

(async () => {
  const firstLine = "| Stage Type Name (Bot) | Description | Key |"
  const secondLine = "| ---- | ---- | ---- |"
  const doc = await getBotRawDocumentation();
  const bots = {};
  const table = [firstLine, secondLine];

  doc.data.parametrizedBots.sort((a, b) => {
    const name = a.key.localeCompare(b.key);
    if (name !== 0) return name;
    return (b.version || '').localeCompare(a.version || '');
  });

  for (const bot of doc.data.parametrizedBots) {
    // | [Custom Javascript Code](/docs/documentation/automation/bots/ccjs) | Sandboxed JS runner. Returns an object. | _CCJS_ |
    const key = `${bot.key.toLocaleLowerCase()}${bot.version ? '-'+bot.version : '-1.0.0' }`;
    const parensVersion = bot.version ? ` (${bot.version})` : ' (1.0.0)';
   
    table.push(`| [${bot.display}${parensVersion}](/docs/documentation/automation/bots/${key}) | ${bot.description} | _${bot.key}_ |`);
    bots[key] = { text:[], key: bot.key.toLocaleLowerCase() , version: bot.version || '' };
   
    bots[key].text.push(`---`);
    bots[key].text.push(`title: ${bot.display}${bot.version ? '-'+bot.version : '-1.0.0' }`);
    bots[key].text.push(`displayed_sidebar: documentation`);
    bots[key].text.push(`---`);
    
    bots[key].text.push(`**${bot.description}**`);
    bots[key].text.push(`key: ${bot.key}`);

    bots[key].text.push('## Inputs');
    let count = 1;
    for (const input of bot.dataType) {
      generateInputOutputDoc(bots[key].text, input, count, false);
      count += 1;
    }
    count = 1;
    bots[key].text.push('## Next Stages');
    for (const next of bot.nextType) {
      generateInputOutputDoc(bots[key].text, next, count, true);
      count += 1;
    }
    count = 1;
    bots[key].text.push('## Outputs');
    for (const output of bot.resultType) {
      generateInputOutputDoc(bots[key].text, output, count, false);
      count += 1;
    }
  }

  for (const botcode of Object.keys(bots)) {
    const bot = bots[botcode];

    const fileName = `${botcode.toLowerCase()}.md`;
    try {
      await fs.promises.unlink(`${__dirname}/${fileName}`);
    } catch (e) {}
    let manualData = '';
    try {
      await fs.promises.access(`${__dirname}/manual/_${botcode}-manual.mdx`);
      manualData = await fs.promises.readFile(`${__dirname}/manual/_${botcode}-manual.mdx`);
    } catch (e) {

    }
    const first = bots[botcode].text.shift();
    const second = bots[botcode].text.shift();
    const third = bots[botcode].text.shift();
    const fourth = bots[botcode].text.shift();
    const fifth = bots[botcode].text.shift();
    const sixth = bots[botcode].text.shift();

    await fs.promises.writeFile(`${__dirname}/${fileName}`, [first, second, third, fourth, fifth, sixth, manualData, ...bots[botcode].text].join('  \n'), 'utf8');
  }

  await fs.promises.writeFile(`${__dirname}/_table.mdx`, table.join('  \n'), 'utf8');

})();
