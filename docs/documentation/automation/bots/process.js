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
    table.push(`| [${bot.display}](/docs/documentation/automation/bots/${bot.key.toLocaleLowerCase()}) | ${bot.description} | _${bot.key}_ |`);

    bots[bot.key] = [];
   
    bots[bot.key].push(`# ${bot.display}`);
    bots[bot.key].push(`**${bot.description}**`);
    bots[bot.key].push(`key: ${bot.key}`);

    bots[bot.key].push('## Inputs');
    let count = 1;
    for (const input of bot.dataType) {
      generateInputOutputDoc(bots[bot.key], input, count, false);
      count += 1;
    }
    count = 1;
    bots[bot.key].push('## Next Stages');
    for (const next of bot.nextType) {
      generateInputOutputDoc(bots[bot.key], next, count, true);
      count += 1;
    }
    count = 1;
    bots[bot.key].push('## Outputs');
    for (const output of bot.resultType) {
      generateInputOutputDoc(bots[bot.key], output, count, false);
      count += 1;
    }
  }

  for (const botcode of Object.keys(bots)) {
    const fileName = `${botcode.toLowerCase()}.md`;
    try {
      await fs.promises.unlink(`${__dirname}/${fileName}`);
    } catch (e) {}
    let manualData = '';
    try {
      await fs.promises.access(`${__dirname}/${botcode.toLowerCase()}-manual.md`);
      manualData = await fs.promises.readFile(`${__dirname}/${botcode.toLowerCase()}-manual.md`);
    } catch (e) {

    }
    const first = bots[botcode].shift();
    await fs.promises.writeFile(`${__dirname}/${fileName}`, [first, manualData, ...bots[botcode]].join('  \n'), 'utf8');
  }

  await fs.promises.writeFile(`${__dirname}/table.md`, table.join('  \n'), 'utf8');

})();
