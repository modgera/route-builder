# ROUTE BUILDER

You can find a demo [HERE](https://route-builder.netlify.com).

## Configuration

For run Route Builder - API keys are needed. One for [Yandex Maps API](https://tech.yandex.com/maps/jsapi/doc/2.1/dg/concepts/load-docpage/) and one for [Google Maps API](https://developers.google.com/maps/documentation/javascript/get-api-key).

Google Maps config file is placed in this directory:

```sh
src/services/Google/config.js.
```

There you can place api key and set other params that valid for API.

```sh
export const mapsParams = {
  key: 'YOUR API KEY HERE',
  language: 'ru',
  region: 'RU',
};
```

Yandex Map config file is placed in this directory:

```sh
src/services/Yandex/config.js.
```

There you can place api key and set other params that valid for API.

```sh
export const mapsParams = {
  apikey: 'YOUR API KEY HERE',
  lang: 'ru_RU',
};
```

## Commands

Run project on dev server:

```sh
npm start
```

Run all tests for project:

```sh
npm test
```

Run all tests in debug mode:

```sh
npm run test-debug
```

Create bundle for prodaction:

```sh
npm run build
```
