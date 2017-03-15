# node-red-contrib-buffer

This node provides a buffer (circular or not) of numeric data

### Install

From your node-red directory:

    npm install node-red-contrib-circularbuffer
    
or
    
in the Node-red, Manage palette, Install node-red-contrib-circularbuffer



### Usage

<p>This node provides a buffer of numeric data.</p>
<p>The input must be a Number contained into <b>msg.payload</b> and is added to the buffer</p>
<p>You can define :</p>
<ul>
    <li>the size of the buffer</li>
    <li>if it is a circular buffer</li>
    <li>the sliding size if it is circular</li>
</ul>
<p>In case of not circular buffer, an output message is sent each time the buffer size is reached and the buffer is cleared.</p>
<p>In case of circular buffer, an output message is sent each time the buffer size is reached and the first values (sliding_size) are removed from the buffer.</p>
<p>Each output <b>msg.payload</b> contains : </p>
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
<p>The buffer parameters can be overwritten by using <b>msg.topic</b> : </p>
<ul>
    <li>msg.topic.clear (boolean) to clear the buffer</li>
    <li>msg.topic.size (integer) to change the size of the buffer</li>
    <li>msg.topic.circular (boolean) to set if the buffer is circular or not</li>
    <li>msg.topic.sliding_size (integer) to change the sliding size</li>
</ul>
