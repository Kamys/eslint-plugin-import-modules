const reportIf = (condition, {message, context, node }) => {
    if (condition) {
        context.report(node, message);
    }
};

const moduleContainers = ['components'];

const isModule = (filePath) => {
    const pathParts = filePath.split('/');
    return moduleContainers.includes(pathParts[1]);

};

module.exports = {
    reportIf,
    isModule,
};