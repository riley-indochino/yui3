YUI.add("editor-base",function(B){var A=function(){A.superclass.constructor.apply(this,arguments);};B.extend(A,B.Base,{frame:null,initializer:function(){var C=new B.Frame({designMode:true,title:A.STRINGS.title,use:A.USE,dir:this.get("dir"),extracss:this.get("extracss"),host:this}).plug(B.Plugin.ExecCommand);C.after("ready",B.bind(this._afterFrameReady,this));C.addTarget(this);this.frame=C;this.publish("nodeChange",{emitFacade:true,bubbles:true,defaultFn:this._defNodeChangeFn});},destructor:function(){this.frame.destroy();this.detachAll();},copyStyles:function(F,E){var C=["color","fontSize","fontFamily","backgroundColor","fontStyle"],D={};B.each(C,function(G){D[G]=F.getStyle(G);});if(F.ancestor("b,strong")){D.fontWeight="bold";}E.setStyles(D);},_defNodeChangeFn:function(N){var M=this.getInstance();switch(N.changedType){case"enter":if(B.UA.webkit){if(N.changedEvent.shiftKey){this.execCommand("insertbr");N.changedEvent.preventDefault();}}break;case"tab":if(!N.changedNode.test("li, li *")&&!N.changedEvent.shiftKey){var F=new M.Selection();F.setCursor();var O=F.getCursor();O.insert(A.TABKEY,"before");F.focusCursor();N.changedEvent.preventDefault();}break;case"enter-up":if(N.changedNode.test("p")){var I=N.changedNode.previous(),E,P,Q=false;if(I){E=I.one(":last-child");while(!Q){if(E){P=E.one(":last-child");if(P){E=P;}else{Q=true;}}else{Q=true;}}if(E){this.copyStyles(E,N.changedNode);}}}break;}var L=this.getDomPath(N.changedNode),C={},K,D,H=[],J="",G="";if(N.commands){C=N.commands;}L.each(function(Y){var S=Y.get("tagName").toLowerCase(),X=A.TAG2CMD[S],W=B.Node.getDOMNode(Y);if(X){C[X]=1;}var V=W.style;if(V.fontWeight.toLowerCase()=="bold"){C.bold=1;}if(V.fontStyle.toLowerCase()=="italic"){C.italic=1;}if(V.textDecoration.toLowerCase()=="underline"){C.underline=1;}if(V.textDecoration.toLowerCase()=="line-through"){C.strikethrough=1;}var U=Y.getStyle("fontFamily").split(",")[0].toLowerCase();if(U){K=U;}if(K){K=K.replace(/'/g,"").replace(/"/g,"");}D=Y.getStyle("fontSize");var T=Y.get("className").split(" ");B.each(T,function(Z){if(Z!==""&&(Z.substr(0,4)!=="yui_")){H.push(Z);}});J=A.FILTER_RGB(Y.getStyle("color"));var R=A.FILTER_RGB(Y.getStyle("backgroundColor"));if(R!=="transparent"){G=R;}});N.dompath=L;N.classNames=H;N.commands=C;if(!N.fontFamily){N.fontFamily=K;}if(!N.fontSize){N.fontSize=D;}if(!N.fontColor){N.fontColor=J;}if(!N.backgroundColor){N.backgroundColor=G;}},getDomPath:function(C){var E=[],D=this.frame.getInstance();while(C!==null){if(C.test("html")||C.test("doc")||!C.get("tagName")){C=null;break;}if(!C.inDoc()){C=null;break;}if(C.get("nodeName")&&C.get("nodeType")&&(C.get("nodeType")==1)){E.push(D.Node.getDOMNode(C));}if(C.test("body")){C=null;break;}C=C.get("parentNode");}if(E.length===0){E[0]=D.config.doc.body;}return D.all(E.reverse());},_afterFrameReady:function(){var C=this.frame.getInstance();this.frame.on("mousedown",B.bind(this._onFrameMouseDown,this));this.frame.on("keyup",B.bind(this._onFrameKeyUp,this));this.frame.on("keydown",B.bind(this._onFrameKeyDown,this));this.frame.on("keypress",B.bind(this._onFrameKeyPress,this));C.Selection.filter();this.fire("ready");},_onFrameMouseDown:function(C){this.fire("nodeChange",{changedNode:C.frameTarget,changedType:"mousedown",changedEvent:C});},_onFrameKeyUp:function(E){var D=this.frame.getInstance(),C=new D.Selection();if(C.anchorNode){this.fire("nodeChange",{changedNode:C.anchorNode,changedType:"keyup",selection:C,changedEvent:E});if(A.NC_KEYS[E.keyCode]){this.fire("nodeChange",{changedNode:C.anchorNode,changedType:A.NC_KEYS[E.keyCode]+"-up",selection:C,changedEvent:E});}}},_onFrameKeyDown:function(E){var D=this.frame.getInstance(),C=new D.Selection();if(C.anchorNode){this.fire("nodeChange",{changedNode:C.anchorNode,changedType:"keydown",changedEvent:E});if(A.NC_KEYS[E.keyCode]){this.fire("nodeChange",{changedNode:C.anchorNode,changedType:A.NC_KEYS[E.keyCode],changedEvent:E});this.fire("nodeChange",{changedNode:C.anchorNode,changedType:A.NC_KEYS[E.keyCode]+"-down",changedEvent:E});}}},_onFrameKeyPress:function(E){var D=this.frame.getInstance(),C=new D.Selection();if(C.anchorNode){this.fire("nodeChange",{changedNode:C.anchorNode,changedType:"keypress",changedEvent:E});if(A.NC_KEYS[E.keyCode]){this.fire("nodeChange",{changedNode:C.anchorNode,changedType:A.NC_KEYS[E.keyCode]+"-press",changedEvent:E});}}},execCommand:function(G,I){var D=this.frame.execCommand(G,I),F=this.frame.getInstance(),E=new F.Selection(),C={},H={changedNode:E.anchorNode,changedType:"execcommand",nodes:D};switch(G){case"forecolor":H.fontColor=I;break;case"backcolor":H.backgroundColor=I;break;case"fontsize":H.fontSize=I;break;case"fontname":H.fontFamily=I;break;}C[G]=1;H.commands=C;this.fire("nodeChange",H);return D;},getInstance:function(){return this.frame.getInstance();},render:function(C){this.frame.set("content",this.get("content"));this.frame.render(C);return this;},focus:function(C){this.frame.focus(C);return this;},show:function(){this.frame.show();return this;},hide:function(){this.frame.hide();return this;},getContent:function(){var C="",D=this.getInstance();if(D&&D.Selection){C=D.Selection.unfilter();}C=C.replace(/ _yuid="([^>]*)"/g,"");return C;}},{TABKEY:'<span class="tab">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>',FILTER_RGB:function(E){if(E.toLowerCase().indexOf("rgb")!=-1){var H=new RegExp("(.*?)rgb\\s*?\\(\\s*?([0-9]+).*?,\\s*?([0-9]+).*?,\\s*?([0-9]+).*?\\)(.*?)","gi");var D=E.replace(H,"$1,$2,$3,$4,$5").split(",");if(D.length==5){var G=parseInt(D[1],10).toString(16);var F=parseInt(D[2],10).toString(16);var C=parseInt(D[3],10).toString(16);G=G.length==1?"0"+G:G;F=F.length==1?"0"+F:F;C=C.length==1?"0"+C:C;E="#"+G+F+C;}}return E;},TAG2CMD:{"b":"bold","strong":"bold","i":"italic","em":"italic","u":"underline","sup":"superscript","sub":"subscript","img":"insertimage","a":"createlink","ul":"insertunorderedlist","ol":"insertorderedlist"},NC_KEYS:{8:"backspace",9:"tab",13:"enter",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",46:"delete"},USE:["substitute","node","selector-css3","selection","stylesheet"],NAME:"editorBase",STRINGS:{title:"Rich Text Editor"},ATTRS:{content:{value:"<br>",setter:function(C){if(C.substr(0,1)==="\n"){C=C.substr(1);
}if(C===""){C="<br>";}return this.frame.set("content",C);},getter:function(){return this.frame.get("content");}},dir:{writeOnce:true,value:"ltr"},extracss:{value:false,setter:function(C){if(this.frame){this.frame.set("extracss",C);}return C;}}}});B.EditorBase=A;},"@VERSION@",{skinnable:false,requires:["base","frame","node","exec-command"]});