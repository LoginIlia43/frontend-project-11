export default (html) => {
  const parse = new DOMParser();
  const result = parse.parseFromString(html, 'application/xml');

  return new Promise((resolve, reject) => {
    resolve(result);
  });
};
