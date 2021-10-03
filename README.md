Below you will find some information on how to perform common tasks.<br>

## How to use

Setup environment:

* `npm i` is install packages.

Testing unit test:

* `npm run test`.

Run Application:

* `npm start`

App Feature:
* `Autocomplate` is search and get suggest from text input
* `Search item` is search item from input
* `Infinity Scroll` is get item from scrolling down when item more than 5
* `Detail Item` is page detail item from list item
* `Unit Test Mock Server` is using unit test mock server, when unit test not actualy server(http://www.omdbapi.com/)

Use Mock Server
* `node server/index.js` is command to run server local
* change config.ts
```
src/
  config.ts
```
from this:
```ts
const development = {
  SERVICE_URL: 'http://www.omdbapi.com/',
  // SERVICE_URL: 'http://localhost:11345',
  API_KEY: 'faf7e5bb',
};

export default development;
```

to this:
```ts
const development = {
  // SERVICE_URL: 'http://www.omdbapi.com/',
  SERVICE_URL: 'http://localhost:11345',
  API_KEY: 'faf7e5bb',
};

export default development;
```