"use strict";
const { reportIf } = require('../utils');

const hasRepeatAtEnd = (path) => {
    const pathParts = path.split('/');
    if (pathParts.length >= 2) {
        const lastTwoParts = pathParts.slice(-2);
        if (lastTwoParts[0] === lastTwoParts[1]) {
            return true;
        }
    }
    return false;
};

module.exports = context => ({
    ImportDeclaration: node => {
        reportIf(
            hasRepeatAtEnd(node.source.value),
            {
                node,
                context,
                message: 'Use index.js file for import module',
            }
        )
    }
});

module.exports.schema = [];