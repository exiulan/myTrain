$(function() {
    //头部搜索框
    $("body").on("click", function(event) {
        if (event.target.className == "search-text") {
            $(".search-section .hot-words").css("display", "none");
            $(".search-section .search-btn").css("background-color", "#35b558");
        } else {
            $(".search-section .hot-words").css("display", "block");
            $(".search-section .search-btn").css("background-color", "#fff");
        }
    })


    //中间图片变化
    /*
    页面加载完成之后每张图片向右移动596px
    左右指示图标hover之后显示
    下边图标滑动块随图标变化而循坏变化
    左右滑块点击左右移动
     */

    $(".swiper-container").mouseover(function() {
        $(this).find(".banner").css("display", "block");
    }).mouseleave(function() {
        $(this).find(".banner").css("display", "none");
    })

    var swiper = $(".swiper-wrapper a");
    var pagination = $(".pagination span");
    var num = swiper.length; //获取焦点图的个数
    var fwidth = swiper.width(); //每个焦点图的宽度
    $(".swiper-wrapper").css("width", fwidth * num); //设定大图集合的宽度，也就是所有焦点图宽度的和。
    var sec = 4000; //时间切换间隔
    picTimer = setInterval(timeset, sec); //指定sec毫秒后执行一次timeset函数。
    function timeset() {
        var j = swiper.index($(".swiper-slide-active"));
        var timew = fwidth * (j + 1);
        swiper.removeClass("swiper-slide-active");
        pagination.removeClass("swiper-active-switch");
        if (j == num - 1) {
            swiper.eq(0).addClass("swiper-slide-active");
            pagination.eq(0).addClass("swiper-active-switch");
            $(".swiper-wrapper").css({
                "left": 0
            }, 200);
        } else {
            swiper.eq(j + 1).addClass("swiper-slide-active");
            pagination.eq(j + 1).addClass("swiper-active-switch");
            j = swiper.index($(".swiper-slide-active"));
            $(".swiper-wrapper").animate({
                "left": -timew
            }, 200);
        };
    };

    function timesetl() {
        var j = swiper.index($(".swiper-slide-active"));
        var timew = fwidth * (j - 1);
        swiper.removeClass("swiper-slide-active");
        if (j == 0) {
            swiper.eq(num - 1).addClass("swiper-slide-active");
            pagination.eq(num - 1).addClass("swiper-active-switch");
            $(".swiper-wrapper").css({
                "left": -fwidth * (num - 1)
            }, 200);
        } else {
            swiper.eq(j - 1).addClass("swiper-slide-active");
            pagination.eq(j - 1).addClass("swiper-active-switch");
            $(".swiper-wrapper").animate({
                "left": -timew
            }, 200);
        };
    };

    $(".swiper-container").mouseover(function() {
        clearInterval(picTimer);
    });
    $(".swiper-container").bind("mouseout", function() {
        picTimer = setInterval(timeset, sec);
    });

    //左右滚动按钮执行函数
    $("#banner-right").click(function() {
        timeset()
    });
    $("#banner-left").click(function() {
        timesetl()
    });

    /*
    课程分类部分的代码设计
    鼠标滑过ul时，下拉菜单指示隐藏
    同时被滑过的li右边显示
     课程分类 hover显示
     */
    $(".lesson-classfiy-nav li").each(function(index) {
            $(this).mouseover(function() {
                //课程分类加高，下拉图标消失
                $(".lesson-classfiy-nav ul").css({
                    "height": "408px",
                    "overflow": "visible",
                    "border-bottom-width": "1px"
                });
                $(".lesson-classfiy-nav p").removeClass("line");
                //左边显示，颜色为黑色
                $(".lesson-list-show").eq(index).css("display", "block");
                $(this).find(".lesson-list-show a").css("color", "#333");
                //左边指示图标消失
                $(this).find("div:first").css({
                    "width": "213px",
                    "height": "38px",
                    "border-bottom": "1px solid #e4e4e4",
                    "box-shadow": "1px 1px 2px rgba(0,0,0,0.1)",
                    "border-top": "1px solid #e4e4e4",
                    "border-left": " 2px solid #35b558",
                    "padding-left": "18px",
                    "border-right": "3px solid #fff",
                    "background": "#fff",
                    "margin-left": "-2px",
                    "margin-top": "-1px"
                });
            }).mouseleave(function() {
                //课程分类加高，下拉图标消失
                $(".lesson-classfiy-nav ul").css({
                    "height": "305px",
                    "overflow": "hidden",
                    "border-bottom-width": "0"
                });
                $(".lesson-classfiy-nav p").addClass("line");
                //左边显示，颜色为黑色
                $(".lesson-list-show").eq(index).css("display", "none");
                $(this).find(".lesson-list-show a").css("color", "#333");
                //左边指示图标消失
                $(this).find("div:first").css({
                    "width": "208px",
                    "height": "37px",
                    "line-height": "37px",
                    "padding": "0 15px",
                    "font-size": "13px",
                    "color": "#333",
                    "border-bottom": "1px solid #f5f5f5",
                    "border-left": "1px solid #f5f5f5",
                    "background": "#fff url(./img/more-icon_d39346f.png) 186px center no-repeat",
                    "background-size": "6px 10px",
                    "cursor": "pointer",
                    "font-weight": "400"
                })
            })
        })
        /*
             课程推荐部分，导航栏hover的时候切换
             通过增加删除class On进行实现
         */
    $("#nav-hot li").each(function(index) {
            $(this).mouseover(function() {
                $("#nav-hot li").removeClass("on");
                $(this).addClass("on");
                $("#hot-lessonbox div.one-classfiy-lesson").css("display", "none");
                $("#hot-lessonbox div.one-classfiy-lesson").eq(index).css("display", "block");
            })
        })
        /*
            推荐部分代码动态设计
          lessonimg-box mouseover之后
         zhongji，lesson-infor，p状态发生改变
         do:延时
         */
    $("#hot-lessonbox ul li").each(function() {
        $(this).mouseover(function() {
            $(this).find(".zhongji").css("display", "block");
            $(this).find(".learn-number").css("display", "block");
            $(this).find(".lessonplay").css("display", "block");
            $(this).find(".lessonicon-box").css("bottom", "-2px");
            $(this).find(".lesson-infor").css({
                "height": "175px",
                "overflow": "visible"
            });
            $(this).find("p").css({
                "opacity": "1",
                "height": "52px",
                "display": "block"
            });
        }).mouseleave(function() {
            $(this).find(".zhongji").css("display", "none");
            $(this).find(".learn-number").css("display", "none");
            $(this).find(".lessonplay").css("display", "none");
            $(this).find(".lessonicon-box").css("bottom", "4px");
            $(this).find(".lesson-infor").css({
                "height": "88px",
                "overflow": "hidden"
            });
            $(this).find("p").css({
                "opacity": "0",
                "height": "0",
                "display": "none"
            });
        })
    })

    //实践路径图hover之后按钮变色边框变色
    $(".learn-card a").each(function() {
            $(this).mouseover(function() {
                $(this).find("#Waiting-btn").css({
                    "background-color": "#808080",
                    "color": "#000000"
                });
                $(this).find(".greenbtn2").css({
                    "background-color": "#35b558",
                    "color": "#ffffff"
                });
            }).mouseleave(function() {
                $(this).find(".greenbtn2").css({
                    "background-color": "#f3fff6",
                    "color": "#35b558"
                });
                $(this).find("#Waiting-btn").css({
                    "background-color": "#f5f5f5",
                    "color": "#808080"
                });
            })
        })
        //知识体系旁边的小问号
    $(".way").mouseover(function() {
        $(".way-infor").css("opacity", "1");
    }).mouseleave(function() {
        $(".way-infor").css("opacity", "0");
    })

    //底部微信hover之后显示扫码的图标
    $("#footer .search-share .share a.qq-icon").mouseover(function() {
        $("#footer .search-share .share a.qq-icon .weinxinpop").css("display", "block");
    }).mouseleave(function() {
        $("#footer .search-share .share a.qq-icon .weinxinpop").css("display", "none");
    })
})