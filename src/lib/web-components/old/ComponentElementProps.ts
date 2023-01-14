import {ComponentDefinition} from "./ComponentDefinition";
import {ComponentPropDefinition} from "./ComponentPropDefinition";

export type ComponentElementProps<
    Definition extends ComponentDefinition,
    Props extends {[P in keyof Definition["props"]]: ComponentPropDefinition<any>} = Definition["props"],
    PropName extends keyof Props = keyof Props,
    PropType = Props[PropName] extends ComponentPropDefinition<infer T> ? T : never> =
    {[P in keyof Props]?: (Props[P] extends ComponentPropDefinition<infer T> ? T : never)};

type HTMLElementConstructor<T extends HTMLElement> = new() => T;

export function CustomHTMLElement<Definition extends ComponentDefinition>() {
    return HTMLElement as HTMLElementConstructor<HTMLElement & ComponentElementProps<Definition>>;
}

//
// interface Base{}
// interface BaseClass<T> {
//     new (): T
// }
//
// function generateUserClass<D extends ComponentDefinition, T extends Base>(baseClass: BaseClass<T>){
//     class User extends (baseClass as BaseClass<Base>) {
//         name: string;
//     }
//     return User as BaseClass<T & User>;
// }
//
// class Model{
//     id: number;
// }
// var User = generateUserClass(Model);
// var user = new User();
// user.id;
