export const createReducer = (initialState, handlers) => (
  state = initialState,
  payload
) => {
  const { type, ...params } = payload;
  const handler = handlers[type];

  if (handler) {
    return handler(state, params);
  }

  return state;
};
