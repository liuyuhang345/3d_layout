// css的3D环境下，给容器元素（典型是div元素）增加厚度
// selector是选择器，px是厚度（单位px）
// 此为
function $thickness(selector,px){
	var newE = $("<div></div>");
	newE.css({
		"position":"absolute",
		"width":$(selector).css("width"),
		"height":$(selector).css("height"),
		"background":$(selector).css("background"),
		"border-radius":$(selector).css("border-radius"),
		"border":$(selector).css("border")
		// "background-color":$(selector).css("background-color")
		// "left":$(selector).css("left"),
		// "top":$(selector).css("border"),
		});
		
	// newE.attr("class",$(selector).attr("class"));
	newE.html($(selector).clone().html());
	
	if(parseInt(px)>0){//防止误删除容器内容、而没有为其增加原来的内容
		// $(selector).html('').css("transform-style","preserve-3d");
		$(selector).css("transform-style","preserve-3d");
	}else{
		$(selector).css("transform-style","preserve-3d");//增加3D特性
	}
	
	
	for(var i = 0 ;i<parseInt(px);i++){
		e = newE.clone();
		e.css("transform","translateZ("+(-1-i)+"px)");
		$(selector).append(e);
	}
	
	// $(selector).css("border","green 0px solid");//去掉它自身的边
	
}