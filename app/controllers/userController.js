// const admin = require('firebase-admin');
const logger = require('../lib/loggerLib')
// var serviceAccount = require('../../config/cert.json');
const response = require('../lib/responseLib')
const path = require('path');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// var db = admin.firestore();
let addDate = (req, res) => {
    let body = req.body
    let data = {cd :`${body.cd}_${body.pathname}_${body.user}`}
    var setDoc = db.collection('createdDate').doc(`${body.pathname}_${body.user}`).set(data);
    setDoc.then(ref => {
        res.send(`{"res": "done"}`)
    },err => {
        res.send(`{"res": "not done"}`)
    })
}
let checkDate = (req, res) => {
    let body = req.body
    var collection = db.collection('createdDate')
    var check = collection.where("cd","==", `${body.cd}_${body.pathname}_${body.user}`).get()
    check.then(snapshot => {
        if(snapshot.empty) {
            res.send(`{"res": false}`)
        } else {
            res.send(`{"res": true}`)

        }
    }, err => {
        res.send(`{"res": "not done"}`)
    })

}
let download = (req,res) => {
    let filePath = path.join(__dirname,`../../uploads/${req.params.admin}/${req.params.user}`) + `/${req.params.type}`
    res.sendFile(filePath);
}

let uploadFiles = (req, res) => {
    

    try{ 
        
    logger.info('Success in retrieving data', 'uploadingfilecontroller: uploadFiles()', 5);

    if(!req.err) {
     let apiResponse = response.generate(
         false,
         'Success in uploading',
         200, {
             dirPath: req.dirPath 
         })
     res.send( apiResponse )
    } else {
        let apiResponse = response.generate(
            false,
            req.err,
            500, {
                dirPath: req.dirPath 
            })
        res.send( apiResponse )
    }
    
    }
 catch (e) {
     logger.error('Failed To Retrieve User Data', 'uploadingfilecontroller: uploadFiles()', 10)
     let apiResponse = response.generate(true, 'failed to upload', 501, 'error')
     res.send(apiResponse)
 }
}
module.exports = {
    addDate: addDate,
    checkDate: checkDate,
    download: download,
    uploadFiles : uploadFiles
}