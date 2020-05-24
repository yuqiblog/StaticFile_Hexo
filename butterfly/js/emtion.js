var fancybox = document.getElementsByClassName("fancybox");
for (var i = 0; i < fancybox.length; i++) {
  var parentP = fancybox[i].parentNode;
  if (parentP.textContent != "" && parentP.nodeName == "P") {
    var imgWidth = window.getComputedStyle(fancybox[i].childNodes[0]).width;
    var zoom = window.getComputedStyle(fancybox[i].childNodes[0]).zoom;
    var realWidth = parseFloat(imgWidth) * parseFloat(zoom) + "px";
    fancybox[i].style.width = realWidth;
    fancybox[i].style.verticalAlign = "middle";
  }
}
