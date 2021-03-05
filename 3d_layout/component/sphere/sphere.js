// 3d-object component ：sphere . helper for learning .
// @copy yuhang.liu 刘宇航
// qq:578384498
// date 2-14-2021
// email:liuyuhang345@163.com


// 支持选择器集合，每个选中的元素都变成圆柱
function $sphere(selectorMe, r, color, img, levelW, levelH, util) {
	$(selectorMe).each(function(c) {
		$sphere_985665767($(this), r, color, img, levelW, levelH, util);
	})
}

// 单个选择器选中的元素变成圆柱
function $sphere_985665767(selectorMe, r, color, img, levelW, levelH, util) {

	var hang = levelH || 10;
	var lie = levelW || levelH;
	var util = util || "px"
	var r = parseInt(r);
	var xianduan = $("<div></div>");

	$(selectorMe).css({
		"transform-style": "preserve-3d"
	});

	xianduan.css({
		"position": "absolute",
		// "background-color": "#" + parseInt(Math.random() * 1000),
		"background-image": "url(" + img + ")",
		"background-repeat":"no-repeat",
		"overflow": "hidden"
	});
	// 行循环，自赤道开始向上+向下，做半圆,2个
	for (H = hang; H >= 0; H--) {

		// 求本行的半径
		var lr = r * Math.cos(Math.asin(moveY / r));

		// 分割的每个小区域的宽度、高度
		var width = 2 * Math.PI * lr / lie;
		var height = r / hang;
		
		// 求本行位移，自赤道开始向上
		var moveY = (hang - H) * height;

		// 设置模板线段的可设置属性
		xianduan.css({
			"height": height + util,
			"width": width + util,
			"left": "calc(50% - " + width / 2 + util + ")" ,//居中
			"background-size": 2 * Math.PI * lr + util + " " + 2 * r + util
		});

		 // $(selectorMe).append(xianduan.clone());// for test
		// 列循环
		for (L = 0; L < lie; L++) {
			for (i = 0; i < 1; i++) { //循环两次，实现上下两个半圆
				var areaSmall = xianduan.clone();
				var UP_DOWN = i == 0 ? " + " : " - ";
				areaSmall.css({
					"top": "calc(50% - " + height / 2 + util + UP_DOWN + moveY + util + ")",
				});
				// 每次沿着Y轴旋转的小度数
				var rotateY = 360 / lie * L;
				// console.log(width * L + util + " " + (0 - r + moveY) + util);
				areaSmall.css({
					"transform": "rotateY(" + rotateY + "deg) translateZ(" + lr + util + ")",
					"background-position": 0-width * L + util + " " + (0 - r - moveY) + util
				});
				
				$(selectorMe).append(areaSmall);
			}

		}
		
		
	}

}
