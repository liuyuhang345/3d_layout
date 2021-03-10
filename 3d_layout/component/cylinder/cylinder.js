// 3d-object component ：cylinder . helper for learning .
// @copy yuhang.liu 刘宇航
// qq:578384498
// date 2-14-2021
// email:liuyuhang345@163.com


/**
 * @description 构建圆柱
 * @param {Object} selectorMe CSS选择器或JQ对象，圆柱的容器
 * @param {String} r 圆柱的半径
 * @param {String} height 圆柱的高度
 * @param {String} color 圆柱的颜色
 * @param {String} img 圆柱的表面图像路径
 * @param {Number} level 圆柱的面由leve个“竖条”组成
 * @param {String} scaleModeNum 图片的显示模式:可选的值有："1"---每个竖条显示完整img；"2"---按照原高度完整显示多个img；或"3" 整个柱面显示一副完整的img
 */
function $cylinder(selectorMe, r, height, color, img, level, scaleModeNum) {
	$(selectorMe).each(function(c) {
		$cylinder_985665767($(this), r, height, color, img, level, scaleModeNum)
	})
}


// 单个选择器选中的元素变成圆柱
function $cylinder_985665767(selectorMe, r, height, color, img, level, scaleModeNum) {

	var div = $("<div></div>");

	// 求图片在柱子上的展开模式
	var modeNum = scaleModeNum || '3';
	var mode = "";
	switch (modeNum) {
		case '1':
			mode = "100% 100%";
			break;
		case '2':
			mode = "auto 100%";
			break;
		case '3':
			mode = "calc(2*" + Math.PI + "*" + r + ") " + height;
			break;
	}

	var jxs = 2 * Math.sin(Math.PI / level); //每个柱面相对于半径r的的宽度系数
	div.css({
		"position": "absolute",
		"width": StringTools.New("calc(2px + ").append(r).append("*").append(jxs).append(")").toString(),
		"height": height,
		"background-color": (img) ? "transparent" : color || "red",
		"background-image": "url(" + img + ")",
		"background-size": mode,
		"left": StringTools.New("calc(50% - ").append(r).append("*").append(jxs).append("/2").append(")").toString(),
		"top": StringTools.New("calc(50% - ").append(height).append("/2").append(")").toString(),
		"overflow": "hidden"
	});


	$(selectorMe).css("transform-style", "preserve-3d");
	$(selectorMe).addClass("cylinder_" + (Math.random() + "").replace(".", "_")); //增加一个用于选择的唯一class

	for (i = 0; i < parseInt(level); i++) {
		var d = div.clone();
		d.addClass("div_" + (Math.random() + "").replace(".", "_"));


		if ((modeNum == '3') || (modeNum == '2')) {
			var mv = StringTools.New("calc(0px - ")
				.append(r).append("*").append(jxs)
				.append("*").append(i).append(")")
				.append(" 0px").toString();

			d.css("background-position", mv);
		}


		d.css("transform", "rotateY(" + 360 / level * i + "deg) translateZ(" + r + ")");
		$(selectorMe).append(d);

	}

}
