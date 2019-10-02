import arrayMove from 'array-move';
import actions from './actions';

const globalReducer = (state, action) => {
  const { info } = action;
  switch (action.type) {
    case actions.ADD_POINT: {
      const points = state.points.concat({ ...info });
      return {
        ...state,
        points,
      };
    }

    case actions.CHANGE_POINT_INFO: {
      const points = state.points.map(point => (point.id === info.id ? Object.assign(point, info) : point));
      return {
        ...state,
        points,
      };
    }

    case actions.CHANGE_POINT_ORDER: {
      const points = arrayMove(state.points, info.oldIndex, info.newIndex);
      return {
        ...state,
        points,
      };
    }

    case actions.DELETE_POINT: {
      const points = state.points.filter(point => point.id !== info.id);
      return {
        ...state,
        points,
      };
    }

    case actions.DELETE_POINTS: {
      return {
        ...state,
        points: [],
      };
    }

    case actions.SET_MAP_API: {
      const { api, apiName, points } = info;
      return {
        ...state,
        api,
        apiName,
        points,
      };
    }

    case actions.CHANGE_API: {
      const { apiName, loading } = info;
      return {
        ...state,
        apiName,
        loading,
        api: null,
        map: null,
      };
    }

    case actions.SET_MAP: {
      const { map, loading } = info;
      return {
        ...state,
        map,
        loading,
      };
    }

    default:
      return state;
  }
};

export default globalReducer;
