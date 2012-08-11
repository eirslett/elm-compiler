var Guid=function(){var d=0;return{guid:function(){return d+=1}}}(),Foreign=function(){var d=function(a){for(var c=["Nil"],b=a.length;b--;)c=["Cons",a[b],c];return c},b=function(a){for(var c=[];"Cons"===a[0];)c.push(a[1]),a=a[2];return c},c=function(a){return a.slice(1)},a=function(a){return["Tuple"+a.length].concat(a)};return{JavaScript:{castJSBoolToBool:function(a){return a},castBoolToJSBool:function(a){return a},castJSNumberToFloat:function(a){return a},castFloatToJSNumber:function(a){return a},
castJSNumberToInt:function(a){return~~a},castIntToJSNumber:function(a){return a},Experimental:{castJSElementToElement:function(a){return Element.jsElement(a)},castElementToJSElement:function(a){return a}},castJSArrayToList:d,castListToJSArray:b,castJSStringToString:d,castStringToJSString:function(a){return"string"===typeof a?a:b(a).join("")},castTupleToJSTuple2:c,castTupleToJSTuple3:c,castTupleToJSTuple4:c,castTupleToJSTuple5:c,castJSTupleToTuple2:a,castJSTupleToTuple3:a,castJSTupleToTuple4:a,castJSTupleToTuple5:a}}}(),
ElmJSON=function(){function d(a){return function(g){function b(a){switch(a[0]){case "JsonNull":return null;case "JsonString":return c.castStringToJSString(a[1]);case "JsonObject":var g={},a=a[1][1],d;for(d in a)g[d]=b(a[d]);return g;case "JsonArray":g=c.castListToJSArray(a[1]);for(d=g.length;d--;)g[d]=b(g[d]);return g;default:return a[1]}}return JSON.stringify(b(["JsonObject",g]),null,c.castStringToJSString(a))}}function b(a){function g(a){switch(typeof a){case "string":return["JsonString",c.castJSStringToString(a)];
case "number":return["JsonNumber",c.castJSNumberToFloat(a)];case "boolean":return["JsonBool",c.castJSBoolToBool(a)];case "object":if(null===a)return["JsonNull"];for(var b in a)a[b]=g(a[b]);return a instanceof Array?["JsonArray",c.castJSArrayToList(a)]:["JsonObject",["JSON",a]]}}var a=JSON.parse(a),b;for(b in a)a[b]=g(a[b]);return["JSON",a]}var c=Foreign.JavaScript;return{empty:["JSON",{}],singleton:function(a){return function(b){var e={};e[c.castStringToJSString(a)]=b;return["JSON",e]}},insert:function(a){return function(b){return function(e){var e=
e[1],d={},j;for(j in e)d[j]=e[j];d[c.castStringToJSString(a)]=b;return["JSON",d]}}},lookup:function(a){return function(b){var e=c.castStringToJSString(a);return b[1].hasOwnProperty(e)?Just(b[1][e]):Nothing}},lookupWithDefault:function(a){return function(b){return function(e){var d=c.castStringToJSString(b);return e[1].hasOwnProperty(d)?e[1][d]:a}}},remove:function(a){return function(b){var b=b[1],e={},d;for(d in b)e[d]=b[d];delete e[c.castStringToJSString(a)];return["JSON",e]}},toPrettyJSString:d,
toJSString:d(""),fromJSString:b,toPrettyString:function(a){return function(b){return c.castJSStringToString(d(a)(b))}},toString:function(a){return c.castJSStringToString(d("")(a))},fromString:function(a){return b(c.castStringToJSString(a))},toList:function(a){var a=a[1],b=[],e;for(e in a)b.push(Value.Tuple(c.castJSStringToString(e),a[e]));return c.castJSArrayToList(b)},fromList:function(a){for(var a=c.castListToJSArray(a),b={},e=a.length;e--;)b[c.castStringToJSString(a[e][1])]=a[e][2];return["JSON",
b]},JsonString:function(a){return["JsonString",a]},JsonNumber:function(a){return["JsonNumber",a]},JsonBool:function(a){return["JsonBool",a]},JsonNull:["JsonNull"],JsonArray:function(a){return["JsonArray",a]},JsonObject:function(a){return["JsonObject",a]}}}();Foreign.JavaScript.JSON=ElmJSON;
var Value=function(){var d=function(a,c){if("object"===typeof a){if(a===c)return!0;if(a.length!==c.length)return!1;for(var b=a.length;b--;)if(!d(a[b],c[b]))return!1;return!0}return a===c},b=function(a){a.replace('"',"&#34;");a.replace("&","&#38;");a.replace("'","&#39;");a.replace("<","&#60;");a.replace(">","&#62;");return a},c=function(a){if("boolean"===typeof a)return a?"True":"False";if("number"!==typeof a){if("string"===typeof a)return"'"+a+"'";if(a[0]){if("Tuple"===a[0].substring(0,5)){for(var b=
"",e=a.length;--e;)b=","+c(a[e])+b;","===b[0]&&(b=b.substring(1));return"("+b+")"}if("Cons"===a[0])for(var e="string"===typeof a[1]?'"':"]",d="string"===typeof a[1]?"":",",j="string"===typeof a[1]?function(a){return a}:c,b=("string"===typeof a[1]?'"':"[")+j(a[1]),a=a[2];;)if("Cons"===a[0])b+=d+j(a[1]),a=a[2];else return b+e;else{if("Nil"===a[0])return"[]";if("JSON"===a[0])return"(JSON.fromList "+c(ElmJSON.toList(a))+")";b="";for(e=a.length;--e;)b=" "+c(a[e])+b;b=a[0]+b;return 1<a.length?"("+b+")":
b}}}return a+""};return{eq:d,str:function(a){for(var b=["Nil"],c=a.length;c--;)b=["Cons",a[c],b];return b},show:function(a){return Text.monospace(b(c(a)))},Tuple:function(){var a=arguments.length,b=Array(a+1);for(b[0]="Tuple"+arguments.length;a--;)b[a+1]=arguments[a];return b},append:function(a,b){if("string"===typeof a&&"string"===typeof b)return a.concat(b);if("Nil"===a[0])return b;for(var c=["Cons",a[1],["Nil"]],d=c,a=a[2];"Cons"===a[0];)d[2]=["Cons",a[1],["Nil"]],a=a[2],d=d[2];d[2]=b;return c},
listToArray:function(a){for(var b=[];"Cons"===a[0];)b.push(a[1]),a=a[2];return b},toText:function(a){if("string"===typeof a)return a;for(var c=[];"Cons"===a[0];)c.push(a[1]),a=a[2];return b(c.join(""))},properEscape:b}}(),List=function(){function d(a){return function(f){if("Nil"===f[0])return f;"Cons"!==f[0]&&h("map");for(var b=["Cons",a(f[1]),["Nil"]],c=b,f=f[2];"Cons"===f[0];)c[2]=["Cons",a(f[1]),["Nil"]],f=f[2],c=c[2];return b}}function b(a){return function(f){return function(b){var c=f;if("Nil"===
b[0])return c;for("Cons"!==b[0]&&h("foldl");"Cons"===b[0];)c=a(b[1])(c),b=b[2];return c}}}function c(a){return function(f){return function(b){var c=f;if("Nil"===b[0])return c;"Cons"!==b[0]&&h("foldr");for(var d=[];"Cons"===b[0];)d.push(b[1]),b=b[2];for(b=d.length;b--;)c=a(d[b])(c);return c}}}function a(a){return function(f){var c;"Cons"!==f[0]?c=void 0:(c=f[1],f=f[2],c=b(a)(c)(f));return c}}function g(a){return function(f){return function(b){if("Nil"===b[0])return["Cons",f,["Nil"]];"Cons"!==b[0]&&
h("scanl");for(var c=[f];"Cons"===b[0];)f=a(b[1])(f),c.push(f),b=b[2];for(var b=["Nil"],d=c.length;d--;)b=["Cons",c[d],b];return b}}}function e(a){return function(f){a:{for(var b=[function(a){return"Nil"!==a[0]?void 0:["Tuple2",["Nil"],["Nil"]]},function(f){if("Cons"===f[0]){var b=f[1],f=f[2];var c=e(a)(f);"Tuple2"!==c[0]?b=void 0:(f=c[1],c=c[2],b=a(b)?["Tuple2",["Cons",b,f],c]:["Tuple2",f,["Cons",b,c]]);return b}}],c=b.length;c--;){var d=b[c](f);if(void 0!==d){f=d;break a}}f=void 0}return f}}function i(a){a:{for(var f=
[function(a){return"Nil"!==a[0]?void 0:["Tuple2",["Nil"],["Nil"]]},function(a){if("Cons"!==a[0])a=void 0;else if(a=["Tuple2",a[1],i(a[2])],"Tuple2"!==a[0]||"Tuple2"!==a[1][0])a=void 0;else var f=a[1][1],b=a[1][2],a="Tuple2"!==a[2][0]?void 0:["Tuple2",["Cons",f,a[2][1]],["Cons",b,a[2][2]]];return a}],b=f.length;b--;){var c=f[b](a);if(void 0!==c){a=c;break a}}a=void 0}return a}function j(a){return function(f){a:{for(var b=[function(a){return"Nil"!==a[0]?void 0:["Nil"]},function(a){if("Cons"===a[0]){var f=
a[1];return"Nil"!==a[2][0]?void 0:["Cons",f,["Nil"]]}},function(f){if("Cons"===f[0]){var b=f[1];if("Cons"===f[2][0]){var c=f[2][1],f=f[2][2];return["Cons",b,["Cons",a,j(a)(["Cons",c,f])]]}}}],c=b.length;c--;){var d=b[c](f);if(void 0!==d){f=d;break a}}f=void 0}return f}}function o(a){return function(f){a:{for(var b=[function(a){return"Nil"!==a[0]?void 0:["Nil"]},function(a){if("Cons"===a[0]){var f=a[1];return"Nil"!==a[2][0]?void 0:f}},function(f){if("Cons"===f[0]){var b=f[1];if("Cons"===f[2][0]){var c=
f[2][1],f=f[2][2];return Value.append(b,Value.append(a,o(a)(["Cons",c,f])))}}}],c=b.length;c--;){var d=b[c](f);if(void 0!==d){f=d;break a}}f=void 0}return f}}var h=function(a){throw"Function '"+a+"' expecting a list!";},l=b(function(a){return function(f){return["Cons",a,f]}})(["Nil"]),k=c(function(a){return function(f){return Value.append(a,f)}})(["Nil"]),n=b(function(a){return function(f){return a&&f}})(!0),p=b(function(a){return function(f){return a||f}})(!1),m=b(function(a){return function(f){return a+
f}})(0),q=b(function(a){return function(f){return a*f}})(1),t=a(function(a){return function(f){return Math.max(a,f)}}),r=a(function(a){return function(f){return Math.min(a,f)}});return{head:function(a){if("Cons"!==a[0])throw"Error: 'head' only accepts lists of length greater than one.";return a[1]},tail:function(a){if("Cons"!==a[0])throw"Error: 'tail' only accepts lists of length greater than one.";return a[2]},last:function(a){if("Cons"!==a[0])throw"Error: 'last' only accepts lists of length greater than one.";
for(var f=a[1];"Cons"===a[0];)f=a[1],a=a[2];return f},map:d,foldl:b,foldr:c,foldl1:a,foldr1:function(a){return function(f){if("Nil"===f[0])throw"'foldr1' requires an non-empty list.";"Cons"!==f[0]&&h("foldr1");for(var b=[];"Cons"===f[0];)b.push(f[1]),f=f[2];for(var f=b.pop(),c=b.length;c--;)f=a(b[c])(f);return f}},scanl:g,scanl1:function(a){return function(f){if("Cons"!==f[0])throw"Error: 'scanl1' requires a list of at least length 1.";return g(a)(f[1])(f[2])}},filter:function(a){return function(f){if("Nil"===
f[0])return f;"Cons"!==f[0]&&h("filter");for(var b=[];"Cons"===f[0];)a(f[1])&&b.push(f[1]),f=f[2];for(var f=["Nil"],c=b.length;c--;)f=["Cons",b[c],f];return f}},length:function(a){for(var f=0;"Cons"===a[0];)f+=1,a=a[2];return f},reverse:l,concat:k,concatMap:function(a){return function(f){return k(d(a)(f))}},and:n,or:p,forall:function(a){return b(function(f){return function(b){return b&&a(f)}})(!0)},exists:function(a){return b(function(f){return function(b){return b||a(f)}})(!1)},sum:m,product:q,maximum:t,
minimum:r,partition:e,zipWith:function(a){return function(f){return function(b){if("Nil"===f[0]||"Nil"===b[0])return["Nil"];("Cons"!==f[0]||"Cons"!==b[0])&&h("zipWith");for(var c=[];"Cons"===f[0]&&"Cons"===b[0];)c.push(a(f[1])(b[1])),f=f[2],b=b[2];for(var b=["Nil"],d=c.length;d--;)b=["Cons",c[d],b];return b}}},zip:function(a){return function(b){if("Nil"===a[0]||"Nil"===b[0])return["Nil"];("Cons"!==a[0]||"Cons"!==b[0])&&h("zip");for(var c=[];"Cons"===a[0]&&"Cons"===b[0];)c.push(["Tuple2",a[1],b[1]]),
a=a[2],b=b[2];for(var b=["Nil"],d=c.length;d--;)b=["Cons",c[d],b];return b}},unzip:i,intersperse:j,intercalate:o,sort:function(a){if("Nil"===a[0])return a;"Cons"!==a[0]&&h("sort");for(var b=[];"Cons"===a[0];)b.push(a[1]),a=a[2];b.sort(function(a,b){return a-b});for(var a=["Nil"],c=b.length;c--;)a=["Cons",b[c],a];return a},take:function(a){return function(b){if(0>=a)return["Nil"];if("Nil"===b[0])return b;"Cons"!==b[0]&&h("take");var c=["Cons",b[1],["Nil"]],d=c,b=b[2];for(--a;"Cons"===b[0]&&0<a;)d[2]=
["Cons",b[1],["Nil"]],d=d[2],b=b[2],--a;return c}},drop:function(a){return function(b){if("Nil"===b[0])return b;for("Cons"!==b[0]&&h("drop");"Cons"===b[0]&&0<a;)b=b[2],--a;return b}}}}(),Data=function(){var d;d=function(b){return function(a){return"Just"===b[0]?["Cons",b[1],a]:a}};var b=function(b){return function(a){return function(d){var e=b(a);return"Just"===e[0]?["Cons",e[1],d]:d}}};d={Just:function(b){return["Just",b]},Nothing:["Nothing"],catMaybes:List.foldr(d)(["Nil"]),isJust:function(b){return"Just"===
b[0]},isNothing:function(b){return"Nothing"===b[0]},fromMaybe:function(b){return function(a){return"Just"===a[0]?a[1]:b}},consMaybe:d,mapMaybe:function(c){return List.foldr(b(c))(["Nil"])},maybe:function(b){return function(a){return function(d){return"Just"===d[0]?a(d[1]):b}}}};return{String:{toText:Value.toText,properEscape:Value.properEscape},Char:{fromCode:function(b){return String.fromCharCode(b)},toCode:function(b){return b.charCodeAt(0)},toUpper:function(b){return b.toUpperCase()},toLower:function(b){return b.toLowerCase()},
toLocaleUpper:function(b){return b.toLocaleUpperCase()},toLocaleLower:function(b){return b.toLocaleLowerCase()}},Maybe:d,List:List}}(),Color=function(){var d=function(b,c,a,d){return{r:b,g:c,b:a,a:d}};return{black:d(0,0,0,1),white:d(255,255,255,1),red:d(255,0,0,1),green:d(0,255,0,1),blue:d(0,0,255,1),gray:d(128,128,128,1),grey:d(128,128,128,1),yellow:d(255,255,0,1),cyan:d(0,255,255,1),magenta:d(255,0,255,1),rgba:function(b){return function(c){return function(a){return function(g){return d(b,c,a,g)}}}},
rgb:function(b){return function(c){return function(a){return d(b,c,a,1)}}},Internal:{extract:function(b){return 1===b.a?"rgb("+b.r+","+b.g+","+b.b+")":"rgba("+b.r+","+b.g+","+b.b+","+b.a+")"}}}}(),Element=function(){var d=function(a){a=document.createElement(a);a.id=Guid.guid();a.style.padding="0";a.style.margin="0";return a},b=function(a){var b=d("div");b.appendChild(a);return b},c=function(a){return function(b){return function(c){var e=d("div");e.isElmLeaf=!0;e.isElmText=!0;e.innerHTML=c;e.style.textAlign=
b;0<a&&(e.style.width=a+"px");return e}}},a=c(0)("left"),g=c(0)("justify"),e=c(0)("center"),i=c(0)("right"),j=function(a){return"DIV"===a.tagName?a:b(a)},o=function(a){a.style.styleFloat="left";a.style.cssFloat="left";return a},h=function(a){a.style.position="absolute";return a},l=function(a,b,c){for(var e=d("div"),g=c.length;g--;){var h=b(c[g]);e.appendChild(h)}e.elmFlowDirection=a;return e},k=function(a){return function(b){for(var c=[];"Cons"===b[0];)c.push(b[1]),b=b[2];3<=a&&c.reverse();b=a%3;
if(0==b)return l("Y",j,c);if(1==b)return l("X",o,c);if(2==b)return l("Z",h,c)}},n=function(a){return function(b){if("A"===b.tagName)return n(a)(b.firstChild),b;if(b.hasOwnProperty("isElmText")){var d=c(a)(b.style.textAlign)(b.innerHTML);b.style.height=d.style.height}b.style.width=a+"px";return b}};return{text:a,image:function(a){var b=d("img");b.isElmLeaf=!0;b.onload=function(){""===b.style.width&&0<this.width&&(b.style.width=b.width=this.width+"px");""===b.style.height&&0<this.height&&(b.style.height=
b.height=this.height+"px");Dispatcher.adjust()};b.src=Data.String.toText(a);b.name=b.src;return b},fittedImage:function(a){return function(b){return function(c){var e=d("canvas");e.style.width=a+"px";e.style.height=b+"px";e.width=a;e.height=b;e.innerHTML="Your browser does not support the canvas element.";e.isElmLeaf=!0;var g=d("img");g.onload=function(){if(e.getContext){var c=e.getContext("2d"),f=0,d=0,h=this.width,o=this.height;a/b>this.width/this.height?(o=this.width*b/a,d=(this.height-o)/2):(h=
this.height*a/b,f=(this.width-h)/2);c.drawImage(g,f,d,h,o,0,0,e.width,e.height)}};g.src=Data.String.toText(c);return e}}},video:function(a){var a=Data.String.toText(a),b=d("video");b.controls="controls";var c=d("source");c.src=a;c.type="video/"+a.substring(a.length-3,a.length);b.appendChild(c);b.isElmLeaf=!0;return b},audio:function(a){var a=Data.String.toString(a),b=d("video");b.controls="controls";var c=d("source");c.src=a;c.type="audio/"+a.substring(a.length-3,a.length);b.appendChild(c);b.isElmLeaf=
!0;return b},collage:function(a){return function(b){return function(c){var e=d("canvas");e.style.width=a+"px";e.style.height=b+"px";e.width=a;e.height=b;if(e.getContext){var g=e.getContext("2d");for(g.clearRect(0,0,e.width,e.height);"Cons"===c[0];)g=c[1](g),c=c[2];return e}e.innerHTML="Your browser does not support the canvas element.";e.isElmLeaf=!0;return e}}},flow:k,layers:k(2),rectangle:function(a){return function(b){var c=d("div");c.isElmLeaf=!0;c.style.width=a+"px";c.style.height=b+"px";return c}},
beside:function(a){return function(b){return k(4)(["Cons",a,["Cons",b,["Nil"]]])}},above:function(a){return function(b){return k(3)(["Cons",a,["Cons",b,["Nil"]]])}},below:function(a){return function(b){return k(0)(["Cons",a,["Cons",b,["Nil"]]])}},box:function(a){return function(b){b.style.position="absolute";b.style.margin="auto";var c=(a-1)%3,e=(a-1)/3;2>c&&(b.style.left=0);0<c&&(b.style.right=0);2>e&&(b.style.top=0);0<e&&(b.style.bottom=0);c=d("div");c.style.position="relative";c.appendChild(b);
return c}},width:n,height:function(a){return function(b){("A"===b.tagName?b.firstChild:b).style.height=a+"px";return b}},size:function(a){return function(b){return function(c){var d="A"===c.tagName?c.firstChild:c;d.style.width=a+"px";d.style.height=b+"px";return c}}},color:function(a){return function(b){b.style.backgroundColor=Color.Internal.extract(a);return b}},opacity:function(a){return function(b){b.style.opacity=a;return b}},link:function(a){return function(c){var e=d("a");e.href=Text.fromString(a);
e.appendChild(c);return b(e)}},asText:function(a){return c(0)("left")(Value.show(a))},plainText:function(a){return c(0)("left")(Data.String.toText(a))},justifiedText:g,centeredText:e,rightedText:i,up:0,left:1,inward:2,down:3,right:4,outward:5,correctTextSize:function(a){var b=a.style.width?a.style.width.slice(0,-2):0,c=d("div");c.innerHTML=a.innerHTML;c.style.textAlign=a.style.textAlign;0<b&&(c.style.width=b+"px");c.style.visibility="hidden";c.style.styleFloat="left";c.style.cssFloat="left";document.body.appendChild(c);
var e=window.getComputedStyle(c);0>=b&&(a.style.width=e.getPropertyValue("width"));a.style.height=e.getPropertyValue("height");document.body.removeChild(c)},jsElement:function(a){return function(b){return function(c){var e=d("div");e.isElmLeaf=!0;e.style.width=a+"px";e.style.height=b+"px";e.appendChild(c);return e}}}}}(),Text=function(){var d=function(a){if("string"===typeof a)return a;for(var b=[];"Cons"===a[0];)b.push(a[1]),a=a[2];return Data.String.properEscape(b.join(""))},b=function(a){return function(b){return"<"+
a+' style="padding:0;margin:0">'+b+"</"+a+">"}},c=function(a,b){return function(c){return"<span style='"+a+":"+b+"'>"+c+"</span>"}},a=b("h1"),g=c("font-style","italic"),b=b("b"),e=c("text-decoration","underline"),i=c("text-decoration","overline"),j=c("text-decoration","line-through");return{fromString:d,toText:d,header:a,height:function(a){return c("font-size",a+"em")},italic:g,bold:b,underline:e,overline:i,strikeThrough:j,monospace:c("font-family","monospace"),color:function(a){return c("color",
Color.Internal.extract(a))},link:function(a){return function(b){return"<a href='"+d(a)+"'>"+b+"</a>"}}}}(),Shape=function(){var d=function(b,a,d,e){return{center:b,points:a,theta:d,scale:e}},b=function(b){return function(a){return function(d){return function(e){e.save();e.translate(d.center[0],d.center[1]);e.rotate(d.theta);e.scale(d.scale,d.scale);e.beginPath();var i=d.points;e.moveTo(i[0][0],i[0][1]);for(var j=i.length;j--;)e.lineTo(i[j][0],i[j][1]);e.closePath();b?(e.fillStyle=Color.Internal.extract(a),
e.fill()):(e.strokeStyle=Color.Internal.extract(a),e.stroke());e.restore();return e}}}};return{polygon:function(b){return function(a){for(var g=[];"Cons"===b[0];)g.push([b[1][1],b[1][2]]),b=b[2];a=[a[1],a[2]];return d(a,g,0,1)}},ngon:function(b){return function(a){return function(g){for(var e=[],i=b;i--;)e.push([a*Math.cos(2*Math.PI*i/b),a*Math.sin(2*Math.PI*i/b)]);g=[g[1],g[2]];return d(g,e,0,1)}}},rect:function(b){return function(a){return function(g){var e=[[-b/2,-a/2],[b/2,-a/2],[b/2,a/2],[-b/
2,a/2]],g=[g[1],g[2]];return d(g,e,0,1)}}},oval:function(b){return function(a){return function(g){for(var e=[],i=2*Math.PI;0<i;i-=Math.PI/50)e.push([b/2*Math.cos(i),a/2*Math.sin(i)]);g=[g[1],g[2]];return d(g,e,0,1)}}},move:function(b){return function(a){return function(g){return d([b+g.center[0],a+g.center[1]],g.points,g.theta,g.scale)}}},rotate:function(b){return function(a){return d(a.center,a.points,a.theta+2*Math.PI*b,a.scale)}},scale:function(b){return function(a){return d(a.center,a.points,
a.theta,a.scale*b)}},filled:b(!0),outlined:b(!1),customOutline:function(b){return function(a){return function(d){d.points.push(d.points[0]);return Line.customLine(b)(a)(d)}}}}}(),Line=function(){var d=function(b){return function(c){return function(a){if("string"===typeof b[0]){for(var d=[];"Cons"===b[0];)d.push(b[1]),b=b[2];b=d}0===b.length&&(b=[8,4]);return function(d){d.save();d.beginPath();d.translate(a.center[0],a.center[1]);d.rotate(a.theta);d.scale(a.scale,a.scale);var g=b,j=a.points,o=j.length-
1,h=j[o][0],l=j[o][1],k=0,n=0,p=0,m=0,q=0,t=0,r=g.length,u=!0,f=g[0];for(d.moveTo(h,l);o--;){k=j[o][0];n=j[o][1];p=k-h;m=n-l;for(q=Math.sqrt(p*p+m*m);f<=q;)h+=p*f/q,l+=m*f/q,d[u?"lineTo":"moveTo"](h,l),p=k-h,m=n-l,q=Math.sqrt(p*p+m*m),u=!u,t=(t+1)%r,f=g[t];0<q&&(d[u?"lineTo":"moveTo"](k,n),f-=q);h=k;l=n}d.strokeStyle=Color.Internal.extract(c);d.stroke();d.restore();return d}}}};return{line:function(b){for(var c=[];"Cons"===b[0];)c.push([b[1][1],b[1][2]]),b=b[2];return{center:[0,0],points:c,theta:0,
scale:1}},customLine:d,solid:function(b){return function(c){return function(a){a.save();a.beginPath();a.translate(c.center[0],c.center[1]);a.rotate(c.theta);a.scale(c.scale,c.scale);var d=c.points,e=d.length;for(a.moveTo(d[e-1][0],d[e-1][1]);e--;)a.lineTo(d[e][0],d[e][1]);a.strokeStyle=Color.Internal.extract(b);a.stroke();a.restore();return a}}},dashed:d([8,4]),dotted:d([3,3])}}(),Elm=function(){var d=function(a,b,c){for(var d=a.kids,e=d.length;e--;)d[e].recv(b,c,a.id)},b=function(a){this.id=Guid.guid();
this.value=a;this.kids=[];this.recv=function(a,b,c){if(b=b===this.id)this.value=c;d(this,a,b)};Dispatcher.inputs.push(this)},c=function(a,b){this.id=Guid.guid();this.value=null;this.kids=[];this.inbox={};b.reverse();this.recalc=function(){for(var c=a,d=b.length;d--;)c=c(b[d].value);this.value=c};this.recalc();this.recv=function(a,c){this.inbox.hasOwnProperty(a)||(this.inbox[a]={changed:!1,count:0});var e=this.inbox[a];e.count+=1;c&&(e.changed=!0);e.count==b.length&&(e.changed&&this.recalc(),d(this,
a,e.changed),delete this.inbox[a])};for(var c=b.length;c--;)b[c].kids.push(this)},a=function(a,b,c){this.id=Guid.guid();this.value=b;this.kids=[];this.recv=function(b,e){e&&(this.value=a(c.value)(this.value));d(this,b,e)};c.kids.push(this)},g=function(a,b,c){this.id=Guid.guid();this.value=a(c.value)?b:c.value;this.kids=[];this.recv=function(b,e){var g=e&&!a(c.value);g&&(this.value=c.value);d(this,b,g)};c.kids.push(this)},e=function(a){this.id=Guid.guid();this.value=a.value;this.kids=[];this.recv=
function(b,c){var e=c&&!eq(this.value,a.value);e&&(this.value=a.value);d(this,b,e)};a.kids.push(this)},i=function(a){return function(b){return function(d){d=new c(function(a){return function(b){return[a,b]}},[a,d]);d=new g(function(a){return a[0]},[!0,b],d);return new c(function(a){return a[1]},[d])}}},j=function(a,b){this.id=Guid.guid();this.value=b.value;this.kids=[];this.inbox={};this.recv=function(c,e,g){if(e=e&&g===a.id)this.value=b.value;d(this,c,e)};a.kids.push(this);b.kids.push(this)};return{Input:function(a){return new b(a)},
Lift:function(a,b){return new c(a,b)},Fold:function(b,c,d){return new a(b,c,d)},keepIf:function(a){return function(b){return function(c){return new g(function(b){return!a(b)},b,c)}}},dropIf:function(a){return function(b){return function(c){return new g(a,b,c)}}},keepWhen:function(a){return i(new c(function(a){return!a},[a]))},dropWhen:i,dropRepeats:function(a){return new e(a)},sampleOn:function(a){return function(b){return new j(a,b)}}}}(),Dispatcher=function(){var d=null,b=0,c=[],a=function(b){var c=
b.childNodes,d=c.length;if(b.hasOwnProperty("isElmLeaf")){b.hasOwnProperty("isElmText")&&Element.correctTextSize(b);var c=""===b.style.width?0:b.style.width.slice(0,-2)-0,g=""===b.style.height?0:b.style.height.slice(0,-2)-0;return[c,g]}if(1===d){var h=a(c[0]);b.style.hasOwnProperty("width")&&0<b.style.width.length&&(h[0]=b.style.width.slice(0,-2)-0);b.style.hasOwnProperty("height")&&0<b.style.height.length&&(h[1]=b.style.height.slice(0,-2)-0);0!==h[0]&&(b.style.width=h[0]+"px");0!==h[1]&&(b.style.height=
h[1]+"px");return h}for(var l=0,k=g=0,n=0,p=!0,m=!0;d--;)h=a(c[d]),l=Math.max(l,h[0]),g=Math.max(g,h[1]),k+=h[0],n+=h[1],p=p&&0<h[0],m=m&&0<h[1];c=l;d=b.elmFlowDirection;"X"===d&&(c=p?k:0);"Y"===d&&(g=m?n:0);0<c&&(b.style.width=c+"px");0<g&&(b.style.height=g+"px");return[c,g]},g=function(){var b=document.getElementById("content");a(b.children[0])};return{initialize:function(){d=ElmCode.main();d.hasOwnProperty("recv")||(d=Elm.Input(d));document.getElementById("content").appendChild(d.value);g();var a=
document.getElementById("widthChecker").offsetWidth;a!==window.innerWidth&&Dispatcher.notify(Window.dimensions.id,Value.Tuple(a,window.innerHeight));d=Elm.Lift(function(a){var b=document.getElementById("content"),c=b.children[0];b.replaceChild(a,c);delete c;g();return a},[d])},notify:function(a,d){b+=1;for(var g=c.length;g--;)c[g].recv(b,a,d)},adjust:g,inputs:c}}(),Signal=function(){function d(a){for(var b=["Nil"],c=a.length;c--;)b=["Cons",a[c],b];return b}var b;b=document.addEventListener?function(a,
b,c){a.addEventListener(b,c,!1)}:function(a,b,c){a.attachEvent("on"+b,c)};var c,a=function(a){var b=0,c=0;a||(a=window.event);if(a.pageX||a.pageY)b=a.pageX,c=a.pageY;else if(a.clientX||a.clientY)b=a.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,c=a.clientY+document.body.scrollTop+document.documentElement.scrollTop;return Value.Tuple(b,c)},g=Elm.Input(Value.Tuple(0,0)),e=Elm.Input(!1),i=Elm.Input(!1),j=Elm.Input(Value.Tuple());b(document,"click",function(){Dispatcher.notify(i.id,
!0);Dispatcher.notify(j.id,Value.Tuple());Dispatcher.notify(i.id,!1)});b(document,"mousedown",function(){Dispatcher.notify(e.id,!0)});b(document,"mouseup",function(){Dispatcher.notify(e.id,!1)});b(document,"mousemove",function(b){Dispatcher.notify(g.id,a(b))});c={position:g,x:Elm.Lift(function(a){return a[1]},[g]),y:Elm.Lift(function(a){return a[2]},[g]),isClicked:i,isDown:e,clicks:j,isClickedOn:function(a){var c=Elm.Input(!1);b(a,"click",function(){Dispatcher.notify(c.id,!0);Dispatcher.notify(c.id,
!1)});return Value.Tuple(a,c)}};var o,h=Elm.Input(Value.Tuple(window.innerWidth,window.innerHeight));b(window,"resize",function(){var a=document.getElementById("widthChecker").offsetWidth;Dispatcher.notify(h.id,Value.Tuple(a,window.innerHeight))});o={dimensions:h,width:Elm.Lift(function(a){return a[1]},[h]),height:Elm.Lift(function(a){return a[2]},[h])};var l=function(a,b){return"Nil"===b[0]?b:b[1]===a?b[2]:["Cons",b[1],l(a,b[2])]},k=Elm.Input(["Nil"]),n=Elm.Input(["Nothing"]);b(document,"keydown",
function(a){var b;a:{for(b=k.value;"Nil"!==b[0];){if(b[1]===a.keyCode){b=!0;break a}b=b[2]}b=!1}b||Dispatcher.notify(k.id,["Cons",a.keyCode,k.value])});b(document,"keyup",function(a){a=l(a.keyCode,k.value);Dispatcher.notify(k.id,a)});b(window,"blur",function(){Dispatcher.notify(k.id,["Nil"])});b(document,"keypress",function(a){Dispatcher.notify(n.id,["Just",a.charCode||a.keyCode]);Dispatcher.notify(n.id,["Nothing"])});var p={Raw:{keysDown:k,charPressed:n}},m;m=function(a){return function(b){var c=
Elm.Input(["Waiting"]),e={};window.XMLHttpRequest?e=new XMLHttpRequest:window.ActiveXObject&&(e=new ActiveXObject("Microsoft.XMLHTTP"));e.onreadystatechange=function(){4===e.readyState&&Dispatcher.notify(c.id,200===e.status?["Success",d(e.responseText)]:["Failure",e.status,d(e.statusText)])};e.open(a,Data.String.toText(b),!0);e.send(null);return c}};var q=function(a){return function(b){var c=Elm.Input(["Nothing"]),b=Elm.Lift(function(b){if("Just"!==b[0]){try{Dispatcher.notify(c.id,["Nothing"])}catch(e){}return[]}try{Dispatcher.notify(c.id,
["Just",["Waiting"]])}catch(g){c.value=["Just",["Waiting"]]}var s={};window.XMLHttpRequest?s=new XMLHttpRequest:window.ActiveXObject&&(s=new ActiveXObject("Microsoft.XMLHTTP"));s.onreadystatechange=function(){4===s.readyState&&Dispatcher.notify(c.id,["Just",200===s.status?["Success",d(s.responseText)]:["Failure",s.status,d(s.statusText)]])};s.open(a,Data.String.toText(b[1]),!0);s.send(null);return[]},[b]);return Elm.Lift(function(a){return function(){return a}},[c,b])}};m={get:m("GET"),post:m("POST"),
gets:q("GET"),posts:q("POST")};var t=function(a){a.isElmLeaf=!0;var c=Elm.Input(["Nil"]);b(a,"keyup",function(){Dispatcher.notify(c.id,d(a.value));a.focus()});return Value.Tuple(a,c)},r=function(a){a=document.createElement(a);a.id=Guid.guid();return a},u=function(a){for(var c=r("select"),d=[];"Cons"===a[0];){var e=r("option"),g=Text.toText(a[1][1]);e.value=g;e.innerHTML=g;c.appendChild(e);d.push(a[1][2]);a=a[2]}var h=Elm.Input(d[0]);b(c,"change",function(){Dispatcher.notify(h.id,d[c.selectedIndex])});
return Value.Tuple(c,h)};return{addListener:b,Mouse:c,Keyboard:p,Time:{every:function(a){var a=1E3*a,b=Elm.Input(0),c=0;setInterval(function(){c+=a;Dispatcher.notify(b.id,c/1E3)},a);return b},after:function(a){var a=1E3*a,b=Elm.Input(!1);setTimeout(function(){Dispatcher.notify(b.id,!0)},a);return b},before:function(a){var a=1E3*a,b=Elm.Input(!0);setTimeout(function(){Dispatcher.notify(b.id,!1)},a);return b}},Window:o,HTTP:m,Random:{inRange:function(a){return function(b){return Elm.Input(Math.floor(Math.random()*
(b-a+1))+a)}},randomize:function(a){return function(b){return function(c){return Elm.Lift(function(){return Math.floor(Math.random()*(b-a+1))+a},[c])}}}},Input:{textArea:function(a){return function(b){var c=r("textarea");c.rows=b;c.cols=a;return t(c,"")}},textField:function(a){var b=r("input");b.type="text";return t(b,a)},password:function(a){var b=r("input");b.type="password";return t(b,a)},checkbox:function(a){var c=r("input");c.type="checkbox";c.checked=a;var d=Elm.Input(a);b(c,"change",function(){Dispatcher.notify(d.id,
c.checked)});return Value.Tuple(c,d)},dropDown:u,stringDropDown:function(a){return u(List.map(function(a){return Value.Tuple(a,a)})(a))},button:function(a){var c=r("input");c.type="button";c.value=Text.toText(a);var d=Elm.Input(!1);b(c,"click",function(){Dispatcher.notify(d.id,!0);Dispatcher.notify(d.id,!1)});return Value.Tuple(c,d)}},constant:function(a){return Elm.Input(a)},lift:function(a){return function(b){return Elm.Lift(a,[b])}},lift2:function(a){return function(b){return function(c){return Elm.Lift(a,
[b,c])}}},lift3:function(a){return function(b){return function(c){return function(d){return Elm.Lift(a,[b,c,d])}}}},lift4:function(a){return function(b){return function(c){return function(d){return function(e){return Elm.Lift(a,[b,c,d,e])}}}}},foldp:function(a){return function(b){return function(c){return Elm.Fold(a,b,c)}}},count:function(a){return Elm.Fold(function(){return function(a){return a+1}},0,a)},keepIf:Elm.keepIf,dropIf:Elm.dropIf,keepWhen:Elm.keepWhen,dropWhen:Elm.dropWhen,dropRepeats:Elm.dropRepeats,
sampleOn:Elm.sampleOn}}(),Prelude=function(){var d=function(b){return function(c){var a=b%c,a=0==b?0:0<c?0<=b?a:a+c:-d(-b)(-c);return a==c?0:a}};return{id:function(b){return b},not:function(b){return!b},fst:function(b){return b[1]},snd:function(b){return b[2]},rem:function(b){return function(c){return b%c}},div:function(b){return function(c){return~~(b/c)}},compare:function(b){return function(c){b="object"===typeof b?toText(b):b;c="object"===typeof c?toText(c):c;return[b===c?"EQ":b<c?"LT":"GT"]}},
toFloat:function(b){return b},round:function(b){return Math.round(b)},floor:function(b){return Math.floor(b)},ceiling:function(b){return Math.ceil(b)},truncate:function(b){return~~b},sqrt:Math.sqrt,abs:Math.abs,pi:Math.PI,e:Math.E,sin:Math.sin,cos:Math.cos,tan:Math.tan,asin:Math.asin,acos:Math.acos,atan:Math.atan,mod:d,min:function(b){return function(c){return Math.min(b,c)}},max:function(b){return function(c){return Math.max(b,c)}},flip:function(b){return function(c){return function(a){return b(a)(c)}}},
clamp:function(b){return function(c){return function(a){return Math.min(c,Math.max(b,a))}}},curry:function(b){return function(c){return function(a){return b(["Tuple2",c,a])}}},uncurry:function(b){return function(c){if("Tuple2"!==c[0])throw"Function was uncurry'd but was not given a pair.";return b(c[1])(c[2])}},logBase:function(b){return function(c){return Math.log(c)/Math.log(b)}},Just:Data.Maybe.Just,Nothing:Data.Maybe.Nothing,maybe:Data.Maybe.maybe,map:Data.List.map,filter:Data.List.filter,head:Data.List.head,
tail:Data.List.tail,last:Data.List.last,length:Data.List.length,reverse:Data.List.reverse,foldr:Data.List.foldr,foldr1:Data.List.foldr1,foldl:Data.List.foldl,foldl1:Data.List.foldl1,and:Data.List.and,or:Data.List.or,forall:Data.List.forall,exists:Data.List.exists,sum:Data.List.sum,product:Data.List.product,concat:Data.List.concat,concatMap:Data.List.concatMap,maximum:Data.List.maximum,minimum:Data.List.minimum,scanl:Data.List.scanl,scanl1:Data.List.scanl1,take:Data.List.take,drop:Data.List.drop,lift:Signal.lift,
lift2:Signal.lift2,lift3:Signal.lift3,lift4:Signal.lift4,foldp:Signal.foldp,constant:Signal.constant,count:Signal.count,keepIf:Signal.keepIf,dropIf:Signal.dropIf,keepWhen:Signal.keepWhen,dropWhen:Signal.dropWhen,dropRepeats:Signal.dropRepeats,sampleOn:Signal.sampleOn}}(),eq=Value.eq;Signal.addListener(document,"elm_log",function(d){console.log(d.value)});Signal.addListener(document,"elm_title",function(d){document.title=d.value});
Signal.addListener(document,"elm_redirect",function(d){0<d.value.length&&(window.location=d.value)});var includeGlobal=this;
(function(){var d=function(b){for(var a in b)if("Internal"!==a)try{includeGlobal[a]=b[a]}catch(d){"length"===a&&(includeGlobal.execScript("var length;"),length=b[a])}},b=function(b){return function(a){includeGlobal[b]=includeGlobal[b]||{};for(var d in a)"Internal"!==d&&(includeGlobal[b][d]=a[d])}};d(Element);d(Text);color=Element.color;height=Element.height;show=Value.show;d(Color);d(Shape);d(Line);b("Time")(Signal.Time);b("Mouse")(Signal.Mouse);b("Keyboard")(Signal.Keyboard);b("Window")(Signal.Window);
b("HTTP")(Signal.HTTP);b("Input")(Signal.Input);b("Random")(Signal.Random)})();var ElmCode={};ElmCode.Data=Data;ElmCode.Signal=Signal;ElmCode.Data.List=List;ElmCode.Foreign=Foreign;ElmCode.Prelude=Prelude;