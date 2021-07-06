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
ENV: prod | local  
AUTH: "Authorization: Bearer abcde..."  
`);
  process.exit(1);
}

const getEnv = () => {
  switch (args[0]) {
    case 'prod': return 'https://www.cotalker.com';
    case 'local': return 'http://cotalker'; 
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
  const doc = await getBotRawDocumentation();
  const bots = {};
  const table = [];

  doc.data.parametrizedBots.sort((a, b) => a.key.localeCompare(b.key));

  for (const bot of doc.data.parametrizedBots) {
    // | [Custom Javascript Code](/docs/documentation/automation/bots/ccjs) | Sandboxed JS runner. Returns an object. | _CCJS_ |
    const key = `${bot.key.toLocaleLowerCase()}${bot.version ? '-'+bot.version : '' }`;
    const parensVersion = bot.version ? ` (${bot.version})` : '';
   
    table.push(`| [${bot.display}${parensVersion}](/docs/documentation/automation/bots/${key}) | ${bot.description} | _${bot.key}_ |`);
    bots[key] = { text:[], key: bot.key.toLocaleLowerCase() , version: bot.version || '' };
   
    bots[key].text.push(`# ${bot.display}`);
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
      await fs.promises.access(`${__dirname}/${bot.key.toLowerCase()}-manual.md`);
      manualData = await fs.promises.readFile(`${__dirname}/${bot.key.toLowerCase()}-manual.md`);
    } catch (e) {

    }
    const first = bots[botcode].text.shift();
    await fs.promises.writeFile(`${__dirname}/${fileName}`, [first, manualData, ...bots[botcode].text].join('  \n'), 'utf8');
  }

  await fs.promises.writeFile(`${__dirname}/table.md`, table.join('  \n'), 'utf8');

})();
