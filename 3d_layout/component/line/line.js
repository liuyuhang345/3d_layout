// 3d-object component  :  line 注意：cylinder 可以当3D立体（有粗细的）直线用  . helper for learning .
// @copy yuhang.liu 刘宇航
// qq:578384498
// date 2-14-2021
// email:liuyuhang345@163.com

// 画3D空间中的直线：例如$line([2,3,10],[3,1,5],"#ff0000",2,"px")
function $line(selectorMe, point1, point2, color, width, unit) {

	var selectorMe = selectorMe || "body>div:first";

	var unit = unit || "px";
	var width = width || "1px";
	var color = color || "black";

	var L = 0;
	try {
		// 求直线长度
		L = Math.pow(point1[0] - point2[0], 2) +
			Math.pow(point1[1] - point2[1], 2) +
			Math.pow(point1[2] - point2[2], 2);
		L = Math.sqrt(L);

	} catch (e) {
		console.log(e);
		return;
	}

	// 创建div，表示为线条

	var el = $("<div></div>");
	el.css("border-top", StringTools.New(color)
		.append(" solid ")
		.append(width)
		.toString()
	)
	el.css("width", L + unit);

	// 平移到第一个点，设置第一个点的位置为div的旋转中心

	// 暂时不采用齐次坐标变换，实现画直线


	var Az = Math.atan2((point2[1] - point1[1]), (point2[0] - point1[0])); //按照Z轴旋转的角度

	var Ay = Math.atan2((point2[0] - point1[0]), (point2[2] - point1[2])); //按照Y轴旋转的角度

	var Ax = Math.atan2((point2[2] - point1[2]), (point2[1] - point1[1])); //按照Y轴旋转的角度



	el
		.css("transform-origin", "0% 0%")
		.css("position", "absolute") //左端作为原点
		.css("left", "calc(" + $(selectorMe).css("width") + "/2 + " + point1[0] + unit + ")")
		.css("top", "calc(" + $(selectorMe).css("height") + "/2 + " + point1[1] + unit + ")");


	el.css("transform",
		StringTools.New("")
		.append("rotateZ(" + Az + "rad) ")
		.append("rotateY(" + Ay + "rad) ")
		.append("rotateX(" + Ax + "rad)")
	);

	console.log("L=" + L + ";Az=" + Az / Math.PI * 180 + ";Ay=" + Ay / Math.PI * 180);
	el.appendTo(selectorMe);

}
