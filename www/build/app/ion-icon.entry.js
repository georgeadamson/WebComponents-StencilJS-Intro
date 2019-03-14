const h = window.App.h;

let CACHED_MAP;
function getIconMap() {
    if (!CACHED_MAP) {
        const win = window;
        win.Ionicons = win.Ionicons || {};
        CACHED_MAP = win.Ionicons.map = win.Ionicons.map || new Map();
    }
    return CACHED_MAP;
}
function addIcons(icons) {
    const map = getIconMap();
    Object.keys(icons).forEach(name => {
        map.set(name, icons[name]);
    });
}
function getName(name, mode, ios, md) {
    mode = (mode || 'md').toLowerCase();
    mode = mode === 'ios' ? 'ios' : 'md';
    if (ios && mode === 'ios') {
        name = ios.toLowerCase();
    }
    else if (md && mode === 'md') {
        name = md.toLowerCase();
    }
    else if (name) {
        name = name.toLowerCase();
        if (!/^md-|^ios-|^logo-/.test(name)) {
            name = `${mode}-${name}`;
        }
    }
    if (typeof name !== 'string' || name.trim() === '') {
        return null;
    }
    const invalidChars = name.replace(/[a-z]|-|\d/gi, '');
    if (invalidChars !== '') {
        return null;
    }
    return name;
}
function getSrc(src) {
    if (typeof src === 'string') {
        src = src.trim();
        if (isSrc(src)) {
            return src;
        }
    }
    return null;
}
function isSrc(str) {
    return str.length > 0 && /(\/|\.)/.test(str);
}
function isValid(elm) {
    if (elm.nodeType === 1) {
        if (elm.nodeName.toLowerCase() === 'script') {
            return false;
        }
        for (let i = 0; i < elm.attributes.length; i++) {
            const val = elm.attributes[i].value;
            if (typeof val === 'string' && val.toLowerCase().indexOf('on') === 0) {
                return false;
            }
        }
        for (let i = 0; i < elm.childNodes.length; i++) {
            if (!isValid(elm.childNodes[i])) {
                return false;
            }
        }
    }
    return true;
}

class Icon {
    constructor() {
        this.isVisible = false;
        this.lazy = false;
    }
    componentWillLoad() {
        this.waitUntilVisible(this.el, "50px", () => {
            this.isVisible = true;
            this.loadIcon();
        });
    }
    componentDidUnload() {
        if (this.io) {
            this.io.disconnect();
            this.io = undefined;
        }
    }
    waitUntilVisible(el, rootMargin, cb) {
        if (this.lazy && this.win && this.win.IntersectionObserver) {
            const io = this.io = new this.win.IntersectionObserver((data) => {
                if (data[0].isIntersecting) {
                    io.disconnect();
                    this.io = undefined;
                    cb();
                }
            }, { rootMargin });
            io.observe(el);
        }
        else {
            cb();
        }
    }
    loadIcon() {
        if (!this.isServer && this.isVisible) {
            const url = this.getUrl();
            if (url) {
                getSvgContent(this.doc, url, "s-ion-icon")
                    .then(svgContent => this.svgContent = svgContent);
            }
            else {
                console.error("icon was not resolved");
            }
        }
        if (!this.ariaLabel) {
            const name = getName(this.getName(), this.mode, this.ios, this.md);
            if (name) {
                this.ariaLabel = name
                    .replace("ios-", "")
                    .replace("md-", "")
                    .replace(/\-/g, " ");
            }
        }
    }
    getName() {
        if (this.name !== undefined) {
            return this.name;
        }
        if (this.icon && !isSrc(this.icon)) {
            return this.icon;
        }
        return undefined;
    }
    getUrl() {
        let url = getSrc(this.src);
        if (url) {
            return url;
        }
        url = getName(this.getName(), this.mode, this.ios, this.md);
        if (url) {
            return this.getNamedUrl(url);
        }
        url = getSrc(this.icon);
        if (url) {
            return url;
        }
        return null;
    }
    getNamedUrl(name) {
        const url = getIconMap().get(name);
        if (url) {
            return url;
        }
        return `${this.resourcesUrl}svg/${name}.svg`;
    }
    hostData() {
        const flipRtl = this.flipRtl || (this.ariaLabel && this.ariaLabel.indexOf("arrow") > -1 && this.flipRtl !== false);
        return {
            "role": "img",
            class: Object.assign({}, createColorClasses(this.color), { [`icon-${this.size}`]: !!this.size, "flip-rtl": flipRtl && this.doc.dir === "rtl" })
        };
    }
    render() {
        if (!this.isServer && this.svgContent) {
            return h("div", { class: "icon-inner", innerHTML: this.svgContent });
        }
        return h("div", { class: "icon-inner" });
    }
    static get is() { return "ion-icon"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "ariaLabel": {
                "type": String,
                "attr": "aria-label",
                "reflectToAttr": true,
                "mutable": true
            },
            "color": {
                "type": String,
                "attr": "color"
            },
            "doc": {
                "context": "document"
            },
            "el": {
                "elementRef": true
            },
            "flipRtl": {
                "type": Boolean,
                "attr": "flip-rtl"
            },
            "icon": {
                "type": String,
                "attr": "icon",
                "watchCallbacks": ["loadIcon"]
            },
            "ios": {
                "type": String,
                "attr": "ios"
            },
            "isServer": {
                "context": "isServer"
            },
            "isVisible": {
                "state": true
            },
            "lazy": {
                "type": Boolean,
                "attr": "lazy"
            },
            "md": {
                "type": String,
                "attr": "md"
            },
            "mode": {
                "type": String,
                "attr": "mode"
            },
            "name": {
                "type": String,
                "attr": "name",
                "watchCallbacks": ["loadIcon"]
            },
            "resourcesUrl": {
                "context": "resourcesUrl"
            },
            "size": {
                "type": String,
                "attr": "size"
            },
            "src": {
                "type": String,
                "attr": "src",
                "watchCallbacks": ["loadIcon"]
            },
            "svgContent": {
                "state": true
            },
            "win": {
                "context": "window"
            }
        };
    }
    static get style() { return ":host {\n  display: inline-block;\n\n  width: 1em;\n  height: 1em;\n\n  contain: strict;\n\n  -webkit-box-sizing: content-box !important;\n\n  box-sizing: content-box !important;\n}\n\n.icon-inner,\nsvg {\n  display: block;\n\n  fill: currentColor;\n  stroke: currentColor;\n\n  height: 100%;\n  width: 100%;\n}\n\n\n/* Icon RTL\n * -----------------------------------------------------------\n */\n\n:host(.flip-rtl) .icon-inner {\n  -webkit-transform: scaleX(-1);\n  transform: scaleX(-1);\n}\n\n\n/* Icon Sizes\n * -----------------------------------------------------------\n */\n\n:host(.icon-small) {\n  font-size: 18px !important;\n}\n\n:host(.icon-large){\n  font-size: 32px !important;\n}\n\n\n/* Icon Colors\n * -----------------------------------------------------------\n */\n\n:host(.ion-color) {\n  color: var(--ion-color-base) !important;\n}\n\n:host(.ion-color-primary) {\n  --ion-color-base: var(--ion-color-primary, #3880ff);\n}\n\n:host(.ion-color-secondary) {\n  --ion-color-base: var(--ion-color-secondary, #0cd1e8);\n}\n\n:host(.ion-color-tertiary) {\n  --ion-color-base: var(--ion-color-tertiary, #f4a942);\n}\n\n:host(.ion-color-success) {\n  --ion-color-base: var(--ion-color-success, #10dc60);\n}\n\n:host(.ion-color-warning) {\n  --ion-color-base: var(--ion-color-warning, #ffce00);\n}\n\n:host(.ion-color-danger) {\n  --ion-color-base: var(--ion-color-danger, #f14141);\n}\n\n:host(.ion-color-light) {\n  --ion-color-base: var(--ion-color-light, #f4f5f8);\n}\n\n:host(.ion-color-medium) {\n  --ion-color-base: var(--ion-color-medium, #989aa2);\n}\n\n:host(.ion-color-dark) {\n  --ion-color-base: var(--ion-color-dark, #222428);\n}"; }
}
const requests = new Map();
function getSvgContent(doc, url, scopedId) {
    let req = requests.get(url);
    if (!req) {
        req = fetch(url, { cache: "force-cache" }).then(rsp => {
            if (isStatusValid(rsp.status)) {
                return rsp.text();
            }
            return Promise.resolve(null);
        }).then(svgContent => validateContent(doc, svgContent, scopedId));
        requests.set(url, req);
    }
    return req;
}
function isStatusValid(status) {
    return status <= 299;
}
function validateContent(document, svgContent, scopeId) {
    if (svgContent) {
        const frag = document.createDocumentFragment();
        const div = document.createElement("div");
        div.innerHTML = svgContent;
        frag.appendChild(div);
        for (let i = div.childNodes.length - 1; i >= 0; i--) {
            if (div.childNodes[i].nodeName.toLowerCase() !== "svg") {
                div.removeChild(div.childNodes[i]);
            }
        }
        const svgElm = div.firstElementChild;
        if (svgElm && svgElm.nodeName.toLowerCase() === "svg") {
            if (scopeId) {
                svgElm.setAttribute("class", scopeId);
            }
            if (isValid(svgElm)) {
                return div.innerHTML;
            }
        }
    }
    return "";
}
function createColorClasses(color) {
    return (color) ? {
        "ion-color": true,
        [`ion-color-${color}`]: true
    } : null;
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

export { Icon as IonIcon, RippleEffect as IonRippleEffect };
