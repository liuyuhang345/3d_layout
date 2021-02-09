js组件，用于提供手动旋转元素的方法。使用格式如下：
$monitor(selectorMain,selectorObject,axis,isRotate) ，
第一个参数是用于捕获鼠标坐标的元素；
第二个是被控制旋转的元素。两个参数都是jquery选择器;
第三个参数，可以取如下四个值：'x'、'y'、'z'、其它值或省略此参数，分别代表允许的旋转或平移的方向：x、y、z和xy轴旋转。
第四个参数，rotate表示旋转，translate表示平移	，其它值表示rotate	
第四个参数，objectSets是鼠标双击的时候，可以切换过去的3D变换元素的选择器

快捷键：
x,y,z切换变换的坐标轴；p切换到同时按照x、y轴进行变换
t（transform）：进行平移变换
r（rotate）：进行旋转变换
s（scale）：进行缩放变换
k（keep）或者鼠标双击本元素 ： 保存当前变换，后续将在保存的变换的基础上进行变换。
a (axis) ：隐藏坐标轴
l (location) ：重新设置可（通过鼠标双击）选择的3D对象|元素
g (animation) ：播放一次旋转动画
h (help) ：显示此帮助
c ：查看当前3D变换指令
鼠标双击某元素，选中变换的元素


