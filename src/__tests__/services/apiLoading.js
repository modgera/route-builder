/* eslint-disable */
import { expect } from 'chai';
import YandexMaps from '../../services/Yandex/YandexMaps';
import GoogleMaps from '../../services/Google/GoogleMaps';

describe('Map API loading', function() {
  it('Yandex API Loaded', () => {
    const YMapService = window.YMapService;
    expect(YMapService).to.not.be.undefined;
    expect(YMapService instanceof YandexMaps).to.be.true;
  });

  it('Google API Loaded', () => {
    const GMapService = window.GMapService;
    expect(GMapService).to.not.be.undefined;
    expect(GMapService instanceof GoogleMaps).to.be.true;
  });
});
