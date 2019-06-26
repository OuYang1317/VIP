$(function(){
    //判断用户名是否重复
   $(".uresename").find("input").change(function(){
        var user = $(this).val()//0是失败 已经重名了
        $.get("http://47.104.244.134:8080/username.do",{username:user},function(data){
            data = data.code
            if(data == 0){
                $(".uresename").find("input").end().next().html("用户名重复了").css({"opacity":1});
                $(".uresename").find("i").addClass("iconfont icon-cuohao-shezhi-zuozherenzhengzhuangtaitishitubiao").css("color","red")
            }else{
                $(".uresename").find("i").removeClass("iconfont icon-cuohao-shezhi-zuozherenzhengzhuangtaitishitubiao").addClass("iconfont icon-duihao1").css({"color":"#47B85C"})
                $(".uresename").find("input").end().next().html("用户名重复了").css({"opacity":0})
            }
    })
})
//验证码生成
   $("#yzhan").click(function(e){
       yz();
   })
function yz(){
    var st = "";
    for(var i = 0 ;i<4;i++){
        st+=Math.floor(Math.random()*9)
    }
    $(".yanzheng").find('input').val(st);
}
// 判断密码强度
$(".pasd").find("input").change(function(){
    var user = $(this).val()
        user = user.replace(/(^\s*)|(\s*$)/g,"")
    var num = /^[0-9]{6,}$/;
    var sum = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/ 
    var zimu = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{6,}$/
    var zz = /[{}[]`--—]+/gi
   if(num.test(user) == true){
    $(".color").css({"width":"12px","background":"red"})
    $("#weiwi").html("弱")
    $(".wenziz").css({"opacity":0});
    $(".pasd").find("i").addClass("iconfont icon-duihao1").css({"color":"#47B85C"})
   }
   if(sum.test(user) == true){
    $(".color").css({"width":"24px","background":"#F9A123"})
    $("#weiwi").html("中")
    $(".wenziz").css({"opacity":0});
    $(".pasd").find("i").addClass("iconfont icon-duihao1").css({"color":"#47B85C"})
   }
   if(zimu.test(user) == true){
    $(".color").css({"width":"36px","background":"#7CBF14"})
    $("#weiwi").html("强")
    $(".wenziz").css({"opacity":0});
    $(".pasd").find("i").addClass("iconfont icon-duihao1").css({"color":"#47B85C"})
   }
   if(zimu.test(user) == false && num.test(user) == false && sum.test(user) == false){
    $(".wenziz").css({"opacity":1});
    $(".wenziz").html("请输入6位以上的密码，可以包含~!@#$%^&*")
    $(".pasd").find("i").addClass("iconfont icon-cuohao-shezhi-zuozherenzhengzhuangtaitishitubiao").css("color","red")
   }
})
//密码重复提交

$(".yanzhengpsd").find('input').change(function(){
    var user =$(".pasd").find("input").val()
    
    var pad = $(this).val();
    console.log(user==pad)
    if(user == pad){
        $(".yanzhengpsd").find('i').removeClass("iconfont icon-cuohao-shezhi-zuozherenzhengzhuangtaitishitubiao").addClass("iconfont icon-duihao1").css({"color":"#47B85C"}).addClass("iconfont icon-duihao1").css({"color":"#47B85C"})
        $(".errc").css({"opacity":0})
    }else{
        $(".yanzhengpsd").find("i").addClass("iconfont icon-cuohao-shezhi-zuozherenzhengzhuangtaitishitubiao").css("color","red")
        $(".errc").css({"opacity":1})
    }
})

//协议判断加上传
$("#zhuce").click(function(){
    if($(".xieyi").find("input").prop("checked") == false){
        $(".tiaokuan").css({"opacity":1})
        return;
    }else{
        $(".tiaokuan").css({"opacity":0})
    }
    $('#loginitem').show()
    var psd1 =$(".pasd").find("input").val();
    var user1 = $(".uresename").find("input").val();
    $. post("http://47.104.244.134:8080/usersave.do",{
                        username:user1,
                        password:psd1,
                        email:user1+"@qq.com",
                        sex:"女"},function(data){
                        $('#loginitem').hide()
                        if(data.code == 0){
                            window.location.href="index.html"
                }
            })
})
  







    
})