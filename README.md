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
<ul>
    <li>the size of the buffer</li>
    <li>if it is a circular buffer</li>
    <li>the sliding size if it is circular</li>
</ul>
In case of not circular buffer, an output message is sent each time the buffer size is reached and the buffer is cleared.
In case of circular buffer, an output message is sent each time the buffer size is reached and the first values (sliding_size) are removed from the buffer.
Each output <b>msg.payload</b> contains : 
<ul>
    <li>buffer : the buffer.</li>
    <li>sum : the sum of the buffer values.</li>
    <li>avg : the average of the buffer values.</li>
    <li>min : the min of the buffer values.</li>
    <li>max : the max of the buffer values.</li>
    <li>median : the median of the buffer values.</li>
    <li>stddev : the standard deviation of the buffer values.</li>
    <li>out : the values removed from the buffer if it is circular</li>
</ul>
The buffer parameters can be overwritten by using <b>msg.topic</b> :
<ul>
    <li>msg.topic.clear (boolean) to clear the buffer</li>
    <li>msg.topic.size (integer) to change the size of the buffer</li>
    <li>msg.topic.circular (boolean) to set if the buffer is circular or not</li>
    <li>msg.topic.sliding_size (integer) to change the sliding size</li>
</ul>
