const h = window.App.h;

class AppHome {
    render() {
        return [
            h("ion-header", null,
                h("ion-toolbar", { color: "primary" },
                    h("ion-title", null, "Home"))),
            h("ion-content", { padding: true },
                h("p", null,
                    "Welcome to the PWA Toolkit. You can use this starter to build entire apps with web components using Stencil and ionic/core! Check out the README for everything that comes in this starter out of the box and check out our docs on ",
                    h("a", { href: "https://stenciljs.com" }, "stenciljs.com"),
                    " to get started."),
                h("ion-button", { href: "/profile/ionic", expand: "block" }, "Profile page"))
        ];
    }
    static get is() { return "app-home"; }
    static get style() { return ""; }
}

function rIC(callback) {
    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(callback);
    }
    else {
        setTimeout(callback, 32);
    }
}
function hasShadowDom(el) {
    return !!el.shadowRoot && !!el.attachShadow;
}
function findItemLabel(componentEl) {
    const itemEl = componentEl.closest('ion-item');
    if (itemEl) {
        return itemEl.querySelector('ion-label');
    }
    return null;
}
function renderHiddenInput(always, container, name, value, disabled) {
    if (always || hasShadowDom(container)) {
        let input = container.querySelector('input.aux-input');
        if (!input) {
            input = container.ownerDocument.createElement('input');
            input.type = 'hidden';
            input.classList.add('aux-input');
            container.appendChild(input);
        }
        input.disabled = disabled;
        input.name = name;
        input.value = value || '';
    }
}
function clamp(min, n, max) {
    return Math.max(min, Math.min(n, max));
}
function assert(actual, reason) {
    if (!actual) {
        const message = 'ASSERT: ' + reason;
        console.error(message);
        debugger;
        throw new Error(message);
    }
}
function now(ev) {
    return ev.timeStamp || Date.now();
}
function pointerCoord(ev) {
    if (ev) {
        const changedTouches = ev.changedTouches;
        if (changedTouches && changedTouches.length > 0) {
            const touch = changedTouches[0];
            return { x: touch.clientX, y: touch.clientY };
        }
        if (ev.pageX !== undefined) {
            return { x: ev.pageX, y: ev.pageY };
        }
    }
    return { x: 0, y: 0 };
}
function isEndSide(win, side) {
    const isRTL = win.document.dir === 'rtl';
    switch (side) {
        case 'start': return isRTL;
        case 'end': return !isRTL;
        default:
            throw new Error(`"${side}" is not a valid value for [side]. Use "start" or "end" instead.`);
    }
}
function deferEvent(event) {
    return debounceEvent(event, 0);
}
function debounceEvent(event, wait) {
    const original = event._original || event;
    return {
        _original: event,
        emit: debounce(original.emit.bind(original), wait)
    };
}
function debounce(func, wait = 0) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(func, wait, ...args);
    };
}

function hostContext(selector, el) {
    return el.closest(selector) !== null;
}
function createColorClasses(color) {
    return (typeof color === 'string' && color.length > 0) ? {
        'ion-color': true,
        [`ion-color-${color}`]: true
    } : undefined;
}
function createThemedClasses(mode, name) {
    return {
        [name]: true,
        [`${name}-${mode}`]: mode !== undefined
    };
}
function getClassList(classes) {
    if (classes !== undefined) {
        const array = Array.isArray(classes) ? classes : classes.split(' ');
        return array
            .filter(c => c != null)
            .map(c => c.trim())
            .filter(c => c !== '');
    }
    return [];
}
function getClassMap(classes) {
    const map = {};
    getClassList(classes).forEach(c => map[c] = true);
    return map;
}
const SCHEME = /^[a-z][a-z0-9+\-.]*:/;
async function openURL(win, url, ev, direction) {
    if (url != null && url[0] !== '#' && !SCHEME.test(url)) {
        const router = win.document.querySelector('ion-router');
        if (router) {
            if (ev != null) {
                ev.preventDefault();
            }
            await router.componentOnReady();
            return router.push(url, direction);
        }
    }
    return false;
}

class Button {
    constructor() {
        this.inToolbar = false;
        this.buttonType = "button";
        this.disabled = false;
        this.routerDirection = "forward";
        this.strong = false;
        this.type = "button";
        this.onFocus = () => {
            this.ionFocus.emit();
        };
        this.onBlur = () => {
            this.ionBlur.emit();
        };
    }
    componentWillLoad() {
        this.inToolbar = !!this.el.closest("ion-buttons");
    }
    onClick(ev) {
        if (this.type === "button") {
            openURL(this.win, this.href, ev, this.routerDirection);
        }
        else if (hasShadowDom(this.el)) {
            const form = this.el.closest("form");
            if (form) {
                ev.preventDefault();
                const fakeButton = document.createElement("button");
                fakeButton.type = this.type;
                fakeButton.style.display = "none";
                form.appendChild(fakeButton);
                fakeButton.click();
                fakeButton.remove();
            }
        }
    }
    hostData() {
        const { buttonType, disabled, color, expand, shape, size, strong } = this;
        let fill = this.fill;
        if (fill === undefined) {
            fill = this.inToolbar ? "clear" : "solid";
        }
        return {
            "aria-disabled": disabled ? "true" : null,
            class: Object.assign({}, createColorClasses(color), { [buttonType]: true, [`${buttonType}-${expand}`]: expand !== undefined, [`${buttonType}-${size}`]: size !== undefined, [`${buttonType}-${shape}`]: shape !== undefined, [`${buttonType}-${fill}`]: true, [`${buttonType}-strong`]: strong, "button-disabled": disabled, "ion-activatable": true, "ion-focusable": true })
        };
    }
    render() {
        const TagType = this.href === undefined ? "button" : "a";
        const attrs = (TagType === "button")
            ? { type: this.type }
            : { href: this.href };
        return (h(TagType, Object.assign({}, attrs, { class: "button-native", disabled: this.disabled, onFocus: this.onFocus, onBlur: this.onBlur }), h("span", { class: "button-inner" }, h("slot", { name: "icon-only" }), h("slot", { name: "start" }), h("slot", null), h("slot", { name: "end" })), this.mode === "md" && h("ion-ripple-effect", { type: this.inToolbar ? "unbounded" : "bounded" })));
    }
    static get is() { return "ion-button"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "buttonType": {
                "type": String,
                "attr": "button-type",
                "mutable": true
            },
            "color": {
                "type": String,
                "attr": "color"
            },
            "disabled": {
                "type": Boolean,
                "attr": "disabled",
                "reflectToAttr": true
            },
            "el": {
                "elementRef": true
            },
            "expand": {
                "type": String,
                "attr": "expand",
                "reflectToAttr": true
            },
            "fill": {
                "type": String,
                "attr": "fill",
                "reflectToAttr": true,
                "mutable": true
            },
            "href": {
                "type": String,
                "attr": "href"
            },
            "mode": {
                "type": String,
                "attr": "mode"
            },
            "routerDirection": {
                "type": String,
                "attr": "router-direction"
            },
            "shape": {
                "type": String,
                "attr": "shape",
                "reflectToAttr": true
            },
            "size": {
                "type": String,
                "attr": "size",
                "reflectToAttr": true
            },
            "strong": {
                "type": Boolean,
                "attr": "strong"
            },
            "type": {
                "type": String,
                "attr": "type"
            },
            "win": {
                "context": "window"
            }
        };
    }
    static get events() {
        return [{
                "name": "ionFocus",
                "method": "ionFocus",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionBlur",
                "method": "ionBlur",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }];
    }
    static get listeners() {
        return [{
                "name": "click",
                "method": "onClick"
            }];
    }
    static get style() { return ":host {\n  /**\n   * \@prop --background: Background of the button\n   * \@prop --background-activated: Background of the button when activated\n   * \@prop --background-focused: Background of the button when focused\n   *\n   * \@prop --color: Text color of the button\n   * \@prop --color-activated: Text color of the button when activated\n   * \@prop --color-focused: Text color of the button when focused\n   *\n   * \@prop --transition: Transition of the button\n   *\n   * \@prop --border-radius: Border radius of the button\n   * \@prop --border-width: Border width of the button\n   * \@prop --border-style: Border style of the button\n   * \@prop --border-color: Border color of the button\n   *\n   * \@prop --ripple-color: Color of the button ripple effect\n   *\n   * \@prop --box-shadow: Box shadow of the button\n   * \@prop --opacity: Opacity of the button\n   *\n   * \@prop --padding-top: Padding top of the button\n   * \@prop --padding-end: Padding end of the button\n   * \@prop --padding-bottom: Padding bottom of the button\n   * \@prop --padding-start: Padding start of the button\n   */\n  --overflow: hidden;\n  --ripple-color: currentColor;\n  --border-width: initial;\n  --border-color: initial;\n  --border-style: initial;\n  --box-shadow: none;\n  display: inline-block;\n  width: auto;\n  color: var(--color);\n  font-family: var(--ion-font-family, inherit);\n  text-align: center;\n  text-decoration: none;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  vertical-align: top;\n  vertical-align: -webkit-baseline-middle;\n  pointer-events: auto;\n  -webkit-font-kerning: none;\n  font-kerning: none; }\n\n:host(.button-disabled) {\n  pointer-events: none; }\n\n:host(.button-disabled) .button-native {\n  cursor: default;\n  opacity: .5;\n  pointer-events: none; }\n\n:host(.button-solid) {\n  --background: var(--ion-color-primary, #3880ff);\n  --background-focused: var(--ion-color-primary-shade, #3171e0);\n  --color: var(--ion-color-primary-contrast, #fff);\n  --color-activated: var(--ion-color-primary-contrast, #fff);\n  --color-focused: var(--ion-color-primary-contrast, #fff); }\n\n:host(.button-solid.ion-color) .button-native {\n  background: var(--ion-color-base);\n  color: var(--ion-color-contrast); }\n\n:host(.button-solid.ion-color.ion-focused) .button-native {\n  background: var(--ion-color-shade); }\n\n:host(.button-outline) {\n  --border-color: var(--ion-color-primary, #3880ff);\n  --background: transparent;\n  --color: var(--ion-color-primary, #3880ff);\n  --color-focused: var(--ion-color-primary, #3880ff); }\n\n:host(.button-outline.ion-color) .button-native {\n  border-color: var(--ion-color-base);\n  background: transparent;\n  color: var(--ion-color-base); }\n\n:host(.button-outline.ion-focused.ion-color) .button-native {\n  background: rgba(var(--ion-color-base-rgb), 0.1);\n  color: var(--ion-color-base); }\n\n:host(.button-clear) {\n  --border-width: 0;\n  --background: transparent;\n  --color: var(--ion-color-primary, #3880ff); }\n\n:host(.button-clear.ion-color) .button-native {\n  background: transparent;\n  color: var(--ion-color-base); }\n\n:host(.button-clear.ion-focused.ion-color) .button-native {\n  background: rgba(var(--ion-color-base-rgb), 0.1);\n  color: var(--ion-color-base); }\n\n:host(.button-clear.activated.ion-color) .button-native {\n  background: transparent; }\n\n:host(.button-block) {\n  display: block; }\n\n:host(.button-block) .button-native {\n  margin-left: 0;\n  margin-right: 0;\n  display: block;\n  width: 100%;\n  clear: both;\n  contain: content; }\n\n:host(.button-block) .button-native::after {\n  clear: both; }\n\n:host(.button-full) {\n  display: block; }\n\n:host(.button-full) .button-native {\n  margin-left: 0;\n  margin-right: 0;\n  display: block;\n  width: 100%;\n  contain: content; }\n\n:host(.button-full:not(.button-round)) .button-native {\n  border-radius: 0;\n  border-right-width: 0;\n  border-left-width: 0; }\n\n.button-native {\n  border-radius: var(--border-radius);\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n  padding-left: var(--padding-start);\n  padding-right: var(--padding-end);\n  padding-top: var(--padding-top);\n  padding-bottom: var(--padding-bottom);\n  font-family: inherit;\n  font-size: inherit;\n  font-style: inherit;\n  font-weight: inherit;\n  letter-spacing: inherit;\n  text-decoration: inherit;\n  text-overflow: inherit;\n  text-transform: inherit;\n  text-align: inherit;\n  white-space: inherit;\n  color: inherit;\n  display: block;\n  position: relative;\n  width: 100%;\n  height: 100%;\n  -webkit-transition: var(--transition);\n  transition: var(--transition);\n  border-width: var(--border-width);\n  border-style: var(--border-style);\n  border-color: var(--border-color);\n  outline: none;\n  background: var(--background);\n  line-height: 1;\n  -webkit-box-shadow: var(--box-shadow);\n  box-shadow: var(--box-shadow);\n  contain: layout style;\n  cursor: pointer;\n  opacity: var(--opacity);\n  overflow: var(--overflow);\n  z-index: 0;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none; }\n  \@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n    .button-native {\n      padding-left: unset;\n      padding-right: unset;\n      -webkit-padding-start: var(--padding-start);\n      padding-inline-start: var(--padding-start);\n      -webkit-padding-end: var(--padding-end);\n      padding-inline-end: var(--padding-end); } }\n\n.button-native::-moz-focus-inner {\n  border: 0; }\n\n:host(.ion-focused) .button-native {\n  background: var(--background-focused);\n  color: var(--color-focused); }\n\n:host(.activated) .button-native {\n  background: var(--background-activated);\n  color: var(--color-activated); }\n\n.button-inner {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-flow: row nowrap;\n  flex-flow: row nowrap;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%; }\n\n::slotted(ion-icon) {\n  font-size: 1.4em;\n  pointer-events: none; }\n\n::slotted(ion-icon[slot=\"start\"]) {\n  margin-left: -0.3em;\n  margin-right: 0.3em;\n  margin-top: 0;\n  margin-bottom: 0; }\n  \@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n    ::slotted(ion-icon[slot=\"start\"]) {\n      margin-left: unset;\n      margin-right: unset;\n      -webkit-margin-start: -0.3em;\n      margin-inline-start: -0.3em;\n      -webkit-margin-end: 0.3em;\n      margin-inline-end: 0.3em; } }\n\n::slotted(ion-icon[slot=\"end\"]) {\n  margin-left: 0.3em;\n  margin-right: -0.2em;\n  margin-top: 0;\n  margin-bottom: 0; }\n  \@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n    ::slotted(ion-icon[slot=\"end\"]) {\n      margin-left: unset;\n      margin-right: unset;\n      -webkit-margin-start: 0.3em;\n      margin-inline-start: 0.3em;\n      -webkit-margin-end: -0.2em;\n      margin-inline-end: -0.2em; } }\n\n::slotted(ion-icon[slot=\"icon-only\"]) {\n  font-size: 1.8em; }\n\nion-ripple-effect {\n  color: var(--ripple-color); }\n\n:host {\n  --border-radius: 4px;\n  --padding-top: 0;\n  --padding-bottom: 0;\n  --padding-start: 1.1em;\n  --padding-end: 1.1em;\n  --transition: box-shadow 280ms cubic-bezier(.4, 0, .2, 1),\n                background-color 15ms linear,\n                color 15ms linear;\n  margin-left: 2px;\n  margin-right: 2px;\n  margin-top: 4px;\n  margin-bottom: 4px;\n  height: 36px;\n  font-size: 14px;\n  font-weight: 500;\n  letter-spacing: 0.06em;\n  text-transform: uppercase; }\n  \@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n    :host {\n      margin-left: unset;\n      margin-right: unset;\n      -webkit-margin-start: 2px;\n      margin-inline-start: 2px;\n      -webkit-margin-end: 2px;\n      margin-inline-end: 2px; } }\n\n:host(.button-solid) {\n  --background-activated: var(--background);\n  --box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12); }\n\n:host(.button-solid.activated) {\n  --box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12); }\n\n:host(.button-outline) {\n  --border-width: 2px;\n  --border-style: solid;\n  --box-shadow: none;\n  --background-activated: transparent;\n  --background-focused: rgba(var(--ion-color-primary-rgb, 56, 128, 255), 0.1);\n  --color-activated: var(--ion-color-primary, #3880ff); }\n\n:host(.button-outline.activated.ion-color) .button-native {\n  background: transparent; }\n\n:host(.button-clear) {\n  --opacity: 1;\n  --background-activated: transparent;\n  --background-focused: rgba(var(--ion-color-primary-rgb, 56, 128, 255), 0.1);\n  --color-activated: var(--ion-color-primary, #3880ff);\n  --color-focused: var(--ion-color-primary, #3880ff); }\n\n:host(.button-round) {\n  --border-radius: 64px;\n  --padding-top: 0;\n  --padding-start: 26px;\n  --padding-end: 26px;\n  --padding-bottom: 0; }\n\n:host(.button-large) {\n  --padding-top: 0;\n  --padding-start: 1em;\n  --padding-end: 1em;\n  --padding-bottom: 0;\n  height: 2.8em;\n  font-size: 20px; }\n\n:host(.button-small) {\n  --padding-top: 0;\n  --padding-start: 0.9em;\n  --padding-end: 0.9em;\n  --padding-bottom: 0;\n  height: 2.1em;\n  font-size: 13px; }\n\n:host(.button-strong) {\n  font-weight: bold; }\n\n::slotted(ion-icon[slot=\"icon-only\"]) {\n  padding-left: 0;\n  padding-right: 0;\n  padding-top: 0;\n  padding-bottom: 0; }\n\n\@media (any-hover: hover) {\n  :host(.button-outline:hover) .button-native {\n    background: rgba(var(--ion-color-primary-rgb, 56, 128, 255), 0.04); }\n  :host(.button-outline.ion-color:hover) .button-native {\n    background: rgba(var(--ion-color-base-rgb), 0.04); }\n  :host(.button-clear:hover) .button-native {\n    background: rgba(var(--ion-color-primary-rgb, 56, 128, 255), 0.04); }\n  :host(.button-clear.ion-color:hover) .button-native {\n    background: rgba(var(--ion-color-base-rgb), 0.04); } }"; }
    static get styleMode() { return "md"; }
}

const PLATFORMS_MAP = {
    'ipad': isIpad,
    'iphone': isIphone,
    'ios': isIOS,
    'android': isAndroid,
    'phablet': isPhablet,
    'tablet': isTablet,
    'cordova': isCordova,
    'capacitor': isCapacitorNative,
    'electron': isElectron,
    'pwa': isPWA,
    'mobile': isMobile,
    'desktop': isDesktop,
    'hybrid': isHybrid
};
function getPlatforms(win) {
    return setupPlatforms(win);
}
function isPlatform(win, platform) {
    return getPlatforms(win).includes(platform);
}
function setupPlatforms(win) {
    win.Ionic = win.Ionic || {};
    let platforms = win.Ionic.platforms;
    if (platforms == null) {
        platforms = win.Ionic.platforms = detectPlatforms(win);
        const classList = win.document.documentElement.classList;
        platforms.forEach(p => classList.add(`plt-${p}`));
    }
    return platforms;
}
function detectPlatforms(win) {
    return Object.keys(PLATFORMS_MAP).filter(p => PLATFORMS_MAP[p](win));
}
function isIpad(win) {
    return testUserAgent(win, /iPad/i);
}
function isIphone(win) {
    return testUserAgent(win, /iPhone/i);
}
function isIOS(win) {
    return testUserAgent(win, /iPad|iPhone|iPod/i);
}
function isAndroid(win) {
    return testUserAgent(win, /android|sink/i);
}
function isPhablet(win) {
    const width = win.innerWidth;
    const height = win.innerHeight;
    const smallest = Math.min(width, height);
    const largest = Math.max(width, height);
    return (smallest > 390 && smallest < 520) &&
        (largest > 620 && largest < 800);
}
function isTablet(win) {
    const width = win.innerWidth;
    const height = win.innerHeight;
    const smallest = Math.min(width, height);
    const largest = Math.max(width, height);
    return (smallest > 460 && smallest < 820) &&
        (largest > 780 && largest < 1400);
}
function isMobile(win) {
    return matchMedia(win, '(any-pointer:coarse)');
}
function isDesktop(win) {
    return !isMobile(win);
}
function isHybrid(win) {
    return isCordova(win) || isCapacitorNative(win);
}
function isCordova(window) {
    const win = window;
    return !!(win['cordova'] || win['phonegap'] || win['PhoneGap']);
}
function isCapacitorNative(window) {
    const win = window;
    const capacitor = win['Capacitor'];
    return !!(capacitor && capacitor.isNative);
}
function isElectron(win) {
    return testUserAgent(win, /electron/);
}
function isPWA(win) {
    return win.matchMedia('(display-mode: standalone)').matches;
}
function testUserAgent(win, expr) {
    return expr.test(win.navigator.userAgent);
}
function matchMedia(win, query) {
    return win.matchMedia(query).matches;
}

class Content {
    constructor() {
        this.isScrolling = false;
        this.lastScroll = 0;
        this.queued = false;
        this.cTop = -1;
        this.cBottom = -1;
        this.detail = {
            scrollTop: 0,
            scrollLeft: 0,
            type: "scroll",
            event: undefined,
            startX: 0,
            startY: 0,
            startTimeStamp: 0,
            currentX: 0,
            currentY: 0,
            velocityX: 0,
            velocityY: 0,
            deltaX: 0,
            deltaY: 0,
            timeStamp: 0,
            data: undefined,
            isScrolling: true,
        };
        this.fullscreen = false;
        this.scrollX = false;
        this.scrollY = true;
        this.scrollEvents = false;
    }
    componentWillLoad() {
        if (this.forceOverscroll === undefined) {
            this.forceOverscroll = this.mode === "ios" && isPlatform(this.win, "mobile");
        }
    }
    componentDidLoad() {
        this.resize();
    }
    componentDidUnload() {
        this.onScrollEnd();
    }
    onClick(ev) {
        if (this.isScrolling) {
            ev.preventDefault();
            ev.stopPropagation();
        }
    }
    resize() {
        if (this.fullscreen) {
            this.queue.read(this.readDimensions.bind(this));
        }
        else if (this.cTop !== 0 || this.cBottom !== 0) {
            this.cTop = this.cBottom = 0;
            this.el.forceUpdate();
        }
    }
    readDimensions() {
        const page = getPageElement(this.el);
        const top = Math.max(this.el.offsetTop, 0);
        const bottom = Math.max(page.offsetHeight - top - this.el.offsetHeight, 0);
        const dirty = top !== this.cTop || bottom !== this.cBottom;
        if (dirty) {
            this.cTop = top;
            this.cBottom = bottom;
            this.el.forceUpdate();
        }
    }
    onScroll(ev) {
        const timeStamp = Date.now();
        const shouldStart = !this.isScrolling;
        this.lastScroll = timeStamp;
        if (shouldStart) {
            this.onScrollStart();
        }
        if (!this.queued && this.scrollEvents) {
            this.queued = true;
            this.queue.read(ts => {
                this.queued = false;
                this.detail.event = ev;
                updateScrollDetail(this.detail, this.scrollEl, ts, shouldStart);
                this.ionScroll.emit(this.detail);
            });
        }
    }
    getScrollElement() {
        return Promise.resolve(this.scrollEl);
    }
    scrollToTop(duration = 0) {
        return this.scrollToPoint(undefined, 0, duration);
    }
    scrollToBottom(duration = 0) {
        const y = this.scrollEl.scrollHeight - this.scrollEl.clientHeight;
        return this.scrollToPoint(undefined, y, duration);
    }
    scrollByPoint(x, y, duration) {
        return this.scrollToPoint(x + this.scrollEl.scrollLeft, y + this.scrollEl.scrollTop, duration);
    }
    async scrollToPoint(x, y, duration = 0) {
        const el = this.scrollEl;
        if (duration < 32) {
            if (y != null) {
                el.scrollTop = y;
            }
            if (x != null) {
                el.scrollLeft = x;
            }
            return;
        }
        let resolve;
        let startTime = 0;
        const promise = new Promise(r => resolve = r);
        const fromY = el.scrollTop;
        const fromX = el.scrollLeft;
        const deltaY = y != null ? y - fromY : 0;
        const deltaX = x != null ? x - fromX : 0;
        const step = (timeStamp) => {
            const linearTime = Math.min(1, ((timeStamp - startTime) / duration)) - 1;
            const easedT = Math.pow(linearTime, 3) + 1;
            if (deltaY !== 0) {
                el.scrollTop = Math.floor((easedT * deltaY) + fromY);
            }
            if (deltaX !== 0) {
                el.scrollLeft = Math.floor((easedT * deltaX) + fromX);
            }
            if (easedT < 1) {
                requestAnimationFrame(step);
            }
            else {
                resolve();
            }
        };
        requestAnimationFrame(ts => {
            startTime = ts;
            step(ts);
        });
        return promise;
    }
    onScrollStart() {
        this.isScrolling = true;
        this.ionScrollStart.emit({
            isScrolling: true
        });
        if (this.watchDog) {
            clearInterval(this.watchDog);
        }
        this.watchDog = setInterval(() => {
            if (this.lastScroll < Date.now() - 120) {
                this.onScrollEnd();
            }
        }, 100);
    }
    onScrollEnd() {
        clearInterval(this.watchDog);
        this.watchDog = null;
        if (this.isScrolling) {
            this.isScrolling = false;
            this.ionScrollEnd.emit({
                isScrolling: false
            });
        }
    }
    hostData() {
        return {
            class: Object.assign({}, createColorClasses(this.color), { "content-sizing": hostContext("ion-popover", this.el), "overscroll": !!this.forceOverscroll }),
            style: {
                "--offset-top": `${this.cTop}px`,
                "--offset-bottom": `${this.cBottom}px`,
            }
        };
    }
    render() {
        const { scrollX, scrollY, forceOverscroll } = this;
        this.resize();
        return [
            h("div", { class: {
                    "inner-scroll": true,
                    "scroll-x": scrollX,
                    "scroll-y": scrollY,
                    "overscroll": (scrollX || scrollY) && !!forceOverscroll
                }, ref: el => this.scrollEl = el, onScroll: ev => this.onScroll(ev) }, h("slot", null)),
            h("slot", { name: "fixed" })
        ];
    }
    static get is() { return "ion-content"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "color": {
                "type": String,
                "attr": "color"
            },
            "config": {
                "context": "config"
            },
            "el": {
                "elementRef": true
            },
            "forceOverscroll": {
                "type": Boolean,
                "attr": "force-overscroll",
                "mutable": true
            },
            "fullscreen": {
                "type": Boolean,
                "attr": "fullscreen"
            },
            "getScrollElement": {
                "method": true
            },
            "queue": {
                "context": "queue"
            },
            "scrollByPoint": {
                "method": true
            },
            "scrollEvents": {
                "type": Boolean,
                "attr": "scroll-events"
            },
            "scrollToBottom": {
                "method": true
            },
            "scrollToPoint": {
                "method": true
            },
            "scrollToTop": {
                "method": true
            },
            "scrollX": {
                "type": Boolean,
                "attr": "scroll-x"
            },
            "scrollY": {
                "type": Boolean,
                "attr": "scroll-y"
            },
            "win": {
                "context": "window"
            }
        };
    }
    static get events() {
        return [{
                "name": "ionScrollStart",
                "method": "ionScrollStart",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionScroll",
                "method": "ionScroll",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionScrollEnd",
                "method": "ionScrollEnd",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }];
    }
    static get listeners() {
        return [{
                "name": "click",
                "method": "onClick",
                "capture": true
            }];
    }
    static get style() { return ":host {\n  /**\n   * \@prop --background: Background of the Content\n   * \@prop --color: Color of the Content\n   * \@prop --padding-top: Padding top of the Content\n   * \@prop --padding-bottom: Padding bottom of the Content\n   * \@prop --padding-start: Padding start of the Content\n   * \@prop --padding-end: Padding end of the Content\n   * \@prop --keyboard-offset: Keyboard offset of the Content\n   * \@prop --offset-top: Offset top of the Content\n   * \@prop --offset-bottom: Offset bottom of the Content\n   */\n  --background: var(--ion-background-color, #fff);\n  --color: var(--ion-text-color, #000);\n  --padding-top: 0px;\n  --padding-bottom: 0px;\n  --padding-start: 0px;\n  --padding-end: 0px;\n  --keyboard-offset: 0px;\n  --offset-top: 0px;\n  --offset-bottom: 0px;\n  --overflow: auto;\n  display: block;\n  position: relative;\n  -ms-flex: 1;\n  flex: 1;\n  width: 100%;\n  height: 100%;\n  /* stylelint-disable */\n  margin: 0 !important;\n  padding: 0 !important;\n  /* stylelint-enable */\n  font-family: var(--ion-font-family, inherit);\n  contain: size style; }\n\n:host(.ion-color) .inner-scroll {\n  background: var(--ion-color-base);\n  color: var(--ion-color-contrast); }\n\n:host(.outer-content) {\n  --background: var(--ion-color-step-50, #f2f2f2); }\n\n.inner-scroll {\n  left: 0px;\n  right: 0px;\n  top: calc(var(--offset-top) * -1);\n  bottom: calc(var(--offset-bottom) * -1);\n  padding-left: var(--padding-start);\n  padding-right: var(--padding-end);\n  padding-top: calc(var(--padding-top) + var(--offset-top));\n  padding-bottom: calc(var(--padding-bottom) + var(--keyboard-offset) + var(--offset-bottom));\n  position: absolute;\n  background: var(--background);\n  color: var(--color);\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  overflow: hidden; }\n  \@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n    .inner-scroll {\n      padding-left: unset;\n      padding-right: unset;\n      -webkit-padding-start: var(--padding-start);\n      padding-inline-start: var(--padding-start);\n      -webkit-padding-end: var(--padding-end);\n      padding-inline-end: var(--padding-end); } }\n\n.scroll-y,\n.scroll-x {\n  -webkit-overflow-scrolling: touch;\n  will-change: scroll-position;\n  -ms-scroll-chaining: none;\n  overscroll-behavior: contain; }\n\n.scroll-y {\n  -ms-touch-action: pan-y;\n  touch-action: pan-y;\n  overflow-y: var(--overflow); }\n\n.scroll-x {\n  -ms-touch-action: pan-x;\n  touch-action: pan-x;\n  overflow-x: var(--overflow); }\n\n.scroll-x.scroll-y {\n  -ms-touch-action: auto;\n  touch-action: auto; }\n\n.overscroll::before,\n.overscroll::after {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  content: \"\"; }\n\n.overscroll::before {\n  bottom: -1px; }\n\n.overscroll::after {\n  top: -1px; }\n\n:host(.content-sizing) {\n  contain: none; }\n\n:host(.content-sizing) .inner-scroll {\n  position: relative; }"; }
}
function getParentElement(el) {
    if (el.parentElement) {
        return el.parentElement;
    }
    if (el.parentNode && el.parentNode.host) {
        return el.parentNode.host;
    }
    return null;
}
function getPageElement(el) {
    const tabs = el.closest("ion-tabs");
    if (tabs) {
        return tabs;
    }
    const page = el.closest("ion-app,ion-page,.ion-page,page-inner");
    if (page) {
        return page;
    }
    return getParentElement(el);
}
function updateScrollDetail(detail, el, timestamp, shouldStart) {
    const prevX = detail.currentX;
    const prevY = detail.currentY;
    const prevT = detail.timeStamp;
    const currentX = el.scrollLeft;
    const currentY = el.scrollTop;
    if (shouldStart) {
        detail.startTimeStamp = timestamp;
        detail.startX = currentX;
        detail.startY = currentY;
        detail.velocityX = detail.velocityY = 0;
    }
    detail.timeStamp = timestamp;
    detail.currentX = detail.scrollLeft = currentX;
    detail.currentY = detail.scrollTop = currentY;
    detail.deltaX = currentX - detail.startX;
    detail.deltaY = currentY - detail.startY;
    const timeDelta = timestamp - prevT;
    if (timeDelta > 0 && timeDelta < 100) {
        const velocityX = (currentX - prevX) / timeDelta;
        const velocityY = (currentY - prevY) / timeDelta;
        detail.velocityX = velocityX * 0.7 + detail.velocityX * 0.3;
        detail.velocityY = velocityY * 0.7 + detail.velocityY * 0.3;
    }
}

class Header {
    constructor() {
        this.translucent = false;
    }
    hostData() {
        const themedClasses = createThemedClasses(this.mode, "header");
        const translucentClasses = this.translucent ? createThemedClasses(this.mode, "header-translucent") : null;
        return {
            class: Object.assign({}, themedClasses, translucentClasses)
        };
    }
    static get is() { return "ion-header"; }
    static get properties() {
        return {
            "mode": {
                "type": String,
                "attr": "mode"
            },
            "translucent": {
                "type": Boolean,
                "attr": "translucent"
            }
        };
    }
    static get style() { return "ion-header {\n  display: block;\n  position: relative;\n  -ms-flex-order: -1;\n  order: -1;\n  width: 100%;\n  z-index: 10; }\n\nion-header ion-toolbar:first-child {\n  padding-top: var(--ion-safe-area-top, 0); }\n\n.header-md::after {\n  left: 0;\n  bottom: -8px;\n  background-position: left 0 top 0;\n  position: absolute;\n  width: 100%;\n  height: 8px;\n  background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAIBAMAAAACWGKkAAAAFVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAASAQCkAAAAB3RSTlMFTEIzJBcOYhQUIwAAAB9JREFUCNdjEIQCBiUoYDCGAgYXKGAIhQKGNChgwAAAorMLKSCkL40AAAAASUVORK5CYII=\");\n  background-repeat: repeat-x;\n  content: \"\"; }\n  :host-context([dir=rtl]) .header-md::after {\n    right: 0; }\n  :host-context([dir=rtl]) .header-md::after {\n    background-position: right 0 top 0; }\n\n.header-md[no-border]::after {\n  display: none; }"; }
    static get styleMode() { return "md"; }
}

class RippleEffect {
    constructor() {
        this.type = "bounded";
    }
    async addRipple(pageX, pageY) {
        return new Promise(resolve => {
            this.queue.read(() => {
                const rect = this.el.getBoundingClientRect();
                const width = rect.width;
                const height = rect.height;
                const hypotenuse = Math.sqrt(width * width + height * height);
                const maxDim = Math.max(height, width);
                const maxRadius = this.unbounded ? maxDim : hypotenuse + PADDING;
                const initialSize = Math.floor(maxDim * INITIAL_ORIGIN_SCALE);
                const finalScale = maxRadius / initialSize;
                let posX = pageX - rect.left;
                let posY = pageY - rect.top;
                if (this.unbounded) {
                    posX = width * 0.5;
                    posY = height * 0.5;
                }
                const x = posX - initialSize * 0.5;
                const y = posY - initialSize * 0.5;
                const moveX = width * 0.5 - posX;
                const moveY = height * 0.5 - posY;
                this.queue.write(() => {
                    const div = this.win.document.createElement("div");
                    div.classList.add("ripple-effect");
                    const style = div.style;
                    style.top = y + "px";
                    style.left = x + "px";
                    style.width = style.height = initialSize + "px";
                    style.setProperty("--final-scale", `${finalScale}`);
                    style.setProperty("--translate-end", `${moveX}px, ${moveY}px`);
                    const container = this.el.shadowRoot || this.el;
                    container.appendChild(div);
                    setTimeout(() => {
                        resolve(() => {
                            removeRipple(div);
                        });
                    }, 225 + 100);
                });
            });
        });
    }
    get unbounded() {
        return this.type === "unbounded";
    }
    hostData() {
        return {
            role: "presentation",
            class: {
                "unbounded": this.unbounded
            }
        };
    }
    static get is() { return "ion-ripple-effect"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "addRipple": {
                "method": true
            },
            "el": {
                "elementRef": true
            },
            "queue": {
                "context": "queue"
            },
            "type": {
                "type": String,
                "attr": "type"
            },
            "win": {
                "context": "window"
            }
        };
    }
    static get style() { return ":host {\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  position: absolute;\n  contain: strict;\n  pointer-events: none; }\n\n:host(.unbounded) {\n  contain: layout size style; }\n\n.ripple-effect {\n  border-radius: 50%;\n  position: absolute;\n  background-color: currentColor;\n  color: inherit;\n  contain: strict;\n  opacity: 0;\n  -webkit-animation: 225ms rippleAnimation forwards, 75ms fadeInAnimation forwards;\n  animation: 225ms rippleAnimation forwards, 75ms fadeInAnimation forwards;\n  will-change: transform, opacity;\n  pointer-events: none; }\n\n.fade-out {\n  -webkit-transform: translate(var(--translate-end)) scale(var(--final-scale, 1));\n  transform: translate(var(--translate-end)) scale(var(--final-scale, 1));\n  -webkit-animation: 150ms fadeOutAnimation forwards;\n  animation: 150ms fadeOutAnimation forwards; }\n\n\@-webkit-keyframes rippleAnimation {\n  from {\n    -webkit-animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    -webkit-transform: scale(1);\n    transform: scale(1); }\n  to {\n    -webkit-transform: translate(var(--translate-end)) scale(var(--final-scale, 1));\n    transform: translate(var(--translate-end)) scale(var(--final-scale, 1)); } }\n\n\@keyframes rippleAnimation {\n  from {\n    -webkit-animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    -webkit-transform: scale(1);\n    transform: scale(1); }\n  to {\n    -webkit-transform: translate(var(--translate-end)) scale(var(--final-scale, 1));\n    transform: translate(var(--translate-end)) scale(var(--final-scale, 1)); } }\n\n\@-webkit-keyframes fadeInAnimation {\n  from {\n    -webkit-animation-timing-function: linear;\n    animation-timing-function: linear;\n    opacity: 0; }\n  to {\n    opacity: 0.16; } }\n\n\@keyframes fadeInAnimation {\n  from {\n    -webkit-animation-timing-function: linear;\n    animation-timing-function: linear;\n    opacity: 0; }\n  to {\n    opacity: 0.16; } }\n\n\@-webkit-keyframes fadeOutAnimation {\n  from {\n    -webkit-animation-timing-function: linear;\n    animation-timing-function: linear;\n    opacity: 0.16; }\n  to {\n    opacity: 0; } }\n\n\@keyframes fadeOutAnimation {\n  from {\n    -webkit-animation-timing-function: linear;\n    animation-timing-function: linear;\n    opacity: 0.16; }\n  to {\n    opacity: 0; } }"; }
}
function removeRipple(ripple) {
    ripple.classList.add("fade-out");
    setTimeout(() => {
        ripple.remove();
    }, 200);
}
const PADDING = 10;
const INITIAL_ORIGIN_SCALE = 0.5;

class ToolbarTitle {
    getMode() {
        const toolbar = this.el.closest("ion-toolbar");
        return (toolbar && toolbar.mode) || this.mode;
    }
    hostData() {
        const mode = this.getMode();
        return {
            class: Object.assign({}, createColorClasses(this.color), { [`title-${mode}`]: true })
        };
    }
    render() {
        return [
            h("div", { class: "toolbar-title" }, h("slot", null))
        ];
    }
    static get is() { return "ion-title"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "color": {
                "type": String,
                "attr": "color"
            },
            "el": {
                "elementRef": true
            }
        };
    }
    static get style() { return ":host {\n  /**\n   * \@prop --color: Text color of the title\n   */\n  --color: initial;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex: 1;\n  flex: 1;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-transform: translateZ(0);\n  transform: translateZ(0);\n  color: var(--color); }\n\n:host(.title-ios) {\n  left: 0;\n  top: 0;\n  padding-left: 90px;\n  padding-right: 90px;\n  padding-top: 0;\n  padding-bottom: 0;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  -webkit-transform: translateZ(0);\n  transform: translateZ(0);\n  font-size: 17px;\n  font-weight: 600;\n  letter-spacing: -.03em;\n  text-align: center;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  pointer-events: none; }\n  :host([dir=rtl].title-ios) {\n    right: 0; }\n  \@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n    :host(.title-ios) {\n      padding-left: unset;\n      padding-right: unset;\n      -webkit-padding-start: 90px;\n      padding-inline-start: 90px;\n      -webkit-padding-end: 90px;\n      padding-inline-end: 90px; } }\n\n:host(.title-md) {\n  padding-left: 12px;\n  padding-right: 12px;\n  padding-top: 0;\n  padding-bottom: 0;\n  font-size: 20px;\n  font-weight: 500; }\n  \@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n    :host(.title-md) {\n      padding-left: unset;\n      padding-right: unset;\n      -webkit-padding-start: 12px;\n      padding-inline-start: 12px;\n      -webkit-padding-end: 12px;\n      padding-inline-end: 12px; } }\n\n:host(.ion-color) {\n  color: var(--ion-color-base); }\n\n.toolbar-title {\n  display: block;\n  width: 100%;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  pointer-events: auto; }"; }
}

class Toolbar {
    constructor() {
        this.childrenStyles = new Map();
    }
    childrenStyle(ev) {
        ev.stopPropagation();
        const tagName = ev.target.tagName;
        const updatedStyles = ev.detail;
        const newStyles = {};
        const childStyles = this.childrenStyles.get(tagName) || {};
        let hasStyleChange = false;
        Object.keys(updatedStyles).forEach(key => {
            const childKey = `toolbar-${key}`;
            const newValue = updatedStyles[key];
            if (newValue !== childStyles[childKey]) {
                hasStyleChange = true;
            }
            if (newValue) {
                newStyles[childKey] = true;
            }
        });
        if (hasStyleChange) {
            this.childrenStyles.set(tagName, newStyles);
            this.el.forceUpdate();
        }
    }
    hostData() {
        const childStyles = {};
        this.childrenStyles.forEach(value => {
            Object.assign(childStyles, value);
        });
        return {
            class: Object.assign({}, childStyles, createColorClasses(this.color))
        };
    }
    render() {
        return [
            h("div", { class: "toolbar-background" }),
            h("div", { class: "toolbar-container" }, h("slot", { name: "start" }), h("slot", { name: "secondary" }), h("div", { class: "toolbar-content" }, h("slot", null)), h("slot", { name: "primary" }), h("slot", { name: "end" }))
        ];
    }
    static get is() { return "ion-toolbar"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "color": {
                "type": String,
                "attr": "color"
            },
            "config": {
                "context": "config"
            },
            "el": {
                "elementRef": true
            },
            "mode": {
                "type": String,
                "attr": "mode"
            }
        };
    }
    static get listeners() {
        return [{
                "name": "ionStyle",
                "method": "childrenStyle"
            }];
    }
    static get style() { return ":host {\n  /**\n   * \@prop --background: Background of the toolbar\n   * \@prop --border-color: Color of the toolbar border\n   * \@prop --border-style: Style of the toolbar border\n   * \@prop --border-width: Width of the toolbar border\n   * \@prop --color: Color of the toolbar text\n   * \@prop --min-height: Minimum height of the toolbar\n   * \@prop --opacity: Opacity of the toolbar background\n   * \@prop --padding-bottom: Bottom padding of the toolbar\n   * \@prop --padding-end: End padding of the toolbar\n   * \@prop --padding-start: Start padding of the toolbar\n   * \@prop --padding-top: Top padding of the toolbar\n   */\n  --border-width: 0;\n  --border-style: solid;\n  --opacity: 1;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  padding-left: var(--ion-safe-area-left);\n  padding-right: var(--ion-safe-area-right);\n  display: block;\n  position: relative;\n  width: 100%;\n  color: var(--color);\n  font-family: var(--ion-font-family, inherit);\n  contain: content;\n  z-index: 10;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n  \@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n    :host {\n      padding-left: unset;\n      padding-right: unset;\n      -webkit-padding-start: var(--ion-safe-area-left);\n      padding-inline-start: var(--ion-safe-area-left);\n      -webkit-padding-end: var(--ion-safe-area-right);\n      padding-inline-end: var(--ion-safe-area-right); } }\n\n:host(.ion-color) {\n  color: var(--ion-color-contrast); }\n\n:host(.ion-color) .toolbar-background {\n  background: var(--ion-color-base); }\n\n.toolbar-container {\n  padding-left: var(--padding-start);\n  padding-right: var(--padding-end);\n  padding-top: var(--padding-top);\n  padding-bottom: var(--padding-bottom);\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  width: 100%;\n  min-height: var(--min-height);\n  contain: content;\n  overflow: hidden;\n  z-index: 10;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n  \@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n    .toolbar-container {\n      padding-left: unset;\n      padding-right: unset;\n      -webkit-padding-start: var(--padding-start);\n      padding-inline-start: var(--padding-start);\n      -webkit-padding-end: var(--padding-end);\n      padding-inline-end: var(--padding-end); } }\n\n.toolbar-background {\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  position: absolute;\n  -webkit-transform: translateZ(0);\n  transform: translateZ(0);\n  border-width: var(--border-width);\n  border-style: var(--border-style);\n  border-color: var(--border-color);\n  background: var(--background);\n  contain: strict;\n  opacity: var(--opacity);\n  z-index: -1;\n  pointer-events: none; }\n\n:host(.toolbar-segment) {\n  --min-height: auto; }\n\n::slotted(ion-progress-bar) {\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute; }\n\n:host {\n  --background: var(--ion-toolbar-background, var(--ion-background-color, #fff));\n  --color: var(--ion-toolbar-color, var(--ion-text-color, #424242));\n  --border-color: var(--ion-toolbar-border-color, var(--ion-border-color, var(--ion-color-step-150, #c1c4cd)));\n  --padding-top: 4px;\n  --padding-bottom: 4px;\n  --padding-start: 4px;\n  --padding-end: 4px;\n  --min-height: 56px; }\n\n.toolbar-content {\n  -ms-flex: 1;\n  flex: 1;\n  -ms-flex-order: 3;\n  order: 3;\n  min-width: 0;\n  max-width: 100%; }\n\n:host(.toolbar-segment) {\n  --padding-top: 0;\n  --padding-bottom: 0;\n  --padding-start: 0;\n  --padding-end: 0; }\n\n::slotted([slot=\"start\"]) {\n  -ms-flex-order: 2;\n  order: 2; }\n\n::slotted([slot=\"secondary\"]) {\n  -ms-flex-order: 4;\n  order: 4; }\n\n::slotted([slot=\"primary\"]) {\n  -ms-flex-order: 5;\n  order: 5;\n  text-align: end; }\n\n::slotted([slot=\"end\"]) {\n  -ms-flex-order: 6;\n  order: 6;\n  text-align: end; }"; }
    static get styleMode() { return "md"; }
}

export { AppHome, Button as IonButton, Content as IonContent, Header as IonHeader, RippleEffect as IonRippleEffect, ToolbarTitle as IonTitle, Toolbar as IonToolbar };
