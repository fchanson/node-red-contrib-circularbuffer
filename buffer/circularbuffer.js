

module.exports = function(RED) {
    "use strict";
    
    function CBuffer(n) {
        RED.nodes.createNode(this,n);
        this.name = n.name;
        this.size = n.size;
        this.circular = n.circular;
        this.sliding_size = n.sliding_size;
        
        var node = this;

        var array = [];
        var sum = 0;
        var avg = 0;
        var out = [];
        
        function isNumeric(num) {
        	return !isNaN(num) && isFinite(num);
        };	

        function getMedian(arr){
        	arr.sort( function(a,b) {return a - b;} );

            var half = Math.floor(arr.length/2);

            if(arr.length % 2)
                return arr[half];
            else
            	return (arr[half-1] + arr[half]) / 2.0;
        };

        function getStdDev(arr){
        	var sumDiff = 0;
        	
        	var squareDiffs = arr.map(function(value){
        		var diff = value - avg;
        		var sqrDiff = diff * diff;
        		
        		sumDiff += sqrDiff;
        		
        		return sqrDiff;
        	});
          
        	var avgSquareDiff = sumDiff/squareDiffs.length;

        	var stdDev = Math.sqrt(avgSquareDiff);
          
        	return stdDev;
        }
        
        function add(msg) {
        	var element = msg.payload;
        	
        	if(isNumeric(element)) {
        		var n = Number(element);
        		array.push(n);
        		sum += n;

	        	if(array.length==node.size) {
	        		msg.payload = {};
	        		msg.payload.buffer = array.slice();
	        		
	        		avg = sum/node.size;
	        		var min = Math.min(...msg.payload.buffer);
	        		var max = Math.max(...msg.payload.buffer);
	        		var median = getMedian(msg.payload.buffer.slice());
	        		var stdDev = getStdDev(msg.payload.buffer);
	        		
	        		msg.payload.sum = sum;
	        		msg.payload.avg = avg;
	        		msg.payload.min = min;
	        		msg.payload.max = max;
	        		msg.payload.median = median;
	        		msg.payload.stddev = stdDev;
	        		if(node.circular=="yes") {
	        			msg.payload.out = out;
	        		}
	        		node.send(msg);
	        		
	        		if(node.circular=="yes" && isNumeric(node.sliding_size)) {
	        			var slid = Number(node.sliding_size);
	        			if(slid>node.size) {
	        				slid = node.size;
	        			}
	        			out.length = 0;
	        			var e;
	        			for(var i =0;i<slid;i++) {
	        				e = array.shift();
	        				out.push(e); 
	        				sum -= e;
	        			}
	        		} else {
	        			array.length = 0;
	        			sum = 0;
	        		}
	        		
	        		
	        	}
        	}
        }
        
        function config(config) {
        	//console.log("config " + JSON.stringify(config));

        	
        	if(config.hasOwnProperty('size') && Number.isInteger(config.size)) {
        		node.size = config.size;
        		out.length = 0;
        		array.length = 0;
        		sum = 0;
        		
        	}
        	
        	if(config.hasOwnProperty('circular') && (typeof config.circular === 'boolean')) {
        		node.circular = config.circular;
        		out.length = 0;
        		array.length = 0;
        		sum = 0;
        		
        	}
        	
        	if(config.hasOwnProperty('sliding_size') && Number.isInteger(config.sliding_size)) {
        		node.sliding_size = config.sliding_size;
        		out.length = 0;
        		array.length = 0;
        		sum = 0;
        		
        	}
        	
        	if(config.hasOwnProperty('clear') && (typeof config.clear === 'boolean') && config.clear) {
        		out.length = 0;
        		array.length = 0;
        		sum = 0;
        		
        	}
        }
        
        
        node.on("input", function(msg) {
            if (msg) {
            	if(msg.hasOwnProperty('topic')) {
            		config(msg.topic);
            	} else if(msg.hasOwnProperty('payload')) {
            		add(msg);	
            	}
            	

            }
        });
        
        
        

    }
    RED.nodes.registerType("circularbuffer",CBuffer);

};
