import actions from "./actions";
import arrayMove from "array-move";

const globalReducer = (state, action) => {
  const info = action.info;
  switch (action.type) {
    case actions.ADD_POINT: {
      const points = state.points.concat({ ...info });
      return {
        ...state,
        points
      };
    }

    case actions.CHANGE_POINT_INFO: {
      const points = state.points.map(point =>
        point.id === info.id ? Object.assign(point, info) : point
      );
      return {
        ...state,
        points
      };
    }

    case actions.CHANGE_POINT_ORDER: {
      const points = arrayMove(state.points, info.oldIndex, info.newIndex);
      return {
        ...state,
        points
      };
    }

    case actions.DELETE_POINT: {
      const points = state.points.filter(point => (point.id === info.id ? false : true));
      return {
        ...state,
        points
      };
    }

    case actions.SET_MAP_API: {
      return {
        ...state,
        api: info.api
      };
    }

    case actions.CHANGE_API: {
      return {
        ...state,
        apiName: info.apiName,
        api: null
      };
    }

    default:
      return state;
  }
};

export default globalReducer;
