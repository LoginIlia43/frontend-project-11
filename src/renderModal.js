export default (title, description, link) => {
  const titleEl = document.querySelector('.modal-title');
  const descriptionEl = document.querySelector('.modal-description');
  const openButton = document.getElementById('openLink');
  titleEl.textContent = title;
  descriptionEl.textContent = description;
  openButton.setAttribute('onclick', `location.href='${link}'`);
};
