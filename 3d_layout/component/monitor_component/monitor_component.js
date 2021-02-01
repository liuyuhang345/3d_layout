// "+act+" 3d-object component for jQuery . help learning .
// @copy yuhang.liu 刘宇航
// qq:578384498
// date 1-28-2021
// email:liuyuhang345@163.com

var ydeg = 0;
var xdeg = 0;
var zdeg = 0;
var ypx = 0;
var xpx = 0;
var zpx = 0;

var y = -1;
var x = -1;
var mouseIsDown = false;
var act = "rotate"; //动作
var unit = "deg"; //3d变换的单位
var preTansform = ''; //上一次的3D变换属性值
var flag = 'xy'; //默认依赖x和y两个轴变换

// 设置平移或旋转
function setAction(action, selectorObject) {
	act = action ? action : 'rotate';
	unit = (action == 'translate' ? 'px' : 'deg');
	// preTansform = $(selectorObject).css("transform");
	// console.log(preTansform);
}

// 设置变换依赖的坐标轴
function setAxis(axis) {
	flag = axis;
}

// 开启3d变换的鼠标联动
function $watch(selectorMain, selectorObject, axis, action) {

	setAction(action, selectorObject);
	setAxis(axis);

	$(selectorMain).attr("tabindex", "0")
		.on("mousemove", function(e) {
			if (y > -1 && x > -1 && mouseIsDown) {



				if (flag == 'x') { //旋转
					if (act == 'rotate') {
						xdeg = xdeg + (e.pageY - y);
					} else { //平移
						xpx = xpx + (e.pageX - x);
					}

				} else if (flag == 'y') {
					if (act == 'rotate') {
						ydeg = ydeg + (e.pageX - x);
					} else {
						ypx = ypx + (e.pageY-y);
					}
					
				} else if (flag == 'z') {
					if (act == 'rotate'){
						zdeg = zdeg + (e.pageY - y);
					}else{
						zpx = zpx + (e.pageY - y);
					}
					
				} else {
					if (act == 'rotate'){
						xdeg = xdeg + (e.pageY - y);
						xdeg = xdeg + (e.pageY - y);
					}else{
						xpx = xpx + (e.pageX - x);
						ypx = ypx + (e.pageY-y);
					}
					
				}
				
				
				bh_rotate = act + "Y(" + ydeg + unit + ") " + act + "X(" + xdeg + unit + ")" + act + "Z(" +
					zdeg + unit + ")";
				$(selectorObject).css("transform", );
					
					
				console.log("x:" + xdeg + unit + ";" + "y:" + ydeg + unit + ";" + "z:" + ydeg + unit + "");
				console.log($(selectorObject).css("transform"));
			}
			y = e.pageY;
			x = e.pageX;
		})
		.on("mousedown", function() {
			mouseIsDown = true
		})
		.on("mouseup", function() {
			mouseIsDown = false
		})
		.on("keyup", function(e) {
			switch (e.key) {
				case 't':
					setAction("translate", "selectorObject");
					break;
				case 'r':
					setAction("rotate", "selectorObject");
					break;
				case 'x':
				case 'y':
				case 'z':
					setAxis(e.key);
					break;
				case 'p':
					setAxis('xy');
					break;
				default:
					break;
			}
		})
}
