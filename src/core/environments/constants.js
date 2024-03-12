// https://emailregex.com/index.html
const emailPattern = /[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const fullNamePattern = /^[a-zA-Z]{2,20} [a-zA-Z]{2,20}$/;

const localStorageKey = "3e676b5ce13e676b53e676b5c533e676b5ce1e83e676b5c";

export {
    emailPattern,
    fullNamePattern,
    localStorageKey,
};
