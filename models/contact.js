var mongo = require('mongoose');
mongo.connect('mongodb://localhost/addressbook');
 
var Schema = mongo.Schema;
 
var Contact = mongo.model('contacts', new Schema({
    txt: String,
    createAt: {type: Date, default: Date.now}
    })  
);
 
module.exports = Contact;
