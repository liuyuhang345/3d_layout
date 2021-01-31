// rotate 3d-object component for jQuery . help learning .
// @copy yuhang.liu 刘宇航
// qq:578384498
// date 1-28-2021
// email:liuyuhang345@163.com

var ydeg = 0;
	var xdeg = 0;
	var y = -1 ;
	var x = -1 ;
	var mouseIsDown = false;
	
	
function $watch(selectorMain,selectorObject,flag){
	$(selectorMain).on("mousemove",function(e){
		if(y>-1 && x>-1 && mouseIsDown){
			xdeg = ydeg + (e.pageY - y) ;
			ydeg = xdeg + (e.pageX - x) ;
			if(flag && flag=='x'){
				$(selectorObject).css("transform","rotateY("+0+"deg) rotateX("+xdeg+"deg)");
			}else if(flag && flag=='y'){
				$(selectorObject).css("transform","rotateY("+ydeg+"deg) rotateX("+0+"deg)")
			}else if(flag && flag=='z'){
				$(selectorObject).css("transform","rotateZ("+ydeg+"deg)")
			}
			else{
				if(Math.abs(e.pageY - y) > Math.abs(e.pageX - x)){
					$(selectorObject).css("transform","rotateY("+(ydeg-(e.pageY-y))+"deg) rotateX("+xdeg+"deg)");
				}else{
					$(selectorObject).css("transform","rotateY("+ydeg+"deg) rotateX("+(xdeg-(e.pageX - x))+"deg)")
				}
				// $(selectorObject).css("transform","rotateY("+ydeg+"deg) rotateX("+xdeg+"deg)")
			}
		console.log("x:"+xdeg+"deg;"+"y:"+ydeg+"deg;"+"z:"+ydeg+"deg");
		}
		y = e.pageY;
		x = e.pageX;
	}).on("mousedown",function(){mouseIsDown=true}).on("mouseup",function(){mouseIsDown=false})
}