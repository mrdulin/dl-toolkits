(function () {
  const buttonTexts = {
    unread: 'Marked As Read',
    read: 'Read',
  };
  const buttonContainer = document.querySelector('.crayons-article-actions__inner');
  const readButton = createReadButton();
  readButton.addEventListener('click', onReadButtonClick, false);
  buttonContainer.prepend(readButton);

  function createReadButton() {
    const readButton = document.createElement('div');
    readButton.classList.add('crayons-reaction');
    readButton.textContent = buttonTexts.unread;
    return readButton;
  }

  function onReadButtonClick() {
    const isRead = checkReadStatus();
    if (!isRead) {
      const r = AddItemToReadListStorage(window.location.href);
      if (r) {
        setReadButtonState();
      }
    } else {
      const r = removeItemFromReadListStorage();
      if (r) {
        resetReadButtonState();
      }
    }
  }

  function init() {
    const isRead = checkReadStatus();
    if (isRead) {
      setReadButtonState();
    }
  }

  function setReadButtonState() {
    readButton.textContent = buttonTexts.read;
    readButton.classList.add('read');
  }

  function resetReadButtonState() {
    readButton.textContent = buttonTexts.unread;
    readButton.classList.remove('read');
  }

  function checkReadStatus() {
    const list = getReadListFromStorage();
    const idx = list.findIndex((url) => url === window.location.href);
    return idx > -1;
  }

  function AddItemToReadListStorage(item) {
    const list = getReadListFromStorage();
    const exists = list.findIndex((url) => url === item) > -1;
    if (exists) return false;
    list.push(item);
    localStorage.setItem('list', JSON.stringify(list));
    return true;
  }

  function removeItemFromReadListStorage(item) {
    const list = getReadListFromStorage();
    const idx = list.findIndex((url) => url === item);
    list.splice(idx, 1);
    localStorage.setItem('list', JSON.stringify(list));
    return true;
  }

  function getReadListFromStorage() {
    const list = localStorage.getItem('list');
    return list ? JSON.parse(list) : [];
  }

  init();
})();
