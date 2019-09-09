! function () {
    //利用商品的sid、num及后端数据进行渲染------sid、num可以从cookie中获得传参。
    function goodslist(sid, num) {
        //利用ajax得到后端数据，遍历渲染，遍历时判断sid与传参是否相等，相等才渲染
        $.ajax({
            url: '../php/jialefudata.php',
            dataType: 'json',
        }).done(function (data) {
            $.each(data, function (index, value) {
                if (sid == value.sid) {
                    var $clonebox = $('.clone').clone(true, true);
                    $clonebox.find('.img').find('img').attr('src', value.url);
                    $clonebox.find('.img').find('img').attr('sid', value.sid); //---一定要传sid，否则cookie设置会找不到传值的位置
                    $clonebox.find('.infor').html(value.title);
                    $clonebox.find('.price').html(`￥${value.price1}.${value.price2}`);
                    $clonebox.find('.num').val(num);
                    $clonebox.find('.aprice').html('￥' + (num * Number(`${value.price1}.${value.price2}`)).toFixed(2));
                    $clonebox.find('.weight').html(`${num * Number(value.title.slice(-4,-1)).toFixed(2)}g`);
                    $clonebox.css('display', 'block');
                    $clonebox.removeClass('clone'); //后来创建的一定要移除clone类
                    $('.list').append($clonebox);
                }
            })
            priceweight_all(); //写在done回调的里面，才有实时更新的效果---卡
        })
    }

    //2.获取cookie，执行渲染列表的函数
    if (getcookie('cookiesid') && getcookie('cookienum')) {
        var s = getcookie('cookiesid').split(','); //数组sid
        var n = getcookie('cookienum').split(','); //数组num
        $.each(s, function (i, value) { //sid和num，这两个cookie里找到的数据，顺序一一对应，这两个参数用来渲染购物车中商品列表，既有商品信息，也有数量
            goodslist(s[i], n[i]);
        });
    }

    //3.算总价
    function priceweight_all() {
        var $sum = 0; //总价的初始值
        var $weight = 0; //总重的初始值
        var $nums = 0; //商品总个数
        $('.list>li').each(function (index, element) { //element是li里的每一个元素
            if ($(element).find('.cart-checkbox').prop('checked')) {
                $sum += Number($(element).find('.cart-checkbox').parent().find('.aprice').html().substring(1));
                // $weight+=Number($(element).find('.cart-checkbox').parent().find('.weight').html().substring(0,-1));
                $weight += Number(($(element).find('.cart-checkbox').parent().find('.weight').html().slice(0, -1)));
                //截取字符串，不要最后一位用slice---卡
                $nums += Number($(element).find('.cart-checkbox').parent().find('.num').val());
            }
        })
        $('.all li:nth-child(1) span').html('￥' + $sum.toFixed(2));
        $('.all li:nth-child(4) span').html($weight + 'g');
        $('.all li:nth-child(3) span').html('￥' + $sum.toFixed(2));
        $('.bar-right i').html(` ${$nums} 件`)
    }

    //4.全选操作
    //4.1全选控制
    $('.allsel').on('change', function () { //找到全选按钮，把全选按钮的checked状态值，传给每个checked功能按钮
        $('.list>li:visible').find(':checkbox').prop('checked', $(this).prop('checked'));
        $('.allsel').prop('checked', $(this).prop('checked'));
        priceweight_all(); //动态计算总价、总重
    });
    //4.2单选控制
    var $inputs = $('.list>li:visible').find(':checkbox'); //所有可见的li中check按钮
    $('.list').on('change', $inputs, function () { //事件的委托的this指向被委托的元素------事件委托在jQuery里的炫酷写法
        if ($('.list>li:visible').find('input:checkbox').length == $('.list>li:visible').find('input:checked').size()) {
            $('.allsel').prop('checked', true);
        } else {
            $('.allsel').prop('checked', false);
        }
        priceweight_all(); //动态计算总价、总重
    });

    //5.改变商品数量---影响单行总价，总价，以及cookie
    //5.1 add++
    $('.add').on('click', function () {
        var count = Number($(this).next().val());
        count++;
        if (count >= 99) {
            count = 99
        }
        $(this).next().val(count);
        $(this).parent().children('.aprice').html(sprice($(this), count)); //改变后的价格
        $(this).parent().children('.weight').html(sweight($(this), count)); //改变后的重量
        priceweight_all();
        setcookie($(this));
    })

    //5.2 reduce--
    $('.reduce').on('click', function () {
        var count = Number($(this).prev().val());
        count--;
        if (count <= 1) {
            count = 1
        }
        $(this).prev().val(count)
        $(this).parent().children('.aprice').html(sprice($(this), count)); //改变后的价格
        $(this).parent().children('.weight').html(sweight($(this), count)); //改变后的重量
        priceweight_all();
        setcookie($(this));
    })

    //5.3 手动设置--限定输入内容及范围
    $('.num').on('input', function () {
        var $reg = /^\d+$/g; //只能输入1到多个1-99间的数字
        var count = parseInt($(this).val()); //--注意输入的是字符串，要格式转换重新赋值
        if ($reg.test(count)) { //判断数字
            if (count >= 99) { //限定范围
                $(this).val(99);
            } else if (count <= 0) {
                $(this).val(1);
            } else {
                $(this).val(count);
            }
        } else { //不是数字
            $(this).val(1);
        }
        $(this).parent().children('.aprice').html(sprice($(this))); //改变后的价格
        $(this).parent().children('.weight').html(sweight($(this))); //改变后的重量
        priceweight_all();
        setcookie($(this));
    });

    //6.计算单行商品总价、总重赋值回单行商品,参数1为改变商品数目的对象，通过该对象，联系它的兄弟元素赋值，参数2为数目
    function sprice(obj) {
        return '￥' + (Number(obj.parent().find('.num').val()) * Number(obj.parent().children('.price').html().substring(1))).toFixed(2)
    }

    function sweight(obj) {
        return `${Number(obj.parent().find('.num').val()) * Number(obj.parent().children('.infor').html().slice(-4,-1)).toFixed(2)}g`
    }

    //7.操作商品数量改变后的cookie
    //7.1获取两组cookie，并数组化
    var arrsid = [];
    var arrnum = [];

    function cookietoarray() {
        if (getcookie('cookiesid') && getcookie('cookienum')) {
            arrsid = getcookie('cookiesid').split(',');
            arrnum = getcookie('cookienum').split(',');
        }
    }
    //7.2把改变后的num写入cookie，参数为使商品发生数目改变的元素对象,这个对象可以做很多事
    function setcookie(obj) {
        cookietoarray();
        var $sid = obj.parent().find('.img').find('img').attr('sid'); //通过这个对象找到sid，找到数组位置
        arrnum[$.inArray($sid, arrsid)] = obj.parent().find('.num').val(); //再通过这个对象找到input值，传进数组
        addcookie('cookienum', arrnum.toString(), 10); //数组要toString才能传进cookie，别忘了cookie的值是逗号分隔的字符串
    }

    //8.删除操作---包括删除cookie，以及删除li
    //8.0删除cookie的封装---需要知道删除的列表sid，及arrsid,这样才能删除
    function delcookie(sid, arrsid) {
        var $index = -1;
        $.each(arrsid, function (index, value) {
            if (sid === value) {
                $index = index;
            }
        })
        arrsid.splice($index, 1);
        arrnum.splice($index, 1);
        addcookie('cookiesid', arrsid.toString(), 10);
        addcookie('cookienum', arrnum.toString(), 10);
    }

    //8.1单个删除
    $('.list').on('click', '.del', function () { //事件委托
        cookietoarray();
        var sid = $(this).parent().find('.img').find('img').attr('sid');
        delcookie(sid, arrsid)
        $(this).parent().remove();
        priceweight_all();
        empty()
    })

    //8.2删除选中
    $('#del').on('click', function () {
        cookietoarray();
        if (confirm('确定删除吗亲？')) {
            $('.list li:visible').each(function () {
                if ($(this).find('.cart-checkbox').is(':checked')) { //选取checked属性值为checked的ele,写法是$(ele:checked)---
                    $(this).remove();
                    var sid = $(this).find('.img').find('img').attr('sid');
                    delcookie(sid, arrsid);
                }

            })
        }
        priceweight_all();
        empty()
    })

    //9.空购物车---cookie不存在时显示，存在时隐藏---页面刷新、删除单行、删除全部，执行该函数
    empty()

    function empty() {
        if (getcookie('cookiesid') && getcookie('cookienum')) {

            $('.empty').hide();
        } else {
            $('.empty').show();
        }
    }
}()

//重要思路梳理
//根据cookie中的sid、num,渲染出li，如果嫌结构麻烦，可以clone结构中的li，但结构中的li要隐藏，且clone出来的li要去除clone的class
//cookie取得后应数组化，将每个sid遍历传值给后端去数据库取值便于渲染

// 计算总价、总重，由于商品数量更改频繁，这个功能要封装函数，且在每个商品数量变化的地方调用
//要找到包含已选中按钮的li，然后取到价格、重量值进行累加，再赋值

//全选，全选按钮加类，一选全选；单选按钮加类，若选中的个数与单选总个数不一致，则全选不选

//cookie重置，包括改变和删除    所以这个功能也要封装函数
//改变：得到并数组化cookie，接着遍历sid数组，有和数组项相等的sid，找到这个索引，把数组中的数量改变，再添入数组
//数量加减的改变，和输入的改变，都是用最终改变的数量值，计算总价总重及改变cookie

//删除，包括删除单行和删除全部选中的，结构与cookie
//删除单行时，删除cookie，先获得再数组化，根据单行sid，遍历匹配找到index，把该位置splice裁减掉
//删除全部选中的，遍历每个选中的执行单行即可