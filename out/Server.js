"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Resume_1 = require("./entities/Resume");
(() => __awaiter(void 0, void 0, void 0, function* () {
    let resume = new Resume_1.Resume();
    resume.setFromPDF(__dirname + '/../../Resume-Zachary-Zuch.pdf');
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
}))().catch(error => console.error(error));
//# sourceMappingURL=Server.js.map