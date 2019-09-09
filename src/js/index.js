! function () {

    //拼接数据
    $.ajax({
        url: '../php/jialefudata.php',
        dataType: 'json',
    }).done(function (data) {
        console.log(data)
        var $html = '';
        $.each(data, function (index, value) { //渲染时超链接href作用1是跳转详情页，2是地址的哈希值就是商品的sid值
            $html += `<li><a href="details.html?sid=${value.sid}" target="_blank"><img src="${value.url}" alt="">
            <span>
                满赠
            </span><br>
            <span>${value.title}</span>
            <span>￥${value.price1}.${value.price2}</span></a>
            </li>`;
        })
        $('.lunbo-new-box ul').html($html)
    })

    //大轮播图
    //取元素
    let $ul = $('.lunbo-ul');
    let $ulli = $('.lunbo-ul li');
    let $olli = $('.lunbo-btn li');
    //按钮效果
    $olli.on('click', function () {
        clearInterval(timer);
        $(this).addClass('l-active').siblings().removeClass('l-active');
        let $index = $(this).index();
        $ul.animate({
            left: -($index) * $ulli.width(),
        })
        timer = setInterval(function () {
            var $index = $('.l-active').index();
            $index++;
            if ($index <= 9) {
                $olli.eq($index).addClass('l-active').siblings().removeClass('l-active');
                $ul.animate({
                    left: -($index) * $ulli.width(),
                })
            } else {
                $index = 0;
                $olli.eq($index).addClass('l-active').siblings().removeClass('l-active');
                $ul.animate({
                    left: -(10) * $ulli.width(),
                }, function () {
                    $ul.css({
                        left: 0 * $ulli.width(),
                    })
                })
            }
        }, 4000)
    })

    //定时器效果
    var timer = setInterval(function () {
        var $index = $('.l-active').index();
        $index++;
        if ($index <= 9) {
            $olli.eq($index).addClass('l-active').siblings().removeClass('l-active');
            $ul.animate({
                left: -($index) * $ulli.width(),
            })
        } else {
            $index = 0;
            $olli.eq($index).addClass('l-active').siblings().removeClass('l-active');
            $ul.animate({
                left: -(10) * $ulli.width(),
            }, function () {
                $ul.css({
                    left: 0 * $ulli.width(),
                })
            })
        }
    }, 4000)

    //小轮播图
    let $sul = $('.lunbo-pics');
    let $sulli = $('.lunbo-pics li');
    let $solli = $('.choosing-btn li');
    $solli.on('click', function () {
        clearInterval(stimer);
        $(this).addClass('c-active').siblings().removeClass('c-active');
        let $sindex = $(this).index();
        $sul.animate({
            left: -($sindex) * $sulli.width(),
        })
        stimer = setInterval(function () {
            var $sindex = $('.c-active').index();
            $sindex++;
            if ($sindex <= 1) {
                $solli.eq($sindex).addClass('c-active').siblings().removeClass('c-active');
                $sul.animate({
                    left: -($sindex) * $sulli.width(),
                })
            } else {
                $sindex = 0;
                $solli.eq($sindex).addClass('c-active').siblings().removeClass('c-active');
                $sul.animate({
                    left: -(2) * $sulli.width(),
                }, function () {
                    $sul.css({
                        left: 0 * $sulli.width(),
                    })
                })
            }
        }, 5000)
    })

    //定时器效果
    var stimer = setInterval(function () {
        var $sindex = $('.c-active').index();
        $sindex++;
        if ($sindex <= 1) {
            $solli.eq($sindex).addClass('c-active').siblings().removeClass('c-active');
            $sul.animate({
                left: -($sindex) * $sulli.width(),
            })
        } else {
            $sindex = 0;
            $solli.eq($sindex).addClass('c-active').siblings().removeClass('c-active');
            $sul.animate({
                left: -(2) * $sulli.width(),
            }, function () {
                $sul.css({
                    left: 0 * $sulli.width(),
                })
            })
        }
    }, 5000)

    //顶部动态导航的出现与消失
    let $fixed = $('#fixed');
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 300) {
            $fixed.animate({
                top: 0,
            })
        } else {
            $fixed.stop(true).css({ //勿忘这个stop(true),十分重要
                top: -68,
            })
        }
    })

    //侧边楼梯的出现与消失
    let $aside_fixed = $('#aside_fixed');
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 1400) {
            $aside_fixed.show();
        } else {
            $aside_fixed.hide();
        }
    })

    //商品列表的轮播效果-渲染待
    //取元素
    let $new_box = $('.lunbo-new-box');
    let $left = $('.left-btn');
    let $right = $('.right-btn');
    let $nul = $('.lunbo-new-box ul');
    let $nuli = $('.lunbo-new-box ul li');
    let num = 0;

    //右箭头悬停事件---事件委托
    $right.on('mouseover', function () {
        var rtimer = setInterval(function () {
            num++;
            if (num > 4) {
                num = 4
            }
            $nul.stop(true).animate({
                left: -num * 232,
            })
            if ($nul.position().left - 232 <= 0) {
                $left.show()
            }
        }, 1500)
        $right.on('mouseout', function () {
            clearInterval(rtimer)
        })
    })
    $left.on('mouseover', function () {
        var ltimer = setInterval(function () {
            num--
            if (num < 0) {
                num = 0
            }
            $nul.stop(true).animate({
                left: -num * 232,
            })
            if ($nul.position().left >= -232) {
                $left.hide()
            }
        }, 1500)
        $left.on('mouseout', function () {
            clearInterval(ltimer)
        })
    })

    //楼梯效果---这里把每个楼层高度简化相同，若不同在楼层对应楼梯时，要用到switch
    //取元素
    let $louti = $('.louti li');
    let l_index;
    let $_index;
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 1400) {
            l_index = Math.floor(($(this).scrollTop() - 1820) / 530);
            if (l_index >= 6) {
                l_index = 6
            }
            if (l_index < 0) {
                l_index = -999
            }
            $louti.eq(l_index).addClass('active').siblings().removeClass('active');
        }
    })
    $louti.on('click', function () {
        if ($(this).index() <= 6) {
            $(this).addClass('active').siblings().removeClass('active');
            $_index = $('.active').index();
            var $top = 1940 + $_index * 530;
            $('html,body').stop(true).animate({
                scrollTop: $top,
            })
        } else if ($(this).index() == 7) {
            if ($(this).hasClass('active_code')) { //hasClass作判断，has则是筛选过滤
                $(this).removeClass('active_code')
                $('#code').hide()
            } else {
                $(this).addClass('active_code')
                $('#code').show()
            }
        } else if ($(this).index() == 8) {
            $('html,body').stop(true).animate({
                scrollTop: 0,
            })
        }
    })
}()