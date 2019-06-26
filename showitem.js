$(function(){
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
        console.log(data)
        if(data.picurl==""){
            data.picurl ="img/replace/"+Math.floor(Math.random()*10)+".jpg"
        }
        var str = ""
        str+=`<div class="concet_img">
        <div class="img_big">
            <div class="zoom"></div>
            <img src="${data.picurl}">
        </div>
        <div class="img_samll">
            <ul>
                <li><img src="${data.picurl}"></li>
            </ul>
        </div>
    </div>
    <div class="conceet_wen">
        <h2 class="biaoti">${data.name}</h2>
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
        </div>
        <div class="concet_quantity"><h3>数量</h3><div class="quantity_option"><span>-</span><input type="text"value="1"><span>+</span></div></div>
        <button id="shopping" type="button"><span class="iconfont icon-gouwudai"></span><span>加入购物车</span></button>
    </div>`
    $(".concet_item").html(str)


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







}


 



//回到顶部
$("#top").click(function(){
    $("body,html").animate({scrollTop:"0px"},200);
});





















})