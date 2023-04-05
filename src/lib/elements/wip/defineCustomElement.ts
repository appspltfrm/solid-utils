import {createRoot, createSignal} from "solid-js";
import {insert} from "solid-js/web";
import {fromAttributeValue, toAttributeName, toAttributeValue} from "./attribute-utils";
import {CallbackName} from "./CallbackName";
import {CustomElementReactivePropMap} from "./CustomeElementReactivePropMap";
import {customElementCallbacks} from "./customElementCallbacks";
import {customElementChildren} from "./customElementChildren";
import {CustomElementConstructorType} from "./CustomElementConstructorType";
import {CustomElementInterface} from "./CustomElementInterface";
import {CustomElementInternals} from "./CustomElementInternals";
import {customElementPreValues} from "./customElementPreValues";
import {CustomElementReactiveProp} from "./CustomElementReactiveProp";
import {customElementReactiveProps} from "./customElementReactiveProps";

export function defineCustomElement(tagName: string, Type: CustomElementConstructorType) {

    const finalClass = class CustomElementFinal extends Type {

        static get observedAttributes() {
            const props = (Type as any)[customElementReactiveProps] as CustomElementReactivePropMap;
            return Object.values(props).map(p => p.attribute);
        }
        #initialized = false;

        constructor() {
            super();
        }

        connectedCallback() {

            const internals = this as unknown as HTMLElement & CustomElementInternals & CustomElementInterface;

            if (this.#initialized) {
                return;
            }

            this.#initialized = true;

            initReactiveProps(internals, Type);
            internals[customElementPreValues] = undefined;

            // @ts-ignore
            super.connectedCallback()

            createRoot((dispose: Function) => {

                this.addDisconnectedCallback(() => {
                    this.renderRoot.textContent = "";
                    dispose();
                })

                // @ts-ignore
                return insert(this.renderRoot, super.template({children: internals[customElementChildren]}));
            }, lookupContext(this));
        }

        async disconnectedCallback() {

            // prevent premature releasing when element is only temporarily removed from DOM
            await Promise.resolve();

            if (this.isConnected) {
                return;
            }

            const callbacks = (this as unknown as CustomElementInternals)[customElementCallbacks]!;

            let callback = callbacks.pop();
            while (callback) {

                if (callback[0] === CallbackName.disconnected) {
                    callback[1](this);
                }

                callback = callbacks.pop();
            }

            this.#initialized = false;
        }

        attributeChangedCallback(name: string, oldVal: string, newVal: string) {

            if (!this.#initialized) {
                return;
            }

            // if (this.__updating[name]) return;
            const prop = lookupAttributeProp(name, Type)!;

            if (newVal == null && !(this as any)[prop[0]]) {
                return;
            }

            (this as any)[prop[0]] = fromAttributeValue(newVal, prop[1]);
        }
    }

    const reactiveProps = (Type as any)[customElementReactiveProps] as CustomElementReactivePropMap;
    for (let [propName, propDefinition] of Object.entries(reactiveProps)) {
        if (!propDefinition.attribute) {
            propDefinition.attribute = toAttributeName(propName);
        }
    }

    customElements.define(tagName, finalClass)
}

function lookupContext(el: HTMLElement) {

    type OwnerHost = {_$owner?: any}

    if (el.assignedSlot && (el.assignedSlot as OwnerHost)._$owner) {
        return (el.assignedSlot as OwnerHost)._$owner;
    }

    let next = el.parentNode;
    while (next && !(next as OwnerHost)._$owner && !((next as Element).assignedSlot && ((next as Element).assignedSlot as OwnerHost)._$owner)) {
        next = next.parentNode;
    }

    return next && (next as Element).assignedSlot ? ((next as Element).assignedSlot as OwnerHost)._$owner : (el as OwnerHost)._$owner;
}

function lookupAttributeProp(attributeName: string, Type: CustomElementConstructorType): [propName: string, propDefinition: CustomElementReactiveProp] | undefined {
    const props = (Type as any)[customElementReactiveProps] as CustomElementReactivePropMap;
    return Object.entries(props).find(([propName, prop]) => propName === attributeName || (prop as CustomElementReactiveProp).attribute === attributeName);
}

function initReactiveProps(element: HTMLElement & CustomElementInterface & CustomElementInternals, Type: CustomElementConstructorType) {

    const reactiveProps = (Type as any)[customElementReactiveProps] as CustomElementReactivePropMap;
    const names = [customElementChildren, ...Object.keys(reactiveProps ?? {})];
    const preValues = element[customElementPreValues];

    function firePropChange(propName: string, newVal: any, oldVal: any) {

    }

    function reflectAttribute(prop: CustomElementReactiveProp, value: any) {

        const attr = prop.attribute!;
        value = toAttributeValue(value, prop);

        if (value === undefined || value === null || value === false) {
            element.removeAttribute(attr);
        } else {
            const prev = element.getAttribute(attr);
            if (prev !== value) {
                element.setAttribute(attr, value);
            }
        }
    }

    for (let i = 0; i < names.length; i++) {

        const name = names[i];
        const prop = reactiveProps[name];

        let initialValue = undefined;
        if (preValues && name in preValues) {
            initialValue = preValues[name];
        } else {
            initialValue = (element as any)[name];
        }

        if (prop?.reflect) {
            reflectAttribute(prop, initialValue);
        }

        const [get, set] = createSignal(initialValue);

        Object.defineProperty(element, name, {
            get,
            set(newVal: any) {
                set((oldVal: any) => {

                    if (typeof name === "string") {

                        if (prop?.reflect) {
                            reflectAttribute(prop, newVal);
                        }

                        firePropChange(name, newVal, oldVal);
                    }

                    return newVal;
                })
            },
            enumerable: true,
            configurable: true
        })
    }


}
