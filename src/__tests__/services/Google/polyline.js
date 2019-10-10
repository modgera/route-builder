/* eslint-disable */
import { expect } from 'chai';
import { createGoogleMap } from '../testUtils';

const params = { geodesic: true, strokeColor: '#FF0000', strokeOpacity: 1.0, strokeWeight: 2 };

describe('GoogleMaps Polyline', () => {
  let polylineMap;
  before(done => {
    const newMap = createGoogleMap('google-map-polyline');
    newMap.then(map => {
      polylineMap = map;
      done();
    });
  });

  it('add() polyline', () => {
    const GMapService = window.GMapService;
    const coordinates = [
      { lat: 61.23729356240885, lng: 73.40510599999995 },
      { lat: 61.25913615684324, lng: 73.40579264550773 },
    ];
    const polyline = GMapService.Polyline.add(polylineMap, coordinates, params);
    const polylinePath = polyline.getPath();
    expect(polyline).to.not.be.undefined;
    expect(typeof polyline === 'object').to.be.true;
    expect(typeof polylinePath === 'object').to.be.true;
    expect(polylinePath.length).to.be.equal(2);
  });

  it('changeCoordinates() in polyline', () => {
    const GMapService = window.GMapService;
    const coordinates = [
      { lat: 61.23729356240885, lng: 73.40510599999995 },
      { lat: 61.25913615684324, lng: 73.40579264550773 },
    ];
    const newCoordinates = [
      { lat: 61.23729356240885, lng: 73.40510599999995 },
      { lat: 61.25913615684324, lng: 73.40579264550773 },
      { lat: 61.24552751760657, lng: 73.46984796071477 },
    ];
    const polyline = GMapService.Polyline.add(polylineMap, coordinates, params);
    GMapService.Polyline.changeCoordinates(polyline, newCoordinates);
    const currentPath = polyline.getPath();
    expect(polyline).to.not.be.undefined;
    expect(currentPath.length).to.be.equal(3);
  });
});
