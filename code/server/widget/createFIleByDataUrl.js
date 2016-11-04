
//根据DataUrl 生成图片
function createFileByDataUrl(opts){

    /*配置项 start*/

    //文件图片放置目录
    var path = opts.path;
    //fileData 是 fileReader 生成的 e.target.result
    var fileData = opts.fileData;
    var fileName = opts.fileName;

    var callback = opts.callback;

    /*配置项 end*/


    var fs = require('fs');
    var fileName = ''+ Math.random() + new Date().getTime() + fileName;
    var fullName = path + fileName;



    //流字符串  转成流
    var reg = /^data:([\s\S]*);base64,/;
    var base64Data = fileData.replace(reg, "");
    var dataBuffer = new Buffer(base64Data, 'base64');


    fs.writeFile(fullName, dataBuffer, function (err) {
        if(err){
            console.log('上传图片失败，原因：'+err)
        }else{
            callback && callback(fileName);
        }
    });
}
module.exports = createFileByDataUrl;