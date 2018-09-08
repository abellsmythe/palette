/* 
 * Colors 
 */

export const isValidHex = (color) => {
  if (!color || typeof color !== 'string') return false

  if (color.substring(0, 1) === '#') color = color.substring(1)

  switch (color.length) {
    case 3: return /^[0-9A-F]{3}$/i.test(color)
    case 6: return /^[0-9A-F]{6}$/i.test(color)
    case 8: return /^[0-9A-F]{8}$/i.test(color)
    default: return false
  }
};

export const numberToHex = (number) => '#' + number;

export const hexToNumber = (number) => number.substr(1, number.length);

/*
 *  URL 
 */

export const setURI = (window, state) => {
  window.location.hash = encodeURI(Object.values(state).join('/'));
};

export const getURI = (window, keys) => {
  const hash = decodeURI(window.location.hash);

  if (hash) {
    const stateKeysArray  = Object.keys(keys);
    const hashValuesArray = hash.substr(1, hash.length).split(['/']);
    const hashObject      = {};

    stateKeysArray.forEach((key, i) => hashObject[key] = hashValuesArray[i]);

    return hashObject;
  }

  return null;
};