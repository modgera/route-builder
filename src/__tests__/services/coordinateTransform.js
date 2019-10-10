/* eslint-disable */
import { expect } from 'chai';
import getTransformedPoints from '../../services/coordinateTransform';

describe('Coordinate transformation', () => {
  it('From Yandex to Google', () => {
    const GMapService = window.GMapService;
    const firstPointName = 'First Point';
    const points = [
      { coordinates: [61.23729356240885, 73.40510599999995], name: firstPointName },
      { coordinates: [61.25913615684324, 73.40579264550774] },
    ];
    const newPoints = getTransformedPoints(points, 'Google', GMapService);
    const [firstPoint, secondPoint] = newPoints;
    expect(firstPoint.name).to.be.equal(firstPointName);
    const firstPointCoordinates = [secondPoint.coordinates.lat(), secondPoint.coordinates.lng()];
    expect(firstPointCoordinates).to.be.deep.equal(points[1].coordinates);
  });

  it('From Google to Yandex', () => {
    const GMapService = window.GMapService;
    const firstPointName = 'First Point';
    const { newLatLng } = GMapService.Utils;
    const secondPointCoordinates = [61.25913615684324, 73.40579264550774];
    const points = [
      { coordinates: newLatLng(61.23729356240885, 73.40510599999995), name: firstPointName },
      { coordinates: newLatLng(...secondPointCoordinates) },
    ];
    const newPoints = getTransformedPoints(points, 'Yandex');
    const [firstPoint, secondPoint] = newPoints;
    expect(firstPoint.name).to.be.equal(firstPointName);
    expect(secondPoint.coordinates).to.be.deep.equal(secondPointCoordinates);
  });
});
