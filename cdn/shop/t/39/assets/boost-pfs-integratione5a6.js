(function(){BoostPFS.inject(this),Globals.hasIntegration=!0,Integration.compileIntegrationTemplate=function(data,itemHtml){var okendoWidgetPlusEnabled=document&&!!document.getElementById("okendo-reviews-script"),itemOkendoReviewsHtml=okendoWidgetPlusEnabled?Utils.getProductMetafield(data,"okendo","StarRatingSnippet")!==null?Utils.getProductMetafield(data,"okendo","StarRatingSnippet"):"":Utils.getProductMetafield(data,"okendo","ProductListingSnippet")!==null?Utils.getProductMetafield(data,"okendo","ProductListingSnippet"):"";return itemHtml=itemHtml.replace(/{{itemReviews}}/g,itemOkendoReviewsHtml),itemHtml},Integration.call3rdIntegrationFunc=function(data){}})();
//# sourceMappingURL=/cdn/shop/t/39/assets/boost-pfs-integration.js.map?v=67175655278913219731685111994
