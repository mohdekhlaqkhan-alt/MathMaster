/**
 * 💳 Dynamic UPI Payment & WhatsApp Screenshot Verification Integration for BroPro
 */

// ==========================================================================
// 1. INLINED QR CODE GENERATION LIBRARY (qrcode.min.js)
// This guarantees that window.QRCode is defined immediately on load, bypassing
// dynamic script injection delays, racing conditions, or CSP failures.
// ==========================================================================
var QRCode;!function(){function a(a){this.mode=c.MODE_8BIT_BYTE,this.data=a,this.parsedData=[];for(var b=[],d=0,e=this.data.length;e>d;d++){var f=this.data.charCodeAt(d);f>65536?(b[0]=240|(1835008&f)>>>18,b[1]=128|(258048&f)>>>12,b[2]=128|(4032&f)>>>6,b[3]=128|63&f):f>2048?(b[0]=224|(61440&f)>>>12,b[1]=128|(4032&f)>>>6,b[2]=128|63&f):f>128?(b[0]=192|(1984&f)>>>6,b[1]=128|63&f):b[0]=f,this.parsedData=this.parsedData.concat(b)}this.parsedData.length!=this.data.length&&(this.parsedData.unshift(191),this.parsedData.unshift(187),this.parsedData.unshift(239))}function b(a,b){this.typeNumber=a,this.errorCorrectLevel=b,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}function i(a,b){if(void 0==a.length)throw new Error(a.length+"/"+b);for(var c=0;c<a.length&&0==a[c];)c++;this.num=new Array(a.length-c+b);for(var d=0;d<a.length-c;d++)this.num[d]=a[d+c]}function j(a,b){this.totalCount=a,this.dataCount=b}function k(){this.buffer=[],this.length=0}function m(){return"undefined"!=typeof CanvasRenderingContext2D}function n(){var a=!1,b=navigator.userAgent;return/android/i.test(b)&&(a=!0,aMat=b.toString().match(/android ([0-9]\.[0-9])/i),aMat&&aMat[1]&&(a=parseFloat(aMat[1]))),a}function r(a,b){for(var c=1,e=s(a),f=0,g=l.length;g>=f;f++){var h=0;switch(b){case d.L:h=l[f][0];break;case d.M:h=l[f][1];break;case d.Q:h=l[f][2];break;case d.H:h=l[f][3]}if(h>=e)break;c++}if(c>l.length)throw new Error("Too long data");return c}function s(a){var b=encodeURI(a).toString().replace(/\%[0-9a-fA-F]{2}/g,"a");return b.length+(b.length!=a?3:0)}a.prototype={getLength:function(){return this.parsedData.length},write:function(a){for(var b=0,c=this.parsedData.length;c>b;b++)a.put(this.parsedData[b],8)}},b.prototype={addData:function(b){var c=new a(b);this.dataList.push(c),this.dataCache=null},isDark:function(a,b){if(0>a||this.moduleCount<=a||0>b||this.moduleCount<=b)throw new Error(a+","+b);return this.modules[a][b]},getModuleCount:function(){return this.moduleCount},make:function(){this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(a,c){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var d=0;d<this.moduleCount;d++){this.modules[d]=new Array(this.moduleCount);for(var e=0;e<this.moduleCount;e++)this.modules[d][e]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(a,c),this.typeNumber>=7&&this.setupTypeNumber(a),null==this.dataCache&&(this.dataCache=b.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,c)},setupPositionProbePattern:function(a,b){for(var c=-1;7>=c;c++)if(!(-1>=a+c||this.moduleCount<=a+c))for(var d=-1;7>=d;d++)-1>=b+d||this.moduleCount<=b+d||(this.modules[a+c][b+d]=c>=0&&6>=c&&(0==d||6==d)||d>=0&&6>=d&&(0==c||6==c)||c>=2&&4>=c&&d>=2&&4>=d?!0:!1)},getBestMaskPattern:function(){for(var a=0,b=0,c=0;8>c;c++){this.makeImpl(!0,c);var d=f.getLostPoint(this);(0==c||a>d)&&(a=d,b=c)}return b},createMovieClip:function(a,b,c){var d=a.createEmptyMovieClip(b,c),e=1;this.make();for(var f=0;f<this.modules.length;f++)for(var g=f*e,h=0;h<this.modules[f].length;h++){var i=h*e,j=this.modules[f][h];j&&(d.beginFill(0,100),d.moveTo(i,g),d.lineTo(i+e,g),d.lineTo(i+e,g+e),d.lineTo(i,g+e),d.endFill())}return d},setupTimingPattern:function(){for(var a=8;a<this.moduleCount-8;a++)null==this.modules[a][6]&&(this.modules[a][6]=0==a%2);for(var b=8;b<this.moduleCount-8;b++)null==this.modules[6][b]&&(this.modules[6][b]=0==b%2)},setupPositionAdjustPattern:function(){for(var a=f.getPatternPosition(this.typeNumber),b=0;b<a.length;b++)for(var c=0;c<a.length;c++){var d=a[b],e=a[c];if(null==this.modules[d][e])for(var g=-2;2>=g;g++)for(var h=-2;2>=h;h++)this.modules[d+g][e+h]=-2==g||2==g||-2==h||2==h||0==g&&0==h?!0:!1}},setupTypeNumber:function(a){for(var b=f.getBCHTypeNumber(this.typeNumber),c=0;18>c;c++){var d=!a&&1==(1&b>>c);this.modules[Math.floor(c/3)][c%3+this.moduleCount-8-3]=d}for(var c=0;18>c;c++){var d=!a&&1==(1&b>>c);this.modules[c%3+this.moduleCount-8-3][Math.floor(c/3)]=d}},setupTypeInfo:function(a,b){for(var c=this.errorCorrectLevel<<3|b,d=f.getBCHTypeInfo(c),e=0;15>e;e++){var g=!a&&1==(1&d>>e);6>e?this.modules[e][8]=g:8>e?this.modules[e+1][8]=g:this.modules[this.moduleCount-15+e][8]=g}for(var e=0;15>e;e++){var g=!a&&1==(1&d>>e);8>e?this.modules[8][this.moduleCount-e-1]=g:9>e?this.modules[8][15-e-1+1]=g:this.modules[8][15-e-1]=g}this.modules[this.moduleCount-8][8]=!a},mapData:function(a,b){for(var c=-1,d=this.moduleCount-1,e=7,g=0,h=this.moduleCount-1;h>0;h-=2)for(6==h&&h--;;){for(var i=0;2>i;i++)if(null==this.modules[d][h-i]){var j=!1;g<a.length&&(j=1==(1&a[g]>>>e));var k=f.getMask(b,d,h-i);k&&(j=!j),this.modules[d][h-i]=j,e--,-1==e&&(g++,e=7)}if(d+=c,0>d||this.moduleCount<=d){d-=c,c=-c;break}}}},b.PAD0=236,b.PAD1=17,b.createData=function(a,c,d){for(var e=j.getRSBlocks(a,c),g=new k,h=0;h<d.length;h++){var i=d[h];g.put(i.mode,4),g.put(i.getLength(),f.getLengthInBits(i.mode,a)),i.write(g)}for(var l=0,h=0;h<e.length;h++)l+=e[h].dataCount;if(g.getLengthInBits()>8*l)throw new Error("code length overflow. ("+g.getLengthInBits()+">"+8*l+")");for(g.getLengthInBits()+4<=8*l&&g.put(0,4);0!=g.getLengthInBits()%8;)g.putBit(!1);for(;;){if(g.getLengthInBits()>=8*l)break;if(g.put(b.PAD0,8),g.getLengthInBits()>=8*l)break;g.put(b.PAD1,8)}return b.createBytes(g,e)},b.createBytes=function(a,b){for(var c=0,d=0,e=0,g=new Array(b.length),h=new Array(b.length),j=0;j<b.length;j++){var k=b[j].dataCount,l=b[j].totalCount-k;d=Math.max(d,k),e=Math.max(e,l),g[j]=new Array(k);for(var m=0;m<g[j].length;m++)g[j][m]=255&a.buffer[m+c];c+=k;var n=f.getErrorCorrectPolynomial(l),o=new i(g[j],n.getLength()-1),p=o.mod(n);h[j]=new Array(n.getLength()-1);for(var m=0;m<h[j].length;m++){var q=m+p.getLength()-h[j].length;h[j][m]=q>=0?p.get(q):0}}for(var r=0,m=0;m<b.length;m++)r+=b[m].totalCount;for(var s=new Array(r),t=0,m=0;d>m;m++)for(var j=0;j<b.length;j++)m<g[j].length&&(s[t++]=g[j][m]);for(var m=0;e>m;m++)for(var j=0;j<b.length;j++)m<h[j].length&&(s[t++]=h[j][m]);return s};for(var c={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},d={L:1,M:0,Q:3,H:2},e={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},f={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(a){for(var b=a<<10;f.getBCHDigit(b)-f.getBCHDigit(f.G15)>=0;)b^=f.G15<<f.getBCHDigit(b)-f.getBCHDigit(f.G15);return(a<<10|b)^f.G15_MASK},getBCHTypeNumber:function(a){for(var b=a<<12;f.getBCHDigit(b)-f.getBCHDigit(f.G18)>=0;)b^=f.G18<<f.getBCHDigit(b)-f.getBCHDigit(f.G18);return a<<12|b},getBCHDigit:function(a){for(var b=0;0!=a;)b++,a>>>=1;return b},getPatternPosition:function(a){return f.PATTERN_POSITION_TABLE[a-1]},getMask:function(a,b,c){switch(a){case e.PATTERN000:return 0==(b+c)%2;case e.PATTERN001:return 0==b%2;case e.PATTERN010:return 0==c%3;case e.PATTERN011:return 0==(b+c)%3;case e.PATTERN100:return 0==(Math.floor(b/2)+Math.floor(c/3))%2;case e.PATTERN101:return 0==b*c%2+b*c%3;case e.PATTERN110:return 0==(b*c%2+b*c%3)%2;case e.PATTERN111:return 0==(b*c%3+(b+c)%2)%2;default:throw new Error("bad maskPattern:"+a)}},getErrorCorrectPolynomial:function(a){for(var b=new i([1],0),c=0;a>c;c++)b=b.multiply(new i([1,g.gexp(c)],0));return b},getLengthInBits:function(a,b){if(b>=1&&10>b)switch(a){case c.MODE_NUMBER:return 10;case c.MODE_ALPHA_NUM:return 9;case c.MODE_8BIT_BYTE:return 8;case c.MODE_KANJI:return 8;default:throw new Error("mode:"+a)}else if(27>b)switch(a){case c.MODE_NUMBER:return 12;case c.MODE_ALPHA_NUM:return 11;case c.MODE_8BIT_BYTE:return 16;case c.MODE_KANJI:return 10;default:throw new Error("mode:"+a)}else{if(!(41>b))throw new Error("type:"+b);switch(a){case c.MODE_NUMBER:return 14;case c.MODE_ALPHA_NUM:return 13;case c.MODE_8BIT_BYTE:return 16;case c.MODE_KANJI:return 12;default:throw new Error("mode:"+a)}}},getLostPoint:function(a){for(var b=a.getModuleCount(),c=0,d=0;b>d;d++)for(var e=0;b>e;e++){for(var f=0,g=a.isDark(d,e),h=-1;1>=h;h++)if(!(0>d+h||d+h>=b))for(var i=-1;1>=i;i++)0>e+i||e+i>=b||(0!=h||0!=i)&&g==a.isDark(d+h,e+i)&&f++;f>5&&(c+=3+f-5)}for(var d=0;b-1>d;d++)for(var e=0;b-1>e;e++){var j=0;a.isDark(d,e)&&j++,a.isDark(d+1,e)&&j++,a.isDark(d,e+1)&&j++,a.isDark(d+1,e+1)&&j++,(0==j||4==j)&&(c+=3)}for(var d=0;b>d;d++)for(var e=0;b-6>e;e++)a.isDark(d,e)&&!a.isDark(d,e+1)&&a.isDark(d,e+2)&&a.isDark(d,e+3)&&a.isDark(d,e+4)&&!a.isDark(d,e+5)&&a.isDark(d,e+6)&&(c+=40);for(var e=0;b>e;e++)for(var d=0;b-6>d;d++)a.isDark(d,e)&&!a.isDark(d+1,e)&&a.isDark(d+2,e)&&a.isDark(d+3,e)&&a.isDark(d+4,e)&&!a.isDark(d+5,e)&&a.isDark(d+6,e)&&(c+=40);for(var k=0,e=0;b>e;e++)for(var d=0;d<b;d++)a.isDark(d,e)&&k++;var l=Math.abs(100*k/b/b-50)/5;return c+=10*l}},g={glog:function(a){if(1>a)throw new Error("glog("+a+")");return g.LOG_TABLE[a]},gexp:function(a){for(;0>a;)a+=255;for(;a>=256;)a-=255;return g.EXP_TABLE[a]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},h=0;8>h;h++)g.EXP_TABLE[h]=1<<h;for(var h=8;256>h;h++)g.EXP_TABLE[h]=g.EXP_TABLE[h-4]^g.EXP_TABLE[h-5]^g.EXP_TABLE[h-6]^g.EXP_TABLE[h-8];for(var h=0;255>h;h++)g.LOG_TABLE[g.EXP_TABLE[h]]=h;i.prototype={get:function(a){return this.num[a]},getLength:function(){return this.num.length},multiply:function(a){for(var b=new Array(this.getLength()+a.getLength()-1),c=0;c<this.getLength();c++)for(var d=0;d<a.getLength();d++)b[c+d]^=g.gexp(g.glog(this.get(c))+g.glog(a.get(d)));return new i(b,0)},mod:function(a){if(this.getLength()-a.getLength()<0)return this;for(var b=g.glog(this.get(0))-g.glog(a.get(0)),c=new Array(this.getLength()),d=0;d<this.getLength();d++)c[d]=this.get(d);for(var d=0;d<a.getLength();d++)c[d]^=g.gexp(g.glog(a.get(d))+b);return new i(c,0).mod(a)}},j.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],j.getRSBlocks=function(a,b){var c=j.getRsBlockTable(a,b);if(void 0==c)throw new Error("bad rs block @ typeNumber:"+a+"/errorCorrectLevel:"+b);for(var d=c.length/3,e=[],f=0;d>f;f++)for(var g=c[3*f+0],h=c[3*f+1],i=c[3*f+2],k=0;g>k;k++)e.push(new j(h,i));return e},j.getRsBlockTable=function(a,b){switch(b){case d.L:return j.RS_BLOCK_TABLE[4*(a-1)+0];case d.M:return j.RS_BLOCK_TABLE[4*(a-1)+1];case d.Q:return j.RS_BLOCK_TABLE[4*(a-1)+2];case d.H:return j.RS_BLOCK_TABLE[4*(a-1)+3];default:return void 0}},k.prototype={get:function(a){var b=Math.floor(a/8);return 1==(1&this.buffer[b]>>>7-a%8)},put:function(a,b){for(var c=0;b>c;c++)this.putBit(1==(1&a>>>b-c-1))},getLengthInBits:function(){return this.length},putBit:function(a){var b=Math.floor(this.length/8);this.buffer.length<=b&&this.buffer.push(0),a&&(this.buffer[b]|=128>>>this.length%8),this.length++}};var l=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]],o=function(){var a=function(a,b){this._el=a,this._htOption=b};return a.prototype.draw=function(a){function g(a,b){var c=document.createElementNS("http://www.w3.org/2000/svg",a);for(var d in b)b.hasOwnProperty(d)&&c.setAttribute(d,b[d]);return c}var b=this._htOption,c=this._el,d=a.getModuleCount();Math.floor(b.width/d),Math.floor(b.height/d),this.clear();var h=g("svg",{viewBox:"0 0 "+String(d)+" "+String(d),width:"100%",height:"100%",fill:b.colorLight});h.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink"),c.appendChild(h),h.appendChild(g("rect",{fill:b.colorDark,width:"1",height:"1",id:"template"}));for(var i=0;d>i;i++)for(var j=0;d>j;j++)if(a.isDark(i,j)){var k=g("use",{x:String(i),y:String(j)});k.setAttributeNS("http://www.w3.org/1999/xlink","href","#template"),h.appendChild(k)}},a.prototype.clear=function(){for(;this._el.hasChildNodes();)this._el.removeChild(this._el.lastChild)},a}(),p="svg"===document.documentElement.tagName.toLowerCase(),q=p?o:m()?function(){function a(){this._elImage.src=this._elCanvas.toDataURL("image/png"),this._elImage.style.display="block",this._elCanvas.style.display="none"}function d(a,b){var c=this;if(c._fFail=b,c._fSuccess=a,null===c._bSupportDataURI){var d=document.createElement("img"),e=function(){c._bSupportDataURI=!1,c._fFail&&_fFail.call(c)},f=function(){c._bSupportDataURI=!0,c._fSuccess&&c._fSuccess.call(c)};return d.onabort=e,d.onerror=e,d.onload=f,d.src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",void 0}c._bSupportDataURI===!0&&c._fSuccess?c._fSuccess.call(c):c._bSupportDataURI===!1&&c._fFail&&c._fFail.call(c)}if(this._android&&this._android<=2.1){var b=1/window.devicePixelRatio,c=CanvasRenderingContext2D.prototype.drawImage;CanvasRenderingContext2D.prototype.drawImage=function(a,d,e,f,g,h,i,j){if("nodeName"in a&&/img/i.test(a.nodeName))for(var l=arguments.length-1;l>=1;l--)arguments[l]=arguments[l]*b;else"undefined"==typeof j&&(arguments[1]*=b,arguments[2]*=b,arguments[3]*=b,arguments[4]*=b);c.apply(this,arguments)}}var e=function(a,b){this._bIsPainted=!1,this._android=n(),this._htOption=b,this._elCanvas=document.createElement("canvas"),this._elCanvas.width=b.width,this._elCanvas.height=b.height,a.appendChild(this._elCanvas),this._el=a,this._oContext=this._elCanvas.getContext("2d"),this._bIsPainted=!1,this._elImage=document.createElement("img"),this._elImage.style.display="none",this._el.appendChild(this._elImage),this._bSupportDataURI=null};return e.prototype.draw=function(a){var b=this._elImage,c=this._oContext,d=this._htOption,e=a.getModuleCount(),f=d.width/e,g=d.height/e,h=Math.round(f),i=Math.round(g);b.style.display="none",this.clear();for(var j=0;e>j;j++)for(var k=0;e>k;k++){var l=a.isDark(j,k),m=k*f,n=j*g;c.strokeStyle=l?d.colorDark:d.colorLight,c.lineWidth=1,c.fillStyle=l?d.colorDark:d.colorLight,c.fillRect(m,n,f,g),c.strokeRect(Math.floor(m)+.5,Math.floor(n)+.5,h,i),c.strokeRect(Math.ceil(m)-.5,Math.ceil(n)-.5,h,i)}this._bIsPainted=!0},e.prototype.makeImage=function(){this._bIsPainted&&d.call(this,a)},e.prototype.isPainted=function(){return this._bIsPainted},e.prototype.clear=function(){this._oContext.clearRect(0,0,this._elCanvas.width,this._elCanvas.height),this._bIsPainted=!1},e.prototype.round=function(a){return a?Math.floor(1e3*a)/1e3:a},e}():function(){var a=function(a,b){this._el=a,this._htOption=b};return a.prototype.draw=function(a){for(var b=this._htOption,c=this._el,d=a.getModuleCount(),e=Math.floor(b.width/d),f=Math.floor(b.height/d),g=['<table style="border:0;border-collapse:collapse;">'],h=0;d>h;h++){g.push("<tr>");for(var i=0;d>i;i++)g.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:'+e+"px;height:"+f+"px;background-color:"+(a.isDark(h,i)?b.colorDark:b.colorLight)+';"></td>');g.push("</tr>")}g.push("</table>"),c.innerHTML=g.join("");var j=c.childNodes[0],k=(b.width-j.offsetWidth)/2,l=(b.height-j.offsetHeight)/2;k>0&&l>0&&(j.style.margin=l+"px "+k+"px")},a.prototype.clear=function(){this._el.innerHTML=""},a}();QRCode=function(a,b){if(this._htOption={width:256,height:256,typeNumber:4,colorDark:"#000000",colorLight:"#ffffff",correctLevel:d.H},"string"==typeof b&&(b={text:b}),b)for(var c in b)this._htOption[c]=b[c];"string"==typeof a&&(a=document.getElementById(a)),this._android=n(),this._el=a,this._oQRCode=null,this._oDrawing=new q(this._el,this._htOption),this._htOption.text&&this.makeCode(this._htOption.text)},QRCode.prototype.makeCode=function(a){this._oQRCode=new b(r(a,this._htOption.correctLevel),this._htOption.correctLevel),this._oQRCode.addData(a),this._oQRCode.make(),this._el.title=a,this._oDrawing.draw(this._oQRCode),this.makeImage()},QRCode.prototype.makeImage=function(){"function"==typeof this._oDrawing.makeImage&&(!this._android||this._android>=3)&&this._oDrawing.makeImage()},QRCode.prototype.clear=function(){this._oDrawing.clear()},QRCode.CorrectLevel=d}();

// ==========================================================================
// 2. PAYMENT INTEGRATION CONTROLLER FOR BROPRO
// ==========================================================================
const CashfreePayment = {
    // Configuration
    config: {
        mode: 'production',
        upiId: 'bropro@ptaxis', // Destination UPI ID
        merchantName: 'BroPro Premium',
        whatsappNumber: '919810441585' // WhatsApp contact number (format without +)
    },

    /**
     * Load client-side QR Code library dynamically (now acts as instantaneous resolver
     * since the library code is bundled at the top)
     * @private
     */
    _loadQRScript() {
        return Promise.resolve();
    },

    /**
     * Records a pending subscription in Firestore so that the admin dashboard matches
     * the WhatsApp request instantly.
     * @private
     */
    async _recordPendingTransaction(params) {
        if (window.firebase && firebase.firestore) {
            try {
                const currentUser = firebase.auth().currentUser;
                if (!currentUser) {
                    console.warn('⚠️ User not authenticated. Skipping database registration.');
                    return;
                }

                const db = firebase.firestore();
                await db.collection('premiumSubscriptions').doc(params.orderId).set({
                    orderId: params.orderId,
                    customerEmail: params.customerEmail,
                    customerName: params.customerName,
                    orderAmount: params.amount,
                    promoCode: params.promoCode || null,
                    plan: params.plan,
                    paymentStatus: 'PENDING_VERIFICATION',
                    premium: false,
                    source: 'upi_screenshot_flow',
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    userId: currentUser.uid,
                    synced: false
                });
                console.log('✅ Pending subscription recorded to Firestore:', params.orderId);
            } catch (err) {
                console.warn('⚠️ Could not record pending subscription to Firestore:', err.message);
            }
        } else {
            console.warn('⚠️ Firebase SDK not available. Skipping database registration.');
        }
    },

    /**
     * Initiate UPI Payment Flow
     * @param {Object} userDetails - { name, email, phone, id, amount, plan, promoCode }
     */
    async initiatePayment(userDetails) {
        try {
            console.log('🚀 Initiating UPI QR Payment...', userDetails);

            // 1. Validate mandatory user details
            if (!userDetails.email) {
                throw new Error('User email is required to proceed.');
            }

            const amount = userDetails.amount || 1999;
            const plan = userDetails.plan || 'yearly';
            const customerId = userDetails.id || 'cust_' + Date.now();
            const customerName = userDetails.name || 'BroPro User';
            const orderId = `order_${Date.now()}_${customerId.substring(0, 5)}`;
            const userEmail = userDetails.email.trim().toLowerCase();
            const promoCode = userDetails.promoCode || null;

            // 2. Build direct UPI links
            const basePayload = `pa=${encodeURIComponent(this.config.upiId)}&pn=${encodeURIComponent(this.config.merchantName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(orderId)}`;
            
            const upiLink = `upi://pay?${basePayload}`;
            const gpayLink = `tez://upi/pay?${basePayload}`;
            const phonepeLink = `phonepe://pay?${basePayload}`;
            const paytmLink = `paytmmp://pay?${basePayload}`;

            // 3. Build WhatsApp redirect link with prefilled text message
            const waTextMessage = `Hello BroPro Support,\n\nI have successfully paid for BroPro Premium.\n\n📧 Registered Email: ${userEmail}\n📋 Subscription Plan: ${plan.toUpperCase()} (₹${amount})\n🆔 Order Reference: ${orderId}\n\n[Please attach the screenshot of the payment before sending]`;
            const waLink = `https://wa.me/${this.config.whatsappNumber}?text=${encodeURIComponent(waTextMessage)}`;

            // 4. Inject CSS styles
            this._injectStyles();

            // 5. Create and show the modal
            this._showModal({
                orderId,
                amount,
                plan,
                customerId,
                customerName,
                customerEmail: userEmail,
                promoCode,
                upiLink,
                gpayLink,
                phonepeLink,
                paytmLink,
                waLink
            });

        } catch (error) {
            console.error('Payment Flow Error:', error);
            alert('Payment initialization failed: ' + error.message);
        }
    },

    /**
     * Inject CSS styles for the payment modal
     * @private
     */
    _injectStyles() {
        if (document.getElementById('upi-payment-styles')) return;

        const style = document.createElement('style');
        style.id = 'upi-payment-styles';
        style.textContent = `
            #upi-payment-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(10, 10, 18, 0.85);
                backdrop-filter: blur(15px);
                -webkit-backdrop-filter: blur(15px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 100000;
                opacity: 0;
                transition: opacity 0.3s ease;
                font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
                color: #e2e8f0;
            }
            #upi-payment-modal.active {
                opacity: 1;
            }
            .upi-modal-card {
                background: rgba(25, 25, 45, 0.95);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 28px;
                width: 92%;
                max-width: 440px;
                padding: 2.2rem;
                box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
                position: relative;
                transform: translateY(20px);
                transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                text-align: center;
                box-sizing: border-box;
            }
            #upi-payment-modal.active .upi-modal-card {
                transform: translateY(0);
            }
            .upi-close-btn {
                position: absolute;
                top: 1.25rem;
                right: 1.25rem;
                background: rgba(255, 255, 255, 0.05);
                border: none;
                color: #94a3b8;
                font-size: 1.2rem;
                cursor: pointer;
                width: 32px;
                height: 32px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
            }
            .upi-close-btn:hover {
                background: rgba(239, 68, 68, 0.15);
                color: #ef4444;
            }
            .upi-modal-title {
                font-size: 1.6rem;
                font-weight: 700;
                color: #fff;
                margin: 0;
                background: linear-gradient(135deg, #fff 60%, #cbd5e1 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .upi-modal-subtitle {
                font-size: 0.9rem;
                color: #94a3b8;
                margin: 0.3rem 0 1.3rem;
            }
            .upi-amount-box {
                background: rgba(34, 197, 94, 0.08);
                border: 1px solid rgba(34, 197, 94, 0.15);
                border-radius: 16px;
                padding: 0.85rem;
                font-size: 1.35rem;
                font-weight: 700;
                color: #22c55e;
                margin-bottom: 1.3rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .upi-amount-label {
                font-size: 0.95rem;
                color: #a7f3d0;
                font-weight: 500;
            }
            .upi-qr-wrapper {
                background: #fff;
                padding: 14px;
                border-radius: 20px;
                display: inline-block;
                margin-bottom: 1.3rem;
                box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
                width: 228px;
                height: 228px;
                box-sizing: border-box;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            .upi-qr-wrapper:hover {
                transform: scale(1.02);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.45);
            }
            #upi-qr-container img, #upi-qr-container canvas {
                width: 200px !important;
                height: 200px !important;
                border-radius: 8px;
                margin: 0 auto !important;
            }
            .upi-apps-container {
                display: flex;
                justify-content: space-between;
                gap: 12px;
                margin-bottom: 1.3rem;
            }
            .upi-app-btn {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 16px;
                padding: 0.85rem 0.5rem;
                color: #fff;
                text-decoration: none;
                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                cursor: pointer;
            }
            .upi-app-btn:hover {
                transform: translateY(-3px);
                background: rgba(255, 255, 255, 0.07);
                border-color: rgba(255, 255, 255, 0.15);
            }
            .upi-app-icon-wrapper {
                width: 40px;
                height: 40px;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 8px;
                box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                transition: transform 0.2s;
            }
            .upi-app-btn:hover .upi-app-icon-wrapper {
                transform: scale(1.08);
            }
            .upi-app-icon-wrapper svg {
                width: 22px;
                height: 22px;
            }
            .upi-app-btn.phonepe .upi-app-icon-wrapper {
                background: #5f259f;
                box-shadow: 0 4px 12px rgba(95, 37, 159, 0.3);
            }
            .upi-app-btn.gpay .upi-app-icon-wrapper {
                background: #1a73e8;
                box-shadow: 0 4px 12px rgba(26, 115, 232, 0.3);
            }
            .upi-app-btn.paytm .upi-app-icon-wrapper {
                background: #00b9f2;
                box-shadow: 0 4px 12px rgba(0, 185, 242, 0.3);
            }
            .upi-app-name {
                font-size: 0.85rem;
                font-weight: 600;
                color: #cbd5e1;
            }
            .upi-app-btn:hover .upi-app-name {
                color: #fff;
            }
            .upi-divider {
                display: flex;
                align-items: center;
                text-align: center;
                color: #4b5563;
                margin-bottom: 1.1rem;
                font-size: 0.8rem;
                text-transform: uppercase;
                letter-spacing: 0.1em;
            }
            .upi-divider::before, .upi-divider::after {
                content: '';
                flex: 1;
                border-bottom: 1px solid rgba(255,255,255,0.06);
            }
            .upi-divider:not(:empty)::before {
                margin-right: .5em;
            }
            .upi-divider:not(:empty)::after {
                margin-left: .5em;
            }
            .upi-wa-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                background: linear-gradient(135deg, #25d366, #128c7e);
                color: #fff;
                text-decoration: none;
                font-weight: 700;
                padding: 0.95rem;
                border-radius: 18px;
                margin-bottom: 1.1rem;
                box-shadow: 0 8px 22px rgba(37, 211, 102, 0.3);
                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                font-size: 1.02rem;
                border: none;
                width: 100%;
                box-sizing: border-box;
                cursor: pointer;
            }
            .upi-wa-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 12px 26px rgba(37, 211, 102, 0.45);
                filter: brightness(1.05);
            }
            .upi-wa-btn svg {
                flex-shrink: 0;
            }
            .upi-note-box {
                background: rgba(255, 255, 255, 0.02);
                border: 1px dashed rgba(255, 255, 255, 0.08);
                border-radius: 16px;
                padding: 0.95rem;
                font-size: 0.85rem;
                line-height: 1.5;
                color: #94a3b8;
                text-align: left;
                margin-bottom: 0.5rem;
            }
            .upi-note-highlight {
                color: #22c55e;
                font-weight: 600;
            }
        `;
        document.head.appendChild(style);
    },

    /**
     * Show checkout modal
     * @private
     */
    _showModal(params) {
        // Remove existing modal if any
        const existing = document.getElementById('upi-payment-modal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.id = 'upi-payment-modal';
        
        modal.innerHTML = `
            <div class="upi-modal-card">
                <button class="upi-close-btn" id="upiCloseBtn">✕</button>
                <div class="upi-modal-header">
                    <h3 class="upi-modal-title">Scan & Pay via UPI</h3>
                    <p class="upi-modal-subtitle">Pay securely using any UPI app</p>
                </div>
                
                <div class="upi-amount-box">
                    <span class="upi-amount-label">Premium access (${params.plan})</span>
                    <span>₹${params.amount}</span>
                </div>
                
                <div class="upi-qr-wrapper" id="upi-qr-container">
                    <div style="width: 200px; height: 200px; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.25); font-size: 0.9rem;">
                        ⏳ Loading QR Code...
                    </div>
                </div>
                
                <div class="upi-apps-container">
                    <a href="${params.phonepeLink}" class="upi-app-btn phonepe" title="Pay with PhonePe">
                        <div class="upi-app-icon-wrapper">
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="#ffffff">
                                <title>PhonePe</title>
                                <path d="M10.206 9.941h2.949v4.692c-.402.201-.938.268-1.34.268-1.072 0-1.609-.536-1.609-1.743V9.941zm13.47 4.816c-1.523 6.449-7.985 10.442-14.433 8.919C2.794 22.154-1.199 15.691.324 9.243 1.847 2.794 8.309-1.199 14.757.324c6.449 1.523 10.442 7.985 8.919 14.433zm-6.231-5.888a.887.887 0 0 0-.871-.871h-1.609l-3.686-4.222c-.335-.402-.871-.536-1.407-.402l-1.274.401c-.201.067-.268.335-.134.469l4.021 3.82H6.386c-.201 0-.335.134-.335.335v.67c0 .469.402.871.871.871h.938v3.217c0 2.413 1.273 3.82 3.418 3.82.67 0 1.206-.067 1.877-.335v2.145c0 .603.469 1.072 1.072 1.072h.938a.432.432 0 0 0 .402-.402V9.874h1.542c.201 0 .335-.134.335-.335v-.67z"/>
                            </svg>
                        </div>
                        <span class="upi-app-name">PhonePe</span>
                    </a>
                    
                    <a href="${params.gpayLink}" class="upi-app-btn gpay" title="Pay with Google Pay">
                        <div class="upi-app-icon-wrapper">
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="#ffffff">
                                <title>Google Pay</title>
                                <path d="M3.963 7.235A3.963 3.963 0 00.422 9.419a3.963 3.963 0 000 3.559 3.963 3.963 0 003.541 2.184c1.07 0 1.97-.352 2.627-.957.748-.69 1.18-1.71 1.18-2.916a4.722 4.722 0 00-.07-.806H3.964v1.526h2.14a1.835 1.835 0 01-.79 1.205c-.356.241-.814.379-1.35.379-1.034 0-1.911-.697-2.225-1.636a2.375 2.375 0 010-1.517c.314-.94 1.191-1.636 2.225-1.636a2.152 2.152 0 011.52.594l1.132-1.13a3.808 3.808 0 00-2.652-1.033zm6.501.55v6.9h.886V11.89h1.465c.603 0 1.11-.196 1.522-.588a1.911 1.911 0 00.635-1.464 1.92 1.92 0 00-.635-1.456 2.125 2.125 0 00-1.522-.598zm2.427.85a1.156 1.156 0 01.823.365 1.176 1.176 0 010 1.686 1.171 1.171 0 01-.877.357H11.35V8.635h1.487a1.156 1.156 0 01.054 0zm4.124 1.175c-.842 0-1.477.308-1.907.925l.781.491c.288-.417.68-.626 1.175-.626a1.255 1.255 0 01.856.323 1.009 1.009 0 01.366.785v.202c-.34-.193-.774-.289-1.3-.289-.617 0-1.11.145-1.479.434-.37.288-.554.677-.554 1.165a1.476 1.476 0 00.525 1.156c.35.308.785.463 1.305.463.61 0 1.098-.27 1.465-.81h.038v.655h.848v-2.909c0-.61-.19-1.09-.568-1.44-.38-.35-.896-.525-1.551-.525zm2.263.154l1.946 4.422-1.098 2.38h.915L24 9.963h-.965l-1.368 3.391h-.02l-1.406-3.39zm-2.146 2.368c.494 0 .88.11 1.156.33 0 .372-.147.696-.44.973a1.413 1.413 0 01-.997.414 1.081 1.081 0 01-.69-.232.708.708 0 01-.293-.578c0-.257.12-.47.363-.647.24-.173.54-.26.9-.26Z"/>
                            </svg>
                        </div>
                        <span class="upi-app-name">GPay</span>
                    </a>
                    
                    <a href="${params.paytmLink}" class="upi-app-btn paytm" title="Pay with Paytm">
                        <div class="upi-app-icon-wrapper">
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="#ffffff">
                                <title>Paytm</title>
                                <path d="M15.85 8.167a.204.204 0 0 0-.04.004c-.68.19-.543 1.148-1.781 1.23h-.12a.23.23 0 0 0-.052.005h-.001a.24.24 0 0 0-.184.235v1.09c0 .134.106.241.237.241h.645v4.623c0 .132.104.238.233.238h1.058a.236.236 0 0 0 .233-.238v-4.623h.6c.13 0 .236-.107.236-.241v-1.09a.239.239 0 0 0-.236-.24h-.612V8.386a.218.218 0 0 0-.216-.22zm4.225 1.17c-.398 0-.762.15-1.042.395v-.124a.238.238 0 0 0-.234-.224h-1.07a.24.24 0 0 0-.236.242v5.92a.24.24 0 0 0 .236.242h1.07c.12 0 .217-.091.233-.209v-4.25a.393.393 0 0 1 .371-.408h.196a.41.41 0 0 1 .226.09.405.405 0 0 1 .145.319v4.074l.004.155a.24.24 0 0 0 .237.241h1.07a.239.239 0 0 0 .235-.23l-.001-4.246c0-.14.062-.266.174-.34a.419.419 0 0 1 .196-.068h.198c.23.02.37.2.37.408.005 1.396.004 2.8.004 4.224a.24.24 0 0 0 .237.241h1.07c.13 0 .236-.108.236-.241v-4.543c0-.31-.034-.442-.08-.577a1.601 1.601 0 0 0-1.51-1.09h-.015a1.58 1.58 0 0 0-1.152.5c-.291-.308-.7-.5-1.153-.5zM.232 9.4A.234.234 0 0 0 0 9.636v5.924c0 .132.096.238.216.241h1.09c.13 0 .237-.107.237-.24l.004-1.658H2.57c.857 0 1.453-.605 1.453-1.481v-1.538c0-.877-.596-1.484-1.453-1.484H.232zm9.032 0a.239.239 0 0 0-.237.241v2.47c0 .94.657 1.608 1.579 1.608h.675s.016 0 .037.004a.253.253 0 0 1 .222.253c0 .13-.096.235-.219.251l-.018.004-.303.006H9.739a.239.239 0 0 0-.236.24v1.09a.24.24 0 0 0 .236.242h1.75c.92 0 1.577-.669 1.577-1.608v-4.56a.239.239 0 0 0-.236-.24h-1.07a.239.239 0 0 0-.236.24c-.005.787 0 1.525 0 2.255a.253.253 0 0 1-.25.25h-.449a.253.253 0 0 1-.25-.255c.005-.754-.005-1.5-.005-2.25a.239.239 0 0 0-.236-.24zm-4.004.006a.232.232 0 0 0-.238.226v1.023c0 .132.113.24.252.24h1.413c.112.017.2.1.213.23v.14c-.013.124-.1.214-.207.224h-.7c-.93 0-1.594.63-1.594 1.515v1.269c0 .88.57 1.506 1.495 1.506h1.94c.348 0 .63-.27.63-.6v-4.136c0-1.004-.508-1.637-1.72-1.637zm-3.713 1.572h.678c.139 0 .25.115.25.256v.836a.253.253 0 0 1-.25.256h-.1c-.192.002-.386 0-.578 0zm4.67 1.977h.445c.139 0 .252.108.252.24v.932a.23.23 0 0 1-.014.076.25.25 0 0 1-.238.164h-.445a.247.247 0 0 1-.252-.24v-.933c0-.132.113-.239.252-.239Z"/>
                            </svg>
                        </div>
                        <span class="upi-app-name">Paytm</span>
                    </a>
                </div>
                
                <div class="upi-divider">Confirm Payment</div>
                
                <a href="${params.waLink}" target="_blank" class="upi-wa-btn" id="upiWaBtn">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="#ffffff">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.835-2.267c1.604.952 3.197 1.453 4.903 1.454 5.648 0 10.244-4.595 10.247-10.247.002-2.738-1.053-5.31-2.969-7.227C17.156 3.8 14.588 2.748 11.854 2.748 6.208 2.748 1.61 12.993c-.001 1.76.467 3.42 1.357 4.919l-.99 3.613 3.693-.969zm11.724-8.082c-.321-.161-1.902-.938-2.198-1.045-.296-.108-.512-.161-.727.162-.215.324-.834 1.045-1.022 1.261-.188.216-.376.243-.697.082-.32-.16-1.353-.499-2.577-1.59-1.002-.894-1.616-1.98-1.812-2.313-.195-.333-.021-.513.14-.674.144-.144.321-.377.482-.566.162-.189.216-.324.324-.54.108-.216.054-.405-.027-.567-.08-.162-.726-1.751-.996-2.4-.263-.629-.53-.54-.727-.55l-.621-.01c-.216 0-.566.08-.862.405-.296.324-1.131 1.107-1.131 2.7 0 1.593 1.159 3.13 1.32 3.346.162.216 2.28 3.481 5.522 4.882.771.33 1.373.528 1.843.678.775.246 1.48.211 2.037.129.622-.092 1.902-.778 2.172-1.492.269-.715.269-1.32.188-1.453-.08-.13-.296-.211-.617-.373z"/>
                    </svg>
                    Send Screenshot to +91 9810441585
                </a>
                
                <div class="upi-note-box">
                    Please click the green button above to share your <span class="upi-note-highlight">Payment Screenshot</span> and <span class="upi-note-highlight">Registered Email ID</span> on WhatsApp to <span class="upi-note-highlight">+91 9810441585</span>.<br>
                    <br>
                    Your subscription will be active within <span class="upi-note-highlight">a few hours</span> of the payment.
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Fade in
        setTimeout(() => modal.classList.add('active'), 10);

        // Render QR Code client-side using locally hosted qrcode.min.js
        const qrContainer = modal.querySelector('#upi-qr-container');
        if (window.QRCode) {
            try {
                qrContainer.innerHTML = ''; // clear placeholder
                
                new QRCode(qrContainer, {
                    text: params.upiLink,
                    width: 200,
                    height: 200,
                    colorDark: '#0b0b14',
                    colorLight: '#ffffff',
                    correctLevel: QRCode.CorrectLevel.M
                });
                console.log('✅ QR Code generated client-side successfully');
            } catch (qrError) {
                console.error('Client-side QR generation failed:', qrError);
                this._injectAPIFallback(qrContainer, params.upiLink);
            }
        } else {
            console.warn('QRCode library not found on window. Using API fallback.');
            this._injectAPIFallback(qrContainer, params.upiLink);
        }

        // Bind events
        const closeBtn = modal.querySelector('#upiCloseBtn');
        const waBtn = modal.querySelector('#upiWaBtn');

        // Dismiss modal
        const dismiss = () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        };

        closeBtn.addEventListener('click', dismiss);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) dismiss();
        });

        // Record pending transaction and dismiss shortly after WhatsApp link is clicked
        waBtn.addEventListener('click', async () => {
            await this._recordPendingTransaction(params);
            setTimeout(dismiss, 1500);
        });
    },

    /**
     * Fallback to secure API if local library isn't fully ready
     * @private
     */
    _injectAPIFallback(container, upiLink) {
        container.innerHTML = `
            <img class="upi-qr-image" 
                 src="https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${encodeURIComponent(upiLink)}" 
                 onerror="this.onerror=null; this.src='https://quickchart.io/qr?text=' + encodeURIComponent('${upiLink}') + '&size=200';" 
                 alt="Scan QR Code" 
                 style="width: 200px; height: 200px; border-radius: 8px; margin: 0 auto; display: block;">
        `;
    }
};

// Expose to window
window.CashfreePayment = CashfreePayment;

// Backwards compatibility alias for app.js
window.PayU = CashfreePayment;
