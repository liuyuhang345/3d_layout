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
//为元素追加3D坐标轴，传入选择器
function $show_axis(selector) {

	$show_axis_Ex($(selector));
}

//为元素追加3D坐标轴，传入jquery对象
function $show_axis_Ex(selector_JQuery) {
	to = selector_JQuery
		.css("transform-style", "preserve-3d")
		.css("transform-origin").split(" ");
	x0 = to[0];
	y0 = to[1];

	// 把坐标轴的外部样式改成行内样式，用于防止用户无意的设置干扰。
	axis = 'position: absolute;	width: 20cm; height: 2cm;background-repeat: no-repeat;background-size: 100% 100%;'

	x = $("<div class='axis x-axis' style='" + axis + "background-image: url(" + ipath + "x-axis.PNG);'></div>");
	y = $("<div class='axis y-axis' style='" + axis + "background-image: url(" + ipath +
		"y-axis.PNG);transform: rotateZ(90deg);'></div>");                       
	z = $("<div class='axis z-axis' style='" + axis + "background-image: url(" + ipath +
		"z-axis.PNG);transform: rotateY(-90deg);'></div>");

	m_left = "calc(" + x0 + " - 10cm)";
	m_top = "calc(" + y0 + " - 1cm)"; //此处的0.5cm/3cm是坐标轴高度/宽度的一半。其高度在show-axis.css被设定

	x.css("left", m_left).css("top", m_top);
	y.css("left", m_left).css("top", m_top);
	z.css("left", m_left).css("top", m_top);

	selector_JQuery.append(x);
	selector_JQuery.append(y);
	selector_JQuery.append(z);

}

// 以下方法专用于做js插件。求得当前js（show-axis.js）所在路径
// 来自https://www.cnblogs.com/blosaa/archive/2011/10/17/2215606.html
// 感谢昵称为“云中雀”的博主
// function getRootPath() {
// 	var js = document.scripts || document.getElementsByTagName("script");
// 	var jsPath;
// 	for (var i = js.length; i > 0; i--) {
// 		if (js[i - 1].src.indexOf("show-axis.js") > -1) {
// 			jsPath = js[i - 1].src.substring(0, js[i - 1].src.lastIndexOf("/") + 1);
// 		}
// 	}
// 	return jsPath;
// }
