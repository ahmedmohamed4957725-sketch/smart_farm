
import dotenv from "dotenv";
dotenv.config();

import swaggerJsdoc from "swagger-jsdoc";
import path from "node:path";

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Smart Farm API",
            version: "1.0.0",
            description: "API Documentation for Smart Farm Management System"
        },

        servers: [
            {
                url: process.env.BASE_URL,
                description: "Smart Farm API Server"
            }
        ]
    },

    apis: [
        path.resolve(process.cwd(), "Routes/*.js")
    ]
};

const swaggerSpec = swaggerJsdoc(options);

console.log("Swagger registered paths:", Object.keys(swaggerSpec.paths));

export default swaggerSpec;
