import {Component, createComponent, createEffect, createRoot, createSignal, lazy} from "solid-js";
import {assign, insert} from "solid-js/web";

type SolidComponent = Component | ReturnType<typeof lazy>;
type SolidComponentWrapper = {component: SolidComponent | string};
type RenderedElement<T extends Element = Element> = T & {"__solidDispose"?: () => void};

export async function renderToDom<T extends Element = Element>(
    parentNode: Node,
    rawComponent: SolidComponent | SolidComponentWrapper | string,
    props?: any): Promise<RenderedElement<T>> {

    const component = (typeof rawComponent === "object" && rawComponent.component) || rawComponent;

    let view: HTMLElement;

    if (typeof component === "string") {
        view = document.createElement(component);
        assign(view, props, false, true);
        parentNode.appendChild(view);

    } else {
        view = await new Promise<HTMLElement>((resolve) => {
            createRoot((dispose) => {
                insert(parentNode, () => {

                    const [element, setElement] = createSignal<HTMLElement>();

                    createEffect(() => {
                        if (element()) {
                            (element() as RenderedElement).__solidDispose = () => {
                                dispose();
                                delete (element() as RenderedElement).__solidDispose;
                            }
                            resolve(element() as HTMLElement);
                        }
                    })

                    return createComponent(component as SolidComponent, {...props, ref: setElement});
                })
            })
        })
    }

    return view as unknown as T;
}
