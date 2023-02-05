import { AssignableType } from "@co.mmons/js-utils/core";
import { SolidElement } from "./SolidElement";
export declare function registerElement<ElementType extends SolidElement>(tagName: string, elementConstructor: AssignableType<ElementType>): void;
