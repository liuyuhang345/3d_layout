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

}

