if (self.CavalryLogger) { CavalryLogger.start_js(["Dfa07"]); }

__d('MercuryFolders',['MercuryFoldersConfig','MessagingTag'],(function a(b,c,d,e,f,g){var h=[c('MessagingTag').INBOX,c('MessagingTag').PENDING,c('MessagingTag').OTHER,c('MessagingTag').ACTION_ARCHIVED],i={getSupportedFolders:function j(){return h.filter(function(k){if(k===c('MessagingTag').PENDING){return !c('MercuryFoldersConfig').hide_message_filtered;}else if(k===c('MessagingTag').OTHER)return !c('MercuryFoldersConfig').hide_message_requests;return true;}).concat();},getFromMeta:function j(k){var l=k.folder;if(k.is_archived)l=c('MessagingTag').ACTION_ARCHIVED;return l;}};f.exports=i;}),null);
__d('MercuryOrderedThreadlist',['invariant','FBID','LogHistory','MercuryActionType','MercuryDispatcher','MercuryFilters','MercuryFolders','MercuryPayloadSource','MercuryServerRequests','MercurySingletonProvider','MercuryThreadIDMap','MessagingTag','PageMessageEnumTag','RangedCallbackManager','MercuryThreadInformer','MercuryThreads','arrayContains'],(function a(b,c,d,e,f,g,h){'use strict';var i=c('LogHistory').getInstance('ordered_threadlist_model'),j=c('MercuryFilters').getSupportedFilters().concat([c('MercuryFilters').ALL,c('MessagingTag').GROUPS]),k=c('MercuryFolders').getSupportedFolders().concat([c('MessagingTag').SPAM]);l.getForFBID=function(o){return n.getForFBID(o);};l.get=function(){return n.get();};function l(o){this.$MercuryOrderedThreadlist1=o;this.$MercuryOrderedThreadlist2=c('MercuryThreadIDMap').getForFBID(this.$MercuryOrderedThreadlist1);this.$MercuryOrderedThreadlist3=c('MercuryThreadInformer').getForFBID(this.$MercuryOrderedThreadlist1);this.$MercuryOrderedThreadlist4=c('MercuryThreads').getForFBID(this.$MercuryOrderedThreadlist1);this.$MercuryOrderedThreadlist5=c('MercuryDispatcher').getForFBID(this.$MercuryOrderedThreadlist1);this.$MercuryOrderedThreadlist6={};this.$MercuryOrderedThreadlist7();this.$MercuryOrderedThreadlist5.subscribe('update-threadlist',function(p,q){if(!m(q))return;var r=q.ordered_threadlists;if(r&&r.length){this.$MercuryOrderedThreadlist8(r);}else{var s=(q.actions||[]).filter(function(t){return t.thread_id;});this.$MercuryOrderedThreadlist9(q.threads||[]);this.$MercuryOrderedThreadlist10(s);}this.$MercuryOrderedThreadlist3.updatedThreadlist();}.bind(this));this.$MercuryOrderedThreadlist5.subscribe('invalidate-global-state',function(){return this.$MercuryOrderedThreadlist11();}.bind(this));}l.prototype.getThreadlistOrderMap=function(o,p){if(!this.$MercuryOrderedThreadlist6[o][p]){j=j.concat([p]);k.forEach(function(q){this.$MercuryOrderedThreadlist6[q][p]=new (c('RangedCallbackManager'))(function(r){var s=this.$MercuryOrderedThreadlist4.getThreadMetaNow(r);return s&&s.timestamp;}.bind(this),function(r,s){return s-r;},this.$MercuryOrderedThreadlist2.canLinkExternally.bind(this.$MercuryOrderedThreadlist2));}.bind(this));}return this.$MercuryOrderedThreadlist6[o][p];};l.prototype.getThreadlist=function(o,p,q,r,s,t){return this.getFilteredThreadlist(o,p,q,c('MercuryFilters').ALL,r,s,t);};l.prototype.getFilteredThreadlist=function(o,p,q,r,s,t,u){var v=this.getThreadlistOrderMap(q,r),w=v.executeOrEnqueue(o,p,s,t),x=v.getUnavailableResources(w),y=v.getError(o,p,t);if(x.length||y){if(v.getCurrentArraySize()<o){var z={start:o,limit:p,filter:r,resources_size:v.getCurrentArraySize()};i.warn('range_with_gap',JSON.stringify(z));}v.setError(false);this.getServerRequests().fetchThreadlistInfo(v.getCurrentArraySize(),x.length,q,r==c('MercuryFilters').ALL?null:r,u);}return w;};l.prototype.getServerRequests=function(){return c('MercuryServerRequests').getForFBID(this.$MercuryOrderedThreadlist1);};l.prototype.getThreadlistUntilTimestamp=function(o,p,q){q=q||c('MercuryFilters').ALL;return this.getThreadlistOrderMap(p,q).getElementsUntil(o);};l.prototype.getAvailableThreadlistNow=function(o,p){p=p||c('MercuryFilters').ALL;return this.getThreadlistOrderMap(o,p).getAllResources();};l.prototype.getThreadCount=function(o,p){p=p||c('MercuryFilters').ALL;return this.getThreadlistOrderMap(o,p).getCurrentArraySize();};l.prototype.hasLoadedThreadlist=function(o,p){p=p||c('MercuryFilters').ALL;return this.getThreadlistOrderMap(o,p).hasReachedEndOfArray();};l.prototype.unsubscribe=function(o,p,q){q=q||c('MercuryFilters').ALL;this.getThreadlistOrderMap(p,q).unsubscribe(o);};l.prototype.$MercuryOrderedThreadlist11=function(){this.$MercuryOrderedThreadlist6={};this.$MercuryOrderedThreadlist7();};l.prototype.$MercuryOrderedThreadlist7=function(){k.forEach(function(o){this.$MercuryOrderedThreadlist6[o]={};j.forEach(function(p){this.$MercuryOrderedThreadlist6[o][p]=new (c('RangedCallbackManager'))(function(q){var r=this.$MercuryOrderedThreadlist4.getThreadMetaNow(q);return r&&r.timestamp;}.bind(this),function(q,r){return r-q;},this.$MercuryOrderedThreadlist2.canLinkExternally.bind(this.$MercuryOrderedThreadlist2));}.bind(this));}.bind(this));};l.prototype.$MercuryOrderedThreadlist12=function(o,p,q){var r=this.$MercuryOrderedThreadlist4.getThreadMetaNow(o);return !!(r&&r.timestamp&&q&&p&&this.$MercuryOrderedThreadlist13(o)==p&&c('arrayContains')(this.$MercuryOrderedThreadlist14(o),q));};l.prototype.$MercuryOrderedThreadlist15=function(o,p,q){var r,s=this,t=[],u=false,v=false,w=(o||[]).filter(function(aa){var ba=aa.filter||c('MercuryFilters').ALL;return (aa.folder==p||!aa.folder&&p==c('MessagingTag').INBOX)&&ba==q;}),x=this.$MercuryOrderedThreadlist6[p][q].getAllResources(),y=void 0;w.forEach(function(aa){t=t.concat(aa.thread_ids);if(aa.error){if(aa.end>x.length)v=aa.error;}else{var ba=aa.end-aa.start;if(aa.thread_ids.length<ba)u=true;}if(!y||aa.end>y)y=aa.end;});this.$MercuryOrderedThreadlist16(t,p,q);if(u){this.$MercuryOrderedThreadlist6[p][q].setReachedEndOfArray();}else if(v){this.$MercuryOrderedThreadlist6[p][q].setError(v);}else{var z=this.$MercuryOrderedThreadlist6[p][q].getCurrentArraySize();if(y&&z<y)(function(){var aa={},ba=x.concat(t),ca=ba.filter(function(da){var ea=aa[da];aa[da]=true;return ea;});if(ca.length){i.warn('duplicate_threads',JSON.stringify({folder:p,expected_final_size:y,actual_final_size:z,duplicate_thread_ids:ca}));s.getServerRequests().fetchThreadlistInfo(y,ca.length,p,q==c('MercuryFilters').ALL?null:q);}})();}};l.prototype.$MercuryOrderedThreadlist8=function(o){k.forEach(function(p){j.forEach(function(q){this.$MercuryOrderedThreadlist15(o,p,q);}.bind(this));}.bind(this));};l.prototype.$MercuryOrderedThreadlist10=function(o){var p={},q=this.$MercuryOrderedThreadlist4;k.forEach(function(r){p[r]={};j.forEach(function(s){p[r][s]={to_add:[],to_remove:[],to_remove_if_last_after_add:{}};});});o.forEach(function(r){var s=r.thread_id;this.$MercuryOrderedThreadlist17(s,function(t){this.$MercuryOrderedThreadlist18(s,function(u){var v=function(){u.forEach(function(x){if(!c('arrayContains')(j,x))return;!!t||h(0);p[t][x].to_add.push(s);if(!this.$MercuryOrderedThreadlist6[t][x].hasReachedEndOfArray()&&!this.$MercuryOrderedThreadlist6[t][x].hasResource(s))p[t][x].to_remove_if_last_after_add[s]=true;}.bind(this));}.bind(this);function w(x){!!t||h(0);if(c('arrayContains')(j,x))if(c('arrayContains')(u,x)){p[t][x].to_add.push(s);}else p[t][x].to_remove.push(s);}if(!t){if(r.action_type===c('MercuryActionType').CHANGE_FOLDER||r.action_type===c('MercuryActionType').CHANGE_ARCHIVED_STATUS)k.forEach(function(x){if(x!==t)j.forEach(function(y){this.$MercuryOrderedThreadlist6[x][y].removeResources([s]);}.bind(this));}.bind(this));return;}!!t||h(0);switch(r.action_type){case c('MercuryActionType').DELETE_THREAD:u.forEach(function(x){if(!c('arrayContains')(j,x))return;p[t][x].to_remove.push(s);});break;case c('MercuryActionType').CHANGE_ARCHIVED_STATUS:case c('MercuryActionType').CHANGE_FOLDER:v();break;case c('MercuryActionType').CHANGE_READ_STATUS:w(c('MessagingTag').UNREAD);break;case c('MercuryActionType').USER_GENERATED_MESSAGE:case c('MercuryActionType').LOG_MESSAGE:u.forEach(function(x){if(!c('arrayContains')(j,x))return;if(this.$MercuryOrderedThreadlist12(s,t,x))p[t][x].to_add.push(s);}.bind(this));break;case c('MercuryActionType').CHANGE_FLAG:w(c('PageMessageEnumTag').FLAG);break;}}.bind(this));}.bind(this));}.bind(this));k.forEach(function(r){j.forEach(function(s){var t=this.$MercuryOrderedThreadlist6[r][s];this.$MercuryOrderedThreadlist16(p[r][s].to_add,r,s);for(var u=t.getCurrentArraySize()-1;u>=0;u--){var v=t.getResourceAtIndex(u);if(!p[r][s].to_remove_if_last_after_add[v])break;p[r][s].to_remove.push(v);}t.removeResources(p[r][s].to_remove);}.bind(this));}.bind(this));};l.prototype.$MercuryOrderedThreadlist9=function(o){var p={};k.forEach(function(q){p[q]={};j.forEach(function(r){p[q][r]=[];});});o.forEach(function(q){this.$MercuryOrderedThreadlist17(q.thread_id,function(r){this.$MercuryOrderedThreadlist18(q.thread_id,function(s){if(r)s.forEach(function(t){if(this.$MercuryOrderedThreadlist12(q.thread_id,r,t))p[r][t].push(q.thread_id);}.bind(this));}.bind(this));}.bind(this));}.bind(this));k.forEach(function(q){j.forEach(function(r){if(p[q][r].length>0)this.$MercuryOrderedThreadlist16(p[q][r],q,r);}.bind(this));}.bind(this));};l.prototype.$MercuryOrderedThreadlist16=function(o,p,q){q=q||c('MercuryFilters').ALL;this.$MercuryOrderedThreadlist6[p][q].addResources(o);k.forEach(function(r){if(r!=p)this.$MercuryOrderedThreadlist6[r][q].removeResources(o);}.bind(this));};l.prototype.$MercuryOrderedThreadlist17=function(o,p){this.$MercuryOrderedThreadlist4.getThreadMeta(o,function(q){p(this.$MercuryOrderedThreadlist13(o,q));}.bind(this));};l.prototype.$MercuryOrderedThreadlist13=function(o,p){p=p||this.$MercuryOrderedThreadlist4.getThreadMetaNow(o);var q=null;if(!p){q='No thread metadata';}else if(!p.folder)q='No thread folder';if(q){var r={error:q,tid:o};i.warn('no_thread_folder',JSON.stringify(r));return null;}!!p||h(0);var s=p.folder;if(p.is_archived)s=c('MessagingTag').ACTION_ARCHIVED;if(this.$MercuryOrderedThreadlist6[s]){return s;}else return null;};l.prototype.$MercuryOrderedThreadlist18=function(o,p){this.$MercuryOrderedThreadlist4.getThreadMeta(o,function(q){p(this.$MercuryOrderedThreadlist14(o,q));}.bind(this));};l.prototype.$MercuryOrderedThreadlist14=function(o,p){p=p||this.$MercuryOrderedThreadlist4.getThreadMetaNow(o);var q=[c('MercuryFilters').ALL];if(!p){var r={error:'no_thread_metadata',tid:o};i.warn('no_thread_metadata',JSON.stringify(r));return [];}if(p.unread_count)q.push(c('MessagingTag').UNREAD);if(!p.is_canonical)q.push(c('MessagingTag').GROUPS);var s=p.page_thread_info;if(s&&s.flagged)q.push(c('PageMessageEnumTag').FLAG);return q;};function m(o){switch(o.payload_source){case c('MercuryPayloadSource').CLIENT_CHANGE_ARCHIVED_STATUS:case c('MercuryPayloadSource').CLIENT_CHANGE_READ_STATUS:case c('MercuryPayloadSource').CLIENT_CHANGE_FOLDER:case c('MercuryPayloadSource').CLIENT_CHANNEL_MESSAGE:case c('MercuryPayloadSource').CLIENT_DELETE_MESSAGES:case c('MercuryPayloadSource').CLIENT_DELETE_THREAD:case c('MercuryPayloadSource').CLIENT_SEND_MESSAGE:case c('MercuryPayloadSource').SERVER_SEND_MESSAGE:case c('MercuryPayloadSource').SERVER_FETCH_THREADLIST_INFO:case c('MercuryPayloadSource').SERVER_THREAD_SYNC:case c('MercuryPayloadSource').SERVER_INVALIDATE_GLOBAL_STATE:return true;case c('MercuryPayloadSource').SERVER_INITIAL_DATA:return !!o.ordered_threadlists;default:return false;}}var n=new (c('MercurySingletonProvider'))(l);f.exports=l;}),null);