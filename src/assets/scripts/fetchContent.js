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

  // content cached?
  if (localStorage[url]) {
    return callback(JSON.parse(localStorage[url]))
  }
  // online?
  else if (navigator.onLine) {
    //checking for latest content asynchronously
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        localStorage[this.responseURL] = this.responseText; // Store the answer for later use
        return callback(JSON.parse(localStorage[this.responseURL]))// Forward the cached content
      };;
    });
    xhr.send()
  }
}
