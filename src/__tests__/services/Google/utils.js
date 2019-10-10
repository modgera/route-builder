/* eslint-disable */
import { expect } from 'chai';
// import chaiAsPromised from 'chai-as-promised';
// chai.use(chaiAsPromised);
// const expect = chai.expect;

describe('GoogleMaps Utils', () => {
  it('getUserLocation() return coordinates', done => {
    const GMapService = window.GMapService;
    const locationPromise = GMapService.Utils.getUserLocation();
    locationPromise.then(result => {
      expect(result).to.be.an('object');
      expect(Object.keys(result).length).to.equal(2);
      expect(result).to.have.property('lat');
      expect(result).to.have.property('lng');
      expect(result.lng).to.not.be.undefined;
      done();
    });
  });

  it('getAddress() find address from valid coordinates', done => {
    const GMapService = window.GMapService;
    const coordinates = GMapService.Utils.newLatLng(61.2490467121308, 73.39726362604965);
    const address = GMapService.Utils.getAddress(coordinates);
    address.then(result => {
      expect(result).to.equal('б-р Свободы 8');
      done();
    });
  });

  it('getAddress() return info message for not valid coordinates', done => {
    const GMapService = window.GMapService;
    const address = GMapService.Utils.getAddress(['21312,455', '73,4005033293304']);
    address.then(result => {
      expect(result).to.equal('Адрес определить не удалось');
      done();
    });
  });
});
