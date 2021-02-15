// "+act+" 3d-object component . helper for learning .
// @copy yuhang.liu 刘宇航
// qq:578384498
// date 2-14-2021
// email:liuyuhang345@163.com


// 将selectorMe打造成一个长方体，其长宽与selectorMe相等、高度为参数height 。
function $cube(selectorMe,height,imgs){
	var e = $(selectorMe);
	e.css("transform-style","preserve-3d");
	
	var to = e.attr("transform-origin");//保留原来的3d变换中心
	e.attr("transform-origin","50% 50%");
	
	// 创建新的面模板
	var face = $("<div></div>");
	var faces=[];
	
	// 立方体的长宽高
	var l = e.css("width");
	var w = e.css("height");
	var h = height;
	
	
	// // 保存老内容
	var lost_context = e.html();
	
	$(selectorMe).html('');//原div充当容器，不再需要内容
	e.css("backgound-image",'');
	// clone 6个面,追加到selectorMe元素中
	for(i =0 ;i<6;i++ ){
		faces[i] = face.clone();
		e.append(faces[i]);
		
		$(faces[i]).css({
			"position":"absolute",
			"background":e.css("background"),
			"border":e.css("border"),
			"backgroud-size":"100% 100%",
			"opacity":"1"
		})
	}
	// 老内容放入第一个面
	$(faces[0]).html(lost_context);

	// 设置各个面的宽高
	$(faces[0]).css("width",l).css("height",w).css("background-image","url("+(imgs[0]||'')+")");
	$(faces[1]).css("width",l).css("height",w).css("background-image","url("+(imgs[1]||imgs[0]||'')+")");
	$(faces[2]).css("width",l).css("height",h).css("background-image","url("+(imgs[2]||imgs[0]||'')+")");
	$(faces[3]).css("width",l).css("height",h).css("background-image","url("+(imgs[3]||imgs[2]||imgs[0]||'')+")");
	$(faces[4]).css("width",w).css("height",h).css("background-image","url("+(imgs[4]||imgs[2]||imgs[0]||'')+")");
	$(faces[5]).css("width",w).css("height",h).css("background-image","url("+(imgs[5]||imgs[2]||imgs[0]||'')+")");
	
	//让各个面居中
	for(i = 0 ;i<6;i++){
		$(faces[i]).css({
			"left":"calc(50% - "+$(faces[i]).css("width")+"/2)",
			"top":"calc(50% - "+$(faces[i]).css("height")+"/2)"
		})
	}
	
	// 组成立方体
	
	$(faces[0]).css("transform","rotateX(90deg) translateZ(calc("+h+"/2))");
	$(faces[1]).css("transform","rotateX(270deg) translateZ(calc("+h+"/2))");
	$(faces[2]).css("transform","translateZ(calc("+w+"/2))");
	$(faces[3]).css("transform","rotateX(180deg) translateZ(calc("+w+"/2))");
	$(faces[4]).css("transform","rotateY(90deg) translateZ(calc("+l+"/2))");
	$(faces[5]).css("transform","rotateY(270deg) translateZ(calc("+l+"/2))");
	
	
	e.attr("transform-origin",to);//恢复3d变换中心 
	
	
	
}