var article_container = document.getElementById("article-container");
var bg = document.getElementById("web_bg");
var opt = document.getElementById("opt");
var page = document.getElementById("page");
article_container.addEventListener("click", function (event) {
  var target = event.target;
  if (target.nodeName === "DIV" && target.className === "bg_test") {
    console.log(target.style.background);
    bg.style.background = target.style.background;
    bg.style.animation = target.style.animation;
  }
});
opt.addEventListener("click", function (event) {
  var target = event.target;
  if (target.nodeName === "A") {
    console.log(target.textContent);
    var num = target.textContent;
    num = num.split(" ");
    console.log(num);
    page.style.background = "rgba(255,255,255," + num[1] + ")";
    event.preventDefault();
  }
});
