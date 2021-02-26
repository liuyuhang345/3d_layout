// 3d-object component . helper for learning .
// @copy yuhang.liu 刘宇航
// qq:578384498
// date 1-28-2021
// email:liuyuhang345@163.com

// js组件，用于提供手动旋转元素的方法。使用格式如下：
// $monitor(selectorMain,selectorObject,axis,isRotate) ，
// 第一个参数是用于捕获鼠标坐标的元素；
// 第二个是被控制旋转的元素。两个参数都是jquery选择器;
// 第三个参数，可以取如下四个值：'x'、'y'、'z'、其它值或省略此参数，分别代表允许的旋转或平移的方向：x、y、z和xy轴旋转。
// 第四个参数，rotate表示旋转，translate表示平移	，其它值表示rotate	
// 第四个参数，objectSets是鼠标双击的时候，可以切换过去的3D变换元素的选择器

// 快捷键：
// x,y,z切换变换的坐标轴；p切换到同时按照x、y轴进行变换
// t（transform）进行平移变换
// r（rotate）进行旋转变换
// s（scale）进行缩放变换
// k（keep）保持当前变换，进入新的变换
// a (axis) 隐藏坐标轴
// 鼠标双击某元素，选中变换的元素

// sc='<script src="http://apps.bdimg.com/libs/jqueryui/1.9.2/jquery-ui.min.js"></script>';

// cc = '<link rel="stylesheet" href="http://apps.bdimg.com/libs/jqueryui/1.10.4/css/jquery-ui.min.css">';
// document.writeln(cc);
sc = '<script src="http://libs.baidu.com/jqueryui/1.10.1/jquery-ui.min.js"></script>';
document.writeln(sc);

// 引入css
$(function() {
	// 引入css
	$("<link>")
		.attr({
			rel: "stylesheet",
			type: "text/css",
			href: get_monitor_component_RootPath() + 'monitor_component.css'
		})
		.appendTo("head");

	//启动监视，用户可以通过按下L热键，手动控制某些元素进行3D变换
	$watch("body", "", "xy", "translate", "");

})

// 以下方法专用于做js插件。求得当前js（monitor_component.js）所在路径
// 来自https://www.cnblogs.com/blosaa/archive/2011/10/17/2215606.html
// 感谢昵称为“云中雀”的博主
function get_monitor_component_RootPath() {
	var js = document.scripts || document.getElementsByTagName("script");
	var jsPath;
	for (var i = js.length; i > 0; i--) {
		if (js[i - 1].src.indexOf("monitor_component.js") > -1) {
			jsPath = js[i - 1].src.substring(0, js[i - 1].src.lastIndexOf("/") + 1);
		}
	}
	return jsPath;
}


//定义全局变量
var ydeg = 0;
var xdeg = 0;
var zdeg = 0;
var ypx = 0;
var xpx_62882242 = 0;
var zpx_87687 = 0;
var sx = 1;
var sy = 1;
var sz = 1;

var y_8756875687 = -1;
var x_87687686 = -1;
var mouseIsDown = false;
var act = "rotate"; //动作
var unit = "deg"; //3d变换的单位
var preTansform = ''; //上一次的3D变换属性值
var flag = 'xy'; //默认依赖x和y两个轴变换
var bh_tr = ''; //当前的3D变换暂存变量
var bh_tr_state = '';
var bh_tr_add = false; //true标记需要累加新的3D变换
var selectedObject_JQuery = null; //被（鼠标双击）选中的当前进行3D变换的元素的jquery对象
var old_transform_data = {}; //存放历史变换数据的字典，key为选择器
var global_objectSets = ''; //可选择的选择器集合,用于双击鼠标选择3D变换对象

// 此控件的API，参数见README
function $monitor(selectorMain, transformObject, axis, action, objectSets) {
	return $watch(selectorMain, transformObject, axis, action, objectSets);
}

function put_transform_data(old_sel_JQuery) {
	if (bh_tr && bh_tr.length > 1) { //说明进行过3D变换，bh_tr中包含bh_tr_state
		saveState();
		key = old_sel_JQuery.attr("class");

		old_transform_data[key] = {
			// 上次的变换
			"bh_tr_state": bh_tr_state
		};
		console.log("save:" + key + "," + old_transform_data[key].bh_tr_state);
	} else {
		//没有进行3D变换，不需要保存新的变换
	}
	//将所有历史状态保存在bh_tr_state中




}

//
function restore_transform_data(sel_JQuery) {
	key = sel_JQuery.attr("class");
	if (old_transform_data[key]) {
		bh_tr_state = old_transform_data[key].bh_tr_state;
		bh_tr = "";
		console.log(("restore:" + key + "," + bh_tr_state));
	} else {
		resertState();
		bh_tr_state = "";
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
	xpx_62882242 = 0;
	zpx_87687 = 0;
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
function switchAxis(jobj) {
	if (jobj.children().hasClass('axis')) {
		$(".axis", jobj).remove();
	} else {
		$show_axis_Ex(selectedObject_JQuery);
	}
}

// 给可被选择的3D对象，加上双击事件
function set_3d_transform_Object(objectSets) {

	$(global_objectSets).off("dblclick"); //取消原来的绑定事件,此条语句必须放在on语句之前，若放在之后：有可能解绑新的可选择对象：修复此bug

	global_objectSets = objectSets; //设置新的可选对象

	
	//选择当前变换对象
	$(global_objectSets).on("dblclick", function() {
		$(".axis", selectedObject_JQuery).remove(); //移走原来变换对象的坐标轴
		selectedObject_JQuery.removeClass("animationx animationy animationz animationxy animationp"); //移走原来对象的动画
		put_transform_data(selectedObject_JQuery); //保存现场

		selectedObject_JQuery = $(this); //改变变换对象为鼠标双击的元素

		$show_axis_Ex(selectedObject_JQuery); //显示坐标轴
		restore_transform_data(selectedObject_JQuery); //恢复现场变换数据
		return false; //false终止事件处理,防止冒泡选择
	});

	

}

// 开启3d变换的鼠标联动
function $watch(selectorMain, transformObject, axis, action, objectSets) {

	selectedObject_JQuery = $(transformObject);
	set_3d_transform_Object(objectSets);

	setAction(action, transformObject);
	setAxis(axis);



	$(selectorMain).attr("tabindex", "0").focus().unbind()
		.css("outline","0px")
		.on("mousemove", function(e) {
			if (y_8756875687 > -1 && x_87687686 > -1 && mouseIsDown) {
				dlt = (e.pageY - y_8756875687) + (e.pageX - x_87687686);
				if (flag == 'x') { //旋转
					if (act == 'rotate') {
						xdeg = xdeg + dlt;
					} else if (act == 'translate') { //平移
						xpx_62882242 = xpx_62882242 + dlt;
					} else {
						sx = sx - dlt / 100;
					}

				} else if (flag == 'y') {
					if (act == 'rotate') {
						ydeg = ydeg + dlt;
					} else if (act == 'translate') {
						ypx = ypx + dlt;
					} else {
						sy = sy - dlt / 100;
					}

				} else if (flag == 'z') {
					if (act == 'rotate') {
						zdeg = zdeg + dlt;
					} else if (act == 'translate') {
						zpx_87687 = zpx_87687 + dlt;
					} else {
						sz = sz - dlt / 100;
					}

				} else {
					if (act == 'rotate') {
						xdeg = xdeg + (e.pageY - y_8756875687);
						ydeg = ydeg + (e.pageX - x_87687686);
					} else {
						xpx_62882242 = xpx_62882242 + (e.pageX - x_87687686);
						ypx = ypx + (e.pageY - y_8756875687);
					}

				}


				bh_tr = bh_tr_state + " rotateX(" + xdeg + "deg) " +
					"rotateY(" + ydeg + "deg) " +
					"rotateZ(" + zdeg + "deg) " +
					"translateX(" + xpx_62882242 + "px) " +
					"translateY(" + ypx + "px) " +
					"translateZ(" + zpx_87687 + "px) " +
					"scale3d(" + sx + "," + sy + "," + sz + ")";


				selectedObject_JQuery.css("transform", bh_tr);
				selectedObject_JQuery.css("-webkit-transform", bh_tr);


				// console.log("x:" + xdeg + unit + ";" + "y:" + ydeg + unit + ";" + "z:" + ydeg + unit +"scale:"+ sx+","+sy+","+sz);
				// console.log(selectedObject_JQuery.css("transform"));
				console.log(bh_tr);
			}
			y_8756875687 = e.pageY;
			x_87687686 = e.pageX;
			// return false;
		})
		.on("mousedown", function() {
			mouseIsDown = true;
			// return false;
		})
		.on("mouseup", function() {
			mouseIsDown = false;
			// return false;
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
					selectedObject_JQuery.removeClass("animation" + flag); //移走原来的动画
					setAxis(e.key);

					break;
				case 'p':
					setAxis('xy');
					break;
				case 'k':
					saveState();
					break;
				case 'a':
					switchAxis($(selectedObject_JQuery));
					break;
				case 'l': //重新设定可被选择的变换对象
					input = prompt("请输入变换对象的选择器");
					if (input) {
						set_3d_transform_Object(input);
						$($(global_objectSets).get(0)).dblclick();
					}
					break;
				case 'g': //go的缩写，实现动画
					restartAnimation();
					break;
				case 'h':
					$("<div style='position:static;' title=''></div>").load(get_monitor_component_RootPath() + "README.txt")
						.appendTo("body>div:first")
						.dialog({
							"dialogClass": "monitor_dialog",
							"width": "80%",
							"height": "800",
							"top": "1px",
							"position": "absolute",
							"transform": "translateZ(1cm)",
							"padding":"1cm"
						});
					break;
				case 'c':
					cmdhHandle(e);
				
					break;
				case 'n':
					selectedObject_JQuery.toggle();
					break;
					
					// 编辑属性值
				case "e":
					var template = prompt('输入jquery选择器和css属性json集合，中间用"|"分开');
					var params = template.split(/\s*\|\s*/);
					var params_length = params.length;
					
					var jsonreg = /\{[\w\,\:\"\s\%\+\-\*\/]+\}/ ;//json格式css属性集合
					
					if(params_length==2){
						if(jsonreg.test(params[1])){
							$(params[0]).css(JSON.parse(params[1]));
						}else{
							$(selectedObject_JQuery).css(params[0],params[1]);
						}
					}else if(params_length==3){
						$(params[0]).css(params[1],params[2]);
					}
					break;
				
				default:
					break;
			}
			return false; //终止事件冒泡，快捷键处理一次即可。如果冒泡，则可能处理多次。
		})
}


// 'g'快捷键处理函数，播放动画
function restartAnimation() {
	selectedObject_JQuery.removeClass("animationx animationy animationz animationxy animationp");
	setTimeout(function() {
		selectedObject_JQuery.addClass("animation" + flag);
	}, 1);
	//这里的稍加延迟，是重新播放动画的关键步骤；另外的办法是移除class之后clone它，再次加上动画样式。
}

// 模拟手动选中元素的文本
function selectText(element) {
	var text = $(element)[0];
	if (document.body.createTextRange) {
		var range = document.body.createTextRange();
		range.moveToElementText(text);
		range.select();
	} else if (window.getSelection) {
		var selection = window.getSelection();
		var range = document.createRange();
		range.selectNodeContents(text);
		selection.removeAllRanges();
		selection.addRange(range);
		/*if(selection.setBaseAndExtent){
		    selection.setBaseAndExtent(text, 0, text, 1);
		}*/
	} else {
		// alert("none");
	}
}



// 'c'快捷键处理函数：显示当前3D变换的细节
function cmdhHandle(e,cmd){
	if (e.ctrlKey || !selectedObject_JQuery || !selectedObject_JQuery.get(0) ) {
		return;
	}
	
	cmd = 
		StringTools.New("<h3>3D对象:[tagname:")
		.append(selectedObject_JQuery.get(0).tagName)
		.append("]")
		.append("[id:")
		.append(selectedObject_JQuery.attr("id")||"")
		.append("]")
		.append("[class:")
		.append(selectedObject_JQuery.attr("class")||"")
		.append("]<hr></h3><h3>上轮变换</h3><hr><span>")
		.append(bh_tr_state)
		.append("</span><h3>本轮变换</h3><hr><span>")
		.append(bh_tr)
		.append("</span>")
		
	cmd = cmd.append("<h3>变换矩阵</h3><hr>").append($(selectedObject_JQuery).css("transform")).toString();
	
	
	$("<div style='position:static;' title='变换语法'>" +
			cmd.replace(/[^\s]+[a-z]+\s*\(\s*0(deg|px)?\s*\)|scale3d\(1,1,1\)/ig, '') +
			"</div>")
		.on("mousemove", function() {
			if(bh_tr && bh_tr.length>4){
				selectText($("span",this)[1]);
			}else{
				selectText($("span",this)[0]);
			}
			
			
			return false;
		})
		.appendTo("body>div:first")
		.dialog({
			"dialogClass": "monitor_dialog",
			"width": "80%",
			"height": "auto",
			"top": "1cm",
			"position": "absolute",
			"transform": "translateZ(1cm)"
		});
		
		return false;
}