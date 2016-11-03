

var _ = require('underscore');
var createImgByDataUrl = require('../widget/createImgByDataUrl.js');


function Upload(){}
Upload.prototype = {
    uploadImg: function(params){
        var that = this;

        //验证请求方式
        if(!isMethod('post')){
            return;
        }

        //根据DataUrl 生成图片
        createImgByDataUrl({

            //图片放置目录
            path: '../root/tempImg/',
            //fileReader 传来的dataUrl
            fileData: params.file,
            callback: function(fileName){


                var path = 'http://rancheng.com:8888/chartRoom/code/root/tempImg/';
                responseDataToWeb({
                    error: 0,
                    data: {
                        fullFile: path + fileName
                    }
                });

            }
        })

    }
};


module.exports = new Upload();