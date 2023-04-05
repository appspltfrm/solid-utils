import {AssignableType} from "@co.mmons/js-utils/core";
import {
    CustomElementDisconnectedCallback,
    CustomElementInterface,
    CustomElementPropertyValueChangeCallback
} from "./CustomElementInterface";
import {CustomElementOptions} from "./CustomElementOptions";
import {ReactivePropsMap} from "./internals/ReactivePropsMap";
import {birthmarkProp} from "./internals/birthmarkProp";
import {CallbackName} from "./internals/CallbackName";
import {callbacksProp} from "./internals/callbacksProp";
import {InternalInstance} from "./internals/InternalInstance";
import {fromAttributeValue} from "./internals/fromAttributeValue";
import {preValuesProp} from "./internals/preValuesProp";
import {reactivePropsProp} from "./internals/reactivePropsProp";
import {renderRootProp} from "./internals/renderRootProp";
import {stylesProp} from "./internals/stylesProp";

export function CustomElement<Type extends HTMLElement = HTMLElement>(baseTypeOrOptions?: AssignableType<Type> | CustomElementOptions, options?: CustomElementOptions) {

    // @ts-ignore
    const BaseType: AssignableType<Type> = typeof baseTypeOrOptions === "function" ? baseTypeOrOptions : HTMLElement;

    if (typeof baseTypeOrOptions === "object") {
        options = baseTypeOrOptions;
    }

    if (!options) {
        options = {};
    }

    if (!options.renderRoot) {
        options.renderRoot = "shadow";
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
        static readonly [birthmarkProp] = true;

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
            const reactiveProps = Object.getPrototypeOf(this).constructor[reactivePropsProp] as ReactivePropsMap;
            for (const [propName, propDefinition] of Object.entries(reactiveProps)) {
                if (!ownPropNames.includes(propName) && this.hasAttribute(propDefinition.attribute!)) {
                    preValues[propName] = fromAttributeValue(this.getAttribute(propDefinition.attribute!), propDefinition);
                    hasPreValue = true;
                }
            }

            if (hasPreValue) {
                Object.defineProperty(this, preValuesProp, {value: preValues, enumerable: false, writable: true});
            }

            Object.defineProperty(this, callbacksProp, {value: [], enumerable: false, writable: false});
        }

        get [birthmarkProp](): true {
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

    Object.defineProperty(newClass, reactivePropsProp, {value: options.reactive ?? {}});
    Object.defineProperty(newClass, renderRootProp, {value: options.renderRoot});

    if (options.styles) {
        Object.defineProperty(newClass, stylesProp, {value: options.styles});
    }

    Object.defineProperty(newClass.prototype, "template", {value: () => undefined});
    Object.defineProperty(newClass.prototype, "connectedCallback", {value: () => undefined});
    Object.defineProperty(newClass.prototype, "disconnectedCallback", {value: () => undefined});

    return newClass;
}

function addCallback(element: HTMLElement, name: CallbackName, callback: (...args: any[]) => any) {
    const callbacks = (element as unknown as InternalInstance)[callbacksProp];
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
