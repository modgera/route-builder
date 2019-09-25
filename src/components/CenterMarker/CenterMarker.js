import { useContext } from 'react';
import { GlobalContext } from '../../store/provider';
import crossImg from './plus-symbol.svg';

const CenterMarker = () => {
  const options = {
    iconLayout: 'default#image',
    iconImageHref: crossImg,
    iconImageSize: [20, 20],
    iconImageOffset: [-10, -10],
    zIndex: 999,
  };
  const { state } = useContext(GlobalContext);
  if (state.map) {
    state.api.Marker.addCenterMarkerToMap(state.map, options);
  }
  return null;
};

export default CenterMarker;
