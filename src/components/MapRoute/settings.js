const getOptions = apiName => {
  switch (apiName) {
    case 'Yandex':
      return {
        options: {
          strokeColor: '#000',
          strokeWidth: 3,
          strokeOpacity: 0.3,
        },
      };
    case 'Google':
      return { geodesic: true, strokeColor: '#000', strokeOpacity: 0.3, strokeWeight: 2 };
    default:
      return {};
  }
};

export default getOptions;
