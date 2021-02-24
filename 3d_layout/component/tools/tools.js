// 3d-object component . helper for learning .
// @copy yuhang.liu 刘宇航
// qq:578384498
// date 2-14-2021
// email:liuyuhang345@163.com

// 字符换追加工具，避免用加号连接变量带来的混乱，增加代码可读性

// 实现{{}}绑定js的变量的作用，在html中可以使用{{}}显示变量或表达式

$(function() {
		try {

			$("body>*").each(function() {
				var html2 = $(this).html();
				var myreg = /\{\{([\d\w\+\-\*\/\s\)\(\$]*)\}\}/g;
				html2 = html2.replace(myreg, function(ed) {
					try {
						m = eval(ed);
						return m;
					} catch (e) {
						return "<span style='color:red;font-size:8px;'>" + ed + "未定义</span>";
					}

				});
				$(this).html(html2);

			});

		} catch (e) {
			console.log(e);
		}


	});
	
// 字符串追加工具类
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


