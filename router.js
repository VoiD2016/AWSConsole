let express = require('express');
let router = express.Router();
let log = require('./logger')(module);
let config = require('./config');
let vk = require('./vk');

vk.initialize(config.vk);

router.get('/:request', function(req, res,next){
    vk.process_request(req.params.request).then(function(resp){
		console.log(resp.items);
		return res.render('index', {title: 'Лента новостей', resp: resp});
    }, function(error){
		console.log('Error: ' + error);
		return res.render('error', {title: req.params.request, err: error});
    });
});
module.exports = router;
