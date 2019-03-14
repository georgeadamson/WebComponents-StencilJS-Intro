const h = window.App.h;

import { b as findItemLabel, c as renderHiddenInput } from './chunk-5a5b5816.js';
import { a as openURL, b as createColorClasses, c as hostContext } from './chunk-7c632336.js';

function sayHello() {
    return Math.random() < 0.5 ? 'Hello' : 'Hola';
}

class AppProfile {
    constructor() {
        this.state = false;
    }
    formattedName() {
        if (this.name) {
            return this.name.substr(0, 1).toUpperCase() + this.name.substr(1).toLowerCase();
        }
        return '';
    }
    render() {
        return [
            h("ion-header", null,
                h("ion-toolbar", { color: "primary" },
                    h("ion-buttons", { slot: "start" },
                        h("ion-back-button", { defaultHref: "/" })),
                    h("ion-title", null,
                        "Profile: ",
                        this.name))),
            h("ion-content", { padding: true },
                h("p", null,
                    sayHello(),
                    "! My name is ",
                    this.formattedName(),
                    ". My name was passed in through a route param!"),
                h("ion-item", null,
                    h("ion-label", null,
                        "Setting (",
                        this.state.toString(),
                        ")"),
                    h("ion-toggle", { checked: this.state, onIonChange: ev => (this.state = ev.detail.checked) })))
        ];
    }
    static get is() { return "app-profile"; }
    static get properties() { return {
        "name": {
            "type": String,
            "attr": "name"
        },
        "state": {
            "state": true
        }
    }; }
    static get style() { return ""; }
}

class BackButton {
    async onClick(ev) {
        const nav = this.el.closest("ion-nav");
        ev.preventDefault();
        if (nav && await nav.canGoBack()) {
            return nav.pop({ skipIfBusy: true });
        }
        return openURL(this.win, this.defaultHref, ev, "back");
    }
    hostData() {
        const showBackButton = this.defaultHref !== undefined;
        return {
            class: Object.assign({}, createColorClasses(this.color), { "button": true, "ion-activatable": true, "show-back-button": showBackButton })
        };
    }
    render() {
        const defaultBackButtonText = this.mode === "ios" ? "Back" : null;
        const backButtonIcon = this.icon != null ? this.icon : this.config.get("backButtonIcon", "arrow-back");
        const backButtonText = this.text != null ? this.text : this.config.get("backButtonText", defaultBackButtonText);
        return (h("button", { type: "button", class: "button-native" }, h("span", { class: "button-inner" }, backButtonIcon && h("ion-icon", { icon: backButtonIcon, lazy: false }), backButtonText && h("span", { class: "button-text" }, backButtonText)), this.mode === "md" && h("ion-ripple-effect", { type: "unbounded" })));
    }
    static get is() { return "ion-back-button"; }
    static get encapsulation() { return "scoped"; }
    static get properties() {
        return {
            "color": {
                "type": String,
                "attr": "color"
            },
            "config": {
                "context": "config"
            },
            "defaultHref": {
                "type": String,
                "attr": "default-href"
            },
            "el": {
                "elementRef": true
            },
            "icon": {
                "type": String,
                "attr": "icon"
            },
            "mode": {
                "type": String,
                "attr": "mode"
            },
            "text": {
                "type": String,
                "attr": "text"
            },
            "win": {
                "context": "window"
            }
        };
    }
    static get listeners() {
        return [{
                "name": "click",
                "method": "onClick"
            }];
    }
    static get style() { return ".sc-ion-back-button-md-h {\n  \n  --background: transparent;\n  --ripple-color: currentColor;\n  --transition: background-color, opacity 100ms linear;\n  --opacity: 1;\n  display: none;\n  color: var(--color);\n  font-family: var(--ion-font-family, inherit);\n  text-align: center;\n  text-decoration: none;\n  text-overflow: ellipsis;\n  text-transform: none;\n  white-space: nowrap;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -webkit-font-kerning: none;\n  font-kerning: none; }\n\n.ion-color.sc-ion-back-button-md-h   .button-native.sc-ion-back-button-md {\n  color: var(--ion-color-base); }\n\n.activated.sc-ion-back-button-md-h   .button-native.sc-ion-back-button-md {\n  opacity: .4; }\n\n.can-go-back.sc-ion-back-button-md-h    > ion-header.sc-ion-back-button-md, .can-go-back    > ion-header   .sc-ion-back-button-md-h, .show-back-button.sc-ion-back-button-md-h {\n  display: block; }\n\n.button-native.sc-ion-back-button-md {\n  border-radius: var(--border-radius);\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  margin-left: var(--margin-start);\n  margin-right: var(--margin-end);\n  margin-top: var(--margin-top);\n  margin-bottom: var(--margin-bottom);\n  padding-left: var(--padding-start);\n  padding-right: var(--padding-end);\n  padding-top: var(--padding-top);\n  padding-bottom: var(--padding-bottom);\n  font-family: inherit;\n  font-size: inherit;\n  font-style: inherit;\n  font-weight: inherit;\n  letter-spacing: inherit;\n  text-decoration: inherit;\n  text-overflow: inherit;\n  text-transform: inherit;\n  text-align: inherit;\n  white-space: inherit;\n  color: inherit;\n  display: block;\n  position: relative;\n  min-width: var(--min-width);\n  min-height: var(--min-height);\n  -webkit-transition: var(--transition);\n  transition: var(--transition);\n  border: 0;\n  outline: none;\n  background: var(--background);\n  line-height: 1;\n  cursor: pointer;\n  opacity: var(--opacity);\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  z-index: 0;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none; }\n  \@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n    .button-native.sc-ion-back-button-md {\n      margin-left: unset;\n      margin-right: unset;\n      -webkit-margin-start: var(--margin-start);\n      margin-inline-start: var(--margin-start);\n      -webkit-margin-end: var(--margin-end);\n      margin-inline-end: var(--margin-end); } }\n  \@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n    .button-native.sc-ion-back-button-md {\n      padding-left: unset;\n      padding-right: unset;\n      -webkit-padding-start: var(--padding-start);\n      padding-inline-start: var(--padding-start);\n      -webkit-padding-end: var(--padding-end);\n      padding-inline-end: var(--padding-end); } }\n\n.button-inner.sc-ion-back-button-md {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-flow: row nowrap;\n  flex-flow: row nowrap;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%; }\n\nion-icon.sc-ion-back-button-md {\n  padding-left: var(--icon-padding-start);\n  padding-right: var(--icon-padding-end);\n  padding-top: var(--icon-padding-top);\n  padding-bottom: var(--icon-padding-bottom);\n  margin-left: var(--icon-margin-start);\n  margin-right: var(--icon-margin-end);\n  margin-top: var(--icon-margin-top);\n  margin-bottom: var(--icon-margin-bottom);\n  display: inherit;\n  font-size: var(--icon-font-size);\n  font-weight: var(--icon-font-weight);\n  pointer-events: none; }\n  \@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n    ion-icon.sc-ion-back-button-md {\n      padding-left: unset;\n      padding-right: unset;\n      -webkit-padding-start: var(--icon-padding-start);\n      padding-inline-start: var(--icon-padding-start);\n      -webkit-padding-end: var(--icon-padding-end);\n      padding-inline-end: var(--icon-padding-end); } }\n  \@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n    ion-icon.sc-ion-back-button-md {\n      margin-left: unset;\n      margin-right: unset;\n      -webkit-margin-start: var(--icon-margin-start);\n      margin-inline-start: var(--icon-margin-start);\n      -webkit-margin-end: var(--icon-margin-end);\n      margin-inline-end: var(--icon-margin-end); } }\n\n.sc-ion-back-button-md-h {\n  --color: currentColor;\n  --margin-top: 1px;\n  --margin-end: 6px;\n  --margin-bottom: 0;\n  --margin-start: 0;\n  --padding-top: 0;\n  --padding-end: 5px;\n  --padding-bottom: 0;\n  --padding-start: 5px;\n  --min-height: 32px;\n  --min-width: 44px;\n  --icon-padding-end: .3em;\n  --icon-padding-start: .3em;\n  --icon-margin-top: 0;\n  --icon-margin-end: 6px;\n  --icon-margin-bottom: 0;\n  --icon-margin-start: 6px;\n  --icon-font-size: 24px;\n  --icon-font-weight: normal;\n  font-size: 14px;\n  font-weight: 500;\n  text-transform: uppercase; }\n\n.button-native.sc-ion-back-button-md {\n  -webkit-box-shadow: none;\n  box-shadow: none; }\n\nion-icon.sc-ion-back-button-md {\n  line-height: .67;\n  text-align: start; }"; }
    static get styleMode() { return "md"; }
}

class Buttons {
    static get is() { return "ion-buttons"; }
    static get encapsulation() { return "scoped"; }
    static get style() { return ".sc-ion-buttons-md-h {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-transform: translateZ(0);\n  transform: translateZ(0);\n  z-index: 99; }\n\n.sc-ion-buttons-md-s  ion-button  {\n  --padding-top: 0;\n  --padding-bottom: 0;\n  --padding-start: 0;\n  --padding-end: 0;\n  --box-shadow: none;\n  --overflow: visible;\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n  margin-left: 2px;\n  margin-right: 2px; }\n  \@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n    .sc-ion-buttons-md-s  ion-button  {\n      margin-left: unset;\n      margin-right: unset;\n      -webkit-margin-start: 2px;\n      margin-inline-start: 2px;\n      -webkit-margin-end: 2px;\n      margin-inline-end: 2px; } }\n\n.sc-ion-buttons-md-s  ion-button  {\n  --padding-top: 0;\n  --padding-bottom: 0;\n  --padding-start: 8px;\n  --padding-end: 8px;\n  --box-shadow: none;\n  height: 32px;\n  font-size: 14px;\n  font-weight: 500; }\n\n.sc-ion-buttons-md-s  ion-button:not(.button-round)  {\n  --border-radius: 2px; }\n\n.sc-ion-buttons-md-h.ion-color.sc-ion-buttons-md-s  .button , .ion-color .sc-ion-buttons-md-h.sc-ion-buttons-md-s  .button  {\n  --color: initial;\n  --color-activated: initial;\n  --color-focused: initial;\n  --background-focused: rgba(var(--ion-color-primary-contrast-rgb, 255, 255, 255), 0.1); }\n\n.sc-ion-buttons-md-s  .button-solid  {\n  --color: var(--ion-toolbar-background, var(--ion-background-color, #fff));\n  --color-activated: var(--ion-toolbar-background, var(--ion-background-color, #fff));\n  --background: var(--ion-toolbar-color, var(--ion-text-color, #424242));\n  --background-activated: var(--ion-toolbar-color, var(--ion-text-color, #424242)); }\n\n.sc-ion-buttons-md-s  .button-outline  {\n  --color: initial;\n  --color-activated: currentColor;\n  --background: transparent;\n  --background-activated: transparent;\n  --border-color: currentColor; }\n\n.sc-ion-buttons-md-s  .button-clear  {\n  --color: initial;\n  --color-activated: currentColor;\n  --background: transparent; }\n\n.sc-ion-buttons-md-s  ion-icon[slot=\"start\"]  {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n  margin-right: 0.3em;\n  font-size: 1.4em; }\n  \@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n    .sc-ion-buttons-md-s  ion-icon[slot=\"start\"]  {\n      margin-right: unset;\n      -webkit-margin-end: 0.3em;\n      margin-inline-end: 0.3em; } }\n\n.sc-ion-buttons-md-s  ion-icon[slot=\"end\"]  {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n  margin-left: 0.4em;\n  font-size: 1.4em; }\n  \@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n    .sc-ion-buttons-md-s  ion-icon[slot=\"end\"]  {\n      margin-left: unset;\n      -webkit-margin-start: 0.4em;\n      margin-inline-start: 0.4em; } }\n\n.sc-ion-buttons-md-s  ion-icon[slot=\"icon-only\"]  {\n  padding-left: 0;\n  padding-right: 0;\n  padding-top: 0;\n  padding-bottom: 0;\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n  font-size: 1.8em; }"; }
    static get styleMode() { return "md"; }
}

class Item {
    constructor() {
        this.itemStyles = new Map();
        this.multipleInputs = false;
        this.button = false;
        this.detailIcon = "ios-arrow-forward";
        this.disabled = false;
        this.routerDirection = "forward";
        this.type = "button";
    }
    itemStyle(ev) {
        ev.stopPropagation();
        const tagName = ev.target.tagName;
        const updatedStyles = ev.detail;
        const newStyles = {};
        const childStyles = this.itemStyles.get(tagName) || {};
        let hasStyleChange = false;
        Object.keys(updatedStyles).forEach(key => {
            const itemKey = `item-${key}`;
            const newValue = updatedStyles[key];
            if (newValue !== childStyles[itemKey]) {
                hasStyleChange = true;
            }
            if (newValue) {
                newStyles[itemKey] = true;
            }
        });
        if (hasStyleChange) {
            this.itemStyles.set(tagName, newStyles);
            this.el.forceUpdate();
        }
    }
    componentDidLoad() {
        Array.from(this.el.querySelectorAll("ion-button")).forEach(button => {
            if (button.size === undefined) {
                button.size = "small";
            }
        });
        const inputs = this.el.querySelectorAll("ion-select, ion-datetime");
        this.multipleInputs = inputs.length > 1 ? true : false;
    }
    isClickable() {
        return (this.href !== undefined || this.button);
    }
    hostData() {
        const childStyles = {};
        this.itemStyles.forEach(value => {
            Object.assign(childStyles, value);
        });
        return {
            "aria-disabled": this.disabled ? "true" : null,
            class: Object.assign({}, childStyles, createColorClasses(this.color), { [`item-lines-${this.lines}`]: this.lines !== undefined, "item-disabled": this.disabled, "in-list": hostContext("ion-list", this.el), "item": true, "item-multiple-inputs": this.multipleInputs, "ion-activatable": this.isClickable(), "ion-focusable": true })
        };
    }
    render() {
        const { href, detail, mode, win, detailIcon, routerDirection, type } = this;
        const clickable = this.isClickable();
        const TagType = clickable ? (href === undefined ? "button" : "a") : "div";
        const attrs = TagType === "button" ? { type } : { href };
        const showDetail = detail !== undefined ? detail : mode === "ios" && clickable;
        return [
            h(TagType, Object.assign({}, attrs, { class: "item-native", disabled: this.disabled, onClick: (ev) => openURL(win, href, ev, routerDirection) }), h("slot", { name: "start" }), h("div", { class: "item-inner" }, h("div", { class: "input-wrapper" }, h("slot", null)), h("slot", { name: "end" }), showDetail && h("ion-icon", { icon: detailIcon, lazy: false, class: "item-detail-icon" }), h("div", { class: "item-inner-highlight" })), clickable && mode === "md" && h("ion-ripple-effect", null)),
            h("div", { class: "item-highlight" })
        ];
    }
    static get is() { return "ion-item"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "button": {
                "type": Boolean,
                "attr": "button"
            },
            "color": {
                "type": String,
                "attr": "color"
            },
            "detail": {
                "type": Boolean,
                "attr": "detail"
            },
            "detailIcon": {
                "type": String,
                "attr": "detail-icon"
            },
            "disabled": {
                "type": Boolean,
                "attr": "disabled"
            },
            "el": {
                "elementRef": true
            },
            "href": {
                "type": String,
                "attr": "href"
            },
            "lines": {
                "type": String,
                "attr": "lines"
            },
            "mode": {
                "type": String,
                "attr": "mode"
            },
            "multipleInputs": {
                "state": true
            },
            "routerDirection": {
                "type": String,
                "attr": "router-direction"
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
    static get listeners() {
        return [{
                "name": "ionStyle",
                "method": "itemStyle"
            }];
    }
    static get style() { return ":host {\n  /**\n   * \@prop --background: Background of the item\n   * \@prop --background-activated: Background of the activated item\n   * \@prop --border-color: Color of the item border\n   * \@prop --border-radius: Radius of the item border\n   * \@prop --border-style: Style of the item border\n   * \@prop --border-width: Width of the item border\n   * \@prop --box-shadow: Box shadow of the item\n   * \@prop --color: Color of the item\n   *\n   * \@prop --detail-icon-color: Color of the item detail icon\n   * \@prop --detail-icon-opacity: Opacity of the item detail icon\n   * \@prop --detail-icon-font-size: Font size of the item detail icon\n   * \@prop --inner-border-width: Width of the item inner border\n   * \@prop --inner-box-shadow: Box shadow of the item inner\n   * \@prop --inner-padding-bottom: Bottom padding of the item inner\n   * \@prop --inner-padding-end: End padding of the item inner\n   * \@prop --inner-padding-start: Start padding of the item inner\n   * \@prop --inner-padding-top: Top padding of the item inner\n   *\n   * \@prop --min-height: Minimum height of the item\n   * \@prop --padding-bottom: Bottom padding of the item\n   * \@prop --padding-end: End padding of the item\n   * \@prop --padding-start: Start padding of the item\n   * \@prop --padding-top: Top padding of the item\n   * \@prop --transition: Transition of the item\n   *\n   * \@prop --highlight-height: The height of the highlight on the item\n   * \@prop --highlight-color-focused: The color of the highlight on the item when focused\n   * \@prop --highlight-color-valid: The color of the highlight on the item when valid\n   * \@prop --highlight-color-invalid: The color of the highlight on the item when invalid\n   */\n  --border-radius: 0px;\n  --border-width: 0px;\n  --border-style: solid;\n  --padding-top: 0px;\n  --padding-bottom: 0px;\n  --padding-end: 0px;\n  --padding-start: 0px;\n  --box-shadow: none;\n  --inner-border-width: 0px;\n  --inner-padding-top: 0px;\n  --inner-padding-bottom: 0px;\n  --inner-padding-start: 0px;\n  --inner-padding-end: 0px;\n  --inner-box-shadow: none;\n  --show-full-highlight: 0;\n  --show-inset-highlight: 0;\n  --detail-icon-color: initial;\n  --detail-icon-font-size: 20px;\n  --detail-icon-opacity: 0.25;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  display: block;\n  position: relative;\n  outline: none;\n  color: var(--color);\n  font-family: var(--ion-font-family, inherit);\n  text-align: initial;\n  text-decoration: none;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n:host(.ion-color) .item-native {\n  background: var(--ion-color-base);\n  color: var(--ion-color-contrast); }\n\n:host(.ion-color) .item-native,\n:host(.ion-color) .item-inner {\n  border-color: var(--ion-color-shade); }\n\n:host(.ion-focused) .item-native {\n  background: var(--background-focused); }\n\n:host(.activated) .item-native {\n  background: var(--background-activated); }\n\n:host(.ion-color.activated) .item-native {\n  background: var(--ion-color-tint); }\n\n:host(.item-disabled) {\n  cursor: default;\n  opacity: .3;\n  pointer-events: none; }\n\n.item-native {\n  border-radius: var(--border-radius);\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n  padding-left: calc(var(--padding-start) + var(--ion-safe-area-left, 0px));\n  padding-right: var(--padding-end);\n  padding-top: var(--padding-top);\n  padding-bottom: var(--padding-bottom);\n  font-family: inherit;\n  font-size: inherit;\n  font-style: inherit;\n  font-weight: inherit;\n  letter-spacing: inherit;\n  text-decoration: inherit;\n  text-overflow: inherit;\n  text-transform: inherit;\n  text-align: inherit;\n  white-space: inherit;\n  color: inherit;\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  width: 100%;\n  min-height: var(--min-height);\n  -webkit-transition: var(--transition);\n  transition: var(--transition);\n  border-width: var(--border-width);\n  border-style: var(--border-style);\n  border-color: var(--border-color);\n  outline: none;\n  background: var(--background);\n  -webkit-box-shadow: var(--box-shadow);\n  box-shadow: var(--box-shadow);\n  overflow: hidden;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n  \@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n    .item-native {\n      padding-left: unset;\n      padding-right: unset;\n      -webkit-padding-start: calc(var(--padding-start) + var(--ion-safe-area-left, 0px));\n      padding-inline-start: calc(var(--padding-start) + var(--ion-safe-area-left, 0px));\n      -webkit-padding-end: var(--padding-end);\n      padding-inline-end: var(--padding-end); } }\n\n.item-native::-moz-focus-inner {\n  border: 0; }\n\nbutton, a {\n  cursor: pointer;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -webkit-user-drag: none; }\n\n.item-inner {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n  padding-left: var(--inner-padding-start);\n  padding-right: calc(var(--ion-safe-area-right, 0px) + var(--inner-padding-end));\n  padding-top: var(--inner-padding-top);\n  padding-bottom: var(--inner-padding-bottom);\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex: 1;\n  flex: 1;\n  -ms-flex-direction: inherit;\n  flex-direction: inherit;\n  -ms-flex-align: inherit;\n  align-items: inherit;\n  -ms-flex-item-align: stretch;\n  align-self: stretch;\n  min-height: inherit;\n  border-width: var(--inner-border-width);\n  border-style: var(--border-style);\n  border-color: var(--border-color);\n  -webkit-box-shadow: var(--inner-box-shadow);\n  box-shadow: var(--inner-box-shadow);\n  overflow: hidden;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n  \@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n    .item-inner {\n      padding-left: unset;\n      padding-right: unset;\n      -webkit-padding-start: var(--inner-padding-start);\n      padding-inline-start: var(--inner-padding-start);\n      -webkit-padding-end: calc(var(--ion-safe-area-right, 0px) + var(--inner-padding-end));\n      padding-inline-end: calc(var(--ion-safe-area-right, 0px) + var(--inner-padding-end)); } }\n\n.item-detail-icon {\n  color: var(--detail-icon-color);\n  font-size: var(--detail-icon-font-size);\n  opacity: var(--detail-icon-opacity); }\n\n::slotted(ion-icon) {\n  font-size: 1.6em; }\n\n::slotted(ion-button) {\n  --margin-top: 0;\n  --margin-bottom: 0;\n  --margin-start: 0;\n  --margin-end: 0;\n  z-index: 1; }\n\n::slotted(ion-label) {\n  -ms-flex: 1;\n  flex: 1; }\n\n:host([vertical-align-top]),\n:host(.item-input) {\n  -ms-flex-align: start;\n  align-items: flex-start; }\n\n.input-wrapper {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex: 1;\n  flex: 1;\n  -ms-flex-direction: inherit;\n  flex-direction: inherit;\n  -ms-flex-align: inherit;\n  align-items: inherit;\n  -ms-flex-item-align: stretch;\n  align-self: stretch;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n:host(.item-label-stacked) .input-wrapper,\n:host(.item-label-floating) .input-wrapper {\n  -ms-flex: 1;\n  flex: 1;\n  -ms-flex-direction: column;\n  flex-direction: column; }\n\n.item-highlight,\n.item-inner-highlight {\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  background: var(--highlight-background); }\n\n.item-highlight {\n  height: var(--full-highlight-height); }\n\n.item-inner-highlight {\n  height: var(--inset-highlight-height); }\n\n:host(.item-interactive.item-has-focus),\n:host(.item-interactive.ion-touched.ion-invalid) {\n  --full-highlight-height: calc(var(--highlight-height) * var(--show-full-highlight));\n  --inset-highlight-height: calc(var(--highlight-height) * var(--show-inset-highlight)); }\n\n:host(.item-interactive.item-has-focus) {\n  --highlight-background: var(--highlight-color-focused); }\n\n:host(.item-interactive.ion-valid) {\n  --highlight-background: var(--highlight-color-valid); }\n\n:host(.item-interactive.ion-invalid) {\n  --highlight-background: var(--highlight-color-invalid); }\n\n:host(.item-label-stacked) ::slotted(ion-select),\n:host(.item-label-floating) ::slotted(ion-select) {\n  --padding-start: 0;\n  -ms-flex-item-align: stretch;\n  align-self: stretch;\n  width: 100%;\n  max-width: 100%; }\n\n:host(.item-label-stacked) ::slotted(ion-datetime),\n:host(.item-label-floating) ::slotted(ion-datetime) {\n  --padding-start: 0;\n  width: 100%; }\n\n:host(.item-multiple-inputs) ::slotted(ion-datetime),\n:host(.item-multiple-inputs) ::slotted(ion-select) {\n  position: relative; }\n\n:host(.item-textarea) {\n  -ms-flex-align: stretch;\n  align-items: stretch; }\n\n::slotted(ion-reorder[slot]) {\n  margin-top: 0;\n  margin-bottom: 0; }\n\n:host {\n  --min-height: 48px;\n  --background: var(--ion-item-background, var(--ion-background-color, #fff));\n  --background-activated: var(--background);\n  --background-focused: var(--ion-item-background-activated, #f1f1f1);\n  --border-color: var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-150, rgba(0, 0, 0, 0.13))));\n  --color: var(--ion-item-color, var(--ion-text-color, #000));\n  --transition: background-color 300ms cubic-bezier(.4, 0, .2, 1);\n  --padding-start: 16px;\n  --color: var(--ion-item-color, var(--ion-text-color, #000));\n  --border-color: var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-150, rgba(0, 0, 0, 0.13))));\n  --inner-padding-end: 16px;\n  --inner-border-width: 0 0 1px 0;\n  --highlight-height: 2px;\n  --highlight-color-focused: var(--ion-color-primary, #3880ff);\n  --highlight-color-valid: var(--ion-color-success, #10dc60);\n  --highlight-color-invalid: var(--ion-color-danger, #f04141);\n  font-size: 16px;\n  font-weight: normal;\n  text-transform: none; }\n\n:host(.item-interactive) {\n  --border-width: 0 0 1px 0;\n  --inner-border-width: 0;\n  --show-full-highlight: 1;\n  --show-inset-highlight: 0; }\n\n:host(.item-lines-full) {\n  --border-width: 0 0 1px 0;\n  --show-full-highlight: 1;\n  --show-inset-highlight: 0; }\n\n:host(.item-lines-inset) {\n  --inner-border-width: 0 0 1px 0;\n  --show-full-highlight: 0;\n  --show-inset-highlight: 1; }\n\n:host(.item-lines-inset),\n:host(.item-lines-none) {\n  --border-width: 0;\n  --show-full-highlight: 0; }\n\n:host(.item-lines-full),\n:host(.item-lines-none) {\n  --inner-border-width: 0;\n  --show-inset-highlight: 0; }\n\n:host(.item-multi-line) ::slotted([slot=\"start\"]),\n:host(.item-multi-line) ::slotted([slot=\"end\"]) {\n  margin-top: 16px;\n  margin-bottom: 16px;\n  -ms-flex-item-align: start;\n  align-self: flex-start; }\n\n::slotted([slot=\"start\"]) {\n  margin-right: 32px; }\n  \@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n    ::slotted([slot=\"start\"]) {\n      margin-right: unset;\n      -webkit-margin-end: 32px;\n      margin-inline-end: 32px; } }\n\n::slotted([slot=\"end\"]) {\n  margin-left: 32px; }\n  \@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n    ::slotted([slot=\"end\"]) {\n      margin-left: unset;\n      -webkit-margin-start: 32px;\n      margin-inline-start: 32px; } }\n\n::slotted(ion-icon) {\n  color: rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.54);\n  font-size: 24px; }\n\n::slotted(ion-icon[slot]) {\n  margin-top: 12px;\n  margin-bottom: 12px; }\n\n::slotted(ion-icon[slot=\"start\"]) {\n  margin-right: 32px; }\n  \@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n    ::slotted(ion-icon[slot=\"start\"]) {\n      margin-right: unset;\n      -webkit-margin-end: 32px;\n      margin-inline-end: 32px; } }\n\n::slotted(ion-icon[slot=\"end\"]) {\n  margin-left: 16px; }\n  \@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n    ::slotted(ion-icon[slot=\"end\"]) {\n      margin-left: unset;\n      -webkit-margin-start: 16px;\n      margin-inline-start: 16px; } }\n\n::slotted(ion-toggle[slot=\"start\"]),\n::slotted(ion-toggle[slot=\"end\"]) {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 0; }\n\n::slotted(ion-note) {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n  -ms-flex-item-align: start;\n  align-self: flex-start;\n  font-size: 11px; }\n\n::slotted(ion-note[slot]) {\n  padding-left: 0;\n  padding-right: 0;\n  padding-top: 18px;\n  padding-bottom: 10px; }\n\n::slotted(ion-note[slot=\"start\"]) {\n  padding-right: 16px; }\n  \@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n    ::slotted(ion-note[slot=\"start\"]) {\n      padding-right: unset;\n      -webkit-padding-end: 16px;\n      padding-inline-end: 16px; } }\n\n::slotted(ion-note[slot=\"end\"]) {\n  padding-left: 16px; }\n  \@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n    ::slotted(ion-note[slot=\"end\"]) {\n      padding-left: unset;\n      -webkit-padding-start: 16px;\n      padding-inline-start: 16px; } }\n\n::slotted(ion-avatar) {\n  width: 40px;\n  height: 40px; }\n\n::slotted(ion-thumbnail) {\n  width: 56px;\n  height: 56px; }\n\n::slotted(ion-avatar),\n::slotted(ion-thumbnail) {\n  margin-top: 8px;\n  margin-bottom: 8px; }\n\n::slotted(ion-avatar[slot=\"start\"]),\n::slotted(ion-thumbnail[slot=\"start\"]) {\n  margin-right: 16px; }\n  \@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n    ::slotted(ion-avatar[slot=\"start\"]),\n    ::slotted(ion-thumbnail[slot=\"start\"]) {\n      margin-right: unset;\n      -webkit-margin-end: 16px;\n      margin-inline-end: 16px; } }\n\n::slotted(ion-avatar[slot=\"end\"]),\n::slotted(ion-thumbnail[slot=\"end\"]) {\n  margin-left: 16px; }\n  \@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n    ::slotted(ion-avatar[slot=\"end\"]),\n    ::slotted(ion-thumbnail[slot=\"end\"]) {\n      margin-left: unset;\n      -webkit-margin-start: 16px;\n      margin-inline-start: 16px; } }\n\n::slotted(ion-label) {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 11px;\n  margin-bottom: 10px; }\n\n:host(.item-label-stacked) ::slotted([slot=\"end\"]),\n:host(.item-label-floating) ::slotted([slot=\"end\"]) {\n  margin-top: 7px;\n  margin-bottom: 7px; }\n\n:host(.item-toggle) ::slotted(ion-label),\n:host(.item-radio) ::slotted(ion-label) {\n  margin-left: 0; }\n  \@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n    :host(.item-toggle) ::slotted(ion-label),\n    :host(.item-radio) ::slotted(ion-label) {\n      margin-left: unset;\n      -webkit-margin-start: 0;\n      margin-inline-start: 0; } }\n\n::slotted(.button-small) {\n  --padding-top: 0;\n  --padding-bottom: 0;\n  --padding-start: .6em;\n  --padding-end: .6em;\n  height: 25px;\n  font-size: 12px; }\n\n:host(.item-label-floating),\n:host(.item-label-stacked) {\n  --min-height: 65px; }\n\n:host(.item-label-stacked) ::slotted(ion-select),\n:host(.item-label-floating) ::slotted(ion-select) {\n  --padding-top: 8px;\n  --padding-bottom: 8px;\n  --padding-start: 0; }\n\n:host(.item-has-focus:not(.ion-color)) ::slotted(.label-stacked),\n:host(.item-has-focus:not(.ion-color)) ::slotted(.label-floating) {\n  color: var(--ion-color-primary, #3880ff); }"; }
    static get styleMode() { return "md"; }
}

class Label {
    constructor() {
        this.noAnimate = false;
    }
    componentWillLoad() {
        this.noAnimate = (this.position === "floating");
        this.emitStyle();
    }
    componentDidLoad() {
        if (this.noAnimate) {
            setTimeout(() => {
                this.noAnimate = false;
            }, 1000);
        }
    }
    positionChanged() {
        this.emitStyle();
    }
    emitStyle() {
        const position = this.position;
        this.ionStyle.emit({
            "label": true,
            [`label-${position}`]: position !== undefined
        });
    }
    hostData() {
        const position = this.position;
        return {
            class: Object.assign({}, createColorClasses(this.color), { [`label-${position}`]: position !== undefined, [`label-no-animate`]: (this.noAnimate) })
        };
    }
    static get is() { return "ion-label"; }
    static get encapsulation() { return "scoped"; }
    static get properties() {
        return {
            "color": {
                "type": String,
                "attr": "color"
            },
            "el": {
                "elementRef": true
            },
            "mode": {
                "type": String,
                "attr": "mode"
            },
            "noAnimate": {
                "state": true
            },
            "position": {
                "type": String,
                "attr": "position",
                "watchCallbacks": ["positionChanged"]
            }
        };
    }
    static get events() {
        return [{
                "name": "ionStyle",
                "method": "ionStyle",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }];
    }
    static get style() { return ".item.sc-ion-label-md-h, .item   .sc-ion-label-md-h {\n  \n  --color: initial;\n  display: block;\n  color: var(--color);\n  font-family: var(--ion-font-family, inherit);\n  font-size: inherit;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n.ion-color.sc-ion-label-md-h {\n  color: var(--ion-color-base); }\n\n[text-wrap].sc-ion-label-md-h {\n  white-space: normal; }\n\n.item-interactive-disabled.sc-ion-label-md-h, .item-interactive-disabled   .sc-ion-label-md-h {\n  cursor: default;\n  opacity: .3;\n  pointer-events: none; }\n\n.item-input.sc-ion-label-md-h, .item-input   .sc-ion-label-md-h {\n  -ms-flex: initial;\n  flex: initial;\n  max-width: 200px;\n  pointer-events: none; }\n\n.label-fixed.sc-ion-label-md-h {\n  -ms-flex: 0 0 100px;\n  flex: 0 0 100px;\n  width: 100px;\n  min-width: 100px;\n  max-width: 200px; }\n\n.label-stacked.sc-ion-label-md-h, .label-floating.sc-ion-label-md-h {\n  margin-bottom: 0;\n  -ms-flex-item-align: stretch;\n  align-self: stretch;\n  width: auto;\n  max-width: 100%; }\n\n.item-has-focus.label-floating.sc-ion-label-md-h, .item-has-focus   .label-floating.sc-ion-label-md-h, .item-has-placeholder.label-floating.sc-ion-label-md-h, .item-has-placeholder   .label-floating.sc-ion-label-md-h, .item-has-value.label-floating.sc-ion-label-md-h, .item-has-value   .label-floating.sc-ion-label-md-h {\n  -webkit-transform: translate3d(0,  0,  0) scale(0.8);\n  transform: translate3d(0,  0,  0) scale(0.8); }\n\n.label-no-animate.label-floating.sc-ion-label-md-h {\n  -webkit-transition: none;\n  transition: none; }\n\n[text-wrap].sc-ion-label-md-h {\n  line-height: 1.5; }\n\n.label-stacked.sc-ion-label-md-h {\n  font-size: 12.8px; }\n\n.label-floating.sc-ion-label-md-h {\n  -webkit-transform: translate3d(0,  27px,  0);\n  transform: translate3d(0,  27px,  0);\n  -webkit-transform-origin: left top;\n  transform-origin: left top;\n  -webkit-transition: -webkit-transform 150ms ease-in-out;\n  transition: -webkit-transform 150ms ease-in-out;\n  transition: transform 150ms ease-in-out;\n  transition: transform 150ms ease-in-out, -webkit-transform 150ms ease-in-out; }\n  [dir=rtl].label-floating.sc-ion-label-md-h {\n    -webkit-transform-origin: right top;\n    transform-origin: right top; }\n\n.label-stacked.sc-ion-label-md-h, .label-floating.sc-ion-label-md-h {\n  margin-left: 0;\n  margin-bottom: 0; }\n  \@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n    .label-stacked.sc-ion-label-md-h, .label-floating.sc-ion-label-md-h {\n      margin-left: unset;\n      -webkit-margin-start: 0;\n      margin-inline-start: 0; } }\n\n.sc-ion-label-md-s  h1  {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 2px;\n  font-size: 24px;\n  font-weight: normal; }\n\n.sc-ion-label-md-s  h2  {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 2px;\n  margin-bottom: 2px;\n  font-size: 16px;\n  font-weight: normal; }\n\n.sc-ion-label-md-s  h3 , .sc-ion-label-md-s  h4 , .sc-ion-label-md-s  h5 , .sc-ion-label-md-s  h6  {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 2px;\n  margin-bottom: 2px;\n  font-size: 14px;\n  font-weight: normal;\n  line-height: normal; }\n\n.sc-ion-label-md-s  p  {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 2px;\n  font-size: 14px;\n  line-height: 20px;\n  text-overflow: inherit;\n  overflow: inherit; }\n\n.sc-ion-label-md-s > p {\n  color: var(--ion-color-step-600, #666666); }\n\n.sc-ion-label-md-h.ion-color.sc-ion-label-md-s > p, .ion-color .sc-ion-label-md-h.sc-ion-label-md-s > p {\n  color: inherit; }"; }
    static get styleMode() { return "md"; }
}

function hapticAvailable() {
    const engine = window.TapticEngine;
    return !!engine;
}
function hapticSelection() {
    const engine = window.TapticEngine;
    if (engine) {
        engine.selection();
    }
}
function hapticSelectionStart() {
    const engine = window.TapticEngine;
    if (engine) {
        engine.gestureSelectionStart();
    }
}
function hapticSelectionChanged() {
    const engine = window.TapticEngine;
    if (engine) {
        engine.gestureSelectionChanged();
    }
}
function hapticSelectionEnd() {
    const engine = window.TapticEngine;
    if (engine) {
        engine.gestureSelectionEnd();
    }
}
function hapticNotification(options) {
    const engine = window.TapticEngine;
    if (engine) {
        engine.notification(options);
    }
}
function hapticImpact(options) {
    const engine = window.TapticEngine;
    if (engine) {
        engine.impact(options);
    }
}

class Toggle {
    constructor() {
        this.inputId = `ion-tg-${toggleIds++}`;
        this.lastDrag = 0;
        this.activated = false;
        this.name = this.inputId;
        this.checked = false;
        this.disabled = false;
        this.value = "on";
        this.onFocus = () => {
            this.ionFocus.emit();
        };
        this.onBlur = () => {
            this.ionBlur.emit();
        };
    }
    checkedChanged(isChecked) {
        this.ionChange.emit({
            checked: isChecked,
            value: this.value
        });
    }
    disabledChanged() {
        this.emitStyle();
        if (this.gesture) {
            this.gesture.setDisabled(this.disabled);
        }
    }
    componentWillLoad() {
        this.emitStyle();
    }
    async componentDidLoad() {
        this.gesture = (await import('./chunk-f56eaea8.js')).createGesture({
            el: this.el,
            queue: this.queue,
            gestureName: "toggle",
            gesturePriority: 100,
            threshold: 5,
            passive: false,
            onStart: () => this.onStart(),
            onMove: ev => this.onMove(ev),
            onEnd: ev => this.onEnd(ev),
        });
        this.disabledChanged();
    }
    componentDidUnload() {
        if (this.gesture) {
            this.gesture.destroy();
            this.gesture = undefined;
        }
    }
    onClick() {
        if (this.lastDrag + 300 < Date.now()) {
            this.checked = !this.checked;
        }
    }
    emitStyle() {
        this.ionStyle.emit({
            "interactive-disabled": this.disabled,
        });
    }
    onStart() {
        this.activated = true;
        this.setFocus();
    }
    onMove(detail) {
        if (shouldToggle(this.checked, detail.deltaX, -10)) {
            this.checked = !this.checked;
            hapticSelection();
        }
    }
    onEnd(ev) {
        this.activated = false;
        this.lastDrag = Date.now();
        ev.event.preventDefault();
        ev.event.stopImmediatePropagation();
    }
    getValue() {
        return this.value || "";
    }
    setFocus() {
        if (this.buttonEl) {
            this.buttonEl.focus();
        }
    }
    hostData() {
        const { inputId, disabled, checked, activated, color, el } = this;
        const labelId = inputId + "-lbl";
        const label = findItemLabel(el);
        if (label) {
            label.id = labelId;
        }
        return {
            "role": "checkbox",
            "aria-disabled": disabled ? "true" : null,
            "aria-checked": `${checked}`,
            "aria-labelledby": labelId,
            class: Object.assign({}, createColorClasses(color), { "in-item": hostContext("ion-item", el), "toggle-activated": activated, "toggle-checked": checked, "toggle-disabled": disabled, "interactive": true })
        };
    }
    render() {
        const value = this.getValue();
        renderHiddenInput(true, this.el, this.name, (this.checked ? value : ""), this.disabled);
        return [
            h("div", { class: "toggle-icon" }, h("div", { class: "toggle-inner" })),
            h("button", { type: "button", onFocus: this.onFocus, onBlur: this.onBlur, disabled: this.disabled, ref: el => this.buttonEl = el })
        ];
    }
    static get is() { return "ion-toggle"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "activated": {
                "state": true
            },
            "checked": {
                "type": Boolean,
                "attr": "checked",
                "mutable": true,
                "watchCallbacks": ["checkedChanged"]
            },
            "color": {
                "type": String,
                "attr": "color"
            },
            "disabled": {
                "type": Boolean,
                "attr": "disabled",
                "watchCallbacks": ["disabledChanged"]
            },
            "el": {
                "elementRef": true
            },
            "mode": {
                "type": String,
                "attr": "mode"
            },
            "name": {
                "type": String,
                "attr": "name"
            },
            "queue": {
                "context": "queue"
            },
            "value": {
                "type": String,
                "attr": "value"
            }
        };
    }
    static get events() {
        return [{
                "name": "ionChange",
                "method": "ionChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
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
            }, {
                "name": "ionStyle",
                "method": "ionStyle",
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
    static get style() { return ":host {\n  /**\n   * \@prop --background: Background of the toggle\n   * \@prop --background-checked: Background of the toggle when checked\n   * \@prop --handle-background: Background of the toggle handle\n   * \@prop --handle-background-checked: Background of the toggle handle when checked\n   */\n  /* stylelint-disable-next-line declaration-no-important */\n  -webkit-box-sizing: content-box !important;\n  box-sizing: content-box !important;\n  display: inline-block;\n  outline: none;\n  contain: content;\n  cursor: pointer;\n  -ms-touch-action: none;\n  touch-action: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  z-index: 2; }\n\n:host(.ion-focused) input {\n  border: 2px solid #5e9ed6; }\n\n:host(.toggle-disabled) {\n  pointer-events: none; }\n\nbutton {\n  left: 0;\n  top: 0;\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  border: 0;\n  background: transparent;\n  cursor: pointer;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n  outline: none; }\n  :host-context([dir=rtl]) button {\n    right: 0; }\n  button::-moz-focus-inner {\n    border: 0; }\n\n:host {\n  --background: var(--ion-color-medium-tint, #a2a4ab);\n  --background-checked: rgba(var(--ion-color-primary-rgb, 56, 128, 255), 0.5);\n  --handle-background: var(--ion-background-color, #fff);\n  --handle-background-checked: var(--ion-color-primary, #3880ff);\n  padding-left: 12px;\n  padding-right: 12px;\n  padding-top: 12px;\n  padding-bottom: 12px;\n  -webkit-box-sizing: content-box;\n  box-sizing: content-box;\n  position: relative;\n  width: 36px;\n  height: 14px;\n  contain: strict; }\n  \@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n    :host {\n      padding-left: unset;\n      padding-right: unset;\n      -webkit-padding-start: 12px;\n      padding-inline-start: 12px;\n      -webkit-padding-end: 12px;\n      padding-inline-end: 12px; } }\n\n:host(.ion-color.toggle-checked) .toggle-icon {\n  background: rgba(var(--ion-color-base-rgb), 0.5); }\n\n:host(.ion-color.toggle-checked) .toggle-inner {\n  background: var(--ion-color-base); }\n\n.toggle-icon {\n  border-radius: 14px;\n  display: block;\n  position: relative;\n  width: 100%;\n  height: 100%;\n  -webkit-transition: background-color 160ms;\n  transition: background-color 160ms;\n  background: var(--background);\n  pointer-events: none; }\n\n.toggle-inner {\n  left: 0;\n  top: -3px;\n  border-radius: 50%;\n  position: absolute;\n  width: 20px;\n  height: 20px;\n  -webkit-transition-duration: 160ms;\n  transition-duration: 160ms;\n  -webkit-transition-property: background-color, -webkit-transform;\n  transition-property: background-color, -webkit-transform;\n  transition-property: transform, background-color;\n  transition-property: transform, background-color, -webkit-transform;\n  -webkit-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  background: var(--handle-background);\n  -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  will-change: transform, background-color;\n  contain: strict; }\n  :host-context([dir=rtl]) .toggle-inner {\n    right: 0; }\n\n:host(.toggle-checked) .toggle-icon {\n  background: var(--background-checked); }\n\n:host(.toggle-checked) .toggle-inner {\n  -webkit-transform: translate3d(16px,  0,  0);\n  transform: translate3d(16px,  0,  0);\n  background: var(--handle-background-checked); }\n  :host([dir=rtl].toggle-checked) .toggle-inner {\n    -webkit-transform: translate3d(calc(-1 * 16px),  0,  0);\n    transform: translate3d(calc(-1 * 16px),  0,  0); }\n\n:host(.toggle-disabled) {\n  opacity: 0.3; }\n\n:host(.in-item[slot]) {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n  padding-left: 16px;\n  padding-right: 0;\n  padding-top: 12px;\n  padding-bottom: 12px;\n  cursor: pointer; }\n  \@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n    :host(.in-item[slot]) {\n      padding-left: unset;\n      padding-right: unset;\n      -webkit-padding-start: 16px;\n      padding-inline-start: 16px;\n      -webkit-padding-end: 0;\n      padding-inline-end: 0; } }\n\n:host(.in-item[slot=\"start\"]) {\n  padding-left: 2px;\n  padding-right: 18px;\n  padding-top: 12px;\n  padding-bottom: 12px; }\n  \@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0) {\n    :host(.in-item[slot=\"start\"]) {\n      padding-left: unset;\n      padding-right: unset;\n      -webkit-padding-start: 2px;\n      padding-inline-start: 2px;\n      -webkit-padding-end: 18px;\n      padding-inline-end: 18px; } }"; }
    static get styleMode() { return "md"; }
}
function shouldToggle(checked, deltaX, margin) {
    const isRTL = document.dir === "rtl";
    if (checked) {
        return (!isRTL && (margin > deltaX)) ||
            (isRTL && (-margin < deltaX));
    }
    else {
        return (!isRTL && (-margin < deltaX)) ||
            (isRTL && (margin > deltaX));
    }
}
let toggleIds = 0;

export { AppProfile, BackButton as IonBackButton, Buttons as IonButtons, Item as IonItem, Label as IonLabel, Toggle as IonToggle };
