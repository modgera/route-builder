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

    default:
      return state;
  }
};

export default globalReducer;
