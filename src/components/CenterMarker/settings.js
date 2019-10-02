import crossImg from './plus-symbol.svg';

const getOptions = apiName => {
  switch (apiName) {
    case 'Yandex':
      return {
        options: {
          iconLayout: 'default#image',
          iconImageHref: crossImg,
          iconImageSize: [20, 20],
          iconImageOffset: [-10, -10],
          zIndex: -999,
          cursor: 'none',
        },
      };
    case 'Google':
      return {
        zIndex: -999,
        cursor: 'none',
        icon: {
          url: crossImg,
          scaledSize: [20, 20],
          origin: [0, 0],
          anchor: [10, 10],
        },
        clickable: false,
      };
    default:
      return {};
  }
};

export default getOptions;
