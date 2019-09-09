! function () {
    //手机号码验证
    //正则
    var reg_p = /^1[3456789]\d{9}$/;
    $('#phone').on('blur', function () {
        if ($(this).val() === '') {
            $(this).parent().next().show();
            $(this).parent().next().html('手机号码不能为空');
        } else {
            if (reg_p.test($(this).val())) {
                $(this).parent().next().hide();
                $(this).parent().next().html('111');
            }
            if (!reg_p.test($(this).val())) {
                $(this).parent().next().show();
                $(this).parent().next().html('手机号码格式错误');
            }
        }
    });

    //验证码
    //生成函数
    function yz() {
        var arr = []
        var str = ''
        for (var a = 97; a <= 122; a++) {
            arr.push(a)
        }
        for (var b = 65; b <= 90; b++) {
            arr.push(b)
        }
        for (var c = 48; c <= 57; c++) {
            arr.push(c)
        }
        for (d = 1; d <= 5; d++) {
            str += String.fromCharCode(arr[rannum(0, 61)])
        }
        return str
    }

    function rannum(a, b) {
        var n;
        if (a > b) {
            n = Math.round(Math.random() * (a - b)) + b;
            return n
        } else {
            n = Math.round(Math.random() * (b - a)) + a;
            return n
        }
    }

    $('.yzm').on('focus', function () {
        $('b').html(yz());
        $('b').show();
    })

    $('.yzm').on('blur', function () {
        if ($('.yzm').val() === '') {
            $(this).parent().next().show();
            $(this).parent().next().html('验证码不能为空');
        } else {
            if ($('.yzm').val() === $('b').html()) {
                $('b').hide()
                $(this).parent().next().hide();
                $(this).parent().next().html('111');
            } else {
                $(this).parent().next().show();
                $(this).parent().next().html('验证码格式有误');
            }
        }
    })
    //前二项皆通过，点击.sub，通过后端提交数据到服务器,进行验证，验证成功则跳转页面

    $('.sub').on('click', function () {

        var $username = $('#phone').val();
        var $password = $('.password').val();
        if ($('#phone').parent().next().html() === '111' && $('.yzm').parent().next().html() === '111') {

            //ajax  
            $.ajax({
                url: '../php/datatake.php',
                type: "post",
                data: {
                    username: $username,
                    password: $password,
                },
                dataType: 'json'
            }).done(function () {
                //页面跳转
                window.location.href = 'http://localhost/stage2-month2/New-carre/src/index.html'
            })
        }

    })
}()