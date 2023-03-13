export default (html) => {
  const parse = new DOMParser();
  const result = parse.parseFromString(html, 'application/xml').querySelector('rss');

  return new Promise((resolve, reject) => {
    if (!result) {
      reject(new Error('link doesn\'t contain a valid RSS'));
    }
    resolve(result);
  });
};
