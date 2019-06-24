$(function(){
   $(".uresename").find("input").change(function(){
        var user = $(this).val()//0是失败 已经重名了
        $.get("http://47.104.244.134:8080/username.do",{username:user},function(data){
            data = data.code
            if(data == 0){
                $(".uresename").find("input").end().next().html("用户名重复了").css({"opacity":1});
                $(".uresename").find("i").addClass("iconfont icon-cuohao-shezhi-zuozherenzhengzhuangtaitishitubiao").css({"color":"red"})
            }
            if(data = 1){
                $(".uresename").find("i").addClass("iconfont icon-duihao1").css({"color":"#47B85C"})
            }
        })
   })

   Yanz("yzhan");




    
})