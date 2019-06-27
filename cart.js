$(function(){

    function denglu(){
		var te = Getcookie("username")
		var pd = Getcookie("pasd")
		if(te == undefined && pd ==undefined){
			return;
		}
		$.post("http://47.104.244.134:8080/userlogin.do",{ "name":te,"password":pd},function(data){
			  data = data.code;
			  if(data == 1){
				$(".error").show();
			}else{
				console.log("aa")
				    Setcookie("username",te)
				        Setcookie("pasd",pd)
					    $("#idid").text(te)
					        $("#logout").text("注销");
					            $("#logout").click(function(){
                                    RemoveCookie("username")
                                    RemoveCookie("token")
						                window.location.href="index.html"
					})
			    }
		  })
	}		
denglu();
var str = "";
var taken = Getcookie("token")
    if(taken == undefined){
      str+=`<li id = "goto">快去购物吧</li>`
      $("#cart_item").html(str)
    }else{
        $.get("http://47.104.244.134:8080/cartlist.do",{token:taken},Cart)
    }
    function Cart(data) {
        var stt = ""
        console.log(data)
         console.log(data)
        $.each(data,function(i){
            str+=` <li goods-id="${data[i].goods.id}">
            <div><img src="${data[i].goods.picurl}"/><p>${data[i].goods.name}</p></div>
            <div>￥${data[i].goods.price/100}</div>
            <div><h1><span>-</span><input id="summ" type="text" value="${data[i].count}"><span>+</span></h1></div>
            <div class = "aggregate_money">￥${(data[i].goods.price/100*data[i].count).toFixed(2)}</div>
            <div class="dedel"><i data-id="${data[i].id}" goods-id="${data[i].goods.id}">删除</i></div>
                </li>`
        })
        $("#cart_item").html(str)
        var sum = 0;
        $("#cart_item").find(".aggregate_money").each(function(){
            sum += Number($(this).html().split("￥")[1])
        })
        $(".message_").find("b").text("￥"+sum.toFixed(2))
        $(".dedel").find("i").click(function(){
                var id   = $(this).attr("data-id")
                var goid = $(this).attr("goods-id")
                $(this).parents("li").remove();
            $.get("http://47.104.244.134:8080/cartupdate.do",{id:id,gid:goid,num:0,token:taken},function(data){})  
        })
    }








































})