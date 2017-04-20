if (self.CavalryLogger) { CavalryLogger.start_js(["dpe0f"]); }

__d('ChatFlyoutPlaceholder.react',['React','XUISpinner.react'],(function a(b,c,d,e,f,g){'use strict';var h={padding:'30px',textAlign:'center'},i=function j(){return c('React').createElement('div',{style:h},c('React').createElement(c('XUISpinner.react'),{size:'large'}));};f.exports=i;}),null);
__d('nl2br',['DOM'],(function a(b,c,d,e,f,g){var h=/(\r\n|[\r\n])/;function i(j){return j.split(h).map(function(k){return h.test(k)?c('DOM').create('br'):k;});}f.exports=i;}),18);
__d('ContextualLayerAutoFlip',['ContextualLayerDimensions','DOMDimensions','Vector','Rect','arrayContains','getDocumentScrollElement'],(function a(b,c,d,e,f,g){function h(j,k){k=new (c('Rect'))(k).convertTo(j.domain);var l=Math.max(j.l,k.l),m=Math.min(j.r,k.r);return Math.max(m-l,0);}function i(j){'use strict';this._layer=j;}i.prototype.enable=function(){'use strict';this._subscription=this._layer.subscribe('adjust',this._adjustOrientation.bind(this));if(this._layer.isShown())this._layer.updatePosition();};i.prototype.disable=function(){'use strict';this._subscription.unsubscribe();this._subscription=null;if(this._layer.isShown())this._layer.updatePosition();};i.prototype._adjustOrientation=function(j,k){'use strict';var l=this.getValidPositions(k);if(!l.length){k.invalidate();return;}var m=c('ContextualLayerDimensions').getViewportRect(this._layer),n=this._getValidAlignments(k),o,p,q;for(o=0;o<n.length;o++){k.setAlignment(n[o]);for(p=0;p<l.length;p++){k.setPosition(l[p]);q=c('ContextualLayerDimensions').getLayerRect(this._layer,k);if(m.contains(q))return;}}var r=-1;if(k.getPreferMoreContentShownRect()){var s=c('DOMDimensions').getDocumentDimensions(),t=new (c('Rect'))(m).convertTo('document'),u=99999;for(p=0;p<l.length;p++){k.setPosition(l[p]);q=c('ContextualLayerDimensions').getLayerRect(this._layer,k);var v=new (c('Rect'))(q).convertTo('document');if(v.l>=0&&v.r<=s.width&&v.t>=43&&v.b<=s.height){var w=t.l-v.l,x=v.r-t.r,y=t.t-v.t,z=v.b-t.b,aa=(w>0?w:0)+(x>0?x:0)+(y>0?y:0)+(z>0?z:0);if(aa<u){r=p;u=aa;}}}}if(r>=0){k.setPosition(l[r]);}else k.setPosition(c('arrayContains')(l,'below')?'below':l[0]);var ba,ca=0,da=0;for(o=0;o<n.length;o++){k.setAlignment(n[o]);q=c('ContextualLayerDimensions').getLayerRect(this._layer,k);ba=h(m,q);if(ba>da){da=ba;ca=o;}}k.setAlignment(n[ca]);};i.prototype.getValidPositions=function(j){'use strict';var k=[j.getPosition(),j.getOppositePosition()],l=this._layer.getContextScrollParent();if(l===window||l===c('getDocumentScrollElement')())return k;var m=this._layer.getContext(),n=c('Vector').getElementPosition(l,'viewport').y,o=c('Vector').getElementPosition(m,'viewport').y;if(j.isVertical()){return k.filter(function(q){if(q==='above'){return o>=n;}else{var r=n+l.offsetHeight,s=o+m.offsetHeight;return s<=r;}});}else{var p=n+l.offsetHeight;if(o>=n&&o+m.offsetHeight<=p){return k;}else return [];}};i.prototype._getValidAlignments=function(j){'use strict';var k=['left','right','center'],l=j.getAlignment(),m=k.indexOf(l);if(m>0){k.splice(m,1);k.unshift(l);}return k;};Object.assign(i.prototype,{_subscription:null});f.exports=i;}),null);
__d('ContextualLayerAutoFlipHorizontal',['ContextualLayerAutoFlip'],(function a(b,c,d,e,f,g){var h,i;h=babelHelpers.inherits(j,c('ContextualLayerAutoFlip'));i=h&&h.prototype;j.prototype.getValidPositions=function(k){'use strict';return [k.getPosition()];};function j(){'use strict';h.apply(this,arguments);}f.exports=j;}),null);
__d('ContextualLayerUpdateOnScroll',['Event'],(function a(b,c,d,e,f,g){function h(i){'use strict';this._layer=i;}h.prototype.enable=function(){'use strict';this._subscriptions=[this._layer.subscribe('show',this._attachScrollListener.bind(this)),this._layer.subscribe('hide',this._removeScrollListener.bind(this))];};h.prototype.disable=function(){'use strict';while(this._subscriptions.length)this._subscriptions.pop().unsubscribe();};h.prototype._attachScrollListener=function(){'use strict';if(this._listener)return;var i=this._layer.getContextScrollParent();this._listener=c('Event').listen(i,'scroll',this._layer.updatePosition.bind(this._layer));};h.prototype._removeScrollListener=function(){'use strict';this._listener&&this._listener.remove();this._listener=null;};Object.assign(h.prototype,{_subscriptions:[]});f.exports=h;}),null);
__d('Dispatcher_DEPRECATED',['invariant','monitorCodeUse'],(function a(b,c,d,e,f,g,h){'use strict';var i='ID_';function j(){this.$Dispatcher_DEPRECATED1={};this.$Dispatcher_DEPRECATED2=false;this.$Dispatcher_DEPRECATED3={};this.$Dispatcher_DEPRECATED4={};this.$Dispatcher_DEPRECATED5=1;}j.prototype.register=function(m,n){n=this.__genID(n);this.$Dispatcher_DEPRECATED1[n]=m;return n;};j.prototype.unregister=function(m){this.$Dispatcher_DEPRECATED1[m]||h(0);delete this.$Dispatcher_DEPRECATED1[m];};j.prototype.waitFor=function(m){this.$Dispatcher_DEPRECATED2||h(0);for(var n=0;n<m.length;n++){var o=m[n];if(this.$Dispatcher_DEPRECATED4[o]){this.$Dispatcher_DEPRECATED3[o]||h(0);continue;}this.$Dispatcher_DEPRECATED1[o]||h(0);this.$Dispatcher_DEPRECATED7(o);}};j.prototype.dispatch=function(m){l(this.$Dispatcher_DEPRECATED2,this.$Dispatcher_DEPRECATED6,m);this.$Dispatcher_DEPRECATED8(m);try{for(var n in this.$Dispatcher_DEPRECATED1){if(this.$Dispatcher_DEPRECATED4[n])continue;this.$Dispatcher_DEPRECATED7(n);}}finally{this.$Dispatcher_DEPRECATED9();}};j.prototype.isDispatching=function(){return this.$Dispatcher_DEPRECATED2;};j.prototype.$Dispatcher_DEPRECATED7=function(m){this.$Dispatcher_DEPRECATED4[m]=true;this.__invokeCallback(m,this.$Dispatcher_DEPRECATED1[m],this.$Dispatcher_DEPRECATED6);this.$Dispatcher_DEPRECATED3[m]=true;};j.prototype.__invokeCallback=function(m,n,o){n(o);};j.prototype.$Dispatcher_DEPRECATED8=function(m){for(var n in this.$Dispatcher_DEPRECATED1){this.$Dispatcher_DEPRECATED4[n]=false;this.$Dispatcher_DEPRECATED3[n]=false;}this.$Dispatcher_DEPRECATED6=m;this.$Dispatcher_DEPRECATED2=true;};j.prototype.$Dispatcher_DEPRECATED9=function(){delete this.$Dispatcher_DEPRECATED6;this.$Dispatcher_DEPRECATED2=false;};j.prototype.__genID=function(m){m=m||i+this.$Dispatcher_DEPRECATED5++;while(this.$Dispatcher_DEPRECATED1[m])m=i+this.$Dispatcher_DEPRECATED5++;return m;};function k(m){var n='<unknown>';if(!m)return n;if(typeof m.type==='string')return m.type;if(typeof m.actionType==='string')return m.actionType;if(!m.action)return n;if(typeof m.action.type==='string')return m.action.type;if(typeof m.action.actionType==='string')return m.action.actionType;return n;}function l(m,n,o){!m||h(0);}f.exports=j;}),18);
__d('ExplicitRegistrationDispatcherUtils',['ErrorUtils','FluxInternalConfig','emptyFunction','monitorCodeUse','setImmediate'],(function a(b,c,d,e,f,g){'use strict';var h,i=false,j=c('emptyFunction');f.exports={warn:j,inlineRequiresEnabled:i};}),null);
__d('ExplicitRegistrationDispatcher',['Dispatcher_DEPRECATED','ExplicitRegistrationDispatcherUtils','setImmediate'],(function a(b,c,d,e,f,g){'use strict';var h,i;h=babelHelpers.inherits(j,c('Dispatcher_DEPRECATED'));i=h&&h.prototype;function j(k){var l=k.strict;i.constructor.call(this);this.$ExplicitRegistrationDispatcher2=l;this.$ExplicitRegistrationDispatcher1={};}j.prototype.explicitlyRegisterStore=function(k){var l=k.getDispatchToken();this.$ExplicitRegistrationDispatcher1[l]=true;return l;};j.prototype.explicitlyRegisterStores=function(k){return k.map(function(l){return this.explicitlyRegisterStore(l);}.bind(this));};j.prototype.register=function(k,l){var m=this.__genID(l);this.$ExplicitRegistrationDispatcher1[m]=false;var n=i.register.call(this,this.$ExplicitRegistrationDispatcher4.bind(this,m,k),m);return n;};j.prototype.$ExplicitRegistrationDispatcher4=function(k,l,m){if(this.$ExplicitRegistrationDispatcher1[k]||!this.$ExplicitRegistrationDispatcher2){this.__invokeCallback(k,l,m);}};j.prototype.unregister=function(k){i.unregister.call(this,k);delete this.$ExplicitRegistrationDispatcher1[k];};j.prototype.__getMaps=function(){};f.exports=j;}),18);
__d('ExplicitRegistrationReactDispatcher',['ExplicitRegistrationDispatcher','ReactDOM'],(function a(b,c,d,e,f,g){'use strict';var h,i;h=babelHelpers.inherits(j,c('ExplicitRegistrationDispatcher'));i=h&&h.prototype;j.prototype.dispatch=function(k){c('ReactDOM').unstable_batchedUpdates(function(){i.dispatch.call(this,k);}.bind(this));};function j(){h.apply(this,arguments);}f.exports=j;}),null);
__d('LoadOnRender.react',['React','createCancelableFunction'],(function a(b,c,d,e,f,g){var h,i;h=babelHelpers.inherits(j,c('React').Component);i=h&&h.prototype;function j(k){'use strict';i.constructor.call(this,k);this.$LoadOnRender1=function(l){this.setState({Component:l});}.bind(this);this.state={Component:null,cancelableOnComponentLoad:c('createCancelableFunction')(this.$LoadOnRender1)};}j.prototype.componentWillMount=function(){'use strict';this.props.loader(this.state.cancelableOnComponentLoad);};j.prototype.componentWillUnmount=function(){'use strict';this.state.cancelableOnComponentLoad.cancel();};j.prototype.render=function(){'use strict';var k=this.state.Component;if(!k||this.props.forcePlaceholder)return this.props.placeholder;return c('React').cloneElement(this.props.component,{LazyLoadedComponent:k});};j.defaultProps={forcePlaceholder:false};f.exports=j;}),18);
__d('BootloadOnRender.react',['JSResource','LoadOnRender.react','React'],(function a(b,c,d,e,f,g){var h,i;h=babelHelpers.inherits(j,c('React').Component);i=h&&h.prototype;function j(){var k,l;'use strict';for(var m=arguments.length,n=Array(m),o=0;o<m;o++)n[o]=arguments[o];return l=(k=i.constructor).call.apply(k,[this].concat(n)),this.$BootloadOnRender1=function(p){c('JSResource').loadAll([this.props.loader],p);}.bind(this),l;}j.prototype.render=function(){'use strict';return c('React').createElement(c('LoadOnRender.react'),{placeholder:this.props.placeholder,loader:this.$BootloadOnRender1,component:this.props.component});};f.exports=j;}),18);
__d('isReactClassComponent',[],(function a(b,c,d,e,f,g){function h(i){return Boolean(typeof i==='function'&&i.prototype&&i.prototype.isReactComponent);}f.exports=h;}),18);
__d('LazyComponent.react',['React','isReactClassComponent'],(function a(b,c,d,e,f,g){var h,i;h=babelHelpers.inherits(j,c('React').Component);i=h&&h.prototype;j.prototype.getComponent=function(){'use strict';return this.$LazyComponent1;};j.prototype.render=function(){'use strict';var k=this.props,l=k.LazyLoadedComponent,m=babelHelpers.objectWithoutProperties(k,['LazyLoadedComponent']),n=c('isReactClassComponent')(l)?function(o){return this.$LazyComponent1=o;}.bind(this):null;return c('React').createElement(l,babelHelpers['extends']({ref:n},m));};function j(){'use strict';h.apply(this,arguments);}j.defaultProps={LazyLoadedComponent:function k(){return null;}};f.exports=j;}),18);
__d('ReactChildren',['React'],(function a(b,c,d,e,f,g){'use strict';var h=c('React').__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;f.exports=h.ReactChildren;}),null);
__d('ReactComponentWithPureRenderMixin',['shallowCompare'],(function a(b,c,d,e,f,g){'use strict';var h={shouldComponentUpdate:function i(j,k){return c('shallowCompare')(this,j,k);}};f.exports=h;}),18);
__d('ReactFragment',['ReactChildren','ReactElement','fbjs/lib/emptyFunction','fbjs/lib/invariant','fbjs/lib/warning'],(function a(b,c,d,e,f,g){'use strict';var h=/^\d+$/,i=false,j={create:function k(l){if(typeof l!=='object'||!l||Array.isArray(l)){c('fbjs/lib/warning')(false,'ReactFragment.create only accepts a single object. Got: %s',l);return l;}if(c('ReactElement').isValidElement(l)){c('fbjs/lib/warning')(false,'ReactFragment.create does not accept a ReactElement '+'without a wrapper object.');return l;}l.nodeType!==1||c('fbjs/lib/invariant')(0);var m=[];for(var n in l)c('ReactChildren').mapIntoWithKeyPrefixInternal(l[n],m,n,c('fbjs/lib/emptyFunction').thatReturnsArgument);return m;}};f.exports=j;}),null);