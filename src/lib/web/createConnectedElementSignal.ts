import {Accessor, createEffect, createSignal, onCleanup, onMount} from "solid-js";

const refs: Map<Node, (fn: (el: Node) => Node) => void> = new Map();

const observer = new MutationObserver((records) => {

    if (!refs.size) {
        return;
    }

    for (const record of records) {
        const {addedNodes} = record;
        if (addedNodes) {
            for (let i = 0; i < addedNodes.length; i++) {
                const n = addedNodes[i];
                const c = refs.get(n);

                if (c) {
                    c(() => n);
                    refs.delete(n);
                }

                if (n.hasChildNodes()) {
                    for (const [r, c] of refs.entries()) {
                        if (n.contains(r)) {
                            c(() => r);
                            refs.delete(r);
                        }
                    }
                }
            }
        }
    }
})

observer.observe(document, {childList: true, subtree: true});

export function createConnectedElementSignal<T extends Element>(element?: T): [Accessor<T | undefined>, (ref: T) => void] {
    const [ref, setRef] = createSignal<T | undefined>(element);
    const [mounted, setMounted] = createSignal<T>();

    createEffect((prev) => {

        const r = ref()!;

        if (r.isConnected) {
            setMounted(() => r);
        } else if (prev !== r) {
            refs.set(r, setMounted);
        }

        return r;
    })

    onCleanup(() => {
        const r = ref();
        if (r) {
            refs.delete(r);
        }
    })

    return [mounted, setRef];
}
