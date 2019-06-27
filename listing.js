$(function(){
    // $(".dian1").click(function(){
    //     $(".denglu").css({'height':'500px'});
    //     $(this).hide().next().show()
    // })
    // $(".dian2").click(function(){
    //     $(".denglu").css({'height':'455px'});
    //     $(this).hide();
    //     $(".dian1").show();
    // })
    
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
						if(sl == undefined){
							$("#item123").html(sb)
							return
						}
						$.get("http://47.104.244.134:8080/goodstypelist.do",{l:2},function(dada){
							var strt ="<dl><dt><div><span>"+data[ss].name+"</span><i>></i></div></dt><dd>"
							$.each(dada,function(num){
								if(sl == dada[num].parentid){
									strt +=` <a href="listing.html?${sl/1+1}">${dada[num].name}</a>`
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
            

            //导航栏吸顶效果
        $(window).scroll(function () { 
            var ss = $(this).scrollTop()//790
            if(ss>790){
                $(".shownav").css({"position":"fixed","top":"0px"});
            }else{
                $(".shownav").removeAttr("style")
            }
        });

        // 生成页面 内容
        function overload(num,id) {
            if(id == undefined){
                id = 1
            }
            $.get("http://47.104.244.134:8080/goodsbytid.do",{tid:num,page:id,limit:21},item_page)
            function item_page(data){
                var data = data.data
                data.shift()
                var str = "";
                if(data.length == 0){
                    str+="<h5 id='erroo'>暂时没有数据很抱歉!!!</h5>"
                    $(".show_item").html(str)
                    return
                }
                $.each(data,function(sum){
                    if(data[sum].picurl == ""){
                        data[sum].picurl = "img/replace/"+Math.floor(Math.random()*10)+".jpg";
                    }
                        str+=`<a href="showitem.html?${data[sum].id}" data-id="${data[sum].id}"><dl>
                        <dt><img src="${data[sum].picurl}"></dt>
                        <dd>
                            <h1><b>￥</b><span>${data[sum].price/100}</span></h1>
                            <p>${data[sum].name}</p>
                            <h3><span>不打折</span></h3>
                        </dd>
                        </dl></a>`
                })
                   $(".show_item").html(str)
               }
           }
            var id = location.search.split("?")[1];
            console.log(id)
           overload(id);
           //页码点击特效
           $(".pagewid").find("li").click(function(){
                var sum = $(this).html()
                $(this).addClass("xuanzhong").siblings().removeClass("xuanzhong")
                $("#page_i").html(sum)
                overload(id,sum);
                Top();
           })
           //上一页
           $("#upitem").click(function(){Upitem();})
           //下一页
            $("#downitem").click(function(){Downitem();})
            //页码调转
           $("#upitem_one").click(function(){Upitem();})
           $("#downitem_one").click(function(){Downitem();})


           
            //下一页
             function Downitem(){
                var num = $(".pagewid").find("li").filter(".xuanzhong").html()
                var sum = $(".pagewid").find("li").filter(".xuanzhong").index()
                var leng = $(".pagewid").find("li").last().html()
                ++num;
                ++sum;
                num = num>leng?leng:num
                $("#page_i").html(num)
                $(".pagewid").find("li").eq(sum).addClass("xuanzhong").siblings().removeClass("xuanzhong")
                overload(id,num);
                Top();
             }

            //上一页
            
             function Upitem(){
                var num = $(".pagewid").find("li").filter(".xuanzhong").html()
                var sum = $(".pagewid").find("li").filter(".xuanzhong").index()
                var leng = $(".pagewid").find("li").first().html()
                 num--;
                 sum--;
                 if(num<= 0){num = 1; return }
                $("#page_i").html(num)
                $(".pagewid").find("li").eq(sum).addClass("xuanzhong").siblings().removeClass("xuanzhong")
                overload(num);
                Top();
            }



       //回到上面
       function Top(){
           $("body,html").animate({"scrollTop":600},10);
       }


//用户验证&记住用户名
$("#login_").click(function(){
	var user =  $("#usen").val();
	var pad  =  $("#mim").val();
	  $.post("http://47.104.244.134:8080/userlogin.do",{ "name":user,"password":pad},function(data){
          var taken = data.data.token
		  data = data.code;
		  if(data == 1){
			$(".error").show();
		}else{
            window.location.href = 'listing.html?'+id+'?token='+taken
            Setcookie("username",user)
            Setcookie("pasd",pad)
            Setcookie("token",taken)
		}
	  })
	  if($("#chx").prop("checked")==true){
		  Setcookie("username",user,7)
	  }
	  if($("#chx").prop("checked")==false){
		  RemoveCookie("username")
	  }
  })


  function denglu(){
    var te = Getcookie("username")
    var pd = Getcookie("pasd")
    if(te == undefined && pd ==undefined){
        return;
    }
    $.post("http://47.104.244.134:8080/userlogin.do",{ "name":te,"password":pd},function(data){
          var strr = "";
          var str ="";
          var ff = "";
          data = data.code;
          if(data == 1){
            $(".error").show();
        }else{
            console.log("aa")
            Setcookie("username",te)
            Setcookie("pasd",pd)
            str+=`<span class="iconfont icon-renwu"></span>
                <p><a id="loginn1" href="#">用户  ${te}</a></p>`
                $(".touxiang").html(str);
            strr+=`<a href="#" id ="name">欢迎 ${te}</a>`
                $(".idid").html(strr)
                ff+=`<a href="#">注销</a>`
                $(".logout").html(ff);
                $(".logout").click(function(){
                    RemoveCookie("username")
                    RemoveCookie("token")
                    window.location.href='listing.html?'+id
                })
        }
      })
}		
        denglu();







})


