if (self.CavalryLogger) { CavalryLogger.start_js(["wQWJd"]); }

__d('messengerDeleteDialogReact',['fbt','bs_curry','reactRe','messengerDialogsRe','messengerDialogReact','messengerDialogBodyReact'],(function a(b,c,d,e,f,g,h){'use strict';var i=c('reactRe').Component[9],j=i[0],k=i[1],l=i[2],m=i[3],n=i[4],o=i[5],p=i[6],q="MessengerDeleteDialogReact";function r(ba,ca){if(!ca)c('messengerDialogsRe').removeDialog(0);return 0;}function s(ba,ca){var da=ba[1];c('bs_curry')._1(da[2],false);c('bs_curry')._1(da[0],ca);return 0;}function t(ba,ca){var da=ba[1];c('bs_curry')._1(da[2],false);c('bs_curry')._1(da[1],0);return 0;}function u(ba){var ca=ba[2];return c('bs_curry').app(c('messengerDialogReact').Dialog[0],[0,c('bs_curry')._1(ca,r),0,0,0,0,0,[c('bs_curry')._6(c('messengerDialogReact').Header[0],0,0,[h._("Delete Conversation"),0],0,0,0),[c('bs_curry')._3(c('messengerDialogBodyReact').createElement(0,[h._("This will permanently delete the conversation history."),0]),0,0,0),[c('bs_curry')._6(c('messengerDialogReact').Footer[0],0,0,[c('bs_curry')._5(c('messengerDialogReact').CancelButton[0],0,0,0,0,0),[c('bs_curry').app(c('messengerDialogReact').Button[0],[0,[h._("Archive")],0,0,[c('bs_curry')._1(ca,s)],[1],0,0,0,0,0,0]),[c('bs_curry').app(c('messengerDialogReact').Button[0],[0,[h._("Delete")],0,["danger"],[c('bs_curry')._1(ca,t)],[0],0,0,0,0,0,0]),0]]],0,0,0),0]]],0,0,0]);}var v=[function(ba){return [ba.onArchive,ba.onDelete,ba.onToggle];}],w=[j,k,l,m,n,o,p,q,r,s,t,u,v],x=c('reactRe').CreateComponent([q,o,p,j,m,k,l,n,v,u]),y=x[1];function z(ba,ca,da){return c('bs_curry')._1(y,[ba,ca,da]);}var aa=x[0];g.MessengerDeleteDialog=w;g.comp=aa;g.wrapProps=y;g.createElement=z;}),null);