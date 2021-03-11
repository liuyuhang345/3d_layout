// show 3d-axis component ： axis . help learning .
// @copy yuhang.liu (刘宇航)
// qq:578384498
// date 1-28-2021
// email:liuyuhang345@163.com

var ipath = getImportRootPath("show-axis.js");
$(function() {
	$("<link>")
		.attr({
			rel: "stylesheet",
			type: "text/css",
			href: ipath + 'show-axis.css'
		})
		.appendTo("head");
})

/**
 * @description 显示3D坐标轴，传入CSS选择器或JQ对象。
 * @param {Object} selector CSS选择器或jquery对象
 */
function $show_axis(selector) {
	$show_axis_Ex($(selector));
}

//为元素追加3D坐标轴，传入jquery对象
function $show_axis_Ex(selector_JQuery, bk) {
	var bk = bk || "-2";
	var to = selector_JQuery
		.css("transform-style", "preserve-3d")
		.css("transform-origin").split(" ");
	var x0 = to[0];
	var y0 = to[1];

	// 把坐标轴的外部样式改成行内样式，用于防止用户无意的设置干扰。
	var axis =
		'position: absolute;width: 20cm; height: 2cm;background-color:transparent;background-repeat: no-repeat;background-size: 100% 100%;'

	var x = $("<div class='axis x-axis' style='" + axis + "background-image: url(" + ipath +
		"x-axis{0}.PNG);'></div>".format(bk));
	var y = $("<div class='axis y-axis' style='" + axis + "background-image: url(" + ipath +
		"y-axis{0}.PNG);transform: rotateZ(90deg);'></div>".format(bk));
	var z = $("<div class='axis z-axis' style='" + axis + "background-image: url(" + ipath +
		"z-axis{0}.PNG);transform: rotateY(-90deg);'></div>".format(bk));

	var m_left = "calc(" + x0 + " - 10cm)";
	var m_top = "calc(" + y0 + " - 1cm)"; //此处的0.5cm/3cm是坐标轴高度/宽度的一半。其高度在show-axis.css被设定

	x.css("left", m_left).css("top", m_top);
	y.css("left", m_left).css("top", m_top);
	z.css("left", m_left).css("top", m_top);

	selector_JQuery.append(x);
	selector_JQuery.append(y);
	selector_JQuery.append(z);

}