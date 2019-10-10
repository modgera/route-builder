/* eslint-disable */
import { expect } from 'chai';
import { createGoogleMap } from '../testUtils';

describe('GoogleMaps Marker', () => {
  let markerMap;
  before(done => {
    const newMap = createGoogleMap('google-map-markers');
    newMap.then(map => {
      markerMap = map;
      done();
    });
  });

  it('createMarker()', () => {
    const address = 'Address 1';
    const params = {
      draggable: true,
      label: {
        text: String(1),
        color: '#fff',
        fontSize: '12px',
      },
      balloon: {
        content: address,
      },
    };
    const marker = window.GMapService.Marker.createMarker(markerMap, params);
    expect(marker).to.not.be.undefined;
    expect(typeof marker === 'object').to.be.true;
    expect(marker.infoWindow).to.not.be.undefined;
    expect(marker.infoWindow.content).to.be.equal(address);
  });

  it('changeMarker() changed marker params', () => {
    const params = {
      draggable: true,
      label: {
        text: String(2),
        color: '#fff',
        fontSize: '12px',
      },
      balloon: {
        content: 'Address 2',
      },
    };
    const newAddress = 'Address 2 (change)';
    const newParams = {
      draggable: false,
      balloon: {
        content: newAddress,
      },
    };
    const GMapService = window.GMapService;
    const marker = GMapService.Marker.createMarker(markerMap, params);
    GMapService.Marker.changeMarker(marker, newParams);
    expect(marker.getDraggable()).to.be.false;
    expect(marker.infoWindow).to.not.be.undefined;
    expect(marker.infoWindow.content).to.be.equal(newAddress);
  });

  it('deleteMarker()', () => {
    const GMapService = window.GMapService;
    const marker = GMapService.Marker.createMarker(markerMap);
    GMapService.Marker.deleteMarker(marker, markerMap);
    expect(marker.getMap()).to.be.null;
  });
});
