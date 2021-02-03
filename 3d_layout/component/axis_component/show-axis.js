// show 3d-axis component for jQuery . help learning .
// @copy yuhang.liu (刘宇航)
// qq:578384498
// date 1-28-2021
// email:liuyuhang345@163.com

$(function(){
	// 引入css
	$("<link>")
	.attr({ rel: "stylesheet",
	type: "text/css",
	href: getRootPath()+'show-axis.css'
	})
	.appendTo("head");
})
//为元素追加3D坐标轴，传入选择器
function $show_axis(selector){
	
	$show_axis_Ex($(selector));
}

//为元素追加3D坐标轴，传入jquery对象
function $show_axis_Ex(selector_JQuery){
	selector_JQuery.css("transform-style","preserve-3d");
	selector_JQuery.append($("<div class='axis x-axis'></div>"));
	selector_JQuery.append($("<div class='axis y-axis'></div>"));
	selector_JQuery.append($("<div class='axis z-axis'></div>"));
}

// 以下方法专用于做js插件。求得当前js（show-axis.js）所在路径
// 来自https://www.cnblogs.com/blosaa/archive/2011/10/17/2215606.html
// 感谢昵称为“云中雀”的博主
function getRootPath()
{
	var js = document.scripts || document.getElementsByTagName("script");
	    var jsPath;
	    for (var i = js.length; i > 0; i--) {
	        if (js[i - 1].src.indexOf("show-axis.js") > -1) {
	            jsPath = js[i - 1].src.substring(0, js[i - 1].src.lastIndexOf("/") + 1);
	        }
	    }
	    return jsPath;
}