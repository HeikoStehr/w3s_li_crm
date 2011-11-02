// Copyright 2006 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/*
---
description: Graphing/chart tool for mootools 1.2

license: Apache License, Version 2.0

authors:
- Brett Dixon

requires: 
  core/1.2.5:Core

provides: [MilkChart.Column, MilkChart.Bar, MilkChart.Line, MilkChart.Scatter, MilkChart.Pie]

...
*/
var MilkChart;var Point=new Class({initialize:function(a,b){this.x=a||0;this.y=b||0}});MilkChart=new Class({Implements:[Options,Events],options:{width:480,height:290,colors:["#4f81bd","#c0504d","#9bbb59","#8064a2","#4198af","#db843d"],padding:12,font:"Verdana",fontColor:"#000000",fontSize:10,background:"#FFFFFF",chartLineColor:"#878787",chartLineWeight:1,border:true,borderWeight:1,borderColor:"#878787",titleSize:18,titleFont:"Verdana",titleColor:"#000000",showRowNames:true,showValues:true,showKey:true,useZero:true,copy:false,data:{}},initialize:function(b,a){this.setOptions(a);this.element=document.id(b);this.width=this.options.width;this.height=this.options.height;this.container=new Element("div").inject(this.element.getParent());this.container.setStyles({width:this.width,height:this.height});this._canvas=new Element("canvas",{width:this.options.width,height:this.options.height}).inject(this.container);this.ctx=this._canvas.getContext("2d");this.colNames=[];this.rowNames=[];this.rowCount=this.element.getElement("thead").getChildren()[0].getChildren().length;this.minY=(this.options.useZero)?0:10000000000;this.maxY=0;this.rows=[];this.options.title=false||this.element.title;this.bounds=[new Point(),new Point(this.width,this.height)];this.chartWidth=0;this.chartHeight=0;this.keyPadding=this.width*0.2;this.rowPadding=this.height*0.1;this.colors=this.__getColors(this.options.colors);this.shapes=[];MilkChart.Shapes.each(function(c){this.shapes.push(c)}.bind(this))},prepareCanvas:function(){if(!this.options.copy){this.element.setStyle("display","none")}this.ctx.fillStyle=this.options.background;this.ctx.fillRect(0,0,this.width,this.height);this.ctx.font=this.options.fontSize+"px "+this.options.font;if(this.options.border){this.ctx.lineWeight=this.options.borderWeight;this.ctx.strokeRect(0.5,0.5,this.width-1,this.height-1)}if(this.options.showValues){this.bounds[0].x+=this.getValueColumnWidth()}this.bounds[0].x+=this.options.padding;this.bounds[0].y+=this.options.padding;this.bounds[1].x-=this.options.padding*2;this.bounds[1].y-=this.options.padding*2;if(this.options.showKey){var b="";this.colNames.each(function(d){if(d.length>b.length){b=String(d)}});var c=14;this.keyPadding=this.ctx.measureText(b).width+c;this.bounds[1].x-=this.keyPadding;var a=1.02;this.keyBounds=[new Point(this.bounds[1].x*a,this.bounds[0].y),new Point(this.keyPadding,this.bounds[1].y)]}if(this.options.title){titleHeight=this.bounds[0].y+this.height*0.1;this.bounds[0].y=titleHeight;this.titleBounds=[new Point(this.bounds[0].x,0),new Point(this.bounds[1].x,titleHeight)];this.drawTitle()}if(this.options.showRowNames){this.ctx.font=this.options.fontSize+"px "+this.options.font;this.rowPadding=(this.ctx.measureText(this.longestRowName).width>((this.bounds[1].x-this.bounds[0].x)/this.rows.length))?this.ctx.measureText(this.longestRowName).width:this.height*0.1;this.bounds[1].y-=this.rowPadding}else{this.rowPadding=0}this.chartWidth=this.bounds[1].x-this.bounds[0].x;this.chartHeight=this.bounds[1].y-this.bounds[0].y},getValueColumnWidth:function(){return this.ctx.measureText(String(this.maxY)).width},drawTitle:function(){var a=1.25;var b=this.options.titleSize*a;this.ctx.textAlign="center";this.ctx.font=this.options.titleSize+"px "+this.options.titleFont;this.ctx.fillStyle=this.options.titleColor;this.ctx.fillText(this.options.title,this.bounds[0].x+(this.bounds[1].x-this.bounds[0].x)/2,b,this.chartWidth)},drawAxes:function(){this.ctx.beginPath();this.ctx.strokeStyle=this.options.chartLineColor;this.ctx.moveTo(this.bounds[0].x+0.5,this.bounds[0].y+0.5);this.ctx.lineTo(this.bounds[0].x+0.5,this.bounds[1].y+0.5);this.ctx.moveTo(this.bounds[0].x+0.5,this.bounds[1].y+0.5);this.ctx.lineTo(this.bounds[1].x+0.5,this.bounds[1].y+0.5);this.ctx.stroke()},drawValueLines:function(){var h=[1,2,5,10,20,50,100,150,500,1000,1500,2000,2500,5000,10000];var k=9;var f=0;this.chartLines=1;delta=Math.floor((this.maxY-this.minY));while(Math.floor((delta/h[f]))>k){f++}this.chartLines=Math.floor((delta/h[f]))+2;var d=h[f];var c=(this.minY<0)?(d+this.minY):0;this.ratio=(this.chartHeight)/((this.chartLines-1)*d);this.ctx.font=this.options.fontSize+"px "+this.options.font;this.ctx.textAlign="right";this.ctx.fillStyle=this.options.fontColor;var m=this.bounds[1].y-this.bounds[0].y;var l=Math.floor(m/(this.chartLines-1));for(f=0;f<this.chartLines;f++){this.ctx.fillStyle=this.options.fontColor;var a=this.bounds[1].y-(f*l);var b=(this.chartLines*d)-((this.chartLines-f)*d)+this.minY-c;this.ctx.beginPath();a+=0.5;this.ctx.moveTo(this.bounds[0].x-4,a);if(this.options.showValues){var g=8;var e=3;this.ctx.fillText(String(b),this.bounds[0].x-g,a+e)}this.ctx.lineTo(this.bounds[1].x,a);this.ctx.stroke()}},getData:function(){return null},draw:function(){return null},drawKey:function(){return null},__getColors:function(c){var b=[];if(c.length==1||c.length==2){var d=new Color(c[0]);var a=(c.length==2)?new Color(c[1]):new Color("#ffffff").mix(c[0],20);var h=[(a[0]-d[0])/this.rowCount,(a[1]-d[1])/this.rowCount,(a[2]-d[2])/this.rowCount];var g=d;for(i=0;i<this.rowCount;i++){b.push(g.rgbToHex());for(j=0;j<h.length;j++){g[j]+=parseInt(h[j])}}}else{var e=0;var f=c.slice(0);while(b.length!=this.rowCount){if(f.length==0){f=c.slice(0);e+=20}newColor=new Color(f.shift()).mix("#ffffff",e);b.push(newColor.rgbToHex())}}return b}});MilkChart.Column=new Class({Extends:MilkChart,options:{columnBorder:false,columnBorderWeight:2,columnBorderColor:"#ffffff"},initialize:function(b,a){this.parent(b,a);this.getData();this.prepareCanvas();this.rowWidth=this.chartWidth/this.rows.length;this.drawAxes();this.drawValueLines();this.draw();if(this.options.showKey){this.drawKey()}},getData:function(){this.element.getElement("thead").getChildren()[0].getChildren().each(function(c){this.colNames.push(c.get("html"))}.bind(this));var a="";if(this.element.getElement("tfoot")){this.element.getElement("tfoot").getChildren()[0].getChildren().each(function(d){var c=d.get("html");this.rowNames.push(c);if(this.ctx.measureText(c).width>a.length){a=String(c)}}.bind(this))}this.element.getElement("tbody").getChildren().each(function(d){var c=[];d.getChildren().each(function(e){val=Number(e.get("html"));if(!$type(val)){val=e.get("html").toFloat()}c.push(val);if(val>this.maxY){this.maxY=val}if(val<this.minY){this.minY=val}}.bind(this));this.rows.push(c)}.bind(this));if(!this.element.getElement("tfoot")){for(i=1;i<=this.rows.length;i++){var b="Row "+i;this.rowNames.push(b);if(this.ctx.measureText(b).width>a.length){a=String(b)}}}this.longestRowName=a},draw:function(){var f=(this.minY>=0)?this.bounds[1].y:this.bounds[1].y-Math.floor((this.chartHeight/(this.chartLines-1)));var c=new Point(this.bounds[0].x,f);var a=Math.floor(this.rowWidth*0.16);var d=Math.ceil((this.rowWidth-(a*2))/this.rows[0].length);var b=0;var e=(this.ctx.measureText(this.longestRowName).width>this.rowWidth);this.rows.each(function(m,g){var k=new Point(c.x,c.y);var h=0;this.ctx.fillStyle=this.options.fontColor;this.ctx.textAlign="center";if(this.options.showRowNames){var l=MilkChart.escape(this.rowNames[b]);if(e){this.ctx.save();this.ctx.textAlign="right";this.ctx.translate(k.x+(this.rowWidth/2)+this.options.fontSize,this.bounds[1].y+4);this.ctx.rotate(-1.57079633);if(this.rows.length*this.options.fontSize>this.chartWidth){if(g%8==1){this.ctx.fillText(l,0,0)}}else{this.ctx.fillText(l,0,0)}this.ctx.restore()}else{this.ctx.fillText(l,k.x+(this.rowWidth/2),this.bounds[1].y+(this.rowPadding/2))}}m.each(function(o){this.ctx.beginPath();this.ctx.fillStyle=this.colors[h];var n=Math.ceil(o*this.ratio)-1;this.ctx.fillStyle=this.colors[h];this.ctx.fillRect(k.x+a,k.y-n,d,n);if(this.options.columnBorder){this.ctx.strokeStyle=this.options.columnBorderColor;this.ctx.lineWidth=this.options.columnBorderWeight;this.ctx.strokeRect(k.x+a,k.y-n,d,n)}k.x+=d;h++}.bind(this));c.x+=this.rowWidth;b++}.bind(this))},drawKey:function(){var g=0;var b=14;var f=0.06;var c=Math.ceil(this.height*f);var e=this.colNames.length*c;var a=(this.height-e)/2;var d=10;this.colNames.each(function(h){this.ctx.fillStyle=this.options.fontColor;this.ctx.textAlign="left";h=MilkChart.escape(h);this.ctx.fillText(h,this.keyBounds[0].x+b,a+8);this.ctx.fillStyle=this.colors[g];this.ctx.fillRect(Math.ceil(this.keyBounds[0].x),Math.ceil(a),d,d);g++;a+=c},this)}});MilkChart.Bar=new Class({Extends:MilkChart.Column,options:{},initialize:function(b,a){this.parent(b,a);this.valueColumnWidth=this.ctx.measureText(String(this.maxY)).width},getValueColumnWidth:function(){var a=14;return this.ctx.measureText(this.longestRowName).width+a},drawValueLines:function(){var f=[1,2,5,10,20,50,100,150,500,1000,1500,2000,2500,5000,10000];var g=9;var e=0;this.chartLines=1;delta=Math.floor((this.maxY-this.minY));while(Math.floor((delta/f[e]))>g){e++}this.chartLines=Math.floor((delta/f[e]))+2;var d=f[e];var c=(this.minY<0)?(d+this.minY):0;this.ratio=(this.chartWidth)/((this.chartLines-1)*d);this.ctx.font=this.options.fontSize+"px "+this.options.font;this.ctx.textAlign="center";this.ctx.fillStyle=this.options.fontColor;var k=this.bounds[1].y-this.bounds[0].y;var h=Math.ceil(this.chartWidth/(this.chartLines-1));for(e=0;e<this.chartLines;e++){this.ctx.fillStyle=this.options.fontColor;var a=this.bounds[0].x+(e*h);var b=(this.chartLines*d)-((this.chartLines-e)*d)+this.minY;this.ctx.beginPath();var a=Math.round(a)+0.5;this.ctx.moveTo(a,this.bounds[0].y);this.ctx.fillText(MilkChart.escape(b),a,this.bounds[1].y+14);this.ctx.lineTo(a,this.bounds[1].y+4);this.ctx.stroke()}},draw:function(){var c=new Point(this.bounds[0].x,this.bounds[1].y);this.colHeight=Math.round(this.chartHeight/this.rows.length);var e=0.16;var a=Math.ceil(this.colHeight*e);var d=Math.ceil((this.colHeight-(a*2))/this.rows[0].length);var b=0;this.rows.each(function(m,f){var h=new Point(c.x,c.y);var g=0;this.ctx.fillStyle=this.options.fontColor;this.ctx.textAlign="center";var l=Math.ceil(this.ctx.measureText(this.rowNames[b]).width);if(this.options.showRowNames){var k=MilkChart.escape(this.rowNames[b]);if(this.rows.length*this.options.fontSize>this.chartWidth){if(f%8==1){this.ctx.fillText(MilkChart.escape(this.rowNames[b]),h.x-((d+l)/2),h.y-(this.rowPadding/2))}}else{this.ctx.fillText(MilkChart.escape(this.rowNames[b]),h.x-((d+l)/2),h.y-(this.rowPadding/2))}}m.each(function(o){this.ctx.beginPath();this.ctx.fillStyle=this.colors[g];var n=Math.ceil(o*this.ratio);this.ctx.fillRect(h.x,h.y-a,n,d);h.y-=d;g++}.bind(this));c.y-=this.colHeight;b++}.bind(this))}});MilkChart.Line=new Class({Extends:MilkChart,options:{showTicks:false,showLines:true,lineWeight:3},initialize:function(b,a){this.parent(b,a);this.getData();this.prepareCanvas();this.rowWidth=this.chartWidth/this.rows[0].length;this.drawAxes();this.drawValueLines();this.draw();if(this.options.showKey){this.drawKey()}},getData:function(){this.rows=[];this.element.getElement("thead").getChildren()[0].getChildren().each(function(c){this.colNames.push(c.get("html"));this.rows.push([])}.bind(this));var a="";if(this.element.getElement("tfoot")){this.element.getElement("tfoot").getChildren()[0].getChildren().each(function(d){var c=d.get("html");this.rowNames.push(c);if(this.ctx.measureText(c).width>a.length){a=String(c)}}.bind(this))}this.element.getElement("tbody").getChildren().each(function(c){c.getChildren().each(function(e,d){f=Number(e.get("html"));if(!$type(f)){var f=e.get("html").toFloat()}this.rows[d].push(f);if(f>this.maxY){this.maxY=f}if(f<this.minY){this.minY=f}}.bind(this))}.bind(this));if(!this.element.getElement("tfoot")){for(i=1;i<=this.element.getElement("tbody").getChildren().length;i++){var b="Row "+i;this.rowNames.push(b);if(this.ctx.measureText(b).width>a.length){a=String(b)}}}this.longestRowName=a},draw:function(){var b=new Point(this.bounds[0].x,this.bounds[1].y);var d=this.rowWidth/2;var a=0;var e=0;var f=(this.minY>=0)?this.bounds[1].y+(this.minY*this.ratio):this.bounds[1].y-Math.floor((this.chartHeight/(this.chartLines-1)));var c=0;this.rows.each(function(m,h){if(this.options.showLines){var l=new Point(b.x,b.y);var k=this.bounds[0].x+d;this.ctx.lineWidth=this.options.lineWeight;this.ctx.beginPath();this.ctx.strokeStyle=this.colors[e];this.ctx.moveTo(l.x+d,f-(m[0]*this.ratio));m.each(function(p){var o=l.x+d;var n=new Point(o,f-(p*this.ratio));this.ctx.lineTo(n.x,n.y);l.x+=this.rowWidth}.bind(this));this.ctx.stroke()}if(this.options.showTicks){var l=new Point(b.x,b.y);var k=this.bounds[0].x+d;c=(c>MilkChart.Shapes.getLength()-1)?0:c;var g=this.shapes[c];m.each(function(p){var o=l.x+d;var n=new Point(o,f-(p*this.ratio));g(this.ctx,n.x,n.y,10,this.colors[e]);l.x+=this.rowWidth}.bind(this));c++}e++;a++}.bind(this));this.__drawRowLabels()},drawKey:function(){var c=Math.ceil(this.height*0.05);var d=this.colNames.length*c;var a=(this.height-d)/2;var b=0;this.colNames.each(function(g,f){this.ctx.fillStyle=this.options.fontColor;this.ctx.textAlign="left";this.ctx.fillText(MilkChart.escape(g),this.keyBounds[0].x+30,a+5);this.ctx.fillStyle=this.colors[f];this.ctx.strokeStyle=this.colors[f];this.ctx.lineWidth=3;if(this.options.showLines){this.ctx.beginPath();this.ctx.moveTo(this.keyBounds[0].x,a+0.5);this.ctx.lineTo(this.keyBounds[0].x+20,a+0.5);this.ctx.closePath();this.ctx.stroke()}if(this.options.showTicks){b=(b>MilkChart.Shapes.getLength()-1)?0:b;var e=this.shapes[b];e(this.ctx,this.keyBounds[0].x+10,a,10,this.colors[f]);b++}a+=c}.bind(this))},__drawRowLabels:function(){var a=new Point(this.bounds[0].x,this.bounds[1].y);var c=this.rowWidth/2;var b=(this.ctx.measureText(this.longestRowName).width>this.rowWidth);this.ctx.fillStyle=this.options.fontColor;this.ctx.lineWidth=1;this.ctx.textAlign="center";this.rowNames.each(function(e,d){var f=MilkChart.escape(this.rowNames[d]);if(b){this.ctx.save();this.ctx.textAlign="right";this.ctx.translate(a.x+(this.rowWidth/2)+this.options.fontSize,this.bounds[1].y+4);this.ctx.rotate(-1.57079633);if(this.rowNames.length*this.options.fontSize>this.chartWidth){if(d%8==1){this.ctx.fillText(f,0,0)}}else{this.ctx.fillText(f,0,0)}this.ctx.restore()}else{this.ctx.fillText(f,a.x+(this.rowWidth/2),this.bounds[1].y+(this.rowPadding/2))}a.x+=this.rowWidth}.bind(this))}});MilkChart.Scatter=new Class({Extends:MilkChart.Line,options:{showTicks:true,showLines:false},initialize:function(b,a){this.parent(b,a)}});MilkChart.Pie=new Class({Extends:MilkChart,options:{stroke:true,strokeWeight:3,strokeColor:"#ffffff",chartTextColor:"#000000",shadow:false,chartLineWeight:2,pieBorder:false},initialize:function(b,a){this.parent(b,a);this.rowCount=this.element.getElement("thead").getChildren()[0].getChildren().length;this.colors=this.__getColors(this.options.colors);this.options.showRowNames=false;this.getData();this.prepareCanvas();this.radius=(this.chartHeight/2);if(this.options.showKey){this.drawKey()}this.draw()},getData:function(){this.element.getElement("thead").getChildren()[0].getChildren().each(function(b){this.rowNames.push(b.get("html"));this.colNames.push(b.get("html"))}.bind(this));var a=0;this.element.getElement("tbody").getChildren()[0].getChildren().each(function(c){var b=[];var d=c.get("html").toInt();b.push(d);a+=d;this.rows.push(b)}.bind(this));this.rows.each(function(b){b.push((b[0]/a)*360)});this.pieTotal=a},draw:function(){var c=0;var a=new Point((this.bounds[1].x/2)+this.options.padding,(this.bounds[1].y/2)+this.options.padding);if(this.options.shadow){var b=this.ctx.createRadialGradient(a.x,a.y,this.radius,a.x*1.03,a.y*1.03,this.radius*1.05);b.addColorStop(0.5,"#000000");b.addColorStop(0.75,"#000000");b.addColorStop(1,"rgba(0,0,0,0)");this.ctx.fillStyle=b;this.ctx.fillRect(this.bounds[0].x,this.bounds[0].y,this.width,this.height)}this.rows.each(function(n,g){this.ctx.fillStyle=this.colors[g];this.ctx.beginPath();this.ctx.arc(a.x,a.y,this.radius,(Math.PI/180)*c,(Math.PI/180)*(n[1]+c),false);this.ctx.lineTo(a.x,a.y);this.ctx.closePath();this.ctx.fill();if(this.options.stroke){this.ctx.strokeStyle=this.options.strokeColor;this.ctx.lineWidth=this.options.strokeWeight;this.ctx.lineJoin="round";this.ctx.beginPath();this.ctx.arc(a.x,a.y,this.radius,(Math.PI/180)*c,(Math.PI/180)*(n[1]+c),false);this.ctx.lineTo(a.x,a.y);this.ctx.closePath();this.ctx.stroke()}if(this.options.showValues){this.ctx.font=this.options.fontSize+"px "+this.options.font;this.ctx.fillStyle=this.options.chartTextColor;this.ctx.textAlign="center";var d=(Math.PI/180)*(c);var f=(Math.PI/180)*(n[1]+c);var e=d+((f-d)/2);var h=Math.round((n[0]/this.pieTotal)*100);var k=(h<5)?0.9:1.75;var m=this.radius*Math.cos(e)/k;var l=this.radius*Math.sin(e)/k;this.ctx.fillText(h+"%",a.x+m,a.y+l)}c+=n[1]}.bind(this));if(this.options.pieBorder){this.ctx.lineWidth=this.options.chartLineWeight;this.ctx.strokeStyle=this.options.chartLineColor;this.ctx.beginPath();this.ctx.arc(a.x,a.y,this.radius-1,0,Math.PI*2);this.ctx.stroke()}},drawKey:function(){var d=0;var b=Math.ceil(this.height*0.06);var c=this.rowNames.length*b;var c=(c>this.height)?this.height*0.9:c;var a=(this.height-c)/2;this.ctx.font=this.options.fontSize+"px "+this.options.font;this.rowNames.each(function(e){this.ctx.fillStyle=this.options.fontColor;this.ctx.textAlign="left";this.ctx.fillText(MilkChart.escape(e),this.keyBounds[0].x+14,a+8);this.ctx.fillStyle=this.colors[d];this.ctx.fillRect(Math.ceil(this.keyBounds[0].x),Math.ceil(a),10,10);d++;a+=b}.bind(this))}});MilkChart.Shapes=new Hash({square:function(b,a,e,d,c){b.fillStyle=c;b.fillRect(a-(d/2),e-(d/2),d,d)},circle:function(b,a,e,d,c){b.fillStyle=c;b.beginPath();b.arc(a,e,d/2,0,(Math.PI/180)*360,true);b.closePath();b.fill()},triangle:function(b,a,e,d,c){b.fillStyle=c;b.beginPath();a-=d/2;e-=d/2;lr=new Point(a+d,e+d);b.moveTo(a,lr.y);b.lineTo(a+(d/2),e);b.lineTo(lr.x,lr.y);b.closePath();b.fill()},cross:function(b,a,e,d,c){a-=d/2;e-=d/2;b.strokeStyle=c;b.lineWidth=1;b.beginPath();b.moveTo(a,e);b.lineTo(a+d,e+d);b.moveTo(a,e+d);b.lineTo(a+d,e);b.closePath();b.stroke()},diamond:function(b,a,e,d,c){a-=d/2;e-=d/2;b.fillStyle=c;b.beginPath();b.moveTo(a+(d/2),e);b.lineTo(a+d,e+(d/2));b.lineTo(a+(d/2),e+d);b.lineTo(a,e+(d/2));b.closePath();b.fill()}});MilkChart.escape=function(b){b=String(b);var a=[[/\&amp;/g,"&"],[/\&lt;/g,"<"],[/\&gt;/g,">"]];a.each(function(c){b=b.replace(c[0],c[1])});return b};