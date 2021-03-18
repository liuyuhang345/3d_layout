// 3d-object component : thinkness . helper for learning .
// @copy yuhang.liu 刘宇航
// qq:578384498
// date 2-14-2021
// email:liuyuhang345@163.com


/**
 * @description 改变容器元素的厚度
 * @param {Object} selector 要改变厚度的元素的选择器
 * @param {Object} px 厚度
 */
function $thickness(selector, px) {
	var newE = $("<div></div>");
	newE.css({
		"position": "absolute",
		"width": $(selector).css("width"),
		"height": $(selector).css("height"),
		"background": $(selector).css("background"),
		"border-radius": $(selector).css("border-radius"),
		"border": $(selector).css("border")
	});

	newE.html($(selector).clone().html());

	if (parseInt(px) > 0) { //防止误删除容器内容、而没有为其增加原来的内容
		$(selector).css("transform-style", "preserve-3d");
	} else {
		$(selector).css("transform-style", "preserve-3d"); //增加3D特性
	}

	for (var i = 0; i < parseInt(px); i++) {
		e = newE.clone();
		e.css("transform", "translateZ(" + (-1 - i) + "px)");
		$(selector).append(e);
	}

}
