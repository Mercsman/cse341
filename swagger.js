const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info: {
        title: 'Project 2',
        description: 'Project 2',
    },
    host: 'project1-ck8y.onrender.com/',
    schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// a way to run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//     await import('./index.js')
// });