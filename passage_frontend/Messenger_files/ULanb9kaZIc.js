if (self.CavalryLogger) { CavalryLogger.start_js(["HNB9r"]); }

__d("SpotlightProfilePicCropOptions",[],(function a(b,c,d,e,f,g){var h=2.5,i=.8,j=320,k={getOptions:function l(m,n){var o={},p=Math.min(n.x,n.y),q,r,s=m.facebox;if(s){r=Math.max(s.size.x*n.x,s.size.y*n.y)*h;q=s.center;}else{r=i*p;if(m.focus)q=m.focus;}var t=n.x/m.original.width;o.height=o.width=Math.min(Math.max(r,j*t),p);if(q){o.center_x=Math.min(Math.max(q.x*n.x,o.width/2),n.x-o.width/2);o.center_y=Math.min(Math.max(q.y*n.y,o.height/2),n.y-o.height/2);}return o;},getOptionsAsRatio:function l(m,n){var o=k.getOptions(m,n),p=Math.min(n.x,n.y);return {center:{x:o.center_x?o.center_x/n.x:.5,y:o.center_y?o.center_y/n.y:.5},size:{x:o.width/p,y:o.height/p}};}};f.exports=k;}),null);