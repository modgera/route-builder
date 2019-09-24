/* eslint-disable */
import { loadGoogleScript } from '../services/Google/scriptLoader';
import { loadYandexScript } from '../services/Yandex/scriptLoader';

mocha.timeout(10000);

const createLoadingListener = (done, loadCount) => {
  const loadingComplete = [];
  return apiName => {
    loadingComplete.push(apiName);
    if (loadingComplete.length == loadCount) {
      done();
    }
  };
};

before(function(done) {
  const loadingListener = createLoadingListener(done, 2);

  loadYandexScript('YandexMapsApi', api => {
    window.YMapService = api;
    loadingListener('YandexMaps');
  });

  loadGoogleScript('GoogleMapsApi', api => {
    window.GMapService = api;
    loadingListener('GoogleMaps');
  });
});

after(function() {
  try {
    delete window.GMapService;
  } catch (e) {
    window.GMapService = null;
  }

  try {
    delete window.YMapService;
  } catch (e) {
    window.YMapService = null;
  }
});
