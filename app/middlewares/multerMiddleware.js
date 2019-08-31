var multer = require('multer');
const fse = require('fs-extra')
var storing = multer.diskStorage({
    destination:function(req,file,cb){
        try{
            console.log(req.params)
           let dirPath = `uploads/${req.params.admin}/${req.params.user}`
            fse.ensureDir(dirPath).then(() => {
                req.dirPath = dirPath
                cb(null, dirPath);
            }).catch(err => {
               console.log('cant create directory')
               req.err = err;
               cb(err,null);
           })
           
        }
        catch(e){
            console.log('error');
            cb(e,null);
        }
    },
    filename:function(req,file,cb){
        cb(null, `${req.params.type}.png`);
    }
});

var upload = multer({storage:storing}).single('avatar');

module.exports = {
    upload: upload
}
