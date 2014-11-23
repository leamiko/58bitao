define(function(require,exports,module){
    return function(){
    a = $;
    XDTEMPLATE.picFeed='<li iid="{id}"><a href="javascript:;" class="close"></a><img src="{src}" /></li>';
    
    XD.Alert_Bg_New = function(id){
        if (a("#" + id).size){
            j_l = '<em class="j_left"></em>';
            j_t = '<em class="j_top"></em>';
            a("#" + id).addClass("alert_bg_new");
            if (id == "alert_face"){
                a("#" + id).find(".alert_box").before(j_t);

            }else{
                if (a.browser.msie) {
                    if (a.browser.version == "6.0" || a.browser.version == "7.0") {
                        return false;
                    }
                }
                a("#" + id).find(".alert_box").before(j_l);
            }

        }
    };

    XD.FX_Add_Face_Init = function() {
        var b = null,
        d = null,
        e = null,
        i = !1;
        a(".add_face").live("click",
        function() {
			if (XDPROFILE.uid == '') {
				XD.Globe_Check_Login();
				return false;
			}
            if (a("#alert_face").size()){
                a("#alert_face").remove();
            }

            var f = a(this).attr("w");
            (i = f == "fw" || f == "sm" || f == "at_ta" || f == "item" || f == "order" || f == "acc" || f == "follow") || a(".alert_bg").remove();
            clearTimeout(b);

            var c = XDTEMPLATE.lightBox,
            c = c.replace(/{title}/g, XDFACE.faceTab)
                .replace(/{body}/g, XDFACE.facePage.f1)
                .replace(/{id}/g, "alert_face");

            a("body").append(c);
            e = a("#alert_face");
            var c = a(this).offset(),
            j = 25;
            XD.Alert_Bg_New("alert_face");
            e.css({
                top: c.top + j - 5 + "px",
                left: c.left - 435 + "px"
            });
            f == "album_rpl" && e.css({
                top: c.top + j + "px",
                left: c.left - 400 + "px"
            });
            e.show();
            switch (f) {
            case "tpk":
            case "evt":
            case "item":
                //item页面输入框
                d = a("#pub_content");
                break;
            case "pb":
                //动态页面输入框
                d = a(this).parents(".pub_edit").find("#pb_content");
                break;
            case "f":
                d = a(this).parents(".pub-area").find(".pub-txt");
                break;
            case "fw":
                d = a("#alert_forward .fw_content");
                break;
            case "cm":
                d = a(this).next(".reply_content");
                break;
            case "newtpk":
                d = a("#topic_con textarea");
                break;
            case "single":
                d = a("#comment_box .comment_content");
                break;
            case "singlef":
                d = a(".single_talk .forward_content");
                break;
            case "share":
                d = a("#publish_editor");
                break;
            case "sm":
                d = a("#lb_message .sm_content");
                break;
            case "at_ta":
                d = a("#lb_home_at_ta .at_content");
                break;
            case "lpt":
                d = a(".lbp_box .pub_txt");
                break;
            case "bookwall":
                d = a("#reply_body .rep_cont");
                break;
            case "order":
                d = a("#alert_share .pub_text");
                break;
            case "follow_add":
                d = a("#lb_album_add .content_test");
                break;
            case "addalbum":
                d = a(this).parents(".content").find(".album_all");
                break;
            case "album_rpl":
                d = a(this).parents(".pub_box_all").find(".txt");
                break;
            case "cover_rpl":
                d =
                a(this).parents(".pub_box").find(".txt");
                break;
            case "acc":
                d = a("#lb_fillalbum .lb_edit_box .cont")
            }
            b = setTimeout(function(){e.fadeOut()}, 3E3);
            e.hover(function() {
                clearTimeout(b);
                e.show()
            },
            function() {
                clearTimeout(b);
                b = setTimeout(function() {e.fadeOut()}, 500)
            })
        });

        //表情框的表情 目前只有“默认”标签
        a("#alert_face .alert_top li a").live("click",
        function() {
            a("#alert_face .alert_top li").removeClass("c");
            a(this).parent().addClass("c");
            a("#alert_face .alert_content").html(XDFACE.facePage["f" + a(this).parent().attr("f")])
        });

        //关闭按钮
        a("#alert_face .alert_close").live("click",
        function() {
            a("#alert_face").remove()
        });

        //点击表情在输入框中输入相应的文本
        a("#alert_face .alert_content li a").live("click",
        function() {
            var f = d.val();
            if(f == '你也可以顺便说点什么 O(∩_∩)O'){
                f = '';
            }
            d.focus();
            var c = "[" + a(this).parent().attr("title") + "]";

            if (typeof document.selection != "undefined") {
                document.selection.createRange().text = c;
            } else {
                var j = d[0].selectionStart;
                d.val(f.substr(0, j) + c + f.substring(j, f.length));
                d[0].setSelectionRange(j + c.length, j + c.length)
            }
            //点击表情后关闭
            a("#alert_face").remove();
        })
    };

    //share picture
    XD.FX_Add_Picture_Init = function() {
        var pSort = "",
            picNum = 0;
        XD.FX_Shuo_Pic_Array = new Array();
        XD.FX_Bao_Pic_Array = new Array();
        XD.FX_Shai_Pic_Array = new Array();
        XD.FX_Zhe_Pic_Array = new Array();

        a(".add_file").live("click",
        function() {
            $(".go_sun").hide();
            var lock = false; //锁住文件上传表单多次触发change事件

            if (!XD.Globe_Check_Login()) {
                return ;
            }
        
            var w = a(this).attr("w");
            pSort = a(this).attr("sort");
            if (pSort == "ss"){
                picNum = XD.FX_Shuo_Pic_Array.length;
                pub_type = a("#pub_say_say");
            }else if (pSort == "bb"){
                picNum = XD.FX_Bao_Pic_Array.length;
                pub_type = a("#pub_bao_bei");
            }else if (pSort == "sd"){
                picNum = XD.FX_Shai_Pic_Array.length;
                pub_type = a("#pub_shai_dan");
            }else if (pSort == "zk"){
                picNum = XD.FX_Zhe_Pic_Array.length;
                pub_type = a("#pub_zhe_kou");
            }

            if (picNum > 3) {
                alert("每次最多只能上传4张图片");
                return false;
            } else {
                a(".picUploadForm .add_file").change(function() {
                    if (lock) return

                    lock = true;

                    var picext = XDTOOL.getPicExtension($(this).val());
                    if (picext != 'jpg' && picext != 'gif' && picext != 'jpeg' && picext != 'png') {
                        alert('图片格式暂不支持');
                        return ;
                    }

                    var g = a(this);
                    setTimeout(function() {
                        var uploadForm = g.parents(".picUploadForm");
                        var uploadIframe =
                            '<div style="display: block;">'
                            + '<iframe frameborder="0" name="ifr_picup" id="ifr_picup" src="about:blank"></iframe>'
                            + '</div>';

                        //如果iframe不存在则append
                        a("#ifr_picup").size() == 0 && a("body").append(uploadIframe);

                        //为表单添加target属性指向iframe，并提交
                        uploadForm.attr("target", "ifr_picup");
                        uploadForm.submit();

                        var img_loading =
                            '<li class="p_b_loading" style="border-style:dashed;">'
                            + '<a class="close" href="javascript:;"></a>'
                            + '<img src="'+__U_STATIC__+'/img/zone/pub_loading_img.gif" />'
                            + '</li>';

                        if (w == 'pb') {
                            if (pub_type.find(".pub_img_box .pub_img")[0]) {
                                pub_type.find(".pub_img_box .pub_img").append(img_loading);
                            } else {
                                pub_type.find(".pub_img_box").append('<ul class="pub_img">' + img_loading + '</ul>');
                            }
                        }

                        //insert pic
                        window.publish_photo = function(code, msg, pid, picthumb) {
                            if (code != 1001) {
                                alert(msg);
                            } else {
                                var picurl = picthumb + "_100x100." + XDTOOL.getPicExtension(picthumb);
                                var li = XDTEMPLATE.picFeed.replace(/{src}/g, picurl).replace(/{id}/g, pid);

                                if (w == 'pb') {
                                    var background_load =
                                        '<div style = "display:none" id = "background_load">'
                                        + '<img src = "" />'
                                        + '</div>';

                                    //加载图片
                                    a('body').append(background_load);
                                    //图片加载完成后的操作
                                    a('#background_load img').attr('src', picurl).load(function() {
                                        if (pSort == "ss")
                                            XD.FX_Shuo_Pic_Array.push(pid);
                                        else if (pSort == "bb")
                                            XD.FX_Bao_Pic_Array.push(pid);
                                        else if (pSort == "sd")
                                            XD.FX_Shai_Pic_Array.push(pid);
                                        else if (pSort == "zk")
                                            XD.FX_Zhe_Pic_Array.push(pid);

                                        pub_type.find('.p_b_loading').remove();
                                        pub_type.find('.pub_img_box .pub_img').append(li);
                                        a('#background_load').remove();
                                    });
                                }
                            }
                        }
                    }, 0)
                })
            }
        });

        // delete pic
        a(".pub_img_box .pub_img li .close").live("click", function() {
            delIid = function (arr,iid){
                var brr = new Array();
                if (arr.length == 1){
                    arr.pop();
                    brr = arr ;
                } else {
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i] != iid) {
                            brr.push(arr[i]);
                        }
                    }
                }
                return brr;
            };
            var parent = a(this).parents("li"),
                iid = a(this).parent().attr("iid");
            if (pSort == "ss"){
                XD.FX_Shuo_Pic_Array = delIid(XD.FX_Shuo_Pic_Array,iid);
            }else if (pSort == "bb"){
                XD.FX_Bao_Pic_Array = delIid(XD.FX_Bao_Pic_Array,iid);
            }else if (pSort == "sd"){
                XD.FX_Shai_Pic_Array = delIid(XD.FX_Shai_Pic_Array,iid);
            }else if (pSort == "zk"){
                XD.FX_Zhe_Pic_Array = delIid(XD.FX_Zhe_Pic_Array,iid);
            }
            if (a(this).parents("ul").find("li").size() == 1) {
                a(this).parents("ul").remove();
            } else {
                a(this).parents("li").remove();
            }
            a('#background_load').remove();
        })
    };

    //get baobei_url
    XD.FX_Add_Item_Url = function(top,left) {
        var b = XDTEMPLATE.lightBox,
            b = XDTEMPLATE.lightBox.replace(/{title}/g, "添加宝贝地址").replace(/{id}/g, "alert_item").replace(/{body}/g, XDTEMPLATE.addItemStart);
        a("body").append(b);
        var g = a("#alert_item"),
            c = a(this).offset();
        XD.Alert_Bg_New("alert_item");
        g.css({
            top: top,
            left: left
        });
        g.show();
        g.find(".alert_close").click(function() {
            g.remove()
        });
        g.find(".text").focus();
    };

    //share baobei
    XD.FX_Add_Item_Init = function() {
        a(".add_item").live("click",
        function() {
            if(a("#alert_item").length != 0){
                return false;
            }
            var w = a(this).attr("w"),
                c = a(this).offset(),
                top = c.top + 14 + "px",
                left = c.left + 93 + "px";
            var pub_img = a(this).parents(".pub_img");
            if (XD.Globe_Check_Login()) {
                XD.FX_Add_Item_Url(top,left);
                a("#alert_item").bind("keydown", function(key){
                    key.keyCode == 13 && a("#alert_item .button").click();
                });
                var str = a("#alert_item .alert_content").html();
                a("#alert_item .button").click(function() {
                    var but = a(this);
                    if (but.data("isSubmit") != 1) {
                        var d = XDTOOL.trim(a("#alert_item .text").val());

                        if (d == "") {
                            alert("请填写商品地址");
                            return false;
                        }

                        a("#alert_item .alert_content").html(XDTEMPLATE.lightBoxLoading);
                        a("#alert_item .alert_close").click(function() {
                            a("#alert_item").remove()
                        });

                        but.data("isSubmit", 1);

                        m = a.ajax({
                            url: "/shareajax",
                            type: "POST",
                            timeout: 6E4,
                            data: {
                                action:'ItemUpload',
                                args:{goodsurl: d}
                            },
                            dataType: "json",
                            success: function(b) {
                                if (b == null || b == ""){
                                    alert(XDLANG.msgTimeout);
                                    a("#alert_item").remove();
                                } else {
                                    var c = b.status.msg;
                                    if (b.status.code == 1001) {
                                        var b = b.result,
                                            cid = b.cid,
                                            click_url = b.click_url,
                                            is_mailfree = b.is_mailfree,
                                            props_name = b.props_name,
                                            num_iid = b.num_iid,
                                            pic_url = b.pic_url,
                                            pic_small = b.pic_url,
                                            mall_sid = b.mall_sid,
                                            mall_url = b.mall_url,
                                            refprice = b.refprice;

                                        if (b.pic_small != void 0) pic_small = b.pic_small;
                                        var title = b.title, price = b.price,
                                            back = b.back == void 0 ? null: b.back,
                                            shop_sid = b.shop_sid;

                                        var callback = function(){
                                            var box = XDTEMPLATE.addItemResult
                                                .replace(/{src}/g, pic_small)
                                                .replace(/{title}/g, title)
                                                .replace(/{price}/g, price || "");

                                            a("#alert_item .alert_content").html(box);

                                            var s = function() {
                                                    var b = but.attr("w"),
                                                        c = XDTEMPLATE.itemFeed.replace(/{src}/g, pic_small).replace(/{id}/g, num_iid);
                                                    if (w == "pb") {
                                                        pub_img.find("li").remove();
                                                        pub_img.append(c);
                                                    }
                                                    c = {
                                                        cid:'',
                                                        click_url:'',
                                                        is_mailfree:'',
                                                        props_name:'',
                                                        num_iid:"",
                                                        title:"",
                                                        price:"",
                                                        back:"",
                                                        shop_sid:"",
                                                        pic_url:"",
                                                        pic_small:"",
                                                        mall_sid:'',
                                                        mall_url:'',
                                                        refprice:''
                                                    };
                                                    c.cid = cid;
                                                    c.click_url = click_url;
                                                    c.is_mailfree = is_mailfree;
                                                    c.props_name = props_name;
                                                    c.num_iid = num_iid;
                                                    c.title = title.replace(/\\/g, "\\\\").replace(/\"/g, '\\"');
                                                    c.price = price;
                                                    c.back = back;
                                                    c.shop_sid = shop_sid;
                                                    c.pic_url = pic_url;
                                                    c.pic_small = pic_small;
                                                    c.mall_sid = mall_sid;
                                                    c.mall_url = mall_url;
                                                    c.refprice = refprice;
                                                    w == "pb" && (XD.FX_Item_Bao_Array = c);
                                                    a("#alert_item").remove();
                                                },
                                                p = 3,
                                                y = setInterval(function() {
                                                    p--;
                                                    if (p == 0){
                                                        clearInterval(y);
                                                        a("#alert_item")[0] && s();
                                                    }
                                                    a("#alert_item .queren input").val("确　定（" + p + "）")
                                                }, 1E3);

                                            a("#alert_item .queren input").click(s)
                                        }

                                        if (b.mall_sid) {
                                            callback();
                                        } else {
                                            $("body").taoapiclient({
                                                method:'taobao.taobaoke.widget.items.convert',
                                                fields:'commission',
                                                num_iids:b.num_iid,
                                                appkey:12024311,
                                                callback:function(resp) {
                                                    if (resp.code == 1000 && resp.data.taobaoke_items) {
                                                        var item = resp.data.taobaoke_items.taobaoke_item[0];
                                                        if (b.is_virtual == 'false') {
                                                            back = parseFloat(item['commission']) * 0.5;
                                                            back = back.toFixed(2);
                                                        }
                                                    }

                                                    callback();
                                                }
                                            });
                                        }
                                    } else {
                                        alert(c);
                                        a("#alert_item .content").html(str)
                                    }
                                }
                            },
                            error: function(a, b) {
                                "timeout" == b && (alert(XDLANG.msgTimeout), a("#alert_item").remove())
                            },
                            complete: function() {
                                but.removeData("isSubmit")
                            }
                        })
                    }

                });
            }
        });

        //  delete baobei
        a("#pub_bao_bei .pub_img_default .pub_img li .close").live("click",function(){
            str = '<li class="p_i_default"><a class="add_item" href="javascript:;"';
            str += ' w' + '="pb">添加宝贝</a></li>';
            a(this).parents(".pub_img").html(str);
            XD.FX_Item_Bao_Array = {};
        });
    };


    //get zhekou_url
    XD.FX_Add_Zhe_Url = function(top,left) {
        var b = XDTEMPLATE.lightBox,
            b = XDTEMPLATE.lightBox.replace(/{title}/g, "添加折扣地址")
                .replace(/{id}/g, "alert_item")
                .replace(/{body}/g, XDTEMPLATE.addZheStart);

        a("body").append(b);
        var g = a("#alert_item"), c = a(this).offset();
        XD.Alert_Bg_New("alert_item");
        g.css({
            top: top,
            left: left
        });
        g.show();
        g.find(".alert_close").click(function() {
            g.remove()
        });
        g.find(".text").focus();
    };

    //share zhekou
    XD.FX_Add_Zhe_Init = function() {
        var zprice_str = '<input type="text" value="">';
        var zhe_addbox_tpl =
            '<div class="zhe_info">'
            + '<div class="z_img"><img src="{pic_url}"></div>'
            + '<div class="z_info">'
            + '<p class="blu">{title}</p>'
            + '<p>{zhe_time_str}</p>'
            + '<p><span class="gray_2">原价：<del>{price}</del>元</span><span>现价：{zprice} 元</span></p>'
            + '<a class="alert_but">确认(3)</a>'
            + '</div>'
            + '</div>';

        a(".add_zhe").live("click",
            function() {
                var w = a(this).attr("w"),
                    c = a(this).offset(),
                    top  = c.top + 14 + "px",
                    left = c.left + 93 + "px";

                if(a("#alert_item").length != 0){
                    return false;
                }
                var pub_img = a(this).parents(".pub_img");

                XD.FX_Add_Zhe_Url(top,left);
                a("#alert_item").bind("keydown", function(key){
                    key.keyCode == 13 && a("#alert_item .button").click();
                });

                a("#alert_item .button").bind("click",function() {
                    var but = a(this);
                    if (but.data("isSubmit") != 1) {
                        var d = XDTOOL.trim(a("#alert_item .text").val());
                        if (d == "") {
                            alert("请填写折扣商品地址");
                            return false;
                        }
                        if (!XD.Globe_Item_URL_Support(d)) {
                            alert("请填写正确的折扣商品地址");
                            return false;
                        }

                        a("#alert_item .alert_content").html(XDTEMPLATE.lightBoxLoading);
                        a("#alert_item .alert_close").click(function() {
                            a("#alert_item").remove();
                        });
                        but.data("isSubmit", 1);

                        m = a.ajax({
                            url: "/shareajax",
                            type: "POST",
                            timeout: 6E4,
                            data: {
                                action:'ItemUpload',
                                args:{zheurl: d}
                            },
                            dataType: "json",
                            success: function(b) {
                                if (b == null || b == ""){
                                    alert(XDLANG.msgTimeout);
                                    a("#alert_item").remove();
                                } else {
                                    if (b.status.code == 1001) {
                                        var zhe_return_data  = b.result,
                                            start_time  = zhe_return_data.start_time,
                                            end_time    = zhe_return_data.end_time,
                                            zprice      = zhe_return_data.zprice;

                                        $("body").taoapiclient({
                                            method:'taobao.taobaoke.widget.items.convert',
                                            fields:'commission',
                                            num_iids:zhe_return_data.num_iid,
                                            appkey:12024311,
                                            callback:function(resp) {
                                                if (resp.code == 1000 && resp.data.taobaoke_items) {
                                                    var item = resp.data.taobaoke_items.taobaoke_item[0];
                                                    if (zhe_return_data.is_virtual == 'false') {
                                                        zhe_return_data.back = parseFloat(item['commission']) * 0.5;
                                                        zhe_return_data.back = zhe_return_data.back.toFixed(2);
                                                    }
                                                }

                                                var confirm_zhe_data = function() {
                                                    var c = XDTEMPLATE.itemFeed
                                                        .replace(/{src}/g, zhe_return_data.pic_small)
                                                        .replace(/{id}/g, zhe_return_data.num_iid);

                                                    if (w == "pb") {
                                                        pub_img.find("li").remove();
                                                        pub_img.append(c);
                                                    }

                                                    var post_data = {
                                                        cid:        zhe_return_data.cid,
                                                        click_url:  zhe_return_data.click_url,
                                                        is_mailfree:zhe_return_data.is_mailfree,
                                                        num_iid:    zhe_return_data.num_iid,
                                                        title:      zhe_return_data.title.replace(/\\/g, "\\\\").replace(/\"/g, '\\"'),
                                                        price:      zhe_return_data.price,
                                                        shop_sid:   zhe_return_data.shop_sid,
                                                        pic_url:    zhe_return_data.pic_url,
                                                        pic_small:  zhe_return_data.pic_small,
                                                        num:        zhe_return_data.num,
                                                        back:       zhe_return_data.back,
                                                        props_name: zhe_return_data.props_name,

                                                        start_time: start_time,
                                                        end_time:   end_time,
                                                        zprice:     zprice
                                                    };

                                                    w == "pb" && (XD.FX_Item_zhe_Array = post_data);
                                                    a("#alert_item").remove();
                                                };

                                                //生成日期选择框的options
                                                var day_options = function(start_timestamp){
                                                    start_timestamp *= 1000;
                                                    var this_time = new Date();
                                                    var options_str = '';

                                                    //今天及其后6天
                                                    for (var i = 0; i < 7; i++) {
                                                        this_time.setTime(start_timestamp);
                                                        var tmp_year  = this_time.getFullYear();
                                                        var tmp_month = this_time.getMonth();
                                                        var tmp_day   = this_time.getDate();

                                                        var tmp_time_str =
                                                            (tmp_month + 1) + '月' + tmp_day + '日';

                                                        var tmp_timestamp =
                                                            (new Date(tmp_year, tmp_month, tmp_day)).getTime();

                                                        if (i == 0) {
                                                            options_str += '<option selected = "selected" value = "'
                                                                + tmp_timestamp + '">';
                                                        } else {
                                                            options_str += '<option value = "' + tmp_timestamp + '">';
                                                        }
                                                        options_str += tmp_time_str + '</option>';
                                                        start_timestamp += 3600 * 24 * 1000;
                                                    }

                                                    return options_str;
                                                }

                                                //生成小时选择框的options
                                                var hour_options = function(start_timestamp){
                                                    start_timestamp *= 1000;
                                                    var options_str = '';
                                                    var now = new Date();
                                                    now.setTime(start_timestamp);

                                                    var cur_hour = now.getHours();
                                                    var cur_minutes = now.getMinutes();
                                                    if (cur_minutes % 15 > 7 && cur_minutes > 45) {
                                                        cur_hour += 1;
                                                    }

                                                    if (cur_hour < 9) {
                                                        cur_hour = 9;
                                                    } else if (cur_hour > 22) {
                                                        cur_hour = 22;
                                                    }

                                                    for (var i = 9; i < 23; i++) {
                                                        var tmp_min_second = 3600 * i * 1000;

                                                        if (i == cur_hour) {
                                                            options_str += '<option selected = "selected" value = "'
                                                                + tmp_min_second + '">' + i + '</option>';
                                                        } else {
                                                            options_str += '<option value = "'
                                                                + tmp_min_second + '">' + i + '</option>';
                                                        }
                                                    }

                                                    return options_str;
                                                }

                                                //生成分钟选择框的options
                                                var min_options = function(start_timestamp){
                                                    start_timestamp *= 1000;
                                                    var options_str = '';
                                                    var now = new Date();
                                                    now.setTime(start_timestamp);

                                                    var cur_minutes = now.getMinutes();

                                                    if (cur_minutes % 15 > 7) {
                                                        cur_minutes += (15 - cur_minutes % 15);
                                                    } else {
                                                        cur_minutes -= cur_minutes % 15;
                                                    }

                                                    for (var i = 0; i < 60; i += 15) {
                                                        if (i == cur_minutes) {
                                                            options_str += '<option selected = "selected" value = "'
                                                                + 60 * i * 1000 + '">' + i + '</option>';;
                                                        } else {
                                                            options_str += '<option value = "'
                                                                + 60 * i * 1000 + '">' + i + '</option>';;
                                                        }
                                                    }

                                                    return options_str;
                                                }

                                                var zhe_time_str = '';
                                                if (zhe_return_data.real_zhe) {
                                                    var time_obj = new Date();
                                                    time_obj.setTime(start_time * 1000);

                                                    zhe_time_str = (time_obj.getMonth() + 1) + '月'
                                                        + time_obj.getDate() + '日 '
                                                        + time_obj.getHours() + ':'
                                                        + time_obj.getMinutes();

                                                    time_obj.setTime(end_time * 1000);

                                                    zhe_time_str += ' - ' + (time_obj.getMonth() + 1) + '月'
                                                        + time_obj.getDate() + '日 ';
                                                    zhe_time_str = '折扣时间：' + zhe_time_str;
                                                } else {
                                                    zhe_time_str =
                                                        '折扣开始时间：'
                                                        + '<select class="date" id = "zhe_start_day">' + day_options(start_time) + '</select>'
                                                        + '<select class="date" id = "zhe_start_hour">' + hour_options(start_time) + '</select><span class = "datespan">时</span>'
                                                        + '<select class="date" id = "zhe_start_min">' + min_options(start_time) + '</select><span class = "datespan">分</span>';
                                                }

                                                var zhe_addbox_html = zhe_addbox_tpl.replace(/{pic_url}/g, zhe_return_data.pic_small)
                                                    .replace(/{title}/g, zhe_return_data.title)
                                                    .replace(/{zhe_time_str}/g, zhe_time_str)
                                                    .replace(/{price}/g, zhe_return_data.price || "");

                                                if (zprice == 0) {
                                                    zhe_addbox_html =
                                                        zhe_addbox_html.replace(/{zprice}/g, zprice_str || '<input type="text" />')
                                                        .replace(/\(3\)/g,"");

                                                    a("#alert_item .alert_content").html(zhe_addbox_html);
                                                    a("#alert_item .zhe_info input").focus();
                                                    a("#alert_item .zhe_info .alert_but").addClass("alert_but2");
                                                    a("#alert_item").bind("keydown", function(key){
                                                        key.keyCode == 13 && a("#alert_item .zhe_info .alert_but2").click();
                                                    });

                                                    a("#alert_item .zhe_info .alert_but2").bind("click",function(){
                                                        var input_zprice = a("#alert_item .alert_content .zhe_info input").val();
                                                        var date_to_second = a("#zhe_start_day option:selected").val();
                                                        var hour_to_second = a("#zhe_start_hour option:selected").val();
                                                        var min_to_second = a("#zhe_start_min option:selected").val();

                                                        start_time = (parseInt(date_to_second) + parseInt(hour_to_second) + parseInt(min_to_second)) / 1000;
                                                        end_time = start_time + 3600 * 24 * 7;

                                                        if (input_zprice == '') {
                                                            alert("亲，还没填写折后价格哦！~");
                                                            return false;
                                                        } else {
                                                            if (! /^\d+(\.{1}\d+)?$/g.test(input_zprice)) {
                                                                alert("价格只能为数字哦，请正确填写折扣价！~");
                                                                return false;
                                                            } else if (input_zprice - zhe_return_data.price >= 0) {
                                                                alert("不会吧？折扣价都赶上原价了？！重新填写下折扣价吧！");
                                                                return false;
                                                            }else{
                                                                zprice = input_zprice;

                                                                zhe_return_data.back = zhe_return_data.back * zprice / zhe_return_data.price;
                                                                a("#alert_item")[0] && confirm_zhe_data();
                                                                return false;
                                                            }
                                                        }
                                                    });
                                                } else {
                                                    zhe_addbox_html = zhe_addbox_html.replace(/{zprice}/g, zprice || '<input type="text" />');

                                                    a("#alert_item .alert_content").html(zhe_addbox_html);
                                                    var p = 3;
                                                    var clock = setInterval(function() {
                                                        p--;
                                                        if (p == 0){
                                                            clearInterval(clock);
                                                            a("#alert_item")[0] && confirm_zhe_data();
                                                        }
                                                        a("#alert_item .zhe_info .alert_but").text("确定(" + p + ")")
                                                    }, 1E3);

                                                    a("#alert_item .zhe_info .alert_but").click(confirm_zhe_data)
                                                }
                                            }
                                        })
                                    } else {
                                        alert(b.status.msg);
                                        a("#alert_item").remove()
                                    }
                                }
                            },
                            error: function(a, b) {
                                "timeout" == b && (alert(XDLANG.msgTimeout), a("#alert_item").remove())
                            },
                            complete: function() {
                                but.removeData("isSubmit")
                            }
                        })
                    }
                });
            });

        //  delete zhekou
        a("#pub_zhe_kou .pub_img_default .pub_img li .close").live("click",function(){
            str = '<li class="p_i_default"><a class="add_zhe" href="javascript:;"';
            str += ' w' + '="pb">添加折扣</a></li>';
            a(this).parents(".pub_img").html(str);
            XD.FX_Item_zhe_Array = {};
        });
    };

    //order oid ajax
    XD.FX_Add_Shai_Oid_Ajax = function(w,oid,pub_img){
        var str = '<li iid="{iid}"><a class="close" href="javascript:;"></a><img src="{src}" title="{title}"></li>';
        a.ajax({
            url: "/shareajax",
            type: "POST",
            timeout: 6E4,
            data: {
                action:'sharelist',
                args:{oid:oid}
            },
            dataType: "json",
            success: function(b) {
                if (b == null || b == ""){
                    alert(XDLANG.msgTimeout);
                    a("#alert_shai").remove();
                }
                else {
                    var c = b.status.msg;
                    if (b.status.code == 1001) {
                        a("#alert_shai").remove();
                        b = b.result;
                        var num_iid = b.num_iid,
                            cid = b.cid,
                            click_url = b.click_url,
                            is_mailfree = b.is_mailfree,
                            props_name = b.props_name,
                            title = b.title ? b.title : "",
                            price = b.price,
                            back = b.back,
                            shop_sid = b.shop_sid,
                            pic_url = b.pic_url,
                            pic_small = b.pic_small,
                            realprice = b.realprice,
                            realback = b.realback;

                        var s = function() {
                            if (w == "pb") {
                                c = str.replace(/{iid}/g,num_iid).replace(/{title}/g,title).replace(/{src}/g,pic_small);
                                pub_img.find("li").remove();
                                pub_img.append(c);
                            }
                            c = {
                                cid:'',
                                click_url:'',
                                is_mailfree:'',
                                props_name:'',
                                num_iid:"",
                                title:"",
                                price:"",
                                back:"",
                                shop_sid:"",
                                pic_url:"",
                                pic_small:"",
                                oid:"",
                                realprice:"",
                                realback:""
                            };
                            c.cid = cid;
                            c.click_url = click_url;
                            c.is_mailfree = is_mailfree;
                            c.props_name = props_name;
                            c.num_iid = num_iid;
                            c.title = title.replace(/\\/g, "\\\\").replace(/\"/g, '\\"');
                            c.price = price;
                            c.back = back;
                            c.shop_sid = shop_sid;
                            c.pic_url = pic_url;
                            c.oid = oid;
                            c.pic_small = pic_small;
                            c.realprice = realprice;
                            c.realback = realback;
                            w == "pb" && (XD.FX_Item_Shai_Array = c);
                            a("#alert_shai").remove()
                        };

                        $("body").taoapiclient({
                            method:'taobao.taobaoke.widget.items.convert',
                            fields:'commission',
                            num_iids:num_iid,
                            appkey:12024311,
                            callback:function(resp) {
                                if (resp.code == 1000) {
                                    var item = resp.data.taobaoke_items.taobaoke_item[0];
                                    if (b.is_virtual == 'false') {
                                        back = parseFloat(item['commission']) * 0.5;
                                        back = back.toFixed(2);
                                    }
                                }
                                s();
                            }
                        });
                    } else {
                        alert(c);
                        a("#alert_item").remove()
                    }
                }
            },
            error: function(a, b) {
                "timeout" == b && (alert(XDLANG.msgTimeout), a("#alert_shai").remove());
            },
            complete: function() {
                //a(b).removeData("isSubmit")
            }
        });
    };

    //share shaidan
    XD.FX_Add_Shai_Init = function(){
        a(".add_shai").live("click",
            function() {
                var page = 1,
                    w = a(this).attr("w"),
                    c = a(this).offset(),
                    top = c.top + 14 + "px",
                    left = c.left + 93 + "px";
                var orderArr = new Array(),
                    flag = 0;
                if(a("#alert_shai").length != 0){
                    return false;
                }
                var pub_img = a(this).parents(".pub_img");
                if (XD.Globe_Check_Login()) {
                    m = a.ajax({
                        url: "/shareajax",
                        type: "POST",
                        timeout: 6E4,
                        data: {
                            action:'getunshareorder',
                            args:{
                                page:page
                            }
                        },
                        dataType: "json",
                        success: function(b) {
                            if (b == null || b == ""){
                                alert(XDLANG.msgTimeout);
                                a("#alert_shai").remove();
                            }
                            else {
                                var c = b.status.msg;
                                if (b.status.code == 1001) {
                                    var b = b.result,
                                        orderList = '',
                                        oid = "",
                                        li = '<li oid="{oid}"><a href="javascript:;" title="{title}"><img src="{src}"></a></li>';
                                    if (b == ""){
                                        alert("暂无订单可以分享哦！~");
                                        return false;
                                    }
                                    for (j=0 ;  j< b.length ; j++ ){
                                        str = li.replace(/{oid}/g,b[j].oid).replace(/{title}/g,b[j].title).replace(/{src}/g,b[j].picurl);
                                        orderArr[j] = str;
                                        orderList += str;
                                    }
                                    flag = b.length;
                                    //  show user order
                                    if (b.length>5){
                                        var html = '<a class="c_left" href="javascript:;"></a><div class="shai_goods_box"><ul>';
                                        html += orderList;
                                        html += '</ul></div><a class="c_right" href="javascript:;"></a>';
                                    }else {
                                        var html = '<div class="shai_goods_box"><ul>';
                                        html += orderList;
                                        html += '</ul></div>';
                                    }

                                    var str = XDTEMPLATE.lightBox,
                                        str = XDTEMPLATE.lightBox.replace(/{title}/g, "添加分享订单").replace(/{id}/g, "alert_shai").replace(/{body}/g, html);
                                    a("body").append(str);
                                    var g = a("#alert_shai");
                                    XD.Alert_Bg_New("alert_shai");
                                    g.css({
                                        top: top,
                                        left: left
                                    });
                                    XD.FX_Add_Shai_Page(orderArr,flag);
                                    g.find(".alert_close").click(function() {
                                        g.remove();
                                        a(this).data("submit","0");
                                    });
                                    g.find("ul li a").live("click",function(){
                                        oid = a(this).parent().attr("oid");
                                        g.remove();
                                        XD.FX_Add_Shai_Oid_Ajax(w,oid,pub_img);
                                    });
                                }else {
                                    alert(c);
                                    a("#alert_item").remove();
                                }
                            }
                        },
                        error: function(a, b) {
                            "timeout" == b && (alert(XDLANG.msgTimeout), a("#alert_shai").remove());
                        },
                        complete: function() {
                            //a(b).removeData("isSubmit")
                        }
                    })
                }
            });

        //delete shaidan
        a("#pub_shai_dan .pub_img_default .pub_img li .close").live("click",function(){
            str = '<li class="p_i_default"><a class="add_shai" href="javascript:;"';
            str += ' w' + '="pb">选择晒单</a></li>';
            a(this).parents(".pub_img").html(str);
            XD.FX_Item_Shai_Array = {};
        });

    };

    //click shaidan left&right
    XD.FX_Add_Shai_Page = function(orderArr,flag){
        var index = 5,
            tip = false,
            page = 2;

        a("#alert_shai .alert_close").live("click",function() {
            index = 5;
            tip = false;
            page = 2;
        });

        a("#alert_shai").find(".c_left").live("click",function(){
            var str ="";
            if (index-5){
                j = a("#alert_shai ul li").size();
                index -= j;
                for (i = 5 ; i > 0 ; i--){
                    str += orderArr[index-i];
                }
                a("#alert_shai").find("li").remove();
                a("#alert_shai").find("ul").html(str);
            }else{
                alert("没得翻啦，已经是最前了！~");
                return false;
            }
        });
        a("#alert_shai").find(".c_right").live("click",function(){
            var str ="";
            if (index < flag){
                flag - index < 5 ? (j = flag - index,tip = true) : j = 5 ;
                for (i = 0 ; i < j ; i++){
                    str = str + orderArr[index++];
                }

                a("#alert_shai").find("li").remove();
                a("#alert_shai").find("ul").html(str);

                if (tip) return false;

                a.ajax({
                    url: "/shareajax",
                    type: "POST",
                    timeout: 6E4,
                    data: {
                        action:'getunshareorder',
                        args:{
                            page:page
                        }
                    },
                    dataType: "json",
                    success: function(b) {
                        if (b == null || b == ""){
                            alert(XDLANG.msgTimeout);
                            a("#alert_shai").remove();
                        }
                        else {
                            var c = b.status.msg;
                            if (b.status.code == 1001) {
                                var b = b.result,
                                    oid = "",
                                    li = '<li oid="{oid}"><a href="javascript:;" title="{title}"><img src="{src}"></a></li>';
                                page++;

                                for (j=0 ;  j< b.length ; j++ ){
                                    orderArr[flag++] = li.replace(/{oid}/g,b[j].oid).replace(/{title}/g,b[j].title).replace(/{src}/g,b[j].picurl);
                                }
                            }else {
                                alert(c);
                            }
                        }
                    },
                    error: function(a, b) {
                        "timeout" == b && (alert(XDLANG.msgTimeout));
                    },
                    complete: function() {
                        //a(b).removeData("isSubmit")
                    }
                })
            }else if (index == flag){
                alert("没得翻啦，已经是最后了！~");
                return false;
            }
        });
    };

    
    //XD.FX_Add_Shai_Page();

    
        XD.FX_Add_Face_Init();
        XD.FX_Add_Picture_Init();
        XD.FX_Add_Item_Init();
        XD.FX_Add_Zhe_Init();
        XD.FX_Add_Shai_Init();
    }
    
})
