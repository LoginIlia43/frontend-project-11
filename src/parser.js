export default (html) => {
  const parse = new DOMParser();
  const result = parse.parseFromString(html, 'application/xml').querySelector('rss');

  return new Promise((resolve, reject) => {
    if (!result) {
      reject(new Error('Ресурс не содержит валидный RSS'));
    }
    resolve(result);
  });
};
