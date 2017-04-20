if (self.CavalryLogger) { CavalryLogger.start_js(["tEyk\/"]); }

__d("MNAdsLoggerEventEnum",[],(function a(b,c,d,e,f,g){f.exports={LINK_CLICK:"messenger_ads_link_click",LINK_CLICK_CTA:"messenger_ads_link_click_cta",MESSAGE_SEEN_THREAD:"messenger_ads_message_seen_thread",MESSAGE_SEEN_INBOX:"messenger_ads_message_seen_inbox",MESSAGE_SEEN_REQUEST:"messenger_ads_message_seen_request"};}),null);
__d("MercuryAttachmentConstants",[],(function a(b,c,d,e,f,g){var h={SIDE_LENGTH:9};f.exports=h;}),null);
__d('FBOverlayBase.react',['React'],(function a(b,c,d,e,f,g){var h,i;h=babelHelpers.inherits(j,c('React').Component);i=h&&h.prototype;j.prototype.render=function(){'use strict';return c('React').Children.only(this.props.children);};function j(){'use strict';h.apply(this,arguments);}f.exports=j;}),null);
__d('FBOverlayElement.react',['cx','React','joinClasses'],(function a(b,c,d,e,f,g,h){var i,j,k=c('React').PropTypes,l={horizontal:{left:"_32rg",right:"_32rh",fit:c('joinClasses')("_32rg","_32rh")},vertical:{top:"_32ri",bottom:"_32rj",fit:c('joinClasses')("_32ri","_32rj")}};i=babelHelpers.inherits(m,c('React').Component);j=i&&i.prototype;m.prototype.render=function(){'use strict';var n=c('React').Children.only(this.props.children),o=c('joinClasses')(n.props.className,"_32rk",l.horizontal[this.props.horizontal],l.vertical[this.props.vertical]);return c('React').cloneElement(n,{className:o});};function m(){'use strict';i.apply(this,arguments);}m.propTypes={horizontal:k.oneOf(['left','right','fit']),vertical:k.oneOf(['top','bottom','fit'])};m.defaultProps={horizontal:'fit',vertical:'fit'};f.exports=m;}),null);
__d('FBOverlayContainer.react',['cx','invariant','FBOverlayBase.react','FBOverlayElement.react','React','joinClasses'],(function a(b,c,d,e,f,g,h,i){var j,k;j=babelHelpers.inherits(l,c('React').Component);k=j&&j.prototype;l.prototype.render=function(){'use strict';return c('React').createElement('div',babelHelpers['extends']({},this.props,{className:c('joinClasses')(this.props.className,"_23n-")}),this.props.children);};function l(){'use strict';j.apply(this,arguments);}l.propTypes={children:function m(n,o){var p=n[o],q=0;c('React').Children.forEach(p,function(r){if(r===null||r===undefined)return;switch(r.type){case c('FBOverlayBase.react'):q++;break;case c('FBOverlayElement.react'):break;default:i(0);}});q===1||i(0);}};f.exports=l;}),null);
__d('MessengerAdsWebTypedLogger',['Banzai','GeneratedLoggerUtils','nullthrows'],(function a(b,c,d,e,f,g){'use strict';function h(){this.clear();}h.prototype.log=function(){c('GeneratedLoggerUtils').log('messenger_ads_web:MessengerAdsWebLoggerConfig',this.$MessengerAdsWebTypedLogger1,c('Banzai').BASIC);};h.prototype.logVital=function(){c('GeneratedLoggerUtils').log('messenger_ads_web:MessengerAdsWebLoggerConfig',this.$MessengerAdsWebTypedLogger1,c('Banzai').VITAL);};h.prototype.clear=function(){this.$MessengerAdsWebTypedLogger1={};return this;};h.prototype.updateData=function(j){this.$MessengerAdsWebTypedLogger1=babelHelpers['extends']({},this.$MessengerAdsWebTypedLogger1,j);return this;};h.prototype.setEvent=function(j){this.$MessengerAdsWebTypedLogger1.event=j;return this;};h.prototype.setIsSponsored=function(j){this.$MessengerAdsWebTypedLogger1.is_sponsored=j;return this;};h.prototype.setItemID=function(j){this.$MessengerAdsWebTypedLogger1.item_id=j;return this;};h.prototype.setMessageID=function(j){this.$MessengerAdsWebTypedLogger1.message_id=j;return this;};h.prototype.setMessageTimestamp=function(j){this.$MessengerAdsWebTypedLogger1.message_timestamp=j;return this;};h.prototype.setPageID=function(j){this.$MessengerAdsWebTypedLogger1.page_id=j;return this;};h.prototype.setVC=function(j){this.$MessengerAdsWebTypedLogger1.vc=j;return this;};var i={event:true,is_sponsored:true,item_id:true,message_id:true,message_timestamp:true,page_id:true,vc:true};f.exports=h;}),null);
__d('ChatImageArrowDirection',['keyMirror'],(function a(b,c,d,e,f,g){'use strict';var h=c('keyMirror')({BOTH:null,LEFT:null,RIGHT:null});f.exports=h;}),null);
__d('ChatImageWithArrow.react',['cx','ChatImageArrowDirection','Link.react','MercuryAttachmentConstants','React','XUISpinner.react','joinClasses'],(function a(b,c,d,e,f,g,h){'use strict';var i,j,k=c('React').PropTypes,l=30,m=15;i=babelHelpers.inherits(n,c('React').Component);j=i&&i.prototype;function n(){var o,p;for(var q=arguments.length,r=Array(q),s=0;s<q;s++)r[s]=arguments[s];return p=(o=j.constructor).call.apply(o,[this].concat(r)),this.$ChatImageWithArrow3=function(){return Math.max(this.props.width,m);}.bind(this),this.$ChatImageWithArrow6=function(){return Math.max(this.props.height,l);}.bind(this),this.$ChatImageWithArrow5=function(t){if(this.props.onClick)return c('React').createElement(c('Link.react'),{onClick:this.props.onClick},t);return t;}.bind(this),this.$ChatImageWithArrow7=function(t,u,v,w){if(u===c('ChatImageArrowDirection').LEFT){return 'translate('+v+'px, '+w+'px)'+'rotate(45deg)';}else return 'translate('+(t-v)+'px, '+w+'px)'+'rotate(45deg)';},this.$ChatImageWithArrow8=function(t,u,v,w){if(u===c('ChatImageArrowDirection').LEFT){return 'rotate(-45deg)'+'translate(-'+(this.$ChatImageWithArrow1+v)+'px,'+'-'+w+'px)';}else return 'rotate(-45deg)'+'translate(-'+(t-v)+'px, -'+w+'px)';}.bind(this),this.$ChatImageWithArrow4=function(){var t={width:this.props.sideLength,height:this.props.sideLength};if(this.props.source)t.backgroundImage='url('+this.props.source+')';var u={width:this.props.sideLength,height:this.props.sideLength};if(this.props.source)u.opacity=0;var v={width:this.$ChatImageWithArrow3(),height:this.$ChatImageWithArrow6()};if(this.props.source){v.backgroundImage='url('+this.props.source+')';v.backgroundSize='cover';}return c('React').createElement('div',{className:"_4yp6"},c('React').createElement('div',{className:"_4ypb _3_om",style:v},c('React').createElement(c('XUISpinner.react'),{size:'small'})));}.bind(this),p;}n.prototype.render=function(){this.$ChatImageWithArrow1=Math.floor(this.props.sideLength/Math.sqrt(2));this.$ChatImageWithArrow2=Math.ceil(this.$ChatImageWithArrow3()+this.$ChatImageWithArrow1);if(this.props.isLoading)return this.$ChatImageWithArrow4();var o=c('joinClasses')("_4yp6"+(this.props.round?' '+"_3lk2":''),this.props.rootClassName);return this.$ChatImageWithArrow5(c('React').createElement('div',{className:o},c('React').createElement('div',{className:"_52kr"+(this.props.round?' '+"_3_om":''),style:{width:this.$ChatImageWithArrow3(),height:this.$ChatImageWithArrow6()}},c('React').createElement('div',{className:"_4yp9",style:{backgroundImage:'url('+this.props.source+')',width:this.$ChatImageWithArrow3(),height:this.$ChatImageWithArrow6()}}))));};n.propTypes={arrowDirection:k.oneOf(Object.keys(c('ChatImageArrowDirection'))),onClick:k.func,height:k.number.isRequired,isLoading:k.bool,round:k.bool,rootClassName:k.string,sideLength:k.number,source:k.string,width:k.number.isRequired};n.defaultProps={sideLength:c('MercuryAttachmentConstants').SIDE_LENGTH,isLoading:false,round:false};f.exports=n;}),null);
__d('MessengerAttachmentImageBlockUtils',['isFacebookURI','URI'],(function a(b,c,d,e,f,g){'use strict';function h(k){return k.getPath().indexOf('/moments_app')===0;}function i(k,l){return k<=300&&l<=300;}function j(k,l,m){if(i(k,l))return true;return c('isFacebookURI')(m)&&!m.isLinkshimURI()&&!h(m);}f.exports={isIcon:j};}),null);
__d('MessengerAttachmentImageBlock.react',['cx','React','URI','joinClasses','MessengerAttachmentImageBlockUtils'],(function a(b,c,d,e,f,g,h){'use strict';var i,j,k=c('React').PropTypes;i=babelHelpers.inherits(l,c('React').Component);j=i&&i.prototype;function l(){var m,n;for(var o=arguments.length,p=Array(o),q=0;q<o;q++)p[q]=arguments[q];return n=(m=j.constructor).call.apply(m,[this].concat(p)),this.$MessengerAttachmentImageBlock3=function(){var r=this.props.attachment.properties||this.props.attachment.media.image_size||{},s=r.height,t=r.width;if(s&&t){s=parseInt(s,10);t=parseInt(t,10);return {height:s,width:t};}return {height:0,width:0};}.bind(this),n;}l.prototype.render=function(){return c('React').createElement('div',{className:c('joinClasses')(this.props.className,this.$MessengerAttachmentImageBlock1())},this.$MessengerAttachmentImageBlock2(),c('React').createElement('div',{className:"_5swm"},this.props.children));};l.prototype.$MessengerAttachmentImageBlock2=function(){if(!this.props.attachment.media||!this.props.attachment.media.image)return null;var m=this.$MessengerAttachmentImageBlock3(),n=m.height,o=m.width,p=n>o,q=new (c('URI'))(this.props.attachment.uri),r=c('MessengerAttachmentImageBlockUtils').isIcon(n,o,q),s=n&&o?n/o*100:100,t=p||r?.2:1,u=p||r?s:52,v={backgroundImage:'url('+this.props.attachment.media.image+')',minHeight:'0px',paddingBottom:p&&s>150?'136px':u*t+'%'};if(this.props.attachment.description&&this.props.attachment.source)v.minHeight='112px';return c('React').createElement('div',{className:"_3xn1",style:v});};l.prototype.$MessengerAttachmentImageBlock1=function(){if(!this.props.attachment.media||!this.props.attachment.media.image)return "_3xn3 _5swn";var m=this.$MessengerAttachmentImageBlock3(),n=m.height,o=m.width,p=n>o,q=new (c('URI'))(this.props.attachment.uri),r=c('MessengerAttachmentImageBlockUtils').isIcon(n,o,q);return "_3xn3"+(r&&!p?' '+"_3xn5":'')+(p?' '+"_3xn6":'')+(o>=n&&!r?' '+"_3xn7":'');};l.propTypes={attachment:k.object.isRequired};f.exports=l;}),null);
__d('MercuryShareAttachmentReactShape',['React'],(function a(b,c,d,e,f,g){'use strict';var h=c('React').PropTypes,i=h.shape({share_id:h.string,description:h.string,media:h.shape({image:h.string,image_size:h.shape({height:h.number,width:h.number}),duration:h.number,playable:h.bool,source:h.string}),source:h.string,style_list:h.arrayOf(h.string),subattachments:h.array,target:h.object,title:h.string,properties:h.object,uri:h.string,action_links:h.array,messaging_attribution:h.shape({attribution_type:h.string,attribution_id:h.string,name:h.string,icon_url:h.string}),messenger_ctas:h.arrayOf(h.shape({id:h.string,action_title:h.string,action_url:h.string,action_open_type:h.number,is_high_confidence:h.bool,is_mutable_by_server:h.bool,user_confirmation:h.bool,native_url:h.string,is_disabled:h.bool,nested_ctas:h.array}))}).isRequired;f.exports=i;}),null);
__d('MercuryShareImage.react',['cx','ChatImageArrowDirection','ChatImageWithArrow.react','React'],(function a(b,c,d,e,f,g,h){'use strict';var i,j,k=c('React').PropTypes;i=babelHelpers.inherits(l,c('React').Component);j=i&&i.prototype;l.prototype.render=function(){return c('React').createElement('div',{className:"_4hsl"},c('React').createElement(c('ChatImageWithArrow.react'),{arrowDirection:c('ChatImageArrowDirection').BOTH,height:this.props.height,round:!!this.props.round,source:this.props.source,width:this.props.width}));};function l(){i.apply(this,arguments);}l.propTypes={height:k.number.isRequired,round:k.bool,source:k.string.isRequired,width:k.number.isRequired};f.exports=l;}),null);
__d('LineClamp.react',['cx','React','Locale','getVendorPrefixedName','joinClasses'],(function a(b,c,d,e,f,g,h){'use strict';var i,j,k=c('React').PropTypes,l=c('getVendorPrefixedName')('lineClamp');i=babelHelpers.inherits(m,c('React').Component);j=i&&i.prototype;function m(){var n,o;for(var p=arguments.length,q=Array(p),r=0;r<p;r++)q[r]=arguments[r];return o=(n=j.constructor).call.apply(n,[this].concat(q)),this.$LineClamp1=function(){var s;if(this.props.lineHeight&&!this.props.customEllipsisDisableGradient)s={bottom:this.props.lineHeight+'px'};var t;if(this.props.customEllipsis&&this.props.customEllipsisDisableGradient){t=c('Locale').isRTL()?"_1osp":"_1osq";}else t=c('Locale').isRTL()?"_4ik3 _2k5c":"_4ik3 _2k5d";return c('React').createElement('div',{style:s,className:t,key:'ellipsis'},this.props.customEllipsis?this.props.customEllipsis:'\u2026');}.bind(this),o;}m.prototype.render=function(){var n=!!l&&!this.props.disableNative,o=c('joinClasses')(this.props.className,"_4ik4"+(n?' '+"_4ik5":'')),p=this.props.children,q={};if(this.props.lineHeight){q={lineHeight:this.props.lineHeight+'px'};if(this.props.fitHeightToShorterText){q=babelHelpers['extends']({},q,{maxHeight:this.props.lineHeight*this.props.lines});}else q=babelHelpers['extends']({},q,{height:this.props.lineHeight*this.props.lines});}if(n){q[l]=this.props.lines;}else{o=c('joinClasses')(o,'clearfix');if(this.props.customEllipsisDisableGradient){p=[c('React').createElement('div',{className:"_1osu",key:'spacer'}),this.$LineClamp1(),c('React').createElement('div',{className:"_1osv",key:'inner'},this.props.children)];}else p=[c('React').createElement('div',{className:"_4ik6",key:'inner'},p),this.$LineClamp1()];}return c('React').createElement('div',{className:o,style:q},p);};m.propTypes={customEllipsis:k.node,disableNative:k.bool,lineHeight:k.number,lines:k.number.isRequired,customEllipsisDisableGradient:k.bool,fitHeightToShorterText:k.bool};f.exports=m;}),null);
__d('MercuryFallbackShareAttachmentTextBlock.react',['cx','LineClamp.react','MercuryShareAttachmentRenderLocations','MercuryShareAttachmentReactShape','React'],(function a(b,c,d,e,f,g,h){'use strict';var i,j,k=c('React').PropTypes;i=babelHelpers.inherits(l,c('React').Component);j=i&&i.prototype;l.prototype.render=function(){if(!this.props||!this.props.attachment)return c('React').createElement('div',{className:"__6j"});if(c('MercuryShareAttachmentRenderLocations').MESSENGER===this.props.location)return c('React').createElement('div',{className:"__6j"},this.renderMessengerTitle(),this.renderMessengerDescription(),this.renderMessengerSource());return c('React').createElement('div',{className:"__6j"},this.renderTitle(),this.renderDescription(),this.renderSource(),this.props.extraComponent);};l.prototype.renderMessengerTitle=function(){if(!this.props.attachment.title)return null;return c('React').createElement('div',{className:"__6k"},c('React').createElement(c('LineClamp.react'),{customEllipsis:" ",lines:2,lineHeight:18},this.props.attachment.title));};l.prototype.renderMessengerDescription=function(){if(!this.props.attachment.description)return null;return c('React').createElement('div',{className:"__6l"},c('React').createElement(c('LineClamp.react'),{customEllipsis:" ",lines:2,lineHeight:16},this.props.attachment.description));};l.prototype.renderMessengerSource=function(){if(!this.props.attachment.source)return null;return c('React').createElement('div',{className:"__6m"},this.props.attachment.source);};l.prototype.renderTitle=function(){if(!this.props.attachment.title)return null;return c('React').createElement('div',{className:"__6k"+(!this.props.attachment.uri&&!this.props.attachment.description?' '+"_2xsq":'')+(!!this.props.extraComponent?' '+"_1dw9":'')},this.props.attachment.title);};l.prototype.renderDescription=function(){if(!this.props.attachment.description)return null;return c('React').createElement('div',{className:"__6l"},this.props.attachment.description);};l.prototype.renderSource=function(){if(!this.props.attachment.source)return null;return c('React').createElement('div',{className:"__6m"},this.props.attachment.source);};function l(){i.apply(this,arguments);}l.propTypes={attachment:c('MercuryShareAttachmentReactShape'),extraComponent:k.object,location:k.oneOf(c('MercuryShareAttachmentRenderLocations').getValues())};f.exports=l;}),null);
__d('MercuryFallbackShareAttachmentContent.react',['cx','Image.react','ImageBlock.react','MercuryFallbackShareAttachmentTextBlock.react','MercuryShareAttachmentRenderLocations','MercuryShareAttachmentReactShape','MercuryShareImage.react','MessengerAttachmentImageBlock.react','React','joinClasses'],(function a(b,c,d,e,f,g,h){'use strict';var i,j,k=c('React').PropTypes,l=72;i=babelHelpers.inherits(m,c('React').Component);j=i&&i.prototype;m.prototype.renderTextBlock=function(){return c('React').createElement(c('MercuryFallbackShareAttachmentTextBlock.react'),this.props);};m.prototype.renderChatImage=function(n){return c('React').createElement(c('ImageBlock.react'),{className:n,spacing:'medium'},c('React').createElement(c('MercuryShareImage.react'),{height:l,source:this.props.attachment.media.image,width:l}),c('React').createElement('div',{style:{display:'flex',justifyContent:'center',flexDirection:'column',height:l}},this.renderTextBlock()));};m.prototype.renderMessengerImage=function(n){return c('React').createElement(c('MessengerAttachmentImageBlock.react'),{className:n,attachment:this.props.attachment},this.renderTextBlock(),this.props.children);};m.prototype.renderDefaultImage=function(n){return c('React').createElement(c('ImageBlock.react'),{className:c('joinClasses')(this.props.className,n)},c('React').createElement(c('Image.react'),{className:"__6n",src:this.props.attachment.media.image,width:l}),this.renderTextBlock(),this.props.children);};m.prototype.getCSSClasses=function(){var n=this.props.attachment,o=this.props.location;return (c('MercuryShareAttachmentRenderLocations').CHAT===o?"_49or":'')+(c('MercuryShareAttachmentRenderLocations').CHAT_PREVIEW===o?' '+"_324d":'')+(c('MercuryShareAttachmentRenderLocations').CHAT!==o?' '+"_tih":'')+(!(n&&n.media.image)?' '+"_49ou":'')+(' '+"_310t");};m.prototype.render=function(){var n=this.props.attachment,o=this.props.location,p=this.getCSSClasses();if(n.media&&n.media.image){if(c('MercuryShareAttachmentRenderLocations').CHAT===o||c('MercuryShareAttachmentRenderLocations').CHAT_PREVIEW===o){return this.renderChatImage(p);}else if(c('MercuryShareAttachmentRenderLocations').MESSENGER===o)return this.renderMessengerImage(p);return this.renderDefaultImage(p);}return c('React').createElement('div',{className:c('joinClasses')(this.props.className,p)},this.renderTextBlock(),this.props.children);};function m(){i.apply(this,arguments);}m.propType={attachment:c('MercuryShareAttachmentReactShape'),location:k.oneOf(c('MercuryShareAttachmentRenderLocations').getValues())};f.exports=m;}),null);
__d("XMessengerDotComSavedForLaterNuxSeenController",["XController"],(function a(b,c,d,e,f,g){f.exports=c("XController").create("\/save\/savemessagenux\/",{});}),null);
__d('MercuryFallbackShareAttachment.react',['cx','fbt','AsyncRequest','CollectionsDisplaySurface','CollectionCurationMechanisms','Link.react','MercuryFallbackShareAttachmentContent.react','MercuryShareAttachmentRenderLocations','MercuryShareAttachmentReactShape','MessengerAdsWebTypedLogger','MessengerDotComSaveModule','MNAdsLoggerEventEnum','React','ReactFragment','SaveMessageUtils','XMessengerDotComSavedForLaterNuxSeenController','XUIAmbientNUX.react'],(function a(b,c,d,e,f,g,h,i){'use strict';var j,k,l=c('React').PropTypes,m='focus',n='click',o='scroll',p=10000,q=30000;j=babelHelpers.inherits(r,c('React').Component);k=j&&j.prototype;function r(){k.constructor.call(this);this.state={showNux:false,nuxDisabled:false};}r.prototype.renderLink=function(s){if(c('MercuryShareAttachmentRenderLocations').isPreview(this.props.location)||!this.props.attachment.uri)return s;return c('React').createElement(c('Link.react'),{className:"_5rw4",href:this.props.attachment.uri,onClick:this.$MercuryFallbackShareAttachment1.bind(this),target:'_blank'},s,this.renderLayers());};r.prototype.render=function(){return this.renderLink(c('React').createElement(c('MercuryFallbackShareAttachmentContent.react'),babelHelpers['extends']({ref:'mercury_fallback_share_attachment'},this.props)));};r.prototype.$MercuryFallbackShareAttachment1=function(event){if(this.props.isSponsored){var s=this.props.attachment&&this.props.attachment.subattachments;if(!s)return;for(var t=s,u=Array.isArray(t),v=0,t=u?t:t[typeof Symbol==='function'?Symbol.iterator:'@@iterator']();;){var w;if(u){if(v>=t.length)break;w=t[v++];}else{v=t.next();if(v.done)break;w=v.value;}var x=w;new (c('MessengerAdsWebTypedLogger'))().setEvent(c('MNAdsLoggerEventEnum').LINK_CLICK).setIsSponsored(this.props.isSponsored).setItemID(x&&x.id).setMessageID(this.props.messageID).setPageID(this.props.pageID).log();}}if(this.state.nuxDisabled||!this.$MercuryFallbackShareAttachment2())return;this.$MercuryFallbackShareAttachment3();this.interactionTime=0;this.cancelMinConsumeTimeout=setTimeout(function(){if(!this.$MercuryFallbackShareAttachment4())this.setState({showNux:true,nuxDisabled:true});}.bind(this),p);this.cancelMaxConsumeTimeout=setTimeout(function(){if(!this.$MercuryFallbackShareAttachment4()){this.setState({showNux:false,nuxDisabled:false});this.clearTimeouts();}}.bind(this),q);var y=Date.now();this.cancelWindowInteractionTimeout=setTimeout(function(){this.$MercuryFallbackShareAttachment5(function(){if(!this.interactionTime)this.interactionTime=Date.now()-y;}.bind(this));}.bind(this),0);};r.prototype.clearTimeouts=function(){if(this.cancelWindowInteractionTimeout){clearTimeout(this.cancelWindowInteractionTimeout);this.cancelWindowInteractionTimeout=null;}if(this.cancelMaxConsumeTimeout){clearTimeout(this.cancelMaxConsumeTimeout);this.cancelMaxConsumeTimeout=null;}if(this.cancelMinConsumeTimeout){clearTimeout(this.cancelMinConsumeTimeout);this.cancelMinConsumeTimeout=null;}};r.prototype.onNUXCloseButtonClick=function(){this.setState({showNux:false});this.$MercuryFallbackShareAttachment6();this.$MercuryFallbackShareAttachment7();this.clearTimeouts();};r.prototype.renderLayers=function(){return this.$MercuryFallbackShareAttachment2()?c('ReactFragment').create(c('React').createElement(c('XUIAmbientNUX.react'),{contextRef:function(){return this.refs.mercury_fallback_share_attachment;}.bind(this),shown:this.state.showNux,onCloseButtonClick:this.onNUXCloseButtonClick.bind(this),position:'below',width:'custom',customwidth:300},i._("You can now save links and videos to Facebook by right clicking on a message."))):null;};r.prototype.$MercuryFallbackShareAttachment3=function(){if(!this.$MercuryFallbackShareAttachment8){this.$MercuryFallbackShareAttachment9=[];this.$MercuryFallbackShareAttachment8=[Event.listen(window,'click',this.$MercuryFallbackShareAttachment10.bind(this,n)),Event.listen(window,'focus',this.$MercuryFallbackShareAttachment10.bind(this,m)),Event.listen(window,'scroll',this.$MercuryFallbackShareAttachment10.bind(this,o))];}};r.prototype.$MercuryFallbackShareAttachment10=function(s){this.$MercuryFallbackShareAttachment9.forEach(function(t){t.call(this,s);},this);};r.prototype.$MercuryFallbackShareAttachment5=function(s){this.$MercuryFallbackShareAttachment9.push(s);};r.prototype.$MercuryFallbackShareAttachment4=function(){return this.interactionTime&&this.interactionTime>0;};r.prototype.$MercuryFallbackShareAttachment7=function(){if(this.$MercuryFallbackShareAttachment8){while(this.$MercuryFallbackShareAttachment8.length)this.$MercuryFallbackShareAttachment8.pop().remove();this.$MercuryFallbackShareAttachment8=null;this.$MercuryFallbackShareAttachment9=null;}};r.prototype.$MercuryFallbackShareAttachment2=function(){return c('MessengerDotComSaveModule').eligible_for_nux&&this.$MercuryFallbackShareAttachment11();};r.prototype.$MercuryFallbackShareAttachment11=function(){var s=this.props.attachment;if(!s)return false;var t=s.style_list;return c('SaveMessageUtils').isSavableMessageAttachment(t);};r.prototype.$MercuryFallbackShareAttachment6=function(){new (c('AsyncRequest'))().setURI(c('XMessengerDotComSavedForLaterNuxSeenController').getURIBuilder().getURI()).setData({action:'impression',surface:c('CollectionsDisplaySurface').MESSENGER_DOT_COM_MESSAGE,mechanism:c('CollectionCurationMechanisms').SAVE_MESSAGE_NUX,object_id:this.props.message_id,collection_id:98}).send();};r.propTypes={attachment:c('MercuryShareAttachmentReactShape'),isSponsored:l.bool,location:l.oneOf(c('MercuryShareAttachmentRenderLocations').getValues()),messageID:l.string,pageID:l.string};f.exports=r;}),null);