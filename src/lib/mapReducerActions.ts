/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export default (reducerActions: any, dispatch: any): any => {
  const actions: Partial<any> = {};

  Object.keys(reducerActions).forEach((key) => {
    actions[key] = (params: any) => {
      dispatch({ function: key, params });
    };
  });
  return actions;
};
