const getProperties = apiName => {
  switch (apiName) {
    case 'Yandex':
      return {};
    case 'Google':
      return {};
    default:
      return {};
  }
};

const getOptions = apiName => {
  switch (apiName) {
    case 'Yandex':
      return {
        strokeColor: '#000',
        strokeWidth: 4,
        strokeOpacity: 0.5,
      };
    case 'Google':
      return {};
    default:
      return {};
  }
};

export { getProperties, getOptions };
