$(function(){
    $(".dian1").click(function(){
        $(".denglu").css({'height':'500px'});
        $(this).hide().next().show()
    })
    $(".dian2").click(function(){
        $(".denglu").css({'height':'435px'});
        $(this).hide();
        $(".dian1").show();
    })
    
    $(".cloes").click(function(){
        $("#zhzhao").hide();
    })
    
    $("#loginn1").click(function(){
        $("#zhzhao").show();
    })
    
    
        $(".sam").click(function(){
        $(this).css({"color":"#F10180"})
        $(".zhd").css({"color":"#666"})
        $("#saoma").show();
        $("#zhanghu").hide();
    })
    $(".zhd").click(function(){
        $(this).css({"color":"#F10180"})
        $(".sam").css({"color":"#666"})
        $("#saoma").hide();
        $("#zhanghu").show();
    })
    //搜索框
    $("#seranns").focus(function(e){
        e.stopPropagation()
        $.ajax({
            type:"get",
            url:"https://category.vip.com/ajax/getSuggestHotKeywords.php?callback=?&count=10&_=1561085835004",
            async:true,
            dataType:"jsonp",
            success:function(data){
                var data = data.data;
                var str ="<h3>精选推荐</h3>";
                $.each(data, function(sum) {
                    str+=`<li>${data[sum].key}</li> `
                });
                $(".tuijian").html(str)
            }
        })
        $(".serach-log").show();
    })
    $("#seranns").on("input",function(e){
    e.stopPropagation();
    $(".serach-log").hide();
    var valu = $(this).val()
    $.ajax({
        type:"get",
        url:"https://category.vip.com/ajax/getSuggest.php?callback=?&keyword="+valu+"&_=1561111493540",
        async:true,
        dataType:"jsonp",
        success:function(data){
            var data = data.data
            if(data.length == 0){
                $("#serttt").hide();
                return
            }
            var strr =""
            $.each(data, function(sum) {
                strr+=`<li>${data[sum].word}</li> `
            });
            $("#serttt").html(strr)
            $("#serttt").show();
        }
    })
    })
    $("body,html").mousedown(function(e){
        e.stopPropagation()
        $("#serttt").hide();
        $(".serach-log").hide();
    })
    //二级导航 接口
    $.get("http://47.104.244.134:8080/goodstypelist.do",{l:1},function(data){
    var str = "";
    $.each(data, function(sum) {
        str+=`<li data-id="${data[sum].id}" id ="${sum}"><a href="#">${data[sum].name}</a></li>`
    });
    $("#navnanbar").html(str);
    var sb = $("#item123").html()
    $("#menuitem").find("li").mouseenter(function(){
            var sl = $(this).attr("data-id")
            var ss = $(this).attr("id")
            console.log(sb);
            if(sl == undefined){
                console.log("aa")
                $("#item123").html(sb)
                return
            }
            $.get("http://47.104.244.134:8080/goodstypelist.do",{l:2},function(dada){
                var strt ="<dl><dt><div><span>"+data[ss].name+"</span><i>></i></div></dt><dd>"
                $.each(dada,function(num){
                    if(sl == dada[num].parentid){
                        strt +=` <a href="#">${dada[num].name}</a>`
                    }
                })
                strt+="</dd></dl>"
                $("#item123").html(strt);
            })
            $("#navnav_menu").show();
    })
    })
            //二级菜单显示
            $("#menuitem").mousemove(function(e){
            e.stopPropagation();
            $(this).find("ul").slideDown();
            })
            $("#menuitem").find("li").mousemove(function(e){
            e.stopPropagation();
            $("#navnav_menu").show();
            })
            $("#navnav_menu").mousemove(function(e){
            e.stopPropagation();
            $("#menuitem").find("ul").show();
            $(this).show()
            })
            $("body,html").mousemove(function(){
            $("#menuitem").find("ul").slideUp();
            $("#navnav_menu").hide()
            })

        $(window).scroll(function () { 
            var ss = $(this).scrollTop()//790
            if(ss>790){
                $(".shownav").css({"position":"fixed","top":"-46px"});
            }else{
                $(".shownav").removeAttr("style")
            }
        });
        
        function overload(id,pageitem) {
            $.get("http://47.104.244.134:8080/goodsbytid.do",{tid:13,page:1,limit:21},item_page)
           function item_page(data){
                var data = data.data
                data.shift()
                var str = "";
                $.each(data,function(sum){
                    if(data[sum].picurl == ""){
                        data[sum].picurl = "img/5018a6a1-8df1-4935-bba5-23c6e6f06f7c_420_531.jpg"
                    }
                        str+=`<dl>
                        <dt><img src="${data[sum].picurl}"</dt>
                        <dd>
                            <h1><b>￥</b><span>${data[sum].price/100}</span></h1>
                            <p>${data[sum].name}</p>
                            <h3><span>不打折</span></h3>
                        </dd>
                        </dl>`
                        console.log(data[sum].picurl)
                })
                   $(".show_item").html(str)
               }
           }

           overload();



})
