export const baseUrl = 'https://api-maps.yandex.ru/2.1/?';

export const yandexMapsParams = {
  apikey: '1c3beb93-8646-40be-aad5-14816f0a463d',
  lang: 'ru_RU',
};

export const defaultMapState = {
  center: [55.75, 37.57],
  zoom: 12,
  controls: [],
};

export const mapOptions = {
  suppressMapOpenBlock: true,
};

export const yandexMapQuery = {
  load: 'package.full',
  ns: 'use-load-option',
  apikey: '1c3beb93-8646-40be-aad5-14816f0a463d',
};

export const pointColors = {
  end: '#790707',
  regular: '#46dff0',
};

export const pointOptions = {
  draggable: true,
  preset: 'islands#circleIcon',
  balloonMinWidth: 100,
};

export const polylineOptions = {
  strokeColor: '#000',
  strokeWidth: 4,
  strokeOpacity: 0.5,
};
