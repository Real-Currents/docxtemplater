(function(){var t,i,e;e="undefined"!=typeof global&&null!==global?global:window,i="undefined"!=typeof global&&null!==global?"node":"browser",t=t=function(){function t(){}return t.prototype.initialize=function(){return this.inForLoop=!1,this.inTag=!1,this.inDashLoop=!1,this.textInsideTag=""},t.prototype.startTag=function(){if(this.inTag===!0)throw"Tag already open with text: "+this.textInsideTag;return this.inTag=!0,this.textInsideTag="",this.bracketStart=this.currentStep},t.prototype.loopType=function(){return this.inDashLoop?"dash":this.inForLoop?"for":"simple"},t.prototype.endTag=function(){var t;if(this.inTag===!1)throw"Tag already closed";return this.inTag=!1,this.bracketEnd=this.currentStep,"#"===this.textInsideTag[0]&&"simple"===this.loopType()&&(this.inForLoop=!0,this.loopOpen={start:this.bracketStart,end:this.bracketEnd,tag:this.textInsideTag.substr(1)}),"-"===this.textInsideTag[0]&&"simple"===this.loopType()&&(this.inDashLoop=!0,t=/^-([a-zA-Z_:]+) ([a-zA-Z_:]+)$/,this.loopOpen={start:this.bracketStart,end:this.bracketEnd,tag:this.textInsideTag.replace(t,"$2"),element:this.textInsideTag.replace(t,"$1")}),"/"===this.textInsideTag[0]?this.loopClose={start:this.bracketStart,end:this.bracketEnd}:void 0},t}(),e.TemplaterState=t}).call(this);
(function(){var t,e,i,s=[].indexOf||function(t){for(var e=0,i=this.length;i>e;e++)if(e in this&&this[e]===t)return e;return-1};i="undefined"!=typeof global&&null!==global?global:window,e="undefined"!=typeof global&&null!==global?"node":"browser",t=t=function(){function t(t){this.zip=t}var e;return e=["gif","jpeg","jpg","emf","png"],t.prototype.getImageList=function(){var t,i,n,l;l=/[^.]+\.([^.]+)/,i=[];for(n in this.zip.files)t=n.replace(l,"$1"),s.call(e,t)>=0&&i.push({path:n,files:this.zip.files[n]});return i},t.prototype.setImage=function(t,e){return this.zip.files[t].data=e},t.prototype.loadImageRels=function(){var t,e,i;return e=DocUtils.decode_utf8(this.zip.files["word/_rels/document.xml.rels"].data),this.xmlDoc=DocUtils.Str2xml(e),t=function(){var t,e,s,n;for(s=this.xmlDoc.getElementsByTagName("Relationship"),n=[],t=0,e=s.length;e>t;t++)i=s[t],n.push(parseInt(i.getAttribute("Id").substr(3)));return n}.call(this),this.maxRid=t.max(),this.imageRels=[],this},t.prototype.addExtensionRels=function(t,e){var i,s,n,l,a,o,r,m,d;for(s=DocUtils.decode_utf8(this.zip.files["[Content_Types].xml"].data),r=DocUtils.Str2xml(s),i=!0,n=r.getElementsByTagName("Default"),m=0,d=n.length;d>m;m++)a=n[m],a.getAttribute("Extension")===e&&(i=!1);return i?(o=r.getElementsByTagName("Types")[0],l=r.createElement("Default"),l.namespaceURI=null,l.setAttribute("ContentType",t),l.setAttribute("Extension",e),o.appendChild(l),this.zip.files["[Content_Types].xml"].data=DocUtils.encode_utf8(DocUtils.xml2Str(r))):void 0},t.prototype.addImageRels=function(t,e){var i,s,n,l;if(null!=this.zip.files["word/media/"+t])throw"file already exists";return this.maxRid++,s={name:"word/media/"+t,data:e,options:{base64:!1,binary:!0,compression:null,date:new Date,dir:!1}},this.zip.file(s.name,s.data,s.options),i=t.replace(/[^.]+\.([^.]+)/,"$1"),this.addExtensionRels("image/"+i,i),l=this.xmlDoc.getElementsByTagName("Relationships")[0],n=this.xmlDoc.createElement("Relationship"),n.namespaceURI=null,n.setAttribute("Id","rId"+this.maxRid),n.setAttribute("Type","http://schemas.openxmlformats.org/officeDocument/2006/relationships/image"),n.setAttribute("Target","media/"+t),l.appendChild(n),this.zip.files["word/_rels/document.xml.rels"].data=DocUtils.encode_utf8(DocUtils.xml2Str(this.xmlDoc)),this.maxRid},t.prototype.getImageByRid=function(t){var e,i,s,n,l,a;for(n=this.xmlDoc.getElementsByTagName("Relationship"),l=0,a=n.length;a>l;l++)if(s=n[l],e=s.getAttribute("Id"),t===e&&(i=s.getAttribute("Target"),"media/"===i.substr(0,6)))return this.zip.files["word/"+i];return null},t}(),i.ImgManager=t}).call(this);
(function(){var t,e,i;i="undefined"!=typeof global&&null!==global?global:window,e="undefined"!=typeof global&&null!==global?"node":"browser",i.DocxGen=t=function(){function t(t,e,i,n){this.Tags=null!=e?e:{},this.intelligentTagging=null!=i?i:!0,this.qrCode=null!=n?n:!1,this.finishedCallback=function(){return console.log("document ready!")},this.localImageCreator=function(t,e){var i;return i=JSZipBase64.decode("iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAIAAABvSEP3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACXSURBVDhPtY7BDYAwDAMZhCf7b8YMxeCoatOQJhWc/KGxT2zlCyaWcz8Y+X7Bs1TFVJSwIHIYyFkQufWIRVX9cNJyW1QpEo4rixaEe7JuQagAUctb7ZFYFh5MVJPBe84CVBnB42//YsZRgKjFDBVg3cI9WbRwXLktQJX8cNIiFhM1ZuTWk7PIYSBhkVcLzwIiCjCxhCjlAkBqYnqFoQQ2AAAAAElFTkSuQmCC"),e(i)},this.filesProcessed=0,this.qrCodeNumCallBack=0,this.qrCodeWaitingFor=[],null!=t&&this.load(t)}var i;return i=["word/document.xml","word/footer1.xml","word/footer2.xml","word/footer3.xml","word/header1.xml","word/header2.xml","word/header3.xml"],t.prototype.qrCodeCallBack=function(t,e){var i;return null==e&&(e=!0),e===!0?this.qrCodeWaitingFor.push(t):e===!1&&(i=this.qrCodeWaitingFor.indexOf(t),this.qrCodeWaitingFor.splice(i,1)),this.testReady()},t.prototype.testReady=function(){return 0===this.qrCodeWaitingFor.length&&this.filesProcessed===i.length?(this.ready=!0,this.finishedCallback()):void 0},t.prototype.logUndefined=function(t){return console.log("undefinedTag:"+t)},t.prototype.getImageList=function(){return this.imgManager.getImageList()},t.prototype.setImage=function(t,e){return this.imgManager.setImage(t,e)},t.prototype.load=function(t){return this.zip=new JSZip(t),this.imgManager=new ImgManager(this.zip).loadImageRels()},t.prototype.applyTags=function(t,e){var n,o,l,a,r,s;for(this.Tags=null!=t?t:this.Tags,null==e&&(e=null),l=0,r=i.length;r>l;l++)o=i[l],null==this.zip.files[o]&&this.filesProcessed++;for(a=0,s=i.length;s>a;a++)o=i[a],null!=this.zip.files[o]&&(n=new DocXTemplater(this.zip.files[o].data,{DocxGen:this,Tags:this.Tags,intelligentTagging:this.intelligentTagging,qrCodeCallback:e,localImageCreator:this.localImageCreator},this,this.Tags,this.intelligentTagging,[],{},0,e,this.localImageCreator),this.zip.files[o].data=n.applyTags().content,this.filesProcessed++);return this.testReady()},t.prototype.getTags=function(){var t,e,n,o,l,a;for(n=[],l=0,a=i.length;a>l;l++)e=i[l],null!=this.zip.files[e]&&(t=new DocXTemplater(this.zip.files[e].data,{DocxGen:this,Tags:this.Tags,intelligentTagging:this.intelligentTagging}),o=t.applyTags().usedTags,DocUtils.sizeOfObject(o)&&n.push({fileName:e,vars:o}));return n},t.prototype.setTags=function(t){return this.Tags=t,this},t.prototype.output=function(t,i){var n;return null==t&&(t=!0),null==i&&(i="output.docx"),this.calcZip(),n=this.zip.generate(),t&&("node"===e?fs.writeFile(process.cwd()+"/"+i,n,"base64",function(t){if(t)throw t;return console.log("file Saved")}):document.location.href="data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,"+n),n},t.prototype.calcZip=function(){var t,e,i;i=new JSZip;for(e in this.zip.files)t=this.zip.files[e],i.file(t.name,t.data,t.options);return this.zip=i},t.prototype.getFullText=function(t,e){var i;return null==t&&(t="word/document.xml"),null==e&&(e=""),""===e?(i=this.zip.files[t].data,this.getFullText(t,i)):new DocXTemplater(e,{DocxGen:this,Tags:this.Tags,intelligentTagging:this.intelligentTagging}).getFullText()},t.prototype.download=function(t,e,i){var n;return null==i&&(i="default.docx"),this.calcZip(),n=this.zip.generate(),Downloadify.create("downloadify",{filename:function(){return i},data:function(){return n},onCancel:function(){return alert("You have cancelled the saving of this file.")},onError:function(){return alert("You must put something in the File Contents or there will be nothing to save!")},swf:t,downloadImage:e,width:100,height:30,transparent:!0,append:!1,dataType:"base64"})},t}()}).call(this);
(function(){var e,n,t=[].slice;n="undefined"!=typeof global&&null!==global?global:window,e="undefined"!=typeof global&&null!==global?"node":"browser",n.DocUtils={},n.docX=[],n.docXData=[],DocUtils.nl2br=function(e){return(e+"").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,"$1<br>$2")},DocUtils.config={baseNodePath:"../../examples/",baseClientPath:"../examples/"},DocUtils.loadDoc=function(t,o){var r,l,i,a,c,s,u,f,g,d,p,h,m,b,y,D;if(null==o&&(o={}),p=null!=o.docx?!o.docx:!1,r=null!=o.async?o.async:!1,g=null!=o.intelligentTagging?o.intelligentTagging:!1,i=null!=o.callback?o.callback:null,l=null!=o.basePath?o.basePath:null,console.log("loading Doc:"+t),null==t)throw"path not defined";if(-1!==t.indexOf("/")?(b=t,u=b):(u=t,null===l&&(l="browser"===e?DocUtils.config.baseClientPath:DocUtils.config.baseNodePath),b=l+t),d=function(e){return n.docXData[u]=e,p===!1&&(n.docX[u]=new DocxGen(e,{},g)),null!=i&&i(!1),r===!1?n.docXData[u]:void 0},"browser"===e)D=new XMLHttpRequest,D.open("GET",b,r),D.overrideMimeType&&D.overrideMimeType("text/plain; charset=x-user-defined"),D.onreadystatechange=function(){if(4===this.readyState){if(200===this.status)return d(this.response);if(console.log("error loading doc"),null!=i)return i(!0)}},D.send();else if(f=new RegExp("(https?)","i"),f.test(t)){switch(console.log("http(s) url matched:"+t),y=url.parse(t),o={hostname:y.hostname,path:y.path,method:"GET",rejectUnauthorized:!1},s=function(e){return console.log("Error: \n"+e.message),console.log(e.stack)},m=function(e){var n;return e.setEncoding("binary"),n="",e.on("data",function(t){return console.log("Status Code "+e.statusCode),console.log("received"),n+=t}),e.on("end",function(){return console.log("receivedTotally"),d(n)}),e.on("error",function(e){return console.log("Error during HTTP request"),console.log(e.message),console.log(e.stack)})},y.protocol){case"https:":h=https.request(o,m).on("error",s);break;case"http:":h=http.request(o,m).on("error",s)}h.end()}else if(r===!0)fs.readFile(b,"binary",function(e,n){if(e){if(null!=i)return i(!0)}else if(d(n),null!=i)return i(!1)});else{console.log("loading async:"+b);try{a=fs.readFileSync(b,"binary"),d(a),null!=i&&i(!1)}catch(x){c=x,null!=i&&i(!0)}}return u},DocUtils.clone=function(e){var n,t,o;if(null==e||"object"!=typeof e)return e;if(e instanceof Date)return new Date(e.getTime());if(e instanceof RegExp)return n="",null!=e.global&&(n+="g"),null!=e.ignoreCase&&(n+="i"),null!=e.multiline&&(n+="m"),null!=e.sticky&&(n+="y"),new RegExp(e.source,n);o=new e.constructor;for(t in e)o[t]=DocUtils.clone(e[t]);return o},DocUtils.xml2Str=function(e){var n,t,o;if(void 0===e)throw"xmlNode undefined!";try{"undefined"!=typeof global&&null!==global?(n=new XMLSerializer,t=n.serializeToString(e)):t=(new XMLSerializer).serializeToString(e)}catch(r){o=r;try{t=e.xml}catch(r){o=r,console.log("Xmlserializer not supported")}}return t=t.replace(/\x20xmlns=""/g,"")},DocUtils.Str2xml=function(e){var t,o;return n.DOMParser?(t=new DOMParser,o=t.parseFromString(e,"text/xml")):(o=new ActiveXObject("Microsoft.XMLDOM"),o.async=!1,o.loadXML(e)),o},DocUtils.replaceFirstFrom=function(e,n,t,o){return e.substr(0,o)+e.substr(o).replace(n,t)},DocUtils.encode_utf8=function(e){return unescape(encodeURIComponent(e))},DocUtils.decode_utf8=function(e){return decodeURIComponent(escape(e)).replace(new RegExp(String.fromCharCode(160),"g")," ")},DocUtils.base64encode=function(e){return btoa(unescape(encodeURIComponent(e)))},DocUtils.preg_match_all=function(e,n){var o,r;return"object"!=typeof e&&(e=new RegExp(e,"g")),o=[],r=function(){var e,n,r,l,i;return e=arguments[0],r=4<=arguments.length?t.call(arguments,1,i=arguments.length-2):(i=1,[]),n=arguments[i++],l=arguments[i++],r.unshift(e),r.offset=n,o.push(r)},n.replace(e,r),o},DocUtils.sizeOfObject=function(e){var n,t,o;o=0,t=0;for(n in e)o++;return o},Array.prototype.max=function(){return Math.max.apply(null,this)},Array.prototype.min=function(){return Math.min.apply(null,this)}}).call(this);
(function(){var e,t,o;o="undefined"!=typeof global&&null!==global?global:window,t="undefined"!=typeof global&&null!==global?"node":"browser",e=e=function(){function e(e){this.xmlTemplater=e,this.imgMatches=[]}return e.prototype.findImages=function(){return this.imgMatches=DocUtils.preg_match_all(/<w:drawing[^>]*>.*?<\/w:drawing>/g,this.xmlTemplater.content),this},e.prototype.replaceImages=function(){var e,o,m,l,a,r,n,s,i,c,d,g,p,h,x,f,u,w;for(console.log("replacing Images ..."),s=[],e=function(e){return console.log("removing qrcode"),console.log("setting image:word/media/"+e.imgName),e.xmlTemplater.numQrCode--,e.xmlTemplater.DocxGen.setImage("word/media/"+e.imgName,e.data),e.xmlTemplater.DocxGen.qrCodeCallBack(e.num,!1)},u=this.imgMatches,w=[],p=x=0,f=u.length;f>x;p=++x)if(a=u[p],h=DocUtils.Str2xml('<?xml version="1.0" ?><w:document mc:Ignorable="w14 wp14" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk" xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape">'+a[0]+"</w:document>"),this.xmlTemplater.DocxGen.qrCode)g=h.getElementsByTagNameNS("*","blip")[0],void 0===g&&(console.log("tagRid not defined, trying alternate method"),g=h.getElementsByTagName("a:blip")[0]),void 0!==g?(i=g.getAttribute("r:embed"),n=this.xmlTemplater.DocxGen.imgManager.getImageByRid(i),null!==n?(d=h.getElementsByTagNameNS("*","docPr")[0],void 0===d&&(console.log("tag not defined, trying alternate method"),d=h.getElementsByTagName("wp:docPr")[0]),void 0!==d?"Copie_"!==d.getAttribute("name").substr(0,6)?(l=("Copie_"+this.xmlTemplater.imageId+".png").replace(/\x20/,""),this.xmlTemplater.DocxGen.qrCodeNumCallBack++,this.xmlTemplater.DocxGen.qrCodeCallBack(this.xmlTemplater.DocxGen.qrCodeNumCallBack,!0),r=this.xmlTemplater.DocxGen.imgManager.addImageRels(l,""),this.xmlTemplater.imageId++,this.xmlTemplater.DocxGen.setImage("word/media/"+l,n.data),"browser"===t&&(s[p]=new DocxQrCode(n.data,this.xmlTemplater,l,this.xmlTemplater.DocxGen.qrCodeNumCallBack)),d.setAttribute("name",""+l),g.setAttribute("r:embed","rId"+r),console.log("tagrId:"+g.getAttribute("r:embed")),o=h.getElementsByTagNameNS("*","drawing")[0],void 0===o&&(console.log("imagetag not defined, trying alternate method"),o=h.getElementsByTagName("w:drawing")[0]),c=DocUtils.xml2Str(o),this.xmlTemplater.content=this.xmlTemplater.content.replace(a[0],c),this.xmlTemplater.numQrCode++,w.push("browser"===t?s[p].decode(e):/\.png$/.test(n.name)?function(t){return function(o){var m,l,a,r,i;return console.log(n.name),m=JSZipBase64.encode(n.data),l=new Buffer(m,"base64"),i=new PNG(l),r=function(m){var l;try{return i.decoded=m,s[p]=new DocxQrCode(i,t.xmlTemplater,o,t.xmlTemplater.DocxGen.qrCodeNumCallBack),s[p].decode(e)}catch(a){return l=a,console.log(l),t.xmlTemplater.DocxGen.qrCodeCallBack(t.xmlTemplater.DocxGen.qrCodeNumCallBack,!1)}},a=i.decode(r)}}(this)(l):this.xmlTemplater.DocxGen.qrCodeCallBack(this.xmlTemplater.DocxGen.qrCodeNumCallBack,!1))):w.push(void 0):w.push(void 0)):w.push(void 0)):w.push(void 0);else if(null!=this.xmlTemplater.currentScope.img)if(null!=this.xmlTemplater.currentScope.img[p]){if(l=this.xmlTemplater.currentScope.img[p].name,m=this.xmlTemplater.currentScope.img[p].data,null==this.xmlTemplater.DocxGen)throw"DocxGen not defined";r=this.xmlTemplater.DocxGen.imgManager.addImageRels(l,m),d=h.getElementsByTagNameNS("*","docPr")[0],void 0===d&&(console.log("tag not defined, trying alternate method"),d=h.getElementsByTagName("wp:docPr")[0]),void 0!==d?(this.xmlTemplater.imageId++,d.setAttribute("id",this.xmlTemplater.imageId),d.setAttribute("name",""+l),g=h.getElementsByTagNameNS("*","blip")[0],void 0===g&&(console.log("tagRid not defined, trying alternate method"),g=h.getElementsByTagName("a:blip")[0]),void 0!==g?(g.setAttribute("r:embed","rId"+r),o=h.getElementsByTagNameNS("*","drawing")[0],void 0===o&&(console.log("imagetag not defined, trying alternate method"),o=h.getElementsByTagName("w:drawing")[0]),w.push(this.xmlTemplater.content=this.xmlTemplater.content.replace(a[0],DocUtils.xml2Str(o)))):w.push(void 0)):w.push(void 0)}else w.push(void 0);else w.push(void 0);return w},e}(),o.ImgReplacer=e}).call(this);
(function(){var t,e,l;l="undefined"!=typeof global&&null!==global?global:window,e="undefined"!=typeof global&&null!==global?"node":"browser",t=t=function(){function t(t,e,l,a,r){this.xmlTemplater=e,this.imgName=null!=l?l:"",this.num=a,this.callback=r,this.data=t,this.base64Data=JSZipBase64.encode(this.data),this.ready=!1,this.result=null}return t.prototype.decode=function(t){var l;return this.callback=t,l=this,console.log("qrcode"),this.qr=new QrCode,this.qr.callback=function(){var t;return l.ready=!0,l.result=this.result,console.log("result:"+l.result),t=new l.xmlTemplater.currentClass(this.result,l.xmlTemplater.toJson()),t.applyTags(),l.result=t.content,l.searchImage()},"browser"===e?this.qr.decode("data:image/png;base64,"+this.base64Data):this.qr.decode(this.data,this.data.decoded)},t.prototype.searchImage=function(){var t,e,l;if("gen:"===this.result.substr(0,4))return t=function(e){return function(l){return e.data=l,e.callback(e,e.imgName,e.num),e.xmlTemplater.DocxGen.localImageCreator(e.result,t)}}(this);if(null===this.result||void 0===this.result||"error decoding QR Code"===this.result.substr(0,22))return this.callback(this,this.imgName,this.num);l=function(t){return function(e){return null==e&&(e=!1),e?(console.log("file image loading failed!"),t.callback(t,t.imgName,t.num)):(t.data=docXData[t.result],t.callback(t,t.imgName,t.num))}}(this);try{return DocUtils.loadDoc(this.result,{docx:!1,callback:l,async:!1})}catch(a){return e=a,console.log(e)}},t}(),l.DocxQrCode=t}).call(this);
(function(){var t,e,a,s=[].slice;a="undefined"!=typeof global&&null!==global?global:window,e="undefined"!=typeof global&&null!==global?"node":"browser",t=t=function(){function t(e,a){null==e&&(e=""),null==a&&(a={}),this.tagX="",this.currentClass=t,this.Tags=null!=a.Tags?a.Tags:{},this.DocxGen=null!=a.DocxGen?a.DocxGen:null,this.intelligentTagging=null!=a.intelligentTagging?a.intelligentTagging:!1,this.scopePath=null!=a.scopePath?a.scopePath:[],this.usedTags=null!=a.usedTags?a.usedTags:{},this.imageId=null!=a.imageId?a.imageId:0,this.currentScope=this.Tags,this.templaterState=new TemplaterState}return t.prototype.load=function(t){var e;return this.content=t,this.matches=this._getFullTextMatchesFromData(),this.charactersAdded=function(){var t,a,s;for(s=[],e=t=0,a=this.matches.length;a>=0?a>t:t>a;e=a>=0?++t:--t)s.push(0);return s}.call(this),this.handleRecursiveCase()},t.prototype.getValueFromScope=function(t,e){var a;if(this.useTag(t),null!=e[t]?a=DocUtils.encode_utf8(e[t]):(a="undefined",this.DocxGen.logUndefined(t,e)),-1!==a.indexOf("{")||-1!==a.indexOf("}"))throw"You can't enter { or  } inside the content of a variable";return a},t.prototype.calcScopeText=function(t,e,a){var s,i,n,r,h,l,o,c,p,g;for(null==e&&(e=0),null==a&&(a=t.length-1),c=DocUtils.preg_match_all("<(/?[^/> ]+)([^>]*)>",t.substr(e,a)),l=[],s=p=0,g=c.length;g>p;s=++p)o=c[s],"/"===o[1][0]?(r=!1,l.length>0&&(h=l[l.length-1],n=h.tag.substr(1,h.tag.length-2),i=o[1].substr(1),n===i&&(r=!0)),r?l.pop():l.push({tag:"<"+o[1]+">",offset:o.offset})):"/"===o[2][o[2].length-1]||l.push({tag:"<"+o[1]+">",offset:o.offset});return l},t.prototype.calcScopeDifference=function(t,e,a){var s;for(null==e&&(e=0),null==a&&(a=t.length-1),s=this.calcScopeText(t,e,a);;){if(s.length<=1)break;if(s[0].tag.substr(2)!==s[s.length-1].tag.substr(1))break;s.pop(),s.shift()}return s},t.prototype.getFullText=function(){var t,e;return this.matches=this._getFullTextMatchesFromData(),e=function(){var e,a,s,i;for(s=this.matches,i=[],e=0,a=s.length;a>e;e++)t=s[e],i.push(t[2]);return i}.call(this),DocUtils.decode_utf8(e.join(""))},t.prototype._getFullTextMatchesFromData=function(){return this.matches=DocUtils.preg_match_all("(<"+this.tagX+"[^>]*>)([^<>]*)?</"+this.tagX+">",this.content)},t.prototype.calcInnerTextScope=function(t,e,a,s){var i,n;if(i=t.indexOf("</"+s+">",a),-1===i)throw"can't find endTag "+i;if(i+=("</"+s+">").length,n=Math.max(t.lastIndexOf("<"+s+">",e),t.lastIndexOf("<"+s+" ",e)),-1===n)throw"can't find startTag";return{text:t.substr(n,i-n),startTag:n,endTag:i}},t.prototype.findOuterTagsContent=function(){var t,e;return e=this.calcStartTag(this.templaterState.loopOpen),t=this.calcEndTag(this.templaterState.loopClose),{content:this.content.substr(e,t-e),start:e,end:t}},t.prototype.findInnerTagsContent=function(){var t,e;return e=this.calcEndTag(this.templaterState.loopOpen),t=this.calcStartTag(this.templaterState.loopClose),{content:this.content.substr(e,t-e),start:e,end:t}},t.prototype.calcStartTag=function(t){return this.matches[t.start.i].offset+this.matches[t.start.i][1].length+this.charactersAdded[t.start.i]+t.start.j},t.prototype.calcEndTag=function(t){return this.matches[t.end.i].offset+this.matches[t.end.i][1].length+this.charactersAdded[t.end.i]+t.end.j+1},t.prototype.toJson=function(){return{Tags:DocUtils.clone(this.Tags),DocxGen:this.DocxGen,intelligentTagging:DocUtils.clone(this.intelligentTagging),scopePath:DocUtils.clone(this.scopePath),usedTags:this.usedTags,localImageCreator:this.localImageCreator,imageId:this.imageId}},t.prototype.forLoop=function(t,e){var a,s,i,n,r,h,l,o,c,p;if(null==t&&(t=""),null==e&&(e=""),""===t&&""===e&&(e=this.findOuterTagsContent().content,t=this.findInnerTagsContent().content,"{"!==e[0]||-1===e.indexOf("{")||-1===e.indexOf("/")||-1===e.indexOf("}")||-1===e.indexOf("#")))throw"no {,#,/ or } found in B: "+e;if(null!=this.currentScope[this.templaterState.loopOpen.tag]){if("object"==typeof this.currentScope[this.templaterState.loopOpen.tag]&&(h=this.currentScope[this.templaterState.loopOpen.tag]),"true"===this.currentScope[this.templaterState.loopOpen.tag]&&(h=!0),"false"===this.currentScope[this.templaterState.loopOpen.tag]&&(h=!1),s="","object"==typeof h)for(p=this.currentScope[this.templaterState.loopOpen.tag],a=o=0,c=p.length;c>o;a=++o)if(r=p[a],n=this.toJson(),n.Tags=r,n.scopePath=n.scopePath.concat(this.templaterState.loopOpen.tag),l=new this.currentClass(t,n),l.applyTags(),this.imageId=l.imageId,s+=l.content,-1!==l.getFullText().indexOf("{"))throw"they shouln't be a { in replaced file: "+l.getFullText()+" (1)";if(h===!0&&(n=this.toJson(),n.Tags=this.currentScope,n.scopePath=n.scopePath.concat(this.templaterState.loopOpen.tag),l=new this.currentClass(t,n),l.applyTags(),this.imageId=l.imageId,s+=l.content,-1!==l.getFullText().indexOf("{")))throw"they shouln't be a { in replaced file: "+l.getFullText()+" (1)";this.content=this.content.replace(e,s)}else n=this.toJson(),n.Tags={},n.scopePath=n.scopePath.concat(this.templaterState.loopOpen.tag),l=new this.currentClass(t,n),l.applyTags(),this.imageId=l.imageId,this.content=this.content.replace(e,"");if(n=this.toJson(),i=new this.currentClass(this.content,n),i.applyTags(),this.imageId=i.imageId,-1!==i.getFullText().indexOf("{"))throw"they shouln't be a { in replaced file: "+i.getFullText()+" (3)";return this.content=i.content,this},t.prototype.dashLoop=function(t,e){var a,s,i,n,r,h,l,o,c,p,g;for(null==e&&(e=!1),p=this.findOuterTagsContent(),i=p.content,l=p.start,r=p.end,h=this.calcInnerTextScope(this.content,l,r,t),o=c=0,g=this.matches.length;g>=0?g>=c:c>=g;o=g>=0?++c:--c)this.charactersAdded[o]-=h.startTag;if(s=h.text,-1===this.content.indexOf(s))throw"couln't find B in @content";if(a=s,n=a,this.templaterState.bracketEnd={i:this.templaterState.loopOpen.end.i,j:this.templaterState.loopOpen.end.j},this.templaterState.bracketStart={i:this.templaterState.loopOpen.start.i,j:this.templaterState.loopOpen.start.j},e===!1&&(this.templaterState.textInsideTag="-"+this.templaterState.loopOpen.element+" "+this.templaterState.loopOpen.tag),e===!0&&(this.templaterState.textInsideTag="#"+this.templaterState.loopOpen.tag),a=this.replaceTagByValue("",a),n===a)throw"A should have changed after deleting the opening tag";if(n=a,this.templaterState.textInsideTag="/"+this.templaterState.loopOpen.tag,this.templaterState.bracketEnd={i:this.templaterState.loopClose.end.i,j:this.templaterState.loopClose.end.j},this.templaterState.bracketStart={i:this.templaterState.loopClose.start.i,j:this.templaterState.loopClose.start.j},a=this.replaceTagByValue("",a),n===a)throw"A should have changed after deleting the opening tag";return this.forLoop(a,s)},t.prototype.replaceXmlTag=function(t,e,a,s,i){var n,r,h;if(null==s&&(s=!1),null==i&&(i=!1),this.matches[e][2]=a,h=this.matches[e].offset+this.charactersAdded[e],r=i===!0?a:s===!0?"<"+this.tagX+' xml:space="preserve">'+a+"</"+this.tagX+">":this.matches[e][1]+a+("</"+this.tagX+">"),this.charactersAdded[e+1]+=r.length-this.matches[e][0].length,-1===t.indexOf(this.matches[e][0]))throw"content "+this.matches[e][0]+" not found in content";if(n=t,t=DocUtils.replaceFirstFrom(t,this.matches[e][0],r,h),this.matches[e][0]=r,n===t)throw"offset problem0: didnt changed the value (should have changed from "+this.matches[this.templaterState.bracketStart.i][0]+" to "+r;return t},t.prototype.replaceTagByValue=function(t,e){var a,s,i,n,r,h,l,o,c,p,g,u,m,d;if(null==e&&(e=this.content),-1===this.matches[this.templaterState.bracketEnd.i][2].indexOf("}"))throw"no closing bracket at @templaterState.bracketEnd.i "+this.matches[this.templaterState.bracketEnd.i][2];if(-1===this.matches[this.templaterState.bracketStart.i][2].indexOf("{"))throw"no opening bracket at @templaterState.bracketStart.i "+this.matches[this.templaterState.bracketStart.i][2];if(a=e,this.templaterState.bracketEnd.i===this.templaterState.bracketStart.i)null!=this.matches[this.templaterState.bracketStart.i].first?(s=this.matches[this.templaterState.bracketStart.i][2].replace("{"+this.templaterState.textInsideTag+"}",t),e=this.replaceXmlTag(e,this.templaterState.bracketStart.i,s,!0,!0)):null!=this.matches[this.templaterState.bracketStart.i].last?(s=this.matches[this.templaterState.bracketStart.i][0].replace("{"+this.templaterState.textInsideTag+"}",t),e=this.replaceXmlTag(e,this.templaterState.bracketStart.i,s,!0,!0)):(s=this.matches[this.templaterState.bracketStart.i][2].replace("{"+this.templaterState.textInsideTag+"}",t),e=this.replaceXmlTag(e,this.templaterState.bracketStart.i,s,!0));else if(this.templaterState.bracketEnd.i>this.templaterState.bracketStart.i){for(l=/^([^{]*){.*$/,o=this.matches[this.templaterState.bracketStart.i][2].match(l),null!=this.matches[this.templaterState.bracketStart.i].first?e=this.replaceXmlTag(e,this.templaterState.bracketStart.i,t,!0,!0):null!=this.matches[this.templaterState.bracketStart.i].last?e=this.replaceXmlTag(e,this.templaterState.bracketStart.i,t,!0,!0):(s=o[1]+t,e=this.replaceXmlTag(e,this.templaterState.bracketStart.i,s,!0)),n=c=u=this.templaterState.bracketStart.i+1,m=this.templaterState.bracketEnd.i;m>=u?m>c:c>m;n=m>=u?++c:--c)this.charactersAdded[n+1]=this.charactersAdded[n],e=this.replaceXmlTag(e,n,"");h=/^[^}]*}(.*)$/,s=this.matches[this.templaterState.bracketEnd.i][2].replace(h,"$1"),this.charactersAdded[this.templaterState.bracketEnd.i+1]=this.charactersAdded[this.templaterState.bracketEnd.i],e=this.replaceXmlTag(e,n,s,!0)}for(d=this.matches,i=p=0,g=d.length;g>p;i=++p)r=d[i],i>this.templaterState.bracketEnd.i&&(this.charactersAdded[i+1]=this.charactersAdded[i]);if(a===e)throw"copycontent=content !!";return e},t.prototype.applyTags=function(){var t,e,a,s,i,n,r,h,l,o,c,p,g,u,m,d,f,S;for(this.templaterState.initialize(),d=this.matches,e=l=0,g=d.length;g>l;e=++l){for(n=d[e],a=null!=n[2]?n[2]:"",h=o=e,f=this.matches.length;f>=e?f>o:o>f;h=f>=e?++o:--o)this.charactersAdded[h+1]=this.charactersAdded[h];for(s=c=0,u=a.length;u>c;s=++c){for(t=a[s],this.templaterState.currentStep={i:e,j:s},S=this.matches,h=p=0,m=S.length;m>p;h=++p)if(i=S[h],e>=h&&this.content[i.offset+this.charactersAdded[h]]!==i[0][0])throw"no < at the beginning of "+i[0][0]+" (2)";if("{"===t)this.templaterState.startTag();else if("}"===t){if(this.templaterState.endTag(),r=this.executeEndTag(),void 0!==r)return r}else this.templaterState.inTag===!0&&(this.templaterState.textInsideTag+=t)}}return new ImgReplacer(this).findImages().replaceImages(),this},t.prototype.handleRecursiveCase=function(){var t,e,a;return a=function(t){return function(){var e,a,i,n,r;return e=arguments[0],i=4<=arguments.length?s.call(arguments,1,r=arguments.length-2):(r=1,[]),a=arguments[r++],n=arguments[r++],i.unshift(e),i.offset=a,i.first=!0,t.matches.unshift(i),t.charactersAdded.unshift(0)}}(this),this.content.replace(/^()([^<]+)/,a),e=function(t){return function(){var e,a,i,n,r;return e=arguments[0],i=4<=arguments.length?s.call(arguments,1,r=arguments.length-2):(r=1,[]),a=arguments[r++],n=arguments[r++],i.unshift(e),i.offset=a,i.last=!0,t.matches.push(i),t.charactersAdded.push(0)}}(this),t="(<"+this.tagX+"[^>]*>)([^>]+)$",this.content.replace(new RegExp(t),e)},t.prototype.useTag=function(t){var e,a,s,i,n,r;for(s=this.usedTags,r=this.scopePath,e=i=0,n=r.length;n>i;e=++i)a=r[e],null==s[a]&&(s[a]={}),s=s[a];return""!==t?s[t]=!0:void 0},t.prototype.calcIntellegentlyDashElement=function(){return!1},t.prototype.executeEndTag=function(){var t;return"simple"===this.templaterState.loopType()&&(this.content=this.replaceTagByValue(this.getValueFromScope(this.templaterState.textInsideTag,this.currentScope))),"/"===this.templaterState.textInsideTag[0]&&"/"+this.templaterState.loopOpen.tag===this.templaterState.textInsideTag?"dash"===this.templaterState.loopType()?this.dashLoop(this.templaterState.loopOpen.element):this.intelligentTagging===!0&&(t=this.calcIntellegentlyDashElement(),t!==!1)?this.dashLoop(t,!0):this.forLoop():void 0},t}(),a.XmlTemplater=t}).call(this);
(function(){var t,n,e,l={}.hasOwnProperty,o=function(t,n){function e(){this.constructor=t}for(var o in n)l.call(n,o)&&(t[o]=n[o]);return e.prototype=n.prototype,t.prototype=new e,t.__super__=n.prototype,t};e="undefined"!=typeof global&&null!==global?global:window,n="undefined"!=typeof global&&null!==global?"node":"browser",t=t=function(t){function n(t,e){if(null==t&&(t=""),null==e&&(e={}),n.__super__.constructor.call(this,"",e),this.currentClass=n,this.tagX="w:t","string"!=typeof t)throw"content must be string!";this.load(t)}return o(n,t),n.prototype.calcIntellegentlyDashElement=function(){var t,e,l,o,r,c,a,s;for(s=this.findOuterTagsContent(),t=s.content,o=s.start,e=s.end,l=this.calcScopeText(this.content,o,e-o),c=0,a=l.length;a>c;c++)if(r=l[c],"<w:tc>"===r.tag)return"w:tr";return n.__super__.calcIntellegentlyDashElement.call(this)},n}(XmlTemplater),e.DocXTemplater=t}).call(this);