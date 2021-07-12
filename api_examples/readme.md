### Quick Start

First log in and then install packages

```
npm login --registry=https://npm.pkg.github.com/ --scope=@cotalker
npm ci
```

Copy your _Access Token_ into `.env`

To run examples:

```
source .env
npx ts-node examples/api_user.ts
```

### Update Documentation
This command will update /docs/documentation/api/* source code examples
```
npx ts-node update.ts
# commit & push files
```