import { atom } from 'recoil';

const authAtom = atom({
    key: 'auth',
    default: { user: "", isLoggedIn: false }
  });
  

export { authAtom };