if (self.CavalryLogger) { CavalryLogger.start_js(["B9E2h"]); }

__d('UFIFeedbackStore',['FluxReduceStore','UFIDispatcherBase','UFIInstanceActionType'],(function a(b,c,d,e,f,g){'use strict';var h,i;h=babelHelpers.inherits(j,c('FluxReduceStore'));i=h&&h.prototype;j.prototype.getInitialState=function(){return {};};j.prototype.reduce=function(k,l){var m;switch(l.type){case c('UFIInstanceActionType').INIT:var n=l.payload,o=n.feedbacktarget?n.feedbacktarget:n.feedbacktargets&&n.feedbacktargets[0];if(!o)return k;return babelHelpers['extends']({},k,(m={},m[l.ftentidentifier]=babelHelpers['extends']({orderingmodes:[],defaultcommentorderingmode:''},o),m));}return k;};function j(){h.apply(this,arguments);}f.exports=new j(c('UFIDispatcherBase'));}),18);