import React, { useContext } from "react";
import { GlobalContext } from "../../store/provider";
import actions from "../../store/actions";

const ApiSwitcher = () => {
  const { dispatch } = useContext(GlobalContext);
  const setNewApi = apiName => {
    dispatch({ type: actions.CHANGE_API, info: { apiName } });
  };
  return (
    <div>
      <button onClick={() => setNewApi("Yandex")}>Yandex</button>
      <button onClick={() => setNewApi("Google")}>Google</button>
    </div>
  );
};

export default ApiSwitcher;
