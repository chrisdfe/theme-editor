const createReducer = (initialState, handlers) => (
  state = initialState,
  action
) => {
  const { type, ...payload } = action;
  const handler = handlers[type];

  if (handler) {
    return handler(state, payload);
  }

  return state;
};

export default createReducer;
