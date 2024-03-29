// 3d-object component  :  line 注意：cylinder 可以当3D立体（有粗细的）直线用  . helper for learning .
// @copy yuhang.liu 刘宇航
// qq:578384498
// date 2-14-2021
// email:liuyuhang345@163.com

// 中间版本，开发中，未完

/**
 * @description  画3D空间中的线段.
 * @param {Object} selectorMe 线段所在的容器，CSS选择器或JQ对象
 * @param {Object} point1 起始点
 * @param {Object} point2 结束点
 * @param {Object} color 线段的颜色
 * @param {Object} width 线段的宽度
 * @param {Object} unit 坐标的刻度单位，省略此参数，默认为"px"
 * @example 例如$line(".div002",[2,3,10],[3,1,5],"#ff0000",2,"px")
 */
function $line(selectorMe, point1, point2, color, width, unit) {
	var unit = unit || "px";
	var width = parseInt(width) || 1;
	var color = color || "black";

	$(selectorMe).css("transform-style", "preserve-3d");
	// 创建div，表示点
	var point = $("<div></div>");

	var mcss = {
		"position": "absolute", //左端作为原点
		"background-color": color,
		"width": width + unit,
		"height": 1 + unit,
		"left": "calc(50% - {0}{1}/2)".format(width, unit),
		"top": "calc(50% - 0.5{0})".format(unit)
	};

	point.css(mcss);


	var dx = Math.abs(point2[0] - point1[0]);
	var dy = Math.abs(point2[1] - point1[1]);
	var dz = Math.abs(point2[2] - point1[2]);

	var x = 0;
	var y = 0;
	var z = 0;

	var maxindex = 0;
	if(dx==dy && dy==dz && dx == 0) { //全相等
		x = point1[0];
		y = point1[1];
		z = point1[2];
		point.clone().css("transform", "translate3d({0}{3},{1}{3},{2}{3})".format(x, y, z, unit)).appendTo(selectorMe);
		return;
	}else if (dx >= dy && dx >= dz) {
		maxindex = 0;
	} else if (dy >= dx && dy >= dz) {
		maxindex = 1;
	} else if (dz >= dx && dz >= dy) {
		maxindex = 2;
	}  

	var start=Math.min(point1[maxindex],point2[maxindex]);
	var end = Math.max(point1[maxindex],point2[maxindex]);
	
	for (i = start; i <= end ; i++) {
		var a = (i - point1[maxindex]) / (point2[maxindex] - point1[maxindex]);
			x = a * (point2[0] - point1[0]) + point1[0];
			y = a * (point2[1] - point1[1]) + point1[1];
			z = a * (point2[2] - point1[2]) + point1[2];
		point.clone().css("transform", "translate3d({0}{3},{1}{3},{2}{3})".format(x, y, z, unit)).appendTo(selectorMe);

	}

}
