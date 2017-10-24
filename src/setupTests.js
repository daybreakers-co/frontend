import 'react-dates/initialize';

const localStorageMock = (() => {
  let store = {}
  return {
    getItem(key) {
      return store[key]
    },
    setItem(key, value) {
      store[key] = value.toString()
    },
    removeItem(key) {
      return delete store[key]
    },
    clear() {
      store = {}
    }
  };
})()

global.localStorage = localStorageMock
