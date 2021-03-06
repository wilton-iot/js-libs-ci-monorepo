define(function(localRequire, exports, module) { var requireOrig = require; require = localRequire;
var Parser = require("htmlparser2/lib/Parser.js"),
    DomHandler = require("domhandler");

function defineProp(name, value){
	delete module.exports[name];
	module.exports[name] = value;
	return value;
}

module.exports = {
	Parser: Parser,
	Tokenizer: require("htmlparser2/lib/Tokenizer.js"),
	ElementType: require("domelementtype"),
	DomHandler: DomHandler,
	get FeedHandler(){
		return defineProp("FeedHandler", require("htmlparser2/lib/FeedHandler.js"));
	},
	get Stream(){
		return defineProp("Stream", require("htmlparser2/lib/Stream.js"));
	},
	get WritableStream(){
		return defineProp("WritableStream", require("htmlparser2/lib/WritableStream.js"));
	},
	get ProxyHandler(){
		return defineProp("ProxyHandler", require("htmlparser2/lib/ProxyHandler.js"));
	},
	get DomUtils(){
		return defineProp("DomUtils", require("domutils"));
	},
	get CollectingHandler(){
		return defineProp("CollectingHandler", require("htmlparser2/lib/CollectingHandler.js"));
	},
	// For legacy support
	DefaultHandler: DomHandler,
	get RssHandler(){
		return defineProp("RssHandler", this.FeedHandler);
	},
	//helper methods
	parseDOM: function(data, options){
		var handler = new DomHandler(options);
		new Parser(handler, options).end(data);
		return handler.dom;
	},
	parseFeed: function(feed, options){
		var handler = new module.exports.FeedHandler(options);
		new Parser(handler, options).end(feed);
		return handler.dom;
	},
	createDomStream: function(cb, options, elementCb){
		var handler = new DomHandler(cb, options, elementCb);
		return new Parser(handler, options);
	},
	// List of all events that the parser emits
	EVENTS: require("htmlparser2/lib/events")
};

require = requireOrig;});
