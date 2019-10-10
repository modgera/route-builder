/* eslint-disable */
import { expect } from 'chai';
import { createYandexMap } from '../testUtils';

const findMarker = (map, id) => {
  const allIds = [];
  map.geoObjects.each(obj => {
    allIds.push(obj.properties.get('id'));
  });
  return allIds.includes(id);
};

describe('YandexMaps Marker', () => {
  let markerMap;
  before(done => {
    const newMap = createYandexMap('yandex-map-markers');
    newMap.then(map => {
      markerMap = map;
      done();
    });
  });

  it('createMarker()', () => {
    const id = 1;
    const params = {
      options: {
        draggable: true,
        preset: 'islands#circleIcon',
        balloonMinWidth: 100,
      },
      properties: { balloonContentHeader: 'Test', balloonContent: 'Address', iconContent: 1, id },
    };
    const marker = window.YMapService.Marker.createMarker(markerMap, params);
    expect(marker).to.not.be.undefined;
    expect(typeof marker === 'object').to.be.true;
    expect(marker.properties.get('id')).to.be.equal(id);
    expect(markerMap.geoObjects.getLength()).to.be.equal(1);
  });

  it('changeMarker() changed marker params', () => {
    const params = {
      options: {
        draggable: true,
        preset: 'islands#circleIcon',
        balloonMinWidth: 100,
      },
      properties: { balloonContentHeader: 'Test 2', balloonContent: 'Address 2', iconContent: 2, id: 2 },
    };
    const content = 'Test 2 (change)';
    const newParams = {
      options: {
        draggable: false,
      },
      properties: { balloonContentHeader: content },
    };
    const YMapService = window.YMapService;
    const marker = YMapService.Marker.createMarker(markerMap, params);
    YMapService.Marker.changeMarker(marker, newParams);
    expect(marker.properties.get('balloonContentHeader')).to.be.equal(content);
    expect(marker.options.get('draggable')).to.be.false;
  });

  it('deleteMarker()', () => {
    const id = 3;
    const params = {
      properties: { id },
    };
    const YMapService = window.YMapService;
    const marker = YMapService.Marker.createMarker(markerMap, params);
    YMapService.Marker.deleteMarker(marker, markerMap);
    const markerExist = findMarker(markerMap, id);
    expect(markerExist).to.be.false;
  });
});
