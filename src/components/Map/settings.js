const getOptions = apiName => {
  switch (apiName) {
    case 'Yandex':
      return {
        options: {
          strokeColor: '#000',
          strokeWidth: 4,
          strokeOpacity: 0.5,
          checkZoomRange: true,
        },
        mapState: {
          zoom: 11,
          controls: [],
        },
      };
    case 'Google':
      return { zoom: 11, disableDefaultUI: true };
    default:
      return {};
  }
};

const CONTAINER_ID = 'map-container';

export { getOptions, CONTAINER_ID };
