import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState } = createGlobalState({
  userPresence: {
    token: '',
    email: '',
    name: '',
    accountId: '',
    profileId: '',
  },
  testing: true,
});

export { setGlobalState, useGlobalState };
