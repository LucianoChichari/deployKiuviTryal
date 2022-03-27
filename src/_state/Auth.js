import { atom } from "recoil";

const authAtom = atom({
    key: 'auth',

    default: JSON.parse(sessionStorage.getItem('user'))
});

export {authAtom};