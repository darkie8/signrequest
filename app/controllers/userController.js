const admin = require('firebase-admin');

var serviceAccount = require('../../config/test-project-ca1d8-050ce958df00.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();
let addDate = (req, res) => {
    body = req.body
    let data = {cd : req.body.cd}
    var setDoc = db.collection('createdDate').doc('API').set(data);
    setDoc.then(ref => {
        res.send(`{"res": "done"}`)
    },err => {
        res.send(`{"res": "not done"}`)
    })
}
let checkDate = (req, res) => {
    body = req.body
    var collection = db.collection('createdDate')
    var check = collection.where("cd","==", req.body.cd).get()
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
module.exports = {
    addDate: addDate,
    checkDate: checkDate
}