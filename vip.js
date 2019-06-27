window.onload=function(){
//用户验证&记住用户名
$("#login_").click(function(){
	var user =  $("#usen").val();
	var pad  =  $("#mim").val();
	var strr = "";
	var str ="";
	var ff = "";
	var ssd =""
	  $.post("http://47.104.244.134:8080/userlogin.do",{ "name":user,"password":pad},function(data){
		taken = data.data.token
		data = data.code;
		  if(data == 1){
			$("#error1").show();
		}else{
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
					$(".logout").click(function(){
						RemoveCookie("username");
						RemoveCookie("token")
						window.location.href="index.html"})
							
					}
	  	})
	  if($("#chx").prop("checked")==true){
		  Setcookie("username",user,7)
	  }
	  if($("#chx").prop("checked")==false){
		  RemoveCookie("username")
	  }
	  })
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
				strr+=`<a href="#" id ="name">欢迎 ${te}</a>`
					$(".idid").html(strr)
					ff+=`<a href="#">注销</a>`
					ssd+=`你好 <a href='#'> ${te}</a>`
					$(".ning").html(ssd)
					$(".logout").html(ff);
					$(".logout").click(function(){
						RemoveCookie("username")
						window.location.href="index.html"
					})
			}
		  })
	}		
	denglu();
	//回到顶部
	$(function(){
		$("#top").click(function(){
			$("body,html").animate({scrollTop:"0px"},200);
		})
		
	//顶部悬浮
		$(window).scroll(function(){
			var _top = $(window).scrollTop();
			if(_top>250){
				$('#navnavnav').css({"position":"fixed","top":0,"left":0,"z-index":999})
			}else{
				$("#navnavnav").removeAttr('style')
			}
		})
		//轮播
			var num = 0;
			var timer =null
			function move(){
					num++;
					num = num >= $('#bannerimg').find("li").length ? 0 : num
					num = num <= -1 ? 1 : num
					$('#bannerimg').find("li").eq(num).stop().fadeIn().siblings().stop().fadeOut()
					$("#tiao").stop().animate({'left':354+num*232+"px"})
				}
				move();
				timer = setInterval(move,4000);
				$("#iremwen").find("p").each(function(){
					$(this).mouseenter(function(){
							var index = $(this).index()
							clearInterval(timer)
							$('#bannerimg').find("li").eq(index).stop().fadeIn().siblings().stop().fadeOut()
								$("#tiao").stop().animate({'left':354+index*232+"px"})
							})
						$(this).mouseleave(function(){
							timer = setInterval(function(){
								move();
							},4000);
							})
					})
				$(".noe").mouseenter(function(e){
					e.stopPropagation();
					clearInterval(timer)
					$(this).find("span").eq(0).stop().animate({"left":0}).end().eq(0).click(function(){
						move();
					})
					$(this).find("span").eq(1).stop().animate({"right":0}).end().eq(1).click(function(){
						move();
					})
				})
					


				$(".noe").mouseleave(function(e){
					e.stopPropagation();
					$(this).find("span").eq(0).stop().animate({"left":"-33px"})
					$(this).find("span").eq(1).stop().animate({"right":"-33px"})
					timer = setInterval(function(){move();},4000);
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
			
			//楼梯
			var flag = true
			$(window).scroll(function(){
				if(flag){
				if($(this).scrollTop()>950){
					$('#louti').fadeIn()
				}else{
					$('#louti').fadeOut()
				}
				$('.new_pin').each(function(){
					if($(window).scrollTop()>= $(this).offset().top-$(this).outerHeight()/2){
						var index = $(this).index();
						$('#louti li').eq(index).addClass('hover').siblings().removeClass('hover')
					}
				})
			}
		})
			$('#louti li').click(function(){
				flag = false
				var sr = 150;
				var index = $(this).index();
				$('body,html').animate({"scrollTop":$('.new_pin').eq(index).offset().top-sr},200,function(){
					flag = true
				})
			})
			//更多点击收起
			// $(".dian1").click(function(){
			// 	$(".denglu").css({'height':'500px'});
			// 	$(this).hide().next().show()
			// })
			// $(".dian2").click(function(){
			// 	$(".denglu").css({'height':'455px'});
			// 	$(this).hide();
			// 	$(".dian1").show();
			// })
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
			//倒计时
			itemtiem();
			function itemtiem(){
				var time = new Date;
				var wl = new Date("2019-6-30 9:00:00")
				var sum = wl -time;
				var sss = "";
				sum = sum/1000
					var xs =Math.floor(sum/60/60%24)
					var fz =Math.floor(sum/60%60)
					var mz =Math.floor(sum%60)
						xs=xs<10?"0"+xs:xs
						fz=fz<10?"0"+fz:fz
						mz=mz<10?"0"+mz:mz
					sss+=` <span>${xs}</span>
					<span class="fen">${fz}</span>
					<span class="miao">${mz}</span>`
					$(".timerr").html(sss)
			}
			setInterval(itemtiem,1000)
			var taken = Getcookie("token")
	// 侧边栏请求数据 
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










	})
}
