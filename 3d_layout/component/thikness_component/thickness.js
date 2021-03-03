// 3d-object component : thinkness . helper for learning .
// @copy yuhang.liu 刘宇航
// qq:578384498
// date 2-14-2021
// email:liuyuhang345@163.com

// css的3D环境下，给容器元素（典型是div元素）增加厚度
// selector是选择器，px是厚度（单位px）
function $thickness(selector, px) {
	var newE = $("<div></div>");
	newE.css({
		"position": "absolute",
		"width": $(selector).css("width"),
		"height": $(selector).css("height"),
		"background": $(selector).css("background"),
		"border-radius": $(selector).css("border-radius"),
		"border": $(selector).css("border")
		// "background-color":$(selector).css("background-color")
		// "left":$(selector).css("left"),
		// "top":$(selector).css("border"),
	});

	// newE.attr("class",$(selector).attr("class"));
	newE.html($(selector).clone().html());

	if (parseInt(px) > 0) { //防止误删除容器内容、而没有为其增加原来的内容
		// $(selector).html('').css("transform-style","preserve-3d");
		$(selector).css("transform-style", "preserve-3d");
	} else {
		$(selector).css("transform-style", "preserve-3d"); //增加3D特性
	}


	for (var i = 0; i < parseInt(px); i++) {
		e = newE.clone();
		e.css("transform", "translateZ(" + (-1 - i) + "px)");
		$(selector).append(e);
	}

	// $(selector).css("border","green 0px solid");//去掉它自身的边

}
