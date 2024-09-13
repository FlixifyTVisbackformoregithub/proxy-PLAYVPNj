document.getElementById("goButton").addEventListener("click", function() {
    const url = document.getElementById("url").value;
    const proxyFrame = document.getElementById("proxyFrame");

    if (isValidUrl(url)) {
        proxyFrame.src = url.includes('http') ? url : 'http://' + url;
    } else {
        alert("Please enter a valid URL");
    }
});

function isValidUrl(string) {
    const res = string.match(/(http|https):\/\/[^\s]+/);
    return (res !== null);
}
