import {serialize, Serializer, unserialize} from "@co.mmons/js-utils/json";
import {CustomElementReactiveProp} from "./CustomElementReactiveProp";

export function toAttributeName(propName: string) {
    return propName
        .replace(/\.?([A-Z]+)/g, (x, y) => "-" + y.toLowerCase())
        .replace("_", "-")
        .replace(/^-/, "");
}

export function fromAttributeValue(value: any, propDefinition: CustomElementReactiveProp) {

    if (value === null || value === undefined) {
        return value;
    }

    if (propDefinition.type instanceof Serializer) {
        return propDefinition.type.unserialize(value);

    } else if (typeof value === "string") {

        if (propDefinition.type !== String && value === "") {
            return undefined;
        }

        return unserialize(value, propDefinition.type, {notStrict: true});
    }
}

export function toAttributeValue(value: any, propDefinition: CustomElementReactiveProp) {

    if (value === null || value === undefined) {
        return value;
    }

    if (propDefinition.type instanceof Serializer) {
        return propDefinition.type.serialize(value);
    } else {
        return serialize(value, propDefinition.type);
    }
}
