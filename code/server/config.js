//服务器配置
var config = {
    //设置你的域名（跨域请求）
    "Access-Control-Allow-Origin": "http://rancheng.com:8888",
    //服务器主机 （也是您定义的  接口域名，其作用见下面的例子）
    "host": "localhost",
    //服务器端口 （也是您定义的  接口端口，其作用见下面的例子）
    "port": "8333"
};
module.exports = config;


/*
    我已经内置了几个接口，这是其中的一个
    $.ajax({
        url: 'http://localhost:8333/user/getUserInfoById',
        data: '{"id":3}',
        type: 'post',
        dataType: 'json'
    }).done(function (data) {});
*/
