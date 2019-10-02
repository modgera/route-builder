const REGULAR_POINT_COLOR = '#46dff0';
const END_POINT_COLOR = '#790707';

const getIconColor = (index, lastIndex) => {
  if (index === lastIndex) {
    return END_POINT_COLOR;
  }
  return REGULAR_POINT_COLOR;
};

const getIcon = color => {
  return {
    path: 'CIRCLE',
    fillColor: color,
    fillOpacity: 1,
    strokeWeight: 0,
    scale: 10,
  };
};

const getOptions = (apiName, point, info) => {
  const { index, lastIndex } = info;
  const { id, name, address } = point;
  const iconColor = getIconColor(index, lastIndex);
  switch (apiName) {
    case 'Yandex':
      return {
        options: {
          draggable: true,
          preset: 'islands#circleIcon',
          balloonMinWidth: 100,
          iconColor,
        },
        properties: { balloonContentHeader: name, balloonContent: address, iconContent: index, id },
      };
    case 'Google':
      return {
        draggable: true,
        label: {
          text: String(index),
          color: '#fff',
          fontSize: '12px',
        },
        balloon: {
          content: address,
        },
        icon: getIcon(iconColor),
      };
    default:
      return {};
  }
};

export default getOptions;
