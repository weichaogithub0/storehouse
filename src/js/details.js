! function () {
    //通过地址栏截取商品sid
    var goodssid = location.search.substring(1).split('=')[1];

    //ajax将sid传给后端，后端拿到sid对应商品的数据，前端回调函数渲染
    $.ajax({
        url: '../php/details.php',
        data: {
            sid: goodssid,
        },
        dataType: 'json',
    }).done(function (data) {
        $('.name').html(data.title);
        $('.spic img').attr('src', data.url);
        var strhtml = '';
        var arr = data.urls.split(',');
        $.each(arr, function (index, value) {//---
            strhtml += `
            <li><img
            src="${value}"></li>
            `
        })
        $('.pics').html(strhtml);
        $('.r-top span:nth-child(1)').html(data.title);
        $('.r-head span:nth-child(2)').html(data.price1);
        $('.r-head span:nth-child(4)').html(data.price2);
    })

    //pics的img,url传给小图
    $('.pics').on('mouseover', 'li', function () { //渲染的li事件委托给结构中的父级ul，真的好用------
        var url = $(this).find('img').attr('src');
        $('.spic img').attr('src', url);
        $(this).children('img').addClass('active');
        $(this).siblings().children('img').removeClass('active');
    })

    //放大镜   小放比小图===大放比大图
    //设置大放宽高
    var bili = $('#bpic').width() / $('.spic').width();
    $('.df').height(bili * $('.xf').height());
    $('.df').width(bili * $('.xf').width())
    //小放的鼠标跟随
    $('.spic').hover(function () {
        //鼠标进入小图，显示大小放
        $('.xf').css('visibility', 'visible');
        $('.df').css('visibility', 'visible');
        $(this).on('mousemove', function (ev) {
            var left = ev.pageX - $('.spic').offset().left - $('.xf').width() / 2;
            var top = ev.pageY - $('.spic').offset().top - $('.xf').height() / 2;
            if (left <= 0) {
                left = 0
            }
            if (left >= $('.spic').width() - $('.xf').width()) {
                left = $('.spic').width() - $('.xf').width()
            }
            if (top <= 0) {
                top = 0
            }
            if (top >= $('.spic').height() - $('.xf').height()) {
                top = $('.spic').height() - $('.xf').height()
            }
            $('.xf').css({ //像一些定位的值，可以直接以css形式，写进去
                left: left,
                top: top,
            })
            $('#bpic').css({
                left: -left * bili,
                top: -top * bili,
            })
        })
    }, function () {
        //鼠标离开小图，隐藏大小放
        $('.xf').css('visibility', 'hidden');
        $('.df').css('visibility', 'hidden');
    })
    //购物车相关--商品数目--cookie的建立
    //取元素，数量加减相关，提交按钮
    let $input = $('.right input');
    let $add = $('.add');
    let $reduce = $('.reduce');
    let $btn = $('.addtocar');
    let num = 1; //或者.val()
    $add.on('click', function () {
        num++
        $input.val(num)
        $reduce.html('-');
        $reduce.css('cursor', 'pointer');
        $reduce.css('background', '#eee');
    })
    $reduce.on('click', function () {
        num--
        if (num <= 1) {
            num = 1
            $reduce.html('');
            $reduce.css('cursor', 'default');
            $reduce.css('background', '#fff');
        }
        $input.val(num)
    })
    $input.on('blur', function () {
        num = Number($input.val());
        if (num > 1) {
            $reduce.html('-');
            $reduce.css('cursor', 'pointer');
            $reduce.css('background', '#eee');
        }
        else{
            $reduce.html('');
            $reduce.css('cursor', 'default');
            $reduce.css('background', '#fff');
        }
    })
    //提交数据，存商品sid及num入cookie---先取后存
    //准备sid数组和num数组
    let sidarr = [];
    let numarr = [];
    //得到原有cookie并转为数组
    function cookietoarray() { //'cookiesid cookienum即为键，其后的value为以逗号分隔的字符串
        if (getcookie('cookiesid') && getcookie('cookienum')) { //判断商品是第一次存还是多次存储
            sidarr = getcookie('cookiesid').split(','); //cookie商品的sid  
            numarr = getcookie('cookienum').split(','); //cookie商品的num
        }
    }
    //执行函数，覆盖sid数组，num数组，至此将原先两个sid、num的cookie转为两个sid、num数组
    cookietoarray();
    num = $input.attr("value");
    $btn.on('click', function () {
        var $index = $.inArray(goodssid, sidarr)
        //判断是否为首次添加
        if ($index != -1) {
            numarr[$index] = parseInt(numarr[$index]) + parseInt(num);
            //有了数组，存入cookie
            addcookie('cookienum', numarr.toString(), 10)
        }
        //否则cookie中不存在该商品的sid，为首次添加
        else {
            sidarr.push(goodssid);
            numarr.push(num);
            addcookie('cookienum', numarr.toString(), 10)
            addcookie('cookiesid', sidarr.toString(), 10)
        }
        var sum = 0;
        for (var i = 0; i < numarr.length; i++) {
            sum += parseInt(numarr[i])
        }
        $('#sum').html(sum)
    })

    function cookietoarray() {
        if (getcookie('cookiesid') && getcookie('cookienum')) {
            numarr = getcookie('cookienum').split(',');
            sidarr = getcookie('cookiesid').split(',');
        }
    };
    cookietoarray();
    var sum = 0;
    for (var i = 0; i < numarr.length; i++) {
        sum += parseInt(numarr[i])
    }
    $('#sum').html(sum)
    //delcookie(key)---弄乱了就以此清除cookie
    // delcookie('cookienum');
    // delcookie('cookiesid');
    //右上角购物车数目总和;

    //点击跳转购物车
    $('#car').on('click', function () {
        location.href = 'http://localhost/stage2-month2/New-carre/src/car.html'
    })
}()