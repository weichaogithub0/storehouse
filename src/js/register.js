! function () {
    //手机号码验证
    //正则
    var reg_p = /^1[3456789]\d{9}$/;
    $('.phone').on('blur', function () {
        if ($(this).val() === '') {
            $(this).parent().find('span').show();
            $(this).parent().find('span').html('手机号码不能为空');
        } else {
            if (reg_p.test($(this).val())) {
                $(this).parent().find('span').hide();
                $(this).parent().find('span').html('111');
            }
            if (!reg_p.test($(this).val())) {
                $(this).parent().find('span').show();
                $(this).parent().find('span').html('手机号码格式错误');
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
            $(this).parent().find('span').show();
            $(this).parent().find('span').html('验证码不能为空');
        } else {
            if ($('.yzm').val() === $('b').html()) {
                $('b').hide()
                $(this).parent().find('span').hide();
                $(this).parent().find('span').html('111');
            } else {
                $(this).parent().find('span').show();
                $(this).parent().find('span').html('验证码格式有误');
            }
        }

    })

    //密码框
    //正则
    var reg_pass = /^\S*([a-zA-Z]+\S*[0-9]+|[0-9]+\S*[a-zA-Z]+)\S*$/;
    $('.password').on('blur', function () {
        if ($(this).val() === '') {
            $(this).parent().find('span').show();
            $(this).parent().find('span').html('密码不能为空');
        } else {
            if (reg_pass.test($(this).val()) && $(this).val().length >= 8 && $(this).val().length <= 20) {
                $(this).parent().find('span').html('111');
                $(this).parent().find('span').hide();
            } else {
                $(this).parent().find('span').html('请输入8-20位的字母数字组合，字母需包含大小写');
                $(this).parent().find('span').show();
            }
        }
    })

    //重复密码框
    $('.repassword').on('blur', function () {
        if ($(this).val() !== '') {
            if ($(this).val() === $('.password').val()) {
                $(this).parent().find('span').html('111');
                $(this).parent().find('span').hide();
            } else {
                $(this).parent().find('span').html('两次密码输入不一致');
                $(this).parent().find('span').show();
            }
        }
    })

    //四者皆通过，点击button跳转页面，且通过后端提交注册数据到服务器
    $('button').on('click', function () {
        var $username = $('.phone').val();
        var $password = $('.password').val();
        if ($('.phone').parent().find('span').html() === '111' && $('.yzm').parent().find('span').html() === '111' &&
            $('.password').parent().find('span').html() === '111' && $('.repassword').parent().find('span').html() === '111') {
            //ajax  
            $.ajax({
                url: '../php/dataget.php',
                type:"post",
                data: {
                    username: $username,
                    password: $password,
                },                
                dataType:'json'
            }).done(function () {
                //页面跳转
                window.location.href = 'http://localhost/stage2-month2/New-carre/src/login.html'
            })
        }
    })
}()