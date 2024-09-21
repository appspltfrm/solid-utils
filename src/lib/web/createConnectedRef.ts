import {Accessor, createSignal, onCleanup, onMount} from "solid-js";

const refs: Map<Node, (fn: (el: Node) => Node) => void> = new Map();

const observer = new MutationObserver((records) => {
    for (const record of records) {
        const {addedNodes} = record;
        if (addedNodes) {
            for (let i = 0; i < addedNodes.length; i++) {
                const n = addedNodes[i];
                const c = refs.get(n);
                if (c) {
                    c(() => n);
                    refs.delete(n);
                } else {
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

export function createConnectedRef<T extends Node>(): [Accessor<T | undefined>, (ref: T) => void] {
    const [ref, setRef] = createSignal<T>();
    const [mounted, setMounted] = createSignal<T>();

    onMount(() => {
        const r = ref()!;
        if (r.isConnected) {
            setMounted(() => r);
        } else {
            refs.set(r, setMounted);
        }
    })

    onCleanup(() => {
        const r = ref();
        if (r) {
            refs.delete(r);
        }
    })

    return [mounted, setRef];
}
