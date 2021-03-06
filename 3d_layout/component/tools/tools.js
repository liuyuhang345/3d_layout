// 3d-object component : helper . helper for learning .
// @copy yuhang.liu 刘宇航
// qq:578384498
// date 2-14-2021
// email:liuyuhang345@163.com



// 实现{{}}绑定js的变量的作用，在html中可以使用{{}}显示变量或表达式,注意：只对body的孙子以下的元素起作用

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


/*****************************************************************************************/
// String.prototype.format方法，来自网友sky，在此表示感谢
/**
 * 定义原生使用占位符的方法，格式化数据
 * @author sky
 * @date 2018-07-09
 * @returns {*}
 */
String.prototype.format = function () {
    // 数据长度为空，则直接返回
    if (arguments.length == 0){
        return this;
    }
 
    // 使用正则表达式，循环替换占位符数据
    for (var result = this, i = 0; i < arguments.length; i++){
        result = result.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
        return result;
    }
};
// String.prototype.format方法的版权声明
// 版权声明：本文为CSDN博主「myzksky」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/myzksky/article/details/80967935
/**************************************************************************************************/