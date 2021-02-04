// css的3D环境下，给容器元素（典型是div元素）增加厚度
// selector是选择器，px是厚度（单位px）
// 此为
function $thikness(selector,px){
	var newE = $("<div></div>");
	newE.css({
		"position":"absolute",
		"width":$(selector).css("width"),
		"height":$(selector).css("height"),
		"background-color":$(selector).css("background-color"),
		"background-image":$(selector).css("background-image")
		});
	
	newE.html($(selector).clone().html());
	$(selector).html('').css("transform-style","preserve-3d");
	
	for(var i = 0 ;i<parseInt(px);i++){
		e = newE.clone();
		e.css("transform","translateZ("+i+"px)");
		$(selector).append(e);
	}
}