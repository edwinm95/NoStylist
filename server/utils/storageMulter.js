var multer = require('multer')
var mime = require('mime')
var crypto = require('crypto')

    var storage = multer.diskStorage({
        destination: function(req,file,cb){
            cb(null,'temp/multer/itemuploads')
        },
        filename: function(req,file,cb){
            let customFileName = crypto.randomBytes(18).toString('hex'),
            fileExtension = file.originalname.split('.')[1] 
            cb(null, customFileName + '.' + fileExtension)
        }
    })
    const upload = multer({storage: storage}).fields([
        { name: 'photo1', maxCount:1 },
        { name: 'photo2', maxCount:1 },
        { name: 'photo3', maxCount:1 },
        { name: 'photo4', maxCount:1 },
        { name: 'photo5', maxCount:1 },
        { name: 'photo6', maxCount:1 }
    ]
    )
module.exports = upload;