"use strict";

const { isModule, reportIf } = require("../utils");

const extractModuleName = (filePath) => {
    const pathParts = filePath.split('/');
    if (pathParts.length >= 3) {
        return pathParts[2]
    }
    throw new Error('Failed get module name. Path not contains three part')
};

const isAbsolutePath = (path) => {
    const firstPart = path.split('/')[0];
    return firstPart === '@';
};

module.exports = context => ({
    ImportDeclaration: node => {
        const fileName = context.getFilename();
        const importPath = node.source.value;
        const moduleName = extractModuleName(fileName);

        reportIf(
            isAbsolutePath(importPath) &&
            isModule(fileName) &&
            extractModuleName(importPath) === moduleName,
            {
                node,
                context,
                message: 'Use relative import inside the module.',
            }
        )
    }
});

module.exports.schema = [];