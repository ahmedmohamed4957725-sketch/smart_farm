
import env from "dotenv";
env.config();
import swaggerJsdoc from "swagger-jsdoc";

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
                description: "Local Development Server"
            }
        ]
    },

    apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
