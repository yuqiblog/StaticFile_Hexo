/*
    更换壁纸
*/
// 获取标签
// 全局背景div
var web_bg = document.getElementById("web_bg");
// 公共父级
var content_inner = document.getElementById("content-inner");
// 获取Cookies
// 透明度
var opacity = Cookies.get("opacity");
// 背景
var bg = Cookies.get("bg");
// 动画
var animation = Cookies.get("animation");
// 背景类型
var type = Cookies.get("type");
// 声明遍历 用于记录当前color
// 设置背景
if (bg) {
  web_bg.style.background = bg;
  web_bg.setAttribute("data-type", type);
  if (animation) {
    web_bg.style.animation = animation;
  }
}
function setColor(opacity) {
  // style="--light_bg_color: rgb(255, 255, 255,.3);--dark_bg_color: rgba(18,18,18,.2);"
  var light_bg_color = "--light_bg_color: rgb(255, 255, 255," + opacity + ");";
  var dark_bg_color = "--dark_bg_color: rgba(18,18,18," + opacity + ");";
  content_inner.setAttribute("style", light_bg_color + dark_bg_color);
}
setColor(opacity);
/*
    手机侧边默认隐藏
*/
var mobile_sidebar_menus = document.getElementById("mobile-sidebar-menus");
var menus_item_child = mobile_sidebar_menus.getElementsByClassName(
  "menus_item_child"
);
var menus_expand = mobile_sidebar_menus.getElementsByClassName("menus-expand");
for (var i = 0; i < menus_item_child.length; i++) {
  menus_item_child[i].style.display = "none";
  menus_expand[i].className += " menus-closed";
}
/* 
  分类卡片隐藏
*/
var card_category_list = document.getElementsByClassName(
  "card-category-list child"
);
var item = document.getElementsByClassName("card-category-list-item");
function toggle(t) {
  var display = t.parentElement.nextSibling.style.display;
  if (display == "none") {
    t.parentElement.nextSibling.style.display = "block";
    t.parentElement.nextSibling.style.height = "100%";
    t.className = t.className.replace("fa-chevron-up", "fa-chevron-down");
  } else {
    t.parentElement.nextSibling.style.display = "none";
    t.className = t.className.replace("fa-chevron-down", "fa-chevron-up");
  }
}

for (var i = 0; i < card_category_list.length; i++) {
  card_category_list[i].style.display = "none";
  card_category_list[i].style.transition = "all 1s";
  card_category_list[i].previousSibling.innerHTML +=
    '<i class="fa fa-chevron-up menus-expand  menus-closed" aria-hidden="true" style="margin-left:20px;" onclick="toggle(this)"></i>';
}
/*
    扩展js
*/
/* eslint-disable */
(function ($) {
  "use strict";
  function setTabs() {
    const $tabs = $(".tabs");
    if ($tabs.length === 0) return;
    let $navs = $tabs.find(".nav-tabs .tab");
    for (var i = 0; i < $navs.length; i++) {
      let $a = $tabs.find($navs[i].children[0]);
      $a.addClass($a.attr("href"));
      $a.removeAttr("href");
    }
    $(".tabs .nav-tabs").on("click", "a", (e) => {
      e.preventDefault();
      e.stopPropagation();
      let $tab = $(e.target.parentElement.parentElement.parentElement);
      $tab.find(".nav-tabs .active").removeClass("active");
      $tab.find(e.target.parentElement).addClass("active");
      $tab.find(".tab-content .active").removeClass("active");
      $tab.find($(e.target).attr("class")).addClass("active");
      return false;
    });
  }

  $(function () {
    setTabs();
    // $(".article .video-container").fitVids();
    $(".scroll-down").on("click", function () {
      scrolltoElement(".l_body");
    });
    setTimeout(function () {
      $("#loading-bar-wrapper").fadeOut(500);
    }, 300);
  });
})(jQuery);
/*
    轮播图JS
*/
(function () {
  function Slider(option) {
    this.wrap = option.wrap;
    this.imgList = option.imgList;
    this.imgNum = this.imgList.length;
    this.width = option.width || $(this.wrap).width();
    this.height = option.height || $(this.wrap).height();
    this.isAuto = option.isAuto || true;
    this.moveTime = option.moveTime;
    this.direction = option.direction || "right";
    this.btnWidth = option.btnWidth;
    this.btnHeight = option.btnHeight;
    this.spanWidth = option.spanWidth;
    this.spanHeight = option.spanHeight;
    this.spanColor = option.spanColor;
    this.activeSpanColor = option.activeSpanColor;
    this.btnBackgroundColor = option.btnBackgroundColor;
    this.spanRadius = option.spanRadius;
    this.spanMargin = option.spanMargin;
    this.flag = false;
    this.nowIndex = 0;
    this.createDom();
    this.initStyle();
    this.bindEvent();
    if (this.isAuto === true) {
      this.autoMove();
    }
  }

  Slider.prototype.createDom = function () {
    var oUl = $('<ul class="imgList"></ul>');
    var Spot = $('<div class="spot"></div>');
    this.imgList.forEach(function (item) {
      var oLi =
        '<li><a  href=" ' +
        item.a +
        'target="_blank" "><img src=" ' +
        item.img +
        ' "></a></li>';
      oUl.append(oLi);
      var span = "<span></span>";
      Spot.append(span);
    });
    var leftBtn = $(
      '<div class="left-btn"><i class="fas fa-angle-left"></i></div>'
    );
    var rightBtn = $(
      '<div class="right-btn"><i class="fas fa-angle-right"></i></div>'
    );
    this.wrap.append(oUl).append(leftBtn).append(rightBtn).append(Spot);
  };
  Slider.prototype.initStyle = function () {
    $("*", this.wrap).css({ margin: 0, padding: 0, listStyle: "none" });
    $(this.wrap).css({ overflow: "hidden", position: "relative" });
    $(".imgList", this.wrap).css({
      width: this.width,
      height: this.height,
      position: "relative",
    });
    $(".imgList li", this.wrap)
      .css({
        width: this.width,
        height: this.height,
        position: "absolute",
        left: 0,
        top: 0,
        display: "none",
      })
      .eq(this.nowIndex)
      .css({ display: "block" });
    $(".imgList li a, .imgList li a img", this.wrap).css({
      display: "inline-block",
      width: this.width,
      height: this.height,
    });
    $(".left-btn, .right-btn", this.wrap).css({
      width: this.btnWidth,
      height: this.btnHeight,
      backgroundColor: this.btnBackgroundColor,
      color: "#fff",
      textAlign: "center",
      lineHeight: this.btnHeight + "px",
      position: "absolute",
      top: "50%",
      marginTop: -this.btnHeight / 2,
      cursor: "pointer",
    });
    $(".right-btn", this.wrap).css({ right: 0 });
    $(".spot", this.wrap).css({
      height: this.spanHeight + this.spanMargin * 2,
      position: "absolute",
      left: "50%",
      marginLeft: (-this.imgNum * (this.spanWidth + this.spanMargin * 2)) / 2,
      bottom: 10,
    });
    $(".spot span", this.wrap)
      .css({
        display: "inline-block",
        width: this.spanWidth,
        height: this.spanHeight,
        margin: this.spanMargin,
        backgroundColor: this.spanColor,
        borderRadius: this.spanRadius,
        cursor: "pointer",
      })
      .eq(this.nowIndex)
      .css({ backgroundColor: this.activeSpanColor });
  };
  Slider.prototype.bindEvent = function () {
    var self = this;
    $(".left-btn", this.wrap).click(function () {
      self.move("prev");
    });
    $(".right-btn", this.wrap).click(function () {
      self.move("next");
    });
    $(".spot span").click(function (e) {
      self.move($(this).index());
    });
    $(this.wrap).mouseenter(function () {
      clearInterval(self.time);
    });
  };
  Slider.prototype.move = function (dir) {
    if (this.flag) {
      return false;
    }
    this.flag = true;
    switch (dir) {
      case "prev":
        if (this.nowIndex === 0) {
          this.nowIndex = this.imgNum - 1;
        } else {
          this.nowIndex--;
        }
        break;
      case "next":
        if (this.nowIndex === this.imgNum - 1) {
          this.nowIndex = 0;
        } else {
          this.nowIndex++;
        }
        break;
      default:
        this.nowIndex = dir;
        break;
    }
    var self = this;
    $(".imgList li", this.wrap)
      .fadeOut()
      .eq(this.nowIndex)
      .fadeIn(function () {
        self.flag = false;
      });
    $(".spot  span", this.wrap)
      .css({ backgroundColor: this.spanColor })
      .eq(this.nowIndex % this.imgNum)
      .css({ backgroundColor: this.activeSpanColor });
  };
  Slider.prototype.autoMove = function () {
    var self = this;
    this.time = setInterval(function () {
      if (this.direction == "left") {
        $(".left-btn", this.wrap).trigger("click");
      } else {
        $(".right-btn", this.wrap).trigger("click");
      }
    }, self.moveTime);
  };
  $.fn.extend({
    slider: function (option) {
      option.wrap = this;
      new Slider(option);
    },
  });
})();
/*
    双评论JS
*/
function switchComment() {
  const t =
      "切换为Gitalk" === $("#switch-comment").attr("title")
        ? "切换为Valine"
        : "切换为Gitalk",
    o = $("#switch-comment>i");
  "none" === $("#gitalk-container").css("display")
    ? $("#vcomment").slideUp("normal", () => {
        $("#gitalk-container").slideDown("normal", () => {
          $("#switch-comment").attr("title", t),
            o.hasClass("fa-toggle-off")
              ? o.removeClass("fa-toggle-off").addClass("fa-toggle-on")
              : o.removeClass("fa-toggle-on").addClass("fa-toggle-off");
        });
      })
    : $("#gitalk-container").slideUp("normal", () => {
        $("#vcomment").slideDown("normal", () => {
          $("#switch-comment").attr("title", t),
            o.hasClass("fa-toggle-off")
              ? o.removeClass("fa-toggle-off").addClass("fa-toggle-on")
              : o.removeClass("fa-toggle-on").addClass("fa-toggle-off");
        });
      });
}
var commentElement = document.getElementsByClassName("comment_headling")[0];
if (commentElement != undefined) {
  commentElement.innerHTML +=
    '<a id="switch-comment" href="javascript:void(0);" title="切换为Gitalk" target="_self"><i class="fa fas fa-toggle-off" aria-hidden="true"></i></a>';
  document.getElementById("gitalk-container").style.display = "none";
}
$("#switch-comment").click(function () {
  return switchComment(), !1;
});

// 修改Banner
var full_page = document.getElementsByClassName("full_page");

if (full_page.length > 0) {
  full_page[0].style.backgroundImage =
    'url("https://ae01.alicdn.com/kf/H18a4b998752a4ae68b8e85d432a5aef0l.png"), linear-gradient(60deg, rgba(255, 165, 150, 0.5) 5%, rgba(0, 228, 255, 0.35)), url("https://ae01.alicdn.com/kf/H21b5f6b8496141a1979a33666e1074d9x.jpg")';
}

/*
    其他
*/
