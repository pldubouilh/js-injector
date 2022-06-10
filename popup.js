// Storage Documentation: https://developer.chrome.com/extensions/storage
document.addEventListener('DOMContentLoaded', function() {
  var textarea = document.getElementById('jscode');
  var injectButton = document.getElementById('inject');

  chrome.tabs.query({active: true},function(tab) {
    const url = new URL(tab[0].url);

    chrome.storage.sync.get(url.host, function(val) {
      if (val[url.host] != undefined) {
        textarea.value = val[url.host];
      } else {
        textarea.value = '';
      }
    });

    injectButton.addEventListener('click', function() {
      var val = textarea.value;
      if (!val) {
        chrome.storage.sync.remove(url.host, function() {
          console.log('REMOVED script for ' + url.host);
        });
        window.close();
        return;
      }

      chrome.tabs.executeScript({
        code: val
      });

      // Save it using the Chrome extension storage API.
      var keypair = {};
      keypair[url.host] = val;
      chrome.storage.sync.set(keypair, function() {
        // Notify that we saved.
        console.log('SAVED ' + JSON.stringify(keypair));
      });
      window.close();
    });
  });
});
