var boostPFSInstantSearchConfig={search:{}};(function(){BoostPFS.inject(this),HTMLDocument.prototype.ready=function(){return new Promise(function(resolve,reject){document.readyState==="complete"?resolve(document):document.addEventListener("DOMContentLoaded",function(){resolve(document)})})},document.ready().then(function(){var inputSearchFormSelector=jQ(".boost-pfs-search-input"),clearSearchFormSelector=jQ(".boost-pfs-search-form-btn-clear");inputSearchFormSelector.val()&&clearSearchFormSelector.show(),inputSearchFormSelector.on("change keydown keyup",function(){jQ(this).val()?clearSearchFormSelector.show():clearSearchFormSelector.hide()}),clearSearchFormSelector.on("click",function(){inputSearchFormSelector.val(""),jQ(this).hide(),inputSearchFormSelector.click()})}),SearchInput.prototype.customizeInstantSearch=function(){var suggestionElement=this.$uiMenuElement,searchElement=this.$element,searchBoxId=this.id};var bindEventsMobile=InstantSearchMobile.prototype.bindEvents;InstantSearchMobile.prototype.bindEvents=function(){bindEventsMobile.call(this);var self=this,searchButtonMobile=".site-nav--mobile .search-button, .js-search-destop",searchInputMobile='.search-input-group input[type="search"], .wg-search-form .search-input',searchCloseButtonMobile=".drawer__close > button, .drawer_back a";jQ(searchButtonMobile).off("click").click(function(e){e.preventDefault(),jQ(searchInputMobile).focus(),self.openSuggestionMobile(),jQ(searchCloseButtonMobile).trigger("click")})};var bindEvents=InstantSearchStyle3.prototype.bindEvents;InstantSearchStyle3.prototype.bindEvents=function(){bindEvents.call(this);var self=this,searchButtonDesktop=".site-header__links .search-button",searchInputDesktop="#SearchContainer #search-input",searchCloseButtonDesktop=".drawer__close > button";jQ(searchButtonDesktop).off("click").click(function(e){e.preventDefault(),jQ(searchInputDesktop).focus(),self.openSuggestionStyle3(),jQ(searchCloseButtonDesktop).trigger("click")})},jQ(".site-header__links .search-button").on("click",function(){setTimeout(function(){boostPFS.initSearchBox(),Utils.isCollectionPage()&&jQ(".search-input-group > .boost-pfs-search-box").val("")},500)})})();
//# sourceMappingURL=/cdn/shop/t/39/assets/boost-pfs-instant-search.js.map?v=30865323957819281091685111993