/** Shopify CDN: Minification failed

Line 24:0 Transforming let to the configured target environment ("es5") is not supported yet
Line 47:2 Transforming let to the configured target environment ("es5") is not supported yet
Line 51:4 Transforming let to the configured target environment ("es5") is not supported yet
Line 59:2 Transforming let to the configured target environment ("es5") is not supported yet
Line 62:4 Transforming const to the configured target environment ("es5") is not supported yet
Line 76:4 Transforming const to the configured target environment ("es5") is not supported yet
Line 76:10 Transforming destructuring to the configured target environment ("es5") is not supported yet
Line 89:4 Transforming const to the configured target environment ("es5") is not supported yet
Line 89:10 Transforming destructuring to the configured target environment ("es5") is not supported yet
Line 90:4 Transforming const to the configured target environment ("es5") is not supported yet
... and 1944 more hidden warnings

**/
/*
* @license
* Palo Alto Theme (c) Invisible Themes
*
* Modified versions of the theme code
* are not supported by Groupthought.
*
*/
let customCart = [];

(function (AOS, Flickity, Sqrl, themeCurrency, Ajaxinate) {
  'use strict';

  window.theme = window.theme || {};

  window.theme.sizes = {
    mobile: 480,
    small: 750,
    large: 990,
    widescreen: 1400,
  };

  window.theme.keyboardKeys = {
    TAB: 9,
    ENTER: 13,
    ESCAPE: 27,
    SPACE: 32,
    LEFTARROW: 37,
    RIGHTARROW: 39,
  };

  let calculatePrice = function(quantity, rate) {
    if(!quantity){ quantity = 1 }
    if(!rate){ rate = 0; }
    // console.log(calculatePrice);
    let calcRate = quantity * rate;
    return quantity
  }
  calculatePrice(1, 100)
  // console.log(calculatePrice);

  window.theme.focusable = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  let screenOrientation = getScreenOrientation();

  function readHeights() {
    const h = {};
    h.windowHeight = Math.min(window.screen.height, window.innerHeight);
    h.footerHeight = getHeight('[data-section-type*="footer"]');
    h.headerHeight = getHeight('[data-header-height]');
    h.collectionStickyBarHeight = getHeight('[data-collection-sticky-bar]');
    return h;
  }

  function setVarsOnResize() {
    document.addEventListener('theme:resize', resizeVars);
    setVars();
  }

  function setVars() {
    const {windowHeight, headerHeight, footerHeight, collectionStickyBarHeight} = readHeights();
    document.documentElement.style.setProperty('--full-height', `${windowHeight}px`);
    document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);

    document.documentElement.style.setProperty('--footer-height', `${footerHeight}px`);
    document.documentElement.style.setProperty('--content-full', `${windowHeight - headerHeight}px`);
    document.documentElement.style.setProperty('--content-min', `${windowHeight - headerHeight - footerHeight}px`);

    document.documentElement.style.setProperty('--collection-sticky-bar-height', `${collectionStickyBarHeight}px`);
  }

  function resizeVars() {
    // restrict the heights that are changed on resize to avoid iOS jump when URL bar is shown and hidden
    const {windowHeight, headerHeight, footerHeight, collectionStickyBarHeight} = readHeights();
    const currentScreenOrientation = getScreenOrientation();

    if (currentScreenOrientation !== screenOrientation) {
      // Only update the heights on screen orientation change
      document.documentElement.style.setProperty('--full-height', `${windowHeight}px`);

      // Update the screen orientation state
      screenOrientation = currentScreenOrientation;
    }

    document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);

    document.documentElement.style.setProperty('--footer-height', `${footerHeight}px`);
    document.documentElement.style.setProperty('--content-full', `${windowHeight - headerHeight}px`);
    document.documentElement.style.setProperty('--content-min', `${windowHeight - headerHeight - footerHeight}px`);

    document.documentElement.style.setProperty('--collection-sticky-bar-height', `${collectionStickyBarHeight}px`);
  }

  function getHeight(selector) {
    const el = document.querySelector(selector);
    if (el) {
      return el.clientHeight;
    } else {
      return 0;
    }
  }

  function getScreenOrientation() {
    if (window.matchMedia('(orientation: portrait)').matches) {
      return 'portrait';
    }

    if (window.matchMedia('(orientation: landscape)').matches) {
      return 'landscape';
    }
  }

  function debounce(fn, time) {
    let timeout;
    return function () {
      // eslint-disable-next-line prefer-rest-params
      if (fn) {
        const functionCall = () => fn.apply(this, arguments);
        clearTimeout(timeout);
        timeout = setTimeout(functionCall, time);
      }
    };
  }

  window.lastWindowWidth = window.innerWidth;

  function dispatchResizeEvent() {
    document.dispatchEvent(
      new CustomEvent('theme:resize', {
        bubbles: true,
      })
    );

    if (window.lastWindowWidth !== window.innerWidth) {
      document.dispatchEvent(
        new CustomEvent('theme:resize:width', {
          bubbles: true,
        })
      );

      window.lastWindowWidth = window.innerWidth;
    }
  }

  function resizeListener() {
    window.addEventListener('resize', debounce(dispatchResizeEvent, 50));
  }

  const wrap = (toWrap, wrapperClass = '', wrapperOption) => {
    const wrapper = wrapperOption || document.createElement('div');
    wrapper.classList.add(wrapperClass);
    wrapper.setAttribute('data-scroll-lock-scrollable', '');
    toWrap.parentNode.insertBefore(wrapper, toWrap);
    return wrapper.appendChild(toWrap);
  };

  function wrapElements(container) {
    // Target tables to make them scrollable
    const tableSelectors = 'table';
    const tables = document.querySelectorAll(tableSelectors);
    tables.forEach((table) => {
      wrap(table, 'table-wrapper');
    });
  }

  function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  }

  function isTouch() {
    if (isTouchDevice()) {
      document.documentElement.className = document.documentElement.className.replace('no-touch', 'supports-touch');
      window.theme.touch = true;
    } else {
      window.theme.touch = false;
    }
  }

  // import floatLabels from '../globals/forms';
  // import {ariaToggle} from '../globals/aria-toggle';
  // import {loading} from '../globals/loading';

  resizeListener();
  // scrollListener();
  isTouch();
  setVars();
  // ariaToggle(document);

  window.addEventListener('load', () => {
    setVarsOnResize();
    //   floatLabels(document);
    //   preventOverflow(document);
    wrapElements();
    //   loading();
  });

  document.addEventListener('shopify:section:load', (e) => {
    const container = e.target;
    //   floatLabels(container);
    //   preventOverflow(container);
    wrapElements();
    //   ariaToggle(document);
    setVarsOnResize();
  });

  (function () {
    function n(n) {
      var i = window.innerWidth || document.documentElement.clientWidth,
        r = window.innerHeight || document.documentElement.clientHeight,
        t = n.getBoundingClientRect();
      return t.top >= 0 && t.bottom <= r && t.left >= 0 && t.right <= i;
    }
    function t(n) {
      var i = window.innerWidth || document.documentElement.clientWidth,
        r = window.innerHeight || document.documentElement.clientHeight,
        t = n.getBoundingClientRect(),
        u = (t.left >= 0 && t.left <= i) || (t.right >= 0 && t.right <= i),
        f = (t.top >= 0 && t.top <= r) || (t.bottom >= 0 && t.bottom <= r);
      return u && f;
    }
    function i(n, i) {
      function r() {
        var r = t(n);
        r != u && ((u = r), typeof i == 'function' && i(r, n));
      }
      var u = t(n);
      window.addEventListener('load', r);
      window.addEventListener('resize', r);
      window.addEventListener('scroll', r);
    }
    function r(t, i) {
      function r() {
        var r = n(t);
        r != u && ((u = r), typeof i == 'function' && i(r, t));
      }
      var u = n(t);
      window.addEventListener('load', r);
      window.addEventListener('resize', r);
      window.addEventListener('scroll', r);
    }
    window.visibilityHelper = {isElementTotallyVisible: n, isElementPartiallyVisible: t, inViewportPartially: i, inViewportTotally: r};
  })();

  const throttle = (fn, wait) => {
    let prev, next;
    return function invokeFn(...args) {
      const now = Date.now();
      next = clearTimeout(next);
      if (!prev || now - prev >= wait) {
        // eslint-disable-next-line prefer-spread
        fn.apply(null, args);
        prev = now;
      } else {
        next = setTimeout(invokeFn.bind(null, ...args), wait - (now - prev));
      }
    };
  };

  const slideUp = (target, duration = 500) => {
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.boxSizing = 'border-box';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.style.display = 'none';
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
    }, duration);
  };

  const slideDown = (target, duration = 500, showDisplay = 'block', checkHidden = true) => {
    let display = window.getComputedStyle(target).display;
    if (checkHidden && display !== 'none') {
      return;
    }
    target.style.removeProperty('display');
    if (display === 'none') display = showDisplay;
    target.style.display = display;
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.boxSizing = 'border-box';
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
    }, duration);
  };

  function FetchError(object) {
    this.status = object.status || null;
    this.headers = object.headers || null;
    this.json = object.json || null;
    this.body = object.body || null;
  }
  FetchError.prototype = Error.prototype;

  const selectors = {
    single: '[data-collapsible-single]', // Add this attribute when we want only one item expanded at the same time
    trigger: '[data-collapsible-trigger]',
    content: '[data-collapsible-content]',
  };

  const classes = {
    isExpanded: 'is-expanded',
  };

  const attributes = {
    triggerMobile: 'data-collapsible-trigger-mobile',
    expanded: 'aria-expanded',
    controls: 'aria-controls',
    hidden: 'aria-hidden',
  };

  const settings = {
    animationDelay: 500,
  };

  const sections = {};

  class Collapsible {
    constructor(container) {
      this.container = container;
      this.single = this.container.querySelector(selectors.single);
      this.triggers = this.container.querySelectorAll(selectors.trigger);
      this.resetHeightTimer = 0;
      this.isTransitioning = false;
      this.collapsibleToggleEvent = (event) => throttle(this.collapsibleToggle(event), 1250);

      this.init();
    }

    init() {
      this.triggers.forEach((trigger) => {
        trigger.addEventListener('click', this.collapsibleToggleEvent);
        trigger.addEventListener('keyup', this.collapsibleToggleEvent);
      });
    }

    collapsibleToggle(e) {
      e.preventDefault();

      const trigger = e.target.matches(selectors.trigger) ? e.target : e.target.closest(selectors.trigger);
      const dropdownId = trigger.getAttribute(attributes.controls);
      const dropdown = document.getElementById(dropdownId);
      const triggerMobile = trigger.hasAttribute(attributes.triggerMobile);
      const isExpanded = trigger.classList.contains(classes.isExpanded);
      const isSpace = e.keyCode === theme.keyboardKeys.SPACE;
      const isEscape = e.keyCode === theme.keyboardKeys.ESCAPE;
      const isMobile = window.innerWidth < theme.sizes.small;

      // Do nothing if transitioning
      if (this.isTransitioning) {
        return;
      }

      // Do nothing if any different than ESC and Space key pressed
      if (e.keyCode && !isSpace && !isEscape) {
        return;
      }

      // Do nothing if ESC key pressed and not expanded or mobile trigger clicked and screen not mobile
      if ((!isExpanded && isEscape) || (triggerMobile && !isMobile)) {
        return;
      }

      this.isTransitioning = true;
      trigger.disabled = true;

      // When we want only one item expanded at the same time
      if (this.single) {
        this.triggers.forEach((otherTrigger) => {
          const isExpanded = otherTrigger.classList.contains(classes.isExpanded);

          if (trigger == otherTrigger || !isExpanded) return;

          const dropdownId = otherTrigger.getAttribute(attributes.controls);
          const dropdown = document.getElementById(dropdownId);

          this.closeItem(dropdown, otherTrigger);
        });
      }

      if (isExpanded) {
        this.closeItem(dropdown, trigger);
      } else {
        this.openItem(dropdown, trigger);
      }
    }

    openItem(dropdown, trigger) {
      let dropdownHeight = dropdown.querySelector(selectors.content).offsetHeight;

      this.setDropdownHeight(dropdown, dropdownHeight, trigger, false);
      trigger.classList.add(classes.isExpanded);
      trigger.setAttribute(attributes.expanded, true);
    }

    closeItem(dropdown, trigger) {
      let dropdownHeight = dropdown.querySelector(selectors.content).offsetHeight;

      requestAnimationFrame(() => {
        dropdownHeight = 0;
        this.setDropdownHeight(dropdown, dropdownHeight, trigger, true);
        trigger.classList.remove(classes.isExpanded);
      });

      this.setDropdownHeight(dropdown, dropdownHeight, trigger, true);
      trigger.classList.remove(classes.isExpanded);
      trigger.setAttribute(attributes.expanded, false);
    }

    setDropdownHeight(dropdown, dropdownHeight, trigger, isExpanded) {
      dropdown.style.height = `${dropdownHeight}px`;
      dropdown.setAttribute(attributes.hidden, isExpanded);
      dropdown.classList.toggle(classes.isExpanded, !isExpanded);

      if (this.resetHeightTimer) {
        clearTimeout(this.resetHeightTimer);
      }

      if (dropdownHeight == 0) {
        this.resetHeightTimer = setTimeout(() => {
          dropdown.style.height = '';
        }, settings.animationDelay);
      }

      if (!isExpanded) {
        this.resetHeightTimer = setTimeout(() => {
          dropdown.style.height = 'auto';
          this.isTransitioning = false;
        }, settings.animationDelay);
      } else {
        this.isTransitioning = false;
      }

      // Always remove trigger disabled attribute after animation completes
      setTimeout(() => {
        trigger.disabled = false;
      }, settings.animationDelay);
    }

    onUnload() {
      this.triggers.forEach((trigger) => {
        trigger.removeEventListener('click', this.collapsibleToggleEvent);
        trigger.removeEventListener('keyup', this.collapsibleToggleEvent);
      });
    }
  }

  const collapsible = {
    onLoad() {
      sections[this.id] = new Collapsible(this.container);
    },
    onUnload() {
      sections[this.id].onUnload();
    },
  };

  const selectors$1 = {
    quantityHolder: '[data-quantity-holder]',
    quantityField: '[data-quantity-field]',
    quantityButton: '[data-quantity-button]',
    quantityMinusButton: '[data-quantity-minus]',
    quantityPlusButton: '[data-quantity-plus]',
  };

  const classes$1 = {
    quantityReadOnly: 'read-only',
    isDisabled: 'is-disabled',
  };

  class QuantityCounter {
    constructor(holder, inCart = false) {
      this.holder = holder;
      this.quantityUpdateCart = inCart;
    }

    init() {
      // DOM Elements
      this.quantity = this.holder.querySelector(selectors$1.quantityHolder);

      if (!this.quantity) {
        return;
      }

      this.field = this.quantity.querySelector(selectors$1.quantityField);
      this.buttons = this.quantity.querySelectorAll(selectors$1.quantityButton);
      this.increaseButton = this.quantity.querySelector(selectors$1.quantityPlusButton);

      // Set value or classes
      this.quantityValue = Number(this.field.value || 0);
      this.cartItemID = this.field.getAttribute('data-id');
      this.maxValue = Number(this.field.getAttribute('max')) > 0 ? Number(this.field.getAttribute('max')) : null;
      this.minValue = Number(this.field.getAttribute('min')) > 0 ? Number(this.field.getAttribute('min')) : 0;
      this.disableIncrease = this.disableIncrease.bind(this);

      // Flags
      this.emptyField = false;

      // Methods
      this.updateQuantity = this.updateQuantity.bind(this);
      this.decrease = this.decrease.bind(this);
      this.increase = this.increase.bind(this);

      this.disableIncrease();

      // Events
      if (!this.quantity.classList.contains(classes$1.quantityReadOnly)) {
        this.changeValueOnClick();
        this.changeValueOnInput();
      }
    }

    /**
     * Change field value when click on quantity buttons
     *
     * @return  {Void}
     */

    changeValueOnClick() {
      this.buttons.forEach((element) => {
        element.addEventListener('click', (event) => {
          event.preventDefault();
          const clickedElement = event.target;
          const isDescrease = clickedElement.matches(selectors$1.quantityMinusButton) || clickedElement.closest(selectors$1.quantityMinusButton);
          const isIncrease = clickedElement.matches(selectors$1.quantityPlusButton) || clickedElement.closest(selectors$1.quantityPlusButton);

          if (isDescrease) {
            this.decrease();
          }

          if (isIncrease) {
            this.increase();
          }

          this.updateQuantity();
        });
      });
    }

    /**
     * Change field value when input new value in a field
     *
     * @return  {Void}
     */

    changeValueOnInput() {
      this.field.addEventListener('input', (e) => {
        this.quantityValue = this.field.value;

        if (this.value === '') {
          this.emptyField = true;
        }

        this.updateQuantity();
      });
    }

    /**
     * Update field value
     *
     * @return  {Void}
     */

    updateQuantity() {
      if (this.maxValue < this.quantityValue && this.maxValue !== null) {
        this.quantityValue = this.maxValue;
      }

      if (this.minValue > this.quantityValue) {
        this.quantityValue = this.minValue;
      }

      this.field.value = this.quantityValue;

      this.disableIncrease();

      document.dispatchEvent(new CustomEvent('theme:cart:update'));

      if (this.quantityUpdateCart) {
        this.updateCart();
      }
    }

    /**
     * Decrease value
     *
     * @return  {Void}
     */

    decrease() {
      if (this.quantityValue > this.minValue) {
        this.quantityValue--;

        return;
      }

      this.quantityValue = 0;
    }

    /**
     * Increase value
     *
     * @return  {Void}
     */

    increase() {
      this.quantityValue++;
    }

    /**
     * Disable increase
     *
     * @return  {[type]}  [return description]
     */

    disableIncrease() {
      this.increaseButton.classList.toggle(classes$1.isDisabled, this.quantityValue >= this.maxValue && this.maxValue !== null);
    }

    updateCart() {
      const event = new CustomEvent('theme:cart:update', {
        bubbles: true,
        detail: {
          id: this.cartItemID,
          quantity: this.quantityValue,
          valueIsEmpty: this.emptyField,
        },
      });

      this.holder.dispatchEvent(event);
    }
  }

  function getScript(url, callback, callbackError) {
    let head = document.getElementsByTagName('head')[0];
    let done = false;
    let script = document.createElement('script');
    script.src = url;

    // Attach handlers for all browsers
    script.onload = script.onreadystatechange = function () {
      if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
        done = true;
        callback();
      } else {
        callbackError();
      }
    };

    head.appendChild(script);
  }

  const loaders = {};
  window.isYoutubeAPILoaded = false;
  window.isVimeoAPILoaded = false;

  function loadScript(options = {}) {
    if (!options.type) {
      options.type = 'json';
    }

    if (options.url) {
      if (loaders[options.url]) {
        return loaders[options.url];
      } else {
        return getScriptWithPromise(options.url, options.type);
      }
    } else if (options.json) {
      if (loaders[options.json]) {
        return Promise.resolve(loaders[options.json]);
      } else {
        return window
          .fetch(options.json)
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            loaders[options.json] = response;
            return response;
          });
      }
    } else if (options.name) {
      const key = ''.concat(options.name, options.version);
      if (loaders[key]) {
        return loaders[key];
      } else {
        return loadShopifyWithPromise(options);
      }
    } else {
      return Promise.reject();
    }
  }

  function getScriptWithPromise(url, type) {
    const loader = new Promise((resolve, reject) => {
      if (type === 'text') {
        fetch(url)
          .then((response) => response.text())
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        getScript(
          url,
          function () {
            resolve();
          },
          function () {
            reject();
          }
        );
      }
    });

    loaders[url] = loader;
    return loader;
  }

  function loadShopifyWithPromise(options) {
    const key = ''.concat(options.name, options.version);
    const loader = new Promise((resolve, reject) => {
      try {
        window.Shopify.loadFeatures([
          {
            name: options.name,
            version: options.version,
            onLoad: (err) => {
              onLoadFromShopify(resolve, reject, err);
            },
          },
        ]);
      } catch (err) {
        reject(err);
      }
    });
    loaders[key] = loader;
    return loader;
  }

  function onLoadFromShopify(resolve, reject, err) {
    if (err) {
      return reject(err);
    } else {
      return resolve();
    }
  }

  const selectors$2 = {
    videoIframe: '[data-video-id]',
  };

  const classes$2 = {
    loaded: 'loaded',
  };

  const attributes$1 = {
    dataEnableSound: 'data-enable-sound',
    dataEnableBackground: 'data-enable-background',
    dataEnableAutoplay: 'data-enable-autoplay',
    dataEnableLoop: 'data-enable-loop',
    dataVideoId: 'data-video-id',
    dataVideoType: 'data-video-type',
  };

  class LoadVideoVimeo {
    constructor(container) {
      this.container = container;
      this.player = this.container.querySelector(selectors$2.videoIframe);

      if (this.player) {
        this.videoID = this.player.getAttribute(attributes$1.dataVideoId);
        this.videoType = this.player.getAttribute(attributes$1.dataVideoType);
        this.enableBackground = this.player.getAttribute(attributes$1.dataEnableBackground) === 'true';
        this.disableSound = this.player.getAttribute(attributes$1.dataEnableSound) === 'false';
        this.enableAutoplay = this.player.getAttribute(attributes$1.dataEnableAutoplay) !== 'false';
        this.enableLoop = this.player.getAttribute(attributes$1.dataEnableLoop) !== 'false';

        if (this.videoType == 'vimeo') {
          this.init();
        }
      }
    }

    init() {
      this.loadVimeoPlayer();
    }

    loadVimeoPlayer() {
      const oembedUrl = 'https://vimeo.com/api/oembed.json';
      const vimeoUrl = 'https://vimeo.com/' + this.videoID;
      let paramsString = '';
      const state = this.player;

      const params = {
        url: vimeoUrl,
        background: this.enableBackground,
        muted: this.disableSound,
        autoplay: this.enableAutoplay,
        loop: this.enableLoop,
      };

      for (let key in params) {
        paramsString += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&';
      }

      fetch(`${oembedUrl}?${paramsString}`)
        .then((response) => response.json())
        .then(function (data) {
          state.innerHTML = data.html;

          setTimeout(function () {
            state.parentElement.classList.add(classes$2.loaded);
          }, 1000);
        })
        .catch(function () {
          console.log('error');
        });
    }
  }

  const selectors$3 = {
    videoIframe: '[data-video-id]',
    videoWrapper: '.video-wrapper',
    youtubeWrapper: '[data-youtube-wrapper]',
  };

  const attributes$2 = {
    dataSectionId: 'data-section-id',
    dataEnableSound: 'data-enable-sound',
    dataHideOptions: 'data-hide-options',
    dataCheckPlayerVisibility: 'data-check-player-visibility',
    dataVideoId: 'data-video-id',
    dataVideoType: 'data-video-type',
  };

  const classes$3 = {
    loaded: 'loaded',
  };

  const players = [];

  class LoadVideoYT {
    constructor(container) {
      this.container = container;
      this.player = this.container.querySelector(selectors$3.videoIframe);

      if (this.player) {
        this.videoOptionsVars = {};
        this.videoID = this.player.getAttribute(attributes$2.dataVideoId);
        this.videoType = this.player.getAttribute(attributes$2.dataVideoType);
        if (this.videoType == 'youtube') {
          this.checkPlayerVisibilityFlag = this.player.getAttribute(attributes$2.dataCheckPlayerVisibility) === 'true';
          this.playerID = this.player.querySelector(selectors$3.youtubeWrapper) ? this.player.querySelector(selectors$3.youtubeWrapper).id : this.player.id;
          if (this.player.hasAttribute(selectors$3.dataHideOptions)) {
            this.videoOptionsVars = {
              cc_load_policy: 0,
              iv_load_policy: 3,
              modestbranding: 1,
              playsinline: 1,
              autohide: 0,
              controls: 0,
              branding: 0,
              showinfo: 0,
              rel: 0,
              fs: 0,
              wmode: 'opaque',
            };
          }

          this.init();

          this.container.addEventListener('touchstart', function (e) {
            if (e.target.matches(selectors$3.videoWrapper) || e.target.closest(selectors$3.videoWrapper)) {
              const playerID = e.target.querySelector(selectors$3.videoIframe).id;
              players[playerID].playVideo();
            }
          });
        }
      }
    }

    init() {
      if (window.isYoutubeAPILoaded) {
        this.loadYoutubePlayer();
      } else {
        // Load Youtube API if not loaded yet
        loadScript({url: 'https://www.youtube.com/iframe_api'}).then(() => this.loadYoutubePlayer());
      }
    }

    loadYoutubePlayer() {
      const defaultYoutubeOptions = {
        height: '720',
        width: '1280',
        playerVars: this.videoOptionsVars,
        events: {
          onReady: (event) => {
            const eventIframe = event.target.getIframe();
            const id = eventIframe.id;
            const enableSound = document.querySelector(`#${id}`).getAttribute(attributes$2.dataEnableSound) === 'true';

            eventIframe.setAttribute('tabindex', '-1');

            if (enableSound) {
              event.target.unMute();
            } else {
              event.target.mute();
            }
            event.target.playVideo();

            if (this.checkPlayerVisibilityFlag) {
              this.checkPlayerVisibility(id);

              window.addEventListener(
                'scroll',
                throttle(() => {
                  this.checkPlayerVisibility(id);
                }, 150)
              );
            }
          },
          onStateChange: (event) => {
            // Loop video if state is ended
            if (event.data == 0) {
              event.target.playVideo();
            }
            if (event.data == 1) {
              // video is playing
              event.target.getIframe().parentElement.classList.add(classes$3.loaded);
            }
          },
        },
      };

      const currentYoutubeOptions = {...defaultYoutubeOptions};
      currentYoutubeOptions.videoId = this.videoID;
      if (this.videoID.length) {
        YT.ready(() => {
          players[this.playerID] = new YT.Player(this.playerID, currentYoutubeOptions);
        });
      }
      window.isYoutubeAPILoaded = true;
    }

    checkPlayerVisibility(id) {
      let playerID;
      if (typeof id === 'string') {
        playerID = id;
      } else if (id.data != undefined) {
        playerID = id.data.id;
      } else {
        return;
      }

      const playerElement = document.getElementById(playerID + '-container');
      if (!playerElement) {
        return;
      }
      const player = players[playerID];
      const box = playerElement.getBoundingClientRect();
      let isVisible = visibilityHelper.isElementPartiallyVisible(playerElement) || visibilityHelper.isElementTotallyVisible(playerElement);

      // Fix the issue when element height is bigger than the viewport height
      if (box.top < 0 && playerElement.clientHeight + box.top >= 0) {
        isVisible = true;
      }

      if (isVisible && player && typeof player.playVideo === 'function') {
        player.playVideo();
      } else if (!isVisible && player && typeof player.pauseVideo === 'function') {
        player.pauseVideo();
      }
    }

    onUnload() {
      const playerID = 'youtube-' + this.container.getAttribute(attributes$2.dataSectionId);
      if (!players[playerID]) {
        return;
      }
      players[playerID].destroy();
    }
  }

  const selectors$4 = {
    notificationForm: '[data-notification-form]',
    notification: '[data-notification]',
    popupClose: '[data-popup-close]',
  };

  const classes$4 = {
    popupSuccess: 'pswp--success',
    notificationPopupVisible: 'notification-popup-visible',
  };

  class LoadNotification {
    constructor(popup, pswpElement) {
      this.popup = popup;
      this.pswpElement = pswpElement;
      this.notificationForm = null;
      this.notificationStopSubmit = true;
      this.sessionStorage = window.sessionStorage;
      const notificationWrapper = this.pswpElement.querySelector(selectors$4.notification);
      this.outerCloseEvent = (e) => {
        if (!notificationWrapper.contains(e.target)) {
          this.popup.close();
        }
      };

      this.init();
    }

    init() {
      this.popup.listen('preventDragEvent', (e, isDown, preventObj) => {
        preventObj.prevent = false;
      });

      const notificationFormSuccess = window.location.search.indexOf('?customer_posted=true') !== -1;
      this.notificationForm = this.pswpElement.querySelector(selectors$4.notificationForm);
      const closeBtn = this.pswpElement.querySelector(selectors$4.popupClose);
      document.body.classList.add(classes$4.notificationPopupVisible);

      this.pswpElement.addEventListener('mousedown', () => {
        this.popup.framework.unbind(window, 'pointermove pointerup pointercancel', this.popup);
      });

      if (notificationFormSuccess) {
        this.pswpElement.classList.add(classes$4.popupSuccess);
      }

      this.notificationForm.addEventListener('submit', (e) => this.notificationSubmitEvent(e));

      // Custom closing events
      this.pswpElement.addEventListener('click', this.outerCloseEvent);

      closeBtn.addEventListener('click', () => {
        this.popup.close();
      });

      this.popup.listen('destroy', () => {
        this.notificationRemoveStorage();
        this.pswpElement.removeEventListener('click', this.outerCloseEvent);
        document.body.classList.remove(classes$4.notificationPopupVisible);
      });
    }

    notificationSubmitEvent(e) {
      if (this.notificationStopSubmit) {
        e.preventDefault();

        this.notificationRemoveStorage();
        this.notificationWriteStorage();
        this.notificationStopSubmit = false;
        this.notificationForm.submit();
      }
    }

    notificationWriteStorage() {
      if (this.sessionStorage !== undefined) {
        this.sessionStorage.setItem('notification_form_id', this.notificationForm.id);
      }
    }

    notificationRemoveStorage() {
      this.sessionStorage.removeItem('notification_form_id');
    }
  }

  // iOS smooth scrolling fix
  function flickitySmoothScrolling(slider) {
    const flkty = Flickity.data(slider);

    if (!flkty) {
      return;
    }

    flkty.on('dragStart', (event, pointer) => {
      document.ontouchmove = function (e) {
        e.preventDefault();
      };
    });

    flkty.on('dragEnd', (event, pointer) => {
      document.ontouchmove = function (e) {
        return true;
      };
    });
  }

  const hosts = {
    html5: 'html5',
    youtube: 'youtube',
    vimeo: 'vimeo',
  };

  const selectors$5 = {
    deferredMedia: '[data-deferred-media]',
    deferredMediaButton: '[data-deferred-media-button]',
    productMediaWrapper: '[data-product-single-media-wrapper]',
    mediaContainer: '[data-video]',
    mediaHidden: '.media--hidden',
  };

  const classes$5 = {
    mediaHidden: 'media--hidden',
  };

  const attributes$3 = {
    loaded: 'loaded',
    sectionId: 'data-section-id',
    dataAutoplayVideo: 'data-autoplay-video',
    mediaId: 'data-media-id',
  };

  class ProductVideo {
    constructor(container) {
      this.container = container;
      this.id = this.container.getAttribute(attributes$3.sectionId);
      this.autoplayVideo = this.container.getAttribute(attributes$3.dataAutoplayVideo) === 'true';
      this.players = {};
      this.init();
    }

    init() {
      const mediaContainers = this.container.querySelectorAll(selectors$5.mediaContainer);

      mediaContainers.forEach((mediaContainer) => {
        const deferredMediaButton = mediaContainer.querySelector(selectors$5.deferredMediaButton);

        if (deferredMediaButton) {
          deferredMediaButton.addEventListener('click', this.loadContent.bind(this, mediaContainer));
        }

        if (this.autoplayVideo) {
          this.loadContent(mediaContainer);
        }
      });
    }

    loadContent(mediaContainer) {
      if (mediaContainer.querySelector(selectors$5.deferredMedia).getAttribute(attributes$3.loaded)) {
        return;
      }

      const content = document.createElement('div');
      content.appendChild(mediaContainer.querySelector('template').content.firstElementChild.cloneNode(true));
      const mediaId = mediaContainer.dataset.mediaId;
      const element = content.querySelector('video, iframe');
      const host = this.hostFromVideoElement(element);
      const deferredMedia = mediaContainer.querySelector(selectors$5.deferredMedia);
      deferredMedia.appendChild(element);
      deferredMedia.setAttribute('loaded', true);

      this.players[mediaId] = {
        mediaId: mediaId,
        sectionId: this.id,
        container: mediaContainer,
        element: element,
        host: host,
        ready: () => {
          this.createPlayer(mediaId);
        },
      };

      const video = this.players[mediaId];

      switch (video.host) {
        case hosts.html5:
          this.loadVideo(video, hosts.html5);
          break;
        case hosts.vimeo:
          if (window.isVimeoAPILoaded) {
            this.loadVideo(video, hosts.vimeo);
          } else {
            loadScript({url: 'https://player.vimeo.com/api/player.js'}).then(() => this.loadVideo(video, hosts.vimeo));
          }
          break;
        case hosts.youtube:
          if (window.isYoutubeAPILoaded) {
            this.loadVideo(video, hosts.youtube);
          } else {
            loadScript({url: 'https://www.youtube.com/iframe_api'}).then(() => this.loadVideo(video, hosts.youtube));
          }
          break;
      }
    }

    hostFromVideoElement(video) {
      if (video.tagName === 'VIDEO') {
        return hosts.html5;
      }

      if (video.tagName === 'IFRAME') {
        if (/^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(video.src)) {
          return hosts.youtube;
        } else if (video.src.includes('vimeo.com')) {
          return hosts.vimeo;
        }
      }

      return null;
    }

    loadVideo(video, host) {
      if (video.host === host) {
        video.ready();
      }
    }

    createPlayer(mediaId) {
      const video = this.players[mediaId];

      switch (video.host) {
        case hosts.html5:
          video.element.addEventListener('play', () => {
            video.container.dispatchEvent(new CustomEvent('theme:media:play'), {bubbles: true});
          });

          const playPromise = video.element.play();
          if (playPromise !== undefined) {
            playPromise
              .then((_) => {
                // Automatic playback started!
                // Show playing UI.
              })
              .catch((error) => {
                // Auto-play was prevented
                // Show paused UI.
              });
          }

          video.container.addEventListener('theme:media:visible', (event) => this.onVisible(event));
          video.container.addEventListener('theme:media:hidden', (event) => this.onHidden(event));
          video.container.addEventListener('xrLaunch', (event) => this.onHidden(event));

          if (this.autoplayVideo) {
            this.observeVideo(video, mediaId);
          }

          break;
        case hosts.vimeo:
          this.players[mediaId].player = new Vimeo.Player(video.element);
          this.players[mediaId].player.play(); // Force video play on iOS
          video.container.dispatchEvent(new CustomEvent('theme:media:play'), {bubbles: true});

          window.isVimeoAPILoaded = true;

          video.container.addEventListener('theme:media:visible', (event) => this.onVisible(event));
          video.container.addEventListener('theme:media:hidden', (event) => this.onHidden(event));
          video.container.addEventListener('xrLaunch', (event) => this.onHidden(event));

          if (this.autoplayVideo) {
            this.observeVideo(video, mediaId);
          }

          break;
        case hosts.youtube:
          if (video.host == hosts.youtube && video.player) {
            return;
          }

          YT.ready(() => {
            const videoId = video.container.dataset.videoId;

            this.players[mediaId].player = new YT.Player(video.element, {
              videoId: videoId,
              events: {
                onReady: (event) => {
                  event.target.playVideo(); // Force video play on iOS
                  video.container.dispatchEvent(new CustomEvent('theme:media:play'), {bubbles: true});
                },
                onStateChange: (event) => {
                  // Playing
                  if (event.data == 1) {
                    video.container.dispatchEvent(new CustomEvent('theme:media:play'), {bubbles: true});
                  }

                  // Paused
                  if (event.data == 2) {
                    video.container.dispatchEvent(new CustomEvent('theme:media:pause'), {bubbles: true});
                  }
                },
              },
            });

            window.isYoutubeAPILoaded = true;

            video.container.addEventListener('theme:media:visible', (event) => this.onVisible(event));
            video.container.addEventListener('theme:media:hidden', (event) => this.onHidden(event));
            video.container.addEventListener('xrLaunch', (event) => this.onHidden(event));

            if (this.autoplayVideo) {
              this.observeVideo(video, mediaId);
            }
          });

          break;
      }

      video.container.addEventListener('theme:media:play', () => this.pauseOtherMedia(mediaId));
    }

    observeVideo(video) {
      let observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            const outsideViewport = entry.intersectionRatio == 0;
            const isVisible = !video.element.closest(selectors$5.mediaHidden);

            if (outsideViewport) {
              this.pauseVideo(video);
            } else if (isVisible) {
              this.playVideo(video);
            }
          });
        },
        {threshold: 0}
      );
      observer.observe(video.element);
    }

    playVideo(video) {
      if (video.player && video.player.playVideo) {
        video.player.playVideo();
      } else if (video.element && video.element.play) {
        video.element.play();
      } else if (video.player && video.player.play) {
        video.player.play();
      }
      video.container.dispatchEvent(new CustomEvent('theme:media:play'), {bubbles: true});
    }

    pauseVideo(video) {
      if (video.player && video.player.pauseVideo) {
        video.player.pauseVideo();
      } else if (video.element && video.element.pause) {
        video.element.pause();
      } else if (video.player && video.player.pause) {
        video.player.pause();
      }
      video.container.dispatchEvent(new CustomEvent('theme:media:pause'), {bubbles: true});
    }

    onHidden(event) {
      if (typeof event.target.dataset.mediaId !== 'undefined') {
        const mediaId = event.target.dataset.mediaId;
        const video = this.players[mediaId];
        this.pauseVideo(video);
      }
    }

    onVisible(event) {
      if (typeof event.target.dataset.mediaId !== 'undefined') {
        const mediaId = event.target.dataset.mediaId;
        const video = this.players[mediaId];
        this.playVideo(video);
        this.pauseOtherMedia(mediaId);
      }
    }

    pauseOtherMedia(mediaId) {
      const currentMedia = `[${attributes$3.mediaId}="${mediaId}"]`;
      const otherMedia = document.querySelectorAll(`${selectors$5.productMediaWrapper}:not(${currentMedia})`);

      if (otherMedia.length) {
        otherMedia.forEach((media) => {
          media.dispatchEvent(new CustomEvent('theme:media:hidden'), {bubbles: true});
          media.classList.add(classes$5.mediaHidden);
        });
      }
    }
  }

  const showElement = (elem, removeProp = false, prop = 'block') => {
    if (elem) {
      if (removeProp) {
        elem.style.removeProperty('display');
      } else {
        elem.style.display = prop;
      }
    }
  };

  const hideElement = (elem) => {
    if (elem) {
      elem.style.display = 'none';
    }
  };

  function Listeners() {
    this.entries = [];
  }

  Listeners.prototype.add = function (element, event, fn) {
    this.entries.push({element: element, event: event, fn: fn});
    element.addEventListener(event, fn);
  };

  Listeners.prototype.removeAll = function () {
    this.entries = this.entries.filter(function (listener) {
      listener.element.removeEventListener(listener.event, listener.fn);
      return false;
    });
  };

  /**
   * Find a match in the project JSON (using a ID number) and return the variant (as an Object)
   * @param {Object} product Product JSON object
   * @param {Number} value Accepts Number (e.g. 6908023078973)
   * @returns {Object} The variant object once a match has been successful. Otherwise null will be return
   */

  /**
   * Convert the Object (with 'name' and 'value' keys) into an Array of values, then find a match & return the variant (as an Object)
   * @param {Object} product Product JSON object
   * @param {Object} collection Object with 'name' and 'value' keys (e.g. [{ name: "Size", value: "36" }, { name: "Color", value: "Black" }])
   * @returns {Object || null} The variant object once a match has been successful. Otherwise null will be returned
   */
  function getVariantFromSerializedArray(product, collection) {
    _validateProductStructure(product);

    // If value is an array of options
    var optionArray = _createOptionArrayFromOptionCollection(product, collection);
    return getVariantFromOptionArray(product, optionArray);
  }

  /**
   * Find a match in the project JSON (using Array with option values) and return the variant (as an Object)
   * @param {Object} product Product JSON object
   * @param {Array} options List of submitted values (e.g. ['36', 'Black'])
   * @returns {Object || null} The variant object once a match has been successful. Otherwise null will be returned
   */
  function getVariantFromOptionArray(product, options) {
    _validateProductStructure(product);
    _validateOptionsArray(options);

    var result = product.variants.filter(function (variant) {
      return options.every(function (option, index) {
        return variant.options[index] === option;
      });
    });

    return result[0] || null;
  }

  /**
   * Creates an array of selected options from the object
   * Loops through the project.options and check if the "option name" exist (product.options.name) and matches the target
   * @param {Object} product Product JSON object
   * @param {Array} collection Array of object (e.g. [{ name: "Size", value: "36" }, { name: "Color", value: "Black" }])
   * @returns {Array} The result of the matched values. (e.g. ['36', 'Black'])
   */
  function _createOptionArrayFromOptionCollection(product, collection) {
    _validateProductStructure(product);
    _validateSerializedArray(collection);

    var optionArray = [];

    collection.forEach(function (option) {
      for (var i = 0; i < product.options.length; i++) {
        var name = product.options[i].name || product.options[i];
        if (name.toLowerCase() === option.name.toLowerCase()) {
          optionArray[i] = option.value;
          break;
        }
      }
    });

    return optionArray;
  }

  /**
   * Check if the product data is a valid JS object
   * Error will be thrown if type is invalid
   * @param {object} product Product JSON object
   */
  function _validateProductStructure(product) {
    if (typeof product !== 'object') {
      throw new TypeError(product + ' is not an object.');
    }

    if (Object.keys(product).length === 0 && product.constructor === Object) {
      throw new Error(product + ' is empty.');
    }
  }

  /**
   * Validate the structure of the array
   * It must be formatted like jQuery's serializeArray()
   * @param {Array} collection Array of object [{ name: "Size", value: "36" }, { name: "Color", value: "Black" }]
   */
  function _validateSerializedArray(collection) {
    if (!Array.isArray(collection)) {
      throw new TypeError(collection + ' is not an array.');
    }

    if (collection.length === 0) {
      throw new Error(collection + ' is empty.');
    }

    if (collection[0].hasOwnProperty('name')) {
      if (typeof collection[0].name !== 'string') {
        throw new TypeError('Invalid value type passed for name of option ' + collection[0].name + '. Value should be string.');
      }
    } else {
      throw new Error(collection[0] + 'does not contain name key.');
    }
  }

  /**
   * Validate the structure of the array
   * It must be formatted as list of values
   * @param {Array} collection Array of object (e.g. ['36', 'Black'])
   */
  function _validateOptionsArray(options) {
    if (Array.isArray(options) && typeof options[0] === 'object') {
      throw new Error(options + 'is not a valid array of options.');
    }
  }

  var selectors$6 = {
    idInput: '[name="id"]',
    planInput: '[name="selling_plan"]',
    optionInput: '[name^="options"]',
    quantityInput: '[name="quantity"]',
    propertyInput: '[name^="properties"]',
  };

  /**
   * Constructor class that creates a new instance of a product form controller.
   *
   * @param {Element} element - DOM element which is equal to the <form> node wrapping product form inputs
   * @param {Object} product - A product object
   * @param {Object} options - Optional options object
   * @param {Function} options.onOptionChange - Callback for whenever an option input changes
   * @param {Function} options.onPlanChange - Callback for changes to name=selling_plan
   * @param {Function} options.onQuantityChange - Callback for whenever an quantity input changes
   * @param {Function} options.onPropertyChange - Callback for whenever a property input changes
   * @param {Function} options.onFormSubmit - Callback for whenever the product form is submitted
   */
  class ProductForm {
    constructor(element, product, options) {
      this.element = element;
      this.form = this.element.tagName == 'FORM' ? this.element : this.element.querySelector('form');
      this.product = this._validateProductObject(product);
      this.variantElement = this.element.querySelector(selectors$6.idInput);

      options = options || {};

      this._listeners = new Listeners();
      this._listeners.add(this.element, 'submit', this._onSubmit.bind(this, options));

      this.optionInputs = this._initInputs(selectors$6.optionInput, options.onOptionChange);

      this.planInputs = this._initInputs(selectors$6.planInput, options.onPlanChange);

      this.quantityInputs = this._initInputs(selectors$6.quantityInput, options.onQuantityChange);

      this.propertyInputs = this._initInputs(selectors$6.propertyInput, options.onPropertyChange);
    }

    /**
     * Cleans up all event handlers that were assigned when the Product Form was constructed.
     * Useful for use when a section needs to be reloaded in the theme editor.
     */
    destroy() {
      this._listeners.removeAll();
    }

    /**
     * Getter method which returns the array of currently selected option values
     *
     * @returns {Array} An array of option values
     */
    options() {
      return this._serializeInputValues(this.optionInputs, function (item) {
        var regex = /(?:^(options\[))(.*?)(?:\])/;
        item.name = regex.exec(item.name)[2]; // Use just the value between 'options[' and ']'
        return item;
      });
    }

    /**
     * Getter method which returns the currently selected variant, or `null` if variant
     * doesn't exist.
     *
     * @returns {Object|null} Variant object
     */
    variant() {
      const opts = this.options();
      if (opts.length) {
        return getVariantFromSerializedArray(this.product, opts);
      } else {
        return this.product.variants[0];
      }
    }

    /**
     * Getter method which returns the current selling plan, or `null` if plan
     * doesn't exist.
     *
     * @returns {Object|null} Variant object
     */
    plan(variant) {
      let plan = {
        allocation: null,
        group: null,
        detail: null,
      };
      const formData = new FormData(this.form);
      const id = formData.get('selling_plan');

      if (id && variant) {
        plan.allocation = variant.selling_plan_allocations.find(function (item) {
          return item.selling_plan_id.toString() === id.toString();
        });
      }
      if (plan.allocation) {
        plan.group = this.product.selling_plan_groups.find(function (item) {
          return item.id.toString() === plan.allocation.selling_plan_group_id.toString();
        });
      }
      if (plan.group) {
        plan.detail = plan.group.selling_plans.find(function (item) {
          return item.id.toString() === id.toString();
        });
      }

      if (plan && plan.allocation && plan.detail && plan.allocation) {
        return plan;
      } else return null;
    }

    /**
     * Getter method which returns a collection of objects containing name and values
     * of property inputs
     *
     * @returns {Array} Collection of objects with name and value keys
     */
    properties() {
      return this._serializeInputValues(this.propertyInputs, function (item) {
        var regex = /(?:^(properties\[))(.*?)(?:\])/;
        item.name = regex.exec(item.name)[2]; // Use just the value between 'properties[' and ']'
        return item;
      });
    }

    /**
     * Getter method which returns the current quantity or 1 if no quantity input is
     * included in the form
     *
     * @returns {Array} Collection of objects with name and value keys
     */
    quantity() {
      return this.quantityInputs[0] ? Number.parseInt(this.quantityInputs[0].value, 10) : 1;
    }

    getFormState() {
      const variant = this.variant();
      return {
        options: this.options(),
        variant: variant,
        properties: this.properties(),
        quantity: this.quantity(),
        plan: this.plan(variant),
      };
    }

    // Private Methods
    // -----------------------------------------------------------------------------
    _setIdInputValue(variant) {
      if (variant && variant.id) {
        this.variantElement.value = variant.id.toString();
      } else {
        this.variantElement.value = '';
      }

      this.variantElement.dispatchEvent(new Event('change'));
    }

    _onSubmit(options, event) {
      event.dataset = this.getFormState();
      if (options.onFormSubmit) {
        options.onFormSubmit(event);
      }
    }

    _onOptionChange(event) {
      this._setIdInputValue(event.dataset.variant);
    }

    _onFormEvent(cb) {
      if (typeof cb === 'undefined') {
        return Function.prototype.bind();
      }

      return function (event) {
        event.dataset = this.getFormState();
        this._setIdInputValue(event.dataset.variant);
        cb(event);
      }.bind(this);
    }

    _initInputs(selector, cb) {
      var elements = Array.prototype.slice.call(this.element.querySelectorAll(selector));

      return elements.map(
        function (element) {
          this._listeners.add(element, 'change', this._onFormEvent(cb));
          return element;
        }.bind(this)
      );
    }

    _serializeInputValues(inputs, transform) {
      return inputs.reduce(function (options, input) {
        if (
          input.checked || // If input is a checked (means type radio or checkbox)
          (input.type !== 'radio' && input.type !== 'checkbox') // Or if its any other type of input
        ) {
          options.push(transform({name: input.name, value: input.value}));
        }

        return options;
      }, []);
    }

    _validateProductObject(product) {
      if (typeof product !== 'object') {
        throw new TypeError(product + ' is not an object.');
      }

      if (typeof product.variants[0].options === 'undefined') {
        throw new TypeError('Product object is invalid. Make sure you use the product object that is output from null or from the http://[your-product-url].js route');
      }
      return product;
    }
  }

  const selectors$7 = {
    list: '[data-store-availability-list]',
  };

  const defaults = {
    close: '.js-modal-close',
    open: '.js-modal-open-store-availability-modal',
    openClass: 'modal--is-active',
    openBodyClass: 'modal--is-visible',
    closeModalOnClick: false,
    scrollIntoView: false,
  };

  class Modals {
    constructor(id, options) {
      this.modal = document.getElementById(id);

      if (!this.modal) return false;

      this.nodes = {
        parents: [document.querySelector('html'), document.body],
      };
      this.config = Object.assign(defaults, options);
      this.modalIsOpen = false;
      this.focusOnOpen = this.config.focusOnOpen ? document.getElementById(this.config.focusOnOpen) : this.modal;
      this.openElement = document.querySelector(this.config.open);
      this.init();
    }

    init() {
      this.openElement.addEventListener('click', this.open.bind(this));
      this.modal.querySelector(this.config.close).addEventListener('click', this.closeModal.bind(this));
    }

    open(evt) {
      // Keep track if modal was opened from a click, or called by another function
      let externalCall = false;
      // Prevent following href if link is clicked
      if (evt) {
        evt.preventDefault();
      } else {
        externalCall = true;
      }

      if (this.modalIsOpen && !externalCall) {
        this.closeModal();
        return;
      }

      this.modal.classList.add(this.config.openClass);
      this.nodes.parents.forEach((node) => {
        node.classList.add(this.config.openBodyClass);
      });
      this.modalIsOpen = true;

      const scrollableElement = document.querySelector(selectors$7.list);
      document.dispatchEvent(new CustomEvent('theme:scroll:lock', {bubbles: true, detail: scrollableElement}));

      if (this.config.scrollIntoView) {
        this.scrollIntoView();
      }
      this.bindEvents();

      slate.a11y.trapFocus({
        container: this.modal,
      });
    }

    closeModal() {
      if (!this.modalIsOpen) return;
      document.activeElement.blur();
      this.modal.classList.remove(this.config.openClass);
      var self = this;
      this.nodes.parents.forEach(function (node) {
        node.classList.remove(self.config.openBodyClass);
      });
      this.modalIsOpen = false;
      this.openElement.focus();
      this.unbindEvents();

      slate.a11y.removeTrapFocus({
        container: this.modal,
      });

      // Enable page scroll right after the closing animation ends
      const timeout = 400;
      document.dispatchEvent(new CustomEvent('theme:scroll:unlock', {bubbles: true, detail: timeout}));
    }

    bindEvents() {
      this.keyupHandler = this.keyupHandler.bind(this);
      this.clickHandler = this.clickHandler.bind(this);
      document.body.addEventListener('keyup', this.keyupHandler);
      document.body.addEventListener('click', this.clickHandler);
    }

    unbindEvents() {
      document.body.removeEventListener('keyup', this.keyupHandler);
      document.body.removeEventListener('click', this.clickHandler);
    }

    keyupHandler(event) {
      if (event.keyCode === theme.keyboardKeys.ESCAPE) {
        this.closeModal();
      }
    }

    clickHandler(event) {
      if (this.config.closeModalOnClick && !this.modal.contains(event.target) && !event.target.matches(this.config.open)) {
        this.closeModal();
      }
    }

    scrollIntoView() {
      this.focusOnOpen.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }

  const selectors$8 = {
    body: 'body',
    storeAvailabilityModal: '[data-store-availability-modal]',
    storeAvailabilityModalOpen: '[data-store-availability-modal-open]',
    storeAvailabilityModalClose: '[data-store-availability-modal-close]',
    storeAvailabilityModalProductTitle: '[data-store-availability-modal-product__title]',
  };

  const classes$6 = {
    openClass: 'store-availabilities-modal--active',
  };

  class StoreAvailability {
    constructor(container) {
      this.container = container;
    }

    updateContent(variantId, productTitle) {
      this._fetchStoreAvailabilities(variantId, productTitle);
    }

    clearContent() {
      this.container.innerHTML = '';
    }

    _initModal() {
      return new Modals('StoreAvailabilityModal', {
        close: selectors$8.storeAvailabilityModalClose,
        open: selectors$8.storeAvailabilityModalOpen,
        closeModalOnClick: true,
        openClass: classes$6.openClass,
        scrollIntoView: false,
      });
    }

    _fetchStoreAvailabilities(variantId, productTitle) {
      const variantSectionUrl = '/variants/' + variantId + '/?section_id=store-availability';
      this.clearContent();

      const self = this;
      fetch(variantSectionUrl)
        .then(function (response) {
          return response.text();
        })
        .then(function (storeAvailabilityHTML) {
          const body = document.querySelector(selectors$8.body);
          let storeAvailabilityModal = body.querySelector(selectors$8.storeAvailabilityModal);
          if (storeAvailabilityModal) {
            storeAvailabilityModal.remove();
          }

          self.container.innerHTML = storeAvailabilityHTML;
          self.container.innerHTML = self.container.firstElementChild.innerHTML;

          if (self.container.firstElementChild.innerHTML.trim() === '') {
            self.clearContent();
            return;
          }

          const storeAvailabilityModalOpen = self.container.querySelector(selectors$8.storeAvailabilityModalOpen);
          // Only create modal if open modal element exists
          if (!storeAvailabilityModalOpen) {
            return;
          }

          self.modal = self._initModal();
          self._updateProductTitle(productTitle);

          storeAvailabilityModal = self.container.querySelector(selectors$8.storeAvailabilityModal);
          if (storeAvailabilityModal) {
            body.appendChild(storeAvailabilityModal);
          }
        });
    }

    _updateProductTitle(productTitle) {
      const storeAvailabilityModalProductTitle = this.container.querySelector(selectors$8.storeAvailabilityModalProductTitle);
      storeAvailabilityModalProductTitle.textContent = productTitle;
    }
  }

  /**
   * Variant Sellout Precrime Click Preview
   * I think of this like the precrime machine in Minority report.  It gives a preview
   * of every possible click action, given the current form state.  The logic is:
   *
   * for each clickable name=options[] variant selection element
   * find the value of the form if the element were clicked
   * lookup the variant with those value in the product json
   * clear the classes, add .unavailable if it's not found,
   * and add .sold-out if it is out of stock
   *
   * Caveat: we rely on the option position so we don't need
   * to keep a complex map of keys and values.
   */

  const selectors$9 = {
    form: '[data-product-form]',
    optionPosition: '[data-option-position]',
    optionInput: '[name^="options"], [data-popout-option]',
  };

  const classes$7 = {
    soldOut: 'sold-out',
    unavailable: 'unavailable',
  };

  const attributes$4 = {
    optionPosition: 'data-option-position',
    selectOptionValue: 'data-value',
  };

  class SelloutVariants {
    constructor(container, productJSON) {
      this.container = container;
      this.productJSON = productJSON;
      this.form = this.container.querySelector(selectors$9.form);
      this.formData = new FormData(this.form);
      this.optionElements = this.container.querySelectorAll(selectors$9.optionInput);

      if (this.productJSON && this.form) {
        this.init();
      }
    }

    init() {
      this.update();
    }

    update() {
      this.getCurrentState();

      this.optionElements.forEach((el) => {
        const val = el.value || el.getAttribute(attributes$4.selectOptionValue);
        const optionSelector = el.closest(selectors$9.optionPosition);

        if (!optionSelector) {
          return;
        }

        const positionString = optionSelector.getAttribute(attributes$4.optionPosition);
        // subtract one because option.position in liquid does not count form zero, but JS arrays do
        const position = parseInt(positionString, 10) - 1;

        let newVals = [...this.selections];
        newVals[position] = val;

        const found = this.productJSON.variants.find((element) => {
          // only return true if every option matches our hypothetical selection
          let perfectMatch = true;
          for (let index = 0; index < newVals.length; index++) {
            if (element.options[index] !== newVals[index]) {
              perfectMatch = false;
            }
          }
          return perfectMatch;
        });

        el.parentElement.classList.remove(classes$7.soldOut, classes$7.unavailable);
        if (typeof found === 'undefined') {
          el.parentElement.classList.add(classes$7.unavailable);
        } else if (found?.available === false) {
          el.parentElement.classList.add(classes$7.soldOut);
        }
      });
    }

    getCurrentState() {
      this.formData = new FormData(this.form);
      this.selections = [];
      for (var value of this.formData.entries()) {
        if (value[0].includes('options[')) {
          // push the current state of the form, dont worry about the group name
          // we will be using the array position instead of the name to match values
          this.selections.push(value[1]);
        }
      }
    }
  }

  /*
  Usage:
    import {NotificationPopup} from '../features/notification-popup';

    if (button.hasAttribute(attributes.notificationPopup) {
      new NotificationPopup(button);
    }

  */

  const settings$1 = {
    templateIndex: 1,
  };

  const classes$8 = {
    popupNotification: 'pswp--notification pswp--not-close-btn',
  };

  const attributes$5 = {
    notificationPopup: 'data-notification-popup',
  };

  const options = {
    history: false,
    focus: false,
    mainClass: classes$8.popupNotification,
    closeOnVerticalDrag: false,
  };

  class NotificationPopup {
    constructor(button) {
      this.button = button;

      this.notificationPopupHtml = this.button.getAttribute(attributes$5.notificationPopup);

      if (this.notificationPopupHtml.trim() !== '') {
        this.init();
      }
    }

    init() {
      const items = [
        {
          html: this.notificationPopupHtml,
        },
      ];

      slate.a11y.state.trigger = this.button;

      new LoadPhotoswipe(items, options, settings$1.templateIndex);
    }
  }

  const selectors$a = {
    product: '[data-product]',
    productForm: '[data-product-form]',
    addToCart: '[data-add-to-cart]',
    addToCartText: '[data-add-to-cart-text]',
    buyItNow: '[data-buy-it-now]',
    comparePrice: '[data-compare-price]',
    formWrapper: '[data-form-wrapper]',
    header: '[data-site-header]',
    originalSelectorId: '[data-product-select]',
    preOrderTag: '_preorder',
    priceWrapper: '[data-price-wrapper]',
    priceOffWrap: '[data-price-off]',
    priceOffType: '[data-price-off-type]',
    priceOffAmount: '[data-price-off-amount]',
    productMediaSlider: '[data-product-single-media-slider]',
    productJson: '[data-product-json]',
    productPrice: '[data-product-price]',
    unitPrice: '[data-product-unit-price]',
    unitBase: '[data-product-base]',
    unitWrapper: '[data-product-unit]',
    subPrices: '[data-subscription-watch-price]',
    subSelectors: '[data-subscription-selectors]',
    subsToggle: '[data-toggles-group]',
    subsChild: 'data-group-toggle',
    subDescription: '[data-plan-description]',
    remainingCount: '[data-remaining-count]',
    remainingWrapper: '[data-remaining-wrapper]',
    remainingJSON: '[data-product-remaining-json]',
    idInput: '[name="id"]',
    storeAvailabilityContainer: '[data-store-availability-container]',
    upsellButton: '[data-upsell-btn]',
    sectionNode: '.shopify-section',
  };

  const classes$9 = {
    hidden: 'hidden',
    variantSoldOut: 'variant--soldout',
    variantUnavailable: 'variant--unavailabe',
    productPriceSale: 'product__price--sale',
    priceWrapperHidden: 'product__price--hidden',
    remainingLow: 'count-is-low',
    remainingIn: 'count-is-in',
    remainingOut: 'count-is-out',
    remainingUnavailable: 'count-is-unavailable',
  };

  const attributes$6 = {
    dataEnableHistoryState: 'data-enable-history-state',
    notificationPopup: 'data-notification-popup',
  };

  class ProductAddForm {
    constructor(container) {
      this.container = container;
      this.product = this.container.querySelector(selectors$a.product);
      this.productForm = this.container.querySelector(selectors$a.productForm);

      // Stop parsing if we don't have the product
      if (!this.product || !this.productForm) {
        const counter = new QuantityCounter(this.container);
        counter.init();
        return;
      }

      this.storeAvailabilityContainer = this.container.querySelector(selectors$a.storeAvailabilityContainer);
      this.enableHistoryState = this.container.getAttribute(attributes$6.dataEnableHistoryState) === 'true';
      this.hasUnitPricing = this.container.querySelector(selectors$a.unitWrapper);
      this.subSelectors = this.container.querySelector(selectors$a.subSelectors);
      this.subPrices = this.container.querySelector(selectors$a.subPrices);

      this.priceOffWrap = this.container.querySelector(selectors$a.priceOffWrap);
      this.priceOffAmount = this.container.querySelector(selectors$a.priceOffAmount);
      this.priceOffType = this.container.querySelector(selectors$a.priceOffType);
      this.planDecription = this.container.querySelector(selectors$a.subDescription);
      this.latestVariantId = '';
      this.latestVariantTitle = '';
      this.sellout = null;

      this.sessionStorage = window.sessionStorage;

      this.remainingWrapper = this.container.querySelector(selectors$a.remainingWrapper);

      if (this.remainingWrapper) {
        this.remainingMaxInt = parseInt(this.remainingWrapper.dataset.remainingMax, 10);
        this.remainingCount = this.container.querySelector(selectors$a.remainingCount);
        this.remainingJSONWrapper = this.container.querySelector(selectors$a.remainingJSON);
        this.remainingJSON = null;

        if (this.remainingJSONWrapper && this.remainingJSONWrapper.innerHTML !== '') {
          this.remainingJSON = JSON.parse(this.remainingJSONWrapper.innerHTML);
        }
      }

      if (this.storeAvailabilityContainer) {
        this.storeAvailability = new StoreAvailability(this.storeAvailabilityContainer);
      }

      const counter = new QuantityCounter(this.container);
      counter.init();

      this.init();
    }

    init() {
      let productJSON = null;
      const productElemJSON = this.container.querySelector(selectors$a.productJson);

      if (productElemJSON) {
        productJSON = productElemJSON.innerHTML;
      }
      if (productJSON) {
        this.productJSON = JSON.parse(productJSON);
        this.linkForm();
        this.sellout = new SelloutVariants(this.container, this.productJSON);
      } else {
        console.error('Missing product JSON');
      }

      
    }

    destroy() {
      this.productForm.destroy();
    }

    linkForm() {
      this.productForm = new ProductForm(this.productForm, this.productJSON, {
        onOptionChange: this.onOptionChange.bind(this),
        onPlanChange: this.onPlanChange.bind(this),
      });
      this.pushState(this.productForm.getFormState());
      this.subsToggleListeners();

    }

    onOptionChange(evt) {
      this.pushState(evt.dataset);
      this.updateProductImage(evt);
    }

    onPlanChange(evt) {
      if (this.subPrices) {
        this.pushState(evt.dataset);
      }
    }

    pushState(formState) {
      this.productState = this.setProductState(formState);
      this.updateAddToCartState(formState);
      this.updateProductPrices(formState);
      this.updateSaleText(formState);
      this.updateSubscriptionText(formState);
      this.fireHookEvent(formState);
      this.updateRemaining(formState);
      this.sellout?.update(formState);
      if (this.enableHistoryState) {
        this.updateHistoryState(formState);
      }

      if (this.storeAvailability) {
        if (formState.variant) {
          this.storeAvailability.updateContent(formState.variant.id, this.productForm.product.title);
        } else {
          this.storeAvailability.clearContent();
        }
      }
      
    }

    updateAddToCartState(formState) {
      console.log("updateAddToCartState")
      const variant = formState.variant;
      const priceWrapper = this.container.querySelectorAll(selectors$a.priceWrapper);
      const addToCart = this.container.querySelectorAll(selectors$a.addToCart);
      const addToCartText = this.container.querySelectorAll(selectors$a.addToCartText);
      const formWrapper = this.container.querySelectorAll(selectors$a.formWrapper);
      const buyItNow = this.container.querySelector(selectors$a.buyItNow);
      let addText = theme.strings.add_to_cart;

      if (this.productJSON.tags.includes(selectors$a.preOrderTag)) {
        addText = theme.strings.preorder;
      }

      if (priceWrapper.length) {
        priceWrapper.forEach((element) => {
          if (variant) {
            element.classList.remove(classes$9.priceWrapperHidden);
          } else {
            element.classList.add(classes$9.priceWrapperHidden);
          }
        });
      }

      if (addToCart.length) {
        addToCart.forEach((element) => {
          // Skip the upsell "add to cart" button
          if (element.matches(selectors$a.upsellButton)) {
            return;
          }

          element.disabled = true;

          if (buyItNow) {
            buyItNow.classList.add(classes$9.hidden);
          }

          if (variant) {
            element.disabled = false;

            if (variant.available) {
              if (buyItNow) {
                buyItNow.classList.remove(classes$9.hidden);
              }
            }

            if (element.hasAttribute(attributes$6.notificationPopup)) {
              const notificationFormId = element.id.replace('AddToCart', 'NotificationForm');
              const formID = this.sessionStorage.getItem('notification_form_id');
              let notificationFormSubmitted = false;
              let variantId = variant.id;
              let variantTitle = variant.title;

              if (formID) {
                const sessionId = formID.substring(0, formID.lastIndexOf('--'));
                const sessionVariantId = formID.split('--').slice(-1)[0];
                notificationFormSubmitted = notificationFormId === sessionId;

                if (notificationFormSubmitted) {
                  this.latestVariantId = variantId;
                  this.latestVariantTitle = variantTitle;
                  variantId = Number(sessionVariantId);

                  this.productJSON.variants.forEach((variant) => {
                    if (variant.id === variantId) {
                      variantTitle = variant.title;
                    }
                  });
                }
              }

              let notificationPopupHtml = element.getAttribute(attributes$6.notificationPopup);

              if (this.latestVariantId != '' && this.latestVariantTitle != '') {
                notificationPopupHtml = notificationPopupHtml.replaceAll(this.latestVariantId, variantId);
                notificationPopupHtml = notificationPopupHtml.replaceAll(this.latestVariantTitle, variantTitle);
              }

              element.setAttribute(attributes$6.notificationPopup, notificationPopupHtml);

              if (notificationFormSubmitted) {
                this.scrollToForm(this.product.closest(selectors$a.sectionNode));
                new NotificationPopup(element);
              }

              this.latestVariantId = variantId;
              this.latestVariantTitle = variantTitle;
            }
          }
        });
      }

      if (addToCartText.length) {
        addToCartText.forEach((element) => {
          if (variant) {
            if (variant.available) {
              element.innerHTML = addText;
            } else {
              element.innerHTML = theme.strings.sold_out;

              if (element.parentNode.hasAttribute(attributes$6.notificationPopup)) {
                element.innerHTML = `${theme.strings.sold_out} ${theme.strings.newsletter_product_availability}`;
              }
            }
          } else {
            element.innerHTML = theme.strings.unavailable;
          }
        });
      }

      if (formWrapper.length) {
        formWrapper.forEach((element) => {
          if (variant) {
            if (variant.available) {
              element.classList.remove(classes$9.variantSoldOut, classes$9.variantUnavailable);
            } else {
              element.classList.add(classes$9.variantSoldOut);
              element.classList.remove(classes$9.variantUnavailable);
            }
            const formSelect = element.querySelector(selectors$a.originalSelectorId);
            if (formSelect) {
              formSelect.value = variant.id;
            }
          } else {
            element.classList.add(classes$9.variantUnavailable);
            element.classList.remove(classes$9.variantSoldOut);
          }
        });
      }
    }

    updateHistoryState(formState) {
      const variant = formState.variant;
      const plan = formState.plan;
      const location = window.location.href;
      if (variant && location.includes('/product')) {
        const url = new window.URL(location);
        const params = url.searchParams;
        params.set('variant', variant.id);
        if (plan && plan.detail && plan.detail.id && this.productState.hasPlan) {
          params.set('selling_plan', plan.detail.id);
        } else {
          params.delete('selling_plan');
        }
        url.search = params.toString();
        const urlString = url.toString();
        window.history.replaceState({path: urlString}, '', urlString);
      }
    }

    updateRemaining(formState) {
      const variant = formState.variant;
      const remainingClasses = [classes$9.remainingIn, classes$9.remainingOut, classes$9.remainingUnavailable, classes$9.remainingLow];

      if (variant && this.remainingWrapper && this.remainingJSON) {
        const remaining = this.remainingJSON[variant.id];

        if (remaining === 'out' || remaining < 1) {
          this.remainingWrapper.classList.remove(...remainingClasses);
          this.remainingWrapper.classList.add(classes$9.remainingOut);
        }

        if (remaining === 'in' || remaining >= this.remainingMaxInt) {
          this.remainingWrapper.classList.remove(...remainingClasses);
          this.remainingWrapper.classList.add(classes$9.remainingIn);
        }

        if (remaining === 'low' || (remaining > 0 && remaining < this.remainingMaxInt)) {
          this.remainingWrapper.classList.remove(...remainingClasses);
          this.remainingWrapper.classList.add(classes$9.remainingLow);

          if (this.remainingCount) {
            this.remainingCount.innerHTML = remaining;
          }
        }
      } else if (!variant && this.remainingWrapper) {
        this.remainingWrapper.classList.remove(...remainingClasses);
        this.remainingWrapper.classList.add(classes$9.remainingUnavailable);
      }
    }

    getBaseUnit(variant) {
      return variant.unit_price_measurement.reference_value === 1
        ? variant.unit_price_measurement.reference_unit
        : variant.unit_price_measurement.reference_value + variant.unit_price_measurement.reference_unit;
    }

    subsToggleListeners() {
      const toggles = this.container.querySelectorAll(selectors$a.subsToggle);

      toggles.forEach((toggle) => {
        toggle.addEventListener(
          'change',
          function (e) {
            const val = e.target.value.toString();
            const selected = this.container.querySelector(`[${selectors$a.subsChild}="${val}"]`);
            const groups = this.container.querySelectorAll(`[${selectors$a.subsChild}]`);
            if (selected) {
              selected.classList.remove(classes$9.hidden);
              const first = selected.querySelector('[name="selling_plan"]');
              first.checked = true;
              first.dispatchEvent(new Event('change'));
            }
            groups.forEach((group) => {
              if (group !== selected) {
                group.classList.add(classes$9.hidden);
                const plans = group.querySelectorAll('[name="selling_plan"]');
                plans.forEach((plan) => {
                  plan.checked = false;
                  plan.dispatchEvent(new Event('change'));
                });
              }
            });
          }.bind(this)
        );
      });
    }

    updateSaleText(formState) {
      if (this.productState.planSale) {
        this.updateSaleTextSubscription(formState);
      } else if (this.productState.onSale) {
        this.updateSaleTextStandard(formState);
      } else if (this.priceOffWrap) {
        this.priceOffWrap.classList.add(classes$9.hidden);
      }
    }

    updateSaleTextStandard(formState) {
      if (!this.priceOffType) {
        return;
      }
      this.priceOffType.innerHTML = window.theme.strings.sale_badge_text || 'sale';
      const variant = formState.variant;
      if (window.theme.settings.savingBadgeType && window.theme.settings.savingBadgeType === 'percentage') {
        const discountFloat = (variant.compare_at_price - variant.price) / variant.compare_at_price;
        const discountInt = Math.floor(discountFloat * 100);
        this.priceOffAmount.innerHTML = `${discountInt}%`;
      } else {
        const discount = variant.compare_at_price - variant.price;
        this.priceOffAmount.innerHTML = themeCurrency.formatMoney(discount, theme.moneyFormat);
      }
      this.priceOffWrap.classList.remove(classes$9.hidden);
    }

    updateSaleTextSubscription(formState) {
      this.priceOffType.innerHTML = window.theme.strings.subscription || 'subscripton';
      const variant = formState.variant;
      const adjustment = formState.plan.detail.price_adjustments[0];
      const discount = adjustment.value;
      if (adjustment && adjustment.value_type === 'percentage') {
        this.priceOffAmount.innerHTML = `${discount}%`;
      } else if (adjustment && adjustment.value_type === 'price') {
        this.priceOffAmount.innerHTML = themeCurrency.formatMoney(variant.price - adjustment.value, theme.moneyFormat);
      } else {
        this.priceOffAmount.innerHTML = themeCurrency.formatMoney(discount, theme.moneyFormat);
      }
      this.priceOffWrap.classList.remove(classes$9.hidden);
    }

    updateSubscriptionText(formState) {
      if (formState.plan && this.planDecription && formState.plan.detail.description !== null) {
        this.planDecription.innerHTML = formState.plan.detail.description;
        this.planDecription.classList.remove(classes$9.hidden);
      } else if (this.planDecription) {
        this.planDecription.classList.add(classes$9.hidden);
      }
    }
    
    updateProductPrices(formState) {
      const variant = formState.variant;
      const plan = formState.plan;
      const priceWrappers = this.container.querySelectorAll(selectors$a.priceWrapper);

      priceWrappers.forEach((wrap) => {
        let formQuantity = Number(document.querySelector(".product__form__wrapper input[name='quantity']").value);
        const comparePriceEl = wrap.querySelector(selectors$a.comparePrice);
        const productPriceEl = wrap.querySelector(selectors$a.productPrice);

        let comparePrice = '';
        let price = '';

        if (this.productState.available) {
          comparePrice = variant.compare_at_price * formQuantity;
          price = variant.price * formQuantity;
        }

        if (this.productState.hasPlan) {
          price = plan.allocation.price * formQuantity;
        }

        if (this.productState.planSale) {
          comparePrice = plan.allocation.compare_at_price * formQuantity;
          price = plan.allocation.price * formQuantity;
        }

        if (comparePriceEl) {
          if (this.productState.onSale || this.productState.planSale) {
            comparePriceEl.classList.remove(classes$9.hidden);
            productPriceEl.classList.add(classes$9.productPriceSale);
          } else {
            comparePriceEl.classList.add(classes$9.hidden);
            productPriceEl.classList.remove(classes$9.productPriceSale);
          }
          comparePriceEl.innerHTML = theme.settings.currency_code_enable ? themeCurrency.formatMoney(comparePrice, theme.moneyWithCurrencyFormat) : themeCurrency.formatMoney(comparePrice, theme.moneyFormat);
          // console.log("comparePrice Updated")
          
        }

        function updatePrices() {
          let formQuantity = Number(document.querySelector(".product__form__wrapper input[name='quantity']").value);
          let dataProductPricePort = document.querySelector('span[data-product-price]');
          let dataProductPrice = dataProductPricePort.textContent.replace("save", "").replace("sale", "");
          let rawPrice1 = Number(productPriceEl.innerHTML.replace("$",""));
          let calcrawPrice1 = Number(rawPrice1*formQuantity).toFixed(2)
          if(Number.isNaN(rawPrice1)){
            rawPrice1 = themeCurrency.formatMoney(price, theme.moneyWithCurrencyFormat);
            calcrawPrice1 = themeCurrency.formatMoney(price, theme.moneyWithCurrencyFormat);
          }else{
            calcrawPrice1 = " $"+calcrawPrice1;
          }
          console.log({calcrawPrice1, rawPrice1})
          console.log(rawPrice1)
          if (price === 0) {
            productPriceEl.innerHTML = window.theme.strings.free;
          } else {
            productPriceEl.innerHTML = theme.settings.currency_code_enable ? themeCurrency.formatMoney(price, theme.moneyWithCurrencyFormat) : themeCurrency.formatMoney(price, theme.moneyFormat);
            console.log("Price Updated " + price)
          }
          
          document.querySelector('button.btn.btn--submit.product__submit__add span.rc-offer').innerHTML = calcrawPrice1;
          console.log(rawPrice1);
          // console.log(productPriceEl)
          // setTimeout(function(params) {
          //   productPriceEl.innerText = " $"+calcrawPrice1;
          // }, 100)

          let dataProductPricePortCustom = document.querySelector('span[data-product-price-custom]');
          if(!dataProductPricePortCustom){
            dataProductPricePort.insertAdjacentHTML("afterend", "<span data-product-price-custom class='product__price--regular'></span>");
            dataProductPricePortCustom.innerText = productPriceEl.innerHTML;
            if(!dataProductPricePort.classList.contains("hide-it")){
              dataProductPricePort.classList.add("hide-it");
            }
            dataProductPricePort.classList.add("hide-it");
          }
        }
        updatePrices()
        console.log("Price updated on Load/Change ");
      });
      if (this.hasUnitPricing) {
        console.log("hasUnitPricing")
        this.updateProductUnits(formState);
      }
    }

    updateProductUnits(formState) {
      console.log("updateProductUnits");
      const variant = formState.variant;
      const plan = formState.plan;
      let unitPrice = null;

      if (variant && variant.unit_price) {
        unitPrice = variant.unit_price;
      }
      if (plan && plan.allocation && plan.allocation.unit_price) {
        unitPrice = plan.allocation.unit_price;
      }

      

      if (unitPrice) {
        const base = this.getBaseUnit(variant);
        const formattedPrice = unitPrice === 0 ? window.theme.strings.free : themeCurrency.formatMoney(unitPrice, theme.moneyFormat);
        this.container.querySelector(selectors$a.unitPrice).innerHTML = formattedPrice;
        this.container.querySelector(selectors$a.unitBase).innerHTML = base;
        showElement(this.container.querySelector(selectors$a.unitWrapper));
        console.log({formattedPrice})
      } else {
        hideElement(this.container.querySelector(selectors$a.unitWrapper));
      }
    }

    fireHookEvent(formState) {
      const variant = formState.variant;

      // Hook for product variant change event
      this.container.dispatchEvent(
        new CustomEvent('theme:variant:change', {
          detail: {
            variant: variant,
          },
          bubbles: true,
        })
      );
    }

    /**
     * Tracks aspects of the product state that are relevant to UI updates
     * @param {object} evt - variant change event
     * @return {object} productState - represents state of variant + plans
     *  productState.available - current variant and selling plan options result in valid offer
     *  productState.soldOut - variant is sold out
     *  productState.onSale - variant is on sale
     *  productState.showUnitPrice - variant has unit price
     *  productState.requiresPlan - all the product variants requires a selling plan
     *  productState.hasPlan - there is a valid selling plan
     *  productState.planSale - plan has a discount to show next to price
     *  productState.planPerDelivery - plan price does not equal per_delivery_price - a prepaid subscribtion
     */
    setProductState(dataset) {
      // console.log("setProductState")
      const variant = dataset.variant;
      const plan = dataset.plan;

      // console.log({variant})
      const productState = {
        available: true,
        soldOut: false,
        onSale: false,
        showUnitPrice: false,
        requiresPlan: false,
        hasPlan: false,
        planPerDelivery: false,
        planSale: false,
      };

      if (!variant || (variant.requires_selling_plan && !plan)) {
        productState.available = false;
      } else {
        if (!variant.available) {
          productState.soldOut = true;
        }

        if (variant.compare_at_price > variant.price) {
          productState.onSale = true;
        }

        if (variant.unit_price) {
          productState.showUnitPrice = true;
        }

        if (this.product && this.product.requires_selling_plan) {
          productState.requiresPlan = true;
        }

        if (plan && this.subPrices) {
          productState.hasPlan = true;
          if (plan.allocation.per_delivery_price !== plan.allocation.price) {
            productState.planPerDelivery = true;
          }
          if (variant.price > plan.allocation.price) {
            productState.planSale = true;
          }
        }
      }
      return productState;
    }

    updateProductImage(evt) {
      const variant = evt.dataset.variant;

      if (variant) {
        // Update variant image, if one is set
        const variantMediaId = variant.featured_media ? variant.featured_media.id : '';
        const imgSlider = this.container.querySelector(selectors$a.productMediaSlider);
        const flkty = Flickity.data(imgSlider);

        // Activate image slide in mobile view
        if (flkty && flkty.isActive) {
          const variantSlide = imgSlider.querySelector(`[data-id="${variantMediaId}"]`);

          if (variantSlide) {
            const slideIndex = parseInt([...variantSlide.parentNode.children].indexOf(variantSlide));
            flkty.select(slideIndex);
          }
        }
      }
    }

    /**
     * Scroll to the last submitted notification form
     */
    scrollToForm(section) {
      const headerHeight = document.querySelector(selectors$a.header).dataset.height;
      const isVisible = visibilityHelper.isElementPartiallyVisible(section) || visibilityHelper.isElementTotallyVisible(section);

      if (!isVisible) {
        setTimeout(() => {
          const rect = section.getBoundingClientRect();
          const sectionTop = rect.top - headerHeight;

          window.scrollTo({
            top: sectionTop,
            left: 0,
            behavior: 'smooth',
          });
        }, 400);
      }
    }
  }

  const productFormSection = {
    onLoad() {
      this.section = new ProductAddForm(this.container);
    },
  };

  function fetchProduct(handle) {
    const requestRoute = `${theme.routes.root}products/${handle}.js`;

    return window
      .fetch(requestRoute)
      .then((response) => {
        return response.json();
      })
      .catch((e) => {
        console.error(e);
      });
  }

  const defaults$1 = {
    color: 'ash',
  };

  const selectors$b = {
    swatch: '[data-swatch]',
    swatchColor: '[data-swatch-color]',
    wrapper: '[data-grid-swatches]',
    template: '[data-swatch-template]',
  };

  const attributes$7 = {
    swatch: 'data-swatch',
    handle: 'data-swatch-handle',
    label: 'data-swatch-label',
  };

  let swatches = {};

  class ColorMatch {
    constructor(options = {}) {
      this.settings = {
        ...defaults$1,
        ...options,
      };

      this.match = this.init();
    }

    getColor() {
      return this.match;
    }

    init() {
      const getColors = loadScript({json: theme.assets.swatches});
      return getColors
        .then((colors) => {
          return this.matchColors(colors, this.settings.color);
        })
        .catch((e) => {
          console.log('failed to load swatch colors script');
          console.log(e);
        });
    }

    matchColors(colors, name) {
      let bg = '#E5E5E5';
      let img = null;
      const path = theme.assets.base || '/';
      const comparisonName = name.toLowerCase().replace(/\s/g, '');
      const array = colors.colors;

      if (array) {
        let indexArray = null;

        const hexColorArr = array.filter((colorObj, index) => {
          const neatName = Object.keys(colorObj).toString().toLowerCase().replace(/\s/g, '');

          if (neatName === comparisonName) {
            indexArray = index;

            return colorObj;
          }
        });

        if (hexColorArr.length && indexArray !== null) {
          const value = Object.values(array[indexArray])[0];
          bg = value;

          if (value.includes('.jpg') || value.includes('.jpeg') || value.includes('.png') || value.includes('.svg')) {
            img = `${path}${value}`;
            bg = '#888888';
          }
        }
      }

      return {
        color: this.settings.color,
        path: img,
        hex: bg,
      };
    }
  }

  class Swatch {
    constructor(element) {
      this.element = element;
      this.colorString = element.getAttribute(attributes$7.swatch);
      const matcher = new ColorMatch({color: this.colorString});
      matcher.getColor().then((result) => {
        this.colorMatch = result;
        this.init();
      });
    }

    init() {
      if (this.colorMatch && this.colorMatch.hex) {
        this.element.style.setProperty('--swatch', `${this.colorMatch.hex}`);
      }
      if (this.colorMatch && this.colorMatch.path) {
        this.element.style.setProperty('background-image', `url(${this.colorMatch.path})`);
      }
    }
  }

  class GridSwatch {
    constructor(wrap, container) {
      this.template = document.querySelector(selectors$b.template).innerHTML;
      this.wrap = wrap;
      this.container = container;
      this.handle = wrap.getAttribute(attributes$7.handle);
      const label = wrap.getAttribute(attributes$7.label).trim().toLowerCase();

      fetchProduct(this.handle).then((product) => {
        this.product = product;
        this.colorOption = product.options.find(function (element) {
          return element.name.toLowerCase() === label || null;
        });

        if (this.colorOption) {
          this.swatches = this.colorOption.values;
          this.init();
        }
      });
    }

    init() {
      this.wrap.innerHTML = '';

      this.swatches.forEach((swatch) => {
        let variant = this.product.variants.find((variant) => {
          return variant.options.includes(swatch);
        });

        if (variant) {
          this.wrap.innerHTML += Sqrl.render(this.template, {
            color: swatch,
            uniq: `${this.product.id}-${variant.id}`,
            variant: variant.id,
            variantUrl: `${this.product.url}?variant=${variant.id}`,
          });
        }
      });

      this.swatchElements = this.wrap.querySelectorAll(selectors$b.swatch);

      this.swatchElements.forEach((el) => {
        new Swatch(el);
      });
    }
  }

  const makeSwatches = (container) => {
    swatches = [];
    const els = container.querySelectorAll(selectors$b.swatch);
    els.forEach((el) => {
      swatches.push(new Swatch(el));
    });
  };

  const makeGridSwatches = (container) => {
    const gridSwatchWrappers = container.querySelectorAll(selectors$b.wrapper);
    gridSwatchWrappers.forEach((wrap) => {
      new GridSwatch(wrap, undefined);
    });
  };

  const swatchSection = {
    onLoad() {
      makeSwatches(this.container);
    },
  };

  const selectors$c = {
    form: 'form',
    popoutWrapper: '[data-popout]',
    popoutList: '[data-popout-list]',
    popoutToggle: '[data-popout-toggle]',
    popoutInput: '[data-popout-input]',
    popoutOptions: '[data-popout-option]',
    popoutText: '[data-popout-text]',
    ariaCurrent: '[aria-current]',
    productGridImage: '[data-product-image]',
    productGrid: '[data-product-grid-item]',
  };

  const classes$a = {
    listVisible: 'select-popout__list--visible',
    popoutAlternative: 'select-popout--alt',
    currentSuffix: '--current',
    visible: 'is-visible',
  };

  const attributes$8 = {
    ariaCurrent: 'aria-current',
    ariaExpanded: 'aria-expanded',
    dataValue: 'data-value',
    popoutPrevent: 'data-popout-prevent',
    popoutQuantity: 'data-quantity-field',
  };

  let sections$1 = {};

  class Popout {
    constructor(popout) {
      this.popout = popout;
      this.popoutList = this.popout.querySelector(selectors$c.popoutList);
      this.popoutToggle = this.popout.querySelector(selectors$c.popoutToggle);
      this.popoutText = this.popout.querySelector(selectors$c.popoutText);
      this.popoutInput = this.popout.querySelector(selectors$c.popoutInput);
      this.popoutOptions = this.popout.querySelectorAll(selectors$c.popoutOptions);
      this.popoutPrevent = this.popout.getAttribute(attributes$8.popoutPrevent) === 'true';
      this.popupToggleFocusoutEvent = (evt) => this.popupToggleFocusout(evt);
      this.popupListFocusoutEvent = (evt) => this.popupListFocusout(evt);
      this.popupToggleClickEvent = (evt) => this.popupToggleClick(evt);
      this.popoutKeyupEvent = (evt) => this.popoutKeyup(evt);
      this.popupOptionsClickEvent = (evt) => this.popupOptionsClick(evt);
      this._connectOptionsDispatchEvent = (evt) => this._connectOptionsDispatch(evt);
      this.bodyClick = this.bodyClick.bind(this);
      this.updatePopout = this.updatePopout.bind(this);

      this._connectOptions();
      this._connectToggle();
      this._onFocusOut();

      if (this.popoutInput && this.popoutInput.hasAttribute(attributes$8.popoutQuantity)) {
        document.addEventListener('theme:cart:update', this.updatePopout);
      }
    }

    unload() {
      if (this.popoutOptions.length) {
        this.popoutOptions.forEach((element) => {
          element.removeEventListener('theme:popout:click', this.popupOptionsClickEvent);
          element.removeEventListener('click', this._connectOptionsDispatchEvent);
        });
      }

      this.popoutToggle.removeEventListener('click', this.popupToggleClickEvent);
      this.popoutToggle.removeEventListener('focusout', this.popupToggleFocusoutEvent);
      this.popoutList.removeEventListener('focusout', this.popupListFocusoutEvent);
      this.popout.removeEventListener('keyup', this.popoutKeyupEvent);
      document.removeEventListener('theme:cart:update', this.updatePopout);
      document.body.removeEventListener('click', this.bodyClick);
    }

    popupToggleClick(evt) {
      const ariaExpanded = evt.currentTarget.getAttribute(attributes$8.ariaExpanded) === 'true';

      if (this.popoutList.closest(selectors$c.productGrid)) {
        const productGridItemImage = this.popoutList.closest(selectors$c.productGrid).querySelector(selectors$c.productGridImage);

        if (productGridItemImage) {
          productGridItemImage.classList.toggle(classes$a.visible, !ariaExpanded);
        }
      }

      evt.currentTarget.setAttribute(attributes$8.ariaExpanded, !ariaExpanded);
      this.popoutList.classList.toggle(classes$a.listVisible);
    }

    popupToggleFocusout(evt) {
      const popoutLostFocus = this.popout.contains(evt.relatedTarget);

      if (!popoutLostFocus) {
        this._hideList();
      }
    }

    popupListFocusout(evt) {
      const childInFocus = evt.currentTarget.contains(evt.relatedTarget);
      const isVisible = this.popoutList.classList.contains(classes$a.listVisible);

      if (isVisible && !childInFocus) {
        this._hideList();
      }
    }

    popupOptionsClick(evt) {
      const link = evt.target.closest(selectors$c.popoutOptions);
      if (link.attributes.href.value === '#') {
        evt.preventDefault();

        let attrValue = '';

        if (evt.currentTarget.getAttribute(attributes$8.dataValue)) {
          attrValue = evt.currentTarget.getAttribute(attributes$8.dataValue);
        }

        this.popoutInput.value = attrValue;

        if (this.popoutPrevent) {
          this.popoutInput.dispatchEvent(new Event('change'));

          if (!evt.detail.preventTrigger && this.popoutInput.hasAttribute(attributes$8.popoutQuantity)) {
            this.popoutInput.dispatchEvent(new Event('input'));
          }

          const currentElement = this.popoutList.querySelector(`[class*="${classes$a.currentSuffix}"]`);
          let targetClass = classes$a.currentSuffix;

          if (currentElement && currentElement.classList.length) {
            for (const currentElementClass of currentElement.classList) {
              if (currentElementClass.includes(classes$a.currentSuffix)) {
                targetClass = currentElementClass;
                break;
              }
            }
          }

          const listTargetElement = this.popoutList.querySelector(`.${targetClass}`);

          if (listTargetElement) {
            listTargetElement.classList.remove(`${targetClass}`);
            evt.currentTarget.parentElement.classList.add(`${targetClass}`);
          }

          const targetAttribute = this.popoutList.querySelector(selectors$c.ariaCurrent);

          if (targetAttribute) {
            targetAttribute.removeAttribute(attributes$8.ariaCurrent);
            evt.currentTarget.setAttribute(attributes$8.ariaCurrent, 'true');
          }

          if (attrValue !== '') {
            this.popoutText.textContent = attrValue;
          }

          this.popupToggleFocusout(evt);
          this.popupListFocusout(evt);
        } else {
          this._submitForm(attrValue);
        }
      }
    }

    updatePopout() {
      const targetElement = this.popoutList.querySelector(`[${attributes$8.dataValue}="${this.popoutInput.value}"]`);
      if (targetElement) {
        targetElement.dispatchEvent(
          new CustomEvent('theme:popout:click', {
            cancelable: true,
            bubbles: true,
            detail: {
              preventTrigger: true,
            },
          })
        );

        if (!targetElement.parentElement.nextSibling) {
          this.popout.classList.add(classes$a.popoutAlternative);
        }
      } else {
        this.popout.classList.add(classes$a.popoutAlternative);
      }
    }

    popoutKeyup(evt) {
      if (evt.which !== theme.keyboardKeys.ESCAPE) {
        return;
      }
      this._hideList();
      this.popoutToggle.focus();
    }

    bodyClick(evt) {
      const isOption = this.popout.contains(evt.target);
      const isVisible = this.popoutList.classList.contains(classes$a.listVisible);

      if (isVisible && !isOption) {
        this._hideList();
      }
    }

    _connectToggle() {
      this.popoutToggle.addEventListener('click', this.popupToggleClickEvent);
    }

    _connectOptions() {
      if (this.popoutOptions.length) {
        this.popoutOptions.forEach((element) => {
          element.addEventListener('theme:popout:click', this.popupOptionsClickEvent);
          element.addEventListener('click', this._connectOptionsDispatchEvent);
        });
      }
    }

    _connectOptionsDispatch(evt) {
      const event = new CustomEvent('theme:popout:click', {
        cancelable: true,
        bubbles: true,
        detail: {
          preventTrigger: false,
        },
      });

      if (!evt.target.dispatchEvent(event)) {
        evt.preventDefault();
      }
    }

    _onFocusOut() {
      this.popoutToggle.addEventListener('focusout', this.popupToggleFocusoutEvent);
      this.popoutList.addEventListener('focusout', this.popupListFocusoutEvent);
      this.popout.addEventListener('keyup', this.popoutKeyupEvent);

      document.body.addEventListener('click', this.bodyClick);
    }

    _submitForm() {
      const form = this.popout.closest(selectors$c.form);
      if (form) {
        form.submit();
      }
    }

    _hideList() {
      this.popoutList.classList.remove(classes$a.listVisible);
      this.popoutToggle.setAttribute(attributes$8.ariaExpanded, false);
    }
  }

  const popoutSection = {
    onLoad() {
      sections$1[this.id] = [];
      const wrappers = this.container.querySelectorAll(selectors$c.popoutWrapper);
      wrappers.forEach((wrapper) => {
        sections$1[this.id].push(new Popout(wrapper));
      });
    },
    onUnload() {
      sections$1[this.id].forEach((popout) => {
        if (typeof popout.unload === 'function') {
          popout.unload();
        }
      });
    },
  };

  const selectors$d = {
    addToCart: '[data-add-to-cart]',
    deferredMedia: '[data-deferred-media]',
    deferredMediaButton: '[data-deferred-media-button]',
    popupClose: '[data-popup-close]',
    popout: '[data-popout]',
    product: '[data-product]',
    productForm: '[data-product-form]',
    productMediaSlider: '[data-product-single-media-slider]',
    productMediaThumb: '[data-thumbnail-id]',
    productMediaThumbLink: '.product-single__thumbnail-link',
    productMediaThumbs: '[data-product-single-media-thumbs]',
    productMediaWrapper: '[data-product-single-media-wrapper]',
    productModel: '[data-model]',
    productSingleThumbnailLink: '.product-single__thumbnail-link',
    progressBar: '[data-product-slideshow-progress]',
    productJSON: '[data-product-json]',
  };

  const classes$b = {
    hasMediaActive: 'has-media-active',
    isLoading: 'is-loading',
    mediaHidden: 'media--hidden',
    noOutline: 'no-outline',
    quickViewVisible: 'js-quick-view-visible',
    notificationPopupVisible: 'notification-popup-visible',
    fill: 'fill',
  };

  const attributes$9 = {
    id: 'id',
    mediaId: 'data-media-id',
    sectionId: 'data-section-id',
    thumbId: 'data-thumbnail-id',
    handle: 'data-handle',
    loaded: 'loaded',
    tabindex: 'tabindex',
  };

  const ids = {
    addToCartFormId: 'AddToCartForm--',
    addToCartId: 'AddToCart--',
  };

  class LoadQuickview {
    constructor(popup, pswpElement) {
      this.popup = popup;
      this.pswpElement = pswpElement;
      this.container = this.pswpElement.querySelector(selectors$d.product);
      this.sectionId = this.container.getAttribute(attributes$9.sectionId);
      this.product = JSON.parse(this.container.querySelector(selectors$d.productJSON).innerHTML);
      this.body = document.body;

      this.closeOnEscapeEvent = (e) => this.closeOnEscape(e);
      this.outerCloseEvent = (e) => {
        if (!this.container.contains(e.target)) {
          this.popup.close();
        }
      };

      this.init();
    }

    init() {
      this.addFormSuffix();
      this.initProductSlider();
      this.initMediaSwitch();
      this.initProductVideo();
      this.initProductModel();
      this.initShopifyXrLaunch();

      // Init swatches
      makeSwatches(this.container);

      // Init popouts
      const popoutElements = this.container.querySelectorAll(selectors$d.popout);
      let popouts = {};

      if (popoutElements.length) {
        popoutElements.forEach((popout, index) => {
          popouts[index] = new Popout(popout);
        });
      }

      new ProductAddForm(this.container.parentNode);

      slate.a11y.trapFocus({
        container: this.container,
      });

      if (Shopify.PaymentButton) {
        Shopify.PaymentButton.init();
      }

      this.container.classList.remove(classes$b.isLoading);

      // Custom closing events
      const popupClose = this.container.querySelector(selectors$d.popupClose);
      popupClose.addEventListener('keyup', (e) => {
        if (e.keyCode === theme.keyboardKeys.ENTER || e.keyCode === theme.keyboardKeys.SPACE) {
          this.popup.close();
        }
      });

      popupClose.addEventListener('click', () => {
        this.popup.close();
      });

      this.pswpElement.addEventListener('click', this.outerCloseEvent);

      document.dispatchEvent(new CustomEvent('theme:popup:open', {bubbles: true}));

      this.popup.listen('preventDragEvent', (e, isDown, preventObj) => {
        preventObj.prevent = false;
      });

      this.pswpElement.addEventListener('mousedown', () => {
        this.popup.framework.unbind(window, 'pointermove pointerup pointercancel', this.popup);
      });

      // Opening event
      this.popup.listen('initialZoomInEnd', () => {
        this.body.classList.add(classes$b.quickViewVisible);
      });

      this.popup.listen('close', () => {});

      this.popup.listen('destroy', () => {
        const slider = this.container.querySelector(selectors$d.productMediaSlider);
        const flkty = Flickity.data(slider) || null;
        if (flkty) {
          flkty.pausePlayer();
        }
        slate.a11y.removeTrapFocus();
        this.body.classList.remove(classes$b.quickViewVisible);
        document.removeEventListener('keyup', this.closeOnEscapeEvent);
        document.addEventListener('keyup', this.closeOnEscapeEvent);
        this.pswpElement.removeEventListener('click', this.outerCloseEvent);
      });

      document.addEventListener('keyup', this.closeOnEscapeEvent);
    }

    closeOnEscape(e) {
      const isQuickViewVisible = this.body.classList.contains(classes$b.quickViewVisible);
      const isNotificationVisible = this.body.classList.contains(classes$b.notificationPopupVisible);

      if (e.keyCode === theme.keyboardKeys.ESCAPE && isQuickViewVisible && !isNotificationVisible) {
        this.popup.close();
      }
    }

    initProductSlider() {
      const slider = this.container.querySelector(selectors$d.productMediaSlider);
      const thumbs = this.container.querySelector(selectors$d.productMediaThumbs);
      const media = this.container.querySelectorAll(selectors$d.productMediaWrapper);
      const progressBar = this.container.querySelector(selectors$d.progressBar);
      const autoplaySpeed = 3500;
      let timer = 0;

      if (media.length > 1) {
        this.container.style.setProperty('--autoplay-speed', `${autoplaySpeed}ms`);
        if (progressBar) {
          progressBar.classList.add(classes$b.fill);
          timer = setTimeout(() => {
            progressBar.classList.remove(classes$b.fill);
          }, autoplaySpeed);
        }

        const flkty = new Flickity(slider, {
          wrapAround: true,
          pageDots: false,
          prevNextButtons: true,
          adaptiveHeight: true,
          pauseAutoPlayOnHover: false,
          selectedAttraction: 0.2,
          friction: 1,
          autoPlay: false,
          on: {
            ready: () => {
              slider.setAttribute(attributes$9.tabindex, '-1');
            },
            settle: () => {
              const currentSlide = flkty.selectedElement;
              const mediaId = currentSlide.getAttribute(attributes$9.mediaId);
              currentSlide.setAttribute(attributes$9.tabindex, '0');

              flkty.cells.forEach((slide) => {
                if (slide.element === currentSlide) {
                  return;
                }

                slide.element.setAttribute(attributes$9.tabindex, '-1');
              });
              this.switchMedia(mediaId);
            },
            change: () => {
              if (timer) {
                clearTimeout(timer);
              }

              if (progressBar) {
                progressBar.classList.remove(classes$b.fill);

                setTimeout(() => {
                  progressBar.classList.add(classes$b.fill);
                });

                timer = setTimeout(() => {
                  progressBar.classList.remove(classes$b.fill);
                }, autoplaySpeed);
              }
            },
            dragEnd: () => {
              flkty.playPlayer();
            },
          },
        });

        // Toggle flickity draggable functionality based on media play/pause state
        if (media.length) {
          media.forEach((el) => {
            el.addEventListener('theme:media:play', () => {
              flkty.options.draggable = false;
              flkty.updateDraggable();
              el.closest(selectors$d.productMediaSlider).classList.add(classes$b.hasMediaActive);
            });

            el.addEventListener('theme:media:pause', () => {
              flkty.options.draggable = true;
              flkty.updateDraggable();
              el.closest(selectors$d.productMediaSlider).classList.remove(classes$b.hasMediaActive);
            });
          });
        }

        // iOS smooth scrolling fix
        flickitySmoothScrolling(slider);

        // Check if thumbs exist on Quick View
        if (thumbs) {
          const flktyNav = new Flickity(thumbs, {
            asNavFor: slider,
            contain: true,
            pageDots: false,
            prevNextButtons: false,
            on: {
              ready: () => {
                thumbs.setAttribute(attributes$9.tabindex, '-1');
              },
            },
          });

          // iOS smooth scrolling fix
          flickitySmoothScrolling(thumbs);

          // Disable link click
          const thumbLinks = this.container.querySelectorAll(selectors$d.productSingleThumbnailLink);
          if (thumbLinks.length) {
            thumbLinks.forEach((el) => {
              el.addEventListener('click', (e) => {
                e.preventDefault();
              });
            });
          }
        }
      }
    }

    handleMediaFocus(e) {
      // Do nothing if not ENTER key (13) or TAB key (9)
      if (e.keyCode !== theme.keyboardKeys.ENTER && e.keyCode !== theme.keyboardKeys.TAB) {
        return;
      }

      const mediaId = `quickview-${e.currentTarget.getAttribute(attributes$9.thumbId)}`;
      const activeSlide = this.container.querySelector(`[${attributes$9.mediaId}="${mediaId}"]`);
      const slideIndex = parseInt([...activeSlide.parentNode.children].indexOf(activeSlide));
      const slider = this.container.querySelector(selectors$d.productMediaSlider);
      const sliderNav = this.container.querySelector(selectors$d.productMediaThumbs);
      const flkty = Flickity.data(slider) || null;
      const flktyNav = Flickity.data(sliderNav) || null;

      // Go to the related slide media
      if (flkty && flkty.isActive && slideIndex > -1 && e.keyCode === theme.keyboardKeys.ENTER) {
        flkty.select(slideIndex);
      }

      // Move thumbs to the selected one
      if (flktyNav && flktyNav.isActive && slideIndex > -1) {
        flktyNav.select(slideIndex);
      }
    }

    switchMedia(mediaId) {
      const mediaItems = document.querySelectorAll(selectors$d.productMediaWrapper);
      const selectedMedia = this.container.querySelector(`${selectors$d.productMediaWrapper}[${attributes$9.mediaId}="${mediaId}"]`);
      const isFocusEnabled = !this.body.classList.contains(classes$b.noOutline);

      // Pause other media
      if (mediaItems.length) {
        mediaItems.forEach((media) => {
          media.dispatchEvent(new CustomEvent('theme:media:hidden'), {bubbles: true});
          media.classList.add(classes$b.mediaHidden);
        });
      }

      if (isFocusEnabled) {
        selectedMedia.focus();
      }

      selectedMedia.closest(selectors$d.productMediaSlider).classList.remove(classes$b.hasMediaActive);
      selectedMedia.classList.remove(classes$b.mediaHidden);
      selectedMedia.dispatchEvent(new CustomEvent('theme:media:visible'), {bubbles: true});

      // If media is not loaded, trigger poster button click to load it
      const deferredMedia = selectedMedia.querySelector(selectors$d.deferredMedia);
      if (deferredMedia && deferredMedia.getAttribute(attributes$9.loaded) !== 'true') {
        selectedMedia.querySelector(selectors$d.deferredMediaButton).dispatchEvent(new Event('click'));
      }
    }

    initMediaSwitch() {
      const productThumbImages = this.container.querySelectorAll(selectors$d.productMediaThumb);
      if (productThumbImages.length) {
        productThumbImages.forEach((el) => {
          el.addEventListener('keyup', this.handleMediaFocus.bind(this));
          el.addEventListener('click', (e) => {
            e.preventDefault();
          });
        });
      }
    }

    initProductVideo() {
      this.videos = new ProductVideo(this.container);
    }

    initProductModel() {
      const modelItems = this.container.querySelectorAll(selectors$d.productModel);
      if (modelItems.length) {
        modelItems.forEach((element) => {
          PaloAlto.ProductModel.init(element, this.sectionId);
        });
      }
    }

    initShopifyXrLaunch() {
      document.addEventListener('shopify_xr_launch', () => {
        const currentMedia = this.container.querySelector(`${selectors$d.productModel}:not(.${classes$b.mediaHidden})`);
        currentMedia.dispatchEvent(new CustomEvent('xrLaunch'));
      });
    }

    addFormSuffix() {
      const formSuffix = `${this.sectionId}-${this.product.handle}`;
      const productForm = this.container.querySelector(selectors$d.productForm);
      const addToCart = this.container.querySelector(selectors$d.addToCart);

      productForm.setAttribute(attributes$9.id, ids.addToCartFormId + formSuffix);
      addToCart.setAttribute(attributes$9.id, ids.addToCartId + formSuffix);
    }
  }

  const settings$2 = {
    unlockScrollDelay: 400,
  };

  const selectors$e = {
    popupContainer: '.pswp',
    popupCloseBtn: '.pswp__custom-close',
    popupIframe: 'iframe, video',
    popupCustomIframe: '.pswp__custom-iframe',
    popupThumbs: '.pswp__thumbs',
    popupButtons: '.pswp__button, .pswp__caption-close',
    product: '[data-product]',
    productJSON: '[data-product-json]',
  };

  const classes$c = {
    current: 'is-current',
    customLoader: 'pswp--custom-loader',
    customOpen: 'pswp--custom-opening',
    loader: 'pswp__loader',
    opened: 'pswp--open',
    popupCloseButton: 'pswp__button--close',
    notificationPopup: 'pswp--notification',
    quickviewPopup: 'popup-quick-view',
    isCartDrawerOpen: 'js-drawer-open-cart',
  };

  const attributes$a = {
    dataOptionClasses: 'data-pswp-option-classes',
    dataVideoType: 'data-video-type',
    sectionId: 'data-section-id',
  };

  const loaderHTML = `<div class="${classes$c.loader}"><div class="loader loader--image"><div class="loader__image"></div></div></div>`;

  class LoadPhotoswipe {
    constructor(items, options = '', templateIndex = 0, triggerButton = null) {
      this.items = items;
      this.triggerBtn = triggerButton;
      this.pswpElements = document.querySelectorAll(selectors$e.popupContainer);
      this.pswpElement = this.pswpElements[templateIndex];
      this.popup = null;
      this.popupThumbs = null;
      this.popupThumbsContainer = this.pswpElement.querySelector(selectors$e.popupThumbs);
      this.closeBtn = this.pswpElement.querySelector(selectors$e.popupCloseBtn);
      const defaultOptions = {
        history: false,
        focus: false,
        mainClass: '',
      };
      this.options = options !== '' ? options : defaultOptions;
      this.onCloseCallback = () => this.onClose();
      this.dispatchPopupInitEventCallback = () => this.dispatchPopupInitEvent();
      this.setCurrentThumbCallback = () => this.setCurrentThumb();

      this.init();
    }

    init() {
      document.dispatchEvent(new CustomEvent('theme:scroll:lock', {bubbles: true}));

      this.pswpElement.classList.add(classes$c.customOpen);

      this.initLoader();

      loadScript({url: window.theme.assets.photoswipe})
        .then(() => this.loadPopup())
        .catch((e) => console.error(e));
    }

    initLoader() {
      if (this.pswpElement.classList.contains(classes$c.customLoader) && this.options !== '' && this.options.mainClass) {
        this.pswpElement.setAttribute(attributes$a.dataOptionClasses, this.options.mainClass);
        let loaderElem = document.createElement('div');
        loaderElem.innerHTML = loaderHTML;
        loaderElem = loaderElem.firstChild;
        this.pswpElement.appendChild(loaderElem);
      } else {
        this.pswpElement.setAttribute(attributes$a.dataOptionClasses, '');
      }
    }

    loadPopup() {
      const PhotoSwipe = window.themePhotoswipe.PhotoSwipe.default;
      const PhotoSwipeUI = window.themePhotoswipe.PhotoSwipeUI.default;

      if (this.pswpElement.classList.contains(classes$c.customLoader)) {
        this.pswpElement.classList.remove(classes$c.customLoader);
      }

      this.pswpElement.classList.remove(classes$c.customOpen);

      this.popup = new PhotoSwipe(this.pswpElement, PhotoSwipeUI, this.items, this.options);

      this.popup.listen('afterInit', this.dispatchPopupInitEventCallback);
      this.popup.listen('imageLoadComplete', this.setCurrentThumbCallback);
      this.popup.listen('beforeChange', this.setCurrentThumbCallback);
      this.popup.listen('close', this.onCloseCallback);

      this.popup.init();

      this.initPopupCallback();
    }

    initPopupCallback() {
      if (this.isVideo) {
        this.hideUnusedButtons();
      }

      this.initVideo();
      this.thumbsActions();

      slate.a11y.trapFocus({
        container: this.pswpElement,
      });

      if (this.pswpElement.classList.contains(classes$c.quickviewPopup)) {
        new LoadQuickview(this.popup, this.pswpElement);
      }

      if (this.pswpElement.classList.contains(classes$c.notificationPopup)) {
        new LoadNotification(this.popup, this.pswpElement);
      }

      let closeBtn = document.querySelector("button.pswp__button.pswp__button--close");

      this.closePopup = () => this.popup.close();

      if (this.closeBtn) {
        this.closeBtn.addEventListener('click', () => this.popup.close);
      }

      // Close Quick view popup when product added to cart
      document.addEventListener('theme:cart:added', this.closePopup);

      document.querySelector("button.pswp__button.pswp__button--close").addEventListener("click", function () {
          let targetBody = document.querySelector("body");
          let targetHtml = document.querySelector("html");
          let targetPhotoSwipe = document.querySelector(".pswp");
          targetPhotoSwipe.classList.remove("pswp--animated-in");
          targetPhotoSwipe.classList.remove("pswp--visible");
          targetPhotoSwipe.classList.remove("pswp--zoom-allowed");
          targetPhotoSwipe.classList.remove("pswp--svg");
          targetPhotoSwipe.classList.remove("pswp--css_animation");
          targetPhotoSwipe.classList.remove("pswp--notouch");
          targetPhotoSwipe.classList.remove("pswp--animate_opacity");
          targetPhotoSwipe.classList.remove("pswp-zoom-gallery");
          targetPhotoSwipe.classList.remove("pswp--open");
          targetPhotoSwipe.classList.remove("pswp--supports-fs");
          targetPhotoSwipe.style = "";
          targetPhotoSwipe.setAttribute("aria-hidden", true);
          targetPhotoSwipe.setAttribute("data-pswp-option-classes", "");
        
          targetBody.removeAttribute('data-scroll-lock-saved-inline-overflow-property');
          targetBody.removeAttribute('data-scroll-lock-saved-inline-overflow-y-property');
          targetBody.removeAttribute('data-scroll-lock-locked');
          targetBody.removeAttribute('data-scroll-lock-filled-gap');
          targetBody.removeAttribute('data-scroll-lock-current-fill-gap-method');
          targetHtml.removeAttribute('data-scroll-locked');
        
          targetBody.style = "";
          console.log("closeBtn  clicked!");
          // targetPop.onCloseCallback;
      })
    }

    dispatchPopupInitEvent() {
      if (this.triggerBtn) {
        this.triggerBtn.dispatchEvent(new CustomEvent('theme:popup:init', {bubbles: true}));
      }
    }

    initVideo() {
      const videoContainer = this.pswpElement.querySelector(selectors$e.popupCustomIframe);
      if (videoContainer) {
        const videoType = videoContainer.getAttribute(attributes$a.dataVideoType);
        this.isVideo = true;

        if (videoType == 'youtube') {
          new LoadVideoYT(videoContainer.parentElement);
        } else if (videoType == 'vimeo') {
          new LoadVideoVimeo(videoContainer.parentElement);
        }
      }
    }

    thumbsActions() {
      if (this.popupThumbsContainer && this.popupThumbsContainer.firstChild) {
        this.popupThumbsContainer.addEventListener('wheel', (e) => this.stopDisabledScroll(e));
        this.popupThumbsContainer.addEventListener('mousewheel', (e) => this.stopDisabledScroll(e));
        this.popupThumbsContainer.addEventListener('DOMMouseScroll', (e) => this.stopDisabledScroll(e));

        this.popupThumbs = this.pswpElement.querySelectorAll(`${selectors$e.popupThumbs} > *`);
        this.popupThumbs.forEach((element, i) => {
          element.addEventListener('click', (e) => {
            e.preventDefault();
            element.parentElement.querySelector(`.${classes$c.current}`).classList.remove(classes$c.current);
            element.classList.add(classes$c.current);
            this.popup.goTo(i);
          });
        });
      }
    }

    hideUnusedButtons() {
      const buttons = this.pswpElement.querySelectorAll(selectors$e.popupButtons);
      buttons.forEach((element) => {
        if (!element.classList.contains(classes$c.popupCloseButton)) {
          element.style.display = 'none';
        }
      });
    }

    stopDisabledScroll(e) {
      e.stopPropagation();
    }

    onClose() {
      const popupIframe = this.pswpElement.querySelector(selectors$e.popupIframe);
      if (popupIframe) {
        popupIframe.parentNode.removeChild(popupIframe);
      }

      if (this.popupThumbsContainer && this.popupThumbsContainer.firstChild) {
        while (this.popupThumbsContainer.firstChild) {
          this.popupThumbsContainer.removeChild(this.popupThumbsContainer.firstChild);
        }
      }

      this.pswpElement.setAttribute(attributes$a.dataOptionClasses, '');
      const loaderElem = this.pswpElement.querySelector(`.${classes$c.loader}`);
      if (loaderElem) {
        this.pswpElement.removeChild(loaderElem);
      }

      slate.a11y.removeTrapFocus({
        container: this.pswpElement,
      });

      document.removeEventListener('theme:cart:added', this.closePopup);

      // Unlock scroll if only cart drawer is closed and there are no more popups opened
      setTimeout(() => {
        const recentlyOpenedPopups = this.recentlyOpenedPopupsCount();
        const isCartDrawerOpen = document.body.classList.contains(classes$c.isCartDrawerOpen);

        if (recentlyOpenedPopups === 0 && !isCartDrawerOpen) {
          document.dispatchEvent(new CustomEvent('theme:scroll:unlock', {bubbles: true}));
        }
      }, settings$2.unlockScrollDelay);
    }

    recentlyOpenedPopupsCount() {
      let count = 0;

      this.pswpElements.forEach((popup) => {
        const isOpened = popup.classList.contains(classes$c.opened);

        if (isOpened) {
          count += 1;
        }
      });

      return count;
    }

    setCurrentThumb() {
      const hasThumbnails = this.popupThumbsContainer && this.popupThumbsContainer.firstChild;

      if (hasThumbnails) return;

      const lastCurrentThumb = this.pswpElement.querySelector(`${selectors$e.popupThumbs} > .${classes$c.current}`);
      if (lastCurrentThumb) {
        lastCurrentThumb.classList.remove(classes$c.current);
      }

      if (!this.popupThumbs) {
        return;
      }
      const currentThumb = this.popupThumbs[this.popup.getCurrentIndex()];
      currentThumb.classList.add(classes$c.current);
      this.scrollThumbs(currentThumb);
    }

    scrollThumbs(currentThumb) {
      const thumbsContainerLeft = this.popupThumbsContainer.scrollLeft;
      const thumbsContainerWidth = this.popupThumbsContainer.offsetWidth;
      const thumbsContainerPos = thumbsContainerLeft + thumbsContainerWidth;
      const currentThumbLeft = currentThumb.offsetLeft;
      const currentThumbWidth = currentThumb.offsetWidth;
      const currentThumbPos = currentThumbLeft + currentThumbWidth;

      if (thumbsContainerPos <= currentThumbPos || thumbsContainerPos > currentThumbLeft) {
        const currentThumbMarginLeft = parseInt(window.getComputedStyle(currentThumb).marginLeft);
        this.popupThumbsContainer.scrollTo({
          top: 0,
          left: currentThumbLeft - currentThumbMarginLeft,
          behavior: 'smooth',
        });
      }
    }
  }

  const settings$3 = {
    templateIndex: 0,
    animationCompletedDelay: 400,
  };

  const selectors$f = {
    buttonQuickView: '[data-button-quick-view]',
    cartDrawer: '[data-cart-drawer]',
  };

  const classes$d = {
    loading: 'is-loading',
    quickViewFromCart: 'js-quick-view-from-cart',
    mainClass: 'popup-quick-view pswp--not-close-btn',
  };

  const attributes$b = {
    handle: 'data-handle',
  };

  const options$1 = {
    history: false,
    focus: false,
    mainClass: classes$d.mainClass,
    showHideOpacity: true,
    closeOnVerticalDrag: false,
    closeOnScroll: false,
    modal: false,
    escKey: false,
  };

  class QuickViewPopup {
    constructor(container) {
      this.container = container;

      const buttons = this.container.querySelectorAll(selectors$f.buttonQuickView);
      buttons.forEach((button) => {
        button.addEventListener('click', (e) => this.initPhotoswipe(e));
        button.addEventListener('theme:popup:init', () => {
          button.classList.remove(classes$d.loading);

          // Add class js-quick-view-from-cart to "fade in right" animate the Quick view
          if (button.closest(selectors$f.cartDrawer)) {
            setTimeout(() => {
              document.body.classList.remove(classes$d.quickViewFromCart);
            }, settings$3.animationCompletedDelay);
          }
        });
      });
    }

    initPhotoswipe(e) {
      e.preventDefault();

      const button = e.target.matches(selectors$f.buttonQuickView) ? e.target : e.target.closest(selectors$f.buttonQuickView);

      button.classList.add(classes$d.loading);

      // Add class js-quick-view-from-cart to "fade in right" animate the Quick view
      if (button.closest(selectors$f.cartDrawer)) {
        document.body.classList.add(classes$d.quickViewFromCart);
      }

      // Set the trigger element before calling trapFocus
      slate.a11y.state.trigger = button;

      const productUrl = `${theme.routes.root}products/${button.getAttribute(attributes$b.handle)}?section_id=api-quickview`;

      fetch(productUrl)
        .then((response) => {
          return response.text();
        })
        .then((data) => {
          const items = [
            {
              html: data,
            },
          ];
          new LoadPhotoswipe(items, options$1, settings$3.templateIndex, button);
        })
        .catch(function (error) {
          console.log('error: ', error);
        });
    }
  }

  const settings$4 = {
    cartDrawerEnabled: window.theme.settings.cartType === 'drawer',
    timers: {
      addProductTimeout: 1000,
      itemRemovalDelay: 500,
    },
    animations: {
      data: 'data-aos',
      method: 'fade-up',
    },
    isQuickViewEnabled: theme.settings.quickButton == 'view',
  };

  const selectors$g = {
    outerSection: '[data-section-id]',
    aos: '[data-aos]',
    additionalCheckoutButtons: '[data-additional-checkout-button]',
    apiContent: '[data-api-content]',
    apiLineItems: '[data-api-line-items]',
    apiUpsellItems: '[data-api-upsell-items]',
    buttonAddToCart: '[data-add-to-cart]',
    upsellButtonByHandle: '[data-handle]',
    cartCloseError: '[data-cart-error-close]',
    cartDrawer: '[data-cart-drawer]',
    cartDrawerTemplate: '[data-cart-drawer-template]',
    cartDrawerToggle: '[data-cart-drawer-toggle]',
    cartDrawerBody: '[data-cart-drawer-body]',
    cartErrors: '[data-cart-errors]',
    cartForm: '[data-cart-form]',
    cartTermsCheckbox: '[data-cart-acceptance-checkbox]',
    cartCheckoutButtonWrapper: '[data-cart-checkout-buttons]',
    cartCheckoutButton: '[data-cart-checkout-button]',
    cartTotalDiscountsTemplate: '[data-cart-total-discount]',
    cartItemRemove: '[data-item-remove]',
    cartItemQty: '[data-quantity-field]',
    cartItemsQty: '[data-cart-items-qty]',
    cartTotal: '[data-cart-total]',
    cartMessage: '[data-cart-message]',
    cartMessageDefault: '[data-message-default]',
    cartPage: '[data-cart-page]',
    cartProgress: '[data-cart-message-progress]',
    cartOriginalTotal: '[data-cart-original-total]',
    cartOriginalTotalPrice: '[data-cart-original-total-price]',
    cartDiscountsHolder: '[data-cart-discounts-holder]',
    emptyMessage: '[data-empty-message]',
    buttonHolder: '[data-foot-holder]',
    item: '[data-cart-item]',
    itemsHolder: '[data-items-holder]',
    itemsWrapper: '[data-items-wrapper]',
    formCloseError: '[data-close-error]',
    formErrorsContainer: '[data-cart-errors-container]',
    upsellHolder: '[data-upsell-holder]',
    errorMessage: '[data-error-message]',
    termsErrorMessage: '[data-terms-error-message]',
    pairProductsHolder: '[data-pair-products-holder]',
    pairProducts: '[data-pair-products]',
    productIDAttribute: 'data-product-id',
    leftToSpend: '[data-left-to-spend]',
    quickBuyForm: '[data-quickbuy-form]',
    productMediaContainer: '[data-product-media-container]',
    formWrapper: '[data-form-wrapper]',
    popupQuickView: '.popup-quick-view',
    popupClose: '[data-popup-close]',
  };

  const classes$e = {
    hidden: 'hidden',
    added: 'is-added',
    isHidden: 'is-hidden',
    cartDrawerOpen: 'js-drawer-open-cart',
    open: 'is-open',
    visible: 'is-visible',
    loading: 'is-loading',
    disabled: 'is-disabled',
    success: 'is-success',
    error: 'has-error',
    cartItems: 'cart__toggle--has-items',
    variantSoldOut: 'variant--soldout',
    removed: 'is-removed',
    aosAnimate: 'aos-animate',
    updated: 'is-updated',
  };

  const attributes$c = {
    shippingMessageLimit: 'data-limit',
    cartMessageValue: 'data-cart-message',
    cartTotalPrice: 'data-cart-total-price',
    ariaExpanded: 'aria-expanded',
    disabled: 'disabled',
    value: 'value',
    dataId: 'data-id',
    focusElement: 'data-focus-element',
    upsellButton: 'data-upsell-btn',
    errorContainerQuickBuy: 'data-cart-errors-container-quickbuy',
    notificationPopup: 'data-notification-popup',
    sectionId: 'data-section-id',
  };

  class CartDrawer {
    constructor() {
      if (window.location.pathname === '/password') {
        return;
      }

      this.init();
    }

    init() {
      // DOM Elements
      this.cartToggleButtons = document.querySelectorAll(selectors$g.cartDrawerToggle);
      this.cartPage = document.querySelector(selectors$g.cartPage);
      this.cartDrawer = document.querySelector(selectors$g.cartDrawer);
      this.cart = this.cartDrawer || this.cartPage;

      this.assignArguments();

      this.flktyUpsell = null;
      this.form = null;
      this.collapsible = null;

      this.build = this.build.bind(this);

      // AJAX request
      this.addToCart = this.addToCart.bind(this);
      this.updateCart = this.updateCart.bind(this);

      // Cart events
      this.openCartDrawer = this.openCartDrawer.bind(this);
      this.closeCartDrawer = this.closeCartDrawer.bind(this);
      this.toggleCartDrawer = this.toggleCartDrawer.bind(this);
      this.formSubmitHandler = throttle(this.formSubmitHandler.bind(this), 50);
      this.closeCartError = debounce(() => slideUp(this.cartErrorHolder, 400), 250);
      this.cartDrawerCloseEvent = null;
      this.errorTimer = 0;

      // Checking
      this.hasItemsInCart = this.hasItemsInCart.bind(this);
      this.isCartPage = Boolean(this.cartDrawer === null);
      this.showAnimations = Boolean(document.body.dataset.animations === 'true');

      // Set classes
      this.toggleClassesOnContainers = this.toggleClassesOnContainers.bind(this);

      // Flags
      this.totalItems = 0;
      this.isCartDrawerOpen = false;
      this.isCartDrawerLoaded = false;
      this.cartDiscounts = 0;
      this.cartDrawerEnabled = settings$4.cartDrawerEnabled;
      this.cartLimitErrorIsHidden = true;
      this.cartAnimationTimer = 0;

      // Cart Events
      this.cartEvents();
      this.cartAddEvent();
      this.cartDrawerToggleEvents();
      this.checkCartPriority();
     
      // Init quantity for fields
      this.initQuantity();

      // Init collapsible function for the cart accordions
      if (this.buttonHolder) {
        this.collapsible = new Collapsible(this.buttonHolder);
      }

      if (this.isCartPage) {
        this.renderPairProducts();
      }

      document.addEventListener('theme:popup:open', this.closeCartDrawer);
    }

    /**
     * Assign cart constructor arguments on page load or after cart drawer is loaded
     *
     * @return  {Void}
     */
    assignArguments() {
      this.cartDrawerBody = document.querySelector(selectors$g.cartDrawerBody);
      this.emptyMessage = document.querySelector(selectors$g.emptyMessage);
      this.buttonHolder = document.querySelector(selectors$g.buttonHolder);
      this.itemsHolder = document.querySelector(selectors$g.itemsHolder);
      this.cartItemsQty = document.querySelector(selectors$g.cartItemsQty);
      this.itemsWrapper = document.querySelector(selectors$g.itemsWrapper);
      this.items = document.querySelectorAll(selectors$g.item);
      this.cartTotal = document.querySelector(selectors$g.cartTotal);
      this.cartMessage = document.querySelectorAll(selectors$g.cartMessage);
      this.cartOriginalTotal = document.querySelector(selectors$g.cartOriginalTotal);
      this.cartOriginalTotalPrice = document.querySelector(selectors$g.cartOriginalTotalPrice);
      this.cartTotalDiscountTemplate = document.querySelector(selectors$g.cartTotalDiscountsTemplate).innerHTML;
      this.cartErrorHolder = document.querySelector(selectors$g.cartErrors);
      this.cartCloseErrorMessage = document.querySelector(selectors$g.cartCloseError);
      this.pairProductsHolder = document.querySelector(selectors$g.pairProductsHolder);
      this.pairProducts = document.querySelector(selectors$g.pairProducts);
      this.upsellHolders = document.querySelectorAll(selectors$g.upsellHolder);
      this.cartTermsCheckbox = document.querySelector(selectors$g.cartTermsCheckbox);
      this.cartCheckoutButtonWrapper = document.querySelector(selectors$g.cartCheckoutButtonWrapper);
      this.cartCheckoutButton = document.querySelector(selectors$g.cartCheckoutButton);
      this.cartForm = document.querySelector(selectors$g.cartForm);
      this.cartItemCount = 0;

      if (this.cartMessage.length > 0) {
        this.cartFreeLimitShipping = Number(this.cartMessage[0].getAttribute(attributes$c.shippingMessageLimit)) * 100 * window.Shopify.currency.rate;
        this.subtotal = Number(this.cartMessage[0].getAttribute(attributes$c.cartTotalPrice));
      }

      this.updateProgress();
    }

    /**
     * Init quantity field functionality
     *
     * @return  {Void}
     */

    initQuantity() {
      this.items = document.querySelectorAll(selectors$g.item);

      if (this.items.length) {
        this.items.forEach((item) => {
          const quantity = new QuantityCounter(item, true);

          quantity.init();
          this.customEventsHandle(item);
        });
      }
    }

    /**
     * Custom event who change the cart
     *
     * @return  {Void}
     */

    customEventsHandle(holder) {
      holder.addEventListener(
        'theme:cart:update',
        debounce((event) => {
          this.updateCart(
            {
              id: event.detail.id,
              quantity: event.detail.quantity,
            },
            holder,
            event.detail.valueIsEmpty
          );
        }, 250)
      );
    }

    /**
     * Cart events
     *
     * @return  {Void}
     */

    cartEvents() {
      const cartItemRemove = document.querySelectorAll(selectors$g.cartItemRemove);

      if (cartItemRemove.length) {
        this.totalItems = cartItemRemove.length;
        cartItemRemove.forEach((item) => {
          item.addEventListener('click', (event) => {
            event.preventDefault();
            const cartItem = item.closest(selectors$g.item);

            this.updateCart(
              {
                id: item.getAttribute(attributes$c.dataId),
                quantity: 0,
              },
              cartItem
            );
          });
        });
      }

      if (this.cartCloseErrorMessage) {
        this.cartCloseErrorMessage.removeEventListener('click', this.closeCartError);
        this.cartCloseErrorMessage.addEventListener('click', this.closeCartError);
      }

      if (this.cartTermsCheckbox) {
        this.cartTermsCheckbox.removeEventListener('change', this.formSubmitHandler);
        this.cartCheckoutButtonWrapper.removeEventListener('click', this.formSubmitHandler);
        this.cartForm.removeEventListener('submit', this.formSubmitHandler);

        this.cartTermsCheckbox.addEventListener('change', this.formSubmitHandler);
        this.cartCheckoutButtonWrapper.addEventListener('click', this.formSubmitHandler);
        this.cartForm.addEventListener('submit', this.formSubmitHandler);
      }
    }

    /**
     * Cart event add product to cart
     *
     * @return  {Void}
     */

    cartAddEvent() {
      document.addEventListener('click', (event) => {
        const clickedElement = event.target;

        if (clickedElement.matches(selectors$g.buttonAddToCart) || (clickedElement.closest(selectors$g.buttonAddToCart) && clickedElement)) {
          const button = clickedElement.matches(selectors$g.buttonAddToCart) ? clickedElement : clickedElement.closest(selectors$g.buttonAddToCart);
          const formWrapper = button.closest(selectors$g.formWrapper);
          let formData = '';

          event.preventDefault();

          if (button.hasAttribute(attributes$c.notificationPopup) && formWrapper && formWrapper.classList.contains(classes$e.variantSoldOut)) {
            new NotificationPopup(button);

            return;
          }

          if (button.hasAttribute(selectors$g.productIDAttribute)) {
            formData = `id=${Number(button.getAttribute(selectors$g.productIDAttribute))}`;
          } else {
            this.form = clickedElement.closest('form');
            formData = new FormData(this.form);
            formData = new URLSearchParams(formData).toString();
          }

          if (this.form !== null && this.form.querySelector('[type="file"]')) {
            return;
          }

          if (button.hasAttribute(attributes$c.disabled)) {
            return;
          }

          this.addToCart(formData, button);

          // Hook for cart/add.js event
          document.dispatchEvent(
            new CustomEvent('theme:cart:add', {
              bubbles: true,
              detail: {
                selector: clickedElement,
              },
            })
          );
        }
      });
    }

    /**
     * Get response from the cart
     *
     * @return  {Void}
     */

    checkCartPriority() {
      console.log("Hello Buffy: checkCartPriority");
      
      let priorityProcessing = document.querySelector("#upsell-checkbox");
      if(priorityProcessing != null){
        var upSellID =  priorityProcessing.getAttribute('dataId');

        // Checking if Cart Has Priority Added
        let addedPriority = false;
        let cartResource = document.querySelector(".cart-drawer__items");
        if(cartResource){
          let cartItems = cartResource.querySelectorAll('.cart__item');
          let upsellCheckboxes = document.querySelectorAll(".upsell-checkbox");
          // console.log(cartItems);
          for (let i = 0; i < window.cart.items.length; i++) {
            let cartItem = cartItems[i];
            let cartItemId = 0;
          
            if(cartItem){
              cartItemId = cartItem.getAttribute("line-item-id");
            }else{
              cartItemId = 0;
            }
            // console.log(cartItem)
            // console.log({cartItemId, upSellID})   
            if(cartItemId == upSellID) {
              // console.log("1");
              addedPriority = true;
              document.querySelector('body').setAttribute("addedPriority", "true");
              priorityProcessing.removeAttribute("checked");
              break;
            }else{
              // console.log("2");
              addedPriority = false;
              document.querySelector('body').setAttribute("addedPriority", "false");
              // priorityProcessing.removeAttribute("checked")
            }
          }
        }
      
        return addedPriority;
      }
    }

    getCart() {
      // Render cart drawer if it exists but it's not loaded yet
      if (this.cartDrawer && !this.isCartDrawerLoaded) {
        const alwaysOpen = false;
        this.renderCartDrawer(alwaysOpen);
      }

      
        
      fetch(theme.routes.root + 'cart.js')
        .then(this.handleErrors)
        .then((response) => response.json())
        .then((response) => {
          this.cartItemCount = response.item_count;
          this.newTotalItems = response.items.length;

          this.buildTotalPrice(response);

          if (this.cartMessage.length > 0) {
            this.subtotal = response.total_price;
            this.updateProgress();
          }

          return fetch(theme.routes.root + 'cart?section_id=api-cart-items');
        })
        .then((response) => response.text())
        .then((response) => {
          const element = document.createElement('div');
          element.innerHTML = response;
          
          this.cartToggleButtons.forEach((button) => {
            button.classList.remove(classes$e.cartItems);

            if (this.newTotalItems > 0) {
              button.classList.add(classes$e.cartItems);
            }
          });

          const cleanResponse = element.querySelector(selectors$g.apiContent);
          this.build(cleanResponse);

          this.updateItemsQuantity(this.cartItemCount);
          console.log("In Get Cart Function");
          this.checkCartPriority();
        })
        .catch((error) => console.log(error));
    }

    /**
     * Add item(s) to the cart and show the added item(s)
     *
     * @param   {String}  data
     * @param   {DOM Element}  button
     *
     * @return  {Void}
     */
  
    addToCart(data, button = null) {
      // console.log("Added to cart");
      // console.log(data)
      if (this.cartDrawerEnabled && button) {
        button.classList.add(classes$e.loading);
        button.setAttribute(attributes$c.disabled, true);
      }

      // Adding Priority Processing As an Upsell Item
      fetch(theme.routes.root + 'cart/add.js', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      })
        .then((response) => response.json())
        .then((response) => {
          // console.log(response);
          // this.checkCartPriority();
          
          let priorityProcessing = document.querySelector(".product__form #upsell-checkbox");
          if(priorityProcessing){
            var upSellID =  priorityProcessing.getAttribute('dataId');
            // Checking if Cart Has Priority Added
            let addedPriority = false;
            let cartResource = document.querySelector(".cart-drawer__items");
            if(cartResource){
              let cartItems = cartResource.querySelectorAll('.cart__item');
              let upsellCheckboxes = document.querySelectorAll(".upsell-checkbox");
              
              for (let i = 0; i < window.cart.items.length; i++) {
                let cartItem = cartItems[i];
                let cartItemId = cartItem.getAttribute("line-item-id");
              
                // console.log(cartItem)
                // console.log({cartItemId, upSellID})   
                if(cartItemId == upSellID) {
                  // console.log("1");
                  addedPriority = true;
                  document.querySelector('body').setAttribute("addedPriority", "true");
                  break;
                }else{
                  // console.log("2");
                  addedPriority = false;
                  document.querySelector('body').setAttribute("addedPriority", "false");
                }
              }
            }
            // Adding Priority to Cart
            if (priorityProcessing.checked == true && addedPriority == false) {
              console.log("Upsell Offer Requested: "+upSellID);
              fetch(theme.routes.root + 'cart/add.js', {
                method: 'POST',
                headers: {
                  'X-Requested-With': 'XMLHttpRequest',
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'quantity=1&id='+upSellID,
              }).then((response) => {
                console.log("After Adding Priority Processing");
                this.checkCartPriority();
              })
              .catch((error) => console.log(error));
            }
          }
          
          if (button) {
            button.disabled = true;
          }
          this.addLoadingClass();

          if (response.status) {
            this.addToCartError(response, button);

            this.removeLoadingClass();

            return;
          }

          if (this.cartDrawerEnabled) {
            this.getCart();
            customCart = this;
            console.log("After Adding Priority Processing AFter get cart");
            this.checkCartPriority();
          } else {
            window.location = theme.routes.cart_url;
          }
        })
        .catch((error) => console.log(error));
    }

    /**
     * Update cart
     *
     * @param   {Object}  updateData
     *
     * @return  {Void}
     */

    updateCart(updateData = {}, holder = null, valueIsEmpty = false) {
      let newCount = null;
      let oldCount = null;
      let newItem = null;
      let quantity = updateData.quantity;

      this.addLoadingClass();

      // Handle item removal
      if (quantity == 0 && holder) {
        holder.classList.add(classes$e.removed);
        setTimeout(() => {
          holder.remove();
        }, settings$4.timers.itemRemovalDelay);
      }

      this.items.forEach((item) => {
        item.classList.add(classes$e.disabled);
        item.querySelector('input').blur();
        item.querySelectorAll('input, button').forEach((el) => {
          el.setAttribute('disabled', true);
        });
      });

      fetch(theme.routes.root + 'cart.js')
        .then(this.handleErrors)
        .then((response) => response.json())
        .then((response) => {
          const matchKeys = (item) => item.key === updateData.id;
          const index = response.items.findIndex(matchKeys);
          oldCount = response.item_count;
          newItem = response.items[index].title;

          const data = {
            line: `${index + 1}`,
            quantity: quantity,
          };

          return fetch(theme.routes.root + 'cart/change.js', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
          });
        })
        .then(this.handleErrors)
        .then((response) => response.json())
        .then((response) => {
          newCount = response.item_count;
          this.cartItemCount = newCount;

          if (valueIsEmpty) {
            quantity = 1;
          }

          if (quantity !== 0) {
            this.cartLimitErrorIsHidden = newCount !== oldCount;

            this.toggleLimitError(newItem);
          }

          // Change the cart total, total items quantity and hide message if missing discounts and the changed product is not deleted
          this.buildTotalPrice(response);
          this.cartDiscounts = response.total_discount;
          this.updateItemsQuantity(this.cartItemCount);

          // Build cart again if the quantity of the changed product is 0 or cart discounts are changed
          if (this.cartMessage.length > 0) {
            this.subtotal = response.total_price;
            this.updateProgress();
          }

          this.getCart();
          console.log("Cart Updated");
          customCart = this;
          // console.log(this)
          this.checkCartPriority();
        })
        .catch((error) => console.log(error));
    }

    /**
     * Show/hide limit error
     *
     * @param   {String}  itemTitle
     *
     * @return  {Void}
     */

    toggleLimitError(itemTitle) {
      this.cartErrorHolder.querySelector(selectors$g.errorMessage).innerText = itemTitle;

      if (this.cartLimitErrorIsHidden) {
        slideUp(this.cartErrorHolder, 400);
      } else {
        slideDown(this.cartErrorHolder, 400);
      }
    }

    /**
     * Handle errors
     *
     * @param   {Object}  response
     *
     * @return  {Object}
     */

    handleErrors(response) {
      if (!response.ok) {
        return response.json().then(function (json) {
          const e = new FetchError({
            status: response.statusText,
            headers: response.headers,
            json: json,
          });
          throw e;
        });
      }
      return response;
    }

    /**
     * Add to cart error handle
     *
     * @param   {Object}  data
     * @param   {DOM Element/Null} button
     *
     * @return  {Void}
     */

    addToCartError(data, button) {
      if (this.cartDrawerEnabled && button && button.closest(selectors$g.cartDrawer) !== null && !button.closest(selectors$g.cartDrawer)) {
        this.closeCartDrawer();
      }

      let outerSection = button.closest(selectors$g.outerSection);

      if (!outerSection) {
        outerSection = button.closest(selectors$g.pairProducts);
      }

      let errorContainer = outerSection.querySelector(selectors$g.formErrorsContainer);

      if (button !== null) {
        const buttonUpsellHolder = button.closest(selectors$g.upsellHolder);
        const buttonQuickBuyForm = button.closest(selectors$g.quickBuyForm);

        if (buttonUpsellHolder && buttonUpsellHolder.querySelector(selectors$g.formErrorsContainer)) {
          errorContainer = buttonUpsellHolder.querySelector(selectors$g.formErrorsContainer);
        }

        if (buttonQuickBuyForm && buttonQuickBuyForm.closest(selectors$g.productMediaContainer)) {
          errorContainer = buttonQuickBuyForm.closest(selectors$g.productMediaContainer).querySelector(selectors$g.formErrorsContainer);
        }

        button.classList.remove(classes$e.loading);
        button.removeAttribute(attributes$c.disabled);
      }

      if (errorContainer) {
        errorContainer.classList.add(classes$e.visible);
        errorContainer.innerHTML = `<div class="errors">${data.message}: ${data.description}<button type="button" class="product__errors__close" data-close-error>${theme.icons.closeSmall}</button></div>`;

        if (errorContainer.hasAttribute(attributes$c.errorContainerQuickBuy)) {
          if (this.errorTimer) {
            clearTimeout(this.errorTimer);
          }

          this.errorTimer = setTimeout(() => {
            errorContainer.classList.remove(classes$e.visible);
            setTimeout(() => {
              errorContainer.innerHTML = '';
            }, 300);
          }, 3000);
        }
      }

      const formErrorClose = document.querySelector(selectors$g.formCloseError);
      if (formErrorClose) {
        formErrorClose.addEventListener('click', (event) => {
          const clickedElement = event.target;
          if (clickedElement.matches(selectors$g.formCloseError) || clickedElement.closest(selectors$g.formCloseError)) {
            event.preventDefault();

            if (this.errorTimer) {
              clearTimeout(this.errorTimer);
            }

            errorContainer.classList.remove(classes$e.visible);
            setTimeout(() => {
              errorContainer.innerHTML = '';
            }, 300);
          }
        });
      }
    }

    /**
     * Render cart and define all elements after cart drawer is open for a first time
     *
     * @return  {Void}
     */
    renderCartDrawer(alwaysOpen = true) {
      
      const cartDrawerTemplate = document.querySelector(selectors$g.cartDrawerTemplate);

      if (!cartDrawerTemplate) {
        return;
      }

      // Append cart items HTML to the cart drawer container
      this.cartDrawer.innerHTML = cartDrawerTemplate.innerHTML;
      this.assignArguments();

      // Bind cart quantity events
      this.initQuantity();

      // Bind cart events
      this.cartEvents();

      // Init collapsible function for the cart drawer accordions
      if (this.buttonHolder) {
        this.collapsible = new Collapsible(this.buttonHolder);
      }

      // Bind cart drawer close button event
      this.cartDrawerToggle = this.cartDrawer.querySelector(selectors$g.cartDrawerToggle);
      this.cartDrawerToggle.addEventListener('click', this.cartDrawerToggleClickEvent);

      this.isCartDrawerLoaded = true;

      this.renderPairProducts();

      // Hook for cart drawer loaded event
      document.dispatchEvent(new CustomEvent('theme:cart:loaded', {bubbles: true}));

      // Open cart drawer after cart items and events are loaded
      if (alwaysOpen) {
        this.openCartDrawer();
      }
    }

    /**
     * Open cart dropdown and add class on body
     *
     * @return  {Void}
     */

    openCartDrawer() {
      if (this.isCartDrawerOpen) {
        return;
      }

      if (!this.isCartDrawerLoaded) {
        this.renderCartDrawer();
        return;
      }
      // console.log("Cart Drawer Triggered");
      // this.getCart();
      
      // Hook for cart drawer open event
      document.dispatchEvent(new CustomEvent('theme:cart:open', {bubbles: true}));
      document.dispatchEvent(new CustomEvent('theme:scroll:lock', {bubbles: true, detail: this.cartDrawer}));
      document.dispatchEvent(new CustomEvent('theme:scroll:lock', {bubbles: true, detail: this.cartDrawerBody}));

      document.body.classList.add(classes$e.cartDrawerOpen);
      this.cartDrawer.classList.add(classes$e.open);

      // Cart elements opening animation
      this.cartDrawer.querySelectorAll(selectors$g.aos).forEach((item) => {
        
        
        item.classList.add(classes$e.aosAnimate);
      });

      this.cartToggleButtons.forEach((button) => {
        button.setAttribute(attributes$c.ariaExpanded, true);
      });

      slate.a11y.trapFocus({
        container: this.cartDrawer,
      });

      // Observe Additional Checkout Buttons
      this.observeAdditionalCheckoutButtons();
      this.isCartDrawerOpen = true;
    }

    /**
     * Close cart dropdown and remove class on body
     *
     * @return  {Void}
     */

    closeCartDrawer() {
      if (!this.isCartDrawerOpen) {
        return;
      }

      // Hook for cart drawer close event
      document.dispatchEvent(new CustomEvent('theme:cart:close', {bubbles: true}));

      // Cart elements closing animation

      if (this.cartAnimationTimer) {
        clearTimeout(this.cartAnimationTimer);
      }

      this.cartAnimationTimer = setTimeout(() => {
        this.cartDrawer.querySelectorAll(selectors$g.aos).forEach((item) => {
          item.classList.remove(classes$e.aosAnimate);
        });
      }, 300);

      slideUp(this.cartErrorHolder, 400);

      slate.a11y.removeTrapFocus();

      this.cartToggleButtons.forEach((button) => {
        button.setAttribute(attributes$c.ariaExpanded, false);
      });

      document.body.classList.remove(classes$e.cartDrawerOpen);
      this.cartDrawer.classList.remove(classes$e.open);
      this.itemsHolder.classList.remove(classes$e.updated);

      // Enable page scroll right after the closing animation ends
      const timeout = 400;
      document.dispatchEvent(new CustomEvent('theme:scroll:unlock', {bubbles: true, detail: timeout}));

      this.isCartDrawerOpen = false;
    }

    /**
     * Toggle cart dropdown
     *
     * @return  {Void}
     */

    toggleCartDrawer() {
      if (this.isCartDrawerOpen) {
        this.closeCartDrawer();
      } else {
        this.openCartDrawer();
      }
    }

    /**
     * Cart drawer toggle events
     *
     * @return  {Void}
     */

    cartDrawerToggleEvents() {
      if (!this.cartDrawer) {
        return;
      }

      // Close cart drawer on ESC key pressed
      this.cartDrawer.addEventListener('keyup', (e) => {
        if (e.which === theme.keyboardKeys.ESCAPE) {
          this.closeCartDrawer();
        }
      });

      // Define cart drawer toggle button click event
      this.cartDrawerToggleClickEvent = (e) => {
        e.preventDefault();
        const button = e.target;

        if (button.getAttribute(attributes$c.ariaExpanded) === 'false') {
          slate.a11y.state.trigger = button;
        }

        this.toggleCartDrawer();
      };

      // Define cart drawer close event
      this.cartDrawerCloseEvent = (e) => {
        const isCartDrawerToggle = e.target.matches(selectors$g.cartDrawerToggle);
        const isCartDrawerChild = document.querySelector(selectors$g.cartDrawer).contains(e.target);
        const isPopupQuickView = e.target.closest(selectors$g.popupQuickView);

        if (!isCartDrawerToggle && !isCartDrawerChild && !isPopupQuickView) {
          this.closeCartDrawer();
        }
      };

      // Bind cart drawer toggle buttons click event
      this.cartToggleButtons.forEach((button) => {
        button.addEventListener('click', this.cartDrawerToggleClickEvent);
      });

      // Close drawers on click outside
      //   Replaced 'click' with 'mousedown' as a quick and simple fix to the dragging issue on the upsell slider
      //   which was causing the cart-drawer to close when we start dragging the slider and finish our drag outside the cart-drawer
      //   which was triggering the 'click' event
      document.addEventListener('mousedown', this.cartDrawerCloseEvent);
    }

    /**
     * Toggle classes on different containers and messages
     *
     * @return  {Void}
     */

    toggleClassesOnContainers() {
      const that = this;

      this.emptyMessage.classList.toggle(classes$e.hidden, that.hasItemsInCart());
      this.buttonHolder.classList.toggle(classes$e.hidden, !that.hasItemsInCart());
      this.itemsHolder.classList.toggle(classes$e.hidden, !that.hasItemsInCart());
      this.cartItemsQty.classList.toggle(classes$e.hidden, !that.hasItemsInCart());
    }

    /**
     * Build cart depends on results
     *
     * @param   {Object}  data
     *
     * @return  {Void}
     */

    build(data) {
      const cartItemsData = data.querySelector(selectors$g.apiLineItems);
      const upsellItemsData = data.querySelector(selectors$g.apiUpsellItems);
      const cartEmptyData = Boolean(cartItemsData === null && upsellItemsData === null);

      if (this.totalItems !== this.newTotalItems) {
        this.totalItems = this.newTotalItems;

        this.toggleClassesOnContainers();
      }

      // Add class "is-updated" line items holder to reduce cart items animation delay via CSS variables
      if (this.isCartDrawerOpen) {
        this.itemsHolder.classList.add(classes$e.updated);
      }

      if (cartEmptyData) {
        this.itemsHolder.innerHTML = data;
        this.pairProductsHolder.innerHTML = '';
      } else {
        this.itemsHolder.innerHTML = cartItemsData.innerHTML;
        this.pairProductsHolder.innerHTML = upsellItemsData.innerHTML;

        this.renderPairProducts();
      }

      this.cartEvents();
      this.initQuantity();
      this.resetButtonClasses();
      this.removeLoadingClass();

      document.dispatchEvent(new CustomEvent('theme:cart:added', {bubbles: true}));

      if (this.cartDrawer) {
        this.openCartDrawer();
      }
    }

    /**
     * Check for items in the cart
     *
     * @return  {Void}
     */

    hasItemsInCart() {
      return this.totalItems > 0;
    }

    /**
     * Build total cart total price
     *
     * @param   {Object}  data
     *
     * @return  {Void}
     */
    
    buildTotalPrice(data) {
      const cartDiscountsHolder = document.querySelector(selectors$g.cartDiscountsHolder);

      if (data.original_total_price > data.total_price && data.cart_level_discount_applications.length > 0) {
        this.cartOriginalTotal.classList.remove(classes$e.hidden);
        if (data.original_total_price === 0) {
          this.cartOriginalTotalPrice.innerHTML = window.theme.strings.free;
        } else {
          this.cartOriginalTotalPrice.innerHTML = themeCurrency.formatMoney(data.original_total_price, theme.moneyWithCurrencyFormat);
        }
      } else {
        this.cartOriginalTotal.classList.add(classes$e.hidden);
      }

      this.cartTotal.innerHTML = data.total_price === 0 ? window.theme.strings.free : themeCurrency.formatMoney(data.total_price, theme.moneyWithCurrencyFormat);
      let eligibleFreeShip = document.querySelector(".eligibility-response.free-shipping");
      if(eligibleFreeShip){
        eligibleFreeShip.setAttribute("cart-total", themeCurrency.formatMoney(data.total_price, theme.moneyWithCurrencyFormat).replace("$",""));
        let currentvariantprice = eligibleFreeShip.getAttribute('currentvariantprice')
      }
      
      if (data.cart_level_discount_applications.length > 0) {
        const discountsMarkup = this.buildCartTotalDiscounts(data.cart_level_discount_applications);

        cartDiscountsHolder.classList.remove(classes$e.hidden);
        cartDiscountsHolder.innerHTML = discountsMarkup;
      } else {
        cartDiscountsHolder.classList.add(classes$e.hidden);
      }
    }

    /**
     * Build cart total discounts
     *
     * @param   {Array}  discounts
     *
     * @return  {String}
     */

    buildCartTotalDiscounts(discounts) {
      let discountMarkup = '';

      discounts.forEach((discount) => {
        discountMarkup += Sqrl.render(this.cartTotalDiscountTemplate, {
          discountTitle: discount.title,
          discountTotalAllocatedAmount: themeCurrency.formatMoney(discount.total_allocated_amount, theme.moneyFormat),
        });
      });

      return discountMarkup;
    }

    /**
     * Show/hide free shipping message
     *
     * @param   {Number}  total
     *
     * @return  {Void}
     */

    freeShippingMessageHandle(total) {
      if (this.cartMessage.length > 0) {
        document.querySelectorAll(selectors$g.cartMessage).forEach((message) => {
          const hasFreeShipping = message.hasAttribute(attributes$c.cartMessageValue) && message.getAttribute(attributes$c.cartMessageValue) === 'true' && total !== 0;
          const cartMessageDefault = message.querySelector(selectors$g.cartMessageDefault);

          message.classList.toggle(classes$e.success, total >= this.cartFreeLimitShipping && hasFreeShipping);
          message.classList.toggle(classes$e.isHidden, total === 0);
          cartMessageDefault.classList.toggle(classes$e.isHidden, total >= this.cartFreeLimitShipping);
        });
      }
    }

    /**
     * Update progress when update cart
     *
     * @return  {Void}
     */

    updateProgress() {
      const newPercentValue = (this.subtotal / this.cartFreeLimitShipping) * 100;
      const leftToSpend = theme.settings.currency_code_enable
        ? themeCurrency.formatMoney(this.cartFreeLimitShipping - this.subtotal, theme.moneyWithCurrencyFormat)
        : themeCurrency.formatMoney(this.cartFreeLimitShipping - this.subtotal, theme.moneyFormat);

      if (this.cartMessage.length > 0) {
        document.querySelectorAll(selectors$g.cartMessage).forEach((message) => {
          const cartMessageProgressItems = message.querySelectorAll(selectors$g.cartProgress);
          const leftToSpendMessage = message.querySelector(selectors$g.leftToSpend);

          if (leftToSpendMessage) {
            leftToSpendMessage.innerHTML = leftToSpend.replace('.00', '').replace(',00', '');
          }

          if (cartMessageProgressItems.length) {
            cartMessageProgressItems.forEach((cartMessageProgress, index) => {
              cartMessageProgress.classList.toggle(classes$e.isHidden, this.subtotal / this.cartFreeLimitShipping >= 1);
              cartMessageProgress.style.setProperty('--progress-width', `${newPercentValue}%`);
              if (index === 0) {
                cartMessageProgress.setAttribute(attributes$c.value, newPercentValue);
              }
            });
          }

          this.freeShippingMessageHandle(this.subtotal);
        });
      }
    }

    /**
     * Render Upsell Products
     */
    renderPairProducts() {
      this.flktyUpsell = null;
      this.pairProductsHolder = document.querySelector(selectors$g.pairProductsHolder);
      this.pairProducts = document.querySelector(selectors$g.pairProducts);
      this.upsellHolders = document.querySelectorAll(selectors$g.upsellHolder);

      if (this.pairProductsHolder === null || this.pairProductsHolder === undefined) {
        return;
      }

      // Upsell slider
      const that = this;
      if (this.upsellHolders.length > 1) {
        this.flktyUpsell = new Flickity(this.pairProducts, {
          wrapAround: true,
          pageDots: true,
          adaptiveHeight: true,
          prevNextButtons: false,
          on: {
            ready: function () {
              that.showUpsell();
              new QuickViewPopup(that.cart);
              this.reloadCells();
              this.resize();
            },
          },
        });

        return;
      }

      // Single upsell item
      this.showUpsell();
      new QuickViewPopup(this.cart);
    }

    showUpsell() {
      if (this.pairProductsHolder === null || this.pairProductsHolder === undefined) {
        return;
      }

      if (!this.isCartPage && this.showAnimations) {
        AOS.refreshHard();
      }
    }

    updateItemsQuantity(itemsQty) {
      let oneItemText = theme.strings.cart_items_one;
      let manyItemsText = theme.strings.cart_items_many;
      oneItemText = oneItemText.split('}}')[1];
      manyItemsText = manyItemsText.split('}}')[1];

      if (this.cartItemsQty) {
        this.cartItemsQty.textContent = itemsQty === 1 ? `${itemsQty} ${oneItemText}` : `${itemsQty} ${manyItemsText}`;
      }
    }

    observeAdditionalCheckoutButtons() {
      // identify an element to observe
      const additionalCheckoutButtons = this.cart.querySelector(selectors$g.additionalCheckoutButtons);
      if (additionalCheckoutButtons) {
        // create a new instance of `MutationObserver` named `observer`,
        // passing it a callback function
        const observer = new MutationObserver(() => {
          slate.a11y.removeTrapFocus();
          slate.a11y.trapFocus({
            container: this.cart,
          });
          observer.disconnect();
        });

        // call `observe()` on that MutationObserver instance,
        // passing it the element to observe, and the options object
        observer.observe(additionalCheckoutButtons, {subtree: true, childList: true});
      }
    }

    formSubmitHandler() {
      const termsAccepted = document.querySelector(selectors$g.cartTermsCheckbox).checked;
      const termsError = document.querySelector(selectors$g.termsErrorMessage);

      // Disable form submit if terms and conditions are not accepted
      if (!termsAccepted) {
        if (document.querySelector(selectors$g.termsErrorMessage).length > 0) {
          return;
        }

        termsError.innerText = theme.strings.cart_acceptance_error;
        this.cartCheckoutButton.setAttribute(attributes$c.disabled, true);
        slideDown(termsError, 400);
      } else {
        slideUp(termsError, 400);
        this.cartCheckoutButton.removeAttribute(attributes$c.disabled);
      }
    }

    resetButtonClasses() {
      const buttons = document.querySelectorAll(selectors$g.buttonAddToCart);
      if (buttons) {
        buttons.forEach((button) => {
          if (button.classList.contains(classes$e.loading)) {
            button.classList.remove(classes$e.loading);
            button.classList.add(classes$e.success);

            setTimeout(() => {
              button.removeAttribute(attributes$c.disabled);
              button.classList.remove(classes$e.success);
            }, settings$4.timers.addProductTimeout);
          }
        });
      }
    }

    addLoadingClass() {
      if (this.cartDrawer) {
        this.cartDrawer.classList.add(classes$e.loading);
      } else if (this.itemsWrapper) {
        this.itemsWrapper.classList.add(classes$e.loading);
      }
    }

    removeLoadingClass() {
      if (this.cartDrawer) {
        this.cartDrawer.classList.remove(classes$e.loading);
      } else if (this.itemsWrapper) {
        this.itemsWrapper.classList.remove(classes$e.loading);
      }
    }

    destroy() {
      if (this.cartDrawerToggle) {
        this.cartDrawerToggle.removeEventListener('click', this.cartDrawerToggleClickEvent);
      }

      this.cartToggleButtons.forEach((button) => {
        button.removeEventListener('click', this.cartDrawerToggleClickEvent);
      });

      // Close drawers on click outside
      document.removeEventListener('mousedown', this.cartDrawerCloseEvent);

      if (this.collapsible !== null) {
        this.collapsible.onUnload();
      }
    }
  }

  window.cart = new CartDrawer();

  Sqrl.filters.define('handle', function (str) {
    str = str.toLowerCase();

    var toReplace = ['"', "'", '\\', '(', ')', '[', ']'];

    // For the old browsers
    for (var i = 0; i < toReplace.length; ++i) {
      str = str.replace(toReplace[i], '');
    }

    str = str.replace(/\W+/g, '-');

    if (str.charAt(str.length - 1) == '-') {
      str = str.replace(/-+\z/, '');
    }

    if (str.charAt(0) == '-') {
      str = str.replace(/\A-+/, '');
    }

    return str;
  });

  Sqrl.filters.define('last', function (str) {
    const words = str.split('-');
    return words[words.length - 1];
  });

  Sqrl.filters.define('asset_url', function (str) {
    let asset = theme.assets.image;
    asset = asset.replace('image', str);
    return asset;
  });

  const selectors$h = {
    rangeSlider: '[data-range-slider]',
    rangeDotLeft: '[data-range-left]',
    rangeDotRight: '[data-range-right]',
    rangeLine: '[data-range-line]',
    rangeHolder: '[data-range-holder]',
    dataMin: 'data-se-min',
    dataMax: 'data-se-max',
    dataMinValue: 'data-se-min-value',
    dataMaxValue: 'data-se-max-value',
    dataStep: 'data-se-step',
    dataFilterUpdate: 'data-range-filter-update',
    priceMin: '[data-field-price-min]',
    priceMax: '[data-field-price-max]',
  };

  const classes$f = {
    isInitialized: 'is-initialized',
  };

  class RangeSlider {
    constructor(container) {
      this.container = container;
      this.init();
      this.initListener = () => this.init();

      document.addEventListener('theme:filters:init', this.initListener);
    }

    init() {
      this.slider = this.container.querySelector(selectors$h.rangeSlider);

      if (!this.slider) {
        return;
      }

      this.resizeFilters = debounce(this.reset.bind(this), 50);

      this.onMoveEvent = (event) => this.onMove(event);
      this.onStopEvent = (event) => this.onStop(event);
      this.onStartEvent = (event) => this.onStart(event);
      this.startX = 0;
      this.x = 0;

      // retrieve touch button
      this.touchLeft = this.slider.querySelector(selectors$h.rangeDotLeft);
      this.touchRight = this.slider.querySelector(selectors$h.rangeDotRight);
      this.lineSpan = this.slider.querySelector(selectors$h.rangeLine);

      // get some properties
      this.min = parseFloat(this.slider.getAttribute(selectors$h.dataMin));
      this.max = parseFloat(this.slider.getAttribute(selectors$h.dataMax));

      this.step = 0.0;

      // normalize flag
      this.normalizeFact = 26;

      // retrieve default values
      let defaultMinValue = this.min;
      if (this.slider.hasAttribute(selectors$h.dataMinValue)) {
        defaultMinValue = parseFloat(this.slider.getAttribute(selectors$h.dataMinValue));
      }
      let defaultMaxValue = this.max;

      if (this.slider.hasAttribute(selectors$h.dataMaxValue)) {
        defaultMaxValue = parseFloat(this.slider.getAttribute(selectors$h.dataMaxValue));
      }

      // check values are correct
      if (defaultMinValue < this.min) {
        defaultMinValue = this.min;
      }

      if (defaultMaxValue > this.max) {
        defaultMaxValue = this.max;
      }

      if (defaultMinValue > defaultMaxValue) {
        defaultMinValue = defaultMaxValue;
      }

      if (this.slider.getAttribute(selectors$h.dataStep)) {
        this.step = Math.abs(parseFloat(this.slider.getAttribute(selectors$h.dataStep)));
      }

      // initial reset
      this.reset();
      window.addEventListener('theme:resize', this.resizeFilters);

      // usefull values, min, max, normalize fact is the width of both touch buttons
      this.maxX = this.slider.offsetWidth - this.touchRight.offsetWidth;
      this.selectedTouch = null;
      this.initialValue = this.lineSpan.offsetWidth - this.normalizeFact;

      // set defualt values
      this.setMinValue(defaultMinValue);
      this.setMaxValue(defaultMaxValue);

      // link events
      this.touchLeft.addEventListener('mousedown', this.onStartEvent);
      this.touchRight.addEventListener('mousedown', this.onStartEvent);
      this.touchLeft.addEventListener('touchstart', this.onStartEvent, {passive: true});
      this.touchRight.addEventListener('touchstart', this.onStartEvent, {passive: true});

      // initialize
      this.slider.classList.add(classes$f.isInitialized);
    }

    reset() {
      this.touchLeft.style.left = '0px';
      this.touchRight.style.left = this.slider.offsetWidth - this.touchLeft.offsetWidth + 'px';
      this.lineSpan.style.marginLeft = '0px';
      this.lineSpan.style.width = this.slider.offsetWidth - this.touchLeft.offsetWidth + 'px';
      this.startX = 0;
      this.x = 0;

      this.maxX = this.slider.offsetWidth - this.touchRight.offsetWidth;
      this.initialValue = this.lineSpan.offsetWidth - this.normalizeFact;
    }

    setMinValue(minValue) {
      const ratio = (minValue - this.min) / (this.max - this.min);
      this.touchLeft.style.left = Math.ceil(ratio * (this.slider.offsetWidth - (this.touchLeft.offsetWidth + this.normalizeFact))) + 'px';
      this.lineSpan.style.marginLeft = this.touchLeft.offsetLeft + 'px';
      this.lineSpan.style.width = this.touchRight.offsetLeft - this.touchLeft.offsetLeft + 'px';
      this.slider.setAttribute(selectors$h.dataMinValue, minValue);
    }

    setMaxValue(maxValue) {
      const ratio = (maxValue - this.min) / (this.max - this.min);
      this.touchRight.style.left = Math.ceil(ratio * (this.slider.offsetWidth - (this.touchLeft.offsetWidth + this.normalizeFact)) + this.normalizeFact) + 'px';
      this.lineSpan.style.marginLeft = this.touchLeft.offsetLeft + 'px';
      this.lineSpan.style.width = this.touchRight.offsetLeft - this.touchLeft.offsetLeft + 'px';
      this.slider.setAttribute(selectors$h.dataMaxValue, maxValue);
    }

    onStart(event) {
      // Prevent default dragging of selected content
      event.preventDefault();
      let eventTouch = event;

      if (event.touches) {
        eventTouch = event.touches[0];
      }

      if (event.currentTarget === this.touchLeft) {
        this.x = this.touchLeft.offsetLeft;
      } else if (event.currentTarget === this.touchRight) {
        this.x = this.touchRight.offsetLeft;
      }

      this.startX = eventTouch.pageX - this.x;
      this.selectedTouch = event.currentTarget;
      document.addEventListener('mousemove', this.onMoveEvent);
      document.addEventListener('mouseup', this.onStopEvent);
      document.addEventListener('touchmove', this.onMoveEvent, {passive: true});
      document.addEventListener('touchend', this.onStopEvent, {passive: true});
    }

    onMove(event) {
      let eventTouch = event;

      if (event.touches) {
        eventTouch = event.touches[0];
      }

      this.x = eventTouch.pageX - this.startX;

      if (this.selectedTouch === this.touchLeft) {
        if (this.x > this.touchRight.offsetLeft - this.selectedTouch.offsetWidth + 10) {
          this.x = this.touchRight.offsetLeft - this.selectedTouch.offsetWidth + 10;
        } else if (this.x < 0) {
          this.x = 0;
        }

        this.selectedTouch.style.left = this.x + 'px';
      } else if (this.selectedTouch === this.touchRight) {
        if (this.x < this.touchLeft.offsetLeft + this.touchLeft.offsetWidth - 10) {
          this.x = this.touchLeft.offsetLeft + this.touchLeft.offsetWidth - 10;
        } else if (this.x > this.maxX) {
          this.x = this.maxX;
        }
        this.selectedTouch.style.left = this.x + 'px';
      }

      // update line span
      this.lineSpan.style.marginLeft = this.touchLeft.offsetLeft + 'px';
      this.lineSpan.style.width = this.touchRight.offsetLeft - this.touchLeft.offsetLeft + 'px';

      // write new value
      this.calculateValue();

      // call on change
      if (this.slider.getAttribute('on-change')) {
        const fn = new Function('min, max', this.slider.getAttribute('on-change'));
        fn(this.slider.getAttribute(selectors$h.dataMinValue), this.slider.getAttribute(selectors$h.dataMaxValue));
      }

      this.onChange(this.slider.getAttribute(selectors$h.dataMinValue), this.slider.getAttribute(selectors$h.dataMaxValue));
    }

    onStop(event) {
      document.removeEventListener('mousemove', this.onMoveEvent);
      document.removeEventListener('mouseup', this.onStopEvent);
      document.removeEventListener('touchmove', this.onMoveEvent, {passive: true});
      document.removeEventListener('touchend', this.onStopEvent, {passive: true});

      this.selectedTouch = null;

      // write new value
      this.calculateValue();

      // call did changed
      this.onChanged(this.slider.getAttribute(selectors$h.dataMinValue), this.slider.getAttribute(selectors$h.dataMaxValue));
    }

    onChange(min, max) {
      const rangeHolder = this.slider.closest(selectors$h.rangeHolder);
      if (rangeHolder) {
        const priceMin = rangeHolder.querySelector(selectors$h.priceMin);
        const priceMax = rangeHolder.querySelector(selectors$h.priceMax);

        if (priceMin && priceMax) {
          priceMin.value = parseInt(min);
          priceMax.value = parseInt(max);
        }
      }
    }

    onChanged(min, max) {
      if (this.slider.hasAttribute(selectors$h.dataFilterUpdate)) {
        this.slider.dispatchEvent(new CustomEvent('theme:filter:range-update', {bubbles: true}));
      }
    }

    calculateValue() {
      const newValue = (this.lineSpan.offsetWidth - this.normalizeFact) / this.initialValue;
      let minValue = this.lineSpan.offsetLeft / this.initialValue;
      let maxValue = minValue + newValue;

      minValue = minValue * (this.max - this.min) + this.min;
      maxValue = maxValue * (this.max - this.min) + this.min;

      if (this.step !== 0.0) {
        let multi = Math.floor(minValue / this.step);
        minValue = this.step * multi;

        multi = Math.floor(maxValue / this.step);
        maxValue = this.step * multi;
      }

      if (this.selectedTouch === this.touchLeft) {
        this.slider.setAttribute(selectors$h.dataMinValue, minValue);
      }

      if (this.selectedTouch === this.touchRight) {
        this.slider.setAttribute(selectors$h.dataMaxValue, maxValue);
      }
    }

    unload() {
      document.removeEventListener('theme:filters:init', this.initListener);
      window.removeEventListener('theme:resize', this.resizeFilters);
    }
  }

  const selectors$i = {
    slider: '[data-slider]',
    productMediaContainer: '[data-product-media-container]',
    productMediaSlider: '[data-product-media-slideshow]',
    productMediaSlide: '[data-product-media-slideshow-slide]',
    productImage: '[data-product-image]',
    progressBar: '[data-product-slideshow-progress]',
    flickityButton: '.flickity-button',
    quickButton: '[data-button-quick-view]',
    popupProduct: '[data-product]',
    popupClose: '[data-popup-close]',
  };

  const classes$g = {
    fill: 'fill',
    quickViewVisible: 'js-quick-view-visible',
  };

  const sections$2 = {};

  class ProductGrid {
    constructor(container) {
      this.container = container;
      this.body = document.body;
      this.sliders = this.container.querySelectorAll(selectors$i.slider);

      if (theme.settings.productGridHover === 'slideshow' && !window.theme.touch) {
        this.productGridSlideshow();
      }

      new QuickViewPopup(this.container);
      makeGridSwatches(this.container);
    }

    /* Product grid slideshow */
    productGridSlideshow() {
      
      console.log("dcsd")

      const productMediaSlider = this.container.querySelectorAll(selectors$i.productMediaSlider);
      const linkedImages = this.container.querySelectorAll(selectors$i.productMediaContainer);

      if (productMediaSlider.length) {
        productMediaSlider.forEach((slider) => {
          const mediaContainer = slider.closest(selectors$i.productMediaContainer);
          const progressBar = mediaContainer.querySelector(selectors$i.progressBar);
          const countImages = slider.querySelectorAll(selectors$i.productMediaSlide).length;
          const autoplaySpeed = 2200;
          const draggable = !this.sliders.length; // Enable dragging if only layout is not Carousel
          let flkty = new Flickity.data(slider);
          let timer = 0;
          let cellSelector = selectors$i.productMediaSlide;

          if (!flkty.isActive && countImages > 1) {
            flkty = new Flickity(slider, {
              draggable: draggable,
              cellSelector: cellSelector,
              contain: true,
              wrapAround: true,
              imagesLoaded: true,
              lazyLoad: true,
              pageDots: false,
              prevNextButtons: false,
              adaptiveHeight: false,
              pauseAutoPlayOnHover: false,
              selectedAttraction: 0.2,
              friction: 1,
              on: {
                ready: () => {
                  this.container.style.setProperty('--autoplay-speed', `${autoplaySpeed}ms`);
                },
                change: () => {
                  if (timer) {
                    clearTimeout(timer);
                  }

                  progressBar.classList.remove(classes$g.fill);

                  requestAnimationFrame(() => {
                    progressBar.classList.add(classes$g.fill);
                  });

                  timer = setTimeout(() => {
                    progressBar.classList.remove(classes$g.fill);
                  }, autoplaySpeed);
                },
                dragEnd: () => {
                  flkty.playPlayer();
                },
              },
            });

            if (!window.theme.touch) {
              mediaContainer.addEventListener('mouseenter', () => {
                progressBar.classList.add(classes$g.fill);

                if (timer) {
                  clearTimeout(timer);
                }

                timer = setTimeout(() => {
                  progressBar.classList.remove(classes$g.fill);
                }, autoplaySpeed);

                flkty.options.autoPlay = autoplaySpeed;
                flkty.playPlayer();
              });
              mediaContainer.addEventListener('mouseleave', () => {
                flkty.stopPlayer();
                if (timer) {
                  clearTimeout(timer);
                }
                progressBar.classList.remove(classes$g.fill);
              });
            }
          }
        });
      }

      // Prevent page redirect on slideshow arrow click
      if (linkedImages.length) {
        linkedImages.forEach((item) => {
          item.addEventListener('click', (e) => {
            if (e.target.matches(selectors$i.flickityButton)) {
              e.preventDefault();
            }
          });
        });
      }
    }
    

    /**
     * Quickview popup close function
     */
    popupClose() {
      const popupProduct = document.querySelector(selectors$i.popupProduct);
      if (popupProduct) {
        const popupClose = popupProduct.querySelector(selectors$i.popupClose);
        popupClose.dispatchEvent(new Event('click'));
      }
    }

    /**
     * Event callback for Theme Editor `section:block:select` event
     */
    onBlockSelect() {
      if (this.body.classList.contains(classes$g.quickViewVisible)) {
        this.popupClose();
      }
    }

    /**
     * Event callback for Theme Editor `section:deselect` event
     */
    onDeselect() {
      if (this.body.classList.contains(classes$g.quickViewVisible)) {
        this.popupClose();
      }
    }

    /**
     * Event callback for Theme Editor `section:unload` event
     */
    onUnload() {
      if (this.body.classList.contains(classes$g.quickViewVisible)) {
        this.popupClose();
      }
    }
  }

  const productGrid = {
    onLoad() {
      sections$2[this.id] = new ProductGrid(this.container);
    },
    onBlockSelect() {
      sections$2[this.id].onBlockSelect();
    },
    onDeselect() {
      sections$2[this.id].onDeselect();
    },
    onUnload() {
      sections$2[this.id].onUnload();
    },
  };

  const selectors$j = {
    ajaxinateContainer: '#AjaxinateLoop',
    ajaxinatePagination: '#AjaxinatePagination',
  };

  let sections$3 = {};

  class Ajaxify {
    constructor(container) {
      this.container = container;
      this.endlessScroll = null;

      if (theme.settings.enableInfinityScroll) {
        this.init();
      }
    }

    init() {
      this.loadMoreFix();
      this.endlessScroll = new Ajaxinate({
        container: selectors$j.ajaxinateContainer,
        pagination: selectors$j.ajaxinatePagination,
        method: 'scroll',
        callback: () => {
          AOS.refreshHard();
        },
      });
    }

    loadMoreFix() {
      // Fix ajaxinate in theme editor
      Ajaxinate.prototype.loadMore = function loadMore() {
        this.request = new XMLHttpRequest();

        this.request.onreadystatechange = function success() {
          if (!this.request.responseXML) {
            return;
          }
          if (!this.request.readyState === 4 || !this.request.status === 200) {
            return;
          }

          const newContainer = this.request.responseXML.querySelector(this.settings.container);
          const newPagination = this.request.responseXML.querySelector(this.settings.pagination);

          this.containerElement.insertAdjacentHTML('beforeend', newContainer.innerHTML);

          if (typeof newPagination === 'undefined' || newPagination === null) {
            this.removePaginationElement();
          } else {
            this.paginationElement.innerHTML = newPagination.innerHTML;

            if (this.settings.callback && typeof this.settings.callback === 'function') {
              this.settings.callback(this.request.responseXML);
            }

            this.initialize();
          }
        }.bind(this);

        this.request.open('GET', this.nextPageUrl, true);
        this.request.responseType = 'document';
        this.request.send();
      };
    }

    unload() {
      if (this.endlessScroll) {
        this.endlessScroll.destroy();
      }
    }
  }

  const ajaxify = {
    onLoad() {
      sections$3 = new Ajaxify(this.container);
    },
    onUnload: function () {
      if (typeof sections$3.unload === 'function') {
        sections$3.unload();
      }
    },
  };

  const settings$5 = {
    loadingTimeout: 300,
  };

  const selectors$k = {
    buttons: 'button',
    buttonFiltersToggle: '[data-toggle-filters]',
    buttonFiltersClose: '[data-close-filters]',
    buttonFiltersOpen: '[data-open-filters]',
    collectionWrapper: '[data-collection-wrapper]',
    inputs: 'input, select, label, textarea',
    inputSort: '[data-input-sort]',
    filters: '[data-collection-filters]',
    filtersWrapper: '[data-collection-filters-wrapper]',
    filtersList: '[data-collection-filters-list]',
    filtersStickyBar: '[data-collection-sticky-bar]',
    filter: '[data-collection-filter]',
    filterTag: '[data-collection-filter-tag]',
    filterTagButton: '[data-collection-filter-tag-button]',
    filtersForm: '[data-collection-filters-form]',
    filterResetButton: '[data-filter-reset-button]',
    filterTagClearButton: '[data-filter-tag-reset-button]',
    popupsSection: '[data-section-type="popups"]',
    productGrid: '[data-collection-products]',
    productMediaSlideshow: '[data-product-media-slideshow]',
    productMediaSlide: '[data-product-media-slideshow-slide]',
    priceMin: '[data-field-price-min]',
    priceMax: '[data-field-price-max]',
    rangeMin: '[data-se-min-value]',
    rangeMax: '[data-se-max-value]',
    rangeMinValue: 'data-se-min-value',
    rangeMaxValue: 'data-se-max-value',
    rangeMinDefault: 'data-se-min',
    rangeMaxDefault: 'data-se-max',
    searchForm: '[data-search-form]',
    swatchesWrapper: '[data-grid-swatches]',
    swatch: '[data-swatch]',
  };

  const classes$h = {
    filtersVisible: 'collection__filters--visible',
    isActive: 'is-active',
    isExpanded: 'is-expanded',
    isVisible: 'is-visible',
    isLoading: 'is-loading',
    popupIsVisible: 'popup--visible',
  };

  const attributes$d = {
    preventScrollLock: 'data-prevent-scroll-lock',
  };

  const sections$4 = {};

  class Filters {
    constructor(container) {
      this.container = container;
      this.sectionId = container.dataset.sectionId;
      this.enableFilters = container.dataset.enableFilters === 'true';
      this.filterMode = container.dataset.filterMode;
      this.collectionHandle = this.container.dataset.collection;
      this.productGrid = this.container.querySelector(selectors$k.productGrid);
      this.filters = this.container.querySelector(selectors$k.filters);
      this.filtersStickyBar = this.container.querySelector(selectors$k.filtersStickyBar);
      this.filtersForm = this.container.querySelector(selectors$k.filtersForm);
      this.searchForm = this.container.querySelector(selectors$k.searchForm);
      this.inputSort = this.container.querySelectorAll(selectors$k.inputSort);
      this.filterData = [];
      this.rangeSlider = null;
      this.hideFilters = this.hideFilters.bind(this);
      this.showFilters = this.showFilters.bind(this);
      this.onFilterResetClick = this.onFilterResetClick.bind(this);
      this.onFilterTagResetClick = this.onFilterTagResetClick.bind(this);
      this.onFilterTagClearClick = this.onFilterTagClearClick.bind(this);
      this.onFilterToggleClick = this.onFilterToggleClick.bind(this);
      this.onKeyUpHandler = this.onKeyUpHandler.bind(this);
      this.updateRangeEvent = this.updateRange.bind(this);
      this.debouncedSubmitEvent = debounce(function (event) {
        this.onSubmitHandler(event);
      }, 500);
      this.debouncedSortEvent = debounce(function (event) {
        this.onSortChange(event);
      }, 500);
      this.productGridEvents = {};

      this.initTagFilters();
      this.initFacetedFilters();
      this.bindToggleButtonsEvents();
      this.bindFilterButtonsEvents();
      this.initProductGridEvents();

      makeSwatches(this.container);
      this.collapsible = new Collapsible(this.container);

      // Update css variable for collection sticky bar height
      setVars();

      window.addEventListener('popstate', this.onHistoryChange.bind(this));
    }

    /*
     * Init faceted filters
     */
    initFacetedFilters() {
      if (this.filterMode == 'tag' || this.filterMode == 'group' || !this.enableFilters) {
        return;
      }

      this.rangeSlider = new RangeSlider(this.container);
    }

    /*
     * Price range slider update
     */
    updateRange() {
      const rangeMin = this.filtersForm.querySelector(selectors$k.rangeMin);
      const rangeMax = this.filtersForm.querySelector(selectors$k.rangeMax);
      const priceMin = this.filtersForm.querySelector(selectors$k.priceMin);
      const priceMax = this.filtersForm.querySelector(selectors$k.priceMax);

      if (rangeMin.hasAttribute(selectors$k.rangeMinValue) && rangeMax.hasAttribute(selectors$k.rangeMaxValue)) {
        const priceMinValue = parseFloat(priceMin.placeholder, 10);
        const priceMaxValue = parseFloat(priceMax.placeholder, 10);
        const rangeMinValue = parseFloat(rangeMin.getAttribute(selectors$k.rangeMinValue), 10);
        const rangeMaxValue = parseFloat(rangeMax.getAttribute(selectors$k.rangeMaxValue), 10);

        if (priceMinValue !== rangeMinValue || priceMaxValue !== rangeMaxValue) {
          priceMin.value = parseInt(rangeMinValue);
          priceMax.value = parseInt(rangeMaxValue);

          this.filtersForm.dispatchEvent(new Event('input', {bubbles: true}));
        }
      }
    }

    /*
     * Render product grid and filters on form submission
     */
    onSubmitHandler(e) {
      e.preventDefault();
      const formData = new FormData(e.target.closest('form'));
      const searchParams = new URLSearchParams(formData);

      // if submitted price equal to price range min and max remove price parameters
      const rangeMin = this.filtersForm.querySelector(selectors$k.rangeMin);
      const rangeMax = this.filtersForm.querySelector(selectors$k.rangeMax);
      const priceMin = this.filtersForm.querySelector(selectors$k.priceMin);
      const priceMax = this.filtersForm.querySelector(selectors$k.priceMax);
      const checkElements = rangeMin && rangeMax && priceMin && priceMax;

      if (checkElements && rangeMin.hasAttribute(selectors$k.rangeMinDefault) && rangeMax.hasAttribute(selectors$k.rangeMaxDefault)) {
        const rangeMinDefault = parseFloat(rangeMin.getAttribute(selectors$k.rangeMinDefault), 10);
        const rangeMaxDefault = parseFloat(rangeMax.getAttribute(selectors$k.rangeMaxDefault), 10);
        const priceMinValue = !priceMin.value ? rangeMinDefault : parseFloat(priceMin.value, 10);
        const priceMaxValue = !priceMax.value ? rangeMaxDefault : parseFloat(priceMax.value, 10);

        if (priceMinValue <= rangeMinDefault && priceMaxValue >= rangeMaxDefault) {
          searchParams.delete('filter.v.price.gte');
          searchParams.delete('filter.v.price.lte');
        }
      }

      this.renderSection(searchParams.toString(), e);
    }

    /*
     * Call renderSection on history change
     */
    onHistoryChange(e) {
      if (!this.filters) {
        return;
      }

      const searchParams = e.state?.searchParams || '';
      this.renderSection(searchParams, null, false);
    }

    /*
     * Render section on history change or filter/sort change event
     */
    renderSection(searchParams, event, updateURLHash = true) {
      this.startLoading();
      const url = `${window.location.pathname}?section_id=${this.sectionId}&${searchParams}`;
      const filterDataUrl = (element) => element.url === url;
      this.filterData.some(filterDataUrl) ? this.renderSectionFromCache(filterDataUrl, event) : this.renderSectionFromFetch(url, event);

      if (updateURLHash) {
        this.updateURLHash(searchParams);
      }
    }

    /*
     * Render section from fetch call
     */
    renderSectionFromFetch(url, event) {
      fetch(url)
        .then((response) => response.text())
        .then((responseText) => {
          const html = responseText;
          this.filterData = [...this.filterData, {html, url}];
          this.renderFilters(html);
          this.renderProductGrid(html);
          this.finishLoading();
        });
    }

    /*
     * Render section from Cache
     */
    renderSectionFromCache(filterDataUrl, event) {
      const html = this.filterData.find(filterDataUrl).html;
      this.renderFilters(html, event);
      this.renderProductGrid(html);
      this.finishLoading();
    }

    /*
     * Render product grid items on fetch call
     */
    renderProductGrid(html) {
      const newProductGrid = new DOMParser().parseFromString(html, 'text/html').querySelector(selectors$k.productGrid);

      if (!newProductGrid) {
        return;
      }

      this.productGrid.innerHTML = newProductGrid.innerHTML;

      this.initProductGridEvents();
    }

    /*
     * Render filters on fetch call
     */
    renderFilters(html) {
      const newFilters = new DOMParser().parseFromString(html, 'text/html').querySelector(selectors$k.filters);

      if (!newFilters) {
        return;
      }

      this.filters.innerHTML = newFilters.innerHTML;
      this.filtersForm = document.querySelector(selectors$k.filtersForm);
      this.bindFilterButtonsEvents();
      this.bindToggleButtonsEvents();
      makeSwatches(this.container);
      this.collapsible = new Collapsible(this.container);

      // Init price range slider
      document.dispatchEvent(new CustomEvent('theme:filters:init', {bubbles: true}));
    }

    /*
     * Update URL when filter/sort is changed
     */
    updateURLHash(searchParams) {
      history.pushState({searchParams}, '', `${window.location.pathname}${searchParams && '?'.concat(searchParams)}`);
    }

    /*
     * Bind filter buttons events
     */
    bindFilterButtonsEvents() {
      this.container.querySelectorAll(selectors$k.filterResetButton).forEach((button) => {
        button.addEventListener('click', this.onFilterResetClick, {once: true});
      });

      if (this.filtersForm) {
        this.filtersForm.addEventListener('input', this.debouncedSubmitEvent.bind(this));
        this.filtersForm.addEventListener('theme:filter:range-update', this.updateRangeEvent);
      }
    }

    /*
     * Render products on specific filter click event
     */
    onFilterResetClick(e) {
      e.preventDefault();
      this.renderSection(new URL(e.currentTarget.href).searchParams.toString());
    }

    /*
     * Bind filter title click events to toggle options visibility
     */
    bindToggleButtonsEvents() {
      this.container.querySelectorAll(selectors$k.buttonFiltersToggle).forEach((button) => {
        button.addEventListener('click', this.onFilterToggleClick);
      });
      this.container.querySelectorAll(selectors$k.buttonFiltersClose).forEach((button) => {
        button.addEventListener('click', this.hideFilters);
      });
      this.container.querySelectorAll(selectors$k.buttonFiltersOpen).forEach((button) => {
        button.addEventListener('click', this.showFilters);
      });

      this.container.querySelector(selectors$k.collectionWrapper).addEventListener('keyup', this.onKeyUpHandler);
    }

    /*
     * Event handler on user ESC key press
     */
    onKeyUpHandler(e) {
      if (e.keyCode === theme.keyboardKeys.ESCAPE) {
        this.hideFilters();
      }
    }

    /*
     * Toggle filter options on title click
     */
    onFilterToggleClick(e) {
      e.preventDefault();

      const filtersVisible = this.filters.classList.contains(classes$h.filtersVisible);

      filtersVisible ? this.hideFilters() : this.showFilters();
    }

    /*
     * Scroll down and open collection filters if they are hidden
     */
    showFilters() {
      const instance = this;
      const scrollableElement = document.querySelector(selectors$k.filtersList);

      slate.a11y.state.trigger = document.querySelector(selectors$k.buttonFiltersToggle);

      // Trap focus
      slate.a11y.trapFocus({
        container: instance.filters,
      });

      // Open filters and scroll lock if only they are hidden on lower sized screens
      if (window.innerWidth < theme.sizes.widescreen) {
        this.filters.classList.add(classes$h.filtersVisible);

        document.dispatchEvent(new CustomEvent('theme:scroll:lock', {bubbles: true, detail: scrollableElement}));
      }

      // Scroll filters into view
      if (this.filtersStickyBar) {
        let stickyBarOffsetTop = this.getStickyBarOffsetTop();

        window.scrollTo({
          top: stickyBarOffsetTop,
          left: 0,
          behavior: 'smooth',
        });
      }
    }

    /*
     * Hide filters dropdown
     */
    hideFilters() {
      let filtersVisible = this.filters.classList.contains(classes$h.filtersVisible);
      let loading = this.container.classList.contains(classes$h.isLoading);

      if (filtersVisible) {
        this.filters.classList.remove(classes$h.filtersVisible);
        slate.a11y.removeTrapFocus();
      }

      // Enable page scroll if no loading state
      if (!loading) {
        document.dispatchEvent(new CustomEvent('theme:scroll:unlock', {bubbles: true, detail: settings$5.loadingTimeout}));
      }
    }

    /*
     * Init functions required when "Filter by tag/group" is selected from Collection page -> Collection pages -> Filter mode
     */
    initTagFilters() {
      if ((this.filterMode != 'tag' && this.filterMode != 'group') || !this.enableFilters) {
        return;
      }

      this.tags = this.container.dataset.tags.split('+').filter((item) => item);
      this.bindFilterTagButtonsEvents();
      this.bindSortChangeEvent();
      this.resizeEvent = () => this.hideFilters();

      document.addEventListener('theme:resize:width', this.resizeEvent);
    }

    /*
     * Render products when tag filter is selected
     */
    renderTagFiltersProducts(url) {
      this.startLoading();

      if (typeof this.endlessCollection === 'object') {
        this.endlessCollection.unload();
      }

      fetch(url)
        .then((response) => response.text())
        .then((responseText) => {
          const html = responseText;
          const parsedData = new DOMParser().parseFromString(html, 'text/html');
          const productsHTML = parsedData.querySelector(selectors$k.productGrid).innerHTML;
          const filtersHTML = parsedData.querySelector(selectors$k.filters).innerHTML;

          this.productGrid.innerHTML = productsHTML;
          this.filters.innerHTML = filtersHTML;
          this.inputSort = this.container.querySelectorAll(selectors$k.inputSort);
          this.filtersForm = document.querySelector(selectors$k.filtersForm);
          this.filterData = [...this.filterData, {html, url}];

          this.bindFilterTagButtonsEvents();
          this.bindSortChangeEvent();
          this.bindToggleButtonsEvents();
          this.initProductGridEvents();
          makeSwatches(this.container);
          this.collapsible = new Collapsible(this.container);
          AOS.refreshHard();

          // Update page URL if supported by the browser
          if (history.replaceState) {
            window.history.pushState({path: url}, '', url);
          }
        })
        .catch((error) => {
          this.finishLoading();
          console.log(`Error: ${error}`);
        });
    }

    /*
     * Bind Filter by tag buttons
     */
    bindFilterTagButtonsEvents() {
      this.container.querySelectorAll(selectors$k.filterTagButton).forEach((button) => {
        button.addEventListener('click', this.onFilterTagButtonClick.bind(this), {once: true});
      });

      this.container.querySelectorAll(selectors$k.filterTagClearButton).forEach((button) => {
        button.addEventListener('click', this.onFilterTagClearClick, {once: true});
      });

      this.container.querySelectorAll(selectors$k.filterResetButton).forEach((button) => {
        button.addEventListener('click', this.onFilterTagResetClick, {once: true});
      });
    }

    /*
     * Bind input Sort by change event for "filters by tag/group" only
     */
    bindSortChangeEvent() {
      this.container.querySelectorAll(selectors$k.inputSort).forEach((input) => {
        input.addEventListener('input', this.debouncedSortEvent.bind(this));
      });
    }

    /*
     * Filter by tag buttons click event
     */
    onFilterTagButtonClick(e) {
      e.preventDefault();
      const button = e.currentTarget;
      const selectedTag = button.dataset.tag;
      let isTagSelected = button.parentNode.classList.contains(classes$h.isActive);

      if (isTagSelected) {
        let tagIndex = this.tags.indexOf(selectedTag);

        button.parentNode.classList.remove(classes$h.isActive);

        if (tagIndex > -1) {
          this.tags.splice(tagIndex, 1);
        }
      } else {
        button.parentNode.classList.add(classes$h.isActive);

        this.tags.push(selectedTag);
      }

      let url = this.collectionHandle + '/' + this.tags.join('+') + '?sort_by=' + this.getSortValue();

      // Close filters dropdown on tag select
      this.container.querySelector(selectors$k.filter).classList.remove(classes$h.isExpanded);
      this.container.querySelector(selectors$k.filter).setAttribute('aria-expanded', false);
      this.container.setAttribute('data-tags', '[' + this.tags + ']');
      this.renderTagFiltersProducts(url);
    }

    /*
     * Remove a specific tag filter
     */
    onFilterTagClearClick(e) {
      e.preventDefault();
      const button = e.currentTarget;
      const selectedTag = button.dataset.tag;
      const tagIndex = this.tags.indexOf(selectedTag);

      if (tagIndex > -1) {
        this.tags.splice(tagIndex, 1);
      }
      const url = this.collectionHandle + '/' + this.tags.join('+') + '?sort_by=' + this.getSortValue();

      this.container.setAttribute('data-tags', '[' + this.tags + ']');
      this.renderTagFiltersProducts(url);
    }

    /*
     * Re-render products with the new sort option selected
     */
    onSortChange() {
      let url = this.collectionHandle + '/' + this.tags.join('+') + '?sort_by=' + this.getSortValue();

      this.renderTagFiltersProducts(url);
    }

    /*
     * Get the selected sort option value
     */
    getSortValue() {
      let sortValue = '';
      this.inputSort.forEach((input) => {
        if (input.checked) {
          sortValue = input.value;
        }
      });

      return sortValue;
    }

    /*
     * Filter by tag reset button click event
     */
    onFilterTagResetClick(e) {
      e.preventDefault();

      this.container.querySelectorAll(selectors$k.filterTag).forEach((element) => {
        element.classList.remove(classes$h.isActive);
      });

      this.container.querySelectorAll(selectors$k.filter).forEach((element) => {
        element.classList.remove(classes$h.isExpanded);
        element.setAttribute('aria-expanded', false);
      });

      // Reset saved tags
      this.tags = [];
      this.container.setAttribute('data-tags', '');

      let url = this.collectionHandle + '/?sort_by=' + this.getSortValue();

      this.renderTagFiltersProducts(url);
    }

    /*
     * Get products container top position
     */
    getProductsOffsetTop() {
      return this.productGrid.getBoundingClientRect().top - document.body.getBoundingClientRect().top - this.filtersStickyBar.offsetHeight;
    }

    /*
     * Get collection page sticky bar top position
     */
    getStickyBarOffsetTop() {
      return this.filtersStickyBar.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
    }

    /*
     * Init all the events required on product grid items
     */
    initProductGridEvents() {
      this.productGridEvents = new ProductGrid(this.container);

      if (theme.settings.enableInfinityScroll) {
        this.initInfinityScroll();
      }

      // Stop loading animation
      setTimeout(() => {
        this.finishLoading();
      }, settings$5.loadingTimeout * 1.5);
    }

    /*
     * Init Infinity scroll functionality
     */
    initInfinityScroll() {
      this.endlessCollection = new Ajaxify(this.container);
      this.endlessCollection.endlessScroll.settings.callback = () => {
        this.initProductGridEvents();
      };
    }

    /*
     * Show loading animation and lock body scroll
     */
    startLoading() {
      this.container.classList.add(classes$h.isLoading);
      this.hideFilters();

      document.dispatchEvent(new CustomEvent('theme:scroll:lock', {bubbles: true}));

      let productsTop = this.getProductsOffsetTop();

      window.scrollTo({
        top: productsTop,
        left: 0,
        behavior: 'smooth',
      });
    }

    /*
     * Hide loading animation and unlock body scroll
     */
    finishLoading() {
      const popups = document.querySelectorAll(`${selectors$k.popupsSection} .${classes$h.popupIsVisible}`);
      const isPopupActive = popups.length > 0;

      this.container.classList.remove(classes$h.isLoading);

      // Unlock the scroll unless there is a visible popup or there are only popups of types 'bar' and 'cookie'
      if (isPopupActive) {
        let preventScrollPopupsCount = 0;
        [...popups].forEach((popup) => {
          if (popup.hasAttribute(attributes$d.preventScrollLock)) {
            preventScrollPopupsCount += 1;
          }
        });

        if (preventScrollPopupsCount === popups.length) {
          document.dispatchEvent(new CustomEvent('theme:scroll:unlock', {bubbles: true, detail: settings$5.loadingTimeout}));
        }
      } else {
        document.dispatchEvent(new CustomEvent('theme:scroll:unlock', {bubbles: true, detail: settings$5.loadingTimeout}));
      }

      AOS.refreshHard();
    }

    /*
     * On block:deselect event
     */
    onDeselect() {
      if (this.productGridEvents) {
        this.productGridEvents.onDeselect();
      }
    }

    /*
     * On section:unload event
     */
    onUnload() {
      if (typeof this.endlessCollection === 'object') {
        this.endlessCollection.unload();
      }

      if (this.productGridEvents) {
        this.productGridEvents.onUnload();
      }

      this.collapsible.onUnload();

      if (this.rangeSlider) {
        this.rangeSlider.unload();
      }

      document.removeEventListener('theme:resize:width', this.resizeEvent);
    }
  }

  const filters = {
    onLoad() {
      sections$4[this.id] = new Filters(this.container);
    },
    onDeselect() {
      sections$4[this.id].onDeselect();
    },
    onUnload() {
      sections$4[this.id].onUnload();
    },
  };

  window.Shopify = window.Shopify || {};
  window.Shopify.theme = window.Shopify.theme || {};
  window.Shopify.theme.sections = window.Shopify.theme.sections || {};

  window.Shopify.theme.sections.registered = window.Shopify.theme.sections.registered || {};
  window.Shopify.theme.sections.instances = window.Shopify.theme.sections.instances || [];
  const registered = window.Shopify.theme.sections.registered;
  const instances = window.Shopify.theme.sections.instances;

  const attributes$e = {
    id: 'data-section-id',
    type: 'data-section-type',
  };

  class Registration {
    constructor(type = null, components = []) {
      this.type = type;
      this.components = validateComponentsArray(components);
      this.callStack = {
        onLoad: [],
        onUnload: [],
        onSelect: [],
        onDeselect: [],
        onBlockSelect: [],
        onBlockDeselect: [],
        onReorder: [],
      };
      components.forEach((comp) => {
        for (const [key, value] of Object.entries(comp)) {
          const arr = this.callStack[key];
          if (Array.isArray(arr) && typeof value === 'function') {
            arr.push(value);
          } else {
            console.warn(`Unregisted function: '${key}' in component: '${this.type}'`);
            console.warn(value);
          }
        }
      });
    }

    getStack() {
      return this.callStack;
    }
  }

  class Section {
    constructor(container, registration) {
      this.container = validateContainerElement(container);
      this.id = container.getAttribute(attributes$e.id);
      this.type = registration.type;
      this.callStack = registration.getStack();

      try {
        this.onLoad();
      } catch (e) {
        console.warn(`Error in section: ${this.id}`);
        console.warn(this);
        console.warn(e);
      }
    }

    callFunctions(key, e = null) {
      this.callStack[key].forEach((func) => {
        const props = {
          id: this.id,
          type: this.type,
          container: this.container,
        };
        if (e) {
          func.call(props, e);
        } else {
          func.call(props);
        }
      });
    }

    onLoad() {
      this.callFunctions('onLoad');
    }

    onUnload() {
      this.callFunctions('onUnload');
    }

    onSelect(e) {
      this.callFunctions('onSelect', e);
    }

    onDeselect(e) {
      this.callFunctions('onDeselect', e);
    }

    onBlockSelect(e) {
      this.callFunctions('onBlockSelect', e);
    }

    onBlockDeselect(e) {
      this.callFunctions('onBlockDeselect', e);
    }

    onReorder(e) {
      this.callFunctions('onReorder', e);
    }
  }

  function validateContainerElement(container) {
    if (!(container instanceof Element)) {
      throw new TypeError('Theme Sections: Attempted to load section. The section container provided is not a DOM element.');
    }
    if (container.getAttribute(attributes$e.id) === null) {
      throw new Error('Theme Sections: The section container provided does not have an id assigned to the ' + attributes$e.id + ' attribute.');
    }

    return container;
  }

  function validateComponentsArray(value) {
    if ((typeof value !== 'undefined' && typeof value !== 'object') || value === null) {
      throw new TypeError('Theme Sections: The components object provided is not a valid');
    }

    return value;
  }

  /*
   * @shopify/theme-sections
   * -----------------------------------------------------------------------------
   *
   * A framework to provide structure to your Shopify sections and a load and unload
   * lifecycle. The lifecycle is automatically connected to theme editor events so
   * that your sections load and unload as the editor changes the content and
   * settings of your sections.
   */

  function register(type, components) {
    if (typeof type !== 'string') {
      throw new TypeError('Theme Sections: The first argument for .register must be a string that specifies the type of the section being registered');
    }

    if (typeof registered[type] !== 'undefined') {
      throw new Error('Theme Sections: A section of type "' + type + '" has already been registered. You cannot register the same section type twice');
    }

    if (!Array.isArray(components)) {
      components = [components];
    }

    const section = new Registration(type, components);
    registered[type] = section;

    return registered;
  }

  function load(types, containers) {
    types = normalizeType(types);

    if (typeof containers === 'undefined') {
      containers = document.querySelectorAll('[' + attributes$e.type + ']');
    }

    containers = normalizeContainers(containers);

    types.forEach(function (type) {
      const registration = registered[type];

      if (typeof registration === 'undefined') {
        return;
      }

      containers = containers.filter(function (container) {
        // Filter from list of containers because container already has an instance loaded
        if (isInstance(container)) {
          return false;
        }

        // Filter from list of containers because container doesn't have data-section-type attribute
        if (container.getAttribute(attributes$e.type) === null) {
          return false;
        }

        // Keep in list of containers because current type doesn't match
        if (container.getAttribute(attributes$e.type) !== type) {
          return true;
        }

        instances.push(new Section(container, registration));

        // Filter from list of containers because container now has an instance loaded
        return false;
      });
    });
  }

  function reorder(selector) {
    var instancesToReorder = getInstances(selector);

    instancesToReorder.forEach(function (instance) {
      instance.onReorder();
    });
  }

  function unload(selector) {
    var instancesToUnload = getInstances(selector);

    instancesToUnload.forEach(function (instance) {
      var index = instances
        .map(function (e) {
          return e.id;
        })
        .indexOf(instance.id);
      instances.splice(index, 1);
      instance.onUnload();
    });
  }

  function getInstances(selector) {
    var filteredInstances = [];

    // Fetch first element if its an array
    if (NodeList.prototype.isPrototypeOf(selector) || Array.isArray(selector)) {
      var firstElement = selector[0];
    }

    // If selector element is DOM element
    if (selector instanceof Element || firstElement instanceof Element) {
      var containers = normalizeContainers(selector);

      containers.forEach(function (container) {
        filteredInstances = filteredInstances.concat(
          instances.filter(function (instance) {
            return instance.container === container;
          })
        );
      });

      // If select is type string
    } else if (typeof selector === 'string' || typeof firstElement === 'string') {
      var types = normalizeType(selector);

      types.forEach(function (type) {
        filteredInstances = filteredInstances.concat(
          instances.filter(function (instance) {
            return instance.type === type;
          })
        );
      });
    }

    return filteredInstances;
  }

  function getInstanceById(id) {
    var instance;

    for (var i = 0; i < instances.length; i++) {
      if (instances[i].id === id) {
        instance = instances[i];
        break;
      }
    }
    return instance;
  }

  function isInstance(selector) {
    return getInstances(selector).length > 0;
  }

  function normalizeType(types) {
    // If '*' then fetch all registered section types
    if (types === '*') {
      types = Object.keys(registered);

      // If a single section type string is passed, put it in an array
    } else if (typeof types === 'string') {
      types = [types];

      // If single section constructor is passed, transform to array with section
      // type string
    } else if (types.constructor === Section) {
      types = [types.prototype.type];

      // If array of typed section constructors is passed, transform the array to
      // type strings
    } else if (Array.isArray(types) && types[0].constructor === Section) {
      types = types.map(function (Section) {
        return Section.type;
      });
    }

    types = types.map(function (type) {
      return type.toLowerCase();
    });

    return types;
  }

  function normalizeContainers(containers) {
    // Nodelist with entries
    if (NodeList.prototype.isPrototypeOf(containers) && containers.length > 0) {
      containers = Array.prototype.slice.call(containers);

      // Empty Nodelist
    } else if (NodeList.prototype.isPrototypeOf(containers) && containers.length === 0) {
      containers = [];

      // Handle null (document.querySelector() returns null with no match)
    } else if (containers === null) {
      containers = [];

      // Single DOM element
    } else if (!Array.isArray(containers) && containers instanceof Element) {
      containers = [containers];
    }

    return containers;
  }

  if (window.Shopify.designMode) {
    document.addEventListener('shopify:section:load', function (event) {
      var id = event.detail.sectionId;
      var container = event.target.querySelector('[' + attributes$e.id + '="' + id + '"]');

      if (container !== null) {
        load(container.getAttribute(attributes$e.type), container);
      }
    });

    document.addEventListener('shopify:section:reorder', function (event) {
      var id = event.detail.sectionId;
      var container = event.target.querySelector('[' + attributes$e.id + '="' + id + '"]');
      var instance = getInstances(container)[0];

      if (typeof instance === 'object') {
        reorder(container);
      }
    });

    document.addEventListener('shopify:section:unload', function (event) {
      var id = event.detail.sectionId;
      var container = event.target.querySelector('[' + attributes$e.id + '="' + id + '"]');
      var instance = getInstances(container)[0];

      if (typeof instance === 'object') {
        unload(container);
      }
    });

    document.addEventListener('shopify:section:select', function (event) {
      var instance = getInstanceById(event.detail.sectionId);

      if (typeof instance === 'object') {
        instance.onSelect(event);
      }
    });

    document.addEventListener('shopify:section:deselect', function (event) {
      var instance = getInstanceById(event.detail.sectionId);

      if (typeof instance === 'object') {
        instance.onDeselect(event);
      }
    });

    document.addEventListener('shopify:block:select', function (event) {
      var instance = getInstanceById(event.detail.sectionId);

      if (typeof instance === 'object') {
        instance.onBlockSelect(event);
      }
    });

    document.addEventListener('shopify:block:deselect', function (event) {
      var instance = getInstanceById(event.detail.sectionId);

      if (typeof instance === 'object') {
        instance.onBlockDeselect(event);
      }
    });
  }

  register('collection-template', filters);

  const selectors$l = {
    templateAddresses: '.template-customers-addresses',
    accountForm: '[data-form]',
    addressNewForm: '[data-form-new]',
    btnNew: '[data-button-new]',
    btnEdit: '[data-button-edit]',
    btnDelete: '[data-button-delete]',
    btnCancel: '[data-button-cancel]',
    editAddress: 'data-form-edit',
    addressCountryNew: 'AddressCountryNew',
    addressProvinceNew: 'AddressProvinceNew',
    addressProvinceContainerNew: 'AddressProvinceContainerNew',
    addressCountryOption: '[data-country-option]',
    addressCountry: 'AddressCountry',
    addressProvince: 'AddressProvince',
    addressProvinceContainer: 'AddressProvinceContainer',
    requiredInputs: 'input[type="text"]:not(.optional)',
  };

  const attributes$f = {
    dataFormId: 'data-form-id',
  };

  const classes$i = {
    hidden: 'is-hidden',
    validation: 'validation--showup',
  };

  class Addresses {
    constructor(section) {
      this.section = section;
      this.addressNewForm = this.section.querySelector(selectors$l.addressNewForm);
      this.accountForms = this.section.querySelectorAll(selectors$l.accountForm);

      this.init();
      this.validate();
    }

    init() {
      if (this.addressNewForm) {
        const section = this.section;
        const newAddressForm = this.addressNewForm;
        this.customerAddresses();

        const newButtons = section.querySelectorAll(selectors$l.btnNew);
        if (newButtons.length) {
          newButtons.forEach((button) => {
            button.addEventListener('click', function (e) {
              e.preventDefault();
              button.classList.add(classes$i.hidden);
              newAddressForm.classList.remove(classes$i.hidden);
            });
          });
        }

        const editButtons = section.querySelectorAll(selectors$l.btnEdit);
        if (editButtons.length) {
          editButtons.forEach((button) => {
            button.addEventListener('click', function (e) {
              e.preventDefault();
              const formId = this.getAttribute(attributes$f.dataFormId);
              section.querySelector(`[${selectors$l.editAddress}="${formId}"]`).classList.toggle(classes$i.hidden);
            });
          });
        }

        const deleteButtons = section.querySelectorAll(selectors$l.btnDelete);
        if (deleteButtons.length) {
          deleteButtons.forEach((button) => {
            button.addEventListener('click', function (e) {
              e.preventDefault();
              const formId = this.getAttribute(attributes$f.dataFormId);
              if (confirm(theme.strings.delete_confirm)) {
                Shopify.postLink('/account/addresses/' + formId, {parameters: {_method: 'delete'}});
              }
            });
          });
        }

        const cancelButtons = section.querySelectorAll(selectors$l.btnCancel);
        if (cancelButtons.length) {
          cancelButtons.forEach((button) => {
            button.addEventListener('click', function (e) {
              e.preventDefault();
              this.closest(selectors$l.accountForm).classList.add(classes$i.hidden);
              document.querySelector(selectors$l.btnNew).classList.remove(classes$i.hidden);
            });
          });
        }
      }
    }

    customerAddresses() {
      // Initialize observers on address selectors, defined in shopify_common.js
      if (Shopify.CountryProvinceSelector) {
        new Shopify.CountryProvinceSelector(selectors$l.addressCountryNew, selectors$l.addressProvinceNew, {
          hideElement: selectors$l.addressProvinceContainerNew,
        });
      }

      // Initialize each edit form's country/province selector
      const countryOptions = this.section.querySelectorAll(selectors$l.addressCountryOption);
      countryOptions.forEach((element) => {
        const formId = element.getAttribute(attributes$f.dataFormId);
        const countrySelector = `${selectors$l.addressCountry}_${formId}`;
        const provinceSelector = `${selectors$l.addressProvince}_${formId}`;
        const containerSelector = `${selectors$l.addressProvinceContainer}_${formId}`;

        new Shopify.CountryProvinceSelector(countrySelector, provinceSelector, {
          hideElement: containerSelector,
        });
      });
    }

    validate() {
      this.accountForms.forEach((accountForm) => {
        const form = accountForm.querySelector('form');
        const inputs = form.querySelectorAll(selectors$l.requiredInputs);

        form.addEventListener('submit', (event) => {
          let isEmpty = false;

          // Display notification if input is empty
          inputs.forEach((input) => {
            if (!input.value) {
              input.nextElementSibling.classList.add(classes$i.validation);
              isEmpty = true;
            } else {
              input.nextElementSibling.classList.remove(classes$i.validation);
            }
          });

          if (isEmpty) {
            event.preventDefault();
          }
        });
      });
    }
  }

  const template = document.querySelector(selectors$l.templateAddresses);
  if (template) {
    new Addresses(template);
  }

  const selectors$m = {
    form: '[data-account-form]',
    showReset: '[data-show-reset]',
    hideReset: '[data-hide-reset]',
    recover: '[data-recover-password]',
    login: '[data-login-form]',
    recoverSuccess: '[data-recover-success]',
    recoverSuccessText: '[data-recover-success-text]',
    recoverHash: '#recover',
  };

  const classes$j = {
    hidden: 'is-hidden',
  };

  class Login {
    constructor(form) {
      this.form = form;
      this.showButton = form.querySelector(selectors$m.showReset);
      this.hideButton = form.querySelector(selectors$m.hideReset);
      this.recover = form.querySelector(selectors$m.recover);
      this.login = form.querySelector(selectors$m.login);
      this.success = form.querySelector(selectors$m.recoverSuccess);
      this.successText = form.querySelector(selectors$m.recoverSuccessText);
      this.init();
    }

    init() {
      if (window.location.hash == selectors$m.recoverHash) {
        this.showRecoverPasswordForm();
      } else {
        this.hideRecoverPasswordForm();
      }

      if (this.success) {
        this.successText.classList.remove(classes$j.hidden);
      }

      this.showButton.addEventListener(
        'click',
        (e) => {
          e.preventDefault();
          this.showRecoverPasswordForm();
        },
        false
      );
      this.hideButton.addEventListener(
        'click',
        (e) => {
          e.preventDefault();
          this.hideRecoverPasswordForm();
        },
        false
      );
    }

    showRecoverPasswordForm() {
      this.recover.classList.remove(classes$j.hidden);
      this.login.classList.add(classes$j.hidden);
      window.location.hash = selectors$m.recoverHash;
      return false;
    }

    hideRecoverPasswordForm() {
      this.login.classList.remove(classes$j.hidden);
      this.recover.classList.add(classes$j.hidden);
      window.location.hash = '';
      return false;
    }
  }

  const loginForm = document.querySelector(selectors$m.form);
  if (loginForm) {
    new Login(loginForm);
  }

  register('search-template', filters);

  const selectors$n = {
    frame: '[data-ticker-frame]',
    scale: '[data-ticker-scale]',
    text: '[data-ticker-text]',
    clone: 'data-clone',
  };

  const attributes$g = {
    speed: 'data-marquee-speed',
  };

  const classes$k = {
    animationClass: 'ticker--animated',
    unloadedClass: 'ticker--unloaded',
    comparitorClass: 'ticker__comparitor',
  };

  const settings$6 = {
    moveTime: 1.63, // 100px going to move for 1.63s
    space: 100, // 100px
  };

  class Ticker {
    constructor(el, stopClone = false) {
      this.frame = el;
      this.stopClone = stopClone;
      this.scale = this.frame.querySelector(selectors$n.scale);
      this.text = this.frame.querySelector(selectors$n.text);

      this.comparitor = this.text.cloneNode(true);
      this.comparitor.classList.add(classes$k.comparitorClass);
      this.frame.appendChild(this.comparitor);
      this.scale.classList.remove(classes$k.unloadedClass);
      this.resizeEvent = debounce(() => this.checkWidth(), 100);
      this.listen();
    }

    listen() {
      document.addEventListener('theme:resize:width', this.resizeEvent);
      this.checkWidth();
    }

    checkWidth() {
      const padding = window.getComputedStyle(this.frame).paddingLeft.replace('px', '') * 2;

      if (this.frame.clientWidth - padding < this.comparitor.clientWidth || this.stopClone) {
        this.text.classList.add(classes$k.animationClass);
        if (this.scale.childElementCount === 1) {
          this.clone = this.text.cloneNode(true);
          this.clone.setAttribute(selectors$n.clone, '');
          this.scale.appendChild(this.clone);

          if (this.stopClone) {
            for (let index = 0; index < 10; index++) {
              const cloneSecond = this.text.cloneNode(true);
              cloneSecond.setAttribute(selectors$n.clone, '');
              this.scale.appendChild(cloneSecond);
            }
          }

          let frameSpeed = this.frame.getAttribute(attributes$g.speed);
          if (frameSpeed === null) {
            frameSpeed = 100;
          }
          const speed = settings$6.moveTime * (100 / parseInt(frameSpeed, 10));
          const animationTimeFrame = (this.text.clientWidth / settings$6.space) * speed;

          this.scale.style.setProperty('--animation-time', `${animationTimeFrame}s`);
        }
      } else {
        this.text.classList.add(classes$k.animationClass);
        let clone = this.scale.querySelector(`[${selectors$n.clone}]`);
        if (clone) {
          this.scale.removeChild(clone);
        }
        this.text.classList.remove(classes$k.animationClass);
      }
    }

    unload() {
      document.removeEventListener('theme:resize:width', this.resizeEvent);
    }
  }

  const selectors$o = {
    bar: '[data-bar]',
    barSlide: '[data-slide]',
    frame: '[data-ticker-frame]',
    slider: '[data-slider]',
    tickerScale: '[data-ticker-scale]',
    tickerText: '[data-ticker-text]',
  };

  const attributes$h = {
    slide: 'data-slide',
    speed: 'data-slider-speed',
    stop: 'data-stop',
    style: 'style',
    dataTargetReferrer: 'data-target-referrer',
  };

  const classes$l = {
    desktop: 'desktop',
    mobile: 'mobile',
    tickerAnimated: 'ticker--animated',
  };

  const sections$5 = {};

  class AnnouncementBar {
    constructor(container) {
      this.barHolder = container;
      this.locationPath = location.href;
      this.slides = this.barHolder.querySelectorAll(selectors$o.barSlide);
      this.slider = this.barHolder.querySelector(selectors$o.slider);
      this.flkty = null;

      this.init();
    }

    init() {
      this.removeAnnouncement();

      if (this.slider) {
        this.initSlider();
        document.addEventListener('theme:resize:width', this.initSlider.bind(this));
      }

      if (!this.slider) {
        this.initTickers(true);
      }
    }

    /**
     * Delete announcement which has a target referrer attribute and it is not contained in page URL
     */
    removeAnnouncement() {
      for (let i = 0; i < this.slides.length; i++) {
        const element = this.slides[i];

        if (!element.hasAttribute(attributes$h.dataTargetReferrer)) {
          continue;
        }

        if (this.locationPath.indexOf(element.getAttribute(attributes$h.dataTargetReferrer)) === -1 && !window.Shopify.designMode) {
          element.parentNode.removeChild(element);
        }
      }
    }

    /**
     * Init slider
     */
    initSlider() {
      const slides = this.slider.querySelectorAll(selectors$o.barSlide);

      if (slides) {
        let slideSelector = `${selectors$o.barSlide}`;

        if (window.innerWidth < theme.sizes.small) {
          slideSelector = `${selectors$o.barSlide}:not(.${classes$l.desktop})`;
        } else {
          slideSelector = `${selectors$o.barSlide}:not(.${classes$l.mobile})`;
        }

        if (this.flkty != null) {
          this.flkty.destroy();
        }

        this.flkty = new Flickity(this.slider, {
          cellSelector: slideSelector,
          pageDots: false,
          prevNextButtons: false,
          wrapAround: true,
          autoPlay: parseInt(this.slider.getAttribute(attributes$h.speed), 10),
          on: {
            ready: () => {
              setTimeout(() => {
                this.slider.dispatchEvent(
                  new CustomEvent('slider-is-loaded', {
                    bubbles: true,
                    detail: {
                      slider: this,
                    },
                  })
                );
              }, 10);
            },
          },
        });
        this.flkty.reposition();
      }

      this.slider.addEventListener('slider-is-loaded', () => {
        this.initTickers();
      });
    }

    /**
     * Init tickers in sliders
     */
    initTickers(stopClone = false) {
      const frames = this.barHolder.querySelectorAll(selectors$o.frame);

      frames.forEach((element) => {
        new Ticker(element, stopClone);

        const slides = element.querySelectorAll(selectors$o.barSlide);
        if (slides.length !== 0) {
          const slidesMobile = element.querySelectorAll(`${selectors$o.barSlide}.${classes$l.mobile}`);
          const slidesDesktop = element.querySelectorAll(`${selectors$o.barSlide}.${classes$l.desktop}`);

          if (slides.length === slidesMobile.length) {
            element.parentNode.classList.add(classes$l.mobile);
          } else if (slides.length === slidesDesktop.length) {
            element.parentNode.classList.add(classes$l.desktop);
          }
        }
      });
    }

    toggleTicker(e, isStoped) {
      const tickerScale = e.target.closest(selectors$o.tickerScale);
      const element = document.querySelector(`[${attributes$h.slide}="${e.detail.blockId}"]`);

      if (isStoped && element) {
        tickerScale.setAttribute(attributes$h.stop, '');
        tickerScale.querySelectorAll(selectors$o.tickerText).forEach((textHolder) => {
          textHolder.classList.remove(classes$l.tickerAnimated);
          textHolder.style.transform = `translate3d(${-(element.offsetLeft - parseInt(getComputedStyle(element).marginLeft, 10))}px, 0, 0)`;
        });
      }

      if (!isStoped && element) {
        tickerScale.querySelectorAll(selectors$o.tickerText).forEach((textHolder) => {
          textHolder.classList.add(classes$l.tickerAnimated);
          textHolder.removeAttribute(attributes$h.style);
        });
        tickerScale.removeAttribute(attributes$h.stop);
      }
    }

    onBlockSelect(evt) {
      const index = parseInt([...evt.target.parentNode.children].indexOf(evt.target));

      if (this.slider && this.flkty !== null) {
        this.flkty.select(index);
        this.flkty.pausePlayer();
      }
      if (!this.slider) {
        this.toggleTicker(evt, true);
      }
    }

    onBlockDeselect(evt) {
      if (this.slider && this.flkty !== null) {
        this.flkty.unpausePlayer();
      }
      if (!this.slider) {
        this.toggleTicker(evt, false);
      }
    }

    onUnload() {
      document.removeEventListener('theme:resize:width', this.initSlider.bind(this));
    }
  }

  const bar = {
    onLoad() {
      sections$5[this.id] = [];
      const element = this.container.querySelector(selectors$o.bar);
      if (element) {
        sections$5[this.id].push(new AnnouncementBar(element));
      }
    },
    onBlockSelect(e) {
      if (sections$5[this.id].length) {
        sections$5[this.id].forEach((el) => {
          if (typeof el.onBlockSelect === 'function') {
            el.onBlockSelect(e);
          }
        });
      }
    },
    onBlockDeselect(e) {
      if (sections$5[this.id].length) {
        sections$5[this.id].forEach((el) => {
          if (typeof el.onBlockSelect === 'function') {
            el.onBlockDeselect(e);
          }
        });
      }
    },
  };

  register('announcement-bar', bar);
  register('marquee', bar);

  const selectors$p = {
    trigger: '[data-collapsible-trigger]',
  };

  const classes$m = {
    isExpanded: 'is-expanded',
  };

  const accordionSection = {
    onBlockSelect(e) {
      const trigger = e.target.querySelector(selectors$p.trigger);
      if (!trigger.classList.contains(classes$m.isExpanded)) {
        trigger.dispatchEvent(new Event('click'));
      }
    },
  };

  register('accordions', [accordionSection, collapsible]);

  const selectors$q = {
    button: '[data-share-button]',
    tooltip: '[data-share-button-tooltip]',
  };

  const classes$n = {
    visible: 'is-visible',
    hiding: 'is-hiding',
  };

  const sections$6 = {};

  class ShareButton {
    constructor(container) {
      this.container = container;
      this.button = this.container.querySelector(selectors$q.button);
      this.tooltip = this.container.querySelector(selectors$q.tooltip);
      this.transitionSpeed = 200;
      this.hideTransitionTimeout = 0;
      this.init();
    }

    init() {
      if (this.button) {
        this.button.addEventListener('click', () => {
          let targetUrl = window.location.href;
          if (this.button.dataset.shareLink) {
            targetUrl = this.button.dataset.shareLink;
          }

          if (!this.tooltip.classList.contains(classes$n.visible)) {
            navigator.clipboard.writeText(targetUrl).then(() => {
              this.tooltip.classList.add(classes$n.visible);
              setTimeout(() => {
                this.tooltip.classList.add(classes$n.hiding);
                this.tooltip.classList.remove(classes$n.visible);

                if (this.hideTransitionTimeout) {
                  clearTimeout(this.hideTransitionTimeout);
                }

                this.hideTransitionTimeout = setTimeout(() => {
                  this.tooltip.classList.remove(classes$n.hiding);
                }, this.transitionSpeed);
              }, 1500);
            });
          }
        });
      }
    }
  }

  const shareButton = {
    onLoad() {
      sections$6[this.id] = new ShareButton(this.container);
    },
  };

  register('article', [shareButton]);

  const selectors$r = {
    banner: '[data-banner]',
    slider: '[data-slider]',
    sliderMedia: '[data-banners-media]',
  };

  const attributes$i = {
    index: 'data-index',
  };

  let sections$7 = {};

  class BannerWithTextColumns {
    constructor(section) {
      this.container = section.container;
      this.slider = this.container.querySelector(selectors$r.slider);

      this.banners = this.container.querySelectorAll(selectors$r.banner);
      this.links = this.container.querySelectorAll('a');

      this.slider = this.container.querySelector(selectors$r.slider);
      this.sliderMedia = this.container.querySelector(selectors$r.sliderMedia);
      this.flkty = null;
      this.flktyMedia = null;
      this.sliderResizeEvent = () => this.resizeSlider();

      this.initSliders();

      document.addEventListener('theme:resize:width', this.sliderResizeEvent);
    }

    initSliders() {
      if (this.slider.children.length <= 1) return;

      const isTouch = document.documentElement.classList.contains('supports-touch');
      let isDraggable = window.innerWidth < window.theme.sizes.small;

      this.flktyMedia = new Flickity(this.sliderMedia, {
        draggable: false,
        wrapAround: false,
        fade: true,
        prevNextButtons: false,
        adaptiveHeight: false,
        pageDots: false,
        setGallerySize: false,
      });

      flickitySmoothScrolling(this.sliderMedia);

      this.flkty = new Flickity(this.slider, {
        draggable: isDraggable,
        prevNextButtons: false,
        pageDots: true,
        cellAlign: 'left',
        adaptiveHeight: false,
        imagesLoaded: true,
        lazyLoad: true,
        asNavFor: this.sliderMedia,
        on: {
          ready: () => {
            this.links.forEach(link => {
              link.addEventListener('focus', (e) => {
                const selectedIndex = Number(link.closest(selectors$r.banner).getAttribute(attributes$i.index));
                if (window.innerWidth >= theme.sizes.small && !isTouch) {
                  this.flktyMedia.selectCell(selectedIndex);
                }
              });
            });

            this.banners.forEach(slide => {
              slide.addEventListener('mouseenter', (e) => {
                const selectedIndex = Number(slide.getAttribute(attributes$i.index));
                if (window.innerWidth >= theme.sizes.small && !isTouch) {
                  this.flktyMedia.selectCell(selectedIndex);
                }
              });

              slide.addEventListener('keyup', (e) => {
                if (e.keyCode === slate.utils.keyboardKeys.ENTER || e.keyCode === slate.utils.keyboardKeys.SPACE) {
                  const selectedIndex = Number(slide.getAttribute(attributes$i.index));
                  this.flkty.selectCell(selectedIndex);
                }
              });
            });
          },
          change: (index) => {
            if (window.innerWidth < theme.sizes.small || isTouch) {
              this.flktyMedia.select(index);
            }
          }
        },
      });

      flickitySmoothScrolling(this.slider);
    }

    resizeSlider() {
      if (this.flkty) {
        this.flkty.resize();
        this.toggleDraggable();
      }

      if (this.flktyMedia) {
        this.flktyMedia.resize();
      }
    }

    toggleDraggable() {
      this.flkty.options.draggable = window.innerWidth < window.theme.sizes.small;
      this.flkty.updateDraggable();
    }

    onBlockSelect(evt) {
      const selectedIndex = parseInt([...evt.target.parentNode.children].indexOf(evt.target));
      if (this.flktyMedia) {
        this.flktyMedia.selectCell(selectedIndex);
      }
    }

    onUnload() {
      document.removeEventListener('theme:resize:width', this.sliderResizeEvent);
    }
  }

  const BannerWithTextColumnsSection = {
    onLoad() {
      sections$7[this.id] = new BannerWithTextColumns(this);
    },
    onBlockSelect(e) {
      sections$7[this.id].onBlockSelect(e);
    },
  };

  register('banner-with-text-columns', BannerWithTextColumnsSection);

  register('blog-posts', ajaxify);

  const selectors$s = {
    videoPlay: '[data-video-play]',
  };

  const attributes$j = {
    videoPlayValue: 'data-video-play',
  };

  class VideoPlay {
    constructor(container) {
      this.container = container;
      this.videoPlay = this.container.querySelectorAll(selectors$s.videoPlay);

      this.init();
    }

    init() {
      if (this.videoPlay.length) {
        this.videoPlay.forEach((element) => {
          element.addEventListener('click', (e) => {
            if (element.hasAttribute(attributes$j.videoPlayValue) && element.getAttribute(attributes$j.videoPlayValue).trim() !== '') {
              e.preventDefault();

              const items = [
                {
                  html: element.getAttribute(attributes$j.videoPlayValue),
                },
              ];
              slate.a11y.state.trigger = element;
              new LoadPhotoswipe(items);
            }
          });
        });
      }
    }
  }

  const videoPlay = {
    onLoad() {
      new VideoPlay(this.container);
    },
  };

  const selectors$t = {
    slider: '[data-slider]',
    sliderItem: '[data-slider-item]',
    sliderItemImage: '[data-media-container]',
    flickityButton: '.flickity-button',
  };

  const classes$o = {
    carouselInactive: 'carousel--inactive',
  };

  const sections$8 = {};

  class ColumnsWithImage {
    constructor(section) {
      this.container = section.container;
      this.slider = this.container.querySelector(selectors$t.slider);
      this.flkty = null;
      this.gutter = 0;
      this.checkSlidesSizeOnResize = () => this.checkSlidesSize();
      this.listen();
    }

    initSlider() {
      this.slider.classList.remove(classes$o.carouselInactive);

      this.flkty = new Flickity(this.slider, {
        pageDots: false,
        cellAlign: 'left',
        groupCells: true,
        contain: true,
        on: {
          ready: () => {
            this.setSliderArrowsPosition(this.slider);
          },
        },
      });
    }

    destroySlider() {
      this.slider.classList.add(classes$o.carouselInactive);

      if (this.flkty !== null) {
        this.flkty.destroy();
        this.flkty = null;
      }
    }
    
    checkSlidesSize() {
      const sliderItemStyle = this.container.querySelector(selectors$t.sliderItem).currentStyle || window.getComputedStyle(this.container.querySelector(selectors$t.sliderItem));
      this.gutter = parseInt(sliderItemStyle.marginRight);
      const containerWidth = this.slider.offsetWidth;
      const itemsWidth = this.getItemsWidth();
      const itemsOverflowViewport = containerWidth < itemsWidth;

      if (window.innerWidth >= theme.sizes.small && itemsOverflowViewport) {
        this.initSlider();
      } else {
        this.destroySlider();
      }
    }

    getItemsWidth() {
      let itemsWidth = 0;
      const slides = this.slider.querySelectorAll(selectors$t.sliderItem);
      if (slides.length) {
        slides.forEach((item) => {
          itemsWidth += item.offsetWidth + this.gutter;
        });
      }

      return itemsWidth;
    }

    listen() {
      if (this.slider) {
        this.checkSlidesSize();
        document.addEventListener('theme:resize:width', this.checkSlidesSizeOnResize);
      }
    }

    setSliderArrowsPosition(slider) {
      const arrows = slider.querySelectorAll(selectors$t.flickityButton);
      const image = slider.querySelector(selectors$t.sliderItemImage);

      if (arrows.length && image) {
        arrows.forEach((arrow) => {
          arrow.style.top = `${image.offsetHeight / 2}px`;
        });
      }
    }

    onBlockSelect(evt) {
      if (this.flkty !== null) {
        const index = parseInt([...evt.target.parentNode.children].indexOf(evt.target));
        const slidesPerPage = parseInt(this.flkty.slides[0].cells.length);
        const groupIndex = Math.floor(index / slidesPerPage);

        this.flkty.select(groupIndex);
      } else {
        const sliderStyle = this.slider.currentStyle || window.getComputedStyle(this.slider);
        const sliderPadding = parseInt(sliderStyle.paddingLeft);
        const blockPositionLeft = evt.target.offsetLeft - sliderPadding;

        // Native scroll to item
        this.slider.scrollTo({
          top: 0,
          left: blockPositionLeft,
          behavior: 'smooth',
        });
      }
    }

    onUnload() {
      document.removeEventListener('theme:resize:width', this.checkSlidesSizeOnResize);
    }
  }

  const ColumnsWithImageSection = {
    onLoad() {
      sections$8[this.id] = new ColumnsWithImage(this);
    },
    onUnload(e) {
      sections$8[this.id].onUnload(e);
    },
    onBlockSelect(e) {
      sections$8[this.id].onBlockSelect(e);
    },
  };

  register('columns-with-image', [ColumnsWithImageSection, videoPlay]);

  const selectors$u = {
    formMessageClose: '[data-form-message-close]',
    formMessageWrapper: '[data-form-message]',
  };

  const classes$p = {
    hideDown: 'hide-down',
    notificationVisible: 'notification-visible',
  };

  let sections$9 = {};

  class ContactForm {
    constructor(section) {
      this.container = section.container;
      this.closeButton = this.container.querySelector(selectors$u.formMessageClose);
      this.messageWrapper = this.container.querySelector(selectors$u.formMessageWrapper);

      if (this.messageWrapper) {
        this.hidePopups();
        this.closeFormMessage();
        this.autoHideMessage();
      }
    }

    hidePopups() {
      document.body.classList.add(classes$p.notificationVisible);
    }

    showPopups() {
      document.body.classList.remove(classes$p.notificationVisible);
    }

    closeFormMessage() {
      this.closeButton.addEventListener('click', this.closeMessage.bind(this));
    }

    closeMessage(e) {
      e.preventDefault();
      this.messageWrapper.classList.add(classes$p.hideDown);
      this.showPopups();
    }

    autoHideMessage() {
      setTimeout(() => {
        this.messageWrapper.classList.add(classes$p.hideDown);
        this.showPopups();
      }, 10000);
    }
  }

  const contactFormSection = {
    onLoad() {
      sections$9[this.id] = new ContactForm(this);
    },
  };

  register('contact-form', contactFormSection);

  const selectors$v = {
    product: '[data-product]',
    productSlider: '[data-slider]',
    productSlide: '[data-slide]',
    productGridItemImage: '[data-product-media-container]',
    flickityButton: '.flickity-button',
    item: '[data-slide]',
    links: 'a, button',
  };

  const attributes$k = {
    tabIndex: 'tabindex',
  };

  const sections$a = {};

  class CustomContent {
    constructor(container) {
      this.container = container;
      this.product = this.container.querySelectorAll(selectors$v.product);
      this.productSlider = this.container.querySelectorAll(selectors$v.productSlider);
      this.checkSliderOnResize = () => this.checkSlider();
      this.flkty = [];
      this.videoObj = [];
      this.quickViewObj = [];

      this.listen();
    }

    checkSlider() {
      if (window.innerWidth >= theme.sizes.small) {
        this.productSlider.forEach((slider) => {
          this.initProductSlider(slider);
        });
      } else {
        this.productSlider.forEach((slider) => {
          this.destroyProductSlider(slider);
        });
      }
    }

    initProductSlider(slider) {
      const slidesCount = slider.querySelectorAll(selectors$v.productSlide).length;
      const sliderId = slider.dataset.slider;

      if (slidesCount > 1) {
        if (this.flkty[sliderId] === undefined || !this.flkty[sliderId].isActive) {
          this.flkty[sliderId] = new Flickity(slider, {
            prevNextButtons: true,
            pageDots: true,
            wrapAround: true,
            on: {
              ready: () => {
                this.setSliderArrowsPosition(slider);
              },
              change: (index) => {
                this.flkty[sliderId].cells.forEach((slide, i) => {
                  slide.element.querySelectorAll(selectors$v.links).forEach((link) => {
                    link.setAttribute(attributes$k.tabIndex, i === index ? '0' : '-1');
                  });
                });
              },
            },
          });
        } else {
          this.setSliderArrowsPosition(slider);
        }
      }
    }

    destroyProductSlider(slider) {
      const sliderId = slider.dataset.slider;

      if (typeof this.flkty[sliderId] === 'object') {
        this.flkty[sliderId].destroy();
      }
    }

    setSliderArrowsPosition(slider) {
      const arrows = slider.querySelectorAll(selectors$v.flickityButton);
      const image = slider.querySelector(selectors$v.productGridItemImage);

      if (arrows.length && image) {
        arrows.forEach((arrow) => {
          arrow.style.top = `${image.offsetHeight / 2}px`;
        });
      }
    }

    listen() {
      this.checkSlider();
      document.addEventListener('theme:resize:width', this.checkSliderOnResize);
    }

    onUnload() {
      if (this.flkty) {
        for (const key in this.flkty) {
          if (this.flkty.hasOwnProperty(key)) {
            this.flkty[key].destroy();
          }
        }
      }

      document.removeEventListener('theme:resize:width', this.checkSliderOnResize);
    }
  }

  const CustomContentSection = {
    onLoad() {
      sections$a[this.id] = new CustomContent(this.container);
    },
    onUnload(e) {
      sections$a[this.id].onUnload(e);
    },
  };

  register('custom-content', [CustomContentSection, videoPlay, productGrid]);

  const selectors$w = {
    slider: '[data-slider]',
    sliderItem: '[data-slide]',
    productGridItemImage: '[data-product-media-container]',
    flickityButton: '.flickity-button',
  };

  const classes$q = {
    carouselInactive: 'carousel--inactive',
  };

  const attributes$l = {
    sliderId: 'data-slider-id',
    showImage: 'data-slider-show-image',
  };

  const sections$b = {};

  class GridSlider {
    constructor(container) {
      this.container = container;
      this.columns = parseInt(this.container.dataset.columns);
      this.sliders = this.container.querySelectorAll(selectors$w.slider);
      this.checkSlidesSizeOnResize = () => this.checkSlidesSize();
      this.resetSliderEvent = (e) => this.resetSlider(e);
      this.flkty = [];
      this.listen();
    }

    initSlider(slider) {
      const sliderId = slider.getAttribute(attributes$l.sliderId);
      slider.classList.remove(classes$q.carouselInactive);

      if (this.flkty[sliderId] === undefined || !this.flkty[sliderId].isActive) {
        this.flkty[sliderId] = new Flickity(slider, {
          pageDots: false,
          cellSelector: selectors$w.sliderItem,
          cellAlign: 'left',
          groupCells: true,
          contain: true,
          wrapAround: false,
          adaptiveHeight: false,
          on: {
            ready: () => {
              this.setSliderArrowsPosition(slider);
            },
          },
        });
      } else {
        this.setSliderArrowsPosition(slider);
      }
    }

    destroySlider(slider) {
      const sliderId = slider.getAttribute(attributes$l.sliderId);
      slider.classList.add(classes$q.carouselInactive);

      if (typeof this.flkty[sliderId] === 'object') {
        this.flkty[sliderId].destroy();
      }
    }

    // Move slides to their initial position
    resetSlider(e) {
      const slider = e.target;
      const sliderId = slider.getAttribute(attributes$l.sliderId);

      if (typeof this.flkty[sliderId] === 'object') {
        this.flkty[sliderId].select(0, false, true);
      } else {
        slider.scrollTo({
          left: 0,
          behavior: 'instant',
        });
      }
    }

    checkSlidesSize() {
      if (this.sliders.length) {
        this.sliders.forEach((slider) => {
          const columns = this.columns;
          const isDesktop = window.innerWidth >= theme.sizes.large;
          const isTablet = window.innerWidth >= theme.sizes.small && window.innerWidth < theme.sizes.large;
          let itemsCount = slider.querySelectorAll(selectors$w.sliderItem).length;

          // If tab collection has show image enabled
          if (slider.hasAttribute(attributes$l.showImage)) {
            itemsCount += 1;
          }

          if ((isDesktop && itemsCount > columns) || (isTablet && itemsCount > 2)) {
            this.initSlider(slider);
          } else {
            this.destroySlider(slider);
          }
        });
      }
    }

    setSliderArrowsPosition(slider) {
      const arrows = slider.querySelectorAll(selectors$w.flickityButton);
      const image = slider.querySelector(selectors$w.productGridItemImage);

      if (arrows.length && image) {
        arrows.forEach((arrow) => {
          arrow.style.top = `${image.offsetHeight / 2}px`;
        });
      }
    }

    listen() {
      if (this.sliders.length) {
        this.checkSlidesSize();
        document.addEventListener('theme:resize:width', this.checkSlidesSizeOnResize);

        this.sliders.forEach((slider) => {
          slider.addEventListener('theme:tab:change', this.resetSliderEvent);
        });
      }
    }

    /**
     * Event callback for Theme Editor `section:block:select` event
     */
    onBlockSelect(evt) {
      const slider = evt.target.closest(selectors$w.slider);
      const flkty = Flickity.data(slider) || null;

      if (!slider) {
        return;
      }

      if (flkty !== null && flkty.isActive) {
        const index = parseInt([...evt.target.parentNode.children].indexOf(evt.target));
        const slidesPerPage = parseInt(flkty.slides[0].cells.length);
        const groupIndex = Math.floor(index / slidesPerPage);

        flkty.select(groupIndex);
      } else {
        const sliderStyle = slider.currentStyle || window.getComputedStyle(slider);
        const sliderPadding = parseInt(sliderStyle.paddingLeft);
        const blockPositionLeft = evt.target.offsetLeft - sliderPadding;

        // Native scroll to item
        slider.scrollTo({
          top: 0,
          left: blockPositionLeft,
          behavior: 'smooth',
        });
      }
    }

    /**
     * Event callback for Theme Editor `section:unload` event
     */
    onUnload() {
      if (this.flkty) {
        for (const key in this.flkty) {
          if (this.flkty.hasOwnProperty(key)) {
            this.flkty[key].destroy();
          }
        }
      }

      document.removeEventListener('theme:resize:width', this.checkSlidesSizeOnResize);

      if (this.sliders.length) {
        this.sliders.forEach((slider) => {
          slider.removeEventListener('theme:tab:change', this.resetSliderEvent);
        });
      }
    }
  }

  const gridSlider = {
    onLoad() {
      sections$b[this.id] = [];
      const els = this.container.querySelectorAll(selectors$w.slider);
      els.forEach((el) => {
        sections$b[this.id].push(new GridSlider(this.container));
      });
    },
    onUnload() {
      sections$b[this.id].forEach((el) => {
        if (typeof el.onUnload === 'function') {
          el.onUnload();
        }
      });
    },
    onBlockSelect(e) {
      sections$b[this.id].forEach((el) => {
        if (typeof el.onBlockSelect === 'function') {
          el.onBlockSelect(e);
        }
      });
    },
  };

  register('featured-collection', [productGrid, gridSlider]);

  register('featured-video', videoPlay);

  class PopupCookie {
    constructor(name, value) {
      this.configuration = {
        expires: null, // session cookie
        path: '/',
        domain: window.location.hostname,
        sameSite: 'none',
        secure: true,
      };
      this.name = name;
      this.value = value;
    }

    write() {
      const hasCookie = document.cookie.indexOf('; ') !== -1 && !document.cookie.split('; ').find((row) => row.startsWith(this.name));
      if (hasCookie || document.cookie.indexOf('; ') === -1) {
        document.cookie = `${this.name}=${this.value}; expires=${this.configuration.expires}; path=${this.configuration.path}; domain=${this.configuration.domain}; sameSite=${this.configuration.sameSite}; secure=${this.configuration.secure}`;
      }
    }

    read() {
      if (document.cookie.indexOf('; ') !== -1 && document.cookie.split('; ').find((row) => row.startsWith(this.name))) {
        const returnCookie = document.cookie
          .split('; ')
          .find((row) => row.startsWith(this.name))
          .split('=')[1];

        return returnCookie;
      } else {
        return false;
      }
    }

    destroy() {
      if (document.cookie.split('; ').find((row) => row.startsWith(this.name))) {
        document.cookie = `${this.name}=null; expires=${this.configuration.expires}; path=${this.configuration.path}; domain=${this.configuration.domain}; sameSite=${this.configuration.sameSite}; secure=${this.configuration.secure}`;
      }
    }
  }

  const selectors$x = {
    newsletterForm: '[data-newsletter-form]',
    popup: '[data-popup]',
  };

  const classes$r = {
    success: 'has-success',
    error: 'has-error',
  };

  const attributes$m = {
    storageNewsletterFormId: 'newsletter_form_id',
  };

  const sections$c = {};

  class Newsletter {
    constructor(newsletter) {
      this.newsletter = newsletter;
      this.sessionStorage = window.sessionStorage;
      this.popup = this.newsletter.closest(selectors$x.popup);
      this.stopSubmit = true;
      this.isChallengePage = false;
      this.formID = null;
      this.formIdSuccess = null;

      this.checkForChallengePage();

      this.newsletterSubmit = (e) => this.newsletterSubmitEvent(e);

      if (!this.isChallengePage) {
        this.init();
      }
    }

    init() {
      this.newsletter.addEventListener('submit', this.newsletterSubmit);

      this.showMessage();
    }

    newsletterSubmitEvent(e) {
      if (this.stopSubmit) {
        e.preventDefault();

        this.removeStorage();
        this.writeStorage();
        this.stopSubmit = false;
        this.newsletter.submit();
      }
    }

    checkForChallengePage() {
      this.isChallengePage = window.location.pathname === theme.routes.root + 'challenge';
    }

    writeStorage() {
      if (this.sessionStorage !== undefined) {
        this.sessionStorage.setItem(attributes$m.storageNewsletterFormId, this.newsletter.id);
      }
    }

    readStorage() {
      this.formID = this.sessionStorage.getItem(attributes$m.storageNewsletterFormId);
    }

    removeStorage() {
      this.sessionStorage.removeItem(attributes$m.storageNewsletterFormId);
    }

    showMessage() {
      this.readStorage();

      if (this.newsletter.id === this.formID) {
        const newsletter = document.getElementById(this.formID);
        const submissionSuccess = window.location.search.indexOf('?customer_posted=true') !== -1;
        const submissionFailure = window.location.search.indexOf('accepts_marketing') !== -1;

        if (submissionSuccess) {
          newsletter.classList.remove(classes$r.error);
          newsletter.classList.add(classes$r.success);

          if (this.popup) {
            this.cookie = new PopupCookie(this.popup.dataset.cookieName, 'user_has_closed');
            this.cookie.write();
          }
        } else if (submissionFailure) {
          newsletter.classList.remove(classes$r.success);
          newsletter.classList.add(classes$r.error);
        }

        if (submissionSuccess || submissionFailure) {
          this.scrollToForm(newsletter);
        }
      }
    }

    /**
     * Scroll to the last submitted newsletter form
     */
    scrollToForm(newsletter) {
      const rect = newsletter.getBoundingClientRect();
      const isVisible = visibilityHelper.isElementPartiallyVisible(newsletter) || visibilityHelper.isElementTotallyVisible(newsletter);

      if (!isVisible) {
        setTimeout(() => {
          window.scrollTo({
            top: rect.top,
            left: 0,
            behavior: 'smooth',
          });
        }, 400);
      }
    }

    /**
     * Event callback for Theme Editor `section:unload` event
     */
    onUnload() {
      this.newsletter.removeEventListener('submit', this.newsletterSubmit);
    }
  }

  const newsletterSection = {
    onLoad() {
      sections$c[this.id] = [];
      const newsletters = this.container.querySelectorAll(selectors$x.newsletterForm);
      newsletters.forEach((form) => {
        sections$c[this.id].push(new Newsletter(form));
      });
    },
    onUnload() {
      sections$c[this.id].forEach((form) => {
        if (typeof form.onUnload === 'function') {
          form.onUnload();
        }
      });
    },
  };

  const selectors$y = {
    trigger: '[data-collapsible-trigger-mobile]',
  };

  const classes$s = {
    isExpanded: 'is-expanded',
  };

  const footerAccordionSection = {
    onBlockSelect(e) {
      const trigger = e.target.querySelector(selectors$y.trigger);
      if (trigger && !trigger.classList.contains(classes$s.isExpanded)) {
        trigger.dispatchEvent(new Event('click'));
      }
    },
    onBlockDeselect(e) {
      const trigger = e.target.querySelector(selectors$y.trigger);
      if (trigger && trigger.classList.contains(classes$s.isExpanded)) {
        trigger.dispatchEvent(new Event('click'));
      }
    },
  };

  register('footer', [popoutSection, newsletterSection, collapsible, footerAccordionSection]);

  const selectors$z = {
    slider: '[data-slider]',
  };

  let sections$d = {};

  class IconsRow {
    constructor(section) {
      this.container = section.container;
      this.slider = this.container.querySelector(selectors$z.slider);
    }

    onBlockSelect(evt) {
      const sliderStyle = this.slider.currentStyle || window.getComputedStyle(this.slider);
      const sliderPadding = parseInt(sliderStyle.paddingLeft);
      const blockPositionLeft = evt.target.offsetLeft - sliderPadding;

      this.slider.scrollTo({
        top: 0,
        left: blockPositionLeft,
        behavior: 'smooth',
      });
    }
  }

  const iconsRowSection = {
    onLoad() {
      sections$d[this.id] = new IconsRow(this);
    },
    onBlockSelect(e) {
      sections$d[this.id].onBlockSelect(e);
    },
  };

  register('icons-row', iconsRowSection);

  const selectors$A = {
    item: '[data-accordion-item]',
    button: '[data-accordion-button]',
  };

  const classes$t = {
    isExpanded: 'is-expanded',
  };

  const sections$e = {};

  class ImageAccordions {
    constructor(section) {
      this.container = section.container;
      this.imageAccordionsItems = this.container.querySelectorAll(selectors$A.item);
      this.buttons = this.container.querySelectorAll(selectors$A.button);
      this.accordionExpandEvent = (item) => this.accordionExpand(item);
      this.accordionFocusEvent = (item) => this.accordionFocus(item);

      this.init();
    }

    init() {
      this.imageAccordionsItems.forEach((item) => {
        item.addEventListener('mouseenter', this.accordionExpandEvent.bind(this, item));
      });

      this.buttons.forEach((button) => {
        button.addEventListener('focusin', this.accordionFocusEvent.bind(this, button));
      });
    }

    accordionExpand(item) {
      if (!item.classList.contains(classes$t.isExpanded)) {
        this.imageAccordionsItems.forEach((item) => {
          item.classList.remove(classes$t.isExpanded);
        });
        item.classList.add(classes$t.isExpanded);
      }
    }

    accordionFocus(button) {
      button.closest(selectors$A.item).dispatchEvent(new Event('mouseenter'));
    }

    onBlockSelect(evt) {
      const element = evt.target;
      if (element) {
        element.dispatchEvent(new Event('mouseenter'));
      }
    }
  }

  const imageAccordionsSection = {
    onLoad() {
      sections$e[this.id] = new ImageAccordions(this);
    },
    onBlockSelect(evt) {
      sections$e[this.id].onBlockSelect(evt);
    },
  };

  register('image-accordions', imageAccordionsSection);

  register('image-with-text', videoPlay);

  register('list-collections', gridSlider);

  const sections$f = {};

  const selectors$B = {
    slider: '[data-slider-gallery]',
    sliderNav: '[data-slider-info]',
    item: '[data-slide-item]',
  };

  class Locations {
    constructor(section) {
      this.container = section.container;
      this.slider = this.container.querySelector(selectors$B.slider);
      this.sliderNav = this.container.querySelector(selectors$B.sliderNav);

      this.initSlider();
    }

    initSlider() {
      const slidesCount = this.container.querySelectorAll(selectors$B.item).length;
      let flkty = Flickity.data(this.slider) || null;
      let flktyNav = Flickity.data(this.sliderNav) || null;

      if (slidesCount <= 1) {
        return;
      }

      flkty = new Flickity(this.slider, {
        fade: true,
        wrapAround: true,
        adaptiveHeight: true,
        prevNextButtons: false,
        pageDots: false,
      });

      // iOS smooth scrolling fix
      flickitySmoothScrolling(this.slider);

      flktyNav = new Flickity(this.sliderNav, {
        fade: true,
        wrapAround: true,
        imagesLoaded: true,
        lazyLoad: true,
        asNavFor: this.slider,
        prevNextButtons: true,
        pageDots: false,
      });

      // Trigger text change on image move/drag
      flktyNav.on('change', () => {
        flkty.selectCell(flktyNav.selectedIndex);
      });

      // Trigger text change on image move/drag
      flkty.on('change', () => {
        flktyNav.selectCell(flkty.selectedIndex);
      });
    }

    onBlockSelect(evt) {
      const flkty = Flickity.data(this.slider) || null;
      const flktyNav = Flickity.data(this.sliderNav) || null;
      const index = parseInt([...evt.target.parentNode.children].indexOf(evt.target));

      if (flkty !== null) {
        flkty.select(index);
      }
      if (flktyNav !== null) {
        flktyNav.select(index);
      }
    }
  }

  const LocationsSection = {
    onLoad() {
      sections$f[this.id] = new Locations(this);
    },
    onBlockSelect(e) {
      sections$f[this.id].onBlockSelect(e);
    },
  };

  register('locations', LocationsSection);

  const sections$g = {};

  const selectors$C = {
    slider: '[data-slider]',
    sliderItem: '[data-slider-item]',
  };

  class LogoList {
    constructor(section) {
      this.container = section.container;
      this.slider = this.container.querySelector(selectors$C.slider);
      this.sliderResizeEvent = () => this.checkSlides();
      this.flkty = null;
      this.checkSlides();

      document.addEventListener('theme:resize:width', this.sliderResizeEvent);
    }

    checkSlides() {
      const containerWidth = this.container.offsetWidth;
      let slidesTotalWidth = this.getSlidesWidth();

      if (window.innerWidth >= theme.sizes.small && slidesTotalWidth > containerWidth) {
        this.initSlider();
      } else {
        this.destroySlider();
      }
    }

    getSlidesWidth() {
      let slidesTotalWidth = 0;
      const slides = this.container.querySelectorAll(selectors$C.sliderItem);

      if (slides.length) {
        slides.forEach((slide) => {
          slidesTotalWidth += slide.offsetWidth;
        });
      }
      return slidesTotalWidth;
    }

    initSlider() {
      const flkty = Flickity.data(this.slider);

      if (flkty !== null) {
        this.flkty = new Flickity(this.slider, {
          contain: true,
          wrapAround: true,
          pageDots: false,
        });

        // iOS smooth scrolling fix
        flickitySmoothScrolling(this.slider);
      }
    }

    destroySlider() {
      const flkty = Flickity.data(this.slider);

      if (flkty) {
        this.flkty.destroy();
      }
    }

    onBlockSelect(evt) {
      const index = parseInt([...evt.target.parentNode.children].indexOf(evt.target));

      if (this.flkty !== null) {
        this.flkty.select(index);
      } else {
        const sliderStyle = this.slider.currentStyle || window.getComputedStyle(this.slider);
        const sliderPadding = parseInt(sliderStyle.paddingLeft);
        const blockPositionLeft = evt.target.offsetLeft - sliderPadding;

        this.slider.scrollTo({
          top: 0,
          left: blockPositionLeft,
          behavior: 'smooth',
        });
      }
    }

    onUnload() {
      const flkty = Flickity.data(this.slider);

      if (flkty) {
        this.flkty.destroy();
      }
      document.removeEventListener('theme:resize:width', this.sliderResizeEvent);
    }
  }

  const LogoListSection = {
    onLoad() {
      sections$g[this.id] = new LogoList(this);
    },
    onUnload(e) {
      sections$g[this.id].onUnload(e);
    },
    onBlockSelect(e) {
      sections$g[this.id].onBlockSelect(e);
    },
  };

  register('logo-list', LogoListSection);

  const sections$h = {};

  const selectors$D = {
    slider: '[data-slider]',
    sliderItem: '[data-slide-item]',
    pointer: '[data-pointer]',
    productGridItemImage: '[data-product-media-container]',
    links: 'a, button',
    flickityButton: '.flickity-button',
  };

  const attributes$n = {
    pointer: 'data-pointer',
    tabIndex: 'tabindex',
  };

  const classes$u = {
    pointerSelected: 'pointer--selected',
    pointerInner: 'pointer__inner',
    isSelected: 'is-selected',
  };

  class Look {
    constructor(section) {
      this.container = section.container;
      this.slider = this.container.querySelector(selectors$D.slider);
      this.slides = this.container.querySelectorAll(selectors$D.sliderItem);
      this.pointers = this.container.querySelectorAll(selectors$D.pointer);
      this.flkty = null;

      this.checkSlidesSizeOnResize = () => this.checkSlidesSize();
      this.onDrawerOpen = () => this.drawerOpen();
      this.pointersInit = (evt) => this.dotPointers(evt);
      this.pointersOver = () => this.dotPointerIn();
      this.pointersOut = () => this.dotPointerOut();

      new QuickViewPopup(this.container);
      this.listen();
    }

    listen() {
      if (this.slider) {
        this.checkSlidesSize();
        document.addEventListener('theme:resize:width', this.checkSlidesSizeOnResize);
        document.addEventListener('theme:drawer:open', this.onDrawerOpen);
      }

      if (this.pointers.length > 0) {
        this.pointers.forEach((pointer) => {
          pointer.addEventListener('click', this.pointersInit);
          pointer.addEventListener('mouseover', this.pointersOver);
          pointer.addEventListener('mouseleave', this.pointersOut);
        });
      }
    }

    checkSlidesSize() {
      const isDesktop = window.innerWidth >= theme.sizes.small;

      if (isDesktop) {
        PaloAlto.Drawer.close();

        if (this.slides.length > 2) {
          this.initSlider();
        } else {
          this.destroySlider();
          this.slidesTabIndex();
        }

        return;
      }

      if (!isDesktop && this.slides.length > 1) {
        this.initSlider();

        return;
      }

      this.destroySlider();
    }

    initSlider() {
      if (this.flkty === null) {
        this.flkty = new Flickity(this.slider, {
          prevNextButtons: true,
          wrapAround: true,
          adaptiveHeight: false,
          cellAlign: 'left',
          groupCells: false,
          contain: true,
          on: {
            ready: () => {
              this.slidesTabIndex();
              this.setSliderArrowsPosition();
              this.dotPointers();
            },
            change: () => {
              this.slidesTabIndex();
              this.dotPointers();
            },
          },
        });

        return;
      }

      this.setSliderArrowsPosition();
    }

    drawerOpen() {
      if (this.flkty !== null) {
        setTimeout(() => {
          this.flkty.resize();
        }, 0);
      }
    }

    setSliderArrowsPosition() {
      const isDesktop = window.innerWidth >= theme.sizes.small;

      if (isDesktop) {
        const arrows = this.slider.querySelectorAll(selectors$D.flickityButton);
        const image = this.slider.querySelector(selectors$D.productGridItemImage);

        if (arrows.length && image) {
          arrows.forEach((arrow) => {
            arrow.style.top = `${image.offsetHeight / 2}px`;
          });
        }
      }
    }

    slidesTabIndex() {
      if (this.slides.length < 3) {
        this.slider.querySelectorAll(selectors$D.links).forEach((link) => {
          link.setAttribute(attributes$n.tabIndex, '0');
        });

        return;
      }

      const slider = Flickity.data(this.slider);

      slider.cells.forEach((slide) => {
        slide.element.querySelectorAll(selectors$D.links).forEach((link) => {
          link.setAttribute(attributes$n.tabIndex, '-1');
        });
      });

      slider.cells.forEach((slide) => {
        if (slide.element.classList.contains(classes$u.isSelected)) {
          slide.element.querySelectorAll(selectors$D.links).forEach((link) => {
            link.setAttribute(attributes$n.tabIndex, '0');
          });

          const secondaryElement = slide.element.nextSibling ? slide.element.nextSibling : slide.element.parentNode.firstChild; // Used to add tabindex = 0 to the other slide element that's visible as well, but is not marked as selected

          secondaryElement.querySelectorAll(selectors$D.links).forEach((link) => {
            link.setAttribute(attributes$n.tabIndex, '0');
          });
        }
      });
    }

    destroySlider() {
      if (typeof this.flkty === 'object' && this.flkty !== null) {
        this.flkty.destroy();
        this.flkty = null;
      }
    }

    dotPointers(evt) {
      this.pointers.forEach((button) => {
        button.classList.remove(classes$u.pointerSelected);
      });

      if (evt) {
        const dotIndex = evt.target.getAttribute(attributes$n.pointer);
        this.flkty.select(dotIndex);

        return;
      }

      const slideIndex = this.flkty == null ? 0 : this.flkty.selectedIndex;

      if (slideIndex >= 0) {
        this.pointers[slideIndex].classList.add(classes$u.pointerSelected);
      }
    }

    dotPointerIn() {
      this.pointers.forEach((pointer) => {
        pointer.style.setProperty('--look-animation', 'none');
      });
    }

    dotPointerOut() {
      this.pointers.forEach((pointer) => {
        pointer.style.removeProperty('--look-animation');
      });
    }

    /**
     * Event callback for Theme Editor `section:block:select` event
     */
    onBlockSelect(evt) {
      const flkty = Flickity.data(this.slider) || null;
      const index = parseInt([...evt.target.parentNode.children].indexOf(evt.target));

      if (flkty !== null) {
        flkty.select(index);
      }
    }

    /**
     * Event callback for Theme Editor `section:unload` event
     */
    onUnload() {
      document.removeEventListener('theme:resize:width', this.checkSlidesSizeOnResize);
      document.removeEventListener('theme:drawer:open', this.onDrawerOpen);
    }
  }

  const lookSection = {
    onLoad() {
      sections$h[this.id] = new Look(this);
    },
    onUnload(e) {
      sections$h[this.id].onUnload(e);
    },
    onBlockSelect(e) {
      sections$h[this.id].onBlockSelect(e);
    },
  };

  register('look', lookSection);

  const selectors$E = {
    grid: '[data-grid]',
  };

  const mosaicSection = {
    onBlockSelect(e) {
      const grid = e.target.closest(selectors$E.grid);
      const wrapperStyle = grid.currentStyle || window.getComputedStyle(grid);
      const wrapperPadding = parseInt(wrapperStyle.paddingLeft);
      const blockPositionLeft = e.target.offsetLeft - wrapperPadding;

      // Native scroll to item
      grid.scrollTo({
        top: 0,
        left: blockPositionLeft,
        behavior: 'smooth',
      });
    },
  };

  register('mosaic', mosaicSection);

  register('newsletter', newsletterSection);

  register('overlapping-images', videoPlay);

  const selectors$F = {
    toggleAdmin: '[data-toggle-admin]',
    toggleNewsletter: '[data-toggle-newsletter]',
    adminForm: '[data-form-admin]',
    newsletterForm: '[data-form-newsletter]',
  };

  let sections$i = {};

  class Password {
    constructor(section) {
      this.container = section.container;
      this.toggleAdmin = this.container.querySelector(selectors$F.toggleAdmin);
      this.toggleNewsletter = this.container.querySelector(selectors$F.toggleNewsletter);
      this.adminForm = this.container.querySelector(selectors$F.adminForm);
      this.newsletterForm = this.container.querySelector(selectors$F.newsletterForm);
      this.adminErrors = this.adminForm.querySelector('.errors');
      this.newsletterErrors = this.newsletterForm.querySelector('.errors');

      this.init();
    }

    init() {
      this.toggleAdmin.addEventListener('click', (e) => {
        e.preventDefault();
        this.showPasswordForm();
      });

      this.toggleNewsletter.addEventListener('click', (e) => {
        e.preventDefault();
        this.hidePasswordForm();
      });

      if (window.location.hash == '#login' || this.adminErrors) {
        this.showPasswordForm();
      } else {
        this.hidePasswordForm();
      }
    }

    showPasswordForm() {
      showElement(this.adminForm);
      hideElement(this.newsletterForm);
      window.location.hash = '#login';
    }

    hidePasswordForm() {
      showElement(this.newsletterForm);
      hideElement(this.adminForm);
      window.location.hash = '';
    }
  }

  const passwordSection = {
    onLoad() {
      sections$i[this.id] = new Password(this);
    },
  };

  register('password-template', passwordSection);

  const selectors$G = {
    largePromo: '[data-large-promo]',
    largePromoInner: '[data-large-promo-inner]',
    tracking: '[data-tracking-consent]',
    trackingInner: '[data-tracking-consent-inner]',
    trackingAccept: '[data-confirm-cookies]',
    popupBar: '[data-popup-bar]',
    popupBarHolder: '[data-popup-bar-holder]',
    popupBarToggle: '[data-popup-bar-toggle]',
    popupBody: '[data-popup-body]',
    popupClose: '[data-popup-close]',
    popupUnderlay: '[data-popup-underlay]',
    newsletterForm: '[data-newsletter-form]',
  };

  const attributes$o = {
    cookieName: 'data-cookie-name',
    targetReferrer: 'data-target-referrer',
    preventScrollLock: 'data-prevent-scroll-lock',
  };

  const classes$v = {
    success: 'has-success',
    error: 'has-error',
    selected: 'selected',
    hasBlockSelected: 'has-block-selected',
    expanded: 'popup--expanded',
    visible: 'popup--visible',
    mobile: 'mobile',
    desktop: 'desktop',
  };

  let sections$j = {};
  let scrollLockTimer = 0;

  class DelayShow {
    constructor(popupContainer, popup) {
      this.popupContainer = popupContainer;
      this.popup = popup;
      this.popupBody = popup.querySelector(selectors$G.popupBody);
      this.delay = popupContainer.dataset.popupDelay;
      this.isSubmitted = window.location.href.indexOf('accepts_marketing') !== -1 || window.location.href.indexOf('customer_posted=true') !== -1;
      this.a11y = slate.a11y;
      this.showPopupOnScrollEvent = () => this.showPopupOnScroll();

      if (this.delay === 'always' || this.isSubmitted) {
        this.always();
      }

      if (this.delay && this.delay.includes('delayed') && !this.isSubmitted) {
        const seconds = this.delay.includes('_') ? parseInt(this.delay.split('_')[1]) : 10;
        this.delayed(seconds);
      }

      if (this.delay === 'bottom' && !this.isSubmitted) {
        this.bottom();
      }

      if (this.delay === 'idle' && !this.isSubmitted) {
        this.idle();
      }
    }

    always() {
      this.showPopup();
    }

    delayed(seconds = 10) {
      setTimeout(() => {
        // Show popup after specific seconds
        this.showPopup();
      }, seconds * 1000);
    }

    // Scroll to the bottom of the page
    bottom() {
      document.addEventListener('theme:scroll', this.showPopupOnScrollEvent);
    }

    // Idle for 1 min
    idle() {
      const isTargetValid = this.checkPopupTarget() === true;
      if (!isTargetValid) {
        return;
      }

      let timer = 0;
      let idleTime = 60000;
      const documentEvents = ['mousemove', 'mousedown', 'click', 'touchmove', 'touchstart', 'touchend', 'keydown', 'keypress'];
      const windowEvents = ['load', 'resize', 'scroll'];

      const startTimer = () => {
        timer = setTimeout(() => {
          timer = 0;
          this.showPopup();
        }, idleTime);

        documentEvents.forEach((eventType) => {
          document.addEventListener(eventType, resetTimer);
        });

        windowEvents.forEach((eventType) => {
          window.addEventListener(eventType, resetTimer);
        });
      };

      const resetTimer = () => {
        if (timer) {
          clearTimeout(timer);
        }

        documentEvents.forEach((eventType) => {
          document.removeEventListener(eventType, resetTimer);
        });

        windowEvents.forEach((eventType) => {
          window.removeEventListener(eventType, resetTimer);
        });

        startTimer();
      };

      startTimer();
    }

    showPopup() {
      const isTargetValid = this.checkPopupTarget() === true;
      if (isTargetValid) {
        this.popup.classList.add(classes$v.visible);

        // The scroll is not locking if data-prevent-scroll-lock is added to the Popup container
        if (this.popup.hasAttribute(attributes$o.preventScrollLock)) {
          return false;
        }

        this.scrollLock();
      }
    }

    hidePopup() {
      this.popup.classList.remove(classes$v.visible);
      this.scrollUnlock();
    }

    checkPopupTarget() {
      const targetMobile = this.popup.parentNode.classList.contains(classes$v.mobile);
      const targetDesktop = this.popup.parentNode.classList.contains(classes$v.desktop);

      if ((targetMobile && window.innerWidth >= theme.sizes.small) || (targetDesktop && window.innerWidth < theme.sizes.small)) {
        return false;
      } else {
        return true;
      }
    }

    scrollLock() {
      this.a11y.trapFocus({
        container: this.popupBody,
      });
      document.dispatchEvent(new CustomEvent('theme:scroll:lock', {bubbles: true, detail: this.popupBody}));
    }

    scrollUnlock() {
      this.a11y.removeTrapFocus();
      // Unlock scrollbar after popup animation completes
      scrollLockTimer = setTimeout(() => {
        document.dispatchEvent(new CustomEvent('theme:scroll:unlock', {bubbles: true}));
      }, 300);
    }

    resetScrollUnlock() {
      if (scrollLockTimer) {
        clearTimeout(scrollLockTimer);
      }
    }

    showPopupOnScroll() {
      if (window.scrollY + window.innerHeight >= document.body.clientHeight) {
        this.showPopup();
        document.removeEventListener('theme:scroll', this.showPopupOnScrollEvent);
      }
    }

    onUnload() {
      document.removeEventListener('theme:scroll', this.showPopupOnScrollEvent);
    }
  }

  class TargetReferrer {
    constructor(el) {
      this.popupContainer = el;
      this.locationPath = location.href;

      if (!this.popupContainer.hasAttribute(attributes$o.targetReferrer)) {
        return false;
      }

      if (this.locationPath.indexOf(this.popupContainer.getAttribute(attributes$o.targetReferrer)) === -1 && !window.Shopify.designMode) {
        this.popupContainer.parentNode.removeChild(this.popupContainer);
      }
    }
  }

  class LargePopup {
    constructor(el) {
      this.popupContainer = el;
      this.popup = this.popupContainer.querySelector(selectors$G.largePromoInner);
      this.popupBody = this.popup.querySelector(selectors$G.popupBody);
      this.close = this.popup.querySelector(selectors$G.popupClose);
      this.underlay = this.popup.querySelector(selectors$G.popupUnderlay);
      this.form = this.popup.querySelector(selectors$G.newsletterForm);
      this.cookie = new PopupCookie(this.popupContainer.dataset.cookieName, 'user_has_closed');
      this.isTargeted = new TargetReferrer(this.popupContainer);
      this.a11y = slate.a11y;

      this.init();
    }

    init() {
      const cookieExists = this.cookie.read() !== false;

      if (!cookieExists || window.Shopify.designMode) {
        if (!window.Shopify.designMode) {
          new DelayShow(this.popupContainer, this.popup);
        } else {
          this.showPopup();
        }

        if (this.form) {
          setTimeout(() => {
            if (this.form.classList.contains(classes$v.success)) {
              this.showPopupIfNoCookie();
            }
          });
        }

        this.initClosers();
      }
    }

    checkPopupTarget() {
      const targetMobile = this.popup.parentNode.classList.contains(classes$v.mobile);
      const targetDesktop = this.popup.parentNode.classList.contains(classes$v.desktop);

      if ((targetMobile && window.innerWidth >= theme.sizes.small) || (targetDesktop && window.innerWidth < theme.sizes.small)) {
        return false;
      } else {
        return true;
      }
    }

    showPopupIfNoCookie() {
      this.showPopup();
    }

    initClosers() {
      this.close.addEventListener('click', this.closePopup.bind(this));
      this.underlay.addEventListener('click', this.closePopup.bind(this));
      this.popupContainer.addEventListener('keyup', (e) => {
        if (e.keyCode === theme.keyboardKeys.ESCAPE) {
          this.closePopup(e);
          console.log("dddd");
        }
      });
    }

    closePopup(e) {
      e.preventDefault();
      this.hidePopup();
      this.cookie.write();
    }

    scrollLock() {
      this.resetScrollUnlock();
      this.a11y.trapFocus({
        container: this.popupBody,
      });
      document.dispatchEvent(new CustomEvent('theme:scroll:lock', {bubbles: true, detail: this.popupBody}));
    }

    scrollUnlock() {
      this.a11y.removeTrapFocus();
      this.resetScrollUnlock();

      // Unlock scrollbar after popup animation completes
      scrollLockTimer = setTimeout(() => {
        document.dispatchEvent(new CustomEvent('theme:scroll:unlock', {bubbles: true}));
      }, 300);
    }

    resetScrollUnlock() {
      if (scrollLockTimer) {
        clearTimeout(scrollLockTimer);
      }
    }

    showPopup() {
      const isTargetValid = this.checkPopupTarget() === true;
      if (isTargetValid) {
        this.popup.classList.add(classes$v.visible);
        this.scrollLock();
      }
    }

    hidePopup() {
      this.popup.classList.remove(classes$v.visible);
      this.scrollUnlock();
    }

    onBlockSelect(evt) {
      if (this.popupContainer.contains(evt.target)) {
        this.popup.classList.add(classes$v.selected);
        this.popupContainer.classList.add(classes$v.hasBlockSelected);
        this.showPopup();
      }
    }

    onBlockDeselect(evt) {
      if (this.popupContainer.contains(evt.target)) {
        this.popup.classList.remove(classes$v.selected);
        this.popupContainer.classList.remove(classes$v.hasBlockSelected);
        this.hidePopup();
      }
    }
  }

  class Tracking {
    constructor(el) {
      this.popupContainer = el;
      this.popup = this.popupContainer.querySelector(selectors$G.trackingInner);
      this.close = this.popup.querySelector(selectors$G.popupClose);
      this.acceptButton = this.popup.querySelector(selectors$G.trackingAccept);
      this.enable = this.popupContainer.dataset.enable === 'true';

      window.Shopify.loadFeatures(
        [
          {
            name: 'consent-tracking-api',
            version: '0.1',
          },
        ],
        (error) => {
          if (error) {
            throw error;
          }

          const userCanBeTracked = window.Shopify.customerPrivacy.userCanBeTracked();
          const userTrackingConsent = window.Shopify.customerPrivacy.getTrackingConsent();

          this.enableTracking = !userCanBeTracked && userTrackingConsent === 'no_interaction' && this.enable;

          if (window.Shopify.designMode) {
            this.enableTracking = true;
          }

          this.init();
        }
      );
    }

    init() {
      if (this.enableTracking) {
        this.showPopup();
      }

      this.clickEvents();
    }

    clickEvents() {
      this.close.addEventListener('click', (event) => {
        event.preventDefault();

        window.Shopify.customerPrivacy.setTrackingConsent(false, () => this.hidePopup());
      });

      this.acceptButton.addEventListener('click', (event) => {
        event.preventDefault();

        window.Shopify.customerPrivacy.setTrackingConsent(true, () => this.hidePopup());
      });

      document.addEventListener('trackingConsentAccepted', () => {
        console.log('trackingConsentAccepted event fired');
      });
    }

    showPopup() {
      this.popup.classList.add(classes$v.visible);
    }

    hidePopup() {
      this.popup.classList.remove(classes$v.visible);
    }

    onBlockSelect(evt) {
      if (this.popupContainer.contains(evt.target) && this.enableTracking) {
        this.showPopup();
        this.popup.classList.add(classes$v.selected);
        this.popup.parentNode.classList.add(classes$v.hasBlockSelected);
      }
    }

    onBlockDeselect(evt) {
      if (this.popupContainer.contains(evt.target)) {
        this.popup.classList.remove(classes$v.selected);
        this.popupContainer.classList.remove(classes$v.hasBlockSelected);
        this.hidePopup();
      }
    }
  }

  class PopupBar {
    constructor(el) {
      this.popupContainer = el;
      this.popup = this.popupContainer.querySelector(selectors$G.popupBarHolder);
      this.popupBody = this.popup.querySelector(selectors$G.popupBody);
      this.close = this.popup.querySelector(selectors$G.popupClose);
      this.underlay = this.popup.querySelector(selectors$G.popupUnderlay);
      this.toggle = this.popup.querySelector(selectors$G.popupBarToggle);
      this.cookie = new PopupCookie(this.popupContainer.dataset.cookieName, 'user_has_closed');
      this.form = this.popup.querySelector(selectors$G.newsletterForm);
      this.isTargeted = new TargetReferrer(this.popupContainer);
      this.a11y = slate.a11y;

      this.init();
    }

    init() {
      const cookieExists = this.cookie.read() !== false;

      if (!cookieExists || window.Shopify.designMode) {
        if (!window.Shopify.designMode) {
          new DelayShow(this.popupContainer, this.popup);
        } else {
          this.showPopup();
        }

        this.initPopupToggleButton();
        this.initClosers();

        if (this.form) {
          setTimeout(() => {
            if (this.form.classList.contains(classes$v.success)) {
              this.showPopupIfNoCookie();
            }

            if (this.form.classList.contains(classes$v.error)) {
              // Expand popup if form has error
              this.toggle.dispatchEvent(new Event('click'));
            }
          });
        }
      }
    }

    checkPopupTarget() {
      const targetMobile = this.popup.parentNode.classList.contains(classes$v.mobile);
      const targetDesktop = this.popup.parentNode.classList.contains(classes$v.desktop);

      if ((targetMobile && window.innerWidth >= theme.sizes.small) || (targetDesktop && window.innerWidth < theme.sizes.small)) {
        return false;
      } else {
        return true;
      }
    }

    showPopupIfNoCookie() {
      this.showPopup();
      this.toggle.dispatchEvent(new Event('click'));
    }

    initPopupToggleButton() {
      this.toggle.addEventListener('click', (event) => {
        event.preventDefault();

        this.popup.classList.toggle(classes$v.expanded);

        if (this.popup.classList.contains(classes$v.expanded)) {
          this.scrollLock();
        } else {
          this.scrollUnlock();
        }
      });
    }

    showPopup() {
      const isTargetValid = this.checkPopupTarget() === true;
      if (isTargetValid) {
        this.popup.classList.add(classes$v.visible);
      }
    }

    hidePopup() {
      this.popup.classList.remove(classes$v.visible);
      this.scrollUnlock();
    }

    initClosers() {
      this.close.addEventListener('click', this.closePopup.bind(this));
      this.underlay.addEventListener('click', () => this.toggle.dispatchEvent(new Event('click')));
      this.popupContainer.addEventListener('keyup', (e) => {
        if (e.keyCode === theme.keyboardKeys.ESCAPE) {
          this.popup.classList.remove(classes$v.expanded);
          this.scrollUnlock();
        }
      });
    }

    closePopup(e) {
      e.preventDefault();

      this.cookie.write();
      this.hidePopup();
    }

    scrollLock() {
      this.a11y.trapFocus({
        container: this.popupBody,
      });
      document.dispatchEvent(new CustomEvent('theme:scroll:lock', {bubbles: true, detail: this.popupBody}));
    }

    scrollUnlock() {
      this.a11y.removeTrapFocus();
      this.resetScrollUnlock();

      // Unlock scrollbar after popup animation completes
      scrollLockTimer = setTimeout(() => {
        document.dispatchEvent(new CustomEvent('theme:scroll:unlock', {bubbles: true}));
      }, 300);
    }

    resetScrollUnlock() {
      if (scrollLockTimer) {
        clearTimeout(scrollLockTimer);
      }
    }

    onBlockSelect(evt) {
      if (this.popupContainer.contains(evt.target)) {
        this.showPopup();
        this.popup.classList.add(classes$v.expanded);
        this.popup.classList.add(classes$v.selected);
        this.popup.parentNode.classList.add(classes$v.hasBlockSelected);
        this.resetScrollUnlock();
        this.scrollLock();
      }
    }

    onBlockDeselect(evt) {
      if (this.popupContainer.contains(evt.target)) {
        this.popup.classList.remove(classes$v.expanded);
        this.popup.classList.remove(classes$v.selected);
        this.popup.parentNode.classList.remove(classes$v.hasBlockSelected);
        this.hidePopup();
      }
    }
  }

  const popupSection = {
    onLoad() {
      sections$j[this.id] = [];

      const popups = this.container.querySelectorAll(selectors$G.largePromo);
      if (popups.length) {
        popups.forEach((el) => {
          sections$j[this.id].push(new LargePopup(el));
        });
      }

      const popupBars = this.container.querySelectorAll(selectors$G.popupBar);
      if (popupBars.length) {
        popupBars.forEach((el) => {
          sections$j[this.id].push(new PopupBar(el));
        });
      }

      const cookiesPopups = this.container.querySelectorAll(selectors$G.tracking);
      if (cookiesPopups.length) {
        cookiesPopups.forEach((el) => {
          sections$j[this.id].push(new Tracking(el));
        });
      }
    },
    onBlockSelect(evt) {
      sections$j[this.id].forEach((el) => {
        if (typeof el.onBlockSelect === 'function') {
          el.onBlockSelect(evt);
        }
      });
    },
    onBlockDeselect(evt) {
      sections$j[this.id].forEach((el) => {
        if (typeof el.onBlockDeselect === 'function') {
          el.onBlockDeselect(evt);
        }
      });
    },
    onUnload(evt) {
      sections$j[this.id].forEach((el) => {
        if (typeof el.onUnload === 'function') {
          el.onUnload(evt);
        }
      });
    },
  };

  register('popups', [popupSection, newsletterSection]);

  const selectors$H = {
    pressItems: '[data-press-items]',
    logoSlider: '[data-logo-slider]',
    logoSlide: '[data-logo-slide]',
    links: 'a, button',
  };

  const attributes$p = {
    logoSlide: 'data-logo-index',
    tabIndex: 'tabindex',
  };

  let sections$k = {};

  class Press {
    constructor(section) {
      this.container = section.container;
      this.slider = this.container.querySelector(selectors$H.pressItems);
      this.sliderNav = this.container.querySelector(selectors$H.logoSlider);
      this.sliderResizeEvent = () => this.checkSlides();

      this.initSlider();
      this.checkSlides();

      window.addEventListener('load', this.resizeSlider.bind(this));
      document.addEventListener('theme:resize:width', this.sliderResizeEvent);
    }

    checkSlides() {
      const containerWidth = this.container.offsetWidth;
      const slides = this.container.querySelectorAll(selectors$H.logoSlide);
      const sliderNav = Flickity.data(this.sliderNav) || null;

      if (sliderNav !== null) {
        sliderNav.options.draggable = false;
        sliderNav.options.wrapAround = false;
        sliderNav.options.contain = true;

        if (this.getSlidesWidth() > containerWidth && slides.length > 2) {
          sliderNav.options.draggable = true;
          sliderNav.options.wrapAround = true;
          sliderNav.options.contain = false;
        }
        sliderNav.resize();
        sliderNav.updateDraggable();
      }
    }

    getSlidesWidth() {
      const slides = this.container.querySelectorAll(selectors$H.logoSlide);
      let slidesTotalWidth = 0;

      if (slides.length) {
        slides.forEach((slide) => {
          slidesTotalWidth += slide.offsetWidth;
        });
      }
      return slidesTotalWidth;
    }

    /* Init slider */
    initSlider() {
      let flkty = Flickity.data(this.slider) || null;
      let flktyNav = Flickity.data(this.sliderNav) || null;

      flkty = new Flickity(this.slider, {
        fade: true,
        wrapAround: true,
        adaptiveHeight: true,
        prevNextButtons: false,
        pageDots: false,
      });

      flktyNav = new Flickity(this.sliderNav, {
        draggable: false,
        wrapAround: false,
        contain: true,
        imagesLoaded: true,
        lazyLoad: true,
        asNavFor: this.slider,
        prevNextButtons: false,
        adaptiveHeight: false,
        pageDots: false,
        on: {
          ready: () => {
            const slides = this.container.querySelectorAll(selectors$H.logoSlide);
            slides.forEach((slide) => {
              // Change slide text on logo change for a11y reasons
              slide.addEventListener('keyup', (e) => {
                if (e.keyCode === slate.utils.keyboardKeys.ENTER || e.keyCode === slate.utils.keyboardKeys.SPACE) {
                  const selectedIndex = Number(slide.getAttribute(attributes$p.logoSlide));
                  flkty.selectCell(selectedIndex);
                }
              });
            });
          },
        },
      });

      // iOS smooth scrolling fix
      flickitySmoothScrolling(this.slider);
      flickitySmoothScrolling(this.sliderNav);

      // Trigger text change on image move/drag
      flktyNav.on('change', (index) => {
        flkty.selectCell(index);
      });

      // Trigger text change on image move/drag
      flkty.on('change', (index) => {
        flktyNav.selectCell(index);

        flkty.cells.forEach((slide, i) => {
          slide.element.querySelectorAll(selectors$H.links).forEach((link) => {
            link.setAttribute(attributes$p.tabIndex, i === index ? '0' : '-1');
          });
        });
      });
    }

    // slider height fix on window load
    resizeSlider() {
      const hasSlider = Flickity.data(this.slider);

      if (hasSlider) {
        hasSlider.resize();
      }
    }

    onBlockSelect(evt) {
      const slider = Flickity.data(this.slider) || null;
      const sliderNav = Flickity.data(this.sliderNav) || null;
      const index = parseInt([...evt.target.parentNode.children].indexOf(evt.target));

      if (slider !== null) {
        slider.select(index);
      }

      if (sliderNav !== null) {
        sliderNav.select(index);
      }
    }

    onUnload() {
      document.removeEventListener('theme:resize:width', this.sliderResizeEvent);
    }
  }

  const pressSection = {
    onLoad() {
      sections$k[this.id] = new Press(this);
    },
    onUnload(e) {
      sections$k[this.id].onUnload(e);
    },
    onBlockSelect(e) {
      sections$k[this.id].onBlockSelect(e);
    },
  };

  register('press', pressSection);

  const selectors$I = {
    tooltip: '[data-tooltip]',
    tooltipContainer: '[data-tooltip-container]',
  };

  const classes$w = {
    root: 'tooltip-default',
    visible: 'is-visible',
    hiding: 'is-hiding',
  };

  const attributes$q = {
    tooltip: 'data-tooltip',
    tooltipContainer: 'data-tooltip-container',
    tooltipStopMouseEnter: 'data-tooltip-stop-mouseenter',
  };

  const sections$l = {};

  class Tooltip {
    constructor(el) {
      this.tooltip = el;
      if (!this.tooltip.hasAttribute(attributes$q.tooltip)) {
        return;
      }

      this.rootClass = classes$w.root;
      this.label = this.tooltip.getAttribute(attributes$q.tooltip);
      this.transitionSpeed = 200;
      this.hideTransitionTimeout = 0;
      this.addPinEvent = () => this.addPin();
      this.addPinMouseEvent = () => this.addPin(true);
      this.removePinEvent = (event) => throttle(this.removePin(event), 50);
      this.removePinMouseEvent = (event) => this.removePin(event, true, true);
      this.init();
    }

    init() {
      if (!document.querySelector(selectors$I.tooltipContainer)) {
        const tooltipTemplate = `<div class="${this.rootClass}__inner"><div class="${this.rootClass}__arrow"></div><div class="${this.rootClass}__text"></div></div>`;
        const tooltipElement = document.createElement('div');
        tooltipElement.className = this.rootClass;
        tooltipElement.setAttribute(attributes$q.tooltipContainer, '');
        tooltipElement.innerHTML = tooltipTemplate;
        document.body.appendChild(tooltipElement);
      }

      this.tooltip.addEventListener('mouseenter', this.addPinMouseEvent);
      this.tooltip.addEventListener('mouseleave', this.removePinMouseEvent);
      this.tooltip.addEventListener('theme:tooltip:init', this.addPinEvent);
      document.addEventListener('theme:tooltip:close', this.removePinEvent);
    }

    addPin(stopMouseEnter = false) {
      const tooltipTarget = document.querySelector(selectors$I.tooltipContainer);

      if (tooltipTarget && ((stopMouseEnter && !this.tooltip.hasAttribute(attributes$q.tooltipStopMouseEnter)) || !stopMouseEnter)) {
        const tooltipTargetInner = tooltipTarget.querySelector(`.${this.rootClass}__inner`);
        const tooltipTargetText = tooltipTarget.querySelector(`.${this.rootClass}__text`);
        tooltipTargetText.textContent = this.label;

        const tooltipTargetWidth = tooltipTargetInner.offsetWidth;
        const tooltipRect = this.tooltip.getBoundingClientRect();
        const tooltipTop = tooltipRect.top;
        const tooltipWidth = tooltipRect.width;
        const tooltipHeight = tooltipRect.height;
        const tooltipTargetPositionTop = tooltipTop + tooltipHeight + window.scrollY;
        let tooltipTargetPositionLeft = tooltipRect.left - tooltipTargetWidth / 2 + tooltipWidth / 2;
        const tooltipLeftWithWidth = tooltipTargetPositionLeft + tooltipTargetWidth;
        const tooltipTargetWindowDifference = tooltipLeftWithWidth - window.innerWidth;

        if (tooltipTargetWindowDifference > 0) {
          tooltipTargetPositionLeft -= tooltipTargetWindowDifference;
        }

        if (tooltipTargetPositionLeft < 0) {
          tooltipTargetPositionLeft = 0;
        }

        tooltipTarget.style.transform = `translate(${tooltipTargetPositionLeft}px, ${tooltipTargetPositionTop}px)`;
        tooltipTarget.classList.remove(classes$w.hiding);
        tooltipTarget.classList.add(classes$w.visible);

        document.addEventListener('theme:scroll', this.removePinEvent);
      }
    }

    removePin(event, stopMouseEnter = false, hideTransition = false) {
      const tooltipTarget = document.querySelector(selectors$I.tooltipContainer);
      const tooltipVisible = tooltipTarget.classList.contains(classes$w.visible);

      if (tooltipTarget && ((stopMouseEnter && !this.tooltip.hasAttribute(attributes$q.tooltipStopMouseEnter)) || !stopMouseEnter)) {
        if (tooltipVisible && (hideTransition || event.detail.hideTransition)) {
          tooltipTarget.classList.add(classes$w.hiding);

          if (this.hideTransitionTimeout) {
            clearTimeout(this.hideTransitionTimeout);
          }

          this.hideTransitionTimeout = setTimeout(() => {
            tooltipTarget.classList.remove(classes$w.hiding);
          }, this.transitionSpeed);
        }

        tooltipTarget.classList.remove(classes$w.visible);

        document.removeEventListener('theme:scroll', this.removePinEvent);
      }
    }

    unload() {
      this.tooltip.removeEventListener('mouseenter', this.addPinMouseEvent);
      this.tooltip.removeEventListener('mouseleave', this.removePinMouseEvent);
      this.tooltip.removeEventListener('theme:tooltip:init', this.addPinEvent);
      document.removeEventListener('theme:tooltip:close', this.removePinEvent);
      document.removeEventListener('theme:scroll', this.removePinEvent);
    }
  }

  const tooltip = {
    onLoad() {
      sections$l[this.id] = [];
      const tooltips = this.container.querySelectorAll(selectors$I.tooltip);
      tooltips.forEach((tooltip) => {
        sections$l[this.id].push(new Tooltip(tooltip));
      });
    },
    onUnload() {
      sections$l[this.id].forEach((tooltip) => {
        if (typeof tooltip.unload === 'function') {
          tooltip.unload();
        }
      });
    },
  };

  const selectors$J = {
    mediaContainer: '[data-product-single-media-group]',
    productMediaSlider: '[data-product-single-media-slider]',
    zoomWrapper: '[data-zoom-wrapper]',
  };

  const classes$x = {
    popupClass: 'pswp-zoom-gallery',
    popupClassNoThumbs: 'pswp-zoom-gallery--single',
    isMoving: 'is-moving',
  };

  const attributes$r = {
    dataImageWidth: 'data-image-width',
    dataImageHeight: 'data-image-height',
  };

  class Zoom {
    constructor(container) {
      this.container = container;
      this.mediaContainer = this.container.querySelector(selectors$J.mediaContainer);
      this.slider = this.container.querySelector(selectors$J.productMediaSlider);
      this.zoomWrappers = this.container.querySelectorAll(selectors$J.zoomWrapper);
      this.zoomEnable = this.mediaContainer.dataset.gallery === 'true';

      if (this.zoomEnable) {
        this.init();
      }
    }

    init() {
      if (this.zoomWrappers.length) {
        this.zoomWrappers.forEach((element, i) => {
          element.addEventListener('click', (e) => {
            e.preventDefault();

            const isMoving = this.slider && this.slider.classList.contains(classes$x.isMoving);

            if (!isMoving) {
              slate.a11y.state.trigger = element;
              this.createZoom(i);
            }
          });
        });
      }
    }

    createZoom(indexImage) {
      const instance = this;
      let items = [];
      let counter = 0;

      this.zoomWrappers.forEach((elementImage) => {
        const imgSrc = elementImage.getAttribute('href');
        const imgWidth = parseInt(elementImage.getAttribute(attributes$r.dataImageWidth));
        const imgHeight = parseInt(elementImage.getAttribute(attributes$r.dataImageHeight));

        items.push({
          src: imgSrc,
          w: imgWidth,
          h: imgHeight,
          msrc: imgSrc,
        });

        counter += 1;
        if (instance.zoomWrappers.length === counter) {
          let popupClass = `${classes$x.popupClass}`;
          if (counter === 1) {
            popupClass = `${classes$x.popupClass} ${classes$x.popupClassNoThumbs}`;
          }
          const options = {
            barsSize: {top: 60, bottom: 60},
            history: false,
            focus: false,
            index: indexImage,
            mainClass: popupClass,
            showHideOpacity: true,
            showAnimationDuration: 250,
            hideAnimationDuration: 250,
            closeOnScroll: false,
            closeOnVerticalDrag: false,
            captionEl: false,
            closeEl: true,
            closeElClasses: ['caption-close'],
            tapToClose: false,
            clickToCloseNonZoomable: false,
            maxSpreadZoom: 2,
            loop: true,
            spacing: 0,
            allowPanToNext: true,
            pinchToClose: false,
          };

          new LoadPhotoswipe(items, options);
        }
      });
    }
  }

  const selectors$K = {
    option: '[data-option]',
    popout: '[data-popout]',
    productMediaSlider: '[data-product-single-media-slider]',
    productMediaThumb: '[data-thumbnail-id]',
    productMediaThumbs: '[data-product-single-media-thumbs]',
    productMediaWrapper: '[data-product-single-media-wrapper]',
    productModel: '[data-model]',
    productSingleThumbnailLink: '.product-single__thumbnail-link',
    deferredMedia: '[data-deferred-media]',
    deferredMediaButton: '[data-deferred-media-button]',
    modalScrollContainer: '[data-tabs-holder]',
    formWrapper: '[data-form-wrapper]',
    tooltip: '[data-tooltip]',
    productRating: '[data-product-rating]',
    productReviews: '#shopify-product-reviews',
    links: 'a, button',
    upsellProduct: '[data-upsell-holder]',
    upsellProductSlider: '[data-upsell-slider]',
  };

  const classes$y = {
    featuredProduct: 'featured-product',
    featuredProductOnboarding: 'featured-product--onboarding',
    hasMediaActive: 'has-media-active',
    isSelected: 'is-selected',
    mediaHidden: 'media--hidden',
    noOutline: 'no-outline',
    hasPopup: 'has-popup',
    isMoving: 'is-moving',
  };

  const attributes$s = {
    mediaId: 'data-media-id',
    sectionId: 'data-section-id',
    thumbId: 'data-thumbnail-id',
    loaded: 'loaded',
    tabindex: 'tabindex',
  };

  const sections$m = {};

  class Product {
    constructor(section) {
      this.container = section.container;
      this.sectionId = this.container.getAttribute(attributes$s.sectionId);
      this.formWrapper = this.container.querySelector(selectors$K.formWrapper);
      this.isFlickityDragging = false;
      this.flktyNavResize = null;
      this.enableHistoryState = !this.container.classList.contains(classes$y.featuredProduct);
      this.tooltips = [];

      this.scrollToReviews();

      new QuickViewPopup(this.container);

      // Skip initialization of product form, slider and media functions if section has onboarding content only
      if (this.container.classList.contains(classes$y.featuredProductOnboarding)) {
        return;
      }

      new Zoom(this.container);

      this.initProductSlider();
      this.initUpsellSlider();
      this.initMediaSwitch();
      this.initProductVideo();
      this.initProductModel();
      this.initShopifyXrLaunch();
    }

    /* Product Slider */
    initProductSlider() {
      const slider = this.container.querySelector(selectors$K.productMediaSlider);
      const thumbs = this.container.querySelector(selectors$K.productMediaThumbs);
      const media = this.container.querySelectorAll(selectors$K.productMediaWrapper);

      if (media.length > 1) {
        const flkty = new Flickity(slider, {
          wrapAround: true,
          pageDots: false,
          adaptiveHeight: true,
          on: {
            ready: () => {
              slider.setAttribute(attributes$s.tabindex, '-1');

              media.forEach((item) => {
                if (!item.classList.contains(classes$y.isSelected)) {
                  const links = item.querySelectorAll(selectors$K.links);
                  if (links.length) {
                    links.forEach((link) => {
                      link.setAttribute(attributes$s.tabindex, '-1');
                    });
                  }
                }
              });
            },
            dragStart: () => {
              slider.classList.add(classes$y.isMoving);
            },
            dragMove: () => {
              // Prevent lightbox trigger on dragMove
              this.isFlickityDragging = true;
            },
            staticClick: () => {
              this.isFlickityDragging = false;
            },
            settle: (index) => {
              const currentSlide = flkty.selectedElement;
              const mediaId = currentSlide.getAttribute(attributes$s.mediaId);

              flkty.cells.forEach((slide, i) => {
                const links = slide.element.querySelectorAll(selectors$K.links);
                if (links.length) {
                  links.forEach((link) => {
                    link.setAttribute(attributes$s.tabindex, i === index ? '0' : '-1');
                  });
                }
              });
              this.switchMedia(mediaId);
              slider.classList.remove(classes$y.isMoving);
            },
          },
        });

        // Toggle flickity draggable functionality based on media play/pause state
        if (media.length) {
          media.forEach((el) => {
            el.addEventListener('theme:media:play', () => {
              flkty.options.draggable = false;
              flkty.updateDraggable();
              el.closest(selectors$K.productMediaSlider).classList.add(classes$y.hasMediaActive);
            });

            el.addEventListener('theme:media:pause', () => {
              flkty.options.draggable = true;
              flkty.updateDraggable();
              el.closest(selectors$K.productMediaSlider).classList.remove(classes$y.hasMediaActive);
            });
          });
        }

        // iOS smooth scrolling fix
        flickitySmoothScrolling(slider);

        if (thumbs !== null) {
          const flktyNav = new Flickity(thumbs, {
            asNavFor: slider,
            contain: true,
            pageDots: false,
            prevNextButtons: false,
            resize: true,
            on: {
              ready: () => {
                thumbs.setAttribute(attributes$s.tabindex, '-1');
              },
            },
          });

          this.flktyNavResize = () => flktyNav.resize();

          document.addEventListener('theme:resize:width', this.flktyNavResize);

          // iOS smooth scrolling fix
          flickitySmoothScrolling(thumbs);

          // Disable link click
          const thumbLinks = this.container.querySelectorAll(selectors$K.productSingleThumbnailLink);
          if (thumbLinks.length) {
            thumbLinks.forEach((el) => {
              el.addEventListener('click', (e) => {
                e.preventDefault();
              });
            });
          }
        }
      }
    }

    /* Upsell Products Slider */
    initUpsellSlider() {
      const slider = this.container.querySelector(selectors$K.upsellProductSlider);
      const items = this.container.querySelectorAll(selectors$K.upsellProduct);

      if (items.length > 1) {
        const flktyUpsell = new Flickity(slider, {
          wrapAround: true,
          pageDots: true,
          adaptiveHeight: true,
          prevNextButtons: false,
        });

        flktyUpsell.on('change', (index) => {
          flktyUpsell.cells.forEach((slide, i) => {
            const links = slide.element.querySelectorAll(selectors$K.links);
            if (links.length) {
              links.forEach((link) => {
                link.setAttribute(attributes$s.tabindex, i === index ? '0' : '-1');
              });
            }
          });
        });
      }
    }

    handleMediaFocus(e) {
      // Do nothing if not ENTER key (13) or TAB key (9)
      if (e.keyCode !== theme.keyboardKeys.ENTER && e.keyCode !== theme.keyboardKeys.TAB) {
        return;
      }

      const mediaId = e.currentTarget.getAttribute(attributes$s.thumbId);
      const activeSlide = this.container.querySelector(`[${attributes$s.mediaId}="${mediaId}"]`);
      const slideIndex = parseInt([...activeSlide.parentNode.children].indexOf(activeSlide));
      const slider = this.container.querySelector(selectors$K.productMediaSlider);
      const sliderNav = this.container.querySelector(selectors$K.productMediaThumbs);
      const flkty = Flickity.data(slider) || null;
      const flktyNav = Flickity.data(sliderNav) || null;

      // Go to the related slide media
      if (flkty && flkty.isActive && slideIndex > -1 && e.keyCode === theme.keyboardKeys.ENTER) {
        flkty.select(slideIndex);
      }

      // Move thumbs to the selected one
      if (flktyNav && flktyNav.isActive && slideIndex > -1) {
        flktyNav.select(slideIndex);
      }
    }

    switchMedia(mediaId) {
      const mediaItems = document.querySelectorAll(`${selectors$K.productMediaWrapper}`);
      const selectedMedia = this.container.querySelector(`${selectors$K.productMediaWrapper}[${attributes$s.mediaId}="${mediaId}"]`);
      const isFocusEnabled = !document.body.classList.contains(classes$y.noOutline);

      // Pause other media
      if (mediaItems.length) {
        mediaItems.forEach((media) => {
          media.dispatchEvent(new CustomEvent('theme:media:hidden'), {bubbles: true});
          media.classList.add(classes$y.mediaHidden);
        });
      }

      if (isFocusEnabled) {
        selectedMedia.focus();
      }

      selectedMedia.closest(selectors$K.productMediaSlider).classList.remove(classes$y.hasMediaActive);
      selectedMedia.classList.remove(classes$y.mediaHidden);
      selectedMedia.dispatchEvent(new CustomEvent('theme:media:visible'), {bubbles: true});

      // If media is not loaded, trigger poster button click to load it
      const deferredMedia = selectedMedia.querySelector(selectors$K.deferredMedia);
      if (deferredMedia && deferredMedia.getAttribute(attributes$s.loaded) !== 'true') {
        selectedMedia.querySelector(selectors$K.deferredMediaButton).dispatchEvent(new Event('click'));
      }
    }

    initMediaSwitch() {
      const productThumbImages = this.container.querySelectorAll(selectors$K.productMediaThumb);
      if (productThumbImages.length) {
        productThumbImages.forEach((el) => {
          el.addEventListener('keyup', this.handleMediaFocus.bind(this));
          el.addEventListener('click', (e) => {
            e.preventDefault();
          });
        });
      }
    }

    initProductVideo() {
      this.videos = new ProductVideo(this.container);
    }

    initProductModel() {
      const modelItems = this.container.querySelectorAll(selectors$K.productModel);
      if (modelItems.length) {
        modelItems.forEach((element) => {
          PaloAlto.ProductModel.init(element, this.sectionId);
        });
      }
    }

    initShopifyXrLaunch() {
      document.addEventListener('shopify_xr_launch', () => {
        const currentMedia = this.container.querySelector(`${selectors$K.productModel}:not(.${classes$y.mediaHidden})`);
        currentMedia.dispatchEvent(new CustomEvent('xrLaunch'));
      });
    }

    onUnload() {
      if (this.flktyNavResize !== null) {
        document.removeEventListener('theme:resize:width', this.flktyNavResize);
      }
    }

    scrollToReviews() {
      const productRating = this.container.querySelector(selectors$K.productRating);
      const events = ['click', 'keydown'];

      if (!productRating) {
        return;
      }

      events.forEach((eventName) => {
        productRating.addEventListener(eventName, (e) => {
          if (e.keyCode !== theme.keyboardKeys.ENTER || e.type != 'click') {
            const reviewsContainer = document.querySelector(selectors$K.productReviews);

            if (!reviewsContainer) {
              return;
            }

            reviewsContainer.scrollIntoView({behavior: 'smooth'});
          }
        });
      });
    }
  }

  const productSection = {
    onLoad() {
      sections$m[this.id] = new Product(this);
    },
    onUnload: function () {
      sections$m[this.id].onUnload();
    },
  };

  register('product-template', [productFormSection, productSection, swatchSection, shareButton, collapsible, tooltip, popoutSection]);
  register('featured-product', [productFormSection, productSection, swatchSection, shareButton, collapsible, tooltip, popoutSection]);

  const classes$z = {
    isDisabled: 'is-disabled',
  };

  const attributes$t = {
    circleTextParallax: 'data-circle-text-parallax',
  };

  class CircleText {
    constructor(el) {
      this.circleText = el;
      this.rotateDegree = 70;
      this.adjustRotateDegree = this.rotateDegree / 2; // We use this to keep the image upright when scrolling and it gets to the middle of the page

      this.scrollEvent = () => this.updateParallax();
      this.init();
    }

    init() {
      if (this.circleText.hasAttribute(attributes$t.circleTextParallax)) {
        document.addEventListener('theme:scroll', this.scrollEvent);
      }
    }

    updateParallax() {
      if (this.circleText.classList.contains(classes$z.isDisabled)) return;

      const windowHeight = Math.round(window.innerHeight);
      const scrollTop = Math.round(window.scrollY);
      const scrollBottom = scrollTop + windowHeight;
      const elementOffsetTopPoint = Math.round(this.circleText.getBoundingClientRect().top + scrollTop);
      const elementHeight = this.circleText.offsetHeight;
      const elementOffsetBottomPoint = elementOffsetTopPoint + elementHeight;
      const isBottomOfElementPassed = elementOffsetBottomPoint < scrollTop;
      const isTopOfElementReached = elementOffsetTopPoint < scrollBottom;
      const isInView = isTopOfElementReached && !isBottomOfElementPassed;

      if (isInView) {
        const scrollProgress = scrollBottom - elementOffsetTopPoint - elementHeight/2;
        const percentage = scrollProgress * 100 / windowHeight;
        let angle = this.rotateDegree * percentage / 100 * -1; // The -1 negates the value to have it rotate counterclockwise

        if (percentage > 0) {
          this.circleText.style.transform = `rotate(${this.adjustRotateDegree + angle}deg)`;
        }
      }
    }

    unload() {
      document.removeEventListener('theme:scroll', this.scrollEvent);
    }
  }

  const attributes$u = {
    href: 'href',
    mediaId: 'data-media-id',
  };

  const selectors$L = {
    deferredMedia: '[data-deferred-media]',
    deferredMediaButton: '[data-deferred-media-button]',
    productContentWrapper: '[data-product-content-wrapper]',
    productMediaWrapper: '[data-product-single-media-wrapper]',
    productModel: '[data-model]',
    productLink: '[data-product-link]',
    productSingleMediaImage: '[data-product-single-media-image]',
    sliderContents: '[data-slider-contents]',
    sliderImages: '[data-slider-images]',
    tabButton: '[data-tab-button]',
    tabItem: '[data-tab-item]',
    circleText: '[data-circle-text]',
  };

  const classes$A = {
    aosAnimate: 'aos-animate',
    tabButtonActive: 'products-list__nav__button--active',
    tabItemActive: 'products-list__item--active',
    mediaHidden: 'media--hidden',
    isDisabled: 'is-disabled',
  };

  const sections$n = {};

  class ProductsList {
    constructor(section) {
      this.container = section.container;
      this.sectionId = this.container.dataset.sectionId;
      this.tabButtons = this.container.querySelectorAll(selectors$L.tabButton);
      this.tabItems = this.container.querySelectorAll(selectors$L.tabItem);
      this.slidersImages = this.container.querySelectorAll(selectors$L.sliderImages);
      this.slidersContents = this.container.querySelectorAll(selectors$L.sliderContents);
      this.videos = {};
      this.flktyImages = null;
      this.flktyContent = null;
      this.sliderResizeEvent = () => this.resizeSlider();

      this.initButtons();
      this.initSliders();
      this.initProductVideo();
      this.initProductModel();
      this.initShopifyXrLaunch();
      this.initCircleText();
      this.listen();
    }

    listen() {
      if (this.slidersImages.length > 0 || this.slidersContents.length > 0) {
        document.addEventListener('theme:resize', this.sliderResizeEvent);
      }
    }

    resizeSlider() {
      if (this.flktyImages) {
        this.flktyImages.resize();
      }

      if (this.flktyContent) {
        this.flktyContent.resize();
      }
    }

    initButtons() {
      if (this.tabButtons.length) {
        this.tabButtons.forEach((tabButton) => {
          tabButton.addEventListener('click', (e) => {
            if (tabButton.classList.contains(classes$A.tabButtonActive)) {
              return;
            }

            const currentTabAnchor = tabButton.getAttribute(attributes$u.href);
            const currentTab = this.container.querySelector(currentTabAnchor);
            const currentMedia = currentTab.querySelector(selectors$L.productMediaWrapper);
            const mediaId = currentMedia ? currentMedia.dataset.mediaId : null;
            const currentCircleText = currentTab.querySelector(selectors$L.circleText);

            this.tabButtons.forEach((button) => {
              button.classList.remove(classes$A.tabButtonActive);
            });
            this.tabItems.forEach((item) => {
              const circleText = item.querySelector(selectors$L.circleText);
              item.classList.remove(classes$A.tabItemActive);
              circleText?.classList.add(classes$A.isDisabled);

              if (theme.settings.animations) {
                item.querySelectorAll(`.${classes$A.aosAnimate}`).forEach((element) => {
                  element.classList.remove(classes$A.aosAnimate);
                  setTimeout(() => {
                    element.classList.add(classes$A.aosAnimate);
                  });
                });
              }
            });

            tabButton.classList.add(classes$A.tabButtonActive);
            currentTab.classList.add(classes$A.tabItemActive);

            document.dispatchEvent(new Event('theme:resize')); // Trigger theme:resize event to refresh the slider height

            if (currentCircleText) {
              currentCircleText.classList.remove(classes$A.isDisabled);
              document.dispatchEvent(new Event('theme:scroll')); // Trigger theme:scroll event to refresh the circle-text values
            }

            if (mediaId) {
              this.switchMedia(mediaId);
            } else {
              this.pauseAllMedia();
            }

            e.preventDefault();
          });
        });
      }
    }

    initSliders() {
      this.slidersImages.forEach((sliderImages) => {
        this.flktyImages = new Flickity(sliderImages, {
          fade: true,
          sync: sliderImages.parentNode.querySelector(selectors$L.sliderContents),
          pageDots: false,
          prevNextButtons: true,
          wrapAround: true,
          adaptiveHeight: true,
        });

        this.flktyImages.on('settle', (index) => {
          const elements = sliderImages.querySelectorAll(selectors$L.productMediaWrapper);

          for (let i = 0; i < elements.length; i++) {
            if (i === index) {
              elements[i].querySelector(selectors$L.productSingleMediaImage).removeAttribute('tabindex');
            } else {
              elements[i].querySelector(selectors$L.productSingleMediaImage).setAttribute('tabindex', '-1');
            }
          }
        });
      });

      this.slidersContents.forEach((sliderContent) => {
        this.flktyContent = new Flickity(sliderContent, {
          fade: true,
          sync: sliderContent.parentNode.querySelector(selectors$L.sliderImages),
          pageDots: false,
          prevNextButtons: false,
          wrapAround: true,
          adaptiveHeight: true,
          autoPlay: 4000,
          pauseAutoPlayOnHover: true,
        });

        this.flktyContent.on('settle', (index) => {
          const elements = sliderContent.querySelectorAll(selectors$L.productContentWrapper);

          for (let i = 0; i < elements.length; i++) {
            if (i === index) {
              elements[i].querySelectorAll(selectors$L.productLink).forEach((element) => {
                element.removeAttribute('tabindex');
              });
            } else {
              elements[i].querySelectorAll(selectors$L.productLink).forEach((element) => {
                element.setAttribute('tabindex', '-1');
              });
            }
          }
        });
      });
    }

    initProductVideo() {
      this.videos = new ProductVideo(this.container);
    }

    initProductModel() {
      const modelItems = this.container.querySelectorAll(selectors$L.productModel);
      if (modelItems.length) {
        modelItems.forEach((element) => {
          PaloAlto.ProductModel.init(element, this.sectionId);
        });
      }
    }

    initShopifyXrLaunch() {
      document.addEventListener('shopify_xr_launch', () => {
        const currentMedia = this.container.querySelector(`${selectors$L.productModel}:not(.${classes$A.mediaHidden})`);
        currentMedia.dispatchEvent(new CustomEvent('xrLaunch'));
      });
    }

    switchMedia(mediaId) {
      const selectedMedia = this.container.querySelector(`${selectors$L.productMediaWrapper}[${attributes$u.mediaId}="${mediaId}"]`);
      const isFocusEnabled = !document.body.classList.contains(classes$A.noOutline);

      this.pauseAllMedia();

      if (isFocusEnabled) {
        selectedMedia.focus();
      }

      selectedMedia.classList.remove(classes$A.mediaHidden);
      selectedMedia.dispatchEvent(new CustomEvent('theme:media:visible'), {bubbles: true});

      // If media is not loaded, trigger poster button click to load it
      const deferredMedia = selectedMedia.querySelector(selectors$L.deferredMedia);
      if (deferredMedia && deferredMedia.getAttribute(attributes$u.loaded) !== 'true') {
        selectedMedia.querySelector(selectors$L.deferredMediaButton).dispatchEvent(new Event('click'));
      }
    }

    pauseAllMedia() {
      const mediaItems = document.querySelectorAll(`${selectors$L.productMediaWrapper}`);

      if (mediaItems.length) {
        mediaItems.forEach((media) => {
          media.dispatchEvent(new CustomEvent('theme:media:hidden'), {bubbles: true});
          media.classList.add(classes$A.mediaHidden);
        });
      }
    }

    initCircleText() {
      const elements = this.container.querySelectorAll(selectors$L.circleText);

      elements.forEach((circleText) => {
        new CircleText(circleText);
      });
    }

    onBlockSelect(evt) {
      // Show selected tab
      evt.target.dispatchEvent(new Event('click'));
    }

    onUnload() {
      document.removeEventListener('theme:resize', this.sliderResizeEvent);
    }
  }

  const productsListSection = {
    onLoad() {
      sections$n[this.id] = new ProductsList(this);
    },
    onUnload() {
      sections$n[this.id].onUnload();
    },
    onBlockSelect(e) {
      sections$n[this.id].onBlockSelect(e);
    },
  };

  register('products-list', productsListSection);

  const selectors$M = {
    product: '[data-product-block]',
    relatedProducts: '[data-related-products]',
  };

  const attributes$v = {
    sectionId: 'data-section-id',
    productId: 'data-product-id',
    limit: 'data-limit',
  };

  const sections$o = {};

  class RelatedProducts {
    constructor(container) {
      this.container = container;
      this.relatedProducts = this.container.querySelector(selectors$M.relatedProducts);

      this.init();
    }

    init() {
      const sectionId = this.container.getAttribute(attributes$v.sectionId);
      const productId = this.container.getAttribute(attributes$v.productId);
      const limit = this.container.getAttribute(attributes$v.limit);
      const requestUrl = `${theme.routes.product_recommendations_url}?section_id=${sectionId}&limit=${limit}&product_id=${productId}`;

      fetch(requestUrl)
        .then((response) => {
          return response.text();
        })
        .then((data) => {
          const createdElement = document.createElement('div');
          createdElement.innerHTML = data;
          const inner = createdElement.querySelector(selectors$M.relatedProducts);

          if (inner.querySelectorAll(selectors$M.product).length) {
            this.relatedProducts.innerHTML = inner.innerHTML;

            this.productGrid = new ProductGrid(this.container);
            this.gridSlider = new GridSlider(this.container);
            AOS.refreshHard();
          }
        });
    }

    /**
     * Event callback for Theme Editor `section:deselect` event
     */
    onDeselect() {
      if (this.productGrid) {
        this.productGrid.onDeselect();
      }
    }

    /**
     * Event callback for Theme Editor `section:unload` event
     */
    onUnload() {
      if (this.productGrid) {
        this.productGrid.onUnload();
      }

      if (this.gridSlider) {
        this.gridSlider.onUnload();
      }
    }
  }

  const RelatedProductsSection = {
    onLoad() {
      sections$o[this.id] = new RelatedProducts(this.container);
    },
    onDeselect() {
      sections$o[this.id].onDeselect();
    },
    onUnload() {
      sections$o[this.id].onUnload();
    },
  };

  register('related-products', RelatedProductsSection);

  const sections$p = {};

  const selectors$N = {
    slider: '[data-slider]',
    sliderItem: '[data-item]',
    buttonProductsShow: '[data-button-show]',
    buttonProductsHide: '[data-button-hide]',
    itemProducts: '[data-item-products]',
    itemProductSlider: '[data-item-products-slider]',
    itemProduct: '[data-item-product]',
    links: 'a, button',
  };

  const classes$B = {
    itemActive: 'blog-item--active',
    itemProductsVisible: 'blog-item__products--visible',
    featuredBlogSlider: 'shoppable-blog__slider',
    flickityEnabled: 'flickity-enabled',
    isSelected: 'is-selected',
  };

  const attributes$w = {
    slider: 'data-slider',
    slidePosition: 'data-slide-position',
    sectionId: 'data-section-id',
    tabIndex: 'tabindex',
  };

  class ShoppableBlog {
    constructor(section) {
      this.container = section.container;
      this.flkty = null;
      this.slider = this.container.querySelector(selectors$N.slider);
      this.checkSlidesSizeOnResize = () => this.checkSlidesSize();
      this.isFullWidth = this.container.hasAttribute(attributes$w.fullWidth);
      this.gutter = 0;
      this.clickOutsideItemEvent = (e) => {
        const clickOutsideSliderItem = !(e.target.matches(selectors$N.sliderItem) || e.target.closest(selectors$N.sliderItem));

        if (clickOutsideSliderItem) {
          const sliderItem = this.container.querySelectorAll(selectors$N.sliderItem);
          if (sliderItem.length) {
            sliderItem.forEach((item) => {
              const itemProducts = item.querySelector(selectors$N.itemProducts);
              if (itemProducts) {
                itemProducts.classList.remove(classes$B.itemProductsVisible);

                this.changeTabIndex(itemProducts);
              }
              item.classList.remove(classes$B.itemActive);
            });
          }
        }
      };

      this.bindButtons();
      this.listen();
    }

    initSlider() {
      this.flkty = new Flickity(this.slider, {
        prevNextButtons: true,
        pageDots: false,
        cellAlign: 'left',
        wrapAround: false,
        groupCells: true,
        contain: true,
        on: {
          ready: () => {
            this.handleFocus();
          },
        },
      });

      this.flkty.on('change', () => {
        const slides = this.container.querySelectorAll(selectors$N.sliderItem);

        this.handleFocus();

        if (slides.length) {
          slides.forEach((el) => {
            const itemProducts = el.querySelector(selectors$N.itemProducts);

            el.classList.remove(classes$B.itemActive);

            if (itemProducts) {
              el.querySelector(selectors$N.itemProducts).classList.remove(classes$B.itemProductsVisible);
            }
          });
        }

        if (this.flkty && !this.flkty.options.draggable) {
          this.flkty.options.draggable = true;
          this.flkty.updateDraggable();
        }
      });
    }

    destroySlider() {
      if (this.flkty !== null) {
        this.flkty.destroy();
        this.flkty = null;
      }
    }

    checkSlidesSize() {
      const sliderItemStyle = this.container.querySelector(selectors$N.sliderItem).currentStyle || window.getComputedStyle(this.container.querySelector(selectors$N.sliderItem));
      this.gutter = parseInt(sliderItemStyle.marginRight);
      const containerWidth = this.slider.offsetWidth + this.gutter;
      const itemsWidth = this.getItemsWidth();
      const itemsOverflowViewport = containerWidth < itemsWidth;

      if (window.innerWidth >= theme.sizes.small && itemsOverflowViewport) {
        this.initSlider();
      } else {
        this.destroySlider();
      }
    }

    getItemsWidth() {
      let itemsWidth = 0;
      const slides = this.slider.querySelectorAll(selectors$N.sliderItem);
      if (slides.length) {
        slides.forEach((item) => {
          itemsWidth += item.offsetWidth + this.gutter;
        });
      }

      return itemsWidth;
    }

    bindButtons() {
      const itemProductSlider = this.container.querySelectorAll(selectors$N.itemProductSlider);
      const buttonProductsShow = this.container.querySelectorAll(selectors$N.buttonProductsShow);
      const buttonProductsHide = this.container.querySelectorAll(selectors$N.buttonProductsHide);

      if (buttonProductsShow.length) {
        buttonProductsShow.forEach((button) => {
          button.addEventListener('click', (e) => {
            e.preventDefault();

            this.container.querySelectorAll(selectors$N.sliderItem).forEach((item) => {
              const itemProducts = item.querySelector(selectors$N.itemProducts);
              item.classList.remove(classes$B.itemActive);

              if (itemProducts) {
                itemProducts.classList.remove(classes$B.itemProductsVisible);

                this.changeTabIndex(itemProducts);
              }
            });

            const item = button.closest(selectors$N.sliderItem);
            const itemProducts = item.querySelector(selectors$N.itemProducts);
            item.classList.add(classes$B.itemActive);

            if (itemProducts) {
              itemProducts.classList.add(classes$B.itemProductsVisible);
              this.changeTabIndex(itemProducts, 'enable');

              const itemProductsSlider = itemProducts.querySelector(selectors$N.itemProductSlider);
              const allSlides = itemProductsSlider.querySelectorAll(selectors$N.itemProduct);
              const sliderActive = itemProductsSlider.classList.contains(classes$B.flickityEnabled);

              if (sliderActive) {
                const currentSlide = itemProductsSlider.querySelector(`.${classes$B.isSelected}`);
                const currentSlideIndex = currentSlide.getAttribute(attributes$w.slidePosition);

                allSlides.forEach((slide, i) => {
                  slide.setAttribute(attributes$w.tabIndex, i === currentSlideIndex ? '0' : '-1');
                });
              }
            }

            if (this.flkty !== null) {
              this.flkty.options.draggable = false;
              this.flkty.updateDraggable();
            }

            slate.a11y.state.trigger = button;
          });
        });
      }

      if (buttonProductsHide.length) {
        buttonProductsHide.forEach((button) => {
          button.addEventListener('click', (e) => {
            e.preventDefault();
            const item = button.closest(selectors$N.sliderItem);
            const itemProducts = item.querySelector(selectors$N.itemProducts);
            item.classList.remove(classes$B.itemActive);

            if (itemProducts) {
              itemProducts.classList.remove(classes$B.itemProductsVisible);

              this.changeTabIndex(itemProducts);
            }

            if (this.flkty !== null) {
              this.flkty.options.draggable = true;
              this.flkty.updateDraggable();
            }

            slate.a11y.state.trigger.focus();
          });
        });
      }

      if (itemProductSlider.length) {
        itemProductSlider.forEach((slider) => {
          const countSlides = slider.querySelectorAll(selectors$N.itemProduct).length;

          if (countSlides > 1) {
            const flktyProducts = new Flickity(slider, {
              prevNextButtons: true,
              contain: true,
              pageDots: false,
              wrapAround: true,
              on: {
                change: (index) => {
                  flktyProducts.cells.forEach((slide, i) => {
                    slide.element.querySelectorAll(selectors$N.links).forEach((link) => {
                      link.setAttribute(attributes$w.tabIndex, i === index ? '0' : '-1');
                    });
                  });
                },
              },
            });
          }
        });
      }

      this.slider.addEventListener('keyup', (e) => {
        if (e.keyCode === slate.utils.keyboardKeys.ESCAPE) {
          const sliderItem = e.target.hasAttribute(attributes$w.slider) ? e.target.querySelectorAll(selectors$N.sliderItem) : e.target.closest(selectors$N.slider).querySelectorAll(selectors$N.sliderItem);

          if (sliderItem.length) {
            sliderItem.forEach((item) => {
              const itemProducts = item.querySelector(selectors$N.itemProducts);
              item.classList.remove(classes$B.itemActive);
              if (itemProducts) {
                itemProducts.classList.remove(classes$B.itemProductsVisible);

                this.changeTabIndex(itemProducts);
              }
            });

            if (this.flkty) {
              this.flkty.options.draggable = true;
              this.flkty.updateDraggable();
            }
          }

          slate.a11y.state.trigger.focus();
        }
      });
    }

    handleFocus() {
      const sliderItems = this.container.querySelectorAll(selectors$N.sliderItem);

      if (sliderItems.length) {
        sliderItems.forEach((item) => {
          const selected = item.classList.contains(classes$B.isSelected);
          const itemProducts = item.querySelector(selectors$N.itemProducts);

          if (!selected) {
            this.changeTabIndex(item);

            if (itemProducts) {
              itemProducts.classList.remove(classes$B.itemProductsVisible);
            }
          } else {
            this.changeTabIndex(item, 'enable');

            if (itemProducts) {
              this.changeTabIndex(itemProducts);
            }
          }
        });
      }
    }

    listen() {
      if (this.slider) {
        this.checkSlidesSize();
        document.addEventListener('theme:resize:width', this.checkSlidesSizeOnResize);
      }

      document.addEventListener('mousedown', this.clickOutsideItemEvent);
    }

    changeTabIndex(items, state = '') {
      const tabIndex = state === 'enable' ? '0' : '-1';
      items.querySelectorAll(selectors$N.links).forEach((link) => {
        link.setAttribute(attributes$w.tabIndex, tabIndex);
      });
    }

    onBlockSelect(evt) {
      if (this.flkty !== null) {
        const index = parseInt([...evt.target.parentNode.children].indexOf(evt.target));
        const slidesPerPage = parseInt(this.flkty.slides[0].cells.length);
        const groupIndex = Math.floor(index / slidesPerPage);

        this.flkty.select(groupIndex);
      } else {
        const sliderStyle = this.slider.currentStyle || window.getComputedStyle(this.slider);
        const sliderPadding = parseInt(sliderStyle.paddingLeft);
        const blockPositionLeft = evt.target.offsetLeft - sliderPadding;

        // Native scroll to item
        this.slider.scrollTo({
          top: 0,
          left: blockPositionLeft,
          behavior: 'smooth',
        });
      }
    }

    onUnload() {
      document.removeEventListener('theme:resize:width', this.checkSlidesSizeOnResize);
      document.removeEventListener('mousedown', this.clickOutsideItemEvent);
    }
  }

  const shoppableBlogSection = {
    onLoad() {
      sections$p[this.id] = new ShoppableBlog(this);
    },
    onUnload(e) {
      sections$p[this.id].onUnload(e);
    },
    onBlockSelect(e) {
      sections$p[this.id].onBlockSelect(e);
    },
  };

  register('shoppable-blog', shoppableBlogSection);

  const selectors$O = {
    arrowScrollDown: '[data-scroll-down]',
    header: '[data-site-header]',
    item: '[data-slide]',
    links: 'a, button',
    main: '[data-main]',
    slider: '[data-slider]',
  };

  const attributes$x = {
    style: 'data-style',
    currentStyle: 'data-current-style',
    tabIndex: 'tabindex',
    slidePosition: 'data-slide-position',
  };

  const classes$C = {
    headerFixed: 'site-header--fixed',
  };

  const sections$q = {};

  class Slider {
    constructor(section) {
      this.container = section.container;
      this.header = document.querySelector(selectors$O.header);
      this.flkty = null;

      this.initSlider();
      this.initZoomAnimation();
      this.bindScrollButton();
    }

    initSlider() {
      const slidesCount = this.container.querySelectorAll(selectors$O.item).length;
      const duration = parseInt(this.container.dataset.duration);
      const pageDots = this.container.dataset.pageDots === 'true' && slidesCount > 1;
      const prevNextButtons = this.container.dataset.navArrows === 'true' && slidesCount > 1;
      const fade = this.container.dataset.transition !== 'slide';
      let autoplay = this.container.dataset.autoplay === 'true';

      if (autoplay) {
        autoplay = duration;
      }

      if (slidesCount > 1) {
        this.flkty = new Flickity(this.container, {
          fade: fade,
          cellSelector: selectors$O.item,
          autoPlay: autoplay,
          wrapAround: true,
          adaptiveHeight: true,
          setGallerySize: true,
          imagesLoaded: true,
          pageDots: pageDots,
          prevNextButtons: prevNextButtons,
          on: {
            ready: () => {
              const currentStyle = this.container.querySelector(`${selectors$O.item}[${attributes$x.slidePosition}="1"]`).getAttribute(attributes$x.style);
              this.container.setAttribute(attributes$x.currentStyle, currentStyle);
            },
            change: (index) => {
              const currentSlide = this.flkty.selectedElement;
              const currentStyle = currentSlide.getAttribute(attributes$x.style);

              this.container.setAttribute(attributes$x.currentStyle, currentStyle);

              this.flkty.cells.forEach((slide, i) => {
                slide.element.querySelectorAll(selectors$O.links).forEach((link) => {
                  link.setAttribute(attributes$x.tabIndex, i === index ? '0' : '-1');
                });
              });
            },
          },
        });

        // iOS smooth scrolling fix
        flickitySmoothScrolling(this.container);
      } else if (slidesCount === 1) {
        const currentStyle = this.container.querySelector(selectors$O.item).getAttribute(attributes$x.style);
        this.container.setAttribute(attributes$x.currentStyle, currentStyle);
      }
    }

    // Parallax effect to zoom image on scroll
    initZoomAnimation() {
      if (this.container.dataset.zoomAnimation !== 'true') {
        return;
      }

      // Target element to be observed.
      const observedElement = this.container;
      const firstSection = document.body.querySelector(selectors$O.main).children[0];
      const isFirstSection = this.container.parentNode === firstSection;
      const hasTransparentHeader = this.header.dataset.transparent == 'true';

      const renderZoomEffect = () => {
        const headerHeight = isFirstSection & hasTransparentHeader ? 0 : parseInt(this.header.dataset.height || this.header.offsetHeight);
        const rect = observedElement.getBoundingClientRect();
        const sectionHeight = observedElement.offsetHeight;
        const scrolled = isFirstSection ? headerHeight - rect.top : headerHeight - rect.top + window.innerHeight;
        const scrolledPercentage = scrolled / sectionHeight;
        let transitionSpeed = 0.1; // Set value between 0 and 1. Bigger value will make the zoom more aggressive
        if (isFirstSection) {
          transitionSpeed *= 1.5;
        }

        let scale = 1 + scrolledPercentage * transitionSpeed;

        // Prevent image scale down under 100%
        scale = scale > 1 ? scale : 1;
        observedElement.style.setProperty('--scale', scale);
      };

      renderZoomEffect();

      this.zoomOnScrollEvent = throttle(renderZoomEffect, 5);

      // Intersection Observer Configuration
      const observerOptions = {
        root: null,
        rootMargin: '0px', // important: needs units on all values
        threshold: 0,
      };

      // Intersection Observer Callback Function
      const intersectionCallback = (entry) => {
        if (entry[0].isIntersecting) {
          window.addEventListener('scroll', this.zoomOnScrollEvent);
        } else {
          window.removeEventListener('scroll', this.zoomOnScrollEvent);
        }
      };

      // Intersection Observer Constructor.
      const observer = new IntersectionObserver(intersectionCallback, observerOptions);

      observer.observe(observedElement);
    }

    // Scroll down function
    bindScrollButton() {
      const arrowDown = this.container.querySelector(selectors$O.arrowScrollDown);

      if (arrowDown) {
        arrowDown.addEventListener('click', (e) => {
          e.preventDefault();

          const headerHeight = this.header.classList.contains(classes$C.headerFixed) ? 60 : 0;
          const scrollToPosition = parseInt(Math.ceil(this.container.offsetTop + this.container.offsetHeight - headerHeight));

          window.scrollTo({
            top: scrollToPosition,
            left: 0,
            behavior: 'smooth',
          });
        });
      }
    }

    onBlockSelect(evt) {
      const index = parseInt([...evt.target.parentNode.children].indexOf(evt.target));

      if (this.flkty !== null) {
        this.flkty.select(index);
        this.flkty.pausePlayer();
      }
    }

    onBlockDeselect(evt) {
      const autoplay = evt.target.closest(selectors$O.slider).dataset.autoplay;
      if (autoplay && this.flkty !== null) {
        this.flkty.playPlayer();
      }
    }

    onUnload() {
      if (this.flkty !== null) {
        this.flkty.destroy();
        this.flkty = null;
      }

      if (this.zoomOnScrollEvent !== null) {
        window.removeEventListener('scroll', this.zoomOnScrollEvent);
      }
    }
  }

  const slider = {
    onLoad() {
      sections$q[this.id] = new Slider(this);
    },
    onUnload(e) {
      sections$q[this.id].onUnload(e);
    },
    onBlockSelect(e) {
      sections$q[this.id].onBlockSelect(e);
    },
    onBlockDeselect(e) {
      sections$q[this.id].onBlockDeselect(e);
    },
  };

  register('slider', [slider, videoPlay]);

  register('subcollections', gridSlider);

  const selectors$P = {
    scrollbar: '[data-custom-scrollbar]',
    scrollbarItems: '[data-custom-scrollbar-items]',
    scrollbarThumb: '[data-custom-scrollbar-thumb]',
  };

  class CustomScrollbar {
    constructor(container) {
      this.container = container;
      this.scrollbarItems = container.querySelector(selectors$P.scrollbarItems);
      this.scrollbar = container.querySelector(selectors$P.scrollbar);
      this.scrollbarThumb = container.querySelector(selectors$P.scrollbarThumb);
      this.trackWidth = 0;
      this.calcScrollbarEvent = () => this.calculateScrollbar();
      this.onScrollbarChangeEvent = (e) => this.onScrollbarChange(e);

      if (this.scrollbar && this.scrollbarItems) {
        this.events();
        this.calculateScrollbar();
        if (this.scrollbarItems.children.length) {
          this.calculateTrack(this.scrollbarItems.children[0]);
        }
      }
    }

    calculateTrack(element) {
      const thumbScale = element.clientWidth / this.scrollbarThumb.parentElement.clientWidth;
      const thumbPosition = element.offsetLeft / this.scrollbarThumb.parentElement.clientWidth;
      this.scrollbar.style.setProperty('--thumb-scale', thumbScale);
      this.scrollbar.style.setProperty('--thumb-position', `${this.trackWidth * thumbPosition}px`);
    }

    calculateScrollbar() {
      if (this.scrollbarItems.children.length) {
        const childrenArr = [...this.scrollbarItems.children];
        this.trackWidth = 0;

        childrenArr.forEach((element) => {
          this.trackWidth += element.getBoundingClientRect().width + parseInt(window.getComputedStyle(element).marginRight);
        });
        this.scrollbar.style.setProperty('--track-width', `${this.trackWidth}px`);
      }
    }

    onScrollbarChange(e) {
      if (e && e.detail && e.detail.element && this.container.contains(e.detail.element)) {
        this.calculateTrack(e.detail.element);
      }
    }

    events() {
      document.addEventListener('theme:resize:width', this.calcScrollbarEvent);
      document.addEventListener('theme:custom-scrollbar:change', this.onScrollbarChangeEvent);
    }

    unload() {
      document.removeEventListener('theme:resize:width', this.calcScrollbarEvent);
      document.removeEventListener('theme:custom-scrollbar:change', this.onScrollbarChangeEvent);
    }
  }

  const selectors$Q = {
    tabLink: '[data-tab-link]',
    tabContent: '[data-tab-content]',
    scrollable: '[data-custom-scrollbar]',
    scrollableHolder: '[data-custom-scrollbar-holder]',
    slider: '[data-slider]',
    tabsContents: '[data-tabs-contents]',
  };

  const classes$D = {
    current: 'current',
    hide: 'hide',
    alt: 'alt',
    aosAnimate: 'aos-animate',
    aosInit: 'aos-init',
  };

  const attributes$y = {
    tabLink: 'data-tab-link',
    tabContent: 'data-tab-content',
    tabStartIndex: 'data-start-index',
  };

  const sections$r = {};

  class Tabs {
    constructor(container) {
      this.container = container;
      this.tabsContents = container.querySelector(selectors$Q.tabsContents);
      this.animateElementsTimer = null;

      if (this.container) {
        this.scrollable = this.container.querySelector(`${selectors$Q.scrollable}`);

        this.init();
        this.initCustomScrollbar();
      }
    }

    init() {
      const tabsNavList = this.container.querySelectorAll(selectors$Q.tabLink);
      const firstTabLink = this.container.querySelector(`[${attributes$y.tabLink}="${this.container.hasAttribute(attributes$y.tabStartIndex) ? this.container.getAttribute(attributes$y.tabStartIndex) : 0}"]`);
      const firstTabContent = this.container.querySelector(
        `[${attributes$y.tabContent}="${this.container.hasAttribute(attributes$y.tabStartIndex) ? this.container.getAttribute(attributes$y.tabStartIndex) : 0}"]`
      );

      if (firstTabContent) {
        firstTabContent.classList.add(classes$D.current);
      }

      if (firstTabLink) {
        firstTabLink.classList.add(classes$D.current);
      }

      this.checkVisibleTabLinks();

      if (tabsNavList.length) {
        tabsNavList.forEach((element) => {
          const tabId = parseInt(element.getAttribute(attributes$y.tabLink));
          const tab = this.container.querySelector(`[${attributes$y.tabContent}="${tabId}"]`);

          element.addEventListener('click', () => {
            this.tabChange(element, tab);
          });

          element.addEventListener('keyup', (event) => {
            if (event.which === slate.utils.keyboardKeys.SPACE || event.which === slate.utils.keyboardKeys.ENTER) {
              this.tabChange(element, tab);
            }
          });
        });
      }
    }

    initCustomScrollbar() {
      if (!this.scrollable) {
        return;
      }

      this.customScrollbar = new CustomScrollbar(this.container);
    }

    tabChange(element, tab) {
      if (element.classList.contains(classes$D.current)) {
        return;
      }

      const parent = element.closest(selectors$Q.scrollableHolder) ? element.closest(selectors$Q.scrollableHolder) : element.parentElement;
      const parentPadding = parseInt(window.getComputedStyle(parent).getPropertyValue('padding-left'));
      const lastActiveTab = this.container.querySelector(`${selectors$Q.tabContent}.${classes$D.current}`);
      const lastActiveTabLink = this.container.querySelector(`${selectors$Q.tabLink}.${classes$D.current}`);
      const slider = tab.querySelector(selectors$Q.slider);

      lastActiveTab.classList.remove(classes$D.current);
      lastActiveTabLink.classList.remove(classes$D.current);
      element.classList.add(classes$D.current);
      tab.classList.add(classes$D.current);

      // Trigger theme:tab:change custom event to reset the selected tab slider position
      if (slider) {
        slider.dispatchEvent(new CustomEvent('theme:tab:change', {bubbles: false}));
      }

      // Scroll to current tab link
      parent.scrollTo({
        top: 0,
        left: element.offsetLeft - parent.offsetWidth / 2 + element.offsetWidth / 2 + parentPadding,
        behavior: 'smooth',
      });

      element.dispatchEvent(
        new CustomEvent('theme:custom-scrollbar:change', {
          bubbles: true,
          detail: {
            element: element,
          },
        })
      );

      // Trigger animations if they are enabled
      if (theme.settings.animations) {
        this.tabsContents.querySelectorAll(`.${classes$D.aosInit}`).forEach((element) => {
          element.classList.remove(classes$D.aosAnimate);
        });

        if (this.animateElementsTimer) {
          clearTimeout(this.animateElementsTimer);
        }

        this.animateElementsTimer = setTimeout(() => {
          tab.querySelectorAll(`.${classes$D.aosInit}`).forEach((element) => {
            element.classList.add(classes$D.aosAnimate);
          });
        }, 150);
      }

      if (element.classList.contains(classes$D.hide)) {
        tab.classList.add(classes$D.hide);
      }

      this.checkVisibleTabLinks();
    }

    checkVisibleTabLinks() {
      const tabsNavList = this.container.querySelectorAll(selectors$Q.tabLink);
      const tabsNavListHidden = this.container.querySelectorAll(`${selectors$Q.tabLink}.${classes$D.hide}`);
      const difference = tabsNavList.length - tabsNavListHidden.length;

      if (difference < 2) {
        this.container.classList.add(classes$D.alt);
      } else {
        this.container.classList.remove(classes$D.alt);
      }
    }

    onBlockSelect(evt) {
      const element = evt.target;
      if (element) {
        element.dispatchEvent(new Event('click'));

        element.parentNode.scrollTo({
          top: 0,
          left: element.offsetLeft - element.clientWidth,
          behavior: 'smooth',
        });
      }
    }

    onUnload() {
      if (this.customScrollbar) {
        this.customScrollbar.unload();
      }
    }
  }

  const tabs = {
    onLoad() {
      sections$r[this.id] = new Tabs(this.container);
    },
    onBlockSelect(e) {
      sections$r[this.id].onBlockSelect(e);
    },
    onUnload() {
      sections$r[this.id].onUnload();
    },
  };

  register('tab-collections', [productGrid, gridSlider, tabs]);

  const sections$s = {};

  const selectors$R = {
    slider: '[data-slider]',
    item: '[data-item]',
  };

  const classes$E = {
    flickityEnabled: 'flickity-enabled',
  };

  const attributes$z = {
    sectionId: 'data-section-id',
  };

  class Testimonials {
    constructor(section) {
      this.container = section.container;
      this.sectionId = this.container.getAttribute(attributes$z.sectionId);
      this.slider = this.container.querySelector(selectors$R.slider);
      this.sliderResizeEvent = () => this.initSlider();
      this.flkty = null;
      this.initSlider();

      document.addEventListener('theme:resize:width', this.sliderResizeEvent);
    }

    initSlider() {
      const slidesCount = this.slider.querySelectorAll(selectors$R.item).length;
      let flickityEnabled = this.slider.classList.contains(classes$E.flickityEnabled);
// console.log(this.slider)
      if ((slidesCount == 3 && window.innerWidth >= theme.sizes.large) ||
        (slidesCount == 2 && window.innerWidth >= theme.sizes.small) ||
        slidesCount == 1 || window.innerWidth < theme.sizes.small) {
      
        if (flickityEnabled) {
          this.flkty.destroy();
        }
      
        return;
      }

      // Destroy slider if there are 3 slides on desktop or 2 on tablet
      // Use native scrolling on mobile
      
      this.flkty = new Flickity(this.slider, {
        cellSelector: selectors$R.item,
        prevNextButtons: true,
        pageDots: false,
        groupCells: true,
        cellAlign: 'left',
        contain: true,
        adaptiveHeight: false,
        imagesLoaded: true
      });
      
      window.addEventListener('load', function() {
        console.log("Loaded..");
  
        
      })
      
    }

    onBlockSelect(evt) {
      if (this.flkty !== null) {
        const index = parseInt([...evt.target.parentNode.children].indexOf(evt.target));
        const slidesPerPage = parseInt(this.flkty.slides[0].cells.length);
        const groupIndex = Math.floor(index / slidesPerPage);

        this.flkty.select(groupIndex);
      } else {
        const sliderStyle = this.slider.currentStyle || window.getComputedStyle(this.slider);
        const sliderPadding = parseInt(sliderStyle.paddingLeft);
        const blockPositionLeft = evt.target.offsetLeft - sliderPadding;

        // Native scroll to item
        this.slider.scrollTo({
          top: 0,
          left: blockPositionLeft,
          behavior: 'smooth',
        });
      }
    }

    onUnload() {
      document.removeEventListener('theme:resize:width', this.sliderResizeEvent);
    }
  }


  const TestimonialsSection = {
    onLoad() {
      sections$s[this.id] = new Testimonials(this);
    },
    onUnload(e) {
      sections$s[this.id].onUnload(e);
    },
    onBlockSelect(e) {
      sections$s[this.id].onBlockSelect(e);
    },
  };

  register('testimonials', TestimonialsSection);

  // $.ajaxSetup({ cache: false });

  // document.documentElement.style.setProperty('--scrollbar-width', `${getScrollbarWidth()}px`);

  document.addEventListener('DOMContentLoaded', function () {
    // Load all registered sections on the page.
    load('*');

    const showAnimations = document.body.dataset.animations === 'true';
    if (showAnimations) {
      AOS.init({
        once: true,
        offset: 50,
        duration: 600,
        startEvent: 'load',
      });
    }

    //   PaloAlto.initFocusVisibility();
    //   PaloAlto.Drawer.init();

    //   document.addEventListener('theme:resize:width', PaloAlto.setMainSpacing);

    //   // We need to check if hash tag is different than #! because slate.a11y throws an error in this case
    //   const hash = window.location.hash;
    //   const elementId = hash.substr(1, hash.length);
    //   const element = document.getElementById(elementId);

    //   if (element !== null) {
    //     slate.a11y.pageLinkFocus($(window.location.hash));
    //   }

    //   const skipLink = document.querySelector('.in-page-link');
    //   if (skipLink) {
    //     skipLink.addEventListener('click', function(evt) {
    //       slate.a11y.pageLinkFocus($(evt.currentTarget.hash));
    //     });
    //   }

    // Safari smoothscroll polyfill
    const hasNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;

    if (!hasNativeSmoothScroll) {
      loadScript({url: theme.assets.smoothscroll});
    }
  });

  // PaloAlto.updateHash = function(hash) {
  //   window.location.hash = '#' + hash;
  //   $('#' + hash).attr('tabindex', -1).focus();
  // };

  // document.addEventListener('shopify:section:unload', () => {
  //   PaloAlto.Drawer.destroy();
  // });
  // document.addEventListener('shopify:section:load', () => {
  //   window.dispatchEvent(new Event('resize'), {bubbles: true});
  //   preventOverflow(document);
  //   PaloAlto.Drawer.init();
  // });

  // if (typeof theme.settings.newHash !== 'undefined') {
  //   PaloAlto.updateHash(theme.settings.newHash);
  // }

  // window.addEventListener('load', () => {
  //   preventOverflow(document);
  //   loadingAnimation();
  // });

}(themeVendor.AOS, themeVendor.Flickity, themeVendor.Sqrl, themeVendor.themeCurrency, themeVendor.ajaxinate));
//# sourceMappingURL=theme.js.map
window.slate = window.slate || {};
window.theme = window.theme || {};

/*= =============== Vendor ================*/
/*! jQuery v3.5.1 | (c) JS Foundation and other contributors | jquery.org/license */
!function(e,t){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(C,e){"use strict";var t=[],r=Object.getPrototypeOf,s=t.slice,g=t.flat?function(e){return t.flat.call(e)}:function(e){return t.concat.apply([],e)},u=t.push,i=t.indexOf,n={},o=n.toString,v=n.hasOwnProperty,a=v.toString,l=a.call(Object),y={},m=function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},x=function(e){return null!=e&&e===e.window},E=C.document,c={type:!0,src:!0,nonce:!0,noModule:!0};function b(e,t,n){var r,i,o=(n=n||E).createElement("script");if(o.text=e,t)for(r in c)(i=t[r]||t.getAttribute&&t.getAttribute(r))&&o.setAttribute(r,i);n.head.appendChild(o).parentNode.removeChild(o)}function w(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?n[o.call(e)]||"object":typeof e}var f="3.5.1",S=function(e,t){return new S.fn.init(e,t)};function p(e){var t=!!e&&"length"in e&&e.length,n=w(e);return!m(e)&&!x(e)&&("array"===n||0===t||"number"==typeof t&&0<t&&t-1 in e)}S.fn=S.prototype={jquery:f,constructor:S,length:0,toArray:function(){return s.call(this)},get:function(e){return null==e?s.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){var t=S.merge(this.constructor(),e);return t.prevObject=this,t},each:function(e){return S.each(this,e)},map:function(n){return this.pushStack(S.map(this,function(e,t){return n.call(e,t,e)}))},slice:function(){return this.pushStack(s.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},even:function(){return this.pushStack(S.grep(this,function(e,t){return(t+1)%2}))},odd:function(){return this.pushStack(S.grep(this,function(e,t){return t%2}))},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(0<=n&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:u,sort:t.sort,splice:t.splice},S.extend=S.fn.extend=function(){var e,t,n,r,i,o,a=arguments[0]||{},s=1,u=arguments.length,l=!1;for("boolean"==typeof a&&(l=a,a=arguments[s]||{},s++),"object"==typeof a||m(a)||(a={}),s===u&&(a=this,s--);s<u;s++)if(null!=(e=arguments[s]))for(t in e)r=e[t],"__proto__"!==t&&a!==r&&(l&&r&&(S.isPlainObject(r)||(i=Array.isArray(r)))?(n=a[t],o=i&&!Array.isArray(n)?[]:i||S.isPlainObject(n)?n:{},i=!1,a[t]=S.extend(l,o,r)):void 0!==r&&(a[t]=r));return a},S.extend({expando:"jQuery"+(f+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isPlainObject:function(e){var t,n;return!(!e||"[object Object]"!==o.call(e))&&(!(t=r(e))||"function"==typeof(n=v.call(t,"constructor")&&t.constructor)&&a.call(n)===l)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},globalEval:function(e,t,n){b(e,{nonce:t&&t.nonce},n)},each:function(e,t){var n,r=0;if(p(e)){for(n=e.length;r<n;r++)if(!1===t.call(e[r],r,e[r]))break}else for(r in e)if(!1===t.call(e[r],r,e[r]))break;return e},makeArray:function(e,t){var n=t||[];return null!=e&&(p(Object(e))?S.merge(n,"string"==typeof e?[e]:e):u.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:i.call(t,e,n)},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;r<n;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){for(var r=[],i=0,o=e.length,a=!n;i<o;i++)!t(e[i],i)!==a&&r.push(e[i]);return r},map:function(e,t,n){var r,i,o=0,a=[];if(p(e))for(r=e.length;o<r;o++)null!=(i=t(e[o],o,n))&&a.push(i);else for(o in e)null!=(i=t(e[o],o,n))&&a.push(i);return g(a)},guid:1,support:y}),"function"==typeof Symbol&&(S.fn[Symbol.iterator]=t[Symbol.iterator]),S.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,t){n["[object "+t+"]"]=t.toLowerCase()});var d=function(n){var e,d,b,o,i,h,f,g,w,u,l,T,C,a,E,v,s,c,y,S="sizzle"+1*new Date,p=n.document,k=0,r=0,m=ue(),x=ue(),A=ue(),N=ue(),D=function(e,t){return e===t&&(l=!0),0},j={}.hasOwnProperty,t=[],q=t.pop,L=t.push,H=t.push,O=t.slice,P=function(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1},R="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",I="(?:\\\\[\\da-fA-F]{1,6}"+M+"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",W="\\["+M+"*("+I+")(?:"+M+"*([*^$|!~]?=)"+M+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+I+"))|)"+M+"*\\]",F=":("+I+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+W+")*)|.*)\\)|)",B=new RegExp(M+"+","g"),$=new RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),_=new RegExp("^"+M+"*,"+M+"*"),z=new RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=new RegExp(M+"|>"),X=new RegExp(F),V=new RegExp("^"+I+"$"),G={ID:new RegExp("^#("+I+")"),CLASS:new RegExp("^\\.("+I+")"),TAG:new RegExp("^("+I+"|[*])"),ATTR:new RegExp("^"+W),PSEUDO:new RegExp("^"+F),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:new RegExp("^(?:"+R+")$","i"),needsContext:new RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Y=/HTML$/i,Q=/^(?:input|select|textarea|button)$/i,J=/^h\d$/i,K=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ee=/[+~]/,te=new RegExp("\\\\[\\da-fA-F]{1,6}"+M+"?|\\\\([^\\r\\n\\f])","g"),ne=function(e,t){var n="0x"+e.slice(1)-65536;return t||(n<0?String.fromCharCode(n+65536):String.fromCharCode(n>>10|55296,1023&n|56320))},re=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ie=function(e,t){return t?"\0"===e?"\ufffd":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e},oe=function(){T()},ae=be(function(e){return!0===e.disabled&&"fieldset"===e.nodeName.toLowerCase()},{dir:"parentNode",next:"legend"});try{H.apply(t=O.call(p.childNodes),p.childNodes),t[p.childNodes.length].nodeType}catch(e){H={apply:t.length?function(e,t){L.apply(e,O.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function se(t,e,n,r){var i,o,a,s,u,l,c,f=e&&e.ownerDocument,p=e?e.nodeType:9;if(n=n||[],"string"!=typeof t||!t||1!==p&&9!==p&&11!==p)return n;if(!r&&(T(e),e=e||C,E)){if(11!==p&&(u=Z.exec(t)))if(i=u[1]){if(9===p){if(!(a=e.getElementById(i)))return n;if(a.id===i)return n.push(a),n}else if(f&&(a=f.getElementById(i))&&y(e,a)&&a.id===i)return n.push(a),n}else{if(u[2])return H.apply(n,e.getElementsByTagName(t)),n;if((i=u[3])&&d.getElementsByClassName&&e.getElementsByClassName)return H.apply(n,e.getElementsByClassName(i)),n}if(d.qsa&&!N[t+" "]&&(!v||!v.test(t))&&(1!==p||"object"!==e.nodeName.toLowerCase())){if(c=t,f=e,1===p&&(U.test(t)||z.test(t))){(f=ee.test(t)&&ye(e.parentNode)||e)===e&&d.scope||((s=e.getAttribute("id"))?s=s.replace(re,ie):e.setAttribute("id",s=S)),o=(l=h(t)).length;while(o--)l[o]=(s?"#"+s:":scope")+" "+xe(l[o]);c=l.join(",")}try{return H.apply(n,f.querySelectorAll(c)),n}catch(e){N(t,!0)}finally{s===S&&e.removeAttribute("id")}}}return g(t.replace($,"$1"),e,n,r)}function ue(){var r=[];return function e(t,n){return r.push(t+" ")>b.cacheLength&&delete e[r.shift()],e[t+" "]=n}}function le(e){return e[S]=!0,e}function ce(e){var t=C.createElement("fieldset");try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function fe(e,t){var n=e.split("|"),r=n.length;while(r--)b.attrHandle[n[r]]=t}function pe(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&e.sourceIndex-t.sourceIndex;if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function de(t){return function(e){return"input"===e.nodeName.toLowerCase()&&e.type===t}}function he(n){return function(e){var t=e.nodeName.toLowerCase();return("input"===t||"button"===t)&&e.type===n}}function ge(t){return function(e){return"form"in e?e.parentNode&&!1===e.disabled?"label"in e?"label"in e.parentNode?e.parentNode.disabled===t:e.disabled===t:e.isDisabled===t||e.isDisabled!==!t&&ae(e)===t:e.disabled===t:"label"in e&&e.disabled===t}}function ve(a){return le(function(o){return o=+o,le(function(e,t){var n,r=a([],e.length,o),i=r.length;while(i--)e[n=r[i]]&&(e[n]=!(t[n]=e[n]))})})}function ye(e){return e&&"undefined"!=typeof e.getElementsByTagName&&e}for(e in d=se.support={},i=se.isXML=function(e){var t=e.namespaceURI,n=(e.ownerDocument||e).documentElement;return!Y.test(t||n&&n.nodeName||"HTML")},T=se.setDocument=function(e){var t,n,r=e?e.ownerDocument||e:p;return r!=C&&9===r.nodeType&&r.documentElement&&(a=(C=r).documentElement,E=!i(C),p!=C&&(n=C.defaultView)&&n.top!==n&&(n.addEventListener?n.addEventListener("unload",oe,!1):n.attachEvent&&n.attachEvent("onunload",oe)),d.scope=ce(function(e){return a.appendChild(e).appendChild(C.createElement("div")),"undefined"!=typeof e.querySelectorAll&&!e.querySelectorAll(":scope fieldset div").length}),d.attributes=ce(function(e){return e.className="i",!e.getAttribute("className")}),d.getElementsByTagName=ce(function(e){return e.appendChild(C.createComment("")),!e.getElementsByTagName("*").length}),d.getElementsByClassName=K.test(C.getElementsByClassName),d.getById=ce(function(e){return a.appendChild(e).id=S,!C.getElementsByName||!C.getElementsByName(S).length}),d.getById?(b.filter.ID=function(e){var t=e.replace(te,ne);return function(e){return e.getAttribute("id")===t}},b.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&E){var n=t.getElementById(e);return n?[n]:[]}}):(b.filter.ID=function(e){var n=e.replace(te,ne);return function(e){var t="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return t&&t.value===n}},b.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&E){var n,r,i,o=t.getElementById(e);if(o){if((n=o.getAttributeNode("id"))&&n.value===e)return[o];i=t.getElementsByName(e),r=0;while(o=i[r++])if((n=o.getAttributeNode("id"))&&n.value===e)return[o]}return[]}}),b.find.TAG=d.getElementsByTagName?function(e,t){return"undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):d.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},b.find.CLASS=d.getElementsByClassName&&function(e,t){if("undefined"!=typeof t.getElementsByClassName&&E)return t.getElementsByClassName(e)},s=[],v=[],(d.qsa=K.test(C.querySelectorAll))&&(ce(function(e){var t;a.appendChild(e).innerHTML="<a id='"+S+"'></a><select id='"+S+"-\r\\' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&v.push("[*^$]="+M+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||v.push("\\["+M+"*(?:value|"+R+")"),e.querySelectorAll("[id~="+S+"-]").length||v.push("~="),(t=C.createElement("input")).setAttribute("name",""),e.appendChild(t),e.querySelectorAll("[name='']").length||v.push("\\["+M+"*name"+M+"*="+M+"*(?:''|\"\")"),e.querySelectorAll(":checked").length||v.push(":checked"),e.querySelectorAll("a#"+S+"+*").length||v.push(".#.+[+~]"),e.querySelectorAll("\\\f"),v.push("[\\r\\n\\f]")}),ce(function(e){e.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t=C.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&v.push("name"+M+"*[*^$|!~]?="),2!==e.querySelectorAll(":enabled").length&&v.push(":enabled",":disabled"),a.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&v.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),v.push(",.*:")})),(d.matchesSelector=K.test(c=a.matches||a.webkitMatchesSelector||a.mozMatchesSelector||a.oMatchesSelector||a.msMatchesSelector))&&ce(function(e){d.disconnectedMatch=c.call(e,"*"),c.call(e,"[s!='']:x"),s.push("!=",F)}),v=v.length&&new RegExp(v.join("|")),s=s.length&&new RegExp(s.join("|")),t=K.test(a.compareDocumentPosition),y=t||K.test(a.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},D=t?function(e,t){if(e===t)return l=!0,0;var n=!e.compareDocumentPosition-!t.compareDocumentPosition;return n||(1&(n=(e.ownerDocument||e)==(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!d.sortDetached&&t.compareDocumentPosition(e)===n?e==C||e.ownerDocument==p&&y(p,e)?-1:t==C||t.ownerDocument==p&&y(p,t)?1:u?P(u,e)-P(u,t):0:4&n?-1:1)}:function(e,t){if(e===t)return l=!0,0;var n,r=0,i=e.parentNode,o=t.parentNode,a=[e],s=[t];if(!i||!o)return e==C?-1:t==C?1:i?-1:o?1:u?P(u,e)-P(u,t):0;if(i===o)return pe(e,t);n=e;while(n=n.parentNode)a.unshift(n);n=t;while(n=n.parentNode)s.unshift(n);while(a[r]===s[r])r++;return r?pe(a[r],s[r]):a[r]==p?-1:s[r]==p?1:0}),C},se.matches=function(e,t){return se(e,null,null,t)},se.matchesSelector=function(e,t){if(T(e),d.matchesSelector&&E&&!N[t+" "]&&(!s||!s.test(t))&&(!v||!v.test(t)))try{var n=c.call(e,t);if(n||d.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(e){N(t,!0)}return 0<se(t,C,null,[e]).length},se.contains=function(e,t){return(e.ownerDocument||e)!=C&&T(e),y(e,t)},se.attr=function(e,t){(e.ownerDocument||e)!=C&&T(e);var n=b.attrHandle[t.toLowerCase()],r=n&&j.call(b.attrHandle,t.toLowerCase())?n(e,t,!E):void 0;return void 0!==r?r:d.attributes||!E?e.getAttribute(t):(r=e.getAttributeNode(t))&&r.specified?r.value:null},se.escape=function(e){return(e+"").replace(re,ie)},se.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},se.uniqueSort=function(e){var t,n=[],r=0,i=0;if(l=!d.detectDuplicates,u=!d.sortStable&&e.slice(0),e.sort(D),l){while(t=e[i++])t===e[i]&&(r=n.push(i));while(r--)e.splice(n[r],1)}return u=null,e},o=se.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else while(t=e[r++])n+=o(t);return n},(b=se.selectors={cacheLength:50,createPseudo:le,match:G,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(te,ne),e[3]=(e[3]||e[4]||e[5]||"").replace(te,ne),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||se.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&se.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return G.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&X.test(n)&&(t=h(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(te,ne).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=m[e+" "];return t||(t=new RegExp("(^|"+M+")"+e+"("+M+"|$)"))&&m(e,function(e){return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(n,r,i){return function(e){var t=se.attr(e,n);return null==t?"!="===r:!r||(t+="","="===r?t===i:"!="===r?t!==i:"^="===r?i&&0===t.indexOf(i):"*="===r?i&&-1<t.indexOf(i):"$="===r?i&&t.slice(-i.length)===i:"~="===r?-1<(" "+t.replace(B," ")+" ").indexOf(i):"|="===r&&(t===i||t.slice(0,i.length+1)===i+"-"))}},CHILD:function(h,e,t,g,v){var y="nth"!==h.slice(0,3),m="last"!==h.slice(-4),x="of-type"===e;return 1===g&&0===v?function(e){return!!e.parentNode}:function(e,t,n){var r,i,o,a,s,u,l=y!==m?"nextSibling":"previousSibling",c=e.parentNode,f=x&&e.nodeName.toLowerCase(),p=!n&&!x,d=!1;if(c){if(y){while(l){a=e;while(a=a[l])if(x?a.nodeName.toLowerCase()===f:1===a.nodeType)return!1;u=l="only"===h&&!u&&"nextSibling"}return!0}if(u=[m?c.firstChild:c.lastChild],m&&p){d=(s=(r=(i=(o=(a=c)[S]||(a[S]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]||[])[0]===k&&r[1])&&r[2],a=s&&c.childNodes[s];while(a=++s&&a&&a[l]||(d=s=0)||u.pop())if(1===a.nodeType&&++d&&a===e){i[h]=[k,s,d];break}}else if(p&&(d=s=(r=(i=(o=(a=e)[S]||(a[S]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]||[])[0]===k&&r[1]),!1===d)while(a=++s&&a&&a[l]||(d=s=0)||u.pop())if((x?a.nodeName.toLowerCase()===f:1===a.nodeType)&&++d&&(p&&((i=(o=a[S]||(a[S]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]=[k,d]),a===e))break;return(d-=v)===g||d%g==0&&0<=d/g}}},PSEUDO:function(e,o){var t,a=b.pseudos[e]||b.setFilters[e.toLowerCase()]||se.error("unsupported pseudo: "+e);return a[S]?a(o):1<a.length?(t=[e,e,"",o],b.setFilters.hasOwnProperty(e.toLowerCase())?le(function(e,t){var n,r=a(e,o),i=r.length;while(i--)e[n=P(e,r[i])]=!(t[n]=r[i])}):function(e){return a(e,0,t)}):a}},pseudos:{not:le(function(e){var r=[],i=[],s=f(e.replace($,"$1"));return s[S]?le(function(e,t,n,r){var i,o=s(e,null,r,[]),a=e.length;while(a--)(i=o[a])&&(e[a]=!(t[a]=i))}):function(e,t,n){return r[0]=e,s(r,null,n,i),r[0]=null,!i.pop()}}),has:le(function(t){return function(e){return 0<se(t,e).length}}),contains:le(function(t){return t=t.replace(te,ne),function(e){return-1<(e.textContent||o(e)).indexOf(t)}}),lang:le(function(n){return V.test(n||"")||se.error("unsupported lang: "+n),n=n.replace(te,ne).toLowerCase(),function(e){var t;do{if(t=E?e.lang:e.getAttribute("xml:lang")||e.getAttribute("lang"))return(t=t.toLowerCase())===n||0===t.indexOf(n+"-")}while((e=e.parentNode)&&1===e.nodeType);return!1}}),target:function(e){var t=n.location&&n.location.hash;return t&&t.slice(1)===e.id},root:function(e){return e===a},focus:function(e){return e===C.activeElement&&(!C.hasFocus||C.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:ge(!1),disabled:ge(!0),checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!b.pseudos.empty(e)},header:function(e){return J.test(e.nodeName)},input:function(e){return Q.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:ve(function(){return[0]}),last:ve(function(e,t){return[t-1]}),eq:ve(function(e,t,n){return[n<0?n+t:n]}),even:ve(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:ve(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:ve(function(e,t,n){for(var r=n<0?n+t:t<n?t:n;0<=--r;)e.push(r);return e}),gt:ve(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}}).pseudos.nth=b.pseudos.eq,{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})b.pseudos[e]=de(e);for(e in{submit:!0,reset:!0})b.pseudos[e]=he(e);function me(){}function xe(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function be(s,e,t){var u=e.dir,l=e.next,c=l||u,f=t&&"parentNode"===c,p=r++;return e.first?function(e,t,n){while(e=e[u])if(1===e.nodeType||f)return s(e,t,n);return!1}:function(e,t,n){var r,i,o,a=[k,p];if(n){while(e=e[u])if((1===e.nodeType||f)&&s(e,t,n))return!0}else while(e=e[u])if(1===e.nodeType||f)if(i=(o=e[S]||(e[S]={}))[e.uniqueID]||(o[e.uniqueID]={}),l&&l===e.nodeName.toLowerCase())e=e[u]||e;else{if((r=i[c])&&r[0]===k&&r[1]===p)return a[2]=r[2];if((i[c]=a)[2]=s(e,t,n))return!0}return!1}}function we(i){return 1<i.length?function(e,t,n){var r=i.length;while(r--)if(!i[r](e,t,n))return!1;return!0}:i[0]}function Te(e,t,n,r,i){for(var o,a=[],s=0,u=e.length,l=null!=t;s<u;s++)(o=e[s])&&(n&&!n(o,r,i)||(a.push(o),l&&t.push(s)));return a}function Ce(d,h,g,v,y,e){return v&&!v[S]&&(v=Ce(v)),y&&!y[S]&&(y=Ce(y,e)),le(function(e,t,n,r){var i,o,a,s=[],u=[],l=t.length,c=e||function(e,t,n){for(var r=0,i=t.length;r<i;r++)se(e,t[r],n);return n}(h||"*",n.nodeType?[n]:n,[]),f=!d||!e&&h?c:Te(c,s,d,n,r),p=g?y||(e?d:l||v)?[]:t:f;if(g&&g(f,p,n,r),v){i=Te(p,u),v(i,[],n,r),o=i.length;while(o--)(a=i[o])&&(p[u[o]]=!(f[u[o]]=a))}if(e){if(y||d){if(y){i=[],o=p.length;while(o--)(a=p[o])&&i.push(f[o]=a);y(null,p=[],i,r)}o=p.length;while(o--)(a=p[o])&&-1<(i=y?P(e,a):s[o])&&(e[i]=!(t[i]=a))}}else p=Te(p===t?p.splice(l,p.length):p),y?y(null,t,p,r):H.apply(t,p)})}function Ee(e){for(var i,t,n,r=e.length,o=b.relative[e[0].type],a=o||b.relative[" "],s=o?1:0,u=be(function(e){return e===i},a,!0),l=be(function(e){return-1<P(i,e)},a,!0),c=[function(e,t,n){var r=!o&&(n||t!==w)||((i=t).nodeType?u(e,t,n):l(e,t,n));return i=null,r}];s<r;s++)if(t=b.relative[e[s].type])c=[be(we(c),t)];else{if((t=b.filter[e[s].type].apply(null,e[s].matches))[S]){for(n=++s;n<r;n++)if(b.relative[e[n].type])break;return Ce(1<s&&we(c),1<s&&xe(e.slice(0,s-1).concat({value:" "===e[s-2].type?"*":""})).replace($,"$1"),t,s<n&&Ee(e.slice(s,n)),n<r&&Ee(e=e.slice(n)),n<r&&xe(e))}c.push(t)}return we(c)}return me.prototype=b.filters=b.pseudos,b.setFilters=new me,h=se.tokenize=function(e,t){var n,r,i,o,a,s,u,l=x[e+" "];if(l)return t?0:l.slice(0);a=e,s=[],u=b.preFilter;while(a){for(o in n&&!(r=_.exec(a))||(r&&(a=a.slice(r[0].length)||a),s.push(i=[])),n=!1,(r=z.exec(a))&&(n=r.shift(),i.push({value:n,type:r[0].replace($," ")}),a=a.slice(n.length)),b.filter)!(r=G[o].exec(a))||u[o]&&!(r=u[o](r))||(n=r.shift(),i.push({value:n,type:o,matches:r}),a=a.slice(n.length));if(!n)break}return t?a.length:a?se.error(e):x(e,s).slice(0)},f=se.compile=function(e,t){var n,v,y,m,x,r,i=[],o=[],a=A[e+" "];if(!a){t||(t=h(e)),n=t.length;while(n--)(a=Ee(t[n]))[S]?i.push(a):o.push(a);(a=A(e,(v=o,m=0<(y=i).length,x=0<v.length,r=function(e,t,n,r,i){var o,a,s,u=0,l="0",c=e&&[],f=[],p=w,d=e||x&&b.find.TAG("*",i),h=k+=null==p?1:Math.random()||.1,g=d.length;for(i&&(w=t==C||t||i);l!==g&&null!=(o=d[l]);l++){if(x&&o){a=0,t||o.ownerDocument==C||(T(o),n=!E);while(s=v[a++])if(s(o,t||C,n)){r.push(o);break}i&&(k=h)}m&&((o=!s&&o)&&u--,e&&c.push(o))}if(u+=l,m&&l!==u){a=0;while(s=y[a++])s(c,f,t,n);if(e){if(0<u)while(l--)c[l]||f[l]||(f[l]=q.call(r));f=Te(f)}H.apply(r,f),i&&!e&&0<f.length&&1<u+y.length&&se.uniqueSort(r)}return i&&(k=h,w=p),c},m?le(r):r))).selector=e}return a},g=se.select=function(e,t,n,r){var i,o,a,s,u,l="function"==typeof e&&e,c=!r&&h(e=l.selector||e);if(n=n||[],1===c.length){if(2<(o=c[0]=c[0].slice(0)).length&&"ID"===(a=o[0]).type&&9===t.nodeType&&E&&b.relative[o[1].type]){if(!(t=(b.find.ID(a.matches[0].replace(te,ne),t)||[])[0]))return n;l&&(t=t.parentNode),e=e.slice(o.shift().value.length)}i=G.needsContext.test(e)?0:o.length;while(i--){if(a=o[i],b.relative[s=a.type])break;if((u=b.find[s])&&(r=u(a.matches[0].replace(te,ne),ee.test(o[0].type)&&ye(t.parentNode)||t))){if(o.splice(i,1),!(e=r.length&&xe(o)))return H.apply(n,r),n;break}}}return(l||f(e,c))(r,t,!E,n,!t||ee.test(e)&&ye(t.parentNode)||t),n},d.sortStable=S.split("").sort(D).join("")===S,d.detectDuplicates=!!l,T(),d.sortDetached=ce(function(e){return 1&e.compareDocumentPosition(C.createElement("fieldset"))}),ce(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||fe("type|href|height|width",function(e,t,n){if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),d.attributes&&ce(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||fe("value",function(e,t,n){if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue}),ce(function(e){return null==e.getAttribute("disabled")})||fe(R,function(e,t,n){var r;if(!n)return!0===e[t]?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),se}(C);S.find=d,S.expr=d.selectors,S.expr[":"]=S.expr.pseudos,S.uniqueSort=S.unique=d.uniqueSort,S.text=d.getText,S.isXMLDoc=d.isXML,S.contains=d.contains,S.escapeSelector=d.escape;var h=function(e,t,n){var r=[],i=void 0!==n;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&S(e).is(n))break;r.push(e)}return r},T=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},k=S.expr.match.needsContext;function A(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}var N=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function D(e,n,r){return m(n)?S.grep(e,function(e,t){return!!n.call(e,t,e)!==r}):n.nodeType?S.grep(e,function(e){return e===n!==r}):"string"!=typeof n?S.grep(e,function(e){return-1<i.call(n,e)!==r}):S.filter(n,e,r)}S.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?S.find.matchesSelector(r,e)?[r]:[]:S.find.matches(e,S.grep(t,function(e){return 1===e.nodeType}))},S.fn.extend({find:function(e){var t,n,r=this.length,i=this;if("string"!=typeof e)return this.pushStack(S(e).filter(function(){for(t=0;t<r;t++)if(S.contains(i[t],this))return!0}));for(n=this.pushStack([]),t=0;t<r;t++)S.find(e,i[t],n);return 1<r?S.uniqueSort(n):n},filter:function(e){return this.pushStack(D(this,e||[],!1))},not:function(e){return this.pushStack(D(this,e||[],!0))},is:function(e){return!!D(this,"string"==typeof e&&k.test(e)?S(e):e||[],!1).length}});var j,q=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(S.fn.init=function(e,t,n){var r,i;if(!e)return this;if(n=n||j,"string"==typeof e){if(!(r="<"===e[0]&&">"===e[e.length-1]&&3<=e.length?[null,e,null]:q.exec(e))||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(r[1]){if(t=t instanceof S?t[0]:t,S.merge(this,S.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:E,!0)),N.test(r[1])&&S.isPlainObject(t))for(r in t)m(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return(i=E.getElementById(r[2]))&&(this[0]=i,this.length=1),this}return e.nodeType?(this[0]=e,this.length=1,this):m(e)?void 0!==n.ready?n.ready(e):e(S):S.makeArray(e,this)}).prototype=S.fn,j=S(E);var L=/^(?:parents|prev(?:Until|All))/,H={children:!0,contents:!0,next:!0,prev:!0};function O(e,t){while((e=e[t])&&1!==e.nodeType);return e}S.fn.extend({has:function(e){var t=S(e,this),n=t.length;return this.filter(function(){for(var e=0;e<n;e++)if(S.contains(this,t[e]))return!0})},closest:function(e,t){var n,r=0,i=this.length,o=[],a="string"!=typeof e&&S(e);if(!k.test(e))for(;r<i;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(a?-1<a.index(n):1===n.nodeType&&S.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(1<o.length?S.uniqueSort(o):o)},index:function(e){return e?"string"==typeof e?i.call(S(e),this[0]):i.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(S.uniqueSort(S.merge(this.get(),S(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),S.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return h(e,"parentNode")},parentsUntil:function(e,t,n){return h(e,"parentNode",n)},next:function(e){return O(e,"nextSibling")},prev:function(e){return O(e,"previousSibling")},nextAll:function(e){return h(e,"nextSibling")},prevAll:function(e){return h(e,"previousSibling")},nextUntil:function(e,t,n){return h(e,"nextSibling",n)},prevUntil:function(e,t,n){return h(e,"previousSibling",n)},siblings:function(e){return T((e.parentNode||{}).firstChild,e)},children:function(e){return T(e.firstChild)},contents:function(e){return null!=e.contentDocument&&r(e.contentDocument)?e.contentDocument:(A(e,"template")&&(e=e.content||e),S.merge([],e.childNodes))}},function(r,i){S.fn[r]=function(e,t){var n=S.map(this,i,e);return"Until"!==r.slice(-5)&&(t=e),t&&"string"==typeof t&&(n=S.filter(t,n)),1<this.length&&(H[r]||S.uniqueSort(n),L.test(r)&&n.reverse()),this.pushStack(n)}});var P=/[^\x20\t\r\n\f]+/g;function R(e){return e}function M(e){throw e}function I(e,t,n,r){var i;try{e&&m(i=e.promise)?i.call(e).done(t).fail(n):e&&m(i=e.then)?i.call(e,t,n):t.apply(void 0,[e].slice(r))}catch(e){n.apply(void 0,[e])}}S.Callbacks=function(r){var e,n;r="string"==typeof r?(e=r,n={},S.each(e.match(P)||[],function(e,t){n[t]=!0}),n):S.extend({},r);var i,t,o,a,s=[],u=[],l=-1,c=function(){for(a=a||r.once,o=i=!0;u.length;l=-1){t=u.shift();while(++l<s.length)!1===s[l].apply(t[0],t[1])&&r.stopOnFalse&&(l=s.length,t=!1)}r.memory||(t=!1),i=!1,a&&(s=t?[]:"")},f={add:function(){return s&&(t&&!i&&(l=s.length-1,u.push(t)),function n(e){S.each(e,function(e,t){m(t)?r.unique&&f.has(t)||s.push(t):t&&t.length&&"string"!==w(t)&&n(t)})}(arguments),t&&!i&&c()),this},remove:function(){return S.each(arguments,function(e,t){var n;while(-1<(n=S.inArray(t,s,n)))s.splice(n,1),n<=l&&l--}),this},has:function(e){return e?-1<S.inArray(e,s):0<s.length},empty:function(){return s&&(s=[]),this},disable:function(){return a=u=[],s=t="",this},disabled:function(){return!s},lock:function(){return a=u=[],t||i||(s=t=""),this},locked:function(){return!!a},fireWith:function(e,t){return a||(t=[e,(t=t||[]).slice?t.slice():t],u.push(t),i||c()),this},fire:function(){return f.fireWith(this,arguments),this},fired:function(){return!!o}};return f},S.extend({Deferred:function(e){var o=[["notify","progress",S.Callbacks("memory"),S.Callbacks("memory"),2],["resolve","done",S.Callbacks("once memory"),S.Callbacks("once memory"),0,"resolved"],["reject","fail",S.Callbacks("once memory"),S.Callbacks("once memory"),1,"rejected"]],i="pending",a={state:function(){return i},always:function(){return s.done(arguments).fail(arguments),this},"catch":function(e){return a.then(null,e)},pipe:function(){var i=arguments;return S.Deferred(function(r){S.each(o,function(e,t){var n=m(i[t[4]])&&i[t[4]];s[t[1]](function(){var e=n&&n.apply(this,arguments);e&&m(e.promise)?e.promise().progress(r.notify).done(r.resolve).fail(r.reject):r[t[0]+"With"](this,n?[e]:arguments)})}),i=null}).promise()},then:function(t,n,r){var u=0;function l(i,o,a,s){return function(){var n=this,r=arguments,e=function(){var e,t;if(!(i<u)){if((e=a.apply(n,r))===o.promise())throw new TypeError("Thenable self-resolution");t=e&&("object"==typeof e||"function"==typeof e)&&e.then,m(t)?s?t.call(e,l(u,o,R,s),l(u,o,M,s)):(u++,t.call(e,l(u,o,R,s),l(u,o,M,s),l(u,o,R,o.notifyWith))):(a!==R&&(n=void 0,r=[e]),(s||o.resolveWith)(n,r))}},t=s?e:function(){try{e()}catch(e){S.Deferred.exceptionHook&&S.Deferred.exceptionHook(e,t.stackTrace),u<=i+1&&(a!==M&&(n=void 0,r=[e]),o.rejectWith(n,r))}};i?t():(S.Deferred.getStackHook&&(t.stackTrace=S.Deferred.getStackHook()),C.setTimeout(t))}}return S.Deferred(function(e){o[0][3].add(l(0,e,m(r)?r:R,e.notifyWith)),o[1][3].add(l(0,e,m(t)?t:R)),o[2][3].add(l(0,e,m(n)?n:M))}).promise()},promise:function(e){return null!=e?S.extend(e,a):a}},s={};return S.each(o,function(e,t){var n=t[2],r=t[5];a[t[1]]=n.add,r&&n.add(function(){i=r},o[3-e][2].disable,o[3-e][3].disable,o[0][2].lock,o[0][3].lock),n.add(t[3].fire),s[t[0]]=function(){return s[t[0]+"With"](this===s?void 0:this,arguments),this},s[t[0]+"With"]=n.fireWith}),a.promise(s),e&&e.call(s,s),s},when:function(e){var n=arguments.length,t=n,r=Array(t),i=s.call(arguments),o=S.Deferred(),a=function(t){return function(e){r[t]=this,i[t]=1<arguments.length?s.call(arguments):e,--n||o.resolveWith(r,i)}};if(n<=1&&(I(e,o.done(a(t)).resolve,o.reject,!n),"pending"===o.state()||m(i[t]&&i[t].then)))return o.then();while(t--)I(i[t],a(t),o.reject);return o.promise()}});var W=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;S.Deferred.exceptionHook=function(e,t){C.console&&C.console.warn&&e&&W.test(e.name)&&C.console.warn("jQuery.Deferred exception: "+e.message,e.stack,t)},S.readyException=function(e){C.setTimeout(function(){throw e})};var F=S.Deferred();function B(){E.removeEventListener("DOMContentLoaded",B),C.removeEventListener("load",B),S.ready()}S.fn.ready=function(e){return F.then(e)["catch"](function(e){S.readyException(e)}),this},S.extend({isReady:!1,readyWait:1,ready:function(e){(!0===e?--S.readyWait:S.isReady)||(S.isReady=!0)!==e&&0<--S.readyWait||F.resolveWith(E,[S])}}),S.ready.then=F.then,"complete"===E.readyState||"loading"!==E.readyState&&!E.documentElement.doScroll?C.setTimeout(S.ready):(E.addEventListener("DOMContentLoaded",B),C.addEventListener("load",B));var $=function(e,t,n,r,i,o,a){var s=0,u=e.length,l=null==n;if("object"===w(n))for(s in i=!0,n)$(e,t,s,n[s],!0,o,a);else if(void 0!==r&&(i=!0,m(r)||(a=!0),l&&(a?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(S(e),n)})),t))for(;s<u;s++)t(e[s],n,a?r:r.call(e[s],s,t(e[s],n)));return i?e:l?t.call(e):u?t(e[0],n):o},_=/^-ms-/,z=/-([a-z])/g;function U(e,t){return t.toUpperCase()}function X(e){return e.replace(_,"ms-").replace(z,U)}var V=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType};function G(){this.expando=S.expando+G.uid++}G.uid=1,G.prototype={cache:function(e){var t=e[this.expando];return t||(t={},V(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,n){var r,i=this.cache(e);if("string"==typeof t)i[X(t)]=n;else for(r in t)i[X(r)]=t[r];return i},get:function(e,t){return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][X(t)]},access:function(e,t,n){return void 0===t||t&&"string"==typeof t&&void 0===n?this.get(e,t):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,r=e[this.expando];if(void 0!==r){if(void 0!==t){n=(t=Array.isArray(t)?t.map(X):(t=X(t))in r?[t]:t.match(P)||[]).length;while(n--)delete r[t[n]]}(void 0===t||S.isEmptyObject(r))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var t=e[this.expando];return void 0!==t&&!S.isEmptyObject(t)}};var Y=new G,Q=new G,J=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,K=/[A-Z]/g;function Z(e,t,n){var r,i;if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(K,"-$&").toLowerCase(),"string"==typeof(n=e.getAttribute(r))){try{n="true"===(i=n)||"false"!==i&&("null"===i?null:i===+i+""?+i:J.test(i)?JSON.parse(i):i)}catch(e){}Q.set(e,t,n)}else n=void 0;return n}S.extend({hasData:function(e){return Q.hasData(e)||Y.hasData(e)},data:function(e,t,n){return Q.access(e,t,n)},removeData:function(e,t){Q.remove(e,t)},_data:function(e,t,n){return Y.access(e,t,n)},_removeData:function(e,t){Y.remove(e,t)}}),S.fn.extend({data:function(n,e){var t,r,i,o=this[0],a=o&&o.attributes;if(void 0===n){if(this.length&&(i=Q.get(o),1===o.nodeType&&!Y.get(o,"hasDataAttrs"))){t=a.length;while(t--)a[t]&&0===(r=a[t].name).indexOf("data-")&&(r=X(r.slice(5)),Z(o,r,i[r]));Y.set(o,"hasDataAttrs",!0)}return i}return"object"==typeof n?this.each(function(){Q.set(this,n)}):$(this,function(e){var t;if(o&&void 0===e)return void 0!==(t=Q.get(o,n))?t:void 0!==(t=Z(o,n))?t:void 0;this.each(function(){Q.set(this,n,e)})},null,e,1<arguments.length,null,!0)},removeData:function(e){return this.each(function(){Q.remove(this,e)})}}),S.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=Y.get(e,t),n&&(!r||Array.isArray(n)?r=Y.access(e,t,S.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=S.queue(e,t),r=n.length,i=n.shift(),o=S._queueHooks(e,t);"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,function(){S.dequeue(e,t)},o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return Y.get(e,n)||Y.access(e,n,{empty:S.Callbacks("once memory").add(function(){Y.remove(e,[t+"queue",n])})})}}),S.fn.extend({queue:function(t,n){var e=2;return"string"!=typeof t&&(n=t,t="fx",e--),arguments.length<e?S.queue(this[0],t):void 0===n?this:this.each(function(){var e=S.queue(this,t,n);S._queueHooks(this,t),"fx"===t&&"inprogress"!==e[0]&&S.dequeue(this,t)})},dequeue:function(e){return this.each(function(){S.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=S.Deferred(),o=this,a=this.length,s=function(){--r||i.resolveWith(o,[o])};"string"!=typeof e&&(t=e,e=void 0),e=e||"fx";while(a--)(n=Y.get(o[a],e+"queueHooks"))&&n.empty&&(r++,n.empty.add(s));return s(),i.promise(t)}});var ee=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,te=new RegExp("^(?:([+-])=|)("+ee+")([a-z%]*)$","i"),ne=["Top","Right","Bottom","Left"],re=E.documentElement,ie=function(e){return S.contains(e.ownerDocument,e)},oe={composed:!0};re.getRootNode&&(ie=function(e){return S.contains(e.ownerDocument,e)||e.getRootNode(oe)===e.ownerDocument});var ae=function(e,t){return"none"===(e=t||e).style.display||""===e.style.display&&ie(e)&&"none"===S.css(e,"display")};function se(e,t,n,r){var i,o,a=20,s=r?function(){return r.cur()}:function(){return S.css(e,t,"")},u=s(),l=n&&n[3]||(S.cssNumber[t]?"":"px"),c=e.nodeType&&(S.cssNumber[t]||"px"!==l&&+u)&&te.exec(S.css(e,t));if(c&&c[3]!==l){u/=2,l=l||c[3],c=+u||1;while(a--)S.style(e,t,c+l),(1-o)*(1-(o=s()/u||.5))<=0&&(a=0),c/=o;c*=2,S.style(e,t,c+l),n=n||[]}return n&&(c=+c||+u||0,i=n[1]?c+(n[1]+1)*n[2]:+n[2],r&&(r.unit=l,r.start=c,r.end=i)),i}var ue={};function le(e,t){for(var n,r,i,o,a,s,u,l=[],c=0,f=e.length;c<f;c++)(r=e[c]).style&&(n=r.style.display,t?("none"===n&&(l[c]=Y.get(r,"display")||null,l[c]||(r.style.display="")),""===r.style.display&&ae(r)&&(l[c]=(u=a=o=void 0,a=(i=r).ownerDocument,s=i.nodeName,(u=ue[s])||(o=a.body.appendChild(a.createElement(s)),u=S.css(o,"display"),o.parentNode.removeChild(o),"none"===u&&(u="block"),ue[s]=u)))):"none"!==n&&(l[c]="none",Y.set(r,"display",n)));for(c=0;c<f;c++)null!=l[c]&&(e[c].style.display=l[c]);return e}S.fn.extend({show:function(){return le(this,!0)},hide:function(){return le(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){ae(this)?S(this).show():S(this).hide()})}});var ce,fe,pe=/^(?:checkbox|radio)$/i,de=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i,he=/^$|^module$|\/(?:java|ecma)script/i;ce=E.createDocumentFragment().appendChild(E.createElement("div")),(fe=E.createElement("input")).setAttribute("type","radio"),fe.setAttribute("checked","checked"),fe.setAttribute("name","t"),ce.appendChild(fe),y.checkClone=ce.cloneNode(!0).cloneNode(!0).lastChild.checked,ce.innerHTML="<textarea>x</textarea>",y.noCloneChecked=!!ce.cloneNode(!0).lastChild.defaultValue,ce.innerHTML="<option></option>",y.option=!!ce.lastChild;var ge={thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};function ve(e,t){var n;return n="undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName(t||"*"):"undefined"!=typeof e.querySelectorAll?e.querySelectorAll(t||"*"):[],void 0===t||t&&A(e,t)?S.merge([e],n):n}function ye(e,t){for(var n=0,r=e.length;n<r;n++)Y.set(e[n],"globalEval",!t||Y.get(t[n],"globalEval"))}ge.tbody=ge.tfoot=ge.colgroup=ge.caption=ge.thead,ge.th=ge.td,y.option||(ge.optgroup=ge.option=[1,"<select multiple='multiple'>","</select>"]);var me=/<|&#?\w+;/;function xe(e,t,n,r,i){for(var o,a,s,u,l,c,f=t.createDocumentFragment(),p=[],d=0,h=e.length;d<h;d++)if((o=e[d])||0===o)if("object"===w(o))S.merge(p,o.nodeType?[o]:o);else if(me.test(o)){a=a||f.appendChild(t.createElement("div")),s=(de.exec(o)||["",""])[1].toLowerCase(),u=ge[s]||ge._default,a.innerHTML=u[1]+S.htmlPrefilter(o)+u[2],c=u[0];while(c--)a=a.lastChild;S.merge(p,a.childNodes),(a=f.firstChild).textContent=""}else p.push(t.createTextNode(o));f.textContent="",d=0;while(o=p[d++])if(r&&-1<S.inArray(o,r))i&&i.push(o);else if(l=ie(o),a=ve(f.appendChild(o),"script"),l&&ye(a),n){c=0;while(o=a[c++])he.test(o.type||"")&&n.push(o)}return f}var be=/^key/,we=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,Te=/^([^.]*)(?:\.(.+)|)/;function Ce(){return!0}function Ee(){return!1}function Se(e,t){return e===function(){try{return E.activeElement}catch(e){}}()==("focus"===t)}function ke(e,t,n,r,i,o){var a,s;if("object"==typeof t){for(s in"string"!=typeof n&&(r=r||n,n=void 0),t)ke(e,s,n,r,t[s],o);return e}if(null==r&&null==i?(i=n,r=n=void 0):null==i&&("string"==typeof n?(i=r,r=void 0):(i=r,r=n,n=void 0)),!1===i)i=Ee;else if(!i)return e;return 1===o&&(a=i,(i=function(e){return S().off(e),a.apply(this,arguments)}).guid=a.guid||(a.guid=S.guid++)),e.each(function(){S.event.add(this,t,i,r,n)})}function Ae(e,i,o){o?(Y.set(e,i,!1),S.event.add(e,i,{namespace:!1,handler:function(e){var t,n,r=Y.get(this,i);if(1&e.isTrigger&&this[i]){if(r.length)(S.event.special[i]||{}).delegateType&&e.stopPropagation();else if(r=s.call(arguments),Y.set(this,i,r),t=o(this,i),this[i](),r!==(n=Y.get(this,i))||t?Y.set(this,i,!1):n={},r!==n)return e.stopImmediatePropagation(),e.preventDefault(),n.value}else r.length&&(Y.set(this,i,{value:S.event.trigger(S.extend(r[0],S.Event.prototype),r.slice(1),this)}),e.stopImmediatePropagation())}})):void 0===Y.get(e,i)&&S.event.add(e,i,Ce)}S.event={global:{},add:function(t,e,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,v=Y.get(t);if(V(t)){n.handler&&(n=(o=n).handler,i=o.selector),i&&S.find.matchesSelector(re,i),n.guid||(n.guid=S.guid++),(u=v.events)||(u=v.events=Object.create(null)),(a=v.handle)||(a=v.handle=function(e){return"undefined"!=typeof S&&S.event.triggered!==e.type?S.event.dispatch.apply(t,arguments):void 0}),l=(e=(e||"").match(P)||[""]).length;while(l--)d=g=(s=Te.exec(e[l])||[])[1],h=(s[2]||"").split(".").sort(),d&&(f=S.event.special[d]||{},d=(i?f.delegateType:f.bindType)||d,f=S.event.special[d]||{},c=S.extend({type:d,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&S.expr.match.needsContext.test(i),namespace:h.join(".")},o),(p=u[d])||((p=u[d]=[]).delegateCount=0,f.setup&&!1!==f.setup.call(t,r,h,a)||t.addEventListener&&t.addEventListener(d,a)),f.add&&(f.add.call(t,c),c.handler.guid||(c.handler.guid=n.guid)),i?p.splice(p.delegateCount++,0,c):p.push(c),S.event.global[d]=!0)}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,v=Y.hasData(e)&&Y.get(e);if(v&&(u=v.events)){l=(t=(t||"").match(P)||[""]).length;while(l--)if(d=g=(s=Te.exec(t[l])||[])[1],h=(s[2]||"").split(".").sort(),d){f=S.event.special[d]||{},p=u[d=(r?f.delegateType:f.bindType)||d]||[],s=s[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),a=o=p.length;while(o--)c=p[o],!i&&g!==c.origType||n&&n.guid!==c.guid||s&&!s.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(p.splice(o,1),c.selector&&p.delegateCount--,f.remove&&f.remove.call(e,c));a&&!p.length&&(f.teardown&&!1!==f.teardown.call(e,h,v.handle)||S.removeEvent(e,d,v.handle),delete u[d])}else for(d in u)S.event.remove(e,d+t[l],n,r,!0);S.isEmptyObject(u)&&Y.remove(e,"handle events")}},dispatch:function(e){var t,n,r,i,o,a,s=new Array(arguments.length),u=S.event.fix(e),l=(Y.get(this,"events")||Object.create(null))[u.type]||[],c=S.event.special[u.type]||{};for(s[0]=u,t=1;t<arguments.length;t++)s[t]=arguments[t];if(u.delegateTarget=this,!c.preDispatch||!1!==c.preDispatch.call(this,u)){a=S.event.handlers.call(this,u,l),t=0;while((i=a[t++])&&!u.isPropagationStopped()){u.currentTarget=i.elem,n=0;while((o=i.handlers[n++])&&!u.isImmediatePropagationStopped())u.rnamespace&&!1!==o.namespace&&!u.rnamespace.test(o.namespace)||(u.handleObj=o,u.data=o.data,void 0!==(r=((S.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,s))&&!1===(u.result=r)&&(u.preventDefault(),u.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,u),u.result}},handlers:function(e,t){var n,r,i,o,a,s=[],u=t.delegateCount,l=e.target;if(u&&l.nodeType&&!("click"===e.type&&1<=e.button))for(;l!==this;l=l.parentNode||this)if(1===l.nodeType&&("click"!==e.type||!0!==l.disabled)){for(o=[],a={},n=0;n<u;n++)void 0===a[i=(r=t[n]).selector+" "]&&(a[i]=r.needsContext?-1<S(i,this).index(l):S.find(i,this,null,[l]).length),a[i]&&o.push(r);o.length&&s.push({elem:l,handlers:o})}return l=this,u<t.length&&s.push({elem:l,handlers:t.slice(u)}),s},addProp:function(t,e){Object.defineProperty(S.Event.prototype,t,{enumerable:!0,configurable:!0,get:m(e)?function(){if(this.originalEvent)return e(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[t]},set:function(e){Object.defineProperty(this,t,{enumerable:!0,configurable:!0,writable:!0,value:e})}})},fix:function(e){return e[S.expando]?e:new S.Event(e)},special:{load:{noBubble:!0},click:{setup:function(e){var t=this||e;return pe.test(t.type)&&t.click&&A(t,"input")&&Ae(t,"click",Ce),!1},trigger:function(e){var t=this||e;return pe.test(t.type)&&t.click&&A(t,"input")&&Ae(t,"click"),!0},_default:function(e){var t=e.target;return pe.test(t.type)&&t.click&&A(t,"input")&&Y.get(t,"click")||A(t,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},S.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)},S.Event=function(e,t){if(!(this instanceof S.Event))return new S.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&!1===e.returnValue?Ce:Ee,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&S.extend(this,t),this.timeStamp=e&&e.timeStamp||Date.now(),this[S.expando]=!0},S.Event.prototype={constructor:S.Event,isDefaultPrevented:Ee,isPropagationStopped:Ee,isImmediatePropagationStopped:Ee,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=Ce,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=Ce,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=Ce,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},S.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,code:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(e){var t=e.button;return null==e.which&&be.test(e.type)?null!=e.charCode?e.charCode:e.keyCode:!e.which&&void 0!==t&&we.test(e.type)?1&t?1:2&t?3:4&t?2:0:e.which}},S.event.addProp),S.each({focus:"focusin",blur:"focusout"},function(e,t){S.event.special[e]={setup:function(){return Ae(this,e,Se),!1},trigger:function(){return Ae(this,e),!0},delegateType:t}}),S.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,i){S.event.special[e]={delegateType:i,bindType:i,handle:function(e){var t,n=e.relatedTarget,r=e.handleObj;return n&&(n===this||S.contains(this,n))||(e.type=r.origType,t=r.handler.apply(this,arguments),e.type=i),t}}}),S.fn.extend({on:function(e,t,n,r){return ke(this,e,t,n,r)},one:function(e,t,n,r){return ke(this,e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,S(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return!1!==t&&"function"!=typeof t||(n=t,t=void 0),!1===n&&(n=Ee),this.each(function(){S.event.remove(this,e,n,t)})}});var Ne=/<script|<style|<link/i,De=/checked\s*(?:[^=]|=\s*.checked.)/i,je=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function qe(e,t){return A(e,"table")&&A(11!==t.nodeType?t:t.firstChild,"tr")&&S(e).children("tbody")[0]||e}function Le(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function He(e){return"true/"===(e.type||"").slice(0,5)?e.type=e.type.slice(5):e.removeAttribute("type"),e}function Oe(e,t){var n,r,i,o,a,s;if(1===t.nodeType){if(Y.hasData(e)&&(s=Y.get(e).events))for(i in Y.remove(t,"handle events"),s)for(n=0,r=s[i].length;n<r;n++)S.event.add(t,i,s[i][n]);Q.hasData(e)&&(o=Q.access(e),a=S.extend({},o),Q.set(t,a))}}function Pe(n,r,i,o){r=g(r);var e,t,a,s,u,l,c=0,f=n.length,p=f-1,d=r[0],h=m(d);if(h||1<f&&"string"==typeof d&&!y.checkClone&&De.test(d))return n.each(function(e){var t=n.eq(e);h&&(r[0]=d.call(this,e,t.html())),Pe(t,r,i,o)});if(f&&(t=(e=xe(r,n[0].ownerDocument,!1,n,o)).firstChild,1===e.childNodes.length&&(e=t),t||o)){for(s=(a=S.map(ve(e,"script"),Le)).length;c<f;c++)u=e,c!==p&&(u=S.clone(u,!0,!0),s&&S.merge(a,ve(u,"script"))),i.call(n[c],u,c);if(s)for(l=a[a.length-1].ownerDocument,S.map(a,He),c=0;c<s;c++)u=a[c],he.test(u.type||"")&&!Y.access(u,"globalEval")&&S.contains(l,u)&&(u.src&&"module"!==(u.type||"").toLowerCase()?S._evalUrl&&!u.noModule&&S._evalUrl(u.src,{nonce:u.nonce||u.getAttribute("nonce")},l):b(u.textContent.replace(je,""),u,l))}return n}function Re(e,t,n){for(var r,i=t?S.filter(t,e):e,o=0;null!=(r=i[o]);o++)n||1!==r.nodeType||S.cleanData(ve(r)),r.parentNode&&(n&&ie(r)&&ye(ve(r,"script")),r.parentNode.removeChild(r));return e}S.extend({htmlPrefilter:function(e){return e},clone:function(e,t,n){var r,i,o,a,s,u,l,c=e.cloneNode(!0),f=ie(e);if(!(y.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||S.isXMLDoc(e)))for(a=ve(c),r=0,i=(o=ve(e)).length;r<i;r++)s=o[r],u=a[r],void 0,"input"===(l=u.nodeName.toLowerCase())&&pe.test(s.type)?u.checked=s.checked:"input"!==l&&"textarea"!==l||(u.defaultValue=s.defaultValue);if(t)if(n)for(o=o||ve(e),a=a||ve(c),r=0,i=o.length;r<i;r++)Oe(o[r],a[r]);else Oe(e,c);return 0<(a=ve(c,"script")).length&&ye(a,!f&&ve(e,"script")),c},cleanData:function(e){for(var t,n,r,i=S.event.special,o=0;void 0!==(n=e[o]);o++)if(V(n)){if(t=n[Y.expando]){if(t.events)for(r in t.events)i[r]?S.event.remove(n,r):S.removeEvent(n,r,t.handle);n[Y.expando]=void 0}n[Q.expando]&&(n[Q.expando]=void 0)}}}),S.fn.extend({detach:function(e){return Re(this,e,!0)},remove:function(e){return Re(this,e)},text:function(e){return $(this,function(e){return void 0===e?S.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)})},null,e,arguments.length)},append:function(){return Pe(this,arguments,function(e){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||qe(this,e).appendChild(e)})},prepend:function(){return Pe(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=qe(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return Pe(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return Pe(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(S.cleanData(ve(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map(function(){return S.clone(this,e,t)})},html:function(e){return $(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!Ne.test(e)&&!ge[(de.exec(e)||["",""])[1].toLowerCase()]){e=S.htmlPrefilter(e);try{for(;n<r;n++)1===(t=this[n]||{}).nodeType&&(S.cleanData(ve(t,!1)),t.innerHTML=e);t=0}catch(e){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var n=[];return Pe(this,arguments,function(e){var t=this.parentNode;S.inArray(this,n)<0&&(S.cleanData(ve(this)),t&&t.replaceChild(e,this))},n)}}),S.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,a){S.fn[e]=function(e){for(var t,n=[],r=S(e),i=r.length-1,o=0;o<=i;o++)t=o===i?this:this.clone(!0),S(r[o])[a](t),u.apply(n,t.get());return this.pushStack(n)}});var Me=new RegExp("^("+ee+")(?!px)[a-z%]+$","i"),Ie=function(e){var t=e.ownerDocument.defaultView;return t&&t.opener||(t=C),t.getComputedStyle(e)},We=function(e,t,n){var r,i,o={};for(i in t)o[i]=e.style[i],e.style[i]=t[i];for(i in r=n.call(e),t)e.style[i]=o[i];return r},Fe=new RegExp(ne.join("|"),"i");function Be(e,t,n){var r,i,o,a,s=e.style;return(n=n||Ie(e))&&(""!==(a=n.getPropertyValue(t)||n[t])||ie(e)||(a=S.style(e,t)),!y.pixelBoxStyles()&&Me.test(a)&&Fe.test(t)&&(r=s.width,i=s.minWidth,o=s.maxWidth,s.minWidth=s.maxWidth=s.width=a,a=n.width,s.width=r,s.minWidth=i,s.maxWidth=o)),void 0!==a?a+"":a}function $e(e,t){return{get:function(){if(!e())return(this.get=t).apply(this,arguments);delete this.get}}}!function(){function e(){if(l){u.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",l.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",re.appendChild(u).appendChild(l);var e=C.getComputedStyle(l);n="1%"!==e.top,s=12===t(e.marginLeft),l.style.right="60%",o=36===t(e.right),r=36===t(e.width),l.style.position="absolute",i=12===t(l.offsetWidth/3),re.removeChild(u),l=null}}function t(e){return Math.round(parseFloat(e))}var n,r,i,o,a,s,u=E.createElement("div"),l=E.createElement("div");l.style&&(l.style.backgroundClip="content-box",l.cloneNode(!0).style.backgroundClip="",y.clearCloneStyle="content-box"===l.style.backgroundClip,S.extend(y,{boxSizingReliable:function(){return e(),r},pixelBoxStyles:function(){return e(),o},pixelPosition:function(){return e(),n},reliableMarginLeft:function(){return e(),s},scrollboxSize:function(){return e(),i},reliableTrDimensions:function(){var e,t,n,r;return null==a&&(e=E.createElement("table"),t=E.createElement("tr"),n=E.createElement("div"),e.style.cssText="position:absolute;left:-11111px",t.style.height="1px",n.style.height="9px",re.appendChild(e).appendChild(t).appendChild(n),r=C.getComputedStyle(t),a=3<parseInt(r.height),re.removeChild(e)),a}}))}();var _e=["Webkit","Moz","ms"],ze=E.createElement("div").style,Ue={};function Xe(e){var t=S.cssProps[e]||Ue[e];return t||(e in ze?e:Ue[e]=function(e){var t=e[0].toUpperCase()+e.slice(1),n=_e.length;while(n--)if((e=_e[n]+t)in ze)return e}(e)||e)}var Ve=/^(none|table(?!-c[ea]).+)/,Ge=/^--/,Ye={position:"absolute",visibility:"hidden",display:"block"},Qe={letterSpacing:"0",fontWeight:"400"};function Je(e,t,n){var r=te.exec(t);return r?Math.max(0,r[2]-(n||0))+(r[3]||"px"):t}function Ke(e,t,n,r,i,o){var a="width"===t?1:0,s=0,u=0;if(n===(r?"border":"content"))return 0;for(;a<4;a+=2)"margin"===n&&(u+=S.css(e,n+ne[a],!0,i)),r?("content"===n&&(u-=S.css(e,"padding"+ne[a],!0,i)),"margin"!==n&&(u-=S.css(e,"border"+ne[a]+"Width",!0,i))):(u+=S.css(e,"padding"+ne[a],!0,i),"padding"!==n?u+=S.css(e,"border"+ne[a]+"Width",!0,i):s+=S.css(e,"border"+ne[a]+"Width",!0,i));return!r&&0<=o&&(u+=Math.max(0,Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-o-u-s-.5))||0),u}function Ze(e,t,n){var r=Ie(e),i=(!y.boxSizingReliable()||n)&&"border-box"===S.css(e,"boxSizing",!1,r),o=i,a=Be(e,t,r),s="offset"+t[0].toUpperCase()+t.slice(1);if(Me.test(a)){if(!n)return a;a="auto"}return(!y.boxSizingReliable()&&i||!y.reliableTrDimensions()&&A(e,"tr")||"auto"===a||!parseFloat(a)&&"inline"===S.css(e,"display",!1,r))&&e.getClientRects().length&&(i="border-box"===S.css(e,"boxSizing",!1,r),(o=s in e)&&(a=e[s])),(a=parseFloat(a)||0)+Ke(e,t,n||(i?"border":"content"),o,r,a)+"px"}function et(e,t,n,r,i){return new et.prototype.init(e,t,n,r,i)}S.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Be(e,"opacity");return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,a,s=X(t),u=Ge.test(t),l=e.style;if(u||(t=Xe(s)),a=S.cssHooks[t]||S.cssHooks[s],void 0===n)return a&&"get"in a&&void 0!==(i=a.get(e,!1,r))?i:l[t];"string"===(o=typeof n)&&(i=te.exec(n))&&i[1]&&(n=se(e,t,i),o="number"),null!=n&&n==n&&("number"!==o||u||(n+=i&&i[3]||(S.cssNumber[s]?"":"px")),y.clearCloneStyle||""!==n||0!==t.indexOf("background")||(l[t]="inherit"),a&&"set"in a&&void 0===(n=a.set(e,n,r))||(u?l.setProperty(t,n):l[t]=n))}},css:function(e,t,n,r){var i,o,a,s=X(t);return Ge.test(t)||(t=Xe(s)),(a=S.cssHooks[t]||S.cssHooks[s])&&"get"in a&&(i=a.get(e,!0,n)),void 0===i&&(i=Be(e,t,r)),"normal"===i&&t in Qe&&(i=Qe[t]),""===n||n?(o=parseFloat(i),!0===n||isFinite(o)?o||0:i):i}}),S.each(["height","width"],function(e,u){S.cssHooks[u]={get:function(e,t,n){if(t)return!Ve.test(S.css(e,"display"))||e.getClientRects().length&&e.getBoundingClientRect().width?Ze(e,u,n):We(e,Ye,function(){return Ze(e,u,n)})},set:function(e,t,n){var r,i=Ie(e),o=!y.scrollboxSize()&&"absolute"===i.position,a=(o||n)&&"border-box"===S.css(e,"boxSizing",!1,i),s=n?Ke(e,u,n,a,i):0;return a&&o&&(s-=Math.ceil(e["offset"+u[0].toUpperCase()+u.slice(1)]-parseFloat(i[u])-Ke(e,u,"border",!1,i)-.5)),s&&(r=te.exec(t))&&"px"!==(r[3]||"px")&&(e.style[u]=t,t=S.css(e,u)),Je(0,t,s)}}}),S.cssHooks.marginLeft=$e(y.reliableMarginLeft,function(e,t){if(t)return(parseFloat(Be(e,"marginLeft"))||e.getBoundingClientRect().left-We(e,{marginLeft:0},function(){return e.getBoundingClientRect().left}))+"px"}),S.each({margin:"",padding:"",border:"Width"},function(i,o){S.cssHooks[i+o]={expand:function(e){for(var t=0,n={},r="string"==typeof e?e.split(" "):[e];t<4;t++)n[i+ne[t]+o]=r[t]||r[t-2]||r[0];return n}},"margin"!==i&&(S.cssHooks[i+o].set=Je)}),S.fn.extend({css:function(e,t){return $(this,function(e,t,n){var r,i,o={},a=0;if(Array.isArray(t)){for(r=Ie(e),i=t.length;a<i;a++)o[t[a]]=S.css(e,t[a],!1,r);return o}return void 0!==n?S.style(e,t,n):S.css(e,t)},e,t,1<arguments.length)}}),((S.Tween=et).prototype={constructor:et,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||S.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(S.cssNumber[n]?"":"px")},cur:function(){var e=et.propHooks[this.prop];return e&&e.get?e.get(this):et.propHooks._default.get(this)},run:function(e){var t,n=et.propHooks[this.prop];return this.options.duration?this.pos=t=S.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):et.propHooks._default.set(this),this}}).init.prototype=et.prototype,(et.propHooks={_default:{get:function(e){var t;return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=S.css(e.elem,e.prop,""))&&"auto"!==t?t:0},set:function(e){S.fx.step[e.prop]?S.fx.step[e.prop](e):1!==e.elem.nodeType||!S.cssHooks[e.prop]&&null==e.elem.style[Xe(e.prop)]?e.elem[e.prop]=e.now:S.style(e.elem,e.prop,e.now+e.unit)}}}).scrollTop=et.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},S.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},S.fx=et.prototype.init,S.fx.step={};var tt,nt,rt,it,ot=/^(?:toggle|show|hide)$/,at=/queueHooks$/;function st(){nt&&(!1===E.hidden&&C.requestAnimationFrame?C.requestAnimationFrame(st):C.setTimeout(st,S.fx.interval),S.fx.tick())}function ut(){return C.setTimeout(function(){tt=void 0}),tt=Date.now()}function lt(e,t){var n,r=0,i={height:e};for(t=t?1:0;r<4;r+=2-t)i["margin"+(n=ne[r])]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function ct(e,t,n){for(var r,i=(ft.tweeners[t]||[]).concat(ft.tweeners["*"]),o=0,a=i.length;o<a;o++)if(r=i[o].call(n,t,e))return r}function ft(o,e,t){var n,a,r=0,i=ft.prefilters.length,s=S.Deferred().always(function(){delete u.elem}),u=function(){if(a)return!1;for(var e=tt||ut(),t=Math.max(0,l.startTime+l.duration-e),n=1-(t/l.duration||0),r=0,i=l.tweens.length;r<i;r++)l.tweens[r].run(n);return s.notifyWith(o,[l,n,t]),n<1&&i?t:(i||s.notifyWith(o,[l,1,0]),s.resolveWith(o,[l]),!1)},l=s.promise({elem:o,props:S.extend({},e),opts:S.extend(!0,{specialEasing:{},easing:S.easing._default},t),originalProperties:e,originalOptions:t,startTime:tt||ut(),duration:t.duration,tweens:[],createTween:function(e,t){var n=S.Tween(o,l.opts,e,t,l.opts.specialEasing[e]||l.opts.easing);return l.tweens.push(n),n},stop:function(e){var t=0,n=e?l.tweens.length:0;if(a)return this;for(a=!0;t<n;t++)l.tweens[t].run(1);return e?(s.notifyWith(o,[l,1,0]),s.resolveWith(o,[l,e])):s.rejectWith(o,[l,e]),this}}),c=l.props;for(!function(e,t){var n,r,i,o,a;for(n in e)if(i=t[r=X(n)],o=e[n],Array.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),(a=S.cssHooks[r])&&"expand"in a)for(n in o=a.expand(o),delete e[r],o)n in e||(e[n]=o[n],t[n]=i);else t[r]=i}(c,l.opts.specialEasing);r<i;r++)if(n=ft.prefilters[r].call(l,o,c,l.opts))return m(n.stop)&&(S._queueHooks(l.elem,l.opts.queue).stop=n.stop.bind(n)),n;return S.map(c,ct,l),m(l.opts.start)&&l.opts.start.call(o,l),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always),S.fx.timer(S.extend(u,{elem:o,anim:l,queue:l.opts.queue})),l}S.Animation=S.extend(ft,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t);return se(n.elem,e,te.exec(t),n),n}]},tweener:function(e,t){m(e)?(t=e,e=["*"]):e=e.match(P);for(var n,r=0,i=e.length;r<i;r++)n=e[r],ft.tweeners[n]=ft.tweeners[n]||[],ft.tweeners[n].unshift(t)},prefilters:[function(e,t,n){var r,i,o,a,s,u,l,c,f="width"in t||"height"in t,p=this,d={},h=e.style,g=e.nodeType&&ae(e),v=Y.get(e,"fxshow");for(r in n.queue||(null==(a=S._queueHooks(e,"fx")).unqueued&&(a.unqueued=0,s=a.empty.fire,a.empty.fire=function(){a.unqueued||s()}),a.unqueued++,p.always(function(){p.always(function(){a.unqueued--,S.queue(e,"fx").length||a.empty.fire()})})),t)if(i=t[r],ot.test(i)){if(delete t[r],o=o||"toggle"===i,i===(g?"hide":"show")){if("show"!==i||!v||void 0===v[r])continue;g=!0}d[r]=v&&v[r]||S.style(e,r)}if((u=!S.isEmptyObject(t))||!S.isEmptyObject(d))for(r in f&&1===e.nodeType&&(n.overflow=[h.overflow,h.overflowX,h.overflowY],null==(l=v&&v.display)&&(l=Y.get(e,"display")),"none"===(c=S.css(e,"display"))&&(l?c=l:(le([e],!0),l=e.style.display||l,c=S.css(e,"display"),le([e]))),("inline"===c||"inline-block"===c&&null!=l)&&"none"===S.css(e,"float")&&(u||(p.done(function(){h.display=l}),null==l&&(c=h.display,l="none"===c?"":c)),h.display="inline-block")),n.overflow&&(h.overflow="hidden",p.always(function(){h.overflow=n.overflow[0],h.overflowX=n.overflow[1],h.overflowY=n.overflow[2]})),u=!1,d)u||(v?"hidden"in v&&(g=v.hidden):v=Y.access(e,"fxshow",{display:l}),o&&(v.hidden=!g),g&&le([e],!0),p.done(function(){for(r in g||le([e]),Y.remove(e,"fxshow"),d)S.style(e,r,d[r])})),u=ct(g?v[r]:0,r,p),r in v||(v[r]=u.start,g&&(u.end=u.start,u.start=0))}],prefilter:function(e,t){t?ft.prefilters.unshift(e):ft.prefilters.push(e)}}),S.speed=function(e,t,n){var r=e&&"object"==typeof e?S.extend({},e):{complete:n||!n&&t||m(e)&&e,duration:e,easing:n&&t||t&&!m(t)&&t};return S.fx.off?r.duration=0:"number"!=typeof r.duration&&(r.duration in S.fx.speeds?r.duration=S.fx.speeds[r.duration]:r.duration=S.fx.speeds._default),null!=r.queue&&!0!==r.queue||(r.queue="fx"),r.old=r.complete,r.complete=function(){m(r.old)&&r.old.call(this),r.queue&&S.dequeue(this,r.queue)},r},S.fn.extend({fadeTo:function(e,t,n,r){return this.filter(ae).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(t,e,n,r){var i=S.isEmptyObject(t),o=S.speed(e,n,r),a=function(){var e=ft(this,S.extend({},t),o);(i||Y.get(this,"finish"))&&e.stop(!0)};return a.finish=a,i||!1===o.queue?this.each(a):this.queue(o.queue,a)},stop:function(i,e,o){var a=function(e){var t=e.stop;delete e.stop,t(o)};return"string"!=typeof i&&(o=e,e=i,i=void 0),e&&this.queue(i||"fx",[]),this.each(function(){var e=!0,t=null!=i&&i+"queueHooks",n=S.timers,r=Y.get(this);if(t)r[t]&&r[t].stop&&a(r[t]);else for(t in r)r[t]&&r[t].stop&&at.test(t)&&a(r[t]);for(t=n.length;t--;)n[t].elem!==this||null!=i&&n[t].queue!==i||(n[t].anim.stop(o),e=!1,n.splice(t,1));!e&&o||S.dequeue(this,i)})},finish:function(a){return!1!==a&&(a=a||"fx"),this.each(function(){var e,t=Y.get(this),n=t[a+"queue"],r=t[a+"queueHooks"],i=S.timers,o=n?n.length:0;for(t.finish=!0,S.queue(this,a,[]),r&&r.stop&&r.stop.call(this,!0),e=i.length;e--;)i[e].elem===this&&i[e].queue===a&&(i[e].anim.stop(!0),i.splice(e,1));for(e=0;e<o;e++)n[e]&&n[e].finish&&n[e].finish.call(this);delete t.finish})}}),S.each(["toggle","show","hide"],function(e,r){var i=S.fn[r];S.fn[r]=function(e,t,n){return null==e||"boolean"==typeof e?i.apply(this,arguments):this.animate(lt(r,!0),e,t,n)}}),S.each({slideDown:lt("show"),slideUp:lt("hide"),slideToggle:lt("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,r){S.fn[e]=function(e,t,n){return this.animate(r,e,t,n)}}),S.timers=[],S.fx.tick=function(){var e,t=0,n=S.timers;for(tt=Date.now();t<n.length;t++)(e=n[t])()||n[t]!==e||n.splice(t--,1);n.length||S.fx.stop(),tt=void 0},S.fx.timer=function(e){S.timers.push(e),S.fx.start()},S.fx.interval=13,S.fx.start=function(){nt||(nt=!0,st())},S.fx.stop=function(){nt=null},S.fx.speeds={slow:600,fast:200,_default:400},S.fn.delay=function(r,e){return r=S.fx&&S.fx.speeds[r]||r,e=e||"fx",this.queue(e,function(e,t){var n=C.setTimeout(e,r);t.stop=function(){C.clearTimeout(n)}})},rt=E.createElement("input"),it=E.createElement("select").appendChild(E.createElement("option")),rt.type="checkbox",y.checkOn=""!==rt.value,y.optSelected=it.selected,(rt=E.createElement("input")).value="t",rt.type="radio",y.radioValue="t"===rt.value;var pt,dt=S.expr.attrHandle;S.fn.extend({attr:function(e,t){return $(this,S.attr,e,t,1<arguments.length)},removeAttr:function(e){return this.each(function(){S.removeAttr(this,e)})}}),S.extend({attr:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return"undefined"==typeof e.getAttribute?S.prop(e,t,n):(1===o&&S.isXMLDoc(e)||(i=S.attrHooks[t.toLowerCase()]||(S.expr.match.bool.test(t)?pt:void 0)),void 0!==n?null===n?void S.removeAttr(e,t):i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:(e.setAttribute(t,n+""),n):i&&"get"in i&&null!==(r=i.get(e,t))?r:null==(r=S.find.attr(e,t))?void 0:r)},attrHooks:{type:{set:function(e,t){if(!y.radioValue&&"radio"===t&&A(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,r=0,i=t&&t.match(P);if(i&&1===e.nodeType)while(n=i[r++])e.removeAttribute(n)}}),pt={set:function(e,t,n){return!1===t?S.removeAttr(e,n):e.setAttribute(n,n),n}},S.each(S.expr.match.bool.source.match(/\w+/g),function(e,t){var a=dt[t]||S.find.attr;dt[t]=function(e,t,n){var r,i,o=t.toLowerCase();return n||(i=dt[o],dt[o]=r,r=null!=a(e,t,n)?o:null,dt[o]=i),r}});var ht=/^(?:input|select|textarea|button)$/i,gt=/^(?:a|area)$/i;function vt(e){return(e.match(P)||[]).join(" ")}function yt(e){return e.getAttribute&&e.getAttribute("class")||""}function mt(e){return Array.isArray(e)?e:"string"==typeof e&&e.match(P)||[]}S.fn.extend({prop:function(e,t){return $(this,S.prop,e,t,1<arguments.length)},removeProp:function(e){return this.each(function(){delete this[S.propFix[e]||e]})}}),S.extend({prop:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return 1===o&&S.isXMLDoc(e)||(t=S.propFix[t]||t,i=S.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){var t=S.find.attr(e,"tabindex");return t?parseInt(t,10):ht.test(e.nodeName)||gt.test(e.nodeName)&&e.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),y.optSelected||(S.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),S.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){S.propFix[this.toLowerCase()]=this}),S.fn.extend({addClass:function(t){var e,n,r,i,o,a,s,u=0;if(m(t))return this.each(function(e){S(this).addClass(t.call(this,e,yt(this)))});if((e=mt(t)).length)while(n=this[u++])if(i=yt(n),r=1===n.nodeType&&" "+vt(i)+" "){a=0;while(o=e[a++])r.indexOf(" "+o+" ")<0&&(r+=o+" ");i!==(s=vt(r))&&n.setAttribute("class",s)}return this},removeClass:function(t){var e,n,r,i,o,a,s,u=0;if(m(t))return this.each(function(e){S(this).removeClass(t.call(this,e,yt(this)))});if(!arguments.length)return this.attr("class","");if((e=mt(t)).length)while(n=this[u++])if(i=yt(n),r=1===n.nodeType&&" "+vt(i)+" "){a=0;while(o=e[a++])while(-1<r.indexOf(" "+o+" "))r=r.replace(" "+o+" "," ");i!==(s=vt(r))&&n.setAttribute("class",s)}return this},toggleClass:function(i,t){var o=typeof i,a="string"===o||Array.isArray(i);return"boolean"==typeof t&&a?t?this.addClass(i):this.removeClass(i):m(i)?this.each(function(e){S(this).toggleClass(i.call(this,e,yt(this),t),t)}):this.each(function(){var e,t,n,r;if(a){t=0,n=S(this),r=mt(i);while(e=r[t++])n.hasClass(e)?n.removeClass(e):n.addClass(e)}else void 0!==i&&"boolean"!==o||((e=yt(this))&&Y.set(this,"__className__",e),this.setAttribute&&this.setAttribute("class",e||!1===i?"":Y.get(this,"__className__")||""))})},hasClass:function(e){var t,n,r=0;t=" "+e+" ";while(n=this[r++])if(1===n.nodeType&&-1<(" "+vt(yt(n))+" ").indexOf(t))return!0;return!1}});var xt=/\r/g;S.fn.extend({val:function(n){var r,e,i,t=this[0];return arguments.length?(i=m(n),this.each(function(e){var t;1===this.nodeType&&(null==(t=i?n.call(this,e,S(this).val()):n)?t="":"number"==typeof t?t+="":Array.isArray(t)&&(t=S.map(t,function(e){return null==e?"":e+""})),(r=S.valHooks[this.type]||S.valHooks[this.nodeName.toLowerCase()])&&"set"in r&&void 0!==r.set(this,t,"value")||(this.value=t))})):t?(r=S.valHooks[t.type]||S.valHooks[t.nodeName.toLowerCase()])&&"get"in r&&void 0!==(e=r.get(t,"value"))?e:"string"==typeof(e=t.value)?e.replace(xt,""):null==e?"":e:void 0}}),S.extend({valHooks:{option:{get:function(e){var t=S.find.attr(e,"value");return null!=t?t:vt(S.text(e))}},select:{get:function(e){var t,n,r,i=e.options,o=e.selectedIndex,a="select-one"===e.type,s=a?null:[],u=a?o+1:i.length;for(r=o<0?u:a?o:0;r<u;r++)if(((n=i[r]).selected||r===o)&&!n.disabled&&(!n.parentNode.disabled||!A(n.parentNode,"optgroup"))){if(t=S(n).val(),a)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=S.makeArray(t),a=i.length;while(a--)((r=i[a]).selected=-1<S.inArray(S.valHooks.option.get(r),o))&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),S.each(["radio","checkbox"],function(){S.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=-1<S.inArray(S(e).val(),t)}},y.checkOn||(S.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})}),y.focusin="onfocusin"in C;var bt=/^(?:focusinfocus|focusoutblur)$/,wt=function(e){e.stopPropagation()};S.extend(S.event,{trigger:function(e,t,n,r){var i,o,a,s,u,l,c,f,p=[n||E],d=v.call(e,"type")?e.type:e,h=v.call(e,"namespace")?e.namespace.split("."):[];if(o=f=a=n=n||E,3!==n.nodeType&&8!==n.nodeType&&!bt.test(d+S.event.triggered)&&(-1<d.indexOf(".")&&(d=(h=d.split(".")).shift(),h.sort()),u=d.indexOf(":")<0&&"on"+d,(e=e[S.expando]?e:new S.Event(d,"object"==typeof e&&e)).isTrigger=r?2:3,e.namespace=h.join("."),e.rnamespace=e.namespace?new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,e.result=void 0,e.target||(e.target=n),t=null==t?[e]:S.makeArray(t,[e]),c=S.event.special[d]||{},r||!c.trigger||!1!==c.trigger.apply(n,t))){if(!r&&!c.noBubble&&!x(n)){for(s=c.delegateType||d,bt.test(s+d)||(o=o.parentNode);o;o=o.parentNode)p.push(o),a=o;a===(n.ownerDocument||E)&&p.push(a.defaultView||a.parentWindow||C)}i=0;while((o=p[i++])&&!e.isPropagationStopped())f=o,e.type=1<i?s:c.bindType||d,(l=(Y.get(o,"events")||Object.create(null))[e.type]&&Y.get(o,"handle"))&&l.apply(o,t),(l=u&&o[u])&&l.apply&&V(o)&&(e.result=l.apply(o,t),!1===e.result&&e.preventDefault());return e.type=d,r||e.isDefaultPrevented()||c._default&&!1!==c._default.apply(p.pop(),t)||!V(n)||u&&m(n[d])&&!x(n)&&((a=n[u])&&(n[u]=null),S.event.triggered=d,e.isPropagationStopped()&&f.addEventListener(d,wt),n[d](),e.isPropagationStopped()&&f.removeEventListener(d,wt),S.event.triggered=void 0,a&&(n[u]=a)),e.result}},simulate:function(e,t,n){var r=S.extend(new S.Event,n,{type:e,isSimulated:!0});S.event.trigger(r,null,t)}}),S.fn.extend({trigger:function(e,t){return this.each(function(){S.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];if(n)return S.event.trigger(e,t,n,!0)}}),y.focusin||S.each({focus:"focusin",blur:"focusout"},function(n,r){var i=function(e){S.event.simulate(r,e.target,S.event.fix(e))};S.event.special[r]={setup:function(){var e=this.ownerDocument||this.document||this,t=Y.access(e,r);t||e.addEventListener(n,i,!0),Y.access(e,r,(t||0)+1)},teardown:function(){var e=this.ownerDocument||this.document||this,t=Y.access(e,r)-1;t?Y.access(e,r,t):(e.removeEventListener(n,i,!0),Y.remove(e,r))}}});var Tt=C.location,Ct={guid:Date.now()},Et=/\?/;S.parseXML=function(e){var t;if(!e||"string"!=typeof e)return null;try{t=(new C.DOMParser).parseFromString(e,"text/xml")}catch(e){t=void 0}return t&&!t.getElementsByTagName("parsererror").length||S.error("Invalid XML: "+e),t};var St=/\[\]$/,kt=/\r?\n/g,At=/^(?:submit|button|image|reset|file)$/i,Nt=/^(?:input|select|textarea|keygen)/i;function Dt(n,e,r,i){var t;if(Array.isArray(e))S.each(e,function(e,t){r||St.test(n)?i(n,t):Dt(n+"["+("object"==typeof t&&null!=t?e:"")+"]",t,r,i)});else if(r||"object"!==w(e))i(n,e);else for(t in e)Dt(n+"["+t+"]",e[t],r,i)}S.param=function(e,t){var n,r=[],i=function(e,t){var n=m(t)?t():t;r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==n?"":n)};if(null==e)return"";if(Array.isArray(e)||e.jquery&&!S.isPlainObject(e))S.each(e,function(){i(this.name,this.value)});else for(n in e)Dt(n,e[n],t,i);return r.join("&")},S.fn.extend({serialize:function(){return S.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=S.prop(this,"elements");return e?S.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!S(this).is(":disabled")&&Nt.test(this.nodeName)&&!At.test(e)&&(this.checked||!pe.test(e))}).map(function(e,t){var n=S(this).val();return null==n?null:Array.isArray(n)?S.map(n,function(e){return{name:t.name,value:e.replace(kt,"\r\n")}}):{name:t.name,value:n.replace(kt,"\r\n")}}).get()}});var jt=/%20/g,qt=/#.*$/,Lt=/([?&])_=[^&]*/,Ht=/^(.*?):[ \t]*([^\r\n]*)$/gm,Ot=/^(?:GET|HEAD)$/,Pt=/^\/\//,Rt={},Mt={},It="*/".concat("*"),Wt=E.createElement("a");function Ft(o){return function(e,t){"string"!=typeof e&&(t=e,e="*");var n,r=0,i=e.toLowerCase().match(P)||[];if(m(t))while(n=i[r++])"+"===n[0]?(n=n.slice(1)||"*",(o[n]=o[n]||[]).unshift(t)):(o[n]=o[n]||[]).push(t)}}function Bt(t,i,o,a){var s={},u=t===Mt;function l(e){var r;return s[e]=!0,S.each(t[e]||[],function(e,t){var n=t(i,o,a);return"string"!=typeof n||u||s[n]?u?!(r=n):void 0:(i.dataTypes.unshift(n),l(n),!1)}),r}return l(i.dataTypes[0])||!s["*"]&&l("*")}function $t(e,t){var n,r,i=S.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&S.extend(!0,e,r),e}Wt.href=Tt.href,S.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Tt.href,type:"GET",isLocal:/^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Tt.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":It,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":S.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?$t($t(e,S.ajaxSettings),t):$t(S.ajaxSettings,e)},ajaxPrefilter:Ft(Rt),ajaxTransport:Ft(Mt),ajax:function(e,t){"object"==typeof e&&(t=e,e=void 0),t=t||{};var c,f,p,n,d,r,h,g,i,o,v=S.ajaxSetup({},t),y=v.context||v,m=v.context&&(y.nodeType||y.jquery)?S(y):S.event,x=S.Deferred(),b=S.Callbacks("once memory"),w=v.statusCode||{},a={},s={},u="canceled",T={readyState:0,getResponseHeader:function(e){var t;if(h){if(!n){n={};while(t=Ht.exec(p))n[t[1].toLowerCase()+" "]=(n[t[1].toLowerCase()+" "]||[]).concat(t[2])}t=n[e.toLowerCase()+" "]}return null==t?null:t.join(", ")},getAllResponseHeaders:function(){return h?p:null},setRequestHeader:function(e,t){return null==h&&(e=s[e.toLowerCase()]=s[e.toLowerCase()]||e,a[e]=t),this},overrideMimeType:function(e){return null==h&&(v.mimeType=e),this},statusCode:function(e){var t;if(e)if(h)T.always(e[T.status]);else for(t in e)w[t]=[w[t],e[t]];return this},abort:function(e){var t=e||u;return c&&c.abort(t),l(0,t),this}};if(x.promise(T),v.url=((e||v.url||Tt.href)+"").replace(Pt,Tt.protocol+"//"),v.type=t.method||t.type||v.method||v.type,v.dataTypes=(v.dataType||"*").toLowerCase().match(P)||[""],null==v.crossDomain){r=E.createElement("a");try{r.href=v.url,r.href=r.href,v.crossDomain=Wt.protocol+"//"+Wt.host!=r.protocol+"//"+r.host}catch(e){v.crossDomain=!0}}if(v.data&&v.processData&&"string"!=typeof v.data&&(v.data=S.param(v.data,v.traditional)),Bt(Rt,v,t,T),h)return T;for(i in(g=S.event&&v.global)&&0==S.active++&&S.event.trigger("ajaxStart"),v.type=v.type.toUpperCase(),v.hasContent=!Ot.test(v.type),f=v.url.replace(qt,""),v.hasContent?v.data&&v.processData&&0===(v.contentType||"").indexOf("application/x-www-form-urlencoded")&&(v.data=v.data.replace(jt,"+")):(o=v.url.slice(f.length),v.data&&(v.processData||"string"==typeof v.data)&&(f+=(Et.test(f)?"&":"?")+v.data,delete v.data),!1===v.cache&&(f=f.replace(Lt,"$1"),o=(Et.test(f)?"&":"?")+"_="+Ct.guid+++o),v.url=f+o),v.ifModified&&(S.lastModified[f]&&T.setRequestHeader("If-Modified-Since",S.lastModified[f]),S.etag[f]&&T.setRequestHeader("If-None-Match",S.etag[f])),(v.data&&v.hasContent&&!1!==v.contentType||t.contentType)&&T.setRequestHeader("Content-Type",v.contentType),T.setRequestHeader("Accept",v.dataTypes[0]&&v.accepts[v.dataTypes[0]]?v.accepts[v.dataTypes[0]]+("*"!==v.dataTypes[0]?", "+It+"; q=0.01":""):v.accepts["*"]),v.headers)T.setRequestHeader(i,v.headers[i]);if(v.beforeSend&&(!1===v.beforeSend.call(y,T,v)||h))return T.abort();if(u="abort",b.add(v.complete),T.done(v.success),T.fail(v.error),c=Bt(Mt,v,t,T)){if(T.readyState=1,g&&m.trigger("ajaxSend",[T,v]),h)return T;v.async&&0<v.timeout&&(d=C.setTimeout(function(){T.abort("timeout")},v.timeout));try{h=!1,c.send(a,l)}catch(e){if(h)throw e;l(-1,e)}}else l(-1,"No Transport");function l(e,t,n,r){var i,o,a,s,u,l=t;h||(h=!0,d&&C.clearTimeout(d),c=void 0,p=r||"",T.readyState=0<e?4:0,i=200<=e&&e<300||304===e,n&&(s=function(e,t,n){var r,i,o,a,s=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in s)if(s[i]&&s[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}a||(a=i)}o=o||a}if(o)return o!==u[0]&&u.unshift(o),n[o]}(v,T,n)),!i&&-1<S.inArray("script",v.dataTypes)&&(v.converters["text script"]=function(){}),s=function(e,t,n,r){var i,o,a,s,u,l={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)l[a.toLowerCase()]=e.converters[a];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(!(a=l[u+" "+o]||l["* "+o]))for(i in l)if((s=i.split(" "))[1]===o&&(a=l[u+" "+s[0]]||l["* "+s[0]])){!0===a?a=l[i]:!0!==l[i]&&(o=s[0],c.unshift(s[1]));break}if(!0!==a)if(a&&e["throws"])t=a(t);else try{t=a(t)}catch(e){return{state:"parsererror",error:a?e:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}(v,s,T,i),i?(v.ifModified&&((u=T.getResponseHeader("Last-Modified"))&&(S.lastModified[f]=u),(u=T.getResponseHeader("etag"))&&(S.etag[f]=u)),204===e||"HEAD"===v.type?l="nocontent":304===e?l="notmodified":(l=s.state,o=s.data,i=!(a=s.error))):(a=l,!e&&l||(l="error",e<0&&(e=0))),T.status=e,T.statusText=(t||l)+"",i?x.resolveWith(y,[o,l,T]):x.rejectWith(y,[T,l,a]),T.statusCode(w),w=void 0,g&&m.trigger(i?"ajaxSuccess":"ajaxError",[T,v,i?o:a]),b.fireWith(y,[T,l]),g&&(m.trigger("ajaxComplete",[T,v]),--S.active||S.event.trigger("ajaxStop")))}return T},getJSON:function(e,t,n){return S.get(e,t,n,"json")},getScript:function(e,t){return S.get(e,void 0,t,"script")}}),S.each(["get","post"],function(e,i){S[i]=function(e,t,n,r){return m(t)&&(r=r||n,n=t,t=void 0),S.ajax(S.extend({url:e,type:i,dataType:r,data:t,success:n},S.isPlainObject(e)&&e))}}),S.ajaxPrefilter(function(e){var t;for(t in e.headers)"content-type"===t.toLowerCase()&&(e.contentType=e.headers[t]||"")}),S._evalUrl=function(e,t,n){return S.ajax({url:e,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,converters:{"text script":function(){}},dataFilter:function(e){S.globalEval(e,t,n)}})},S.fn.extend({wrapAll:function(e){var t;return this[0]&&(m(e)&&(e=e.call(this[0])),t=S(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this},wrapInner:function(n){return m(n)?this.each(function(e){S(this).wrapInner(n.call(this,e))}):this.each(function(){var e=S(this),t=e.contents();t.length?t.wrapAll(n):e.append(n)})},wrap:function(t){var n=m(t);return this.each(function(e){S(this).wrapAll(n?t.call(this,e):t)})},unwrap:function(e){return this.parent(e).not("body").each(function(){S(this).replaceWith(this.childNodes)}),this}}),S.expr.pseudos.hidden=function(e){return!S.expr.pseudos.visible(e)},S.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},S.ajaxSettings.xhr=function(){try{return new C.XMLHttpRequest}catch(e){}};var _t={0:200,1223:204},zt=S.ajaxSettings.xhr();y.cors=!!zt&&"withCredentials"in zt,y.ajax=zt=!!zt,S.ajaxTransport(function(i){var o,a;if(y.cors||zt&&!i.crossDomain)return{send:function(e,t){var n,r=i.xhr();if(r.open(i.type,i.url,i.async,i.username,i.password),i.xhrFields)for(n in i.xhrFields)r[n]=i.xhrFields[n];for(n in i.mimeType&&r.overrideMimeType&&r.overrideMimeType(i.mimeType),i.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest"),e)r.setRequestHeader(n,e[n]);o=function(e){return function(){o&&(o=a=r.onload=r.onerror=r.onabort=r.ontimeout=r.onreadystatechange=null,"abort"===e?r.abort():"error"===e?"number"!=typeof r.status?t(0,"error"):t(r.status,r.statusText):t(_t[r.status]||r.status,r.statusText,"text"!==(r.responseType||"text")||"string"!=typeof r.responseText?{binary:r.response}:{text:r.responseText},r.getAllResponseHeaders()))}},r.onload=o(),a=r.onerror=r.ontimeout=o("error"),void 0!==r.onabort?r.onabort=a:r.onreadystatechange=function(){4===r.readyState&&C.setTimeout(function(){o&&a()})},o=o("abort");try{r.send(i.hasContent&&i.data||null)}catch(e){if(o)throw e}},abort:function(){o&&o()}}}),S.ajaxPrefilter(function(e){e.crossDomain&&(e.contents.script=!1)}),S.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return S.globalEval(e),e}}}),S.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),S.ajaxTransport("script",function(n){var r,i;if(n.crossDomain||n.scriptAttrs)return{send:function(e,t){r=S("<script>").attr(n.scriptAttrs||{}).prop({charset:n.scriptCharset,src:n.url}).on("load error",i=function(e){r.remove(),i=null,e&&t("error"===e.type?404:200,e.type)}),E.head.appendChild(r[0])},abort:function(){i&&i()}}});var Ut,Xt=[],Vt=/(=)\?(?=&|$)|\?\?/;S.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Xt.pop()||S.expando+"_"+Ct.guid++;return this[e]=!0,e}}),S.ajaxPrefilter("json jsonp",function(e,t,n){var r,i,o,a=!1!==e.jsonp&&(Vt.test(e.url)?"url":"string"==typeof e.data&&0===(e.contentType||"").indexOf("application/x-www-form-urlencoded")&&Vt.test(e.data)&&"data");if(a||"jsonp"===e.dataTypes[0])return r=e.jsonpCallback=m(e.jsonpCallback)?e.jsonpCallback():e.jsonpCallback,a?e[a]=e[a].replace(Vt,"$1"+r):!1!==e.jsonp&&(e.url+=(Et.test(e.url)?"&":"?")+e.jsonp+"="+r),e.converters["script json"]=function(){return o||S.error(r+" was not called"),o[0]},e.dataTypes[0]="json",i=C[r],C[r]=function(){o=arguments},n.always(function(){void 0===i?S(C).removeProp(r):C[r]=i,e[r]&&(e.jsonpCallback=t.jsonpCallback,Xt.push(r)),o&&m(i)&&i(o[0]),o=i=void 0}),"script"}),y.createHTMLDocument=((Ut=E.implementation.createHTMLDocument("").body).innerHTML="<form></form><form></form>",2===Ut.childNodes.length),S.parseHTML=function(e,t,n){return"string"!=typeof e?[]:("boolean"==typeof t&&(n=t,t=!1),t||(y.createHTMLDocument?((r=(t=E.implementation.createHTMLDocument("")).createElement("base")).href=E.location.href,t.head.appendChild(r)):t=E),o=!n&&[],(i=N.exec(e))?[t.createElement(i[1])]:(i=xe([e],t,o),o&&o.length&&S(o).remove(),S.merge([],i.childNodes)));var r,i,o},S.fn.load=function(e,t,n){var r,i,o,a=this,s=e.indexOf(" ");return-1<s&&(r=vt(e.slice(s)),e=e.slice(0,s)),m(t)?(n=t,t=void 0):t&&"object"==typeof t&&(i="POST"),0<a.length&&S.ajax({url:e,type:i||"GET",dataType:"html",data:t}).done(function(e){o=arguments,a.html(r?S("<div>").append(S.parseHTML(e)).find(r):e)}).always(n&&function(e,t){a.each(function(){n.apply(this,o||[e.responseText,t,e])})}),this},S.expr.pseudos.animated=function(t){return S.grep(S.timers,function(e){return t===e.elem}).length},S.offset={setOffset:function(e,t,n){var r,i,o,a,s,u,l=S.css(e,"position"),c=S(e),f={};"static"===l&&(e.style.position="relative"),s=c.offset(),o=S.css(e,"top"),u=S.css(e,"left"),("absolute"===l||"fixed"===l)&&-1<(o+u).indexOf("auto")?(a=(r=c.position()).top,i=r.left):(a=parseFloat(o)||0,i=parseFloat(u)||0),m(t)&&(t=t.call(e,n,S.extend({},s))),null!=t.top&&(f.top=t.top-s.top+a),null!=t.left&&(f.left=t.left-s.left+i),"using"in t?t.using.call(e,f):("number"==typeof f.top&&(f.top+="px"),"number"==typeof f.left&&(f.left+="px"),c.css(f))}},S.fn.extend({offset:function(t){if(arguments.length)return void 0===t?this:this.each(function(e){S.offset.setOffset(this,t,e)});var e,n,r=this[0];return r?r.getClientRects().length?(e=r.getBoundingClientRect(),n=r.ownerDocument.defaultView,{top:e.top+n.pageYOffset,left:e.left+n.pageXOffset}):{top:0,left:0}:void 0},position:function(){if(this[0]){var e,t,n,r=this[0],i={top:0,left:0};if("fixed"===S.css(r,"position"))t=r.getBoundingClientRect();else{t=this.offset(),n=r.ownerDocument,e=r.offsetParent||n.documentElement;while(e&&(e===n.body||e===n.documentElement)&&"static"===S.css(e,"position"))e=e.parentNode;e&&e!==r&&1===e.nodeType&&((i=S(e).offset()).top+=S.css(e,"borderTopWidth",!0),i.left+=S.css(e,"borderLeftWidth",!0))}return{top:t.top-i.top-S.css(r,"marginTop",!0),left:t.left-i.left-S.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent;while(e&&"static"===S.css(e,"position"))e=e.offsetParent;return e||re})}}),S.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,i){var o="pageYOffset"===i;S.fn[t]=function(e){return $(this,function(e,t,n){var r;if(x(e)?r=e:9===e.nodeType&&(r=e.defaultView),void 0===n)return r?r[i]:e[t];r?r.scrollTo(o?r.pageXOffset:n,o?n:r.pageYOffset):e[t]=n},t,e,arguments.length)}}),S.each(["top","left"],function(e,n){S.cssHooks[n]=$e(y.pixelPosition,function(e,t){if(t)return t=Be(e,n),Me.test(t)?S(e).position()[n]+"px":t})}),S.each({Height:"height",Width:"width"},function(a,s){S.each({padding:"inner"+a,content:s,"":"outer"+a},function(r,o){S.fn[o]=function(e,t){var n=arguments.length&&(r||"boolean"!=typeof e),i=r||(!0===e||!0===t?"margin":"border");return $(this,function(e,t,n){var r;return x(e)?0===o.indexOf("outer")?e["inner"+a]:e.document.documentElement["client"+a]:9===e.nodeType?(r=e.documentElement,Math.max(e.body["scroll"+a],r["scroll"+a],e.body["offset"+a],r["offset"+a],r["client"+a])):void 0===n?S.css(e,t,i):S.style(e,t,n,i)},s,n?e:void 0,n)}})}),S.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){S.fn[t]=function(e){return this.on(t,e)}}),S.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),S.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(e,n){S.fn[n]=function(e,t){return 0<arguments.length?this.on(n,null,e,t):this.trigger(n)}});var Gt=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;S.proxy=function(e,t){var n,r,i;if("string"==typeof t&&(n=e[t],t=e,e=n),m(e))return r=s.call(arguments,2),(i=function(){return e.apply(t||this,r.concat(s.call(arguments)))}).guid=e.guid=e.guid||S.guid++,i},S.holdReady=function(e){e?S.readyWait++:S.ready(!0)},S.isArray=Array.isArray,S.parseJSON=JSON.parse,S.nodeName=A,S.isFunction=m,S.isWindow=x,S.camelCase=X,S.type=w,S.now=Date.now,S.isNumeric=function(e){var t=S.type(e);return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},S.trim=function(e){return null==e?"":(e+"").replace(Gt,"")},"function"==typeof define&&define.amd&&define("jquery",[],function(){return S});var Yt=C.jQuery,Qt=C.$;return S.noConflict=function(e){return C.$===S&&(C.$=Qt),e&&C.jQuery===S&&(C.jQuery=Yt),S},"undefined"==typeof e&&(C.jQuery=C.$=S),S});
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.AOS=t():e.AOS=t()}(this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={exports:{},id:o,loaded:!1};return e[o].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="dist/",t(0)}([function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},r=n(1),a=(o(r),n(6)),u=o(a),c=n(7),f=o(c),s=n(8),d=o(s),l=n(9),p=o(l),m=n(10),b=o(m),v=n(11),y=o(v),g=n(14),h=o(g),w=[],k=!1,x=document.all&&!window.atob,j={offset:120,delay:0,easing:"ease",duration:400,disable:!1,once:!1,startEvent:"DOMContentLoaded",throttleDelay:99,debounceDelay:50,disableMutationObserver:!1},O=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(e&&(k=!0),k)return w=(0,y.default)(w,j),(0,b.default)(w,j.once),w},_=function(){w=(0,h.default)(),O()},S=function(){w.forEach(function(e,t){e.node.removeAttribute("data-aos"),e.node.removeAttribute("data-aos-easing"),e.node.removeAttribute("data-aos-duration"),e.node.removeAttribute("data-aos-delay")})},z=function(e){return e===!0||"mobile"===e&&p.default.mobile()||"phone"===e&&p.default.phone()||"tablet"===e&&p.default.tablet()||"function"==typeof e&&e()===!0},A=function(e){return j=i(j,e),w=(0,h.default)(),z(j.disable)||x?S():(document.querySelector("body").setAttribute("data-aos-easing",j.easing),document.querySelector("body").setAttribute("data-aos-duration",j.duration),document.querySelector("body").setAttribute("data-aos-delay",j.delay),"DOMContentLoaded"===j.startEvent&&["complete","interactive"].indexOf(document.readyState)>-1?O(!0):"load"===j.startEvent?window.addEventListener(j.startEvent,function(){O(!0)}):document.addEventListener(j.startEvent,function(){O(!0)}),window.addEventListener("resize",(0,f.default)(O,j.debounceDelay,!0)),window.addEventListener("orientationchange",(0,f.default)(O,j.debounceDelay,!0)),window.addEventListener("scroll",(0,u.default)(function(){(0,b.default)(w,j.once)},j.throttleDelay)),j.disableMutationObserver||(0,d.default)("[data-aos]",_),w)};e.exports={init:A,refresh:O,refreshHard:_}},function(e,t){},,,,,function(e,t){(function(t){"use strict";function n(e,t,n){function o(t){var n=b,o=v;return b=v=void 0,k=t,g=e.apply(o,n)}function r(e){return k=e,h=setTimeout(s,t),_?o(e):g}function a(e){var n=e-w,o=e-k,i=t-n;return S?j(i,y-o):i}function c(e){var n=e-w,o=e-k;return void 0===w||n>=t||n<0||S&&o>=y}function s(){var e=O();return c(e)?d(e):void(h=setTimeout(s,a(e)))}function d(e){return h=void 0,z&&b?o(e):(b=v=void 0,g)}function l(){void 0!==h&&clearTimeout(h),k=0,b=w=v=h=void 0}function p(){return void 0===h?g:d(O())}function m(){var e=O(),n=c(e);if(b=arguments,v=this,w=e,n){if(void 0===h)return r(w);if(S)return h=setTimeout(s,t),o(w)}return void 0===h&&(h=setTimeout(s,t)),g}var b,v,y,g,h,w,k=0,_=!1,S=!1,z=!0;if("function"!=typeof e)throw new TypeError(f);return t=u(t)||0,i(n)&&(_=!!n.leading,S="maxWait"in n,y=S?x(u(n.maxWait)||0,t):y,z="trailing"in n?!!n.trailing:z),m.cancel=l,m.flush=p,m}function o(e,t,o){var r=!0,a=!0;if("function"!=typeof e)throw new TypeError(f);return i(o)&&(r="leading"in o?!!o.leading:r,a="trailing"in o?!!o.trailing:a),n(e,t,{leading:r,maxWait:t,trailing:a})}function i(e){var t="undefined"==typeof e?"undefined":c(e);return!!e&&("object"==t||"function"==t)}function r(e){return!!e&&"object"==("undefined"==typeof e?"undefined":c(e))}function a(e){return"symbol"==("undefined"==typeof e?"undefined":c(e))||r(e)&&k.call(e)==d}function u(e){if("number"==typeof e)return e;if(a(e))return s;if(i(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=i(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(l,"");var n=m.test(e);return n||b.test(e)?v(e.slice(2),n?2:8):p.test(e)?s:+e}var c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f="Expected a function",s=NaN,d="[object Symbol]",l=/^\s+|\s+$/g,p=/^[-+]0x[0-9a-f]+$/i,m=/^0b[01]+$/i,b=/^0o[0-7]+$/i,v=parseInt,y="object"==("undefined"==typeof t?"undefined":c(t))&&t&&t.Object===Object&&t,g="object"==("undefined"==typeof self?"undefined":c(self))&&self&&self.Object===Object&&self,h=y||g||Function("return this")(),w=Object.prototype,k=w.toString,x=Math.max,j=Math.min,O=function(){return h.Date.now()};e.exports=o}).call(t,function(){return this}())},function(e,t){(function(t){"use strict";function n(e,t,n){function i(t){var n=b,o=v;return b=v=void 0,O=t,g=e.apply(o,n)}function r(e){return O=e,h=setTimeout(s,t),_?i(e):g}function u(e){var n=e-w,o=e-O,i=t-n;return S?x(i,y-o):i}function f(e){var n=e-w,o=e-O;return void 0===w||n>=t||n<0||S&&o>=y}function s(){var e=j();return f(e)?d(e):void(h=setTimeout(s,u(e)))}function d(e){return h=void 0,z&&b?i(e):(b=v=void 0,g)}function l(){void 0!==h&&clearTimeout(h),O=0,b=w=v=h=void 0}function p(){return void 0===h?g:d(j())}function m(){var e=j(),n=f(e);if(b=arguments,v=this,w=e,n){if(void 0===h)return r(w);if(S)return h=setTimeout(s,t),i(w)}return void 0===h&&(h=setTimeout(s,t)),g}var b,v,y,g,h,w,O=0,_=!1,S=!1,z=!0;if("function"!=typeof e)throw new TypeError(c);return t=a(t)||0,o(n)&&(_=!!n.leading,S="maxWait"in n,y=S?k(a(n.maxWait)||0,t):y,z="trailing"in n?!!n.trailing:z),m.cancel=l,m.flush=p,m}function o(e){var t="undefined"==typeof e?"undefined":u(e);return!!e&&("object"==t||"function"==t)}function i(e){return!!e&&"object"==("undefined"==typeof e?"undefined":u(e))}function r(e){return"symbol"==("undefined"==typeof e?"undefined":u(e))||i(e)&&w.call(e)==s}function a(e){if("number"==typeof e)return e;if(r(e))return f;if(o(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=o(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(d,"");var n=p.test(e);return n||m.test(e)?b(e.slice(2),n?2:8):l.test(e)?f:+e}var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c="Expected a function",f=NaN,s="[object Symbol]",d=/^\s+|\s+$/g,l=/^[-+]0x[0-9a-f]+$/i,p=/^0b[01]+$/i,m=/^0o[0-7]+$/i,b=parseInt,v="object"==("undefined"==typeof t?"undefined":u(t))&&t&&t.Object===Object&&t,y="object"==("undefined"==typeof self?"undefined":u(self))&&self&&self.Object===Object&&self,g=v||y||Function("return this")(),h=Object.prototype,w=h.toString,k=Math.max,x=Math.min,j=function(){return g.Date.now()};e.exports=n}).call(t,function(){return this}())},function(e,t){"use strict";function n(e,t){var n=new r(o);a=t,n.observe(i.documentElement,{childList:!0,subtree:!0,removedNodes:!0})}function o(e){e&&e.forEach(function(e){var t=Array.prototype.slice.call(e.addedNodes),n=Array.prototype.slice.call(e.removedNodes),o=t.concat(n).filter(function(e){return e.hasAttribute&&e.hasAttribute("data-aos")}).length;o&&a()})}Object.defineProperty(t,"__esModule",{value:!0});var i=window.document,r=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver,a=function(){};t.default=n},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(){return navigator.userAgent||navigator.vendor||window.opera||""}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,a=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,u=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,c=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,f=function(){function e(){n(this,e)}return i(e,[{key:"phone",value:function(){var e=o();return!(!r.test(e)&&!a.test(e.substr(0,4)))}},{key:"mobile",value:function(){var e=o();return!(!u.test(e)&&!c.test(e.substr(0,4)))}},{key:"tablet",value:function(){return this.mobile()&&!this.phone()}}]),e}();t.default=new f},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e,t,n){var o=e.node.getAttribute("data-aos-once");t>e.position?e.node.classList.add("aos-animate"):"undefined"!=typeof o&&("false"===o||!n&&"true"!==o)&&e.node.classList.remove("aos-animate")},o=function(e,t){var o=window.pageYOffset,i=window.innerHeight;e.forEach(function(e,r){n(e,i+o,t)})};t.default=o},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(12),r=o(i),a=function(e,t){return e.forEach(function(e,n){e.node.classList.add("aos-init"),e.position=(0,r.default)(e.node,t.offset)}),e};t.default=a},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(13),r=o(i),a=function(e,t){var n=0,o=0,i=window.innerHeight,a={offset:e.getAttribute("data-aos-offset"),anchor:e.getAttribute("data-aos-anchor"),anchorPlacement:e.getAttribute("data-aos-anchor-placement")};switch(a.offset&&!isNaN(a.offset)&&(o=parseInt(a.offset)),a.anchor&&document.querySelectorAll(a.anchor)&&(e=document.querySelectorAll(a.anchor)[0]),n=(0,r.default)(e).top,a.anchorPlacement){case"top-bottom":break;case"center-bottom":n+=e.offsetHeight/2;break;case"bottom-bottom":n+=e.offsetHeight;break;case"top-center":n+=i/2;break;case"bottom-center":n+=i/2+e.offsetHeight;break;case"center-center":n+=i/2+e.offsetHeight/2;break;case"top-top":n+=i;break;case"bottom-top":n+=e.offsetHeight+i;break;case"center-top":n+=e.offsetHeight/2+i}return a.anchorPlacement||a.offset||isNaN(t)||(o=t),n+o};t.default=a},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e){for(var t=0,n=0;e&&!isNaN(e.offsetLeft)&&!isNaN(e.offsetTop);)t+=e.offsetLeft-("BODY"!=e.tagName?e.scrollLeft:0),n+=e.offsetTop-("BODY"!=e.tagName?e.scrollTop:0),e=e.offsetParent;return{top:n,left:t}};t.default=n},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e){return e=e||document.querySelectorAll("[data-aos]"),Array.prototype.map.call(e,function(e){return{node:e}})};t.default=n}])});
/*
 * Debounce function
 * based on unminified version from http://davidwalsh.name/javascript-debounce-function
 */
PaloAlto.debounce = function(n,t,u){var e;return function(){var a=this,r=arguments,i=function(){e=null,u||n.apply(a,r)},o=u&&!e;clearTimeout(e),e=setTimeout(i,t),o&&n.apply(a,r)}};
/**
 * @license
 * Lodash 4.17.15 (Custom Build) lodash.com/license | Underscore.js 1.8.3 underscorejs.org/LICENSE
 * Build: `lodash core -o ./dist/lodash.core.js`
 */
 ;(function(){function n(n){return H(n)&&pn.call(n,"callee")&&!yn.call(n,"callee")}function t(n,t){return n.push.apply(n,t),n}function r(n){return function(t){return null==t?Z:t[n]}}function e(n,t,r,e,u){return u(n,function(n,u,o){r=e?(e=false,n):t(r,n,u,o)}),r}function u(n,t){return j(t,function(t){return n[t]})}function o(n){return n instanceof i?n:new i(n)}function i(n,t){this.__wrapped__=n,this.__actions__=[],this.__chain__=!!t}function c(n,t,r){if(typeof n!="function")throw new TypeError("Expected a function");
 return setTimeout(function(){n.apply(Z,r)},t)}function f(n,t){var r=true;return mn(n,function(n,e,u){return r=!!t(n,e,u)}),r}function a(n,t,r){for(var e=-1,u=n.length;++e<u;){var o=n[e],i=t(o);if(null!=i&&(c===Z?i===i:r(i,c)))var c=i,f=o}return f}function l(n,t){var r=[];return mn(n,function(n,e,u){t(n,e,u)&&r.push(n)}),r}function p(n,r,e,u,o){var i=-1,c=n.length;for(e||(e=R),o||(o=[]);++i<c;){var f=n[i];0<r&&e(f)?1<r?p(f,r-1,e,u,o):t(o,f):u||(o[o.length]=f)}return o}function s(n,t){return n&&On(n,t,Dn);
 }function h(n,t){return l(t,function(t){return U(n[t])})}function v(n,t){return n>t}function b(n,t,r,e,u){return n===t||(null==n||null==t||!H(n)&&!H(t)?n!==n&&t!==t:y(n,t,r,e,b,u))}function y(n,t,r,e,u,o){var i=Nn(n),c=Nn(t),f=i?"[object Array]":hn.call(n),a=c?"[object Array]":hn.call(t),f="[object Arguments]"==f?"[object Object]":f,a="[object Arguments]"==a?"[object Object]":a,l="[object Object]"==f,c="[object Object]"==a,a=f==a;o||(o=[]);var p=An(o,function(t){return t[0]==n}),s=An(o,function(n){
 return n[0]==t});if(p&&s)return p[1]==t;if(o.push([n,t]),o.push([t,n]),a&&!l){if(i)r=T(n,t,r,e,u,o);else n:{switch(f){case"[object Boolean]":case"[object Date]":case"[object Number]":r=J(+n,+t);break n;case"[object Error]":r=n.name==t.name&&n.message==t.message;break n;case"[object RegExp]":case"[object String]":r=n==t+"";break n}r=false}return o.pop(),r}return 1&r||(i=l&&pn.call(n,"__wrapped__"),f=c&&pn.call(t,"__wrapped__"),!i&&!f)?!!a&&(r=B(n,t,r,e,u,o),o.pop(),r):(i=i?n.value():n,f=f?t.value():t,
 r=u(i,f,r,e,o),o.pop(),r)}function g(n){return typeof n=="function"?n:null==n?X:(typeof n=="object"?d:r)(n)}function _(n,t){return n<t}function j(n,t){var r=-1,e=M(n)?Array(n.length):[];return mn(n,function(n,u,o){e[++r]=t(n,u,o)}),e}function d(n){var t=_n(n);return function(r){var e=t.length;if(null==r)return!e;for(r=Object(r);e--;){var u=t[e];if(!(u in r&&b(n[u],r[u],3)))return false}return true}}function m(n,t){return n=Object(n),C(t,function(t,r){return r in n&&(t[r]=n[r]),t},{})}function O(n){return xn(I(n,void 0,X),n+"");
 }function x(n,t,r){var e=-1,u=n.length;for(0>t&&(t=-t>u?0:u+t),r=r>u?u:r,0>r&&(r+=u),u=t>r?0:r-t>>>0,t>>>=0,r=Array(u);++e<u;)r[e]=n[e+t];return r}function A(n){return x(n,0,n.length)}function E(n,t){var r;return mn(n,function(n,e,u){return r=t(n,e,u),!r}),!!r}function w(n,r){return C(r,function(n,r){return r.func.apply(r.thisArg,t([n],r.args))},n)}function k(n,t,r){var e=!r;r||(r={});for(var u=-1,o=t.length;++u<o;){var i=t[u],c=Z;if(c===Z&&(c=n[i]),e)r[i]=c;else{var f=r,a=f[i];pn.call(f,i)&&J(a,c)&&(c!==Z||i in f)||(f[i]=c);
 }}return r}function N(n){return O(function(t,r){var e=-1,u=r.length,o=1<u?r[u-1]:Z,o=3<n.length&&typeof o=="function"?(u--,o):Z;for(t=Object(t);++e<u;){var i=r[e];i&&n(t,i,e,o)}return t})}function F(n){return function(){var t=arguments,r=dn(n.prototype),t=n.apply(r,t);return V(t)?t:r}}function S(n,t,r){function e(){for(var o=-1,i=arguments.length,c=-1,f=r.length,a=Array(f+i),l=this&&this!==on&&this instanceof e?u:n;++c<f;)a[c]=r[c];for(;i--;)a[c++]=arguments[++o];return l.apply(t,a)}if(typeof n!="function")throw new TypeError("Expected a function");
 var u=F(n);return e}function T(n,t,r,e,u,o){var i=n.length,c=t.length;if(i!=c&&!(1&r&&c>i))return false;for(var c=-1,f=true,a=2&r?[]:Z;++c<i;){var l=n[c],p=t[c];if(void 0!==Z){f=false;break}if(a){if(!E(t,function(n,t){if(!P(a,t)&&(l===n||u(l,n,r,e,o)))return a.push(t)})){f=false;break}}else if(l!==p&&!u(l,p,r,e,o)){f=false;break}}return f}function B(n,t,r,e,u,o){var i=1&r,c=Dn(n),f=c.length,a=Dn(t).length;if(f!=a&&!i)return false;for(var l=f;l--;){var p=c[l];if(!(i?p in t:pn.call(t,p)))return false}for(a=true;++l<f;){var p=c[l],s=n[p],h=t[p];
 if(void 0!==Z||s!==h&&!u(s,h,r,e,o)){a=false;break}i||(i="constructor"==p)}return a&&!i&&(r=n.constructor,e=t.constructor,r!=e&&"constructor"in n&&"constructor"in t&&!(typeof r=="function"&&r instanceof r&&typeof e=="function"&&e instanceof e)&&(a=false)),a}function R(t){return Nn(t)||n(t)}function D(n){var t=[];if(null!=n)for(var r in Object(n))t.push(r);return t}function I(n,t,r){return t=jn(t===Z?n.length-1:t,0),function(){for(var e=arguments,u=-1,o=jn(e.length-t,0),i=Array(o);++u<o;)i[u]=e[t+u];for(u=-1,
 o=Array(t+1);++u<t;)o[u]=e[u];return o[t]=r(i),n.apply(this,o)}}function $(n){return(null==n?0:n.length)?p(n,1):[]}function q(n){return n&&n.length?n[0]:Z}function P(n,t,r){var e=null==n?0:n.length;r=typeof r=="number"?0>r?jn(e+r,0):r:0,r=(r||0)-1;for(var u=t===t;++r<e;){var o=n[r];if(u?o===t:o!==o)return r}return-1}function z(n,t){return mn(n,g(t))}function C(n,t,r){return e(n,g(t),r,3>arguments.length,mn)}function G(n,t){var r;if(typeof t!="function")throw new TypeError("Expected a function");return n=Fn(n),
 function(){return 0<--n&&(r=t.apply(this,arguments)),1>=n&&(t=Z),r}}function J(n,t){return n===t||n!==n&&t!==t}function M(n){var t;return(t=null!=n)&&(t=n.length,t=typeof t=="number"&&-1<t&&0==t%1&&9007199254740991>=t),t&&!U(n)}function U(n){return!!V(n)&&(n=hn.call(n),"[object Function]"==n||"[object GeneratorFunction]"==n||"[object AsyncFunction]"==n||"[object Proxy]"==n)}function V(n){var t=typeof n;return null!=n&&("object"==t||"function"==t)}function H(n){return null!=n&&typeof n=="object"}function K(n){
 return typeof n=="number"||H(n)&&"[object Number]"==hn.call(n)}function L(n){return typeof n=="string"||!Nn(n)&&H(n)&&"[object String]"==hn.call(n)}function Q(n){return typeof n=="string"?n:null==n?"":n+""}function W(n){return null==n?[]:u(n,Dn(n))}function X(n){return n}function Y(n,r,e){var u=Dn(r),o=h(r,u);null!=e||V(r)&&(o.length||!u.length)||(e=r,r=n,n=this,o=h(r,Dn(r)));var i=!(V(e)&&"chain"in e&&!e.chain),c=U(n);return mn(o,function(e){var u=r[e];n[e]=u,c&&(n.prototype[e]=function(){var r=this.__chain__;
 if(i||r){var e=n(this.__wrapped__);return(e.__actions__=A(this.__actions__)).push({func:u,args:arguments,thisArg:n}),e.__chain__=r,e}return u.apply(n,t([this.value()],arguments))})}),n}var Z,nn=1/0,tn=/[&<>"']/g,rn=RegExp(tn.source),en=/^(?:0|[1-9]\d*)$/,un=typeof self=="object"&&self&&self.Object===Object&&self,on=typeof global=="object"&&global&&global.Object===Object&&global||un||Function("return this")(),cn=(un=typeof exports=="object"&&exports&&!exports.nodeType&&exports)&&typeof module=="object"&&module&&!module.nodeType&&module,fn=function(n){
 return function(t){return null==n?Z:n[t]}}({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}),an=Array.prototype,ln=Object.prototype,pn=ln.hasOwnProperty,sn=0,hn=ln.toString,vn=on._,bn=Object.create,yn=ln.propertyIsEnumerable,gn=on.isFinite,_n=function(n,t){return function(r){return n(t(r))}}(Object.keys,Object),jn=Math.max,dn=function(){function n(){}return function(t){return V(t)?bn?bn(t):(n.prototype=t,t=new n,n.prototype=Z,t):{}}}();i.prototype=dn(o.prototype),i.prototype.constructor=i;
 var mn=function(n,t){return function(r,e){if(null==r)return r;if(!M(r))return n(r,e);for(var u=r.length,o=t?u:-1,i=Object(r);(t?o--:++o<u)&&false!==e(i[o],o,i););return r}}(s),On=function(n){return function(t,r,e){var u=-1,o=Object(t);e=e(t);for(var i=e.length;i--;){var c=e[n?i:++u];if(false===r(o[c],c,o))break}return t}}(),xn=X,An=function(n){return function(t,r,e){var u=Object(t);if(!M(t)){var o=g(r);t=Dn(t),r=function(n){return o(u[n],n,u)}}return r=n(t,r,e),-1<r?u[o?t[r]:r]:Z}}(function(n,t,r){var e=null==n?0:n.length;
 if(!e)return-1;r=null==r?0:Fn(r),0>r&&(r=jn(e+r,0));n:{for(t=g(t),e=n.length,r+=-1;++r<e;)if(t(n[r],r,n)){n=r;break n}n=-1}return n}),En=O(function(n,t,r){return S(n,t,r)}),wn=O(function(n,t){return c(n,1,t)}),kn=O(function(n,t,r){return c(n,Sn(t)||0,r)}),Nn=Array.isArray,Fn=Number,Sn=Number,Tn=N(function(n,t){k(t,_n(t),n)}),Bn=N(function(n,t){k(t,D(t),n)}),Rn=O(function(n,t){n=Object(n);var r,e=-1,u=t.length,o=2<u?t[2]:Z;if(r=o){r=t[0];var i=t[1];if(V(o)){var c=typeof i;if("number"==c){if(c=M(o))var c=o.length,f=typeof i,c=null==c?9007199254740991:c,c=!!c&&("number"==f||"symbol"!=f&&en.test(i))&&-1<i&&0==i%1&&i<c;
 }else c="string"==c&&i in o;r=!!c&&J(o[i],r)}else r=false}for(r&&(u=1);++e<u;)for(o=t[e],r=In(o),i=-1,c=r.length;++i<c;){var f=r[i],a=n[f];(a===Z||J(a,ln[f])&&!pn.call(n,f))&&(n[f]=o[f])}return n}),Dn=_n,In=D,$n=function(n){return xn(I(n,Z,$),n+"")}(function(n,t){return null==n?{}:m(n,t)});o.assignIn=Bn,o.before=G,o.bind=En,o.chain=function(n){return n=o(n),n.__chain__=true,n},o.compact=function(n){return l(n,Boolean)},o.concat=function(){var n=arguments.length;if(!n)return[];for(var r=Array(n-1),e=arguments[0];n--;)r[n-1]=arguments[n];
 return t(Nn(e)?A(e):[e],p(r,1))},o.create=function(n,t){var r=dn(n);return null==t?r:Tn(r,t)},o.defaults=Rn,o.defer=wn,o.delay=kn,o.filter=function(n,t){return l(n,g(t))},o.flatten=$,o.flattenDeep=function(n){return(null==n?0:n.length)?p(n,nn):[]},o.iteratee=g,o.keys=Dn,o.map=function(n,t){return j(n,g(t))},o.matches=function(n){return d(Tn({},n))},o.mixin=Y,o.negate=function(n){if(typeof n!="function")throw new TypeError("Expected a function");return function(){return!n.apply(this,arguments)}},o.once=function(n){
 return G(2,n)},o.pick=$n,o.slice=function(n,t,r){var e=null==n?0:n.length;return r=r===Z?e:+r,e?x(n,null==t?0:+t,r):[]},o.sortBy=function(n,t){var e=0;return t=g(t),j(j(n,function(n,r,u){return{value:n,index:e++,criteria:t(n,r,u)}}).sort(function(n,t){var r;n:{r=n.criteria;var e=t.criteria;if(r!==e){var u=r!==Z,o=null===r,i=r===r,c=e!==Z,f=null===e,a=e===e;if(!f&&r>e||o&&c&&a||!u&&a||!i){r=1;break n}if(!o&&r<e||f&&u&&i||!c&&i||!a){r=-1;break n}}r=0}return r||n.index-t.index}),r("value"))},o.tap=function(n,t){
 return t(n),n},o.thru=function(n,t){return t(n)},o.toArray=function(n){return M(n)?n.length?A(n):[]:W(n)},o.values=W,o.extend=Bn,Y(o,o),o.clone=function(n){return V(n)?Nn(n)?A(n):k(n,_n(n)):n},o.escape=function(n){return(n=Q(n))&&rn.test(n)?n.replace(tn,fn):n},o.every=function(n,t,r){return t=r?Z:t,f(n,g(t))},o.find=An,o.forEach=z,o.has=function(n,t){return null!=n&&pn.call(n,t)},o.head=q,o.identity=X,o.indexOf=P,o.isArguments=n,o.isArray=Nn,o.isBoolean=function(n){return true===n||false===n||H(n)&&"[object Boolean]"==hn.call(n);
 },o.isDate=function(n){return H(n)&&"[object Date]"==hn.call(n)},o.isEmpty=function(t){return M(t)&&(Nn(t)||L(t)||U(t.splice)||n(t))?!t.length:!_n(t).length},o.isEqual=function(n,t){return b(n,t)},o.isFinite=function(n){return typeof n=="number"&&gn(n)},o.isFunction=U,o.isNaN=function(n){return K(n)&&n!=+n},o.isNull=function(n){return null===n},o.isNumber=K,o.isObject=V,o.isRegExp=function(n){return H(n)&&"[object RegExp]"==hn.call(n)},o.isString=L,o.isUndefined=function(n){return n===Z},o.last=function(n){
 var t=null==n?0:n.length;return t?n[t-1]:Z},o.max=function(n){return n&&n.length?a(n,X,v):Z},o.min=function(n){return n&&n.length?a(n,X,_):Z},o.noConflict=function(){return on._===this&&(on._=vn),this},o.noop=function(){},o.reduce=C,o.result=function(n,t,r){return t=null==n?Z:n[t],t===Z&&(t=r),U(t)?t.call(n):t},o.size=function(n){return null==n?0:(n=M(n)?n:_n(n),n.length)},o.some=function(n,t,r){return t=r?Z:t,E(n,g(t))},o.uniqueId=function(n){var t=++sn;return Q(n)+t},o.each=z,o.first=q,Y(o,function(){
 var n={};return s(o,function(t,r){pn.call(o.prototype,r)||(n[r]=t)}),n}(),{chain:false}),o.VERSION="4.17.15",mn("pop join replace reverse split push shift sort splice unshift".split(" "),function(n){var t=(/^(?:replace|split)$/.test(n)?String.prototype:an)[n],r=/^(?:push|sort|unshift)$/.test(n)?"tap":"thru",e=/^(?:pop|join|replace|shift)$/.test(n);o.prototype[n]=function(){var n=arguments;if(e&&!this.__chain__){var u=this.value();return t.apply(Nn(u)?u:[],n)}return this[r](function(r){return t.apply(Nn(r)?r:[],n);
 })}}),o.prototype.toJSON=o.prototype.valueOf=o.prototype.value=function(){return w(this.__wrapped__,this.__actions__)},typeof define=="function"&&typeof define.amd=="object"&&define.amd?(on._=o, define(function(){return o})):cn?((cn.exports=o)._=o,un._=o):on._=o}).call(this);
PaloAlto.initListeners = (function(){
  function Listeners() {
    this.entries = [];
  }

  Listeners.prototype = $.extend({}, Listeners.prototype, {
    add(element, event, fn) {
      this.entries.push({element: element, event: event, fn: fn});
      element.addEventListener(event, fn);
    },

    removeAll() {
      this.entries = this.entries.filter(function (listener) {
        listener.element.removeEventListener(listener.event, listener.fn);
        return false;
      });
    },
  });

  return Listeners;
})();

!function(e,t){"function"==typeof define&&define.amd?define([],t):"object"==typeof module&&module.exports?module.exports=t():e.Rellax=t()}("undefined"!=typeof window?window:global,function(){var y=function(e,t){"use strict";var l=Object.create(y.prototype),a=0,d=0,c=[],n=!0,o=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame||function(e){return setTimeout(e,1e3/60)},i=null,r=!1;try{var s=Object.defineProperty({},"passive",{get:function(){r=!0}});window.addEventListener("testPassive",null,s),window.removeEventListener("testPassive",null,s)}catch(e){}var m=window.cancelAnimationFrame||window.mozCancelAnimationFrame||clearTimeout,u=window.transformProp||function(){var e=document.createElement("div");if(null===e.style.transform){var t,n=["Webkit","Moz","ms"];for(t in n)if(void 0!==e.style[n[t]+"Transform"])return n[t]+"Transform"}return"transform"}();l.options={round:!0,frame:null,callback:function(){}},t&&Object.keys(t).forEach(function(e){l.options[e]=t[e]});e="string"==typeof(e=e||".rellax")?document.querySelectorAll(e):[e];if(0<e.length){if(l.elems=e,l.options.frame&&!l.options.frame.nodeType){e=document.querySelector(l.options.frame);if(!e)return void console.warn("Rellax: The frame you're trying to use doesn't exist.");l.options.frame=e}var f=function(){for(var e=0;e<c.length;e++)l.elems[e].style.cssText=c[e].style;c=[],d=window.innerHeight,window.innerWidth,v(),function(){for(var e=0;e<l.elems.length;e++){var t=w(l.elems[e]);c.push(t)}}(),p(),n&&(window.addEventListener("resize",f),n=!1,g())},w=function(e){var t=e.getAttribute("data-rellax-zindex")||0,n=0+e.getBoundingClientRect().top,o=e.clientHeight||e.offsetHeight||e.scrollHeight,i=0+e.getBoundingClientRect().left,r=e.clientWidth||e.offsetWidth||e.scrollWidth,s=e.style.cssText,l="",a=/transform\s*:/i.exec(s);return a&&(e=a.index,l=(e=(a=s.slice(e)).indexOf(";"))?" "+a.slice(11,e).replace(/\s/g,""):" "+a.slice(11).replace(/\s/g,"")),{top:n,left:i,height:o,width:r,style:s,transform:l,zindex:t}},v=function(){return a!=(a=(document.documentElement||document.body.parentNode||document.body).scrollTop||window.pageYOffset)},h=function(){window.removeEventListener("resize",h),window.removeEventListener("orientationchange",h),window.removeEventListener("scroll",h),document.removeEventListener("touchmove",h),i=o(g)},g=function(){v()&&!1===n?(p(),i=o(g)):(i=null,window.addEventListener("resize",h),window.addEventListener("orientationchange",h),window.addEventListener("scroll",h,!!r&&{passive:!0}),document.addEventListener("touchmove",h,!!r&&{passive:!0}))},p=function(){for(var e=0;e<l.elems.length;e++){var t=l.elems[e].parentNode,n=t.clientHeight||t.offsetHeight||t.scrollHeight,o=t.getBoundingClientRect().top+a,i=n+o,r=c[e].height-n;if(i<a||a+d<o)return;var s=document.body,t=document.documentElement,t=Math.max(s.scrollHeight,s.offsetHeight,t.clientHeight,t.scrollHeight,t.offsetHeight),r="translate3d(0px,"+(o<d?r/(n+o)*-(a+o-o)+r/2:t-i<d?r/(n+(t-i))*-(a+d-o)+r/2:r/(n+d)*-(a+d-o)+r/2)+"px,"+c[e].zindex+"px) "+c[e].transform;l.elems[e].style[u]=r}};return l.destroy=function(){for(var e=0;e<l.elems.length;e++)l.elems[e].style.cssText=c[e].style;n||(window.removeEventListener("resize",f),n=!0),m(i),i=null},f(),l.refresh=f,l}console.warn("Rellax: The elements you're trying to select don't exist.")};return y});
/* replaceUrlParam - http://stackoverflow.com/questions/7171099/how-to-replace-url-parameter-with-javascript-jquery */
function replaceUrlParam(e,r,a){var n=new RegExp("("+r+"=).*?(&|$)"),c=e;return c=e.search(n)>=0?e.replace(n,"$1"+a+"$2"):c+(c.indexOf("?")>0?"&":"?")+r+"="+a};
/*!
 * Scroll lock
 * https://github.com/FL3NKEY/scroll-lock
*/
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.scrollLock=t():e.scrollLock=t()}(this,function(){return function(l){var r={};function o(e){if(r[e])return r[e].exports;var t=r[e]={i:e,l:!1,exports:{}};return l[e].call(t.exports,t,t.exports,o),t.l=!0,t.exports}return o.m=l,o.c=r,o.d=function(e,t,l){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:l})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var l=Object.create(null);if(o.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(l,r,function(e){return t[e]}.bind(null,r));return l},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,l){"use strict";l.r(t);var r=function(e){return Array.isArray(e)?e:[e]},a=function(e){return e instanceof Node},o=function(e,t){if(e&&t){e=e instanceof NodeList?e:[e];for(var l=0;l<e.length&&!0!==t(e[l],l,e.length);l++);}},n=function(e){return console.error("[scroll-lock] ".concat(e))},b=function(e){if(Array.isArray(e))return e.join(", ")},c=function(e){var t=[];return o(e,function(e){return t.push(e)}),t},h=function(e,t){var l=!(2<arguments.length&&void 0!==arguments[2])||arguments[2],r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:document;if(l&&-1!==c(r.querySelectorAll(t)).indexOf(e))return e;for(;(e=e.parentElement)&&-1===c(r.querySelectorAll(t)).indexOf(e););return e},v=function(e,t){var l=2<arguments.length&&void 0!==arguments[2]?arguments[2]:document;return-1!==c(l.querySelectorAll(t)).indexOf(e)},i=function(e){if(e)return"hidden"===getComputedStyle(e).overflow},m=function(e){if(e)return!!i(e)||e.scrollTop<=0},S=function(e){if(e){if(i(e))return!0;var t=e.scrollTop;return e.scrollHeight<=t+e.offsetHeight}},y=function(e){if(e)return!!i(e)||e.scrollLeft<=0},k=function(e){if(e){if(i(e))return!0;var t=e.scrollLeft;return e.scrollWidth<=t+e.offsetWidth}};l.d(t,"disablePageScroll",function(){return d}),l.d(t,"enablePageScroll",function(){return s}),l.d(t,"getScrollState",function(){return f}),l.d(t,"clearQueueScrollLocks",function(){return p}),l.d(t,"getTargetScrollBarWidth",function(){return g}),l.d(t,"getCurrentTargetScrollBarWidth",function(){return A}),l.d(t,"getPageScrollBarWidth",function(){return G}),l.d(t,"getCurrentPageScrollBarWidth",function(){return T}),l.d(t,"addScrollableTarget",function(){return L}),l.d(t,"removeScrollableTarget",function(){return W}),l.d(t,"addScrollableSelector",function(){return x}),l.d(t,"removeScrollableSelector",function(){return F}),l.d(t,"addLockableTarget",function(){return Y}),l.d(t,"addLockableSelector",function(){return E}),l.d(t,"setFillGapMethod",function(){return O}),l.d(t,"addFillGapTarget",function(){return P}),l.d(t,"removeFillGapTarget",function(){return j}),l.d(t,"addFillGapSelector",function(){return q}),l.d(t,"removeFillGapSelector",function(){return M}),l.d(t,"refillGaps",function(){return N});var u=["padding","margin","width","max-width","none"],w={scroll:!0,queue:0,scrollableSelectors:["[data-scroll-lock-scrollable]"],lockableSelectors:["body","[data-scroll-lock-lockable]"],fillGapSelectors:["body","[data-scroll-lock-fill-gap]","[data-scroll-lock-lockable]"],fillGapMethod:u[0],startTouchY:0,startTouchX:0},d=function(e){w.queue<=0&&(w.scroll=!1,B(),X()),L(e),w.queue++},s=function(e){0<w.queue&&w.queue--,w.queue<=0&&(w.scroll=!0,C(),Q()),W(e)},f=function(){return w.scroll},p=function(){w.queue=0},g=function(e){var t=1<arguments.length&&void 0!==arguments[1]&&arguments[1];if(a(e)){var l=e.style.overflowY;t?f()||(e.style.overflowY=e.getAttribute("data-scroll-lock-saved-overflow-y-property")):e.style.overflowY="scroll";var r=A(e);return e.style.overflowY=l,r}return 0},A=function(e){if(a(e)){if(e===document.body){var t=document.documentElement.clientWidth;return window.innerWidth-t}var l=e.style.borderLeftWidth,r=e.style.borderRightWidth;e.style.borderLeftWidth="0px",e.style.borderRightWidth="0px";var o=e.offsetWidth-e.clientWidth;return e.style.borderLeftWidth=l,e.style.borderRightWidth=r,o}return 0},G=function(){var e=0<arguments.length&&void 0!==arguments[0]&&arguments[0];return g(document.body,e)},T=function(){return A(document.body)},L=function(e){e&&r(e).map(function(e){o(e,function(e){a(e)?e.setAttribute("data-scroll-lock-scrollable",""):n('"'.concat(e,'" is not a Element.'))})})},W=function(e){e&&r(e).map(function(e){o(e,function(e){a(e)?e.removeAttribute("data-scroll-lock-scrollable"):n('"'.concat(e,'" is not a Element.'))})})},x=function(e){e&&r(e).map(function(e){w.scrollableSelectors.push(e)})},F=function(e){e&&r(e).map(function(t){w.scrollableSelectors=w.scrollableSelectors.filter(function(e){return e!==t})})},Y=function(e){e&&(r(e).map(function(e){o(e,function(e){a(e)?e.setAttribute("data-scroll-lock-lockable",""):n('"'.concat(e,'" is not a Element.'))})}),f()||B())},E=function(e){e&&(r(e).map(function(e){w.lockableSelectors.push(e)}),f()||B(),q(e))},O=function(e){if(e)if(-1!==u.indexOf(e))w.fillGapMethod=e,N();else{var t=u.join(", ");n('"'.concat(e,'" method is not available!\nAvailable fill gap methods: ').concat(t,"."))}},P=function(e){e&&r(e).map(function(e){o(e,function(e){a(e)?(e.setAttribute("data-scroll-lock-fill-gap",""),w.scroll||H(e)):n('"'.concat(e,'" is not a Element.'))})})},j=function(e){e&&r(e).map(function(e){o(e,function(e){a(e)?(e.removeAttribute("data-scroll-lock-fill-gap"),w.scroll||I(e)):n('"'.concat(e,'" is not a Element.'))})})},q=function(e){e&&r(e).map(function(e){-1===w.fillGapSelectors.indexOf(e)&&(w.fillGapSelectors.push(e),w.scroll||D(e))})},M=function(e){e&&r(e).map(function(t){w.fillGapSelectors=w.fillGapSelectors.filter(function(e){return e!==t}),w.scroll||z(t)})},N=function(){w.scroll||X()},B=function(){var e=b(w.lockableSelectors);K(e)},C=function(){var e=b(w.lockableSelectors);R(e)},K=function(e){var t=document.querySelectorAll(e);o(t,function(e){U(e)})},R=function(e){var t=document.querySelectorAll(e);o(t,function(e){_(e)})},U=function(e){if(a(e)&&"true"!==e.getAttribute("data-scroll-lock-locked")){var t=window.getComputedStyle(e);e.setAttribute("data-scroll-lock-saved-overflow-y-property",t.overflowY),e.setAttribute("data-scroll-lock-saved-inline-overflow-property",e.style.overflow),e.setAttribute("data-scroll-lock-saved-inline-overflow-y-property",e.style.overflowY),e.style.overflow="hidden",e.setAttribute("data-scroll-lock-locked","true")}},_=function(e){a(e)&&"true"===e.getAttribute("data-scroll-lock-locked")&&(e.style.overflow=e.getAttribute("data-scroll-lock-saved-inline-overflow-property"),e.style.overflowY=e.getAttribute("data-scroll-lock-saved-inline-overflow-y-property"),e.removeAttribute("data-scroll-lock-saved-overflow-property"),e.removeAttribute("data-scroll-lock-saved-inline-overflow-property"),e.removeAttribute("data-scroll-lock-saved-inline-overflow-y-property"),e.removeAttribute("data-scroll-lock-locked"))},X=function(){w.fillGapSelectors.map(function(e){D(e)})},Q=function(){w.fillGapSelectors.map(function(e){z(e)})},D=function(e){var t=document.querySelectorAll(e),l=-1!==w.lockableSelectors.indexOf(e);o(t,function(e){H(e,l)})},H=function(e){var t=1<arguments.length&&void 0!==arguments[1]&&arguments[1];if(a(e)){var l;if(""===e.getAttribute("data-scroll-lock-lockable")||t)l=g(e,!0);else{var r=h(e,b(w.lockableSelectors));l=g(r,!0)}"true"===e.getAttribute("data-scroll-lock-filled-gap")&&I(e);var o=window.getComputedStyle(e);if(e.setAttribute("data-scroll-lock-filled-gap","true"),e.setAttribute("data-scroll-lock-current-fill-gap-method",w.fillGapMethod),"margin"===w.fillGapMethod){var n=parseFloat(o.marginRight);e.style.marginRight="".concat(n+l,"px")}else if("width"===w.fillGapMethod)e.style.width="calc(100% - ".concat(l,"px)");else if("max-width"===w.fillGapMethod)e.style.maxWidth="calc(100% - ".concat(l,"px)");else if("padding"===w.fillGapMethod){var c=parseFloat(o.paddingRight);e.style.paddingRight="".concat(c+l,"px")}}},z=function(e){var t=document.querySelectorAll(e);o(t,function(e){I(e)})},I=function(e){if(a(e)&&"true"===e.getAttribute("data-scroll-lock-filled-gap")){var t=e.getAttribute("data-scroll-lock-current-fill-gap-method");e.removeAttribute("data-scroll-lock-filled-gap"),e.removeAttribute("data-scroll-lock-current-fill-gap-method"),"margin"===t?e.style.marginRight="":"width"===t?e.style.width="":"max-width"===t?e.style.maxWidth="":"padding"===t&&(e.style.paddingRight="")}};"undefined"!=typeof window&&window.addEventListener("resize",function(e){N()}),"undefined"!=typeof document&&(document.addEventListener("touchstart",function(e){w.scroll||(w.startTouchY=e.touches[0].clientY,w.startTouchX=e.touches[0].clientX)}),document.addEventListener("touchmove",function(n){if(!w.scroll){var e=w.startTouchY,t=w.startTouchX,l=n.touches[0].clientY,r=n.touches[0].clientX;if(n.touches.length<2){var c=b(w.scrollableSelectors),a=e<l,i=l<e,u=t<r,d=r<t,s=e+3<l,f=l<e-3,p=t+3<r,g=r<t-3;!function e(t){var l=1<arguments.length&&void 0!==arguments[1]&&arguments[1];if(t){var r=h(t,c,!1);if(v(t,'input[type="range"]'))return!1;if(l||v(t,'textarea, [contenteditable="true"]')&&h(t,c)||v(t,c)){var o=!1;y(t)&&k(t)?(a&&m(t)||i&&S(t))&&(o=!0):m(t)&&S(t)?(u&&y(t)||d&&k(t))&&(o=!0):(s&&m(t)||f&&S(t)||p&&y(t)||g&&k(t))&&(o=!0),o&&(r?e(r,!0):n.preventDefault())}else e(r)}else n.preventDefault()}(n.target)}}},{passive:!1}),document.addEventListener("touchend",function(e){w.scroll||(w.startTouchY=0,w.startTouchX=0)}));var J={hide:function(e){n('"hide" is deprecated! Use "disablePageScroll" instead. \n https://github.com/FL3NKEY/scroll-lock#disablepagescrollscrollabletarget'),d(e)},show:function(e){n('"show" is deprecated! Use "enablePageScroll" instead. \n https://github.com/FL3NKEY/scroll-lock#enablepagescrollscrollabletarget'),s(e)},toggle:function(e){n('"toggle" is deprecated! Do not use it.'),f()?d():s(e)},getState:function(){return n('"getState" is deprecated! Use "getScrollState" instead. \n https://github.com/FL3NKEY/scroll-lock#getscrollstate'),f()},getWidth:function(){return n('"getWidth" is deprecated! Use "getPageScrollBarWidth" instead. \n https://github.com/FL3NKEY/scroll-lock#getpagescrollbarwidth'),G()},getCurrentWidth:function(){return n('"getCurrentWidth" is deprecated! Use "getCurrentPageScrollBarWidth" instead. \n https://github.com/FL3NKEY/scroll-lock#getcurrentpagescrollbarwidth'),T()},setScrollableTargets:function(e){n('"setScrollableTargets" is deprecated! Use "addScrollableTarget" instead. \n https://github.com/FL3NKEY/scroll-lock#addscrollabletargetscrollabletarget'),L(e)},setFillGapSelectors:function(e){n('"setFillGapSelectors" is deprecated! Use "addFillGapSelector" instead. \n https://github.com/FL3NKEY/scroll-lock#addfillgapselectorfillgapselector'),q(e)},setFillGapTargets:function(e){n('"setFillGapTargets" is deprecated! Use "addFillGapTarget" instead. \n https://github.com/FL3NKEY/scroll-lock#addfillgaptargetfillgaptarget'),P(e)},clearQueue:function(){n('"clearQueue" is deprecated! Use "clearQueueScrollLocks" instead. \n https://github.com/FL3NKEY/scroll-lock#clearqueuescrolllocks'),p()}},V=function(o){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},t=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.forEach(function(e){var t,l,r;t=o,r=n[l=e],l in t?Object.defineProperty(t,l,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[l]=r})}return o}({disablePageScroll:d,enablePageScroll:s,getScrollState:f,clearQueueScrollLocks:p,getTargetScrollBarWidth:g,getCurrentTargetScrollBarWidth:A,getPageScrollBarWidth:G,getCurrentPageScrollBarWidth:T,addScrollableSelector:x,removeScrollableSelector:F,addScrollableTarget:L,removeScrollableTarget:W,addLockableSelector:E,addLockableTarget:Y,addFillGapSelector:q,removeFillGapSelector:M,addFillGapTarget:P,removeFillGapTarget:j,setFillGapMethod:O,refillGaps:N,_state:w},J);t.default=V}]).default});
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).Sqrl={})}(this,(function(e){"use strict";function t(e){var n,r,a=new Error(e);return n=a,r=t.prototype,Object.setPrototypeOf?Object.setPrototypeOf(n,r):n.__proto__=r,a}function n(e,n,r){var a=n.slice(0,r).split(/\n/),i=a.length,s=a[i-1].length+1;throw t(e+=" at line "+i+" col "+s+":\n\n  "+n.split(/\n/)[i-1]+"\n  "+Array(s).join(" ")+"^")}t.prototype=Object.create(Error.prototype,{name:{value:"Squirrelly Error",enumerable:!1}});var r=new Function("return this")().Promise,a=!1;try{a=new Function("return (async function(){}).constructor")()}catch(e){if(!(e instanceof SyntaxError))throw e}function i(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function s(e,t,n){for(var r in t)i(t,r)&&(null==t[r]||"object"!=typeof t[r]||"storage"!==r&&"prefixes"!==r||n?e[r]=t[r]:e[r]=s({},t[r]));return e}var c=/^async +/,o=/`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})*}|(?!\${)[^\\`])*`/g,l=/'(?:\\[\s\w"'\\`]|[^\n\r'\\])*?'/g,f=/"(?:\\[\s\w"'\\`]|[^\n\r"\\])*?"/g,u=/[.*+\-?^${}()|[\]\\]/g;function p(e){return u.test(e)?e.replace(u,"\\$&"):e}function h(e,r){r.rmWhitespace&&(e=e.replace(/[\r\n]+/g,"\n").replace(/^\s+|\s+$/gm,"")),o.lastIndex=0,l.lastIndex=0,f.lastIndex=0;var a=r.prefixes,i=[a.h,a.b,a.i,a.r,a.c,a.e].reduce((function(e,t){return e&&t?e+"|"+p(t):t?p(t):e}),""),s=new RegExp("([|()]|=>)|('|\"|`|\\/\\*)|\\s*((\\/)?(-|_)?"+p(r.tags[1])+")","g"),u=new RegExp("([^]*?)"+p(r.tags[0])+"(-|_)?\\s*("+i+")?\\s*","g"),h=0,d=!1;function g(t,a){var i,p={f:[]},g=0,v="c";function m(t){var a=e.slice(h,t),i=a.trim();if("f"===v)"safe"===i?p.raw=!0:r.async&&c.test(i)?(i=i.replace(c,""),p.f.push([i,"",!0])):p.f.push([i,""]);else if("fp"===v)p.f[p.f.length-1][1]+=i;else if("err"===v){if(i){var s=a.search(/\S/);n("invalid syntax",e,h+s)}}else p[v]=i;h=t+1}for("h"===a||"b"===a||"c"===a?v="n":"r"===a&&(p.raw=!0,a="i"),s.lastIndex=h;null!==(i=s.exec(e));){var y=i[1],x=i[2],b=i[3],w=i[4],F=i[5],S=i.index;if(y)"("===y?(0===g&&("n"===v?(m(S),v="p"):"f"===v&&(m(S),v="fp")),g++):")"===y?0===--g&&"c"!==v&&(m(S),v="err"):0===g&&"|"===y?(m(S),v="f"):"=>"===y&&(m(S),h+=1,v="res");else if(x){if("/*"===x){var I=e.indexOf("*/",s.lastIndex);-1===I&&n("unclosed comment",e,i.index),s.lastIndex=I+2}else if("'"===x){l.lastIndex=i.index,l.exec(e)?s.lastIndex=l.lastIndex:n("unclosed string",e,i.index)}else if('"'===x){f.lastIndex=i.index,f.exec(e)?s.lastIndex=f.lastIndex:n("unclosed string",e,i.index)}else if("`"===x){o.lastIndex=i.index,o.exec(e)?s.lastIndex=o.lastIndex:n("unclosed string",e,i.index)}}else if(b)return m(S),h=S+i[0].length,u.lastIndex=h,d=F,w&&"h"===a&&(a="s"),p.t=a,p}return n("unclosed tag",e,t),p}var v=function i(s,o){s.b=[],s.d=[];var l,f=!1,p=[];function v(e,t){e&&(e=function(e,t,n,r){var a,i;return"string"==typeof t.autoTrim?a=i=t.autoTrim:Array.isArray(t.autoTrim)&&(a=t.autoTrim[1],i=t.autoTrim[0]),(n||!1===n)&&(a=n),(r||!1===r)&&(i=r),"slurp"===a&&"slurp"===i?e.trim():("_"===a||"slurp"===a?e=String.prototype.trimLeft?e.trimLeft():e.replace(/^[\s\uFEFF\xA0]+/,""):"-"!==a&&"nl"!==a||(e=e.replace(/^(?:\n|\r|\r\n)/,"")),"_"===i||"slurp"===i?e=String.prototype.trimRight?e.trimRight():e.replace(/[\s\uFEFF\xA0]+$/,""):"-"!==i&&"nl"!==i||(e=e.replace(/(?:\n|\r|\r\n)$/,"")),e)}(e,r,d,t))&&(e=e.replace(/\\|'/g,"\\$&").replace(/\r\n|\n|\r/g,"\\n"),p.push(e))}for(;null!==(l=u.exec(e));){var m,y=l[1],x=l[2],b=l[3]||"";for(var w in a)if(a[w]===b){m=w;break}v(y,x),h=l.index+l[0].length,m||n("unrecognized tag type: "+b,e,h);var F=g(l.index,m),S=F.t;if("h"===S){var I=F.n||"";r.async&&c.test(I)&&(F.a=!0,F.n=I.replace(c,"")),F=i(F),p.push(F)}else if("c"===S){if(s.n===F.n)return f?(f.d=p,s.b.push(f)):s.d=p,s;n("Helper start and end don't match",e,l.index+l[0].length)}else if("b"===S){f?(f.d=p,s.b.push(f)):s.d=p;var R=F.n||"";r.async&&c.test(R)&&(F.a=!0,F.n=R.replace(c,"")),f=F,p=[]}else if("s"===S){var T=F.n||"";r.async&&c.test(T)&&(F.a=!0,F.n=T.replace(c,"")),p.push(F)}else p.push(F)}if(!o)throw t('unclosed helper "'+s.n+'"');return v(e.slice(h,e.length),!1),s.d=p,s}({f:[]},!0);if(r.plugins)for(var m=0;m<r.plugins.length;m++){var y=r.plugins[m];y.processAST&&(v.d=y.processAST(v.d,r))}return v.d}function d(e,t){var n=h(e,t),r="var tR='';"+(t.useWith?"with("+t.varName+"||{}){":"")+x(n,t)+"if(cb){cb(null,tR)} return tR"+(t.useWith?"}":"");if(t.plugins)for(var a=0;a<t.plugins.length;a++){var i=t.plugins[a];i.processFnString&&(r=i.processFnString(r,t))}return r}function g(e,t){for(var n=0;n<t.length;n++){var r=t[n][0],a=t[n][1];e=(t[n][2]?"await ":"")+"c.l('F','"+r+"')("+e,a&&(e+=","+a),e+=")"}return e}function v(e,t,n,r,a,i){var s="{exec:"+(a?"async ":"")+y(n,t,e)+",params:["+r+"]";return i&&(s+=",name:'"+i+"'"),a&&(s+=",async:true"),s+="}"}function m(e,t){for(var n="[",r=0;r<e.length;r++){var a=e[r];n+=v(t,a.res||"",a.d,a.p||"",a.a,a.n),r<e.length&&(n+=",")}return n+="]"}function y(e,t,n){return"function("+t+"){var tR='';"+x(e,n)+"return tR}"}function x(e,t){for(var n=0,r=e.length,a="";n<r;n++){var i=e[n];if("string"==typeof i){a+="tR+='"+i+"';"}else{var s=i.t,c=i.c||"",o=i.f,l=i.n||"",f=i.p||"",u=i.res||"",p=i.b,h=!!i.a;if("i"===s){t.defaultFilter&&(c="c.l('F','"+t.defaultFilter+"')("+c+")");var d=g(c,o);!i.raw&&t.autoEscape&&(d="c.l('F','e')("+d+")"),a+="tR+="+d+";"}else if("h"===s)if(t.storage.nativeHelpers.get(l))a+=t.storage.nativeHelpers.get(l)(i,t);else{var y=(h?"await ":"")+"c.l('H','"+l+"')("+v(t,u,i.d,f,h);y+=p?","+m(p,t):",[]",a+="tR+="+g(y+=",c)",o)+";"}else"s"===s?a+="tR+="+g((h?"await ":"")+"c.l('H','"+l+"')({params:["+f+"]},[],c)",o)+";":"e"===s&&(a+=c+"\n")}}return a}var b=function(){function e(e){this.cache=e}return e.prototype.define=function(e,t){this.cache[e]=t},e.prototype.get=function(e){return this.cache[e]},e.prototype.remove=function(e){delete this.cache[e]},e.prototype.reset=function(){this.cache={}},e.prototype.load=function(e){s(this.cache,e,!0)},e}(),w=new b({});function F(e,n,r,a){if(n&&n.length>0)throw t((a?"Native":"")+"Helper '"+e+"' doesn't accept blocks");if(r&&r.length>0)throw t((a?"Native":"")+"Helper '"+e+"' doesn't accept filters")}var S=new b({each:function(e,t){var n="",r=e.params[0];if(F("each",t,!1),e.async)return new Promise((function(t){!function e(t,n,r,a,i){r(t[n],n).then((function(s){a+=s,n===t.length-1?i(a):e(t,n+1,r,a,i)}))}(r,0,e.exec,n,t)}));for(var a=0;a<r.length;a++)n+=e.exec(r[a],a);return n},foreach:function(e,t){var n=e.params[0];if(F("foreach",t,!1),e.async)return new Promise((function(t){!function e(t,n,r,a,i,s){a(n[r],t[n[r]]).then((function(c){i+=c,r===n.length-1?s(i):e(t,n,r+1,a,i,s)}))}(n,Object.keys(n),0,e.exec,"",t)}));var r="";for(var a in n)i(n,a)&&(r+=e.exec(a,n[a]));return r},include:function(e,n,r){F("include",n,!1);var a=r.storage.templates.get(e.params[0]);if(!a)throw t('Could not fetch template "'+e.params[0]+'"');return a(e.params[1],r)},extends:function(e,n,r){var a=e.params[1]||{};a.content=e.exec();for(var i=0;i<n.length;i++){var s=n[i];a[s.name]=s.exec()}var c=r.storage.templates.get(e.params[0]);if(!c)throw t('Could not fetch template "'+e.params[0]+'"');return c(a,r)},useScope:function(e,t){return F("useScope",t,!1),e.exec(e.params[0])}}),I=new b({if:function(e,t){F("if",!1,e.f,!0);var n="if("+e.p+"){"+x(e.d,t)+"}";if(e.b)for(var r=0;r<e.b.length;r++){var a=e.b[r];"else"===a.n?n+="else{"+x(a.d,t)+"}":"elif"===a.n&&(n+="else if("+a.p+"){"+x(a.d,t)+"}")}return n},try:function(e,n){if(F("try",!1,e.f,!0),!e.b||1!==e.b.length||"catch"!==e.b[0].n)throw t("native helper 'try' only accepts 1 block, 'catch'");var r="try{"+x(e.d,n)+"}",a=e.b[0];return r+="catch"+(a.res?"("+a.res+")":"")+"{"+x(a.d,n)+"}"},block:function(e,t){return F("block",e.b,e.f,!0),"if(!"+t.varName+"["+e.p+"]){tR+=("+y(e.d,"",t)+")()}else{tR+="+t.varName+"["+e.p+"]}"}}),R={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function T(e){return R[e]}var E=new b({e:function(e){var t=String(e);return/[&<>"']/.test(t)?t.replace(/[&<>"']/g,T):t}}),j={varName:"it",autoTrim:[!1,"nl"],autoEscape:!0,defaultFilter:!1,tags:[","],l:function(e,n){if("H"===e){var r=this.storage.helpers.get(n);if(r)return r;throw t("Can't find helper '"+n+"'")}if("F"===e){var a=this.storage.filters.get(n);if(a)return a;throw t("Can't find filter '"+n+"'")}},async:!1,storage:{helpers:S,nativeHelpers:I,filters:E,templates:w},prefixes:{h:"@",b:"#",i:"",r:"*",c:"/",e:"!"},cache:!1,plugins:[],useWith:!1};function H(e,t){var n={};return s(n,j),t&&s(n,t),e&&s(n,e),n.l.bind(n),n}function O(e,n){var r=H(n||{}),i=Function;if(r.async){if(!a)throw t("This environment doesn't support async/await");i=a}try{return new i(r.varName,"c","cb",d(e,r))}catch(n){throw n instanceof SyntaxError?t("Bad template syntax\n\n"+n.message+"\n"+Array(n.message.length+1).join("=")+"\n"+d(e,r)):n}}function _(e,t){var n;return t.cache&&t.name&&t.storage.templates.get(t.name)?t.storage.templates.get(t.name):(n="function"==typeof e?e:O(e,t),t.cache&&t.name&&t.storage.templates.define(t.name,n),n)}j.l.bind(j),e.compile=O,e.compileScope=x,e.compileScopeIntoFunction=y,e.compileToString=d,e.defaultConfig=j,e.filters=E,e.getConfig=H,e.helpers=S,e.nativeHelpers=I,e.parse=h,e.render=function(e,n,a,i){var s=H(a||{});if(!s.async)return _(e,s)(n,s);if(!i){if("function"==typeof r)return new r((function(t,r){try{t(_(e,s)(n,s))}catch(e){r(e)}}));throw t("Please provide a callback function, this env doesn't support Promises")}try{_(e,s)(n,s,i)}catch(e){return i(e)}},e.templates=w,Object.defineProperty(e,"__esModule",{value:!0})}));
/* Throttle ES6 */
const throttle = (fn, wait) => {
  let prev, next;
  return function invokeFn(...args) {
    const now = Date.now();
    next = clearTimeout(next);
    if (!prev || now - prev >= wait) {
      // eslint-disable-next-line prefer-spread
      fn.apply(null, args);
      prev = now;
    } else {
      next = setTimeout(invokeFn.bind(null, ...args), wait - (now - prev));
    }
  };
};
/**
 * Image Helper Functions
 * -----------------------------------------------------------------------------
 * https://github.com/Shopify/slate.git.
 *
 */

/**
 * Preloads an image in memory and uses the browsers cache to store it until needed.
 *
 * @param {Array} images - A list of image urls
 * @param {String} size - A shopify image size attribute
 */

  function preload(images, size) {
  if (typeof images === 'string') {
    images = [images];
  }

  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    loadImage(getSizedImageUrl(image, size));
  }
}

/**
 * Loads and caches an image in the browsers cache.
 * @param {string} path - An image url
 */
function loadImage(path) {
  new Image().src = path;
}

/**
 * Find the Shopify image attribute size
 *
 * @param {string} src
 * @returns {null}
 */
function imageSize(src) {
  const match = src.match(
    /.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\.@]/
  );

  if (match) {
    return match[1];
  } else {
    return null;
  }
}

/**
 * Adds a Shopify size attribute to a URL
 *
 * @param src
 * @param size
 * @returns {*}
 */
function getSizedImageUrl(src, size) {
  if (size === null) {
    return src;
  }

  if (size === 'master') {
    return removeProtocol(src);
  }

  const match = src.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);

  if (match) {
    const prefix = src.split(match[0]);
    const suffix = match[0];

    return removeProtocol(`${prefix[0]}_${size}${suffix}`);
  } else {
    return null;
  }
}

function removeProtocol(path) {
  return path.replace(/http(s)?:/, '');
}

var images = /*#__PURE__*/Object.freeze({
  __proto__: null,
  preload: preload,
  loadImage: loadImage,
  imageSize: imageSize,
  getSizedImageUrl: getSizedImageUrl,
  removeProtocol: removeProtocol
});
PaloAlto.ThemeProduct = {
  getVariantFromId: function(product, value) {
    this._validateProductStructure(product);

    if (typeof value !== 'number') {
      throw new TypeError(value + ' is not a Number.');
    }

    var result = product.variants.filter(function (variant) {
      return variant.id === value;
    });

    return result[0] || null;
  },

  getVariantFromSerializedArray: function(product, collection) {
    this._validateProductStructure(product);

    // If value is an array of options
    var optionArray = this._createOptionArrayFromOptionCollection(product, collection);
    return this.getVariantFromOptionArray(product, optionArray);
  },

  getVariantFromOptionArray: function(product, options) {
    this._validateProductStructure(product);
    this._validateOptionsArray(options);

    var result = product.variants.filter(function (variant) {
      return options.every(function (option, index) {
        return variant.options[index] === option;
      });
    });

    return result[0] || null;
  },

  _createOptionArrayFromOptionCollection: function(product, collection) {
    this._validateProductStructure(product);
    this._validateSerializedArray(collection);

    var optionArray = [];

    collection.forEach(function (option) {
      for (var i = 0; i < product.options.length; i++) {
        var name = product.options[i].name || product.options[i];
        if (name.toLowerCase() === option.name.toLowerCase()) {
          optionArray[i] = option.value;
          break;
        }
      }
    });

    return optionArray;
  },

  _validateProductStructure: function(product) {
    if (typeof product !== 'object') {
      throw new TypeError(product + ' is not an object.');
    }

    if (Object.keys(product).length === 0 && product.constructor === Object) {
      throw new Error(product + ' is empty.');
    }
  },

  _validateSerializedArray: function(collection) {
    if (!Array.isArray(collection)) {
      throw new TypeError(collection + ' is not an array.');
    }

    if (collection.length === 0) {
      throw new Error(collection + ' is empty.');
    }

    if (collection[0].hasOwnProperty('name')) {
      if (typeof collection[0].name !== 'string') {
        throw new TypeError('Invalid value type passed for name of option ' + collection[0].name + '. Value should be string.');
      }
    } else {
      throw new Error(collection[0] + 'does not contain name key.');
    }
  },

  _validateOptionsArray: function(options) {
    if (Array.isArray(options) && typeof options[0] === 'object') {
      throw new Error(options + 'is not a valid array of options.');
    }
  },
};

PaloAlto.ProductForm = (function() {
  const selectors = {
    idInput: '[name="id"]',
    planInput: '[name="selling_plan"]',
    optionInput: '[name^="options"]',
    quantityInput: '[name="quantity"]',
    propertyInput: '[name^="properties"]',
  };

  function ProductForm(element, product, options) {
    this.element = element;
    this.form = this.element.tagName == 'FORM' ? this.element : this.element.querySelector('form');
    this.product = this._validateProductObject(product);
    this.variantElement = this.element.querySelector(selectors.idInput);

    options = options || {};

    this._listeners = new PaloAlto.initListeners();
    this._listeners.add(this.element, 'submit', this._onSubmit.bind(this, options));

    this.optionInputs = this._initInputs(selectors.optionInput, options.onOptionChange);

    this.planInputs = this._initInputs(selectors.planInput, options.onPlanChange);

    this.quantityInputs = this._initInputs(selectors.quantityInput, options.onQuantityChange);

    this.propertyInputs = this._initInputs(selectors.propertyInput, options.onPropertyChange);

    console.log("mnmnm")
  }

  ProductForm.prototype = $.extend({}, ProductForm.prototype, {
    /**
     * Cleans up all event handlers that were assigned when the Product Form was constructed.
     * Useful for use when a section needs to be reloaded in the theme editor.
     */
    destroy() {
      this._listeners.removeAll();
    },

    /**
     * Getter method which returns the array of currently selected option values
     *
     * @returns {Array} An array of option values
     */
    options() {
      return this._serializeInputValues(this.optionInputs, function (item) {
        var regex = /(?:^(options\[))(.*?)(?:\])/;
        item.name = regex.exec(item.name)[2]; // Use just the value between 'options[' and ']'
        return item;
      });
    },

    /**
     * Getter method which returns the currently selected variant, or `null` if variant
     * doesn't exist.
     *
     * @returns {Object|null} Variant object
     */
    variant() {
      const opts = this.options();
      if (opts.length) {
        return PaloAlto.ThemeProduct.getVariantFromSerializedArray(this.product, opts);
      } else {
        return this.product.variants[0];
      }
    },

    /**
     * Getter method which returns the current selling plan, or `null` if plan
     * doesn't exist.
     *
     * @returns {Object|null} Variant object
     */
    plan(variant) {
      let plan = {
        allocation: null,
        group: null,
        detail: null,
      };
      const formData = new FormData(this.form);
      const id = formData.get('selling_plan');

      if (id && variant) {
        plan.allocation = variant.selling_plan_allocations.find(function (item) {
          return item.selling_plan_id.toString() === id.toString();
        });
      }
      if (plan.allocation) {
        plan.group = this.product.selling_plan_groups.find(function (item) {
          return item.id.toString() === plan.allocation.selling_plan_group_id.toString();
        });
      }
      if (plan.group) {
        plan.detail = plan.group.selling_plans.find(function (item) {
          return item.id.toString() === id.toString();
        });
      }

      if (plan && plan.allocation && plan.detail && plan.allocation) {
        return plan;
      } else return null;
    },

    /**
     * Getter method which returns a collection of objects containing name and values
     * of property inputs
     *
     * @returns {Array} Collection of objects with name and value keys
     */
    properties() {
      return this._serializeInputValues(this.propertyInputs, function (item) {
        var regex = /(?:^(properties\[))(.*?)(?:\])/;
        item.name = regex.exec(item.name)[2]; // Use just the value between 'properties[' and ']'
        return item;
      });
    },

    /**
     * Getter method which returns the current quantity or 1 if no quantity input is
     * included in the form
     *
     * @returns {Array} Collection of objects with name and value keys
     */
    quantity() {
      return this.quantityInputs[0] ? Number.parseInt(this.quantityInputs[0].value, 10) : 1;
    },

    getFormState() {
      const variant = this.variant();
      return {
        options: this.options(),
        variant: variant,
        properties: this.properties(),
        quantity: this.quantity(),
        plan: this.plan(variant),
      };
    },

    // Private Methods
    // -----------------------------------------------------------------------------
    _setIdInputValue(variant) {
      if (variant && variant.id) {
        this.variantElement.value = variant.id.toString();
      } else {
        this.variantElement.value = '';
      }

      this.variantElement.dispatchEvent(new Event('change'));
    },

    _onSubmit(options, event) {
      event.dataset = this.getFormState();
      if (options.onFormSubmit) {
        options.onFormSubmit(event);
      }
    },

    _onOptionChange(event) {
      this._setIdInputValue(event.dataset.variant);
    },

    _onFormEvent(cb) {
      if (typeof cb === 'undefined') {
        return Function.prototype.bind();
      }

      return function (event) {
        event.dataset = this.getFormState();
        this._setIdInputValue(event.dataset.variant);
        cb(event);
      }.bind(this);
    },

    _initInputs(selector, cb) {
      var elements = Array.prototype.slice.call(this.element.querySelectorAll(selector));

      return elements.map(
        function (element) {
          this._listeners.add(element, 'change', this._onFormEvent(cb));
          return element;
        }.bind(this)
      );
    },

    _serializeInputValues(inputs, transform) {
      return inputs.reduce(function (options, input) {
        if (
          input.checked || // If input is a checked (means type radio or checkbox)
          (input.type !== 'radio' && input.type !== 'checkbox') // Or if its any other type of input
        ) {
          options.push(transform({name: input.name, value: input.value}));
        }

        return options;
      }, []);
    },

    _validateProductObject(product) {
      if (typeof product !== 'object') {
        throw new TypeError(product + ' is not an object.');
      }

      if (typeof product.variants[0].options === 'undefined') {
        throw new TypeError('Product object is invalid. Make sure you use the product object that is output from null or from the http://[your-product-url].js route');
      }
      return product;
    }
  });

  return ProductForm;
})();


/*= =============== Slate ================*/
slate.a11y = {

/**
 * For use when focus shifts to a container rather than a link
 * eg for In-page links, after scroll, focus shifts to content area so that
 * next `tab` is where user expects if focusing a link, just $link.focus();
 *
 * @param {JQuery} $element - The element to be acted upon
 */
  state: {
    firstFocusable: null,
    lastFocusable: null,
    trigger: null,
  },

  pageLinkFocus: function($element) {
    var focusClass = 'js-focus-hidden';

    $element
      .first()
      .attr('tabIndex', '-1')
      .focus()
      .addClass(focusClass)
      .one('blur', callback);

    function callback() {
      $element
        .first()
        .removeClass(focusClass)
        .removeAttr('tabindex');
    }
  },

  trapFocus: function(options) {
    var focusableElements = Array.from(
      options.container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex^="-"])',
      ),
    ).filter(function(element) {
      var width = element.offsetWidth;
      var height = element.offsetHeight;

      return (
        width !== 0 &&
        height !== 0 &&
        getComputedStyle(element).getPropertyValue('display') !== 'none'
      );
    });

    focusableElements = focusableElements.filter(function(element) {
      return !element.classList.contains('deferred-media__poster');
    });

    this.state.firstFocusable = focusableElements[0];
    this.state.lastFocusable = focusableElements[focusableElements.length - 1];

    if (!options.elementToFocus) {
      options.elementToFocus = this.state.firstFocusable || options.container;
    }
    this._setupHandlers();

    document.addEventListener('focusin', this._onFocusInHandler);
    document.addEventListener('focusout', this._onFocusOutHandler);

    options.container.setAttribute('tabindex', '-1');
    options.elementToFocus.focus();
  },

  removeTrapFocus: function(options) {
    const focusVisible = !document.body.classList.contains('no-outline');
    if (options && options.container) {
      options.container.removeAttribute('tabindex');
    }
    document.removeEventListener('focusin', this._onFocusInHandler);

    if (this.state.trigger && focusVisible) {
      this.state.trigger.focus();
    }
  },

  _manageFocus: function(evt) {
    if (evt.keyCode !== slate.utils.keyboardKeys.TAB) { return; }

    /**
     * On the last focusable element and tab forward,
     * focus the first element.
     */
    if (evt.target === this.state.lastFocusable && !evt.shiftKey) {
      evt.preventDefault();
      this.state.firstFocusable.focus();
    }

    /**
     * On the first focusable element and tab backward,
     * focus the last element.
     */
    if (evt.target === this.state.firstFocusable && evt.shiftKey) {
      evt.preventDefault();
      this.state.lastFocusable.focus();
    }
  },

  _onFocusOut: function() {
    document.removeEventListener('keydown', this._manageFocusHandler);
  },

  _onFocusIn: function(evt) {
    if (
      evt.target !== this.state.lastFocusable &&
      evt.target !== this.state.firstFocusable
    ) { return; }

    document.addEventListener('keydown', this._manageFocusHandler);
  },

  _setupHandlers: function() {
    if (!this._onFocusInHandler) {
      this._onFocusInHandler = this._onFocusIn.bind(this);
    }

    if (!this._onFocusOutHandler) {
      this._onFocusOutHandler = this._onFocusIn.bind(this);
    }

    if (!this._manageFocusHandler) {
      this._manageFocusHandler = this._manageFocus.bind(this);
    }
  },
};

/**
 * Currency Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help with currency formatting
 *
 * Current contents
 * - formatMoney - Takes an amount in cents and returns it as a formatted dollar value.
 *
 * Alternatives
 * - Accounting.js - http://openexchangerates.github.io/accounting.js/
 *
 */

slate.Currency = (function() {
	var moneyFormat = '$'; // eslint-disable-line camelcase

	function formatMoney(cents, format) {
		if (typeof cents === 'string') {
			cents = cents.replace('.', '');
		}
		var value = '';
		var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
		var formatString = format || moneyFormat;

		function formatWithDelimiters(number, precision, thousands, decimal) {
			thousands = thousands || ',';
			decimal = decimal || '.';

			if (isNaN(number) || number === null) {
				return 0;
			}

			number = (number / 100.0).toFixed(precision);

			var parts = number.split('.');
			var dollarsAmount = parts[0].replace(
				/(\d)(?=(\d\d\d)+(?!\d))/g,
				'$1' + thousands
			);
			var centsAmount = parts[1] ? decimal + parts[1] : '';

			return dollarsAmount + centsAmount;
		}

		switch (formatString.match(placeholderRegex)[1]) {
			case 'amount':
				value = formatWithDelimiters(cents, 2);
				break;
			case 'amount_no_decimals':
				value = formatWithDelimiters(cents, 0);
				break;
			case 'amount_with_comma_separator':
				value = formatWithDelimiters(cents, 2, '.', ',');
				break;
			case 'amount_no_decimals_with_comma_separator':
				value = formatWithDelimiters(cents, 0, '.', ',');
				break;
			case 'amount_no_decimals_with_space_separator':
				value = formatWithDelimiters(cents, 0, ' ');
				break;
			case 'amount_with_apostrophe_separator':
				value = formatWithDelimiters(cents, 2, "'");
				break;
		}

		return formatString.replace(placeholderRegex, value);
	}

	return {
		formatMoney: formatMoney
	};
})();
/**
 * Utility helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions for dealing with arrays and objects
 *
 * @namespace utils
 */

slate.utils = {

	/**
	 * Return an object from an array of objects that matches the provided key and value
	 *
	 * @param {array} array - Array of objects
	 * @param {string} key - Key to match the value against
	 * @param {string} value - Value to get match of
	 */
	findInstance: function(array, key, value) {
		for (var i = 0; i < array.length; i++) {
			if (array[i][key] === value) {
				return array[i];
			}
		}
	},

	/**
	 * Remove an object from an array of objects by matching the provided key and value
	 *
	 * @param {array} array - Array of objects
	 * @param {string} key - Key to match the value against
	 * @param {string} value - Value to get match of
	 */
	removeInstance: function(array, key, value) {
		var i = array.length;
		while(i--) {
			if (array[i][key] === value) {
				array.splice(i, 1);
				break;
			}
		}

		return array;
	},

	/**
	 * _.compact from lodash
	 * Remove empty/false items from array
	 * Source: https://github.com/lodash/lodash/blob/master/compact.js
	 *
	 * @param {array} array
	 */
	compact: function(array) {
		var index = -1;
		var length = array == null ? 0 : array.length;
		var resIndex = 0;
		var result = [];

		while (++index < length) {
			var value = array[index];
			if (value) {
				result[resIndex++] = value;
			}
		}
		return result;
	},

	/**
	 * _.defaultTo from lodash
	 * Checks `value` to determine whether a default value should be returned in
	 * its place. The `defaultValue` is returned if `value` is `NaN`, `null`,
	 * or `undefined`.
	 * Source: https://github.com/lodash/lodash/blob/master/defaultTo.js
	 *
	 * @param {*} value - Value to check
	 * @param {*} defaultValue - Default value
	 * @returns {*} - Returns the resolved value
	 */
	defaultTo: function(value, defaultValue) {
		return (value == null || value !== value) ? defaultValue : value
	},

	keyboardKeys: {
		TAB: 9,
		ENTER: 13,
		ESCAPE: 27,
		SPACE: 32,
		LEFTARROW: 37,
		RIGHTARROW: 39
	}
};


/*= =============== Global ================*/
PaloAlto.initCollapsible = (function() {
  const selectors = {
    collapsibleTrigger: '[data-collapsible-trigger]',
    collapsibleContent: '[data-collapsible-content]',
  };

  const attributes = {
    collapsibleTriggerMobile: 'data-collapsible-trigger-mobile',
    expanded: 'aria-expanded',
    controls: 'aria-controls',
    hidden: 'aria-hidden',
  };

  const classes = {
    isExpanded: 'is-expanded',
  };

  function Collapsible(container) {
    this.container = container;
    this.triggers = this.container.querySelectorAll(selectors.collapsibleTrigger);
    this.resetHeight = 0;
    this._listeners = new PaloAlto.initListeners();

    this.init();
  }

  Collapsible.prototype = $.extend({}, Collapsible.prototype, {
    init() {
      this.isTransitioning = false;

      this.triggers.forEach((trigger) => {
        this._listeners.add(trigger, 'click', (event) => this.collapsibleToggleEvent(event, trigger));
        this._listeners.add(trigger, 'keyup', (event) => this.collapsibleToggleEvent(event, trigger));
      });
    },

    collapsibleToggleEvent(e, trigger) {
      e.preventDefault();
      const dropdownId = trigger.getAttribute(attributes.controls);
      const dropdown = document.getElementById(dropdownId);
      const triggerMobile = trigger.hasAttribute(attributes.collapsibleTriggerMobile);
      const isExpanded = trigger.classList.contains(classes.isExpanded);
      const isSpace = e.keyCode === slate.utils.keyboardKeys.SPACE;
      const isEscape = e.keyCode === slate.utils.keyboardKeys.ESCAPE;
      const isMobile = window.innerWidth < theme.sizes.small;
      let dropdownHeight = dropdown.querySelector(selectors.collapsibleContent).offsetHeight;

      // Do nothing if transitioning
      if (this.isTransitioning) { return; }

      // Do nothing if any different than ESC and Space key pressed
      if (e.keyCode && !isSpace && !isEscape) { return; }

      // Do nothing if ESC key pressed and not expanded or mobile trigger clicked and screen not mobile
      if ((!isExpanded && isEscape) || (triggerMobile && !isMobile)) { return; }

      this.isTransitioning = true;

      if (isExpanded) {
        setTimeout(() => {
          dropdownHeight = 0;
          this.setDropdownHeight(dropdown, dropdownHeight, isExpanded);
        }, 0);
      }

      trigger.setAttribute(attributes.expanded, !isExpanded);
      trigger.classList.toggle(classes.isExpanded, !isExpanded);

      this.setDropdownHeight(dropdown, dropdownHeight, isExpanded);
    },

    setDropdownHeight(dropdown, dropdownHeight, isExpanded) {
      dropdown.style.height = `${dropdownHeight}px`;
      dropdown.setAttribute(attributes.hidden, isExpanded);
      dropdown.classList.toggle(classes.isExpanded, !isExpanded);

      if (this.resetHeight) {
        clearTimeout(this.resetHeight);
      }

      if (dropdownHeight == 0) {
        this.resetHeight = setTimeout(() => {
          dropdown.style.height = '';
        }, 500);
      }

      if (!isExpanded) {
        setTimeout(() => {
          dropdown.style.height = 'auto';
          this.isTransitioning = false;
        }, 500);
      } else {
        this.isTransitioning = false;
      }
    },

    onUnload() {
      this._listeners.removeAll();
    },
  });

  return Collapsible;
})();

PaloAlto.initFocusVisibility = function() {
  const classes = {
    noOutline: 'no-outline',
  };

  document.addEventListener('keyup', (event) => {
    if (event.keyCode === slate.utils.keyboardKeys.TAB) {
      document.body.classList.remove(classes.noOutline);
    }
  });

  document.addEventListener('mousedown', () => {
    document.body.classList.add(classes.noOutline);
  });
};

PaloAlto.initTransparentHeader = function() {
  const selectors = {
    body: 'body',
    main: '[data-main]',
    header: '[data-site-header]',
    shopifySection: '.shopify-section',
    preventTransparentHeader: '[data-prevent-transparent-header]',
  };
  const classes = {
    transparentHeader: 'transparent-header',
    siteHeaderTransparent: 'site-header--transparent',
    hasTransparentHeader: 'has-transparent-header',
  };

  const attributes = {
    dataTransparent: 'data-transparent',
  };

  // Determine what is the first
  const body = document.querySelector(selectors.body);
  const header = body.querySelector(selectors.header);
  const headerTransparent = header.getAttribute(attributes.dataTransparent) === 'true';
  const firstSection = body.querySelector(selectors.main).children[0];

  if (!firstSection) { return; }

  const preventTransparentHeader = firstSection.querySelector(`${selectors.preventTransparentHeader}:first-of-type`);
  isHeaderTransparent = headerTransparent && firstSection.classList.contains(classes.transparentHeader) && !preventTransparentHeader;

  // Set transparent header class
  if (isHeaderTransparent) {
    header.classList.add(classes.siteHeaderTransparent);
   body.classList.add(classes.hasTransparentHeader);
  } else {
    header.classList.remove(classes.siteHeaderTransparent);
    body.classList.remove(classes.hasTransparentHeader);
  }
};

PaloAlto.initSections = function() {
  var sections = new PaloAlto.Sections();

  sections.register('header', PaloAlto.Header);

  // Recheck sticky header settings if section is set to hidden
  // Refresh AOS
  $(document).on('shopify:section:load shopify:section:reorder shopify:section:unload', function() {
    setTimeout(() => {
      PaloAlto.initTransparentHeader();
      PaloAlto.setMainSpacing();
      AOS.refreshHard();
    }, 300);
  });
};

function loadingAnimation() {
  document.documentElement.classList.remove('is-loading');
}

PaloAlto.Drawer = {
  attributes: {
    ariaExpanded: 'aria-expanded',
  },
  selectors: {
    drawer: '[data-drawer]',
    drawerToggle: '[data-drawer-toggle]',
    scroller: '[data-scroll]',
  },
  classes: {
    open: 'is-open',
    drawerOpen: 'js-drawer-open',
  },
  init: function() {
    this.drawers = document.querySelectorAll(this.selectors.drawer);
    this.drawerToggleButtons = document.querySelectorAll(this.selectors.drawerToggle);
    this.collapsible = null;

    this.drawerToggleEvent = throttle((e) => {
      this.toggle(e);
    }, 150);

    this.keyPressCloseEvent = throttle((e) => {
      if (e.keyCode === slate.utils.keyboardKeys.ESCAPE) {
        this.close(e);
      }
    }, 150);

    // Define drawer close event
    this.drawerCloseEvent = (e) => {
      const activeDrawer = document.querySelector(`${this.selectors.drawer}.${this.classes.open}`);
      const isDrawerToggle = e.target.matches(this.selectors.drawerToggle);
      const isDrawerChild = activeDrawer ? activeDrawer.contains(e.target) : false;

      if (!isDrawerToggle && !isDrawerChild) {
        this.close(e);
      }
    };

    // Toggle event for each drawer button
    this.drawerToggleButtons.forEach((button) => {
      button.addEventListener('click', this.drawerToggleEvent);
    });

    // Close drawers if escape key pressed
    this.drawers.forEach((drawer) => {
      drawer.addEventListener('keyup', this.keyPressCloseEvent);

      // Init collapsible mobile dropdowns
      this.collapsible = new PaloAlto.initCollapsible(drawer);
    });

    // Close drawers on click outside
    document.addEventListener('click', this.drawerCloseEvent);
  },
  toggle: function(e) {
    e.preventDefault();
    const drawer = document.querySelector(`#${e.target.getAttribute('aria-controls')}`);
    if (!drawer) { return; }

    const isDrawerOpen = drawer.classList.contains(this.classes.open);

    if (isDrawerOpen) {
      this.close();
    } else {
      this.open(e);
    }
  },
  open: function(e) {
    const drawerOpenButton = e.target;
    const drawer = document.querySelector(`#${e.target.getAttribute('aria-controls')}`);

    if (!drawer) { return; }
    const drawerScroller = drawer.querySelector(this.selectors.scroller) || drawer;

    // Disable page scroll right away
    document.dispatchEvent(new CustomEvent('theme:scroll:lock', {bubbles: true, detail: drawerScroller }));
    document.dispatchEvent(new CustomEvent('theme:drawer:open'), {bubbles: true});
    document.body.classList.add(this.classes.drawerOpen);

    drawer.classList.add(this.classes.open);
    drawerOpenButton.setAttribute(this.attributes.ariaExpanded, true);

    setTimeout(() => {
      slate.a11y.state.trigger = drawerOpenButton;
      slate.a11y.trapFocus({
        container: drawer,
      });
    });
  },
  close: function() {
    if (!document.body.classList.contains(this.classes.drawerOpen)) { return; }

    const drawer = document.querySelector(`${this.selectors.drawer}.${this.classes.open}`);

    this.drawerToggleButtons.forEach((button) => {
      button.setAttribute(this.attributes.ariaExpanded, false);
    });

    // Enable page scroll right after the closing animation ends
    const timeout = 400;
    document.dispatchEvent(new CustomEvent('theme:scroll:unlock', {bubbles: true, detail: timeout}));

    slate.a11y.removeTrapFocus({
      container: drawer,
    });

    drawer.classList.remove(this.classes.open);
    document.body.classList.remove(this.classes.drawerOpen);
    document.dispatchEvent(new CustomEvent('theme:drawer:close'), {bubbles: true});
  },
  destroy: function() {
    // Close drawer
    this.close();

    // Unbind all event listeners for drawers
    this.drawerToggleButtons.forEach((button) => {
      button.removeEventListener('click', this.drawerToggleEvent);
    });
    this.drawers.forEach((drawer) => {
      drawer.removeEventListener('keyup', this.keyPressCloseEvent);
    });
    document.removeEventListener('click', this.drawerCloseEvent);

    if (this.collapsible != null) {
      this.collapsible.onUnload();
    }
  },
};

PaloAlto.Sections = function Sections() {
	this.constructors = {};
	this.instances = [];

	$(document)
		.on('shopify:section:load', this._onSectionLoad.bind(this))
		.on('shopify:section:unload', this._onSectionUnload.bind(this))
		.on('shopify:section:select', this._onSelect.bind(this))
		.on('shopify:section:deselect', this._onDeselect.bind(this))
		.on('shopify:block:select', this._onBlockSelect.bind(this))
		.on('shopify:block:deselect', this._onBlockDeselect.bind(this));
};

PaloAlto.Sections.prototype = _.assignIn({}, PaloAlto.Sections.prototype, {
	_createInstance: function(container, constructor) {
		var $container = $(container);
		var id = $container.attr('data-section-id');
		var type = $container.attr('data-section-type');

		constructor = constructor || this.constructors[type];

		if (_.isUndefined(constructor)) {
			return;
		}

		var instance = _.assignIn(new constructor(container), {
			id: id,
			type: type,
			container: container
		});

		this.instances.push(instance);
	},

	_onSectionLoad: function(evt) {
		var container = $('[data-section-id]', evt.target)[0];
		if (container) {
			this._createInstance(container);
		}
	},

	_onSectionUnload: function(evt) {
		this.instances = _.filter(this.instances, function(instance) {
			var isEventInstance = (instance.id === evt.detail.sectionId);

			if (isEventInstance) {
				if (_.isFunction(instance.onUnload)) {
					instance.onUnload(evt);
				}
			}

			return !isEventInstance;
		});
	},

	_onSelect: function(evt) {
		// eslint-disable-next-line no-shadow
		var instance = _.find(this.instances, function(instance) {
			return instance.id === evt.detail.sectionId;
		});

		if (!_.isUndefined(instance) && _.isFunction(instance.onSelect)) {
			instance.onSelect(evt);
		}
	},

	_onDeselect: function(evt) {
		// eslint-disable-next-line no-shadow
		var instance = _.find(this.instances, function(instance) {
			return instance.id === evt.detail.sectionId;
		});

		if (!_.isUndefined(instance) && _.isFunction(instance.onDeselect)) {
			instance.onDeselect(evt);
		}
	},

	_onBlockSelect: function(evt) {
		// eslint-disable-next-line no-shadow
		var instance = _.find(this.instances, function(instance) {
			return instance.id === evt.detail.sectionId;
		});

		if (!_.isUndefined(instance) && _.isFunction(instance.onBlockSelect)) {
			instance.onBlockSelect(evt);
		}
	},

	_onBlockDeselect: function(evt) {
		// eslint-disable-next-line no-shadow
		var instance = _.find(this.instances, function(instance) {
			return instance.id === evt.detail.sectionId;
		});

		if (!_.isUndefined(instance) && _.isFunction(instance.onBlockDeselect)) {
			instance.onBlockDeselect(evt);
		}
	},

	register: function(type, constructor) {
		this.constructors[type] = constructor;

		$('[data-section-type=' + type + ']').each(function(index, container) {
			this._createInstance(container, constructor);
		}.bind(this));
	}
});
PaloAlto.setMainSpacing = function() {
  const selectors = {
    header: '[data-site-header]',
    pageContainer: '[data-page-container]',
    templateListCollections: '.template-list-collections',
    collectionFilters: '[data-collection-filters]',
  };
  const classes = {
    hasScrolled: 'has-scrolled',
    headerSticky: 'header--sticky',
    headerRelative: 'header--relative',
  };

  // Reset header to its initial state in order to calculate the proper header height
  document.body.classList.remove(classes.hasScrolled);

  const pageContainer = document.querySelector(selectors.pageContainer);
  const header = document.querySelector(selectors.header);
  const headerSection = header.parentNode;
  const isHeaderSticky = header.dataset.position == 'fixed';
  const isListCollectionsTemplate = document.querySelector(selectors.templateListCollections);
  const hasCollectionFilters = document.querySelector(selectors.collectionFilters);
  const headerHeight = !isHeaderTransparent ? parseInt(header.clientHeight) : 0;

  // Define the initial header height
  window.initialHeaderHeight = parseInt(header.dataset.height);

  // Set main header push if the first section doesn't use transparent header
  let screenWidth = Number(window.outerWidth);
  let productSubmitBtn = document.querySelector('.product__submit__buttons button[type="submit"]');
  
  console.log({screenWidth})
  if(screenWidth < 1024){
    if(header.classList.contains('mobile-header-position-bottom')){
      let vHeaderHeight = header.clientHeight;
      pageContainer.style.paddingBottom = vHeaderHeight + 'px';
      if(productSubmitBtn){
        productSubmitBtn.style.marginBottom = Number(vHeaderHeight - 5) + 'px';
      }
      document.querySelector("#PageContainer").style.paddingTop = 0 + 'px';
      console.log("if position bottom");
    }else if(header.classList.contains('mobile-header-position-top')){
      pageContainer.style.paddingTop = headerHeight + 'px';
      console.log("if position top");
    }
  }else{
    pageContainer.style.paddingTop = 0 + 'px';
    pageContainer.style.paddingTop = headerHeight + 'px';
    console.log("if position unknown");
    if(productSubmitBtn){
      productSubmitBtn.style.marginBottom = 0 + 'px';
    }
  }

  // Update header position
  if (isHeaderSticky && !hasCollectionFilters) {
    headerSection.classList.add(classes.headerSticky);
  } else {
    headerSection.classList.remove(classes.headerSticky);
  }

  if (!isHeaderSticky && isListCollectionsTemplate) {
    headerSection.classList.add(classes.headerRelative);
  }

  // Update header state
  document.dispatchEvent(new CustomEvent('theme:scroll'), {bubbles: false});
};

let prev = window.pageYOffset;
let up = null;
let down = null;
let wasUp = null;
let wasDown = null;
let scrollLockTimer = 0;

const classes = {
  quickViewVisible: 'js-quick-view-visible',
  cartDrawerOpen: 'js-drawer-open-cart',
}

function dispatchScrollEvent() {
  const position = window.pageYOffset;
  if (position > prev) {
    down = true;
    up = false;
  } else if (position < prev) {
    down = false;
    up = true;
  } else {
    up = null;
    down = null;
  }
  prev = position;
  document.dispatchEvent(
    new CustomEvent('theme:scroll', {
      detail: {
        up,
        down,
        position,
      },
      bubbles: false,
    }),
  );
  if (up && !wasUp) {
    document.dispatchEvent(
      new CustomEvent('theme:scroll:up', {
        detail: {position},
        bubbles: false,
      }),
    );
  }
  if (down && !wasDown) {
    document.dispatchEvent(
      new CustomEvent('theme:scroll:down', {
        detail: {position},
        bubbles: false,
      }),
    );
  }
  wasDown = down;
  wasUp = up;
}

function lock(e) {
  // Prevent body scroll lock race conditions
  setTimeout(() => {
    if (scrollLockTimer) {
      clearTimeout(scrollLockTimer);
    }

    scrollLock.disablePageScroll(e.detail, {
      allowTouchMove: (el) => el.tagName === 'TEXTAREA',
    });

    document.documentElement.setAttribute('data-scroll-locked', '');
  });
}

function unlock(e) {
  const timeout = e.detail;

  if (timeout) {
    scrollLockTimer = setTimeout(removeScrollLock, timeout);
  } else {
    removeScrollLock();
  }
}

function removeScrollLock() {
  const isPopupVisible = document.body.classList.contains(classes.quickViewVisible) || document.body.classList.contains(classes.cartDrawerOpen);

  if (!isPopupVisible) {
    scrollLock.clearQueueScrollLocks();
    scrollLock.enablePageScroll();
    document.documentElement.removeAttribute('data-scroll-locked');
  }
}

function scrollListener() {
  let timeout;
  window.addEventListener(
    'scroll',
    function() {
      if (timeout) {
        window.cancelAnimationFrame(timeout);
      }
      timeout = window.requestAnimationFrame(function() {
        dispatchScrollEvent();
      });
    },
    {passive: true},
  );

  window.addEventListener('theme:scroll:lock', lock);
  window.addEventListener('theme:scroll:unlock', unlock);
}

// Scroll to top button
const scrollTopButton = document.querySelector('[data-scroll-top-button]');
if (scrollTopButton) {
  scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });
  document.addEventListener('scroll', throttle(() => {
    scrollTopButton.classList.toggle('is-visible', window.pageYOffset > window.innerHeight);
  }, 150));
}

Sqrl.filters.define('handle', function(str) {
  str = str.toLowerCase();

  var toReplace = ['"', "'", '\\', '(', ')', '[', ']'];

  // For the old browsers
  for (var i = 0; i < toReplace.length; ++i) {
    str = str.replace(toReplace[i], '');
  }

  str = str.replace(/\W+/g, '-');

  if (str.charAt(str.length - 1) == '-') {
    str = str.replace(/-+\z/, '');
  }

  if (str.charAt(0) == '-') {
    str = str.replace(/\A-+/, '');
  }

  return str;
});

Sqrl.filters.define('last', function(str) {
  const words = str.split('-');
  return words[words.length - 1];
});

Sqrl.filters.define('asset_url', function(str) {
  let asset = theme.assets.image;
  asset = asset.replace('image', str);
  return asset;
});

function getScrollbarWidth() {
  // Creating invisible container
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll'; // forcing scrollbar to appear
  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement('div');
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  // Removing temporary elements from the DOM
  outer.parentNode.removeChild(outer);

  return scrollbarWidth;
}

/*= =============== Utilities ================*/
PaloAlto.BgSet = {
  render: function(image, imageAspectRatio) {
    let bgset = '';
    const blankImageAspectRatio = 1;

    if (image.indexOf('no-image') != -1 && image.indexOf('2048x.gif') != -1) {
      imageAspectRatio = blankImageAspectRatio;
    }

    bgset += image.replace('_2048x.', '_180x.') + ' 180w ' + Math.round(180 / imageAspectRatio) + 'h,';
    bgset += image.replace('_2048x.', '_360x.') + ' 360w ' + Math.round(360 / imageAspectRatio) + 'h,';
    bgset += image.replace('_2048x.', '_540x.') + ' 540w ' + Math.round(540 / imageAspectRatio) + 'h,';
    bgset += image.replace('_2048x.', '_720x.') + ' 720w ' + Math.round(720 / imageAspectRatio) + 'h,';
    bgset += image.replace('_2048x.', '_900x.') + ' 900w ' + Math.round(900 / imageAspectRatio) + 'h,';
    bgset += image.replace('_2048x.', '_1080x.') + ' 1080w ' + Math.round(1080 / imageAspectRatio) + 'h,';
    bgset += image.replace('_2048x.', '_1296x.') + ' 1296w ' + Math.round(1296 / imageAspectRatio) + 'h,';
    bgset += image.replace('_2048x.', '_1512x.') + ' 1512w ' + Math.round(1512 / imageAspectRatio) + 'h,';
    bgset += image.replace('_2048x.', '_1728x.') + ' 1728w ' + Math.round(1728 / imageAspectRatio) + 'h,';
    bgset += image.replace('_2048x.', '_1950x.') + ' 1950w ' + Math.round(1950 / imageAspectRatio) + 'h,';
    bgset += image + ' 2048w ' + Math.round(2048 / imageAspectRatio) + 'h';

    return bgset;
  },
};

PaloAlto.FetchError = (function() {
  function FetchError(object) {
    this.status = object.status || null;
    this.headers = object.headers || null;
    this.json = object.json || null;
    this.body = object.body || null;
  }
  FetchError.prototype = Error.prototype;

  return FetchError;
})();

PaloAlto.fetchProduct = function(handle) {
  const requestRoute = `${theme.routes.root}products/${handle}.js`;
  return window
    .fetch(requestRoute)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch((e) => {
      console.error(e);
    });
};

PaloAlto.formatPrices = function(product, pairProduct = false) {
  const onSale = product.price <= product.compare_at_price_min;
  const soldOut = !product.available;
  const showSoldOut = theme.settings.showSoldBadge;
  const showSale = theme.settings.showSaleBadge;
  const showSavingBadge = theme.settings.showSavingBadge;
  const savingBadgeType = theme.settings.savingBadgeType;
  let soldBadgeText = false;
  let saleBadgeText = false;
  let savingBadgeText = false;
  let price = product.price;
  let priceCompare = product.compare_at_price;
  let priceDifference = priceCompare - price;

  // Custom and Preorder badges
  if (showSavingBadge && !pairProduct) {
    if (product.variants.length > 1) {
      product.variants.forEach(variant => {
        const variantPriceDifference = variant.compare_at_price - variant.price;

        if (variantPriceDifference > priceDifference) {
          priceDifference = variantPriceDifference;
          price = variant.price;
          priceCompare = variant.compare_at_price;
        }
      });
    }

    if (priceDifference > 0) {
      if (savingBadgeType === 'percentage') {
        price = `${Math.round(((-(price / priceCompare) + 1) * 100).toFixed(2))}%`;
      } else {
        price = slate.Currency.formatMoney(priceDifference, theme.moneyFormat);
      }

      savingBadgeText = theme.strings.saving_badge.replace('', price);

      if (product.variants.length > 1) {
        savingBadgeText = theme.strings.saving_up_to_badge.replace('', price);
      }
    }
  }

  // Sold out badge
  if (showSoldOut && soldOut) {
    soldBadgeText = theme.strings.sold_out;
  }

  // Sale badge
  if (showSale && onSale && !soldOut && !savingBadgeText) {
    saleBadgeText = theme.strings.sale_badge_text;
  }

  const formatted = {
    ...product,
    soldBadgeText,
    saleBadgeText,
    savingBadgeText,
    compare_at_price_max: slate.Currency.formatMoney(product.compare_at_price_max, theme.moneyFormat),
    compare_at_price_min: slate.Currency.formatMoney(product.compare_at_price_min, theme.moneyFormat),
    price_max: slate.Currency.formatMoney(product.price_max, theme.moneyFormat),
    price_min: slate.Currency.formatMoney(product.price_min, theme.moneyFormat),
    unit_price: slate.Currency.formatMoney(product.unit_price, theme.moneyFormat),
  };

  return formatted;
};


/*= =============== Features ================*/
PaloAlto.HoverDisclosure = (function() {
  const selectors = {
    disclosureToggle: 'data-hover-disclosure-toggle',
    header: '[data-site-header]',
    link: '[data-top-link]',
    stagger: '[data-stagger]',
    staggerPair: '[data-stagger-first]',
    staggerAfter: '[data-stagger-second]',
    focusable: 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  };

  const classes = {
    isVisible: 'is-visible',
    meganavVisible: 'meganav--visible',
    meganavIsTransitioning: 'meganav--is-transitioning',
    grandparent: 'grandparent',
  };

  function HoverDisclosure(el) {
    this.disclosure = el;
    this.wrapper = el.closest(selectors.header);
    this.key = this.disclosure.id;
    this.trigger = document.querySelector(`[${selectors.disclosureToggle}='${this.key}']`);
    this.link = this.trigger.querySelector(selectors.link);
    this.grandparent = this.trigger.classList.contains(classes.grandparent);
    this.transitionTimeout = 0;
    this.trigger.setAttribute('aria-haspopup', true);
    this.trigger.setAttribute('aria-expanded', false);
    this.trigger.setAttribute('aria-controls', this.key);

    this.connectHoverToggle();
    this.handleTablets();
    this.staggerChildAnimations();
  }

  HoverDisclosure.prototype = $.extend({}, HoverDisclosure.prototype, {
    showDisclosure(e) {
      if (e && e.type && e.type === 'mouseenter') {
        this.wrapper.classList.add(classes.meganavIsTransitioning);
      }

      if (this.grandparent) {
        this.wrapper.classList.add(classes.meganavVisible);
      } else {
        this.wrapper.classList.remove(classes.meganavVisible);
      }
      this.trigger.setAttribute('aria-expanded', true);
      this.trigger.classList.add(classes.isVisible);
      this.disclosure.classList.add(classes.isVisible);

      if (this.transitionTimeout) {
        clearTimeout(this.transitionTimeout);
      }

      this.transitionTimeout = setTimeout(() => {
        this.wrapper.classList.remove(classes.meganavIsTransitioning);
      }, 200);
    },

    hideDisclosure() {
      this.disclosure.classList.remove(classes.isVisible);
      this.trigger.classList.remove(classes.isVisible);
      this.trigger.setAttribute('aria-expanded', false);
      this.wrapper.classList.remove(classes.meganavVisible, classes.meganavIsTransitioning);
    },

    staggerChildAnimations() {
      const simple = this.disclosure.querySelectorAll(selectors.stagger);
      simple.forEach((el, index) => {
        el.style.transitionDelay = `${index * 50 + 10}ms`;
      });

      const pairs = this.disclosure.querySelectorAll(selectors.staggerPair);
      pairs.forEach((child, i) => {
        const d1 = i * 150;
        child.style.transitionDelay = `${d1}ms`;
        child.parentElement.querySelectorAll(selectors.staggerAfter).forEach((grandchild, i2) => {
          const di1 = i2 + 1;
          const d2 = di1 * 20;
          grandchild.style.transitionDelay = `${d1 + d2}ms`;
        });
      });
    },

    handleTablets() {
      // first click opens the popup, second click opens the link
      this.trigger.addEventListener(
        'touchstart',
        function(e) {
          const isOpen = this.disclosure.classList.contains(classes.isVisible);
          if (!isOpen) {
            e.preventDefault();
            this.showDisclosure(e);
          }
        }.bind(this),
        {passive: true},
      );
    },

    connectHoverToggle() {
      this.trigger.addEventListener('mouseenter', (e) => this.showDisclosure(e));
      this.link.addEventListener('focus', (e) => this.showDisclosure(e));

      this.trigger.addEventListener('mouseleave', () => this.hideDisclosure());
      this.trigger.addEventListener('focusout', (e) => {
        const inMenu = this.trigger.contains(e.relatedTarget);
        if (!inMenu) {
          this.hideDisclosure();
        }
      });
      this.disclosure.addEventListener('keyup', (evt) => {
        if (evt.which !== slate.utils.keyboardKeys.ESCAPE) {
          return;
        }
        this.hideDisclosure();
      });
    },

    onBlockSelect(evt) {
      if (this.disclosure.contains(evt.target)) {
        this.showDisclosure(evt);
      }
    },

    onBlockDeselect(evt) {
      if (this.disclosure.contains(evt.target)) {
        this.hideDisclosure();
      }
    },
  });

  return HoverDisclosure;
})();

PaloAlto.NavSearch = (function() {
  const selectors = {
    body: 'body',
    header: '[data-site-header]',
    search: '[data-nav-search]',
    searchOpen: '[data-nav-search-open]',
    searchClose: '[data-nav-search-close]',
    searchForm: '[data-nav-search-form]',
    searchContainer: '[data-nav-search-container]',
    searchScroller: '[data-nav-search-scroller]',
    searchResultsContainer: '[data-nav-search-results]',
    searchInput: '[data-nav-search-input]',
    popularSearchLink: '[data-popular-search-link]',
    productTemplate: '[product-grid-item-template]',
    productsWrapper: '[data-products-wrap]',
    noresultTemplate: '[noresult-item-template]',
    resultsPagination: '[data-results-pagination]',
  };
  const classes = {
    pushUp: 'push-up',
    cartDrawerOpen: 'js-drawer-open-cart',
    drawerOpen: 'js-drawer-open',
    isSearching: 'is-searching',
    isSearchVisible: 'is-search-visible',
    navSearchIsVisible: 'nav-search--is-visible',
    loading: 'loading',
    isPaginationVisible: 'is-pagination-visible',
  };

  function NavSearch(container) {
    this.container = container;
    this.searchInput = this.container.querySelector(selectors.searchInput);
    this.searchClose = this.container.querySelector(selectors.searchClose);
    this.searchContainer = this.container.querySelector(selectors.searchContainer);
    this.popularLinks = this.container.querySelectorAll(selectors.popularSearchLink);
    this.scrollableElement = this.container.querySelector(selectors.searchScroller);
    this.searchResultsContainer = this.container.querySelector(selectors.searchResultsContainer);
    this.searchForm = this.container.querySelector(selectors.searchForm);
    this.resultsPagination = this.container.querySelector(selectors.resultsPagination);

    this.productTemplate = document.querySelector(selectors.productTemplate).innerHTML;
    this.productsWrapper = document.querySelector(selectors.productsWrapper);
    this.noresultTemplate = document.querySelector(selectors.noresultTemplate).innerHTML;

    this.searchOpen = document.querySelectorAll(selectors.searchOpen);
    this.bodySelector = document.querySelector(selectors.body);
    this.headerSelector = document.querySelector(selectors.header);
    this.isNavDrawerOpen = this.bodySelector.classList.contains(classes.drawerOpen);
    this.isCartDrawerOpen = this.bodySelector.classList.contains(classes.cartDrawerOpen);

    this.result = null;
    this.openSearchTimeout = 0;
    this.linkOpened = null;
    this.init();
  }

  NavSearch.prototype = $.extend({}, NavSearch.prototype, {
    init() {
      this.initListeners();
      this.initSearch();
    },

    initSearch() {
      this.searchInput.addEventListener(
        'input',
        PaloAlto.debounce(
          function(event) {
            const val = event.target.value;
            if (val && val.length > 1) {
              this.searchContainer.classList.add(classes.isSearching, classes.pushUp);
              this.fetchProductSuggestions(val);
            } else {
              this.reset();
            }
          }.bind(this),
          300,
        ),
      );
      this.searchInput.addEventListener('clear', this.reset.bind(this));
    },

    initListeners() {
      this.container.addEventListener('keyup', (e) => {
        if (e.keyCode === slate.utils.keyboardKeys.ESCAPE) {
          e.stopImmediatePropagation();
          this.close();
        }
      });

      this.searchOpen.forEach((searchButton) => {
        searchButton.addEventListener('click', (e) => {
          e.preventDefault();
          this.open();
          this.linkOpened = e.target;
        });
      });

      this.searchClose.addEventListener('click', (e) => {
        e.preventDefault();
        this.close();
      });

      this.popularLinks.forEach((popularLink) => {
        popularLink.addEventListener('click', (e) => {
          e.preventDefault();
          const searchText = e.target.textContent;
          this.searchInput.value = searchText;
          window.location.href = `${theme.routes.search_url}?type=product&q=${searchText}&options[prefix]=last`;
        });
      });

      return this.linkOpened;
    },

    open() {
      if (this.isNavDrawerOpen || this.isCartDrawerOpen) {
        PaloAlto.Drawer.close();

        if (this.openSearchTimeout) {
          clearTimeout(this.openSearchTimeout);
        }
        this.openSearchTimeout = setTimeout(this.openSearch, 400);
      } else {
        this.openSearch();
      }
    },

    openSearch() {
      this.headerSelector.classList.add(classes.isSearchVisible);
      this.container.classList.add(classes.navSearchIsVisible);

      document.dispatchEvent(new CustomEvent('theme:scroll:lock', {bubbles: true, detail: this.scrollableElement}));

      setTimeout(() => {
        slate.a11y.trapFocus({
          container: this.container,
          elementToFocus: this.searchInput,
        });
      }, 100);
    },

    close() {
      const isSearchVisible = this.headerSelector.classList.contains(classes.isSearchVisible);

      if (!isSearchVisible) { return; }

      this.reset();

      slate.a11y.removeTrapFocus({
        container: this.container,
      });

      this.headerSelector.classList.remove(classes.isSearchVisible);
      this.container.classList.remove(classes.navSearchIsVisible);

      setTimeout(() => {
        slate.a11y.trapFocus({
          container: this.headerSelector,
          elementToFocus: this.linkOpened,
        });
      }, 100);

      setTimeout(() => {
        document.dispatchEvent(new CustomEvent('theme:scroll:unlock', {bubbles: true}));
      }, 250);
    },

    reset(clearTerms = true) {
      this.productsWrapper.innerHTML = '';
      this.searchInput.val = '';
      slate.a11y.removeTrapFocus();

      if (clearTerms) {
        this.searchContainer.classList.remove([classes.isSearching, classes.pushUp]);
        this.searchResultsContainer.classList.remove(classes.isPaginationVisible);
      }
    },

    fetchProductSuggestions(terms) {
      fetch(`/search/suggest.json?q=${encodeURIComponent(terms)}&resources[type]=product&resources[limit]=10&resources[options][unavailable_products]=last`)
        .then(this.handleErrors)
        .then((response) => response.json())
        .then((response) => {
          this.result = response.resources.results;

          return this.fetchProducts(this.result.products);
        })
        .then((response) => {
          this.productsWrapper.innerHTML = '';
          this.searchResultsContainer.classList.remove(classes.isPaginationVisible);

          if (response === '') {
            this.injectHTML($(selectors.productsWrapper)[0], this.renderNoResult());
          } else {
            this.injectHTML($(selectors.productsWrapper)[0], response);

            if (this.result.products.length > 9) {
              this.resultsPagination.getElementsByTagName('a')[0].href = `${theme.routes.search_url}?type=product&q=${terms}&options[prefix]=last`;
              this.searchResultsContainer.classList.add(classes.isPaginationVisible);
            }

            slate.a11y.removeTrapFocus({
              container: this.container,
            });
            slate.a11y.trapFocus({
              container: this.container,
              elementToFocus: this.searchInput,
            });
          }

          this.searchContainer.classList.remove(classes.isSearching);
        })
        .catch((e) => {
          console.error(e);
        });
    },

    injectHTML(target, pageHTML) {
      target.innerHTML += pageHTML;
    },

    renderNoResult() {
      const text = theme.strings.no_results;

      const updateValues = {
        text,
      };

      return Sqrl.render(this.noresultTemplate, {item: updateValues});
    },

    fetchProducts(products) {
      const promises = [];
      products.forEach((product) => {
        // because of a translation bug in the predictive search API
        // we need to fetch the product JSON from the handle
        promises.push(
          PaloAlto.fetchProduct(product.handle).then((productJSON) => {
            const formatted = PaloAlto.formatPrices(productJSON);
            return this.renderProduct(formatted);
          }),
        );
      });

      return Promise.all(promises).then((result) => {
        let str = '';
        result.forEach((render) => {
          str += render;
        });
        return str;
      });
    },

    renderProduct(product) {
      const stripHtmlRegex = /(<([^>]+)>)/gi;
      const title = product.title.replace(stripHtmlRegex, '');
      let media = null;
      let image = '';

      if (product.media !== undefined) {
        media = product.media[0];
      }

      if (media) {
        let layout = false;

        if (theme.settings.gridImageSize == 'contain') {
          layout = media.preview_image.aspect_ratio > theme.settings.gridImageAspectRatio ? 'landscape' : 'portrait';
        }

        image = {
          thumb: PaloAlto.BgSet.render(getSizedImageUrl(media.preview_image.src, '2048x'), media.preview_image.aspect_ratio),
          aspectRatio: media.preview_image.aspect_ratio,
          layout: layout,
        };
      } else {
        image = {
          thumb: theme.assets.no_image,
          alt: '',
          aspectRatio: 1,
        };
      }

      const updateValues = {
        ...product,
        title,
        image,
      };

      return Sqrl.render(this.productTemplate, {product: updateValues});
    },

    handleErrors(response) {
      if (!response.ok) {
        return response.json().then(function(json) {
          const e = new PaloAlto.FetchError({
            status: response.statusText,
            headers: response.headers,
            json: json,
          });
          throw e;
        });
      }
      return response;
    },
  });

  return NavSearch;
})();

function singles(frame, wrappers) {
  // sets the height of any frame passed in with the
  // tallest preventOverflowContent as well as any image in that frame
  let tallest = 0;

  wrappers.forEach((wrap) => {
    tallest = wrap.offsetHeight > tallest ? wrap.offsetHeight : tallest;
  });
  const images = frame.querySelectorAll('[data-overflow-background]');
  const frames = [frame, ...images];
  frames.forEach((el) => {
    el.style.setProperty('min-height', `calc(${tallest}px + var(--header-height)`);
  });
}

function doubles(section) {
  if (window.innerWidth < window.theme.sizes.small) {
    // if we are below the small breakpoint, the double section acts like two independent
    // single frames
    let singleFrames = section.querySelectorAll('[data-overflow-frame]');
    singleFrames.forEach((singleframe) => {
      const wrappers = singleframe.querySelectorAll('[data-overflow-content]');
      singles(singleframe, wrappers);
    });
    return;
  }

  let tallest = 0;

  const frames = section.querySelectorAll('[data-overflow-frame]');
  const contentWrappers = section.querySelectorAll('[data-overflow-content]');
  contentWrappers.forEach((content) => {
    if (content.offsetHeight > tallest) {
      tallest = content.offsetHeight;
    }
  });
  const images = section.querySelectorAll('[data-overflow-background]');
  let applySizes = [...frames, ...images];
  applySizes.forEach((el) => {
    el.style.setProperty('min-height', `${tallest}px`);
  });
  section.style.setProperty('min-height', `${tallest}px`);
}

function preventOverflow(container) {
  const singleFrames = container.querySelectorAll('[data-overflow-container]');
  if (singleFrames) {
    singleFrames.forEach((frame) => {
      const wrappers = frame.querySelectorAll('[data-overflow-content]');
      singles(frame, wrappers);
      document.addEventListener('theme:resize', () => {
        singles(frame, wrappers);
      });
    });
  }

  const doubleSections = container.querySelectorAll('[data-overflow-wrapper]');
  if (doubleSections) {
    doubleSections.forEach((section) => {
      doubles(section);
      document.addEventListener('theme:resize', () => {
        doubles(section);
      });
    });
  }
}

PaloAlto.ProductModel = (function() {
  let modelJsonSections = {};
  let models = {};
  let xrButtons = {};

  const selectors = {
    productMediaWrapper: '[data-product-single-media-wrapper]',
    mediaGroup: '[data-product-single-media-group]',
    productXr: '[data-shopify-xr]',
    mediaId: 'data-media-id',
    model3d: 'data-shopify-model3d-id',
    modelViewer: 'model-viewer',
    modelJson: '#ModelJson-',
    deferredMedia: '[data-deferred-media]',
    deferredMediaButton: '[data-deferred-media-button]',
  };
  const classes = {
    isLoading: 'is-loading',
    mediaHidden: 'media--hidden',
  };

  function init(mediaContainer, sectionId) {
    modelJsonSections[sectionId] = {
      loaded: false,
    };

    const deferredMediaButton = mediaContainer.querySelector(selectors.deferredMediaButton);

    if (deferredMediaButton) {
      deferredMediaButton.addEventListener('click', loadContent.bind(this, mediaContainer, sectionId));
    }
  }

  function loadContent(mediaContainer, sectionId) {
    if (mediaContainer.querySelector(selectors.deferredMedia).getAttribute('loaded')) {
      return;
    }

    mediaContainer.classList.add(classes.isLoading);
    const content = document.createElement('div');
    content.appendChild(mediaContainer.querySelector('template').content.firstElementChild.cloneNode(true));
    const modelViewerElement = content.querySelector('model-viewer');
    const deferredMedia = mediaContainer.querySelector(selectors.deferredMedia);
    deferredMedia.appendChild(modelViewerElement);
    deferredMedia.setAttribute('loaded', true);
    const mediaId = mediaContainer.dataset.mediaId;
    const modelId = modelViewerElement.dataset.modelId;
    const xrButton = mediaContainer.closest(selectors.mediaGroup).parentElement.querySelector(selectors.productXr);
    xrButtons[sectionId] = {
      element: xrButton,
      defaultId: modelId,
    };

    models[mediaId] = {
      modelId: modelId,
      mediaId: mediaId,
      sectionId: sectionId,
      container: mediaContainer,
      element: modelViewerElement,
    };

    if (!window.ShopifyXR) {
      window.Shopify.loadFeatures([
        {
          name: 'shopify-xr',
          version: '1.0',
          onLoad: setupShopifyXr,
        },
        {
          name: 'model-viewer-ui',
          version: '1.0',
          onLoad: setupModelViewerUi,
        },
      ]);
    } else {
      setupModelViewerUi();
    }
  }

  function setupShopifyXr(errors) {
    if (errors) {
      console.warn(errors);
      return;
    }
    if (!window.ShopifyXR) {
      document.addEventListener('shopify_xr_initialized', function() {
        setupShopifyXr();
      });
      return;
    }

    for (const sectionId in modelJsonSections) {
      if (modelJsonSections.hasOwnProperty(sectionId)) {
        const modelSection = modelJsonSections[sectionId];

        if (modelSection.loaded) {
          continue;
        }

        const modelJson = document.querySelector(`${selectors.modelJson}${sectionId}`);

        if (modelJson) {
          window.ShopifyXR.addModels(JSON.parse(modelJson.innerHTML));
          modelSection.loaded = true;
        }
      }
    }

    window.ShopifyXR.setupXRElements();
  }

  function setupModelViewerUi(errors) {
    if (errors) {
      console.warn(errors);
      return;
    }

    for (const key in models) {
      if (models.hasOwnProperty(key)) {
        const model = models[key];
        if (!model.modelViewerUi) {
          model.modelViewerUi = new Shopify.ModelViewerUI(model.element);
          setupModelViewerListeners(model);
        }
      }
    }
  }

  function setupModelViewerListeners(model) {
    const xrButton = xrButtons[model.sectionId];
    model.container.addEventListener('theme:media:visible', function() {
      xrButton.element.setAttribute(selectors.model3d, model.modelId);

      if (window.theme.touch) {
        return;
      }

      model.modelViewerUi.play();
      model.container.dispatchEvent(new CustomEvent('theme:media:play'), {bubbles: true});
    });

    model.container.addEventListener('theme:media:hidden', function() {
      model.modelViewerUi.pause();
    });

    model.container.addEventListener('xrLaunch', function() {
      model.modelViewerUi.pause();
    });

    model.element.addEventListener('load', () => {
      xrButton.element.setAttribute(selectors.model3d, model.modelId);
      model.container.classList.remove(classes.isLoading);
      model.container.dispatchEvent(new CustomEvent('theme:media:play'), {bubbles: true});
    });

    model.element.addEventListener('shopify_model_viewer_ui_toggle_play', function() {
      pauseOtherMedia(model.mediaId);
      model.container.dispatchEvent(new CustomEvent('theme:media:play'), {bubbles: true});
    });
    model.element.addEventListener('shopify_model_viewer_ui_toggle_pause', function() {
      model.container.dispatchEvent(new CustomEvent('theme:media:pause'), {bubbles: true});
    });

    pauseOtherMedia(model.mediaId);
  }

  function pauseOtherMedia(mediaId) {
    const currentMedia = `[${selectors.mediaId}="${mediaId}"]`;
    const otherMedia = document.querySelectorAll(`${selectors.productMediaWrapper}:not(${currentMedia})`);

    if (otherMedia.length) {
      otherMedia.forEach((media) => {
        media.dispatchEvent(new CustomEvent('theme:media:hidden'), {bubbles: true});
        media.classList.add(classes.mediaHidden);
      });
    }
  }

  function removeSectionModels(sectionId) {
    for (const key in models) {
      if (models.hasOwnProperty(key)) {
        const model = models[key];
        if (model.sectionId === sectionId) {
          delete models[key];
        }
      }
    }
    delete modelJsonSections[sectionId];
    delete theme.mediaInstances[sectionId];
  }

  return {
    init: init,
    loadContent: loadContent,
    removeSectionModels: removeSectionModels,
  };
})();


/*= =============== Sections ================*/
PaloAlto.Header = (function() {
  const selectors = {
    announcementBar: '[data-announcement-wrapper]',
    collectionFilters: '[data-collection-filters]',
    disclosureWrappper: '[data-hover-disclosure]',
    logo: '[data-logo]',
    mobileNavDropdownTrigger: '[data-collapsible-trigger]',
    nav: '[data-nav]',
    navIcons: '[data-nav-icons]',
    navItem: '[data-nav-item]',
    navLinkMobile: '[data-nav-link-mobile]',
    navSearch: '[data-nav-search]',
    wrapper: '[data-wrapper]',
  };

  const classes = {
    jsDrawerOpenAll: ['js-drawer-open', 'js-drawer-open-cart'],
    headerTransparent: 'site-header--transparent',
    headerLoading: 'site-header--loading',
    hasScrolled: 'has-scrolled',
    hideHeader: 'hide-header',
    navCompress: 'nav--compress',
    headerSticky: 'header--sticky',
  };

  function Header(container) {
    this.container = container;
    this.header = container;
    this.headerSection = container.parentNode;
    this.headerWrapper = container.querySelector(selectors.wrapper);
    this.logo = container.querySelector(selectors.logo);
    this.nav = container.querySelector(selectors.nav);
    this.navIcons = container.querySelector(selectors.navIcons);
    this.navDrawerCloseEvent = null;
    this.headerStateEvent = (evt) => this.headerState(evt);

    PaloAlto.initTransparentHeader();
    PaloAlto.setMainSpacing();
    PaloAlto.Drawer.init();

    this.sections = [];
    const disclosures = this.container.querySelectorAll(selectors.disclosureWrappper);
    if (disclosures.length) {
      disclosures.forEach((el) => {
        this.sections.push(new PaloAlto.HoverDisclosure(el));
      });
    }

    this.controlNav();
    this.initMobileNav();

    window.addEventListener('load', this.controlNav.bind(this));
    document.addEventListener('theme:resize:width', this.controlNav.bind(this));

    const navSearch = document.querySelector(selectors.navSearch);
    const hasCollectionFilters = document.querySelector(selectors.collectionFilters);

    // Init ajax search if only search icon is shown
    if (navSearch) {
      new PaloAlto.NavSearch(navSearch);
    }

    if (!hasCollectionFilters) {
      this.initStickyHeader();
    } else {
      this.header.classList.remove(classes.headerLoading);
    }
  }

  Header.prototype = $.extend({}, Header.prototype, {
    initStickyHeader: function() {
      this.position = this.header.dataset.position;

      if (this.position === 'fixed') {
        this.headerSection.classList.add(classes.headerSticky);
      } else {
        this.headerSection.classList.remove(classes.headerSticky);
      }

      this.header.classList.remove(classes.headerLoading);
      this.headerState();
      document.addEventListener('theme:scroll', this.headerStateEvent);
    },

    // Switch to "compact" header on scroll
    headerState: function(evt) {
      const headerHeight = parseInt(this.header.dataset.height || this.header.offsetHeight);
      const announcementBar = document.querySelector(selectors.announcementBar);
      const announcementHeight = announcementBar ? announcementBar.offsetHeight : 0;
      const pageOffset = headerHeight + announcementHeight;
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollUp = evt && evt.detail && evt.detail.up;

      if (this.position === 'fixed') {
        // Show compact header when scroll down
const mediaQuery = window.matchMedia('(min-width: 768px)')
// Check if the media query is true

    if (currentScrollTop > pageOffset) {
          document.body.classList.add(classes.hasScrolled);
          this.header.classList.remove(classes.headerTransparent);
        } else {
          document.body.classList.remove(classes.hasScrolled);
if (mediaQuery.matches) {
          if (window.isHeaderTransparent) { this.header.classList.add(classes.headerTransparent); }
}
        }
 


        // Hide compact header when scroll back to top
        if (currentScrollTop < pageOffset && scrollUp) {
          document.body.classList.add(classes.hideHeader);
        } else {
          document.body.classList.remove(classes.hideHeader);
        }
      }
    },

    controlNav: function() {
      // Reset nav to normal state
      this.nav.classList.remove(classes.navCompress);

      // Subtract 50 from width to give space between the logo and links
      const gap = 20; // Gap between Logo and Nav links
      const isNavCentered = this.header.dataset.navAlignment === 'center';
      const isNavLeft = this.header.dataset.navAlignment === 'left';
      const headerWrapperStyles = this.headerWrapper.currentStyle || window.getComputedStyle(this.headerWrapper);
      const headerWidth = this.headerWrapper.clientWidth - parseFloat(headerWrapperStyles.paddingLeft) - parseFloat(headerWrapperStyles.paddingRight);
      const logoWidth = this.logo ? this.logo.offsetWidth : 0;
      const navIconsWidth = this.navIcons ? this.navIcons.offsetWidth : 0;
      let maxNavWidth = headerWidth - logoWidth - navIconsWidth - gap;
      let navItemsWidth = this.getNavItemsWidth();

      if (isNavCentered) {
        maxNavWidth = headerWidth - (Math.max(logoWidth, navIconsWidth) + gap) * 2;
      }

      if (isNavLeft) {
        maxNavWidth = (headerWidth - (logoWidth + gap * 2)) / 2;
      }

      if (navItemsWidth > maxNavWidth) {
        this.nav.classList.add(classes.navCompress);
      } else {
        this.nav.classList.remove(classes.navCompress);
      }
    },

    getNavItemsWidth: function() {
      // Reset nav items width
      let navItemsWidth = 0;
      const navItems = this.nav.querySelectorAll(selectors.navItem);

      if (navItems.length) {
        navItems.forEach((item) => {
          // Round up to be safe
          navItemsWidth += Math.ceil(item.offsetWidth);
        });
      }

      return navItemsWidth;
    },

    initMobileNav: function() {
      if (theme.settings.mobileMenuBehaviour === 'link') { return; }

      const navMobileLinks = this.headerSection.querySelectorAll(selectors.navLinkMobile);
      if (navMobileLinks.length) {
        navMobileLinks.forEach((link) => {
          link.addEventListener('click', (e) => {
            const hasDropdown = link.parentNode.querySelectorAll(selectors.mobileNavDropdownTrigger).length;
            const dropdownTrigger = link.nextElementSibling;

            if (hasDropdown) {
              e.preventDefault();
              dropdownTrigger.dispatchEvent(new Event('click'), {bubbles: true});
            }
          });
        });
      }
    },

    onUnload: function() {
      PaloAlto.Drawer.close();
      PaloAlto.Drawer.destroy();

      document.body.classList.remove(...classes.jsDrawerOpenAll);
      document.removeEventListener('theme:scroll', this.headerStateEvent);
      document.removeEventListener('theme:resize:width', this.controlNav);
      document.dispatchEvent(new CustomEvent('theme:scroll:unlock', {bubbles: true}));

      if (typeof window.cart.destroy === 'function') {
        window.cart.destroy();
      }
    },
  });

  return Header;
})();


$.ajaxSetup({ cache: false });

document.documentElement.style.setProperty('--scrollbar-width', `${getScrollbarWidth()}px`);

document.addEventListener('DOMContentLoaded', function() {
  PaloAlto.initSections();
  PaloAlto.initFocusVisibility();

  document.addEventListener('theme:resize:width', PaloAlto.setMainSpacing);

  // We need to check if hash tag is different than #! because slate.a11y throws an error in this case
  const hash = window.location.hash;
  const elementId = hash.substr(1, hash.length);
  const element = document.getElementById(elementId);

  if (element !== null) {
    slate.a11y.pageLinkFocus($(window.location.hash));
  }

  const skipLink = document.querySelector('.in-page-link');
  if (skipLink) {
    skipLink.addEventListener('click', function(evt) {
      slate.a11y.pageLinkFocus($(evt.currentTarget.hash));
    });
  }
});

PaloAlto.updateHash = function(hash) {
  window.location.hash = '#' + hash;
  $('#' + hash).attr('tabindex', -1).focus();
};

document.addEventListener('shopify:section:load', () => {
  window.dispatchEvent(new Event('resize'), {bubbles: true});
  preventOverflow(document);
});

if (typeof theme.settings.newHash !== 'undefined') {
  PaloAlto.updateHash(theme.settings.newHash);
}

// Global event listeners
scrollListener();

window.addEventListener('load', () => {
  preventOverflow(document);
  loadingAnimation();
});

function IsButtonVisible(){
  const el = document.querySelector(".product__submit__add");
  const elHolder = document.querySelector(".product-single__wrapper");
  let pageHolder = document.querySelector("html")
  if(elHolder){
      const observer = new window.IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        console.log('ENTER')
        if(!el.classList.contains("inScreen")){
          el.classList.add("inScreen");
          el.classList.remove("NotInScreen");
          pageHolder.classList.add("atc-inScreen");
          pageHolder.classList.remove("atc-NotInScreen");
        }
        return
      }else{
        console.log('LEAVE')
        if(!el.classList.contains("NotInScreen")){
          el.classList.add("NotInScreen");
          el.classList.remove("inScreen");
          pageHolder.classList.remove("atc-inScreen");
          pageHolder.classList.add("atc-NotInScreen");
        }
      }
    
    }, {
      root: null,
      threshold: 0.1, // set offset 0.1 means trigger if atleast 10% of element in viewport
    })
    observer.observe(elHolder);
  }
  
}
window.addEventListener("DOMContentLoaded", function(){
let priorityProcessings = document.querySelectorAll("#upsell-checkbox");

// On check of drawer priority checkbox
$(document).on('change', ".cart__foot #upsell-checkbox", function(){
  var upsellCheckbox = document.querySelector(".cart__foot #upsell-checkbox");
  var upSellID =  43945883369685;
  // Checking if Cart Has Priority Added
  let addedPriority = false;
  // Adding Priority to Cart
  if (upsellCheckbox.checked == true && addedPriority == false) {
    console.log("Upsell Offer Requested: "+upSellID);
    fetch(theme.routes.root + 'cart/add.js', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'quantity=1&id='+upSellID,
    }).then((response) => {
      console.log("After Adding Priority Processing");
      let cartResource = document.querySelector(".cart-drawer__items");
      document.querySelector('body').setAttribute("addedPriority", "true");
      console.log(customCart);
      customCart.getCart();
    })
    .catch((error) => console.log(error));
  }
});

// priorityProcessings.forEach(function(priorityProcessing){
//   console.log(priorityProcessing)
//   if(priorityProcessing){
//     priorityProcessing.addEventListener("change", function(){
//       console.log("priorityProcessing triggered");
//       var upSellID =  priorityProcessing.getAttribute('dataId');
//       // Checking if Cart Has Priority Added
//       let addedPriority = false;
//       // Adding Priority to Cart
//       if (priorityProcessing.checked == true && addedPriority == false) {
//         console.log("Upsell Offer Requested: "+upSellID);
//         fetch(theme.routes.root + 'cart/add.js', {
//           method: 'POST',
//           headers: {
//             'X-Requested-With': 'XMLHttpRequest',
//             'Content-Type': 'application/x-www-form-urlencoded',
//           },
//           body: 'quantity=1&id='+upSellID,
//         }).then((response) => {
//           console.log("After Adding Priority Processing");
//           let cartResource = document.querySelector(".cart-drawer__items");
//           document.querySelector('body').setAttribute("addedPriority", "true");
//         })
//         .catch((error) => console.log(error));
//       }
//     })
//   }
// })



jQuery.getJSON('/cart.js', function(cart) {
   // now have access to Shopify cart object
   console.log(cart.items.count)
    let cartResource = window.cart.cartDrawerBody;
    let cartItems = cart.items;
    let upSellID = 43945883369685;

    let upsellCheckboxes = document.querySelectorAll(".upsell-checkbox");
    for (let i = 0; i < cart.item_count; i++) {
        let cartItem = cart.items[i];
        let cartItemId = cartItem.id;
      
        // console.log(cartItem)
        // console.log({cartItemId, upSellID})   
        if(cartItemId == upSellID) {
          console.log("1");
          addedPriority = true;
          // upsellCheckboxes.forEach(function(upsellCheckbox){
          //   upsellCheckbox.setAttribute("addedPriority", "true");
          // })
          document.querySelector('body').setAttribute("addedPriority", "true");
          break;
        }else{
          console.log("2");
          addedPriority = false;
          // upsellCheckboxes.forEach(function(upsellCheckbox){
          //   upsellCheckbox.setAttribute("addedPriority", "false");
          // })
          document.querySelector('body').setAttribute("addedPriority", "false");
          break;
        }
    }
    
  })
} );
window.addEventListener("scroll", function(){
  IsButtonVisible();
})

$('.soldoutbtnn').click(function(){
$('.omnisend-form-641e1610653128bbaea28330-teaser').click(); 
});