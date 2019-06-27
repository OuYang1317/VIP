$(function(){
	$("#login_").click(function(){
		console.log("aa")
		var user =  $("#usen").val();
		var pad  =  $("#mim").val();
		var strr = "";
		var str ="";
		var ff = "";
		var ssd =""
		  $.post("http://47.104.244.134:8080/userlogin.do",{ "name":user,"password":pad},function(data){
			var da = data
			data = data.code;
			  if(data == 1){
				$(".error").show(); 
			}else{
				var taken = da.data.token
				$("#zhzhao").hide();
				Setcookie("username",user,)
				Setcookie("pasd",pad,)
				Setcookie("token",taken)
				str+=`<span class="iconfont icon-renwu"></span><p><a id="loginn1" href="#">用户  ${user}</a></p>`
						$(".touxiang").html(str);
					strr+=`<a href="#" id ="name">欢迎 ${user}</a>`
						$(".idid").html(strr)
						ff+=`<a href="#">注销</a>`
						$(".logout").html(ff);
					ssd+=`你好 <a href='#'> ${user}</a>`
						$(".ning").html(ssd)
						// 侧边栏请求数据
		$.get("http://47.104.244.134:8080/cartlist.do",{token:taken},function(data){
			var str =""
			var index = data.length
			$.each(data,function(i){
				str+=` <li><a href="cart.html">
				<div><img src="${data[i].goods.picurl}"></div>
				<div><p>${data[i].goods.name}</p><span>${data[i].count}</span></div>
				<div><p>￥${(data[i].goods.price/100*data[i].count).toFixed(2)}</p></div>
				</a>
			</li>`
			})
			$("#listitem").html(str)
			$("#indexx").html(index);
		})
				//注销
						$(".logout").click(function(){
							RemoveCookie("username");
							RemoveCookie("token")
							window.location.href="showitem.html"})
							}
			  })
		  if($("#chx").prop("checked")==true){
			  Setcookie("username",user,7)
		  }
		  if($("#chx").prop("checked")==false){
			  RemoveCookie("username")
		  }
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
			
    var id = location.search.split("?")[1];
    $.get("http://47.104.244.134:8080/goodsbyid.do",{id:id},show)
    function show(data){
        if(data.picurl==""){
            data.picurl ="img/replace/"+Math.floor(Math.random()*10)+".jpg"
        }
        var str = ""
        var strr = ""
        str+=`
        <div class="img_big">
            <div class="zoom"></div>
            <img src="${data.picurl}">
        </div>
        <div class="img_samll">
            <ul>
                <li><img src="${data.picurl}"></li>
            </ul>
        </div>`
      strr+=` <h2 class="biaoti">${data.name}</h2>
      <div class="concet_price">
          <span>￥</span><h3>${data.price/100}</h3><del>${data.price}</del><i>5折</i>
      </div>
      <div class="concet_area"><span>配送</span></div>
      <div class="distribution"><h3>运费</h3><span>免运费</span></div>
      <div class="concet_option"><h3>颜色</h3>
          <ul>
              <li>好吃的</li>
              <li>不好吃的</li>
          </ul>
      </div>` 

    $(".concet_img").html(str)
    $("#magess").html(strr)
//鼠标经过发大
$(".img_big").mousemove(function(e){
    var _left = $(this).offset().left
    var _top  = $(this).offset().top
    var x = e.pageX-_left-50;
    var y = e.pageY-_top-50;
    var maxWidth=$(this).innerWidth()-$(".zoom").innerWidth();
    var maxHeigth=$(this).innerHeight()-$(".zoom").innerHeight()
    x = x >= maxWidth? maxWidth:x < 0 ? 0 : x;
    y = y <= 0 ? 0 : y >= maxHeigth ? maxHeigth : y;
    $(".zoom").css({"top":y+"px","left":x+"px"})
    $(this).find("img").css({"width":"840px","top":-1.3*y+"px","left":-1.3*x+"px"})
})
//鼠标移出缩小
$(".img_big").mouseout(function () { 
    $(this).find("img").removeAttr("style");
});
//点击换图
$(".img_samll ul").find("li").click(function(){
    console.log($(".img_big").find("img"),$(this).find("img").attr("src")+"")
    $(".img_big").find("img").attr("src",$(this).find("img").attr("src")+"")
})

//减 值
$(".quantity_option").find("span").eq(0).click(function(){
    var num = $(".quantity_option").find("input").val()
    num--;
    if(num<1){
        num = 1;
    }
    $(".quantity_option").find("input").val(num)
})
//加 值
$(".quantity_option").find("span").eq(1).click(function(){
    var num = $(".quantity_option").find("input").val()
    num++;
    $(".quantity_option").find("input").val(num)
})
//加入购物车

$("#login_").click(function(){
	console.log("aa")
	var user =  $("#usen").val();
	var pad  =  $("#mim").val();
	var strr = "";
	var str ="";
	var ff = "";
	var ssd =""
	  $.post("http://47.104.244.134:8080/userlogin.do",{ "name":user,"password":pad},function(data){
		var da = data
		data = data.code;
		  if(data == 1){
			$("#error1").show(); 
		}else{
			var taken = da.data.token
			$("#zhzhao").hide();
			Setcookie("username",user,)
			Setcookie("pasd",pad,)
			Setcookie("token",taken)
			str+=`<span class="iconfont icon-renwu"></span><p><a id="loginn1" href="#">用户  ${user}</a></p>`
					$(".touxiang").html(str);
				strr+=`<a href="#" id ="name">欢迎 ${user}</a>`
					$(".idid").html(strr)
					ff+=`<a href="#">注销</a>`
					$(".logout").html(ff);
				ssd+=`你好 <a href='#'> ${user}</a>`
					$(".ning").html(ssd)
					// 侧边栏请求数据
	$.get("http://47.104.244.134:8080/cartlist.do",{token:taken},function(data){
		var str =""
		var index = data.length
		$.each(data,function(i){
			str+=` <li><a href="cart.html">
			<div><img src="${data[i].goods.picurl}"></div>
			<div><p>${data[i].goods.name}</p><span>${data[i].count}</span></div>
			<div><p>￥${(data[i].goods.price/100*data[i].count).toFixed(2)}</p></div>
			</a>
		</li>`
		})
		$("#listitem").html(str)
		$("#indexx").html(index);
	})
			//注销
			$(".logout").click(function(){
					RemoveCookie("username");
						RemoveCookie("token")
						window.location.href="showitem.html"})
						 	}
		  })
	  if($("#chx").prop("checked")==true){
		  Setcookie("username",user,7)
	  }
	  if($("#chx").prop("checked")==false){
		  RemoveCookie("username")
	  }
})





















































 $("#shopping").click(function(){
	if(Getcookie("token") == undefined){
		alert("您还没有登录，请登录")
	$("#zhzhao").show();
	return
	}else{
	var taken = Getcookie("token")
	for(var i = 0;i<$("#suno").val();i++){$.get("http://47.104.244.134:8080/cartsave.do",{gid:id,token:taken},function(data){})}
	alert("成功");

	
}
})
}
//点击事件合集
$(".cloes").click(function(){
	$("#zhzhao").hide();
})

$("#loginn1").click(function(){
	$("#zhzhao").show();
})
var taken = Getcookie("token")
$("#clickk").click(function(e){
	e.stopPropagation()
	$(".big").animate({"width":300},"slow")
})
$("body,html").click(function(){
	$(".big").animate({"width":0},"slow")
})
$("#ttx").mouseenter(function(){
	$(".smlas").animate({"width":300},"slow")
})
$(".smlas").mouseleave(function(){
	$(this).animate({"width":0},"slow")
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
 


// 侧边栏请求数据 

if(taken == undefined){
	return;
}else{
	$.get("http://47.104.244.134:8080/cartlist.do",{token:taken},function(data){
	var str =""
	console.log(data)
	var index = data.length
	$.each(data,function(i){
		str+=` <li><a href="cart.html">
		<div><img src="${data[i].goods.picurl}"></div>
		<div><p>${data[i].goods.name}</p><span>${data[i].count}</span></div>
		<div><p>￥${(data[i].goods.price/100*data[i].count).toFixed(2)}</p></div>
		</a>
	</li>`
	})
	$("#listitem").html(str)
	$("#indexx").html(index);
})
}




















 

//回到顶部
$("#top").click(function(){
    $("body,html").animate({scrollTop:"0px"},200);
});


//用户验证&记住用户名
// $("#login_").click(function(){
// 	var user =  $("#usen").val();
// 	var pad  =  $("#mim").val();
// 	var strr = "";
// 	var str ="";
// 	var ff = "";
// 	var ssd =""
// 	  $.post("http://47.104.244.134:8080/userlogin.do",{ "name":user,"password":pad},function(data){
// 		var taken = data.data.token
// 		data = data.code;
// 		console.log("aa")
// 		  if(data == 1){
// 			$(".error").show();
// 		}else{
// 			$("#zhzhao").hide();
//             Setcookie("username",user)
// 			Setcookie("pasd",pad)
// 			console.log(user,pad)
// 			Setcookie("token",taken)
// 			ssd+=`你好 <a href='#'> ${user}</a>`
// 			$(".ning").html(ssd)
// 			str+=`<span class="iconfont icon-renwu"></span><p><a id="loginn1" href="#">用户  ${user}</a></p>`
// 					$(".touxiang").html(str);
// 				strr+=`<a href="#" id ="name">欢迎 ${user}</a>`
// 					$(".idid").html(strr)
// 					ff+=`<a href="#">注销</a>`
// 					$(".logout").html(ff);
// 					$(".logout").click(function(){RemoveCookie("username");window.location.href="index.html"})
// 		}
// 	  })
// 	  if($("#chx").prop("checked")==true){
// 		  Setcookie("username",user,7)
// 	  }
// 	  if($("#chx").prop("checked")==false){
// 		  RemoveCookie("username")
// 	  }
// 	  })
	  //取值
	  $("#username").val(Getcookie("username")) 
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
			  var ssd=""
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
					ssd+=`你好 <a href='#'> ${te}</a>`
					$(".ning").html(ssd)
				strr+=`<a href="#" id ="name">欢迎 ${te}</a>`
					$(".idid").html(strr)
					ff+=`<a href="#">注销</a>`
					$(".logout").html(ff);
					$(".logout").click(function(){
						RemoveCookie("username")
						RemoveCookie("token")
						window.location.href="showitem.html?"+id
					})
			}
		  })
	}		
			denglu();


















})