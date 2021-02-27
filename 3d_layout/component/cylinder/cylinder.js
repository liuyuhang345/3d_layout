// 3d-object component . helper for learning .
// @copy yuhang.liu 刘宇航
// qq:578384498
// date 2-14-2021
// email:liuyuhang345@163.com

function $cylinder(selectorMe, r, height, color, img, level) {

	var div = $("<div></div>");

	var jxs = 2 * Math.sin(Math.PI / level); //每个柱面相对于半径r的的宽度系数
	div.css({
		"position": "absolute",
		"width": StringTools.New("calc(").append(r).append("*").append(jxs).append(")").toString(),
		"height": height,
		"background-color": color || "red",
		"background-image":"url("+img+")",
		"background-size":"100% 100%",
		"left": StringTools.New("calc(50% - ").append(r).append("*").append(jxs).append("/2").append(")").toString(),
		"top": StringTools.New("calc(50% - ").append(height).append("/2").append(")").toString()
	});


	$(selectorMe).css("transform-style", "preserve-3d");
	
	for (i = 0; i < parseInt(level); i++) {
		var d = div.clone();
		d.addClass("div_" + (Math.random() + "").replace(".", "_"));
		
		d.css("transform", "rotateY(" + 360 / level * i + "deg) translateZ(" + r + ")");
		$(selectorMe).append(d);

	}




}
