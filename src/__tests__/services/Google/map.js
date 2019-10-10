/* eslint-disable */
import { expect } from 'chai';
import { getOptions } from '../../../components/Map/settings';
import { addMapContainer } from '../testUtils';

describe('GoogleMaps Map', () => {
  it('createMap()', done => {
    const containerId = 'google-map-container';
    addMapContainer(containerId);
    const options = getOptions('Google');
    const GMapService = window.GMapService;
    const newMap = GMapService.Map.createMap(containerId, options);
    newMap.then(map => {
      expect(map).to.not.be.undefined;
      expect(typeof map === 'object').to.be.true;
      expect('gm_accessors_' in map).to.be.true;
      done();
    });
  });
});
