API格式：

$cube(selectorMe,lenght,width,height,imgs,opacity, contextLocation，faces)

参数selectorMe是一个选择器，长方体将在此元素内部构建
参数lenght是立方体得长度
参数width是立方体得宽度
参数height是立方体的高度
参数imgs是一个数组，里面放着0~6个图像（顺序为 上、下、前、后、右、左）文件的路径，路径是以”/”开头的绝对路径或者以<base>设定的路径开头 ，填写空字符串或错误文件名，将缺失对应的面。
参数opacity是各个面的透明度
参数contextLocation是内容展现的那个面，取值0（放在原本的位置）或1~6（上、下、前、后、右、左）
参数faces是一个数组，里面包含1~6个jquery对象.如果提供此参数，则cube的6个面，由提供的此参数指定。