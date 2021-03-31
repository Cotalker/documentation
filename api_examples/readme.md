### Quick Start

First login and then install packages
```
npm login --registry=https://npm.pkg.github.com/ --scope=@cotalker
npm ci
```

To run examples:

```
soruce .env
npx ts-node examples/api_user.ts
```

### Update Documentation
This command will update /docs/documentation/api/* source code examples
```
npx ts-node update.ts
# commit & push files
```