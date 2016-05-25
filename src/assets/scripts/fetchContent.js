/*

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
