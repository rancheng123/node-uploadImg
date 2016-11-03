
//服务器配置
var config = require('./config.js');


//请求http对象
var http = require('http');
var querystring = require('querystring');
var util = require('util');
var url = require('url');



//生成服务器对象
var server = http.createServer(function(request,response){

    //解析URL
    var urlObj = url.parse(request.url,true);
    var pathname = urlObj.pathname;
    var query = urlObj.query;
    var moduleName = pathname.substring(1).split('/')[0];
    var methodName = pathname.substring(1).split('/')[1];


    switch(request.method){
        case 'GET':

            //根据请求参数  返回数据
            responseDataByParams(query);
            break;
        case 'POST':

            var postDataStr = '';
            request.on('data',function(chunk){
                postDataStr+=chunk;
            });
            request.on('end',function(){

                //没有请求参数，防止报错
                postDataStr = (postDataStr=='')?'{}':postDataStr;
                //请求参数解析
                var postDataObj = JSON.parse(postDataStr);
                //根据请求参数  返回数据
                responseDataByParams(postDataObj);
            });
            break;
    }



    //根据请求参数  返回数据
    function responseDataByParams(params){

        //请求模块
        var Module = require('./modules/'+moduleName+'.js');


        if(!Module[methodName]){
            //向web端返回数据
            responseDataToWeb({
                status: 401,
                message: '无效的方法'
            })
            return;
        };


        Module[methodName](params);

    }

    //向web端返回数据
    function responseDataToWeb(data){
        response.writeHead(200/*成功码*/,{

            //设置相应类型  和 编码
            'Content-Type': 'text/plain;charset=UTF-8',

            //设置  允许跨域源
            'Access-Control-Allow-Origin': config['Access-Control-Allow-Origin']
        });
        //向前台输出( write 和 end 只能传字符串 或 buffer, 不能传对象****************** )
        response.end(JSON.stringify(data));
    };
    //设置成全局的
    global.responseDataToWeb = responseDataToWeb;



    //验证请求方式
    function isMethod(method){
        if(method.toLowerCase() != request.method.toLowerCase()){
            //向web端返回数据
            responseDataToWeb({
                status: 402,
                message: '无效的请求方式'
            })
            return false;
        }else{
            return true;
        }
    };
    global.isMethod = isMethod;


});
//监听8080 端口
server.listen(config['port'],config['host'],function(){
    console.log("开始监听...");
});
