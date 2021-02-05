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
var sx = 1;
var sy = 1;
var sz = 1;

var y = -1;
var x = -1;
var mouseIsDown = false;
var act = "rotate"; //动作
var unit = "deg"; //3d变换的单位
var preTansform = ''; //上一次的3D变换属性值
var flag = 'xy'; //默认依赖x和y两个轴变换
var bh_tr = ''; //当前的3D变换暂存变量
var bh_tr_state = '';
var bh_tr_add = false; //true标记需要累加新的3D变换
var selectedObject_JQuery=null; //被（鼠标双击）选中的当前进行3D变换的元素的jquery对象
var old_transform_data = {};//存放历史变换数据的字典，key为选择器

function put_transform_data(old_sel_JQuery){
	saveState();//将所有历史状态保存在bh_tr_state中
	key = old_sel_JQuery.attr("class");
	
	old_transform_data[key] =
	{
    // "ydeg":	ydeg ,
    // "xdeg":	xdeg ,
    // "zdeg":	zdeg ,
    // "ypx ":	ypx  ,
    // "xpx ":	xpx  ,
    // "zpx ":	zpx  ,
    // "sx  ":	sx   ,
    // "sy  ":	sy   ,
    // "sz  ":	sz   ,
	// 上次的变换
	"bh_tr_state":bh_tr_state
	};
	
	console.log("save:"+key+","+old_transform_data[key].bh_tr_state);
	
}

//
function restore_transform_data(sel_JQuery){
	key = sel_JQuery.attr("class");
	if(old_transform_data[key]){
		bh_tr_state = old_transform_data[key].bh_tr_state;
		bh_tr = "";
		console.log(("restore:"+key+","+bh_tr_state));
	}else{
		resertState();
		bh_tr_state="";
	}
	
	
}

// 设置平移或旋转或缩放
function setAction(action) {
	act = action ? action : 'rotate';
	unit = (action == 'translate' ? 'px' : 'deg');
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
	sx = 1;
	sy = 1;
	sz = 1;
}


// 做瞬态保持保存，后续3D变换将在此基础上进行
function saveState() {
	bh_tr_state = bh_tr; //保存对象的本次3D状态，便于累加新的变换
	resertState();
}

// 隐藏坐标轴,传入jquery对象
function switchAxis(jobj){
	if($(".axis",jobj)){
		$(".axis",jobj).remove();
	}else{
		
	}
}
// 开启3d变换的鼠标联动
function $watch(selectorMain, transformObject, axis, action,objectSets) {
	selectedObject_JQuery = $(transformObject);
	setAction(action, transformObject);
	setAxis(axis);
	$(objectSets).on("dblclick",function(){
		$(".axis",selectedObject_JQuery).remove();//移走原来变换对象的坐标轴
		put_transform_data(selectedObject_JQuery);//保存现场
		
		selectedObject_JQuery = $(this);//改变变换对象为鼠标双击的元素
		
		$show_axis_Ex(selectedObject_JQuery);//显示坐标轴
		restore_transform_data(selectedObject_JQuery);//恢复现场变换数据
	});
	
	$(selectorMain).attr("tabindex", "0").focus()
		.on("mousemove", function(e) {
			if (y > -1 && x > -1 && mouseIsDown) {
				dlt = (e.pageY - y) + (e.pageX - x);
				if (flag == 'x') { //旋转
					if (act == 'rotate') {
						xdeg = xdeg + dlt;
					} else if (act == 'translate') { //平移
						xpx = xpx + dlt;
					} else {
						sx = sx - dlt / 10;
					}

				} else if (flag == 'y') {
					if (act == 'rotate') {
						ydeg = ydeg + dlt;
					} else if (act == 'translate') {
						ypx = ypx + dlt;
					} else {
						sy = sy - dlt / 10;
					}

				} else if (flag == 'z') {
					if (act == 'rotate') {
						zdeg = zdeg + dlt;
					} else if (act == 'translate') {
						zpx = zpx + dlt;
					} else {
						sz = sz - dlt / 10;
					}

				} else {
					if (act == 'rotate') {
						xdeg = xdeg + (e.pageY - y);
						ydeg = ydeg + (e.pageX - x);
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
					"translateZ(" + zpx + "px) " +
					"scale3d("+sx+","+sy+","+sz+")";


				selectedObject_JQuery.css("transform", bh_tr);


				// console.log("x:" + xdeg + unit + ";" + "y:" + ydeg + unit + ";" + "z:" + ydeg + unit +"scale:"+ sx+","+sy+","+sz);
				// console.log(selectedObject_JQuery.css("transform"));
				console.log(bh_tr);
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
					setAction("translate");
					break;
				case 'r':
					setAction("rotate");
					break;
				case 's':
					setAction("scale");
					break;

				case 'x':
				case 'y':
				case 'z':
					setAxis(e.key);
					break;
				case 'p':
					setAxis('xy');
					break;
				case 'k':
					saveState();
					break;
				case 'a':
					switchAxis($(this));
					break;
				default:
					break;
			}
		})
}
