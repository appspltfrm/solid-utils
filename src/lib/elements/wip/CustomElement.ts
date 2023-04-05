import {AssignableType} from "@co.mmons/js-utils/core";
import {fromAttributeValue} from "./attribute-utils";
import {CallbackName} from "./CallbackName";
import {CustomElementReactivePropMap} from "./CustomeElementReactivePropMap";
import {customElementBirthmark} from "./customElementBirthmark";
import {customElementCallbacks} from "./customElementCallbacks";
import {
    CustomElementDisconnectedCallback,
    CustomElementInterface,
    CustomElementPropertyValueChangeCallback
} from "./CustomElementInterface";
import {CustomElementInternals} from "./CustomElementInternals";
import {CustomElementOptions} from "./CustomElementOptions";
import {customElementPreValues} from "./customElementPreValues";
import {customElementReactiveProps} from "./customElementReactiveProps";


export function CustomElement<Type extends HTMLElement = HTMLElement>(baseTypeOrOptions?: AssignableType<Type> | CustomElementOptions, options?: CustomElementOptions) {

    // @ts-ignore
    const BaseType: AssignableType<Type> = typeof baseTypeOrOptions === "function" ? baseTypeOrOptions : HTMLElement;

    if (typeof baseTypeOrOptions === "object") {
        options = baseTypeOrOptions;
    }

    if (!options) {
        options = {};
    }

    if (options.reactive) {
        for (const propName of Object.keys(options.reactive)) {
            if (typeof options.reactive[propName] === "boolean") {
                options.reactive[propName] = {};
            }
        }
    }

    // @ts-ignore
    const newClass = class CustomElementBase extends BaseType! implements CustomElementInterface {
        static readonly [customElementBirthmark] = true;

        constructor() {
            super();

            const ownPropNames = Object.getOwnPropertyNames(this).filter(p => p !== "_$owner");
            const preValues: {[propName: string]: any} = {};
            let hasPreValue = false;

            for (const propName of ownPropNames) {
                const descriptor = Object.getOwnPropertyDescriptor(this, propName);
                if (descriptor?.writable) {
                    preValues[propName] = descriptor.value;
                    hasPreValue = true;
                }
            }

            // we must also check for attributes, for initial values
            const reactiveProps = Object.getPrototypeOf(this).constructor[customElementReactiveProps] as CustomElementReactivePropMap;
            for (const [propName, propDefinition] of Object.entries(reactiveProps)) {
                if (!ownPropNames.includes(propName) && this.hasAttribute(propDefinition.attribute!)) {
                    preValues[propName] = fromAttributeValue(this.getAttribute(propDefinition.attribute!), propDefinition);
                    hasPreValue = true;
                }
            }

            if (hasPreValue) {
                Object.defineProperty(this, customElementPreValues, {value: preValues, enumerable: false, writable: true});
            }

            Object.defineProperty(this, customElementCallbacks, {value: [], enumerable: false, writable: false});
        }

        get [customElementBirthmark](): true {
            return true;
        }

        get renderRoot(): this | ShadowRoot {

            if (options!.renderRoot === "element") {
                return this;
            }

            return this.shadowRoot ?? this.attachShadow({mode: options!.mode || "open", slotAssignment: options!.slotAssignment, delegatesFocus: options!.delegatesFocus});
        }

        addDisconnectedCallback(callback: CustomElementDisconnectedCallback) {
            return addCallback(this, CallbackName.disconnected, callback);
        }

        addPropertyValueChangeCallback(callback: CustomElementPropertyValueChangeCallback) {
            return addCallback(this, CallbackName.propertyValueChange, callback);
        }
    }

    Object.defineProperty(newClass, customElementReactiveProps, {value: options.reactive ?? {}});
    Object.defineProperty(newClass.prototype, "template", {value: () => undefined});
    Object.defineProperty(newClass.prototype, "connectedCallback", {value: () => undefined});
    Object.defineProperty(newClass.prototype, "disconnectedCallback", {value: () => undefined});

    return newClass;
}

function addCallback(element: HTMLElement, name: CallbackName, callback: (...args: any[]) => any) {
    const callbacks = (element as unknown as CustomElementInternals)[customElementCallbacks];
    if (!callbacks.find(c => c[0] === name && c[1] === callback)) {
        callbacks.push([name, callback]);
    }

    return () => {
        const i = callbacks.findIndex(c => c[0] === name && c[1] === callback);
        if (i > -1) {
            callbacks.splice(i, 1);
        }
    }
}
