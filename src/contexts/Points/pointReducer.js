const pointReducer = (state, action) => {
  const actionInfo = action.info;
  switch (action.type) {
    case "GET_POINTS":
      return state;

    case "ADD_POINT":
      const { id, name, address, coordinates } = actionInfo;
      return state.concat({ id, name, address, coordinates });

    case "CHANGE_POINT_INFO":
      return state.map(point =>
        point.id === actionInfo.id ? Object.assign(point, actionInfo) : point
      );

    case "CHANGE_POINT_ORDER":
      return state;

    case "DELETE_POINT":
      return state.filter(point => (point.id === actionInfo.id ? false : true));
    default:
      return state;
  }
};

export default pointReducer;
