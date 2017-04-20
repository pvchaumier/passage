if (self.CavalryLogger) { CavalryLogger.start_js(["B16+Z"]); }

__d('LiveTimer',['fbt','csx','cx','CSS','DOM','ServerTime','TimeSlice','setTimeoutAcrossTransitions'],(function a(b,c,d,e,f,g,h,i,j){var k=1000,l=60,m=3600,n=43200,o=86400,p=60,q=60000,r={restart:function s(t){c('ServerTime').update(t*1000);this.updateTimeStamps();},getApproximateServerTime:function s(){return c('ServerTime').get();},getServerTimeOffset:function s(){return -1*c('ServerTime').getSkew();},updateTimeStamps:function s(){this.timestamps=c('DOM').scry(document.body,'abbr.livetimestamp');this.startLoop(q);},addTimeStamps:function s(t){if(!t)return;this.timestamps=this.timestamps||[];if(c('DOM').isNodeOfType(t,'abbr')&&c('CSS').hasClass(t,'livetimestamp')){this.timestamps.push(t);}else{var u=c('DOM').scry(t,'abbr.livetimestamp');for(var v=0;v<u.length;++v)this.timestamps.push(u[v]);}this.startLoop(0);},removeTimestamp:function s(t){if(!this.timestamps||!t)return;var u=this.timestamps.indexOf(t);if(u>-1)this.timestamps.splice(u,1);},startLoop:function s(t){this.stop();this.createTimeout(t);},createTimeout:function s(t){this.timeout=c('setTimeoutAcrossTransitions')(c('TimeSlice').guard(function(){this.loop();}.bind(this),'LiveTimer.loop',{isContinuation:false}),t);},stop:function s(){clearTimeout(this.timeout);},loop:function s(t){if(t)this.updateTimeStamps();var u=Math.floor(c('ServerTime').get()/k),v=-1;this.timestamps&&this.timestamps.forEach(function(x){var y=x.getAttribute('data-utime'),z=x.getAttribute('data-shorten'),aa=x.getAttribute('data-minimize'),ba=this.renderRelativeTime(u,y,z,aa);if(ba.text){var ca={'class':"timestampContent"},da=c('DOM').scry(x,".timestampContent")[0],ea=da&&da.getAttribute('id');if(ea)ca.id=ea;c('DOM').setContent(x,c('DOM').create('span',ca,ba.text));}if(ba.next!=-1&&(ba.next<v||v==-1))v=ba.next;}.bind(this));if(v!=-1){var w=Math.max(q,v*k);this.createTimeout(w);}},renderRelativeTime:function s(t,u,v,w){var x={text:"",next:-1};if(t-u>o)return x;var y=t-u,z=Math.floor(y/l),aa=Math.floor(z/p);if(z<1){if(w){x.text=h._("1m");x.next=20-y%20;}else if(v){x.text=h._("Just now");x.next=20-y%20;}else{x.text=h._("a few seconds ago");x.next=l-y%l;}return x;}if(aa<1){if(w){x.text=h._({"*":"{number}m"},[h.param('number',z,[0])]);}else if(v&&z==1){x.text=h._("1 min");}else if(v){x.text=h._({"*":"{number} mins"},[h.param('number',z,[0])]);}else x.text=z==1?h._("about a minute ago"):h._({"*":"{number} minutes ago"},[h.param('number',z,[0])]);x.next=l-y%l;return x;}if(aa<11)x.next=m-y%m;if(w){x.text=h._({"*":"{number}h"},[h.param('number',aa,[0])]);}else if(v&&aa==1){x.text=h._("1 hr");}else if(v){x.text=h._({"*":"{number} hrs"},[h.param('number',aa,[0])]);}else x.text=aa==1?h._("about an hour ago"):h._({"*":"{number} hours ago"},[h.param('number',aa,[0])]);return x;},renderRelativeTimeToServer:function s(t,u,v){return this.renderRelativeTime(Math.floor(c('ServerTime').get()/k),t,u,v);}};f.exports=r;f.exports.CONSTS={MS_IN_SEC:k,SEC_IN_MIN:l,SEC_IN_HOUR:m,SEC_IN_12_HOUR:n,SEC_IN_24_HOUR:o,MIN_IN_HOUR:p,HEARTBEAT:q};}),18);
__d('Timestamp.react',['LiveTimer','React','ReactDOM','joinClasses'],(function a(b,c,d,e,f,g){var h,i,j=c('React').PropTypes;h=babelHelpers.inherits(k,c('React').Component);i=h&&h.prototype;k.prototype.componentDidMount=function(){'use strict';if(this.props.autoUpdate)c('LiveTimer').addTimeStamps(c('ReactDOM').findDOMNode(this));};k.prototype.componentDidUpdate=function(l,m){'use strict';if(this.props.autoUpdate&&this.props.time!==l.time)c('LiveTimer').loop();};k.prototype.componentWillUnmount=function(){'use strict';c('LiveTimer').removeTimestamp(c('ReactDOM').findDOMNode(this));};k.prototype.render=function(){'use strict';var l=c('LiveTimer').renderRelativeTimeToServer(this.props.time,this.props.shorten,this.props.minimize),m=this.props,n=m.shorten,o=m.time,p=m.text,q=m.verbose,r=babelHelpers.objectWithoutProperties(m,['shorten','time','text','verbose']);delete r.autoUpdate;return c('React').createElement('abbr',babelHelpers['extends']({},r,{className:c('joinClasses')(this.props.className,"livetimestamp"),title:q,'data-utime':o,'data-minimize':this.props.minimize?true:null,'data-shorten':n?true:null}),l.text.toString()||p);};function k(){'use strict';h.apply(this,arguments);}k.propTypes={autoUpdate:j.bool};k.defaultProps={autoUpdate:false};f.exports=k;}),18);
__d('MessengerMobileWindow.react',['cx','MessengerPhotoViewCloseLink.react','React','SpotlightViewer'],(function a(b,c,d,e,f,g,h){'use strict';var i,j,k=c('React').PropTypes;i=babelHelpers.inherits(l,c('React').Component);j=i&&i.prototype;l.prototype.render=function(){var m=this.props,n=m.background,o=m.fontSize,p=m.onHide,q=m.open,r=m.children,s=m.onClose,t=babelHelpers.objectWithoutProperties(m,['background','fontSize','onHide','open','children','onClose']);return c('React').createElement(c('SpotlightViewer'),{onHide:p,open:q,rootClassName:"_7yx"+(n==='light'?' '+"_1lwq":'')},c('React').createElement('div',babelHelpers['extends']({className:"_7yy"},t),c('React').createElement('div',{className:"_7yz"}),c('React').createElement('div',{className:"_7y-"+(o==='auto'?' '+"_5q__":'')},c('React').createElement('div',{className:"_5uag"},r)),c('React').createElement(c('MessengerPhotoViewCloseLink.react'),{onClick:s,customTooltip:null})));};function l(){i.apply(this,arguments);}l.defaultProps={background:'light',fontSize:'auto'};l.propTypes={background:k.string.isRequired,fontSize:k.string.isRequired,onClose:k.func.isRequired,onHide:k.func.isRequired,open:k.bool.isRequired};f.exports=l;}),null);
__d('QE',['Banzai','Cache'],(function a(b,c,d,e,f,g){var h='qe_log_exposure',i=60,j=new (c('Cache'))(),k={logExposure:function l(m,n){var o=n?m+'|'+n:m;if(j.has(o))return;var p={signal:true},q={name:m,id:null};if(n)q.id=n;c('Banzai').post(h,q,p);j.set(o,true,1,i);}};f.exports=k;}),null);
__d('FBRTCExperiment',['FBRTCExperimentsConfig','QE'],(function a(b,c,d,e,f,g){'use strict';h.gen=function(i){var j={params:{},in_experiment:false,auto_exposure:false},k=c('FBRTCExperimentsConfig')[i]||j,l=new h(i,k.params,k.in_experiment);if(k.auto_exposure)l.logExposure(i);return l;};function h(i,j,k){this.$FBRTCExperiment2=i;this.$FBRTCExperiment3=j;this.$FBRTCExperiment1=k;}h.prototype.logExposure=function(){if(this.$FBRTCExperiment1)c('QE').logExposure(this.$FBRTCExperiment2);};h.prototype.getParam=function(i,j){if(this.$FBRTCExperiment3[i])return this.$FBRTCExperiment3[i].toString();return j;};h.prototype.getInt=function(i,j){if(this.$FBRTCExperiment3[i])return parseInt(this.$FBRTCExperiment3[i],10);return j;};h.prototype.getBool=function(i,j){var k=this.$FBRTCExperiment3;if(k[i])return k[i]==='1'||k[i]===1||k[i]==='true';return j;};f.exports=h;}),null);
__d("cssURL",[],(function a(b,c,d,e,f,g){function h(i){return "url('"+i.replace(/(\\|\s|\(|\)|'|\")/g,'\\$1')+"')";}f.exports=h;}),null);
__d('CssBackgroundImage.react',['EncryptedImg','React','createCancelableFunction','cssURL'],(function a(b,c,d,e,f,g){var h=c('React').PropTypes,i=c('React').createClass({displayName:'CssBackgroundImage',getProps:{imageURI:h.string.isRequired,className:h.string,backgroundPosition:h.string,height:h.string,width:h.string,style:h.object,onMouseDown:h.func,onMouseMove:h.func,onMouseUp:h.func,onMouseOut:h.func},getInitialState:function j(){return {image:'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs='};},getDefaultProps:function j(){return {backgroundPosition:'0% 0%',style:{}};},_process:function j(k){if(!c('EncryptedImg').isEncrypted(k)){this.setState({image:k});return;}if(this.encryptedImgCallback)this.encryptedImgCallback.cancel();this.encryptedImgCallback=c('createCancelableFunction')(function(l){if(k===this.props.imageURI)this.setState({image:l});}.bind(this));c('EncryptedImg').load(k,this.encryptedImgCallback);},componentWillMount:function j(){if(this.props.imageURI!=null)this._process(this.props.imageURI);},componentWillReceiveProps:function j(k){if(k.imageURI!=null)this._process(k.imageURI);},componentWillUnmount:function j(){if(this.encryptedImgCallback)this.encryptedImgCallback.cancel();},render:function j(){var k=this.props,l=k.imageURI,m=k.backgroundPosition,n=k.height,o=k.width,p=k.style,q=babelHelpers.objectWithoutProperties(k,['imageURI','backgroundPosition','height','width','style']);return c('React').createElement('div',babelHelpers['extends']({style:Object.assign({},p,{backgroundImage:c('cssURL')(this.state.image),backgroundPosition:m||p.backgroundPosition,height:n||p.height,width:o||p.width})},q));}});f.exports=i;}),null);
__d('MercuryAttachmentSnippetType',['keyMirror'],(function a(b,c,d,e,f,g){var h=c('keyMirror')({PHOTO:null,GIF:null,VIDEO:null,AUDIO_CLIP:null,STICKER:null,SHARE:null,ERROR:null,MIXED:null,GIFT:null,THIRDPARTYSTICKER:null,FILE:null,LIKE_STICKER:null});f.exports=h;}),null);
__d('P2PSnippetStringUtils',['fbt','P2PPaymentRequestStatus','P2PTransferStatus'],(function a(b,c,d,e,f,g,h){var i={getRequestCanceledSnippet:function j(k,l,m,n,o){if(k){return h._("Your request for {payment request amount} from {receiver's name} was canceled.",[h.param('payment request amount',o),h.param('receiver\'s name',n)]);}else if(l){return h._("{requester's name}'s request for {payment request amount} was canceled.",[h.param('requester\'s name',m),h.param('payment request amount',o)]);}else return h._("{requester's name}'s request for {payment request amount} from {receiver's name} was canceled.",[h.param('requester\'s name',m),h.param('payment request amount',o),h.param('receiver\'s name',n)]);},getRequestDeclinedSnippet:function j(k,l,m,n,o){if(k){return h._("{receiver's name} declined your request for {payment request amount}.",[h.param('receiver\'s name',n),h.param('payment request amount',o)]);}else if(l){return h._("You declined {requester's name}'s request for {payment request amount}.",[h.param('requester\'s name',m),h.param('payment request amount',o)]);}else return h._("{receiver's name} declined {sender's name}'s request for {payment request amount}.",[h.param('receiver\'s name',n),h.param('sender\'s name',m),h.param('payment request amount',o)]);},getRequestSentSnippet:function j(k,l,m,n,o){if(k){return h._("You requested {amount} from {requestee name}.",[h.param('amount',o),h.param('requestee name',n)]);}else if(l){return h._("{requester name} requested {amount} from you.",[h.param('requester name',m),h.param('amount',o)]);}else return h._("{name} requested {amount} from {requestee name}.",[h.param('name',m),h.param('amount',o),h.param('requestee name',n)]);},getRequestSnippetByStatus:function j(k,l,m,n,o,p){var q=k||c('P2PPaymentRequestStatus').INITED,r=[l,m,n,o,p];switch(q){case c('P2PPaymentRequestStatus').DECLINED:return this.getRequestDeclinedSnippet.apply(this,r);case c('P2PPaymentRequestStatus').TRANSFER_FAILED:case c('P2PPaymentRequestStatus').CANCELED:return this.getRequestCanceledSnippet.apply(this,r);}return this.getRequestSentSnippet.apply(this,r);},getTransferCanceledSnippet:function j(k,l,m,n,o){if(k){return h._("Your {amount} payment to {receiver_name} was canceled.",[h.param('amount',o),h.param('receiver_name',n)]);}else if(l){return h._("{sender name}'s {amount} payment was canceled.",[h.param('sender name',m),h.param('amount',o)]);}else return h._("{sender_name}'s {amount} payment to {receiver_name} was canceled.",[h.param('sender_name',m),h.param('amount',o),h.param('receiver_name',n)]);},getTransferDeclinedSnippet:function j(k,l,m,n,o){if(k){return h._("{receiver_name} didn't accept your {amount} payment.",[h.param('receiver_name',n),h.param('amount',o)]);}else if(l){return h._("You didn't accept {sender name}'s {amount} payment.",[h.param('sender name',m),h.param('amount',o)]);}else return h._("{receiver_name} didn't accept {sender_name}'s {amount} payment.",[h.param('receiver_name',n),h.param('sender_name',m),h.param('amount',o)]);},getTransferSentSnippet:function j(k,l,m,n,o){if(k){return h._("You sent {receiver name} {amount}.",[h.param('receiver name',n),h.param('amount',o)]);}else if(l){return h._("{name} sent you {amount}.",[h.param('name',m),h.param('amount',o)]);}else return h._("{sender name} sent {receiver name} {amount}.",[h.param('sender name',m),h.param('receiver name',n),h.param('amount',o)]);},getTransferSnippetByStatus:function j(k,l,m,n,o,p){var q=[l,m,n,o,p],r=k||c('P2PTransferStatus').PENDING_SENDER_INITED;switch(r){case c('P2PTransferStatus').CANCELED_DECLINED:return this.getTransferDeclinedSnippet.apply(this,q);case c('P2PTransferStatus').CANCELED_SENDER_RISK:case c('P2PTransferStatus').CANCELED_RECIPIENT_RISK:case c('P2PTransferStatus').CANCELED_SYSTEM_FAIL:case c('P2PTransferStatus').CANCELED_EXPIRED:case c('P2PTransferStatus').CANCELED_SAME_CARD:return this.getTransferCanceledSnippet.apply(this,q);}return this.getTransferSentSnippet.apply(this,q);}};f.exports=i;}),null);
__d('MercuryAttachmentSnippetRenderer',['fbt','CurrentUser','MercuryAttachmentSnippetType','MercuryAttachmentType','MercuryAudioType','MercuryGiftSnippetRenderer','P2PSnippetStringUtils','StickerConstants','StoryAttachmentStyle'],(function a(b,c,d,e,f,g,h){'use strict';var i={getAttachmentSnippetType:function j(k){if(this._hasOnlyPhotos(k))return c('MercuryAttachmentSnippetType').PHOTO;if(this._hasOnlyAnimatedImages(k))return c('MercuryAttachmentSnippetType').GIF;if(this._hasOnlyVideo(k))return c('MercuryAttachmentSnippetType').VIDEO;if(this._hasAudioClip(k))return c('MercuryAttachmentSnippetType').AUDIO_CLIP;if(this._hasLikeSticker(k))return c('MercuryAttachmentSnippetType').LIKE_STICKER;if(this._hasSticker(k))return c('MercuryAttachmentSnippetType').STICKER;if(this._hasThirdPartySticker(k))return c('MercuryAttachmentSnippetType').THIRDPARTYSTICKER;if(this._hasShare(k))return c('MercuryAttachmentSnippetType').SHARE;if(this._hasGift(k))return c('MercuryAttachmentSnippetType').GIFT;if(this._hasError(k))return c('MercuryAttachmentSnippetType').ERROR;if(this._hasFile(k))return c('MercuryAttachmentSnippetType').FILE;return c('MercuryAttachmentSnippetType').MIXED;},renderAttachmentSnippetText:function j(k,l,m,n){switch(k){case c('MercuryAttachmentSnippetType').PHOTO:return this._renderPhotoAttachmentSnippetText(l,m,this._getPhotoAttachments(n));case c('MercuryAttachmentSnippetType').GIF:return this._renderAnimatedImagesAttachmentSnippetText(l,m,this._getAnimatedImageAttachments(n));case c('MercuryAttachmentSnippetType').VIDEO:return l?h._("You sent a video."):h._("{sender name} sent a video.",[h.param('sender name',m)]);case c('MercuryAttachmentSnippetType').AUDIO_CLIP:return l?h._("You sent a voice message."):h._("{name} sent a voice message.",[h.param('name',m)]);case c('MercuryAttachmentSnippetType').STICKER:case c('MercuryAttachmentSnippetType').LIKE_STICKER:case c('MercuryAttachmentSnippetType').THIRDPARTYSTICKER:return l?h._("You sent a sticker."):h._("{name} sent a sticker.",[h.param('name',m)]);case c('MercuryAttachmentSnippetType').SHARE:if(n&&this._hasP2PPayment(n))return this._renderP2PPaymentSnippetText(n[0]);if(n&&this._hasP2PPaymentRequest(n))return this._renderP2PPaymentRequestSnippetText(n[0]);if(n&&this._hasBusinessMessage(n))return this._renderBusinessMessageSnippetText(n[0],m);if(n&&this._hasLocation(n))return l?h._("You sent a location."):h._("{sender name} sent a location.",[h.param('sender name',m)]);if(n&&this._hasLiveLocation(n))return l?h._("You sent a live location."):h._("{sender name} sent a live location.",[h.param('sender name',m)]);return l?h._("You sent a link."):h._("{sender name} sent a link.",[h.param('sender name',m)]);case c('MercuryAttachmentSnippetType').GIFT:return c('MercuryGiftSnippetRenderer').renderText(l,m);case c('MercuryAttachmentSnippetType').FILE:return l?h._("You sent an attachment."):h._("{sender name} sent an attachment.",[h.param('sender name',m)]);case c('MercuryAttachmentSnippetType').ERROR:return l?h._("You sent an attachment."):h._("{sender name} sent an attachment.",[h.param('sender name',m)]);default:return '';}},_hasOnlyPhotos:function j(k){return this._getPhotoAttachments(k).length===k.length;},_hasThirdPartySticker:function j(k){return k.length===1&&k[0].attach_type===c('MercuryAttachmentType').THIRDPARTYSTICKER;},_hasOnlyAnimatedImages:function j(k){return this._getAnimatedImageAttachments(k).length===k.length;},_hasOnlyVideo:function j(k){return k.length===1&&k[0].attach_type===c('MercuryAttachmentType').VIDEO;},_hasAudioClip:function j(k){var l=k[0].metadata&&k[0].metadata.type;return k.length===1&&(l===c('MercuryAudioType').AudioClip||l===c('MercuryAudioType').VoiceMessageWithTranscript);},_hasBusinessMessage:function j(k){return this._hasSingleShareAttachmentOfStyle(k,c('StoryAttachmentStyle').BUSINESS_MESSAGE_ITEMS);},_hasSticker:function j(k){return k.length===1&&k[0].attach_type===c('MercuryAttachmentType').STICKER;},_hasLikeSticker:function j(k){if(k.length<1)return false;var l=k[0].metadata&&k[0].metadata.stickerID;return k.length===1&&(l==c('StickerConstants').LIKE_STICKER_ID||l==c('StickerConstants').HOT_LIKE_SMALL_STICKER_ID||l==c('StickerConstants').HOT_LIKE_MEDIUM_STICKER_ID||l==c('StickerConstants').HOT_LIKE_LARGE_STICKER_ID);},_hasLocation:function j(k){return this._hasSingleShareAttachmentOfStyle(k,c('StoryAttachmentStyle').MESSAGE_LOCATION);},_hasLiveLocation:function j(k){return this._hasSingleShareAttachmentOfStyle(k,c('StoryAttachmentStyle').MESSAGE_LIVE_LOCATION);},_hasP2PPayment:function j(k){return this._hasSingleShareAttachmentOfStyle(k,c('StoryAttachmentStyle').ORION);},_hasP2PPaymentRequest:function j(k){return this._hasSingleShareAttachmentOfStyle(k,c('StoryAttachmentStyle').ORION_REQUEST);},_hasSingleShareAttachmentOfStyle:function j(k,l){return k.length===1&&k[0].attach_type===c('MercuryAttachmentType').SHARE&&k[0].share.style_list.indexOf(l)>=0;},_hasShare:function j(k){return k.length===1&&k[0].attach_type===c('MercuryAttachmentType').SHARE;},_hasError:function j(k){return k.length===1&&k[0].attach_type===c('MercuryAttachmentType').ERROR;},_hasGift:function j(k){return k.length===1&&k[0].attach_type===c('MercuryAttachmentType').GIFT;},_hasFile:function j(k){return k.length===1&&k[0].attach_type===c('MercuryAttachmentType').FILE;},_getPhotoAttachments:function j(k){if(!k)return [];return k.filter(function(l){return l.attach_type===c('MercuryAttachmentType').PHOTO;});},_getAnimatedImageAttachments:function j(k){if(!k)return [];return k.filter(function(l){return l.attach_type===c('MercuryAttachmentType').ANIMATED_IMAGE;});},_renderPhotoAttachmentSnippetText:function j(k,l,m){if(m.length===1){if(k){return h._("You sent a photo.");}else return h._("{name} sent a photo.",[h.param('name',l)]);}else if(k){return h._({"*":"You sent {num_photos} photos."},[h.param('num_photos',m.length,[0])]);}else return h._({"*":"{name} sent {num_photos} photos."},[h.param('name',l),h.param('num_photos',m.length,[0])]);},_renderAnimatedImagesAttachmentSnippetText:function j(k,l,m){if(m.length===1){if(k){return h._("You sent a GIF.");}else return h._("{name} sent a GIF.",[h.param('name',l)]);}else if(k){return h._("You sent {num_animated_images} GIFs.",[h.param('num_animated_images',m.length)]);}else return h._("{name} sent {num_animated_images} GIFs.",[h.param('name',l),h.param('num_animated_images',m.length)]);},_renderBusinessMessageSnippetText:function j(k,l){var m=k.share.target,n=m&&m.message||h._("{sender name} sent an attachment.",[h.param('sender name',l)]);return n;},_renderP2PPaymentSnippetText:function j(k){var l=k.share.target;return this.renderP2PPaymentSnippetText(c('CurrentUser').getID()===l.sender.id,l.sender.name,l.amountWithSymbol,l.status,c('CurrentUser').getID()===l.receiver.id,l.receiver.name);},_renderP2PPaymentRequestSnippetText:function j(k){var l=k.share.target;return this.renderP2PPaymentRequestSnippetText(c('CurrentUser').getID()===l.requester.id,l.requester.name,l.amountWithSymbol,l.currentStatus,c('CurrentUser').getID()===l.requestee.id,l.requestee.name);},renderP2PPaymentSnippetText:function j(k,l,m,n,o,p){return c('P2PSnippetStringUtils').getTransferSnippetByStatus(n,k,o||false,l||'',p||'',m);},renderP2PPaymentRequestSnippetText:function j(k,l,m,n,o,p){return c('P2PSnippetStringUtils').getRequestSnippetByStatus(n,k,o||false,l||'',p||'',m);}};f.exports=i;}),null);