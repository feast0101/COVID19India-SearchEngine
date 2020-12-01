export const getQueryParams = (location) => {
  const params = {};
  const pathName = location ? location.search : window.location.search;
  const query = pathName.replace('?', '');
  query.split('&').forEach((param) => {
    const [key, value] = param.split('=');
    params[key] = decodeURIComponent(value);
  });
  return params;
};

export const scrollToTop = () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};

export const encodeQueryParams = (params) => {
  if (typeof params === 'string') return params;
  let paramsString = '';
  Object.keys(params).forEach((key) => {
    if (params[key]) {
      const param = `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
      paramsString += paramsString.length === 0 ? param : `&${param}`;
    }
  });
  return paramsString;
};