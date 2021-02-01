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
var bh_tr = ''; //当前的3D变换暂存变量
var bh_tr_state = '' ;
var bh_tr_add = false; //true标记需要累加新的3D变换

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

function resertState() {

	ydeg = 0;
	xdeg = 0;
	zdeg = 0;
	ypx = 0;
	xpx = 0;
	zpx = 0;
}

// 做瞬态保持保存，后续3D变换将在此基础上进行
function saveState() {
	bh_tr_state = bh_tr ;//保存当前3D状态
	resertState();
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
						ypx = ypx + (e.pageY - y);
					}

				} else if (flag == 'z') {
					if (act == 'rotate') {
						zdeg = zdeg + (e.pageY - y);
					} else {
						zpx = zpx + (e.pageY - y)+(e.pageX - x);
					}

				} else {
					if (act == 'rotate') {
						xdeg = xdeg + (e.pageY - y);
						xdeg = xdeg + (e.pageY - y);
					} else {
						xpx = xpx + (e.pageX - x);
						ypx = ypx + (e.pageY - y);
					}

				}


				// bh_rotate = act + "Y(" + ydeg + unit + ") " + act + "X(" + xdeg + unit + ")" + act + "Z(" +
				// 	zdeg + unit + ")";



				
					bh_tr = bh_tr_state + " rotateX(" + xdeg + "deg) " +
						"rotateY(" + ydeg + "deg) " +
						"rotateZ(" + zdeg + "deg) " +
						"translateX(" + xpx + "px) " +
						"translateY(" + ypx + "px) " +
						"translateZ(" + zpx + "px) ";
					
				
				$(selectorObject).css("transform", bh_tr);


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
				case 's':
					saveState();
				default:
					break;
			}
		})
}
