// 3d-object component . helper for learning .
// @copy yuhang.liu 刘宇航
// qq:578384498
// date 2-14-2021
// email:liuyuhang345@163.com

function $cylinder(selectorMe, r, height, color, img, level, scaleModeNum) {

	var div = $("<div></div>");


	// 求图片在柱子上的展开模式
	var modeNum = scaleModeNum || '3' ;
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
		"background-color": color || "red",
		"background-image": "url(" + img + ")",
		"background-size": mode,
		"left": StringTools.New("calc(50% - ").append(r).append("*").append(jxs).append("/2").append(")").toString(),
		"top": StringTools.New("calc(50% - ").append(height).append("/2").append(")").toString(),
		"overflow": "hidden"
	});


	$(selectorMe).css("transform-style", "preserve-3d");

	for (i = 0; i < parseInt(level); i++) {
		var d = div.clone();
		d.addClass("div_" + (Math.random() + "").replace(".", "_"));

		
		if((modeNum=='3') || (modeNum=='2')){
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
