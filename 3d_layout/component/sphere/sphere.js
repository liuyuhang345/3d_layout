// 3d-object component ：sphere . helper for learning .
// @copy yuhang.liu 刘宇航
// qq:578384498
// date 2-14-2021
// email:liuyuhang345@163.com
// 也可以当圆柱组件使用，即当levelH=1 ,则为圆柱;圆柱那个单独的组件，可以删除了。

// 支持选择器集合，每个选中的元素都变成圆球


/**
 * @description 建立球体
 * @param {Object} selectorMe 用于建立球体的容器，CSS选择器或JQ对象
 * @param {Object} r 半径
 * @param {Object} color 颜色
 * @param {Object} img 表面贴图
 * @param {Object} levelW 球瓣的横向密度，正整数，建议设置在1~30以内
 * @param {Object} levelH 球瓣的竖向密度，正整数，建议设置在1~30以内
 * @param {Object} util 度量单位，默认"px"
 */
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
		"background-repeat": "no-repeat",
		"background-size":"100% 100%",
		// "overflow": "hidden"
	});
	
	// $(".full3d").append(xianduan.clone());// for test
	// // return;
	// 行循环，自赤道开始向上+向下，做半圆,2个
	var count = 0;
	for (H = hang; H > 0; H--) {

		// 本行所占的Y轴高度
		var height = r / hang;

		// 求本行位移，自赤道开始向上
		var moveY = (hang - H) * height;
		// 求本行的半径
		var lr = r * Math.cos(Math.asin(moveY / r));

		// 分割的每个小区域的宽度、高度
		var width = 2 * Math.PI * lr / lie;


		// 设置模板线段的可设置属性
		xianduan.css({
			"height": height / Math.cos(Math.asin(moveY / r)) + util,
			"width": width + util,
			"left": "calc(50% - " + width / 2 + util + ")", //居中
			"background-size": 2 * Math.PI * lr + util + " " + 2 * r + util
		});

		
		// 列循环
		for (L = 0; L < lie; L++) {
			for (i = 0; i < 2; i++) { //循环两次，实现上下两个半圆:i=0为下半个圆
				var areaSmall = xianduan.clone();
				var UP_DOWN = i == 0 ? " + " : " - ";
				
				areaSmall.css({
					"top": "calc(50% - " + height / 2 + util + UP_DOWN + moveY + util + ")",
				});

				// 列区块沿着Y轴旋转的小度数
				var rotateY = 360 / lie * L;
				var bk_top = (i == 0 ? (0 - r - moveY) : (0 - r + moveY));
				var rotateX = (i == 0 ? 0 - Math.asin(moveY / r) : Math.asin(moveY / r));
				areaSmall.css({
					"transform": "rotateY(" + rotateY + "deg) translateZ(" + (lr) + util + ")" +
						"rotateX(" + rotateX + "rad)",
					"background-position": 0 - width * L + util + " " + bk_top + util
				});

				$(selectorMe).append(areaSmall);
				
				console.log(H+"-"+L+"-"+i+":"+rotateY+","+rotateX);
				
			}
			count++;

		}
		
		console.log("count:"+count);


	}

}
