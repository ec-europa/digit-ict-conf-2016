/*
Try to retrieve content from localStorate otherwise and if we are online,
request content from the web, store it into local storage and return.

@param string $url
@param function $callback
@return function

TODO eventually replace this by a service worker:
https://developers.google.com/web/fundamentals/getting-started/your-first-progressive-web-app/step-04?hl=en
 */
export function fetchContent(url, callback) {
  // Content cached?
  if (localStorage[url]) {
    return callback(JSON.parse(localStorage[url]));
  } else if (navigator.onLine) {
    // online?
    // checking for latest content asynchronously
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === xhr.DONE) {
        // Store the answer for later use
        localStorage[url] = xhr.responseText;
        // Forward the cached content
        callback(JSON.parse(xhr.responseText));
      }
    });

    return xhr.send();
  }

  throw new Error('Unable to load content');
}
