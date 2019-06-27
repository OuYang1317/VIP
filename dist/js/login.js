$(function(){
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
    //用户验证&记住用户名
    $("#btn").click(function(){
      var user =  $("#username").val()
      var pad  =  $("#passwrod").val()
        $.post("http://47.104.244.134:8080/userlogin.do",{ name:user,password:pad},function(data){
            var taken = data.data.token
            data = data.code;
            if(data == 1){
                $(".error").show();
            }else{
                Setcookie("username",user)
                Setcookie("pasd",pad)
                console.log(user,pad)
                Setcookie("token",taken)
                window.location.href = 'index.html?'+taken
            }
        })
        if($("#chx").prop("checked")==true){
            Setcookie("username",user,7)
        }
        if($("#chx").prop("checked")==false){
            RemoveCookie("username")
        }
    })
        $("#username").val(Getcookie("username")) 















































        
})