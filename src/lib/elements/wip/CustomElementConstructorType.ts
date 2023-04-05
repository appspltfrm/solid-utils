import {AssignableType} from "@co.mmons/js-utils/core";
import {customElementBirthmark} from "./customElementBirthmark";
import {CustomElementInterface} from "./CustomElementInterface";

export type CustomElementConstructorType = AssignableType<HTMLElement & CustomElementInterface> & {[customElementBirthmark]: true};
