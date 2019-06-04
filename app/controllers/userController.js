const admin = require('firebase-admin');

var serviceAccount = require('../../config/cert.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();
let addDate = (req, res) => {
    body = req.body
    let data = {cd : req.body.cd, pathname: req.body.pathname}
    var setDoc = db.collection('createdDate').doc(req.body.pathname).set(data);
    setDoc.then(ref => {
        res.send(`{"res": "done"}`)
    },err => {
        res.send(`{"res": "not done"}`)
    })
}
let checkDate = (req, res) => {
    body = req.body
    var collection = db.collection('createdDate')
    var check = collection.where("cd","==", req.body.cd).where("pathname", "==". req.body.pathname).get()
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