!function(e,t){let n=t(e,e.document,Date);e.gpLazySizes=n,"object"==typeof module&&module.exports&&(module.exports=n)}("undefined"!=typeof window?window:{},function(e,t,n){let i;if(!function(){let t;let n={lazyClass:"gp_lazyload",loadedClass:"gp_lazyloaded",loadingClass:"gp_lazyloading",preloadClass:"gp_lazypreload",errorClass:"gp_lazyerror",autosizesClass:"gp_lazyautosizes",fastLoadedClass:"gp_ls-is-cached",iframeLoadMode:0,srcAttr:"data-src",srcsetAttr:"data-srcset",sizesAttr:"data-sizes",minSize:40,customMedia:{},init:!0,expFactor:1.5,hFac:.8,loadMode:2,loadHidden:!0,ricTimeout:0,throttleDelay:125};for(t in i=e.gpLazySizesConfig||e.gpLazySizesConfig||{},n)t in i||(i[t]=n[t])}(),!t||!t.getElementsByClassName)return{init:function(){},cfg:i,noSupport:!0};let l=t.documentElement,a=e.HTMLPictureElement,o="addEventListener",s="getAttribute",r=e[o].bind(e),c=e.setTimeout,d=e.requestAnimationFrame||c,u=e.requestIdleCallback,f=/^picture$/i,m=["load","error","lazyincluded","_lazyloaded"],g={},p=Array.prototype.forEach,y=function(e,t){return g[t]||(g[t]=RegExp("(\\s|^)"+t+"(\\s|$)")),g[t].test(e[s]("class")||"")&&g[t]},z=function(e,t){y(e,t)||e.setAttribute("class",(e[s]("class")||"").trim()+" "+t)},h=function(e,t){let n;(n=y(e,t))&&e.setAttribute("class",(e[s]("class")||"").replace(n," "))},C=function(e,t,n){let i=n?o:"removeEventListener";n&&C(e,t),m.forEach(function(n){e[i](n,t)})},b=function(e,n,i,l,a){let o=t.createEvent("Event");return i||(i={}),i.instance=W,o.initEvent(n,!l,!a),o.detail=i,e.dispatchEvent(o),o},_=function(t,n){let l;!a&&(l=e.picturefill||i.pf)?(n&&n.src&&!t[s]("srcset")&&t.setAttribute("srcset",n.src),l({reevaluate:!0,elements:[t]})):n&&n.src&&(t.src=n.src)},A=function(e,t){return(getComputedStyle(e,null)||{})[t]},v=function(e,t,n){for(n=n||e.offsetWidth;n<i.minSize&&t&&!e._lazysizesWidth;)n=t.offsetWidth,t=t.parentNode;return n},E=function(){let e,n;let i=[],l=[],a=i,o=function(){let t=a;for(a=i.length?l:i,e=!0,n=!1;t.length;)t.shift()();e=!1},s=function(i,l){e&&!l?i.apply(this,arguments):(a.push(i),n||(n=!0,(t.hidden?c:d)(o)))};return s._lsFlush=o,s}(),M=function(e,t){return t?function(){E(e)}:function(){let t=this,n=arguments;E(function(){e.apply(t,n)})}},w=function(e){let t;let l=0,a=i.throttleDelay,o=i.ricTimeout,s=function(){t=!1,l=n.now(),e()},r=u&&o>49?function(){u(s,{timeout:o}),o!==i.ricTimeout&&(o=i.ricTimeout)}:M(function(){c(s)},!0);return function(e){let i;(e=!0===e)&&(o=33),t||(t=!0,(i=a-(n.now()-l))<0&&(i=0),e||i<9?r():c(r,i))}},L=function(e){let t,i;let l=function(){t=null,e()},a=function(){let e=n.now()-i;e<99?c(a,99-e):(u||l)(l)};return function(){i=n.now(),t||(t=c(a,99))}},N=function(){let a,u,m,g,v,N,S,B,T,F,R,D;let k=/^img$/i,H=/^iframe$/i,O="onscroll"in e&&!/(?:gle|ing)bot/.test(navigator.userAgent),P=0,$=0,q=-1,I=function(e){$--,e&&!($<0)&&e.target||($=0)},U=function(e){return null==D&&(D="hidden"==A(t.body,"visibility")),D||!("hidden"==A(e.parentNode,"visibility")&&"hidden"==A(e,"visibility"))},j=function(e,n){let i;let a=e,o=U(e);for(B-=n,R+=n,T-=n,F+=n;o&&(a=a.offsetParent)&&a!=t.body&&a!=l;)(o=(A(a,"opacity")||1)>0)&&"visible"!=A(a,"overflow")&&(o=F>(i=a.getBoundingClientRect()).left&&T<i.right&&R>i.top-1&&B<i.bottom+1);return o},G=function(){let e,n,o,r,c,d,f,m,p,y,z,h;let C=W.elements;if((g=i.loadMode)&&$<8&&(e=C.length)){for(n=0,q++;n<e;n++)if(C[n]&&!C[n]._lazyRace){if(!O||W.prematureUnveil&&W.prematureUnveil(C[n])){ee(C[n]);continue}if((m=C[n][s]("data-expand"))&&(d=1*m)||(d=P),y||(y=!i.expand||i.expand<1?l.clientHeight>500&&l.clientWidth>500?500:370:i.expand,W._defEx=y,z=y*i.expFactor,h=i.hFac,D=null,P<z&&$<1&&q>2&&g>2&&!t.hidden?(P=z,q=0):P=g>1&&q>1&&$<6?y:0),p!==d&&(N=innerWidth+d*h,S=innerHeight+d,f=-1*d,p=d),(R=(o=C[n].getBoundingClientRect()).bottom)>=f&&(B=o.top)<=S&&(F=o.right)>=f*h&&(T=o.left)<=N&&(R||F||T||B)&&(i.loadHidden||U(C[n]))&&(u&&$<3&&!m&&(g<3||q<4)||j(C[n],d))){if(ee(C[n]),c=!0,$>9)break}else!c&&u&&!r&&$<4&&q<4&&g>2&&(a[0]||i.preloadAfterLoad)&&(a[0]||!m&&(R||F||T||B||"auto"!=C[n][s](i.sizesAttr)))&&(r=a[0]||C[n])}r&&!c&&ee(r)}},J=w(G),K=function(e){let t=e.target;if(t._lazyCache){delete t._lazyCache;return}I(e),z(t,i.loadedClass),h(t,i.loadingClass),C(t,V),b(t,"lazyloaded")},Q=M(K),V=function(e){Q({target:e.target})},X=function(e,t){let n=e.getAttribute("data-load-mode")||i.iframeLoadMode;0==n?e.contentWindow.location.replace(t):1==n&&(e.src=t)},Y=function(e){let t;let n=e[s](i.srcsetAttr);(t=i.customMedia[e[s]("data-media")||e[s]("media")])&&e.setAttribute("media",t),n&&e.setAttribute("srcset",n)},Z=M(function(e,t,n,l,a){let o,r,d,u,g,y;!(g=b(e,"lazybeforeunveil",t)).defaultPrevented&&(l&&(n?z(e,i.autosizesClass):e.setAttribute("sizes",l)),r=e[s](i.srcsetAttr),o=e[s](i.srcAttr),a&&(u=(d=e.parentNode)&&f.test(d.nodeName||"")),y=t.firesLoad||"src"in e&&(r||o||u),g={target:e},z(e,i.loadingClass),y&&(clearTimeout(m),m=c(I,2500),C(e,V,!0)),u&&p.call(d.getElementsByTagName("source"),Y),r?e.setAttribute("srcset",r):o&&!u&&(H.test(e.nodeName)?X(e,o):e.src=o),a&&(r||u)&&_(e,{src:o})),e._lazyRace&&delete e._lazyRace,h(e,i.lazyClass),E(function(){let t=e.complete&&e.naturalWidth>1;(!y||t)&&(t&&z(e,i.fastLoadedClass),K(g),e._lazyCache=!0,c(function(){"_lazyCache"in e&&delete e._lazyCache},9)),"lazy"==e.loading&&$--},!0)}),ee=function(e){if(e._lazyRace)return;let t=k.test(e.nodeName),n=t&&(e[s](i.sizesAttr)||e[s]("sizes")),l="auto"==n;if((l||!u)&&t&&(e[s]("src")||e.srcset)&&!e.complete&&!y(e,i.errorClass)&&y(e,i.lazyClass))return;let a=b(e,"lazyunveilread").detail;l&&x.updateElem(e,!0,e.offsetWidth),e._lazyRace=!0,$++,Z(e,a,l,n,t)},et=L(function(){i.loadMode=3,J()}),en=function(){3==i.loadMode&&(i.loadMode=2),et()},ei=function(){if(!u){if(n.now()-v<999){c(ei,999);return}u=!0,i.loadMode=3,J(),r("scroll",en,!0)}};return{_:function(){v=n.now(),W.elements=t.getElementsByClassName(i.lazyClass),a=t.getElementsByClassName(i.lazyClass+" "+i.preloadClass),r("scroll",J,!0),r("resize",J,!0),r("pageshow",function(e){if(e.persisted){let e=t.querySelectorAll("."+i.loadingClass);e.length&&e.forEach&&d(function(){e.forEach(function(e){e.complete&&ee(e)})})}}),e.MutationObserver?new MutationObserver(J).observe(l,{childList:!0,subtree:!0,attributes:!0}):(l[o]("DOMNodeInserted",J,!0),l[o]("DOMAttrModified",J,!0),setInterval(J,999)),r("hashchange",J,!0),["focus","mouseover","click","load","transitionend","animationend"].forEach(function(e){t[o](e,J,!0)}),/d$|^c/.test(t.readyState)?ei():(r("load",ei),t[o]("DOMContentLoaded",J),c(ei,2e4)),W.elements.length?(G(),E._lsFlush()):J()},checkElems:J,unveil:ee,_aLSL:en}}(),x=function(){let e;let n=M(function(e,t,n,i){let l,a,o;if(e._lazysizesWidth=i,i+="px",e.setAttribute("sizes",i),f.test(t.nodeName||""))for(a=0,o=(l=t.getElementsByTagName("source")).length;a<o;a++)l[a].setAttribute("sizes",i);n.detail.dataAttr||_(e,n.detail)}),l=function(e,t,i){let l;let a=e.parentNode;a&&(i=v(e,a,i),!(l=b(e,"lazybeforesizes",{width:i,dataAttr:!!t})).defaultPrevented&&(i=l.detail.width)&&i!==e._lazysizesWidth&&n(e,a,l,i))},a=L(function(){let t;let n=e.length;if(n)for(t=0;t<n;t++)l(e[t])});return{_:function(){e=t.getElementsByClassName(i.autosizesClass),r("resize",a)},checkElems:a,updateElem:l}}(),S=function(){!S.i&&t.getElementsByClassName&&(S.i=!0,x._(),N._())};c(function(){i.init&&S()});let W={cfg:i,autoSizer:x,loader:N,init:S,uP:_,aC:z,rC:h,hC:y,fire:b,gW:v,rAF:E};return W});
