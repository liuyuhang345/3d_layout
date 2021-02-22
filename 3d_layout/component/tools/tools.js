// 3d-object component . helper for learning .
// @copy yuhang.liu 刘宇航
// qq:578384498
// date 2-14-2021
// email:liuyuhang345@163.com

// 字符换追加工具，避免用加号连接变量带来的混乱，增加代码可读性


var StringTools = {

	New: function(str) {
		strObject = {};
		strObject.str = str || "";
		strObject.toString = function() {
			return strObject.str
		};

		strObject.append = function(str) {
			strObject.str = strObject.str + str;
			return strObject;
		};

		return strObject;
	}

};

// 用于组件开发中，求得当前被应用得js或css的路径
function getImportRootPath(js_css_filename) {
	var js = document.scripts || document.getElementsByTagName("script");
	var jsPath;
	for (var i = js.length; i > 0; i--) {
		// if (js[i - 1].src.indexOf("import.js") > -1) {
		if (js[i - 1].src.indexOf(js_css_filename) > -1) {
			jsPath = js[i - 1].src.substring(0, js[i - 1].src.lastIndexOf("/") + 1);
		}
	}
	return jsPath;
}

