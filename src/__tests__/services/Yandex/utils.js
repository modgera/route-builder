/* eslint-disable */
import { expect } from 'chai';

describe('YandexMaps Utils', function() {
  it('getUserLocation return coordinates', done => {
    const YMapService = window.YMapService;
    const locationPromise = YMapService.Utils.getUserLocation();
    locationPromise.then(result => {
      expect(result.length).to.equal(2);
      done();
    }, done);
  });
});
