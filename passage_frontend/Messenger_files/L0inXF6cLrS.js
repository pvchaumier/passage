if (self.CavalryLogger) { CavalryLogger.start_js(["Isasc"]); }

__d('messengerConfirmLeaveGroupDialogReact',['bs_curry','reactRe','bs_js_boolean','messengerDialogsRe','messengerDialogReact','MessengerAdminGroupUtils','messengerDialogBodyReact'],(function a(b,c,d,e,f,g){'use strict';var h=c('reactRe').Component[9],i=h[0],j=h[1],k=h[2],l=h[3],m=h[4],n=h[5],o=h[6],p="MessengerConfirmLeaveGroupDialogReactReact";function q(z,aa){c('bs_curry')._1(z[1][1],0);c('messengerDialogsRe').removeDialog(0);return 0;}function r(z){if(z){return c('messengerDialogsRe').removeDialog(0);}else return 0;}function s(z){var aa=z[1],ba=c('bs_js_boolean').to_js_boolean(aa[0]),ca=c('MessengerAdminGroupUtils').getLeaveGroupBodyText(ba,aa[2]),da=c('MessengerAdminGroupUtils').getLeaveGroupButtonText(ba,aa[2]),ea=c('MessengerAdminGroupUtils').getLeaveGroupTitleText(ba,aa[2]);return c('bs_curry').app(c('messengerDialogReact').Dialog[0],[0,r,0,0,0,0,0,[c('bs_curry')._6(c('messengerDialogReact').Header[0],0,0,[ea,0],0,0,0),[c('bs_curry')._3(c('messengerDialogBodyReact').createElement(0,[ca,0]),0,0,0),[c('bs_curry')._6(c('messengerDialogReact').Footer[0],0,0,[c('bs_curry')._5(c('messengerDialogReact').CancelButton[0],0,0,0,0,0),[c('bs_curry').app(c('messengerDialogReact').Button[0],[0,[da],0,["danger"],[c('bs_curry')._1(z[2],q)],[0],0,0,0,0,0,0]),0]],0,0,0),0]]],0,0,0]);}var t=[function(z){return [+z.isViewerAdmin,z.onLeave,z.thread];}],u=[i,j,k,l,m,n,o,p,q,r,s,t],v=c('reactRe').CreateComponent([p,n,o,i,l,j,k,m,t,s]),w=v[1];function x(z,aa,ba){return c('bs_curry')._1(w,[z,aa,ba]);}var y=v[0];g.MessengerConfirmLeaveGroupDialogReact=u;g.comp=y;g.wrapProps=w;g.createElement=x;}),null);