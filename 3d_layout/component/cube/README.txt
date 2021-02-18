API格式：

$cube(selectorMe,lenght,width,height,imgs)

参数selectorMe是一个选择器，长方体将在此元素内部构建
参数lenght是立方体得长度
参数width是立方体得宽度
参数height是立方体的高度
参数imgs是一个数组，里面放着0~6个图像（顺序为 上、下、前、后、右、左）文件的路径，路径是以”/”开头的绝对路径或者以<base>设定的路径开头 ，填写空字符串或错误文件名，将缺失对应的面。
