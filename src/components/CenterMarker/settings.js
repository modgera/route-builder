import crossImg from './plus-symbol.svg';

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
        iconLayout: 'default#image',
        iconImageHref: crossImg,
        iconImageSize: [20, 20],
        iconImageOffset: [-10, -10],
        zIndex: 999,
      };
    case 'Google':
      return {};
    default:
      return {};
  }
};

export { getProperties, getOptions };
