# node-red-contrib-circularbuffer

This node provides a buffer (circular or not) of numeric data

### Install

From your node-red directory:

    npm install node-red-contrib-circularbuffer
    
or
    
in the Node-red, Manage palette, Install node-red-contrib-circularbuffer



### Usage

This node provides a buffer of numeric data.
The input must be a Number contained into <b>msg.payload</b> and is added to the buffer
You can define :

- the size of the buffer.
- if it is a circular buffer.
- the sliding size if it is circular.

In case of not circular buffer, an output message is sent each time the buffer size is reached and the buffer is cleared.
In case of circular buffer, an output message is sent each time the buffer size is reached and the first values (sliding_size) are removed from the buffer.
Each output <b>msg.payload</b> contains : 

- buffer : the buffer.
- sum : the sum of the buffer values. 
- avg : the average of the buffer values.
- min : the min of the buffer values.
- max : the max of the buffer values.
- median : the median of the buffer values.
- stddev : the standard deviation of the buffer values.
- out : the values removed from the buffer if it is circular.

The buffer parameters can be overwritten by using <b>msg.topic</b> :

- msg.topic.clear (boolean) to clear the buffer.
- msg.topic.size (integer) to change the size of the buffer.
- msg.topic.circular (boolean) to set if the buffer is circular or not.
- msg.topic.sliding_size (integer) to change the sliding size.

