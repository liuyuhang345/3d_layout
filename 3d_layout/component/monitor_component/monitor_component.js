// "+act+" 3d-object component for jQuery . help learning .
// @copy yuhang.liu 刘宇航
// qq:578384498
// date 1-28-2021
// email:liuyuhang345@163.com

var ydeg = 0;
	var xdeg = 0;
	var y = -1 ;
	var x = -1 ;
	var mouseIsDown = false;
	
	
function $watch(selectorMain,selectorObject,flag,action){
	var act = action?action:'rotate';
	var unit = (action=='translate'?'px':'deg');
	
	$(selectorMain).on("mousemove",function(e){
		if(y>-1 && x>-1 && mouseIsDown){
			xdeg = ydeg + (e.pageY - y) ;
			ydeg = xdeg + (e.pageX - x) ;
			
			if(flag && flag=='x'){
				$(selectorObject).css("transform",act+"Y("+0+unit+") "+act+"X("+xdeg+unit+")");
			}else if(flag && flag=='y'){
				$(selectorObject).css("transform",act+"Y("+ydeg+unit+") "+act+"X("+0+unit+")")
			}else if(flag && flag=='z'){
				$(selectorObject).css("transform",act+"Z("+ydeg+unit+")")
			}
			else{
				if(Math.abs(e.pageY - y) > Math.abs(e.pageX - x)){
					$(selectorObject).css("transform",act+"Y("+(ydeg-(e.pageY-y))+unit+") "+act+"X("+xdeg+unit+")");
				}else{
					$(selectorObject).css("transform",act+"Y("+ydeg+unit+") "+act+"X("+(xdeg-(e.pageX - x))+unit+")")
				}
				// $(selectorObject).css("transform",act+"Y("+ydeg+unit+") "+act+"X("+xdeg+unit+")")
			}
		console.log("x:"+xdeg+unit+";"+"y:"+ydeg+unit+";"+"z:"+ydeg+unit+"");
		}
		y = e.pageY;
		x = e.pageX;
	}).on("mousedown",function(){mouseIsDown=true}).on("mouseup",function(){mouseIsDown=false})
}