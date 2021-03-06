/* eslint-disable */
import { expect } from 'chai';
import { getOptions } from '../../../components/Map/settings';
import { addMapContainer } from '../testUtils';

describe('YandexMaps Map', () => {
  it('createMap()', done => {
    const containerId = 'yandex-map-container';
    addMapContainer(containerId);
    const options = getOptions('Yandex');
    const newMap = window.YMapService.Map.createMap(containerId, options);
    newMap.then(map => {
      expect(map).to.not.be.undefined;
      expect(typeof map === 'object').to.be.true;
      expect('geoObjects' in map).to.be.true;
      done();
    });
  });
});
