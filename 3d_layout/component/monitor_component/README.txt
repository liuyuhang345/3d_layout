<br> <h2>js组件，提供使用鼠标对元素进行3D变换的方法。</h2>
<hr> <h3>JavaScript API调用格式</h3>
<br> $watch(selectorMain, transformObject, axis, action, objectSets)
<br> 第一个参数是用于捕获鼠标坐标的元素；
<br> 第二个是被控制旋转的元素。两个参数都是jquery选择器;
<br> 第三个参数，可以取如下四个值：'x'、'y'、'z'、其它值或省略此参数，分别代表允许的旋转或平移的方向：x、y、z和xy轴旋转。
<br> 第四个参数，rotate表示旋转，translate表示平移	，其它值表示rotate	
<br> 第五个参数，objectSets是鼠标双击的时候，可以切换过去的3D变换元素的选择器
<br> 
<br> <h3>快捷键</h3>
<br> x,y,z切换变换的坐标轴；p切换到同时按照x、y轴进行变换
<br> t（transform）：进行平移变换
<br> r（rotate）：进行旋转变换
<br> s（scale）：进行缩放变换
<br> k（keep）或者鼠标双击本元素 ： 保存当前变换，后续将在保存的变换的基础上进行变换。
<br> a (axis) ：隐藏坐标轴
<br> l (location) ：重新设置可（通过鼠标双击）选择的3D对象|元素
<br> g (animation) ：播放一次旋转动画
<br> h (help) ：显示此帮助
<br> c ：查看当前3D变换指令
<br> n ：隐藏当前选定的元素
<br> 鼠标双击某元素，选中变换的元素
<br> 
<br> <h3>注意事项</h3>
<br> 进行3D变换的时候，objectSets参数中，最好不要出现class属性值完全一致的情况，否则属性一致的元素会混淆“上一轮”的3D变换。
<br> 被选择作为3D变换的对象的class值，必须是唯一的，不允许与其它元素的class值相等，但可以相交。 
