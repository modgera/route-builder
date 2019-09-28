const REGULAR_POINT_COLOR = '#46dff0';
const END_POINT_COLOR = '#790707';

const getIconColor = (index, lastIndex) => {
  if (index === lastIndex) {
    return END_POINT_COLOR;
  }
  return REGULAR_POINT_COLOR;
};
const getProperties = (apiName, point, info) => {
  const { id, name, address } = point;
  const { index } = info;
  switch (apiName) {
    case 'Yandex':
      return { balloonContentHeader: name, balloonContent: address, iconContent: index, id };
    case 'Google':
      return { id };
    default:
      return {};
  }
};

const getChangingProperties = (apiName, info) => {
  const { index } = info;
  switch (apiName) {
    case 'Yandex':
      return { iconContent: index };
    case 'Google':
      return {};
    default:
      return {};
  }
};

const getOptions = (apiName, info) => {
  const { index, lastIndex } = info;
  const iconColor = getIconColor(index, lastIndex);
  switch (apiName) {
    case 'Yandex':
      return {
        draggable: true,
        preset: 'islands#circleIcon',
        balloonMinWidth: 100,
        iconColor,
      };
    case 'Google':
      return {};
    default:
      return {};
  }
};

const getChangingOptions = (apiName, info) => {
  const { index, lastIndex } = info;
  const iconColor = getIconColor(index, lastIndex);
  switch (apiName) {
    case 'Yandex':
      return { iconColor };
    case 'Google':
      return {};
    default:
      return {};
  }
};

export { getProperties, getOptions, getChangingOptions, getChangingProperties };
