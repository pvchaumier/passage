if (self.CavalryLogger) { CavalryLogger.start_js(["2gSt0"]); }

__d('CloseButton.react',['cx','fbt','React','Image.react','joinClasses'],(function a(b,c,d,e,f,g,h,i){var j,k;j=babelHelpers.inherits(l,c('React').Component);k=j&&j.prototype;l.prototype.render=function(){'use strict';var m=this.props,n=m.size||'medium',o=m.appearance||'normal',p=n==='small',q=n==='huge',r=o==='dark',s=o==='inverted',t=m.ajaxify||null,u=m.rel||null,v="uiCloseButton"+(p?' '+"uiCloseButtonSmall":'')+(q?' '+"uiCloseButtonHuge":'')+(p&&r?' '+"uiCloseButtonSmallDark":'')+(p&&s?' '+"uiCloseButtonSmallInverted":'')+(!p&&r?' '+"uiCloseButtonDark":'')+(!p&&s?' '+"uiCloseButtonInverted":''),w=i._("Close"),x=Object.assign({},this.props);delete x.size;delete x.appearance;delete x.ajaxify;delete x.tooltip;return c('React').createElement('a',babelHelpers['extends']({},x,{ajaxify:t,href:'#',role:'button',title:m.ariaLabel||w,'aria-label':m.ariaLabel||w,'data-hover':m.tooltip&&'tooltip','data-skipchecker':null,'data-tooltip-alignh':m.tooltip&&'center','data-tooltip-content':m.tooltip,className:c('joinClasses')(this.props.className,v),rel:u}),c('React').createElement(c('Image.react'),{className:'uiCloseButtonHighContrast',src:'/images/chat/tab/close.png'}));};function l(){'use strict';j.apply(this,arguments);}f.exports=l;}),null);
__d('ChatTabQuickCamMediaErrorDialog.react',['fbt','React','XUIDialogBody.react','XUIDialogButton.react','XUIDialogFooter.react','XUIDialogHeader.react','XUIDialogHeaderTitle.react'],(function a(b,c,d,e,f,g,h){'use strict';var i,j,k=c('React').PropTypes;i=babelHelpers.inherits(l,c('React').PureComponent);j=i&&i.prototype;l.prototype.render=function(){return c('React').createElement('div',null,c('React').createElement(c('XUIDialogHeader.react'),null,c('React').createElement(c('XUIDialogHeaderTitle.react'),null,h._("No camera detected"))),c('React').createElement(c('XUIDialogBody.react'),null,h._("Please check your camera's connection and ensure your camera is not already in use by another application.")),c('React').createElement(c('XUIDialogFooter.react'),null,c('React').createElement(c('XUIDialogButton.react'),{label:h._("Ok"),onClick:this.props.handleHidden,type:'primary',action:'confirm'})));};function l(){i.apply(this,arguments);}l.propTypes={handleHidden:k.func.isRequired};f.exports=l;}),null);
__d('MessengerQuickCamConfig',[],(function a(b,c,d,e,f,g){var h={success:'messenger/quick_cam/success',max_video_time:120000,progress_increment:.01};f.exports=h;}),null);
__d('SoundPlayer',['URI','createArrayFromMixed','Map'],(function a(b,c,d,e,f,g){'use strict';var h=new (c('Map'))();function i(l){var m=new (c('URI'))(l);return m.getDomain()?l:new (c('URI'))(window.location.href).setPath(m.getPath()).toString();}function j(l){var m=new (c('URI'))(l).getPath();if(/\.mp3$/.test(m))return 'audio/mpeg';if(/\.og[ga]$/.test(m))return 'audio/ogg';return '';}var k={preload:function l(m){for(var n=c('createArrayFromMixed')(m),o=Array.isArray(n),p=0,n=o?n:n[typeof Symbol==='function'?Symbol.iterator:'@@iterator']();;){var q;if(o){if(p>=n.length)break;q=n[p++];}else{p=n.next();if(p.done)break;q=p.value;}var r=q;if(h.has(r))return;var s=document.createElement('audio');if(!s||!s.canPlayType||!s.canPlayType(j(r)))continue;s.preload='auto';s.src=i(r);document.body&&document.body.appendChild(s);h.set(r,s);return;}},play:function l(m){var n=arguments.length<=1||arguments[1]===undefined?{}:arguments[1];for(var o=c('createArrayFromMixed')(m),p=Array.isArray(o),q=0,o=p?o:o[typeof Symbol==='function'?Symbol.iterator:'@@iterator']();;){var r;if(p){if(q>=o.length)break;r=o[q++];}else{q=o.next();if(q.done)break;r=q.value;}var s=r;if(!h.has(s))k.preload(s);var t=h.get(s);if(!t)continue;if(n.loop)t.setAttribute('loop','');if(n.volume)t.volume=n.volume;t.play();return;}},pause:function l(m){for(var n=c('createArrayFromMixed')(m),o=Array.isArray(n),p=0,n=o?n:n[typeof Symbol==='function'?Symbol.iterator:'@@iterator']();;){var q;if(o){if(p>=n.length)break;q=n[p++];}else{p=n.next();if(p.done)break;q=p.value;}var r=q,s=h.get(r);if(s){s.pause();return;}}},stop:function l(m){for(var n=c('createArrayFromMixed')(m),o=Array.isArray(n),p=0,n=o?n:n[typeof Symbol==='function'?Symbol.iterator:'@@iterator']();;){var q;if(o){if(p>=n.length)break;q=n[p++];}else{p=n.next();if(p.done)break;q=p.value;}var r=q,s=h.get(r);if(s){s.pause();s.removeAttribute('src');s.src=i(r);return;}}}};f.exports=k;}),null);
__d("XMessagingQuickCamUploadController",["XController"],(function a(b,c,d,e,f,g){f.exports=c("XController").create("\/messaging\/quick-cam\/upload\/",{});}),null);
__d('MessengerQuickCamStore',['invariant','AsyncRequest','DOMQuery','FluxReduceStore','immutable','MercuryMessageActions','MercuryMessageObject','MercurySoundsConfig','MercurySourceType','MercuryTriodeSourceUtil','MessengerQuickCamActions','MessengerQuickCamConfig','MessengerQuickCamDispatcher','MessengerQuickCamOrigins','SoundPlayer','XMessagingQuickCamUploadController'],(function a(b,c,d,e,f,g,h){'use strict';var i,j,k,l,m=c('MessengerQuickCamActions').Types,n=-1;i=babelHelpers.inherits(o,c('immutable').Record({countDownTime:n,countDownInt:null,mediaRequested:false,quickcam:null,progressInterval:null,progressWidth:0,shutterOn:false,snapshot:null,source:null,threadID:null,uploadComplete:false,uploadError:false,videoBlob:null,videoRecorder:null,videoSrc:null,videoStream:null,viewer:null}));j=i&&i.prototype;function o(){i.apply(this,arguments);}k=babelHelpers.inherits(p,c('FluxReduceStore'));l=k&&k.prototype;p.prototype.getInitialState=function(){return new o();};p.prototype.reduce=function(q,r){switch(r.type){case m.COUNT_DOWN_TIMER_START:return q.merge({countDownTime:3,countDownInt:setInterval(function(){return c('MessengerQuickCamActions').countDownTimer();},1000)});case m.COUNT_DOWN_TIMER:var s=q.countDownTime-1;if(s<=0){q.countDownInt&&clearInterval(q.countDownInt);c('SoundPlayer').play(c('MercurySoundsConfig').camera_shutter_click_url);return q.merge({countDownTime:s,countDownInt:null,shutterOn:true});}else return q.merge({countDownTime:s});case m.SHUTTER_OFF:q=this.$MessengerQuickCamStore1(q);return q.merge({countDownTime:n,shutterOn:false});case m.CLOSE:return this.$MessengerQuickCamStore2(q);case m.REQUEST_USER_MEDIA:var t=r.threadID,u=r.viewer;q=q.merge({threadID:t,viewer:u});this.$MessengerQuickCamStore3(q);return q;case m.PROCESS_RECORDING:return this.$MessengerQuickCamStore4(q,r.videoBlob);case m.REGISTER_QUICKCAM:var v=r.source,w=r.quickcam;return q.merge({source:v,quickcam:w});case m.RETAKE:if(q.quickcam){var x=c('DOMQuery').find(q.quickcam,'video');x.muted=true;}return q.merge({snapshot:null,videoBlob:null});case m.SEND_PHOTO:return this.$MessengerQuickCamStore5(q);case m.SEND_VIDEO:if(q.quickcam){var y=c('DOMQuery').find(q.quickcam,'video');y.pause();}return this.$MessengerQuickCamStore6(q);case m.SET_MEDIA:var z=r.videoSrc,aa=r.videoStream;return q.merge({mediaRequested:true,videoSrc:z,videoStream:aa});case m.STOP_VIDEO:return this.$MessengerQuickCamStore7(q);case m.TAKE_PHOTO:return this.$MessengerQuickCamStore1(q);case m.TAKE_VIDEO:return this.$MessengerQuickCamStore8(q);case m.UPDATE_PROGRESS:return this.$MessengerQuickCamStore9(q);case m.UPLOAD_ERROR:return this.$MessengerQuickCamStore10(q,r.error);case m.UPLOAD_COMPLETE:var ba=r.data;if(ba&&ba.payload)return this.$MessengerQuickCamStore11(q,ba.payload);return q;case m.USER_MEDIA_ERROR:return q.set('mediaRequested',true);default:return q;}};p.prototype.$MessengerQuickCamStore8=function(q){var r;if(q.videoStream)(function(){var s=new window.MediaRecorder(q.videoStream),t=[];s.ondataavailable=function(y){t.push(y.data);};s.onstop=function(y){var z=new window.Blob(t,{type:'video/webm'});c('MessengerQuickCamActions').processRecording(z);};var u=c('MessengerQuickCamConfig').max_video_time,v=c('MessengerQuickCamConfig').progress_increment,w=u*v/100,x=setInterval(c('MessengerQuickCamActions').updateProgress,w);q=q.merge({videoRecorder:s,progressInterval:x});q.videoRecorder.start();})();return q;};p.prototype.$MessengerQuickCamStore7=function(q){if(q.videoRecorder)q.videoRecorder.stop();if(q.progressInterval){clearInterval(q.progressInterval);q=q.merge({progressInterval:null,progressWidth:0});}return q;};p.prototype.$MessengerQuickCamStore4=function(q,r){if(q.quickcam){var s=c('DOMQuery').find(q.quickcam,'video');s.muted=false;q=q.set('videoBlob',r);}return q;};p.prototype.$MessengerQuickCamStore3=function(q){var r=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia;r||h(0);r.call(navigator,{video:true,audio:true},function(s){if(s.getVideoTracks().length>0){c('MessengerQuickCamActions').setMedia(window.URL.createObjectURL(s),s);}else c('MessengerQuickCamActions').userMediaError();},function(s){c('MessengerQuickCamActions').userMediaError();});};p.prototype.$MessengerQuickCamStore1=function(q){if(q.quickcam){var r=c('DOMQuery').find(q.quickcam,'video'),s=c('DOMQuery').find(q.quickcam,'canvas');if(r&&s){s.height=r.videoHeight;s.width=r.videoWidth;var t=s.getContext('2d');if(t){t.translate(s.width,0);t.scale(-1,1);t.drawImage(r,0,0,s.width,s.height);q=q.set('snapshot',s.toDataURL());}}}return q;};p.prototype.$MessengerQuickCamStore9=function(q){if(q.progressWidth>=100)return this.$MessengerQuickCamStore7(q);if(q.quickcam)q=q.set('progressWidth',q.progressWidth+.01);return q;};p.prototype.$MessengerQuickCamStore5=function(q){if(q.snapshot&&q.quickcam){var r=q.quickcam,s=q.snapshot.split(',')[1],t=new FormData();t.append('bmp_string',s);t.append('async_response',"true");this.$MessengerQuickCamStore12(r,t);}return q;};p.prototype.$MessengerQuickCamStore6=function(q){if(q.videoBlob&&q.quickcam){var r=new FileReader();r.readAsDataURL(q.videoBlob);r.onloadend=function(){var s=q.quickcam,t=new FormData();t.append('video_string',r.result.split(',')[1]);t.append('async_response',"true");if(s)this.$MessengerQuickCamStore12(s,t);}.bind(this);}return q;};p.prototype.$MessengerQuickCamStore12=function(q,r){var s=c('DOMQuery').find(q,'[id="spinner"]'),t=c('XMessagingQuickCamUploadController').getURIBuilder().getURI(),u=new (c('AsyncRequest'))().setURI(t).setRawData(r).setStatusElement(s).setAllowCrossOrigin(true).setErrorHandler(function(v){return c('MessengerQuickCamActions').uploadError(v);}).setHandler(function(v){return c('MessengerQuickCamActions').uploadComplete(v);});u.send();};p.prototype.$MessengerQuickCamStore10=function(q,r){return q;};p.prototype.$MessengerQuickCamStore11=function(q,r){var s=q,t=s.threadID,u=s.viewer,v=s.source;if(u&&t&&v){var w=c('MercuryMessageObject').getForFBID(u),x=c('MercuryMessageActions').getForFBID(u),y=w.constructAttachmentMessageObject(v===c('MessengerQuickCamOrigins').MESSENGER?c('MercuryTriodeSourceUtil').getMercuryTriodeSource():c('MercurySourceType').CHAT_WEB,t),z={message_source:'camera'};y.message_source_data=JSON.stringify(z);y.body='';y.has_attachment=true;if(r.photo_fbid)y.photo_fbids=[r.photo_fbid.toString()];if(r.video_fbid)y.video_ids=[r.video_fbid.toString()];x.send(y);q=q.set('uploadComplete',true);}return q;};p.prototype.$MessengerQuickCamStore2=function(q){if(q.quickcam){var r=c('DOMQuery').find(q.quickcam,'video');r.src='';}if(q.progressInterval)clearInterval(q.progressInterval);var s=q.videoStream;if(s){s.getVideoTracks().forEach(function(t){t.stop();});s.getAudioTracks().forEach(function(t){t.stop();});}if(q.videoSrc)window.URL.revokeObjectURL(q.videoSrc);return this.getInitialState();};function p(){k.apply(this,arguments);}f.exports=new p(c('MessengerQuickCamDispatcher'));}),null);
__d('MessengerQuickCam.react',['cx','fbt','FluxContainer','FluxReduceStore','Image.react','React','ReactDOM','MessengerQuickCamActions','MessengerQuickCamOrigins','MessengerQuickCamStore'],(function a(b,c,d,e,f,g,h,i){'use strict';var j,k,l=c('React').PropTypes;j=babelHelpers.inherits(m,c('React').Component);k=j&&j.prototype;m.getStores=function(){return [c('MessengerQuickCamStore')];};m.calculateState=function(){return {quickcam:c('MessengerQuickCamStore').getState()};};m.prototype.componentDidMount=function(){var n=c('ReactDOM').findDOMNode(this);c('MessengerQuickCamActions').registerQuickCam(this.props.location,n);};m.prototype.componentWillUnmount=function(){this.props.onHidden();};m.prototype.render=function(){return c('React').createElement('div',{className:"_34a6"+(this.state.quickcam.shutterOn?' '+"on":'')},this.$MessengerQuickCam1(),this.$MessengerQuickCam2(),this.$MessengerQuickCam3(),this.$MessengerQuickCam4(),this.$MessengerQuickCam5(),this.$MessengerQuickCam6());};m.prototype.$MessengerQuickCam1=function(){var n=this.state.quickcam.videoSrc;if(this.state.quickcam.videoBlob)n=window.URL.createObjectURL(this.state.quickcam.videoBlob);return c('React').createElement('video',{autoPlay:true,loop:true,muted:true,className:"_9q6"+(this.state.quickcam.snapshot?' '+"hidden_elem":''),src:n});};m.prototype.$MessengerQuickCam2=function(){return c('React').createElement('canvas',{className:'hidden_elem'});};m.prototype.$MessengerQuickCam3=function(){return c('React').createElement(c('Image.react'),{className:"_34a7"+(!this.state.quickcam.snapshot?' '+"hidden_elem":''),src:this.state.quickcam.snapshot});};m.prototype.$MessengerQuickCam4=function(){return c('React').createElement('img',{id:'spinner',className:"_34a9 _34aa",src:'/images/loaders/indicator_blue_large.gif'});};m.prototype.$MessengerQuickCam5=function(){return c('React').createElement('label',{className:"_34ab"+(!this.state.quickcam.uploadError?' '+"hidden_elem":'')},i._("Error uploading your picture! Please try again."));};m.prototype.$MessengerQuickCam6=function(){return c('React').createElement('div',{id:'progress',className:"_1q5",style:{width:this.state.quickcam.progressWidth+'%'}});};function m(){j.apply(this,arguments);}m.propTypes={onHidden:l.func.isRequired,location:l.oneOf(c('MessengerQuickCamOrigins').getValues()).isRequired};f.exports=c('FluxContainer').create(m);}),null);
__d('MessengerQuickCamMediaErrorDialog.react',['fbt','messengerDialogBodyReact','MessengerDialogButton.react','MessengerDialogFooter.react','MessengerDialogHeader.react','MessengerDialogTitle.react','React'],(function a(b,c,d,e,f,g,h){'use strict';var i,j,k=c('messengerDialogBodyReact').comp,l=c('React').PropTypes;i=babelHelpers.inherits(m,c('React').PureComponent);j=i&&i.prototype;m.prototype.render=function(){return c('React').createElement('div',null,c('React').createElement(c('MessengerDialogHeader.react'),null,c('React').createElement(c('MessengerDialogTitle.react'),null,h._("No camera detected"))),c('React').createElement(k,null,h._("Please check your camera's connection and ensure your camera is not already in use by another application.")),c('React').createElement(c('MessengerDialogFooter.react'),null,c('React').createElement(c('MessengerDialogButton.react'),{label:h._("Ok"),onClick:this.props.handleHidden,type:'primary'})));};function m(){i.apply(this,arguments);}m.propTypes={handleHidden:l.func.isRequired};f.exports=m;}),null);
__d('MessengerQuickCamDialog.react',['cx','fbt','ChatTabQuickCamMediaErrorDialog.react','CloseButton.react','FluxContainer','FluxReduceStore','Keys','messengerDialogBodyReact','MessengerDialogButton.react','MessengerDialogFooter.react','MessengerDialogHeader.react','MessengerDialogTitle.react','MessengerQuickCam.react','MessengerQuickCamActions','MessengerQuickCamMediaErrorDialog.react','MessengerQuickCamOrigins','MessengerQuickCamStore','React','XUIDialogBody.react','XUIDialogButton.react','XUIDialogFooter.react','XUIDialogHeader.react','XUIDialogHeaderTitle.react'],(function a(b,c,d,e,f,g,h,i){'use strict';var j,k,l=c('messengerDialogBodyReact').comp,m=c('React').PropTypes;j=babelHelpers.inherits(n,c('React').PureComponent);k=j&&j.prototype;function n(){var o,p;for(var q=arguments.length,r=Array(q),s=0;s<q;s++)r[s]=arguments[s];return p=(o=k.constructor).call.apply(o,[this].concat(r)),this.$MessengerQuickCamDialog1=function(){c('MessengerQuickCamActions').close();this.props.onHidden();}.bind(this),this.$MessengerQuickCamDialog7=function(){if(this.state.quickcam.countDownTime>=0)return;c('MessengerQuickCamActions').countDownTimerStart();}.bind(this),this.$MessengerQuickCamDialog9=function(){if(this.state.quickcam.countDownTime>=0)return;c('MessengerQuickCamActions').takeVideo();}.bind(this),p;}n.getStores=function(){return [c('MessengerQuickCamStore')];};n.calculateState=function(){return {quickcam:c('MessengerQuickCamStore').getState()};};n.prototype.componentDidMount=function(){if(this.props.shown)this.props.onShown();};n.prototype.componentDidUpdate=function(o,p){if(this.state.quickcam.uploadComplete)this.$MessengerQuickCamDialog1();if(p.quickcam.shutterOn===false&&this.state.quickcam.shutterOn===true)setTimeout(function(){return c('MessengerQuickCamActions').shutterOff();},300);};n.prototype.render=function(){if(!this.props.shown)return null;if(!this.state.quickcam.videoSrc&&this.state.quickcam.mediaRequested)return this.$MessengerQuickCamDialog2();return c('React').createElement('div',null,this.$MessengerQuickCamDialog3(),this.$MessengerQuickCamDialog4(),this.$MessengerQuickCamDialog5(),this.$MessengerQuickCamDialog6());};n.prototype.$MessengerQuickCamDialog8=function(){c('MessengerQuickCamActions').sendPhoto();};n.prototype.$MessengerQuickCamDialog10=function(){c('MessengerQuickCamActions').stopVideo();};n.prototype.$MessengerQuickCamDialog11=function(){c('MessengerQuickCamActions').sendVideo();};n.prototype.$MessengerQuickCamDialog12=function(){c('MessengerQuickCamActions').retake();};n.prototype.$MessengerQuickCamDialog13=function(){return this.props.location===c('MessengerQuickCamOrigins').MESSENGER;};n.prototype.$MessengerQuickCamDialog14=function(){return this.state.quickcam.snapshot!=null||this.state.quickcam.videoBlob!=null;};n.prototype.$MessengerQuickCamDialog2=function(){return this.$MessengerQuickCamDialog13()?c('React').createElement(c('MessengerQuickCamMediaErrorDialog.react'),{handleHidden:this.$MessengerQuickCamDialog1}):c('React').createElement(c('ChatTabQuickCamMediaErrorDialog.react'),{handleHidden:this.$MessengerQuickCamDialog1});};n.prototype.$MessengerQuickCamDialog3=function(){return this.$MessengerQuickCamDialog13()?this.$MessengerQuickCamDialog15():this.$MessengerQuickCamDialog16();};n.prototype.$MessengerQuickCamDialog15=function(){return c('React').createElement(c('MessengerDialogHeader.react'),null,c('React').createElement(c('MessengerDialogTitle.react'),null,i._("Camera")),c('React').createElement(c('CloseButton.react'),{className:"_12wx",onClick:this.$MessengerQuickCamDialog1}));};n.prototype.$MessengerQuickCamDialog16=function(){return c('React').createElement(c('XUIDialogHeader.react'),null,c('React').createElement(c('XUIDialogHeaderTitle.react'),null,i._("Camera")));};n.prototype.$MessengerQuickCamDialog17=function(){if(!this.state.quickcam.videoSrc)return null;return c('React').createElement(c('MessengerQuickCam.react'),{location:this.props.location,onHidden:this.$MessengerQuickCamDialog1});};n.prototype.$MessengerQuickCamDialog4=function(){var o=this.state.quickcam.countDownTime>0?c('React').createElement('label',{className:"_4ju0"},this.state.quickcam.countDownTime):null,p=this.$MessengerQuickCamDialog13()?c('React').createElement(l,null,this.$MessengerQuickCamDialog17()):c('React').createElement(c('XUIDialogBody.react'),null,this.$MessengerQuickCamDialog17());return c('React').createElement('div',null,o,p);};n.prototype.$MessengerQuickCamDialog18=function(){return c('React').createElement('div',null,this.$MessengerQuickCamDialog19(),this.$MessengerQuickCamDialog20());};n.prototype.$MessengerQuickCamDialog21=function(){return c('React').createElement('div',{className:this.$MessengerQuickCamDialog13()?"_3-8w":''},this.$MessengerQuickCamDialog22(),this.$MessengerQuickCamDialog23(),this.$MessengerQuickCamDialog24());};n.prototype.$MessengerQuickCamDialog6=function(){if(this.state.quickcam.progressInterval)return null;return this.$MessengerQuickCamDialog13()?c('React').createElement(c('MessengerDialogFooter.react'),{leftContent:this.$MessengerQuickCamDialog18()},this.$MessengerQuickCamDialog21()):c('React').createElement(c('XUIDialogFooter.react'),{leftContent:this.$MessengerQuickCamDialog18()},this.$MessengerQuickCamDialog21());};n.prototype.$MessengerQuickCamDialog25=function(o){return this.$MessengerQuickCamDialog13()?o:c('React').createElement(c('XUIDialogButton.react'),o.props);};n.prototype.$MessengerQuickCamDialog20=function(){if(this.$MessengerQuickCamDialog14()||this.state.quickcam.progressInterval)return null;var o=c('React').createElement(c('MessengerDialogButton.react'),{label:i._("Take Video"),onClick:this.$MessengerQuickCamDialog9,type:'primary',disabled:this.state.quickcam.countDownTime>=0});return this.$MessengerQuickCamDialog25(o);};n.prototype.$MessengerQuickCamDialog5=function(){if(!this.state.quickcam.progressInterval)return null;var o=c('React').createElement(c('MessengerDialogButton.react'),{className:"_4d5i",label:i._("Stop Video"),onClick:this.$MessengerQuickCamDialog10,type:'primary'});return this.$MessengerQuickCamDialog25(o);};n.prototype.$MessengerQuickCamDialog22=function(){if(this.$MessengerQuickCamDialog14()||this.state.quickcam.progressInterval)return null;var o=c('React').createElement(c('MessengerDialogButton.react'),{label:i._("Take Photo"),onClick:this.$MessengerQuickCamDialog7,type:'primary',disabled:this.state.quickcam.countDownTime>=0});return this.$MessengerQuickCamDialog25(o);};n.prototype.$MessengerQuickCamDialog19=function(){if(!this.$MessengerQuickCamDialog14())return null;var o=c('React').createElement(c('MessengerDialogButton.react'),{label:i._("Retake"),onClick:this.$MessengerQuickCamDialog12,type:'primary',disabled:false});return this.$MessengerQuickCamDialog25(o);};n.prototype.$MessengerQuickCamDialog24=function(){if(!this.state.quickcam.videoBlob)return null;var o=c('React').createElement(c('MessengerDialogButton.react'),{label:i._("Send Video"),onClick:this.$MessengerQuickCamDialog11,type:'primary',use:this.$MessengerQuickCamDialog13()?'default':'confirm',disabled:false});return this.$MessengerQuickCamDialog25(o);};n.prototype.$MessengerQuickCamDialog23=function(){if(!this.state.quickcam.snapshot)return null;var o=c('React').createElement(c('MessengerDialogButton.react'),{label:i._("Send Photo"),onClick:this.$MessengerQuickCamDialog8,type:'primary',use:this.$MessengerQuickCamDialog13()?'default':'confirm',disabled:false});return this.$MessengerQuickCamDialog25(o);};n.prototype.$MessengerQuickCamDialog26=function(o){var event=o;if(event&&event.keyCode===c('Keys').ESC&&this.props.onEscKeyDown){this.props.onEscKeyDown();event.preventDefault();}};n.propTypes={location:m.oneOf(c('MessengerQuickCamOrigins').getValues()).isRequired,onShown:m.func.isRequired,onHidden:m.func.isRequired,onEscKeyDown:m.func.isRequired,shown:m.bool.isRequired,threadID:m.string.isRequired,viewer:m.string.isRequired};f.exports=c('FluxContainer').create(n);}),null);