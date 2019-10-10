/* eslint-disable */
import { expect } from 'chai';

describe('YandexMaps Utils', () => {
  it('getUserLocation() return coordinates', done => {
    const YMapService = window.YMapService;
    const locationPromise = YMapService.Utils.getUserLocation();
    locationPromise.then(result => {
      expect(result.length).to.equal(2);
      done();
    });
  });

  it('getAddress() find address from valid coordinates', done => {
    const YMapService = window.YMapService;
    const address = YMapService.Utils.getAddress([61.23937724149486, 73.4005033293304]);
    address.then(result => {
      expect(result).to.equal('улица Энергетиков 15');
      done();
    });
  });

  it('getAddress() return info message for not valid coordinates', done => {
    const YMapService = window.YMapService;
    const address = YMapService.Utils.getAddress(['21312,455', '73,4005033293304']);
    address.then(result => {
      expect(result).to.equal('Адрес определить не удалось');
      done();
    });
  });
});
