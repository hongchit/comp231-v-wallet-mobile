import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState } = createGlobalState({
  userPresence: {
    token: '',
    email: '',
    name: '',
    id: '',
  },
  testing: true,
});

export { setGlobalState, useGlobalState };
