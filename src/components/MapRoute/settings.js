const getOptions = apiName => {
  switch (apiName) {
    case 'Yandex':
      return {
        options: {
          strokeColor: '#000',
          strokeWidth: 4,
          strokeOpacity: 0.5,
        },
      };
    case 'Google':
      return { geodesic: true, strokeColor: '#FF0000', strokeOpacity: 1.0, strokeWeight: 2 };
    default:
      return {};
  }
};

export default getOptions;
