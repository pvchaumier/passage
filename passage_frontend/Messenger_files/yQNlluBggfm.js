if (self.CavalryLogger) { CavalryLogger.start_js(["JQMSI"]); }

__d('MessengerSharedFiles.react',['cx','MessengerSharedFile.react','React','Relay','RelayQL'],(function a(b,c,d,e,f,g,h){'use strict';var i,j,k=c('React').PropTypes;i=babelHelpers.inherits(l,c('React').Component);j=i&&i.prototype;l.prototype.render=function(){var m=this.props.sharedFiles,n=m.edges;return c('React').createElement('ul',{className:"_2o39"},n.map(function(o){var p=o.node;return c('React').createElement(c('MessengerSharedFile.react'),{key:p.legacy_attachment_id,filename:p.filename,url:p.url,mimetype:p.mimetype});}));};function l(){i.apply(this,arguments);}l.propTypes={sharedFiles:k.object.isRequired,threadFBID:k.string.isRequired};f.exports=c('Relay').createContainer(l,{fragments:{sharedFiles:function m(){return function(){return {children:[{children:[{children:[{fieldName:'__typename',kind:'Field',metadata:{isGenerated:true,isRequisite:true},type:'String'},{children:[{fieldName:'legacy_attachment_id',kind:'Field',metadata:{},type:'ID'},{calls:[{kind:'Call',metadata:{type:'SiteEnum'},name:'site',value:{kind:'CallValue',callValue:'www'}}],fieldName:'url',kind:'Field',metadata:{},type:'Url'},{fieldName:'filename',kind:'Field',metadata:{},type:'String'},{fieldName:'mimetype',kind:'Field',metadata:{},type:'String'},{fieldName:'id',kind:'Field',metadata:{isGenerated:true,isRequisite:true},type:'ID'}],id:c('RelayQL').__id(),kind:'Fragment',metadata:{},name:'MessageFile',type:'MessageFile'},{children:[{fieldName:'id',kind:'Field',metadata:{isGenerated:true,isRequisite:true},type:'ID'},{fieldName:'__typename',kind:'Field',metadata:{isGenerated:true,isRequisite:true},type:'String'}],id:c('RelayQL').__id(),kind:'Fragment',metadata:{isAbstract:true},name:'IdFragment',type:'Node'}],fieldName:'node',kind:'Field',metadata:{canHaveSubselections:true,inferredRootCallName:'node',inferredPrimaryKey:'id',isAbstract:true,isRequisite:true},type:'MessageSharedMedia'},{fieldName:'cursor',kind:'Field',metadata:{isGenerated:true,isRequisite:true},type:'ID'}],fieldName:'edges',kind:'Field',metadata:{canHaveSubselections:true,isPlural:true},type:'MessageSharedMediaEdge'},{children:[{fieldName:'has_next_page',kind:'Field',metadata:{isGenerated:true,isRequisite:true},type:'Boolean'},{fieldName:'has_previous_page',kind:'Field',metadata:{isGenerated:true,isRequisite:true},type:'Boolean'}],fieldName:'page_info',kind:'Field',metadata:{canHaveSubselections:true,isGenerated:true,isRequisite:true},type:'PageInfo'}],id:c('RelayQL').__id(),kind:'Fragment',metadata:{},name:'MessengerSharedFiles_react_SharedFilesRelayQL',type:'MessageSharedMediaConnection'};}();}}});}),null);