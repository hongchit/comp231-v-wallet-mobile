import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState } = createGlobalState({
  userPresence: {
    token: '',
    email: '',
    name: '',
    accountId: '',
    profileId: '',
  },
});

export { setGlobalState, useGlobalState };
