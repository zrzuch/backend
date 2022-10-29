import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import "reflect-metadata"; 
import { buildSchema } from 'type-graphql';
import { LinkedInResolver } from './resolvers/LinkedInResolver';
import fs from 'fs';
import PDFParser from "pdf2json";
import { Resume } from './entities/Resume';

(async () => {
    let resume = new Resume();
    await resume.setFromPDF(__dirname + '/../../Resume-Zachary-Zuch.pdf');
    console.log(resume);
    
    /*
    const schema = await buildSchema({
        resolvers: [
        __dirname + '/resolvers/*.ts'
        ],
        emitSchemaFile: __dirname + '/Schema.gql',
        validate: false,
    });
    const server = new ApolloServer({ schema });
    const app = express();  
    await server.start();
    server.applyMiddleware({ app });
    app.listen({ 
        port: 3000,
    }, async () => {
        console.log("Server running on port 3000");
    });
    */
})().catch(console.error);
