
import { promises as fs } from "fs";
import { join } from 'path';

const replaceTabItems = async (filePath: string) => {
    let file = await fs.readFile(filePath, 'utf8');
    // <TabItem value="typescript" example="api_user_admin.ts">
    // ...
    // <!TabItem>
    const tagItemMatch = /<TabItem.*example="(.+?)">(.|\n)+?<\/TabItem>/g;
    const tags = file.match(tagItemMatch);
    if (!tags) return;

    for (const tag of tags) {
        const example = tag.match(/example="(.+?)"/);
        const sourceName: string = (example as any)[1];
        const sourceCode = await fs.readFile(join(__dirname, 'examples', sourceName), 'utf8');
        const documentation = `<TabItem value="typescript" example="${sourceName}">

\`\`\`typescript
${sourceCode}
\`\`\` 

</TabItem>`
        file = file.replace(new RegExp(`<TabItem.*example="${sourceName}">(.|\n)+?<\/TabItem>`), documentation);
    }
    await fs.writeFile(filePath, file, 'utf8');
    console.log('Updated Source:', filePath);
}

const replaceResponses = async (filePath: string) => {
    let file = await fs.readFile(filePath, 'utf8');
    // <!-- response=api_user_admin.json -->
    // ...
    // <!-- end-response -->
    const tagItemMatch = /<!-- response=(.+?) -->(.|\n)+?<!-- end-response -->/g;
    const tags = file.match(tagItemMatch);
    if (!tags) return;
    for (const tag of tags) {
        const example = tag.match(/response=([\w.]+)/);
        const sourceName: string = (example as any)[1];
        const sourceCode = await fs.readFile(join(__dirname, 'examples', sourceName), 'utf8');
        const documentation = `<!-- response=${sourceName} -->
\`\`\`json
${sourceCode}
\`\`\`
<!-- end-response -->
`;
        file = file.replace(new RegExp(`<!-- response=${sourceName} -->(.|\\n)+?<!-- end-response -->`), documentation);
    }
    await fs.writeFile(filePath, file, 'utf8');
    console.log('Updated Response:', filePath);
}

const getFiles = async (docBasePath: string) => {
    const documentation = await fs.readdir(docBasePath);
    for (const doc of documentation) {
        const subPath = join(docBasePath, doc);
        if ((await fs.stat(subPath)).isDirectory()) {
            await getFiles(subPath);
        } else {
            await replaceTabItems(subPath);
            await replaceResponses(subPath);
        }
    }
}

(async () => {
    await getFiles(join('..', 'docs', 'documentation', 'api'));
})();
