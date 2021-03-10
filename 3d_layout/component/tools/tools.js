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

/*
此方法用于替代StringTools
*/
String.prototype.add=function(str){
	return this+str;
}


// 实现占位符
/**
 * @description 在字符串中使用占位符{0}{1}......{n}
 * @param {String,String，...，String} 可变数量的参数对应替换占位符{0}{1}......{n} 
 * @example "rotateX({0}deg) rotateY({1}{2})".format(30,"25","rad") ,结果返回字符串"rotateX(30deg) rotateY(25rad)"
 */
String.prototype.format = function () {
    // 数据长度为空，则直接返回
    if (arguments.length == 0){
        return this;
    }
 
    // 使用正则表达式，循环替换占位符数据
    for (var result = this, i = 0; i < arguments.length; i++){
        result = result.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
    }
	return result;
};


// 进入全屏
  function $launchFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
		alert()
      element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
	
  }
  // 退出全屏
  function $exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }