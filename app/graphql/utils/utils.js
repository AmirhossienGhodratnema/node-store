


function parseObject(valueNode) {
    const value = Object.create(null);
    valueNode.fields.forEach(field => {
        value[field.name.value] = parseValueNode(field.name);
    });
    return value;
};

function parseValueNode(valueNode) {
    switch (valueNode.kind) {
        case Kind.STRING:
        case Kind.BOOLEAN:
            return valueNode.value

        case Kind.INT:
        case Kind.FLOAT:
            return Number(valueNode.value);

        case Kind.OBJECT:
            return parseObject(valueNode.value);

        case Kind.LIST:
            return valueNode.values.map(parseValueNode)
        default:
            return null;
    };
};

function parseLiteral(valueNode) {    // valueNode: Strange amounts. fields,name,object,list
    switch (valueNode.kind) {
        case Kind.STRING:
            return valueNode.value.charAt(0) === '{' ? JSON.parse(valueNode.value) : valueNode.value;
        case Kind.INT:
        case Kind.FLOAT:
            return Number(valueNode.value);
        case Kind.OBJECT:



        default:
            break;
    }
};


function toObject(value) {
    console.log(value)
    if (typeof value === Object) return value;
    if (typeof value === String && value.charAt(0) == '{') return JSON.parse(value);
    return null;
};

module.exports = {
    toObject,
    parseLiteral,
    parseValueNode,
    parseObject
};