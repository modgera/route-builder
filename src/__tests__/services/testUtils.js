import { getOptions } from '../../components/Map/settings';

const addMapContainer = containerId => {
  const mapContainer = document.createElement('div');
  mapContainer.setAttribute('id', containerId);
  document.body.appendChild(mapContainer);
};

const createYandexMap = async containerId => {
  addMapContainer(containerId);
  const options = getOptions('Yandex');
  const newMap = await window.YMapService.Map.createMap(containerId, options);
  return newMap;
};

const createGoogleMap = async containerId => {
  addMapContainer(containerId);
  const options = getOptions('Google');
  const newMap = await window.GMapService.Map.createMap(containerId, options);
  return newMap;
};

export { addMapContainer, createYandexMap, createGoogleMap };
