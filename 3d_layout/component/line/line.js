// 3d-object component  :  line 注意：cylinder 可以当3D立体（有粗细的）直线用  . helper for learning .
// @copy yuhang.liu 刘宇航
// qq:578384498
// date 2-14-2021
// email:liuyuhang345@163.com

// 中间版本，开发中，未完

// 画3D空间中的直线：例如$line([2,3,10],[3,1,5],"#ff0000",2,"px")
function $line(selectorMe, point1, point2, color, width, unit) {

	var selectorMe = selectorMe || "body>div:first";

	var unit = unit || "px";
	var width = parseInt(width) || 1;
	var color = color || "black";

	var L = 0;
	L = Math.pow(point1[0] - point2[0], 2) +
		Math.pow(point1[1] - point2[1], 2) +
		Math.pow(point1[2] - point2[2], 2);
	L = Math.sqrt(L);

	// 创建div，表示线条
	var el = $("<div><div><div></div></div></div>");
	el.appendTo(selectorMe);

	var mcss = {
		"transform-origin": "0% 0% 0%",
		"position": "absolute", //左端作为原点
		"border": "1px green solid",
		"width": "100%",
		"height": "100%"
	};
	// $("#lyh_rq_a,#lyh_rq_b,#lyh_line_1").css(mcss); 
	el.css(mcss);
	var el_z = el.children("div").css(mcss);
	var el_y = el_z.children("div").css(mcss);
	$cylinder(el_y, width / 2 + unit, L + unit, color, "", 10, "3");

	var Az = Math.atan2((point2[1] - point1[1]), (point2[0] - point1[0])); //按照Z轴旋转的角度
	var Ay = Math.atan2((point2[2] - point1[2]), (point2[0] - point1[0])); //按照Y轴旋转的角度

	el_z.css("transform",
		"rotateZ({0}rad)".format(Az)
	);

	el_y.css(
		"transform",
		"rotateY({0}rad)".format(Ay)
	)


	// console.log("L=" + L + ";Az=" + Az / Math.PI * 180);

}
