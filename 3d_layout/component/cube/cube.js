// 3d-object component ：cube . helper for learning .
// @copy yuhang.liu 刘宇航
// qq:578384498
// date 2-14-2021
// email:liuyuhang345@163.com



function $cube(selectorMe, lenght, width, height, imgs, opacity, contextLocation) {
	$(selectorMe).each(function() {
		$cube__my67855688888($(this), lenght, width, height, imgs, opacity, contextLocation);
	})
}

// 在selectorMe里面打造一个长方体，其长宽高度为参数lenght,width,height，六个面得图像列表为imgs数组，绝对路径（即"/"开头得路径） 。
function $cube__my67855688888(selectorMe, lenght, width, height, imgs, opacity, contextLocation) {
	var e = $(selectorMe);
	e.css("transform-style", "preserve-3d");
	e.addClass("cube" + (Math.random() + "").replace(/\./g, "_"));
	var to = e.attr("transform-origin"); //保留原来的3d变换中心
	e.attr("transform-origin", "50% 50%");

	// 创建新的面模板
	var face = $("<div></div>");
	var faces = [];

	// 立方体的长宽高
	var l = lenght;
	var w = width;
	var h = height;



	var contextLocation_index = parseInt(contextLocation) || 0;
	if (contextLocation_index != 0) {
		// 保存老内容
		var lost_context = e.html();
		$(selectorMe).html(''); //原div充当容器，不再需要内容
	}

	// clone 6个面,追加到selectorMe元素中
	var id_part = (Math.random() + "").replace(/0\./g, "_");
	for (i = 0; i < 6; i++) {
		faces[i] = face.clone();
		e.append(faces[i]);

		$(faces[i]).css({
			"position": "absolute",
			"background": e.css("background"),
			"border": e.css("border"),
			"background-size": "100% 100%",
			"opacity": opacity
		}).addClass("cubeface_" + id_part + i);
	}

	// e对象无用了，使其不显示在界面上
	e.css("background-image", 'none').css("background-color", "transparent");

	if (contextLocation_index != 0) {
		// 老内容放入立方体的正前方面
		$(faces[contextLocation_index - 1]).html(lost_context).css('text-align', 'center').css("inli-height", w);
	}


	// 设置各个面的宽高
	$(faces[0]).css("width", l).css("height", w);
	$(faces[1]).css("width", l).css("height", w);
	$(faces[2]).css("width", l).css("height", h);
	$(faces[3]).css("width", l).css("height", h);
	$(faces[4]).css("width", w).css("height", h);
	$(faces[5]).css("width", w).css("height", h);




	//设置背景图片
	if (imgs && imgs.join("-").replace(/-/g, '').length > 4) {
		// if(imgs && imgs[0] && imgs[0].length>0){
		$(faces[0]).css("background-image", "url(" + (imgs[0] || '') + ")");
		$(faces[1]).css("background-image", "url(" + (imgs[1] || imgs[0] || '') + ")");
		$(faces[2]).css("background-image", "url(" + (imgs[2] || imgs[0] || '') + ")");
		$(faces[3]).css("background-image", "url(" + (imgs[3] || imgs[2] || imgs[0] || '') + ")");
		$(faces[4]).css("background-image", "url(" + (imgs[4] || imgs[2] || imgs[0] || '') + ")");
		$(faces[5]).css("background-image", "url(" + (imgs[5] || imgs[2] || imgs[0] || '') + ")");
	} else {
		// 设置面的默认颜色
		$(faces[0]).css("background-color", "red");
		$(faces[1]).css("background-color", "orange");
		$(faces[2]).css("background-color", "yellow");
		$(faces[3]).css("background-color", "green");
		$(faces[4]).css("background-color", "black");
		$(faces[5]).css("background-color", "blue");
	}



	//让各个面居中
	for (i = 0; i < 6; i++) {
		$(faces[i]).css({
			"left": "calc(50% - " + $(faces[i]).css("width") + "/2)",
			"top": "calc(50% - " + $(faces[i]).css("height") + "/2)"
		})
	}

	// 组成立方体

	$(faces[0]).css("transform", "rotateX(90deg) translateZ(calc(" + h + "/2))");
	$(faces[1]).css("transform", "rotateX(270deg) translateZ(calc(" + h + "/2))");
	$(faces[2]).css("transform", "translateZ(calc(" + w + "/2))");
	$(faces[3]).css("transform", "rotateX(180deg) translateZ(calc(" + w + "/2)) rotateZ(180deg)");
	$(faces[4]).css("transform", "rotateY(90deg) translateZ(calc(" + l + "/2))");
	$(faces[5]).css("transform", "rotateY(270deg) translateZ(calc(" + l + "/2))");


	e.attr("transform-origin", to); //恢复3d变换中心 



}
