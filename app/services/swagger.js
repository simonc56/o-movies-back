import expressJSDocSwagger from 'express-jsdoc-swagger';

const options = {
    info: {
        version: '0.0.1',
        title: `O'movies API`,
        license: {
            name: 'MIT',
        },
    },
    baseDir: './app/routers',
    filesPattern: './**/*.js',
    swaggerUIPath: '/api-docs',
    exposeSwaggerUI: true,
};

/**
 * Initialize the swagger documentation
 * @param {object} app - The express app
 */
function initSwagger(app) {
    expressJSDocSwagger(app)(options);
}
export { initSwagger };