//增加&改cookie
function Setcookie(keys, keyvalue, DAte, Path) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + DAte);
	document.cookie = keys + "=" + keyvalue + ";" + "expires=" + oDate + ";path=" + Path;
}
//查询cookie
function Getcookie(keyvalue) {
	var obj = document.cookie;
	var obj1 = obj.split("; ");
	for(var i = 0; i < obj1.length; i++) {
		var arr = obj1[i].split("=");
		if(arr[0] === keyvalue) {
			return arr[1];
		}
	}
}
//删除
function RemoveCookie(name) {
	Setcookie(name, 1, -1);
}

function Yanz(id){
	var can = document.getElementById(id);
	var ctx = can.getContext("2d");
	ctx.fillStyle = randColor(170,250); 
	ctx.fillRect(0,0,300,300);
	draw();

	can.onclick=function() {
		ctx.clearRect(0,0,300,300);
		draw();
	}
	function draw(){
		ctx.fillStyle=randColor(170,250); 
		ctx.fillRect(0,0,300,300);
		var data = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890';
		for(var i=0;i<=90;i+=30){
			var c = data[randNun(0,data.length-1)];
			ctx.fillStyle = randColor(60,160);
			ctx.font = randNun(100,120)+'px SimHei'; //的控制大小
			ctx.fillText(c,i+randNun(0,300),randNun(10,110))//控制坐标
		}
		//	绘制干扰线
		for(var i=0;i<10;i++){
			ctx.beginPath();
			ctx.moveTo(randNun(0,300),randNun(0,300))
			ctx.lineTo(randNun(0,300),randNun(0,300))
			ctx.strokeStyle=randColor(60,160)
			ctx.stroke();
		}
		// 绘制干扰点
		for(var i=0;i<10;i++){
			ctx.beginPath();
			ctx.arc(randNun(0,120),randNun(0,30),randNun(1,4),0,2*Math.PI)
			ctx.strokeStyle=randColor(60,160);
			ctx.stroke();
		}
	}

	function randColor(min,max){
		var r=Math.floor(Math.random()*(max-min+1)+min); //[0,max-min)+min==>>[min,max)
		var g=Math.floor(Math.random()*(max-min+1)+min);
		var b=Math.floor(Math.random()*(max-min+1)+min);
		return 'rgb('+r+','+g+','+b+')';
	}
	function randNun(min,max){
		var num = Math.floor(Math.random()*(max-min+1)+min)
		return num
	}
}
