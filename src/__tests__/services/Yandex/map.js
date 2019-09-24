/* eslint-disable */
import { expect } from 'chai';

const addMapContainer = containerId => {
  const mapContainer = document.createElement('div');
  mapContainer.setAttribute('id', containerId);
  document.body.appendChild(mapContainer);
};

describe('YandexMaps Map', function() {
  it('createMap create a map with default params', done => {
    const containerId = 'yandex-map-container';
    addMapContainer(containerId);
    window.YMapService.Map.createMap(containerId, newMap => {
      expect(newMap).to.not.be.undefined;
      done();
    });
  });
});
