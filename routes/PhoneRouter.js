




const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const phones = require('../models/Phone');//here we include the model we created using the Phone model with a particular scheme. we will use the variable to perform different operations on the database

const phoneRouter = express.Router();

phoneRouter.route('/')
.get((req,res,next)=>{
    res.end("just checking --> nothing to do")
})
.post((req, res, next)=>{

})
.put((req, res, next)=>{

})
.delete((req, res, next)=>{

});

phoneRouter.route('/create')
.get((req,res,next) => {
    res.render('newphone.ejs', { title: 'Phone status' });   
})



.post((req, res, next) => {
    phones.create(req.body) // the request body should provide name, description, and customer as defined in the phone model -->schema
    .then((phoneCreate) => { //if the phone is created then phonecreated is set
        phones.find() // if it is set then execute find function to find the phones in the list
         .then((phonefound) => { //if there are phones then provide the list in the next line
                res.render('currentorder',{'phonelist' : phonefound, title:'all Phones'} );
        }, (err) => next(err))
    .catch((err) => next(err)); // if phone.create is not successful ..
    }, (err) => next(err))
    .catch((err) => next(err)); //catch all errors --> http-error module. you can also print your message but in this case the module will handle it for you
})

.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /phones/create');
})

.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('Delete operation not  supported on /phones/creste');
    
});
// delete functionality 
phoneRouter.route('/delete/:thisId')
.get((req, res, next) => {
    phones.findByIdAndDelete(req.params.thisId)
    .then((resp) => {
        res.statusCode = 200;
        res.redirect(301,'http://localhost:3000/Phones/list');
    }),  (err) => next(err)
    .catch((err) => next(err));
});

// list functionality 
phoneRouter.get('/list', function(req, res, next) {
    phones.find()
    .then((phonefound) => {
        res.render('currentorder',{'phonelist' : phonefound, title:'all Phones'} );
    }, (err) => next(err))
});
// update functionality 
phoneRouter.route('/update/:thisId')
.get((req, res, next) => {
    phones.find()
    .then((phonefound) => {
        res.render("update.ejs",{title: 'update', updateId: req.params.thisId, phonelist: phonefound});
    })
})

.post((req, res, next) => {
    phones.findByIdAndUpdate(req.params.thisId, req.body)
    .then((resp) => {
        res.statusCode = 200;
        res.redirect(301,'http://localhost:3000/Phones/list');
    }),  (err) => next(err)
    .catch((err) => next(err));
});

//report connection 
phoneRouter.route('/summaryreport')
.get((req, res, next) => {
    
        res.render('Dates.ejs', { title: 'Summaryreport'})
     },(err) => next(err))

.post((req, res, next) => {
    phones.find()
    .then((phonefound) => {
    res.render('Report.ejs', {summaryInfo: req.body, title: 'Summaryreport', phonelist: phonefound})
    }, (err) => next(err))
});

module.exports = phoneRouter;














