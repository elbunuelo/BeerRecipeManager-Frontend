import store from 'store2';

export const get = (keys) => {
    const values = {};
    keys.forEach((key) => values[key] = store.get(key));
    return values;
};

export const put = (values) => {
    store.setAll(values);
};

export const clear = (keys) => {
    const values = {};
    keys.forEach((key) => values[key] = null);
    put(values);
};
