window.onload=function(){
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
		//轮播
			var num = 0;
			var timer =null
			function move(){
					num++;
					console.log(num)
					num = num >= $('#bannerimg').find("li").length ? 0 : num
					num = num <= -1 ? 1 : num
					$('#bannerimg').find("li").eq(num).stop().fadeIn().siblings().stop().fadeOut()
					$("#tiao").stop().animate({'left':354+num*232+"px"})
				}
				move();
				timer = setInterval(move,2000);
				$("#iremwen").find("p").each(function(){
					$(this).mouseenter(function(){
							var index = $(this).index()
							clearInterval(timer)
							$('#bannerimg').find("li").eq(index).stop().fadeIn().siblings().stop().fadeOut()
							console.log(index)
								$("#tiao").stop().animate({'left':354+index*232+"px"})
							})
						$(this).mouseleave(function(){
							timer = setInterval(function(){
								move();
							},2000);
							})
				})
				$(".noe").mouseenter(function(){
					clearInterval(timer)
					$(this).find("span").eq(0).stop().animate({"left":0}).end().eq(0).click(function(){
						move();
					})
					$(this).find("span").eq(1).stop().animate({"right":0}).end().eq(1).click(function(){
						move();
					})
				})
				$(".noe").mouseleave(function(){
					$(this).find("span").eq(0).stop().animate({"left":"-33px"})
					$(this).find("span").eq(1).stop().animate({"right":"-33px"})
					timer = setInterval(function(){move();},2000);
				})
				
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	})
}
