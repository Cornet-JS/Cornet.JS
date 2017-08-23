console.log("State: " + document.readyState);
document.addEventListener("readystatechange", function() {
  console.log("State: " + document.readyState);
}, false);
function initialiseCode() {
  var options = {
    lineNumbers: true,
    theme: 'hadrien-dark'
  }
  var elts = document.querySelectorAll('code > textarea');
  for (var i = 0; i < elts.length; i++) {
    options.mode = elts[i].parentNode.getAttribute('data-mode');
    options.value = elts[i].textContent;
    CodeMirror(function(elt2) {
      elts[i].parentNode.replaceChild(elt2, elts[i]);
    }, options)
  }

  var elts = document.querySelectorAll("code > pre");
  for (var i = 0; i < elts.length; i++) {
    CodeMirror.runMode(elts[i].textContent, elts[i].parentNode.getAttribute('data-mode'), elts[i]);
  }
}
function copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return clipboardData.setData("Text", text);

    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}
