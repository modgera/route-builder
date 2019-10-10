/* eslint-disable */
import { expect } from 'chai';
import { createYandexMap } from '../testUtils';

describe('YandexMaps Polyline', () => {
  let polylineMap;
  before(done => {
    const newMap = createYandexMap('yandex-map-polyline');
    newMap.then(map => {
      polylineMap = map;
      done();
    });
  });

  it('add() polyline', () => {
    const YMapService = window.YMapService;
    const coordinates = [
      [61.23729356240885, 73.40510599999995],
      [61.25913615684324, 73.40579264550773],
      [61.24552751760657, 73.46984796071477],
    ];
    const params = {
      options: {
        strokeColor: '#000',
        strokeWidth: 4,
        strokeOpacity: 0.5,
      },
    };
    const polyline = YMapService.Polyline.add(polylineMap, coordinates, params);
    expect(polyline).to.not.be.undefined;
    expect(typeof polyline === 'object').to.be.true;
    expect(typeof polyline.geometry === 'object').to.be.true;
  });

  it('changeCoordinates() in polyline', () => {
    const YMapService = window.YMapService;
    const coordinates = [[61.23729356240885, 73.40510599999995], [61.25913615684324, 73.40579264550773]];
    const newCoordinates = [
      [61.23729356240885, 73.40510599999995],
      [61.25913615684324, 73.40579264550773],
      [61.24552751760657, 73.46984796071477],
    ];
    const params = {
      options: {
        strokeColor: '#000',
        strokeWidth: 4,
        strokeOpacity: 0.5,
      },
    };
    const polyline = YMapService.Polyline.add(polylineMap, coordinates, params);
    YMapService.Polyline.changeCoordinates(polyline, newCoordinates);
    const currentCoordinates = polyline.geometry.getCoordinates();
    expect(polyline).to.not.be.undefined;
    expect(currentCoordinates.length).to.be.equal(3);
  });
});
