let VK = require('./vkapi');
let log = require('./logger')(module);

let Global;
//https://oauth.vk.com/authorize?client_id=5673289&scope=notify,friends,photos,audio,video,pages,+256,status,notes,messages,wall,ads,offline,docs,groups,notifications,stats,market&v=5.45&response_type=token

let vk;

let https = require('https');

function getNewsFeed(uid){
    return new Promise(function(resolve, reject){
	vk.request('newsfeed.get', {user_id: uid, fields: 'domain', filters: 'post'}, function(_o){
	    if(_o.response)
	    {
	    	resolve(_o.response);
	    }
	    else if(_o.error)
			reject(_o.error);
	});
    });
}

function initialize(config)
{
    vk = new VK({
    	'appID'     : config.appid,
    	'appSecret' : config.appsecret,
    	'mode'      : config.mode
    });
    vk.token=config.accesstoken;
    vk.my_config = config;
}

this.test = function(){
    return getNewsFeed(vk.my_config.user_id);
}

this.process_request = function (request)
{
    if(!this[request])
    {
	return new Promise(function(resolve, reject){
	    reject('Undefined method');
	});
    }
    return this[request]();
}
module.exports.initialize = initialize;
