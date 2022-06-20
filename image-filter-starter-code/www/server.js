"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const util_1 = require("./util/util");
(() => __awaiter(this, void 0, void 0, function* () {
    // Init the Express application
    const app = express_1.default();
    const path = require('path');
    // Set the network port
    const port = process.env.PORT || 8082;
    // Use the body parser middleware for post requests
    app.use(body_parser_1.default.json());
    // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
    // GET /filteredimage?image_url={{URL}}
    // endpoint to filter an image from a public url.
    // IT SHOULD
    //    1
    //    1. validate the image_url query
    //    2. call filterImageFromURL(image_url) to filter the image
    //    3. send the resulting file in the response
    //    4. deletes any files on the server on finish of the response
    // QUERY PARAMATERS
    //    image_url: URL of a publicly accessible image
    // RETURNS
    //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]
    /**************************************************************************** */
    //! END @TODO1
    // Root Endpoint
    // Displays a simple message to the user
    app.get("/filteredimage", (req, res) => __awaiter(this, void 0, void 0, function* () {
        // define response.
        let response = {
            code: 200,
            status: true,
            data: '',
            msg: ''
        };
        // 1. validate the image_url query
        let url = req.query.image_url;
        // 2. call filterImageFromURL(image_url) to filter the image
        yield processImage(url)
            // 3. send the resulting file in the response
            .then(
        // case sucessfull
        function (value) {
            response.data = value;
            res.send(response);
        })
            .catch(
        // case failed
        function (error) {
            response.msg = error;
            response.code = 500;
            response.status = false;
            res.send(response);
        });
        // 4. deletes any files on the server on finish of the response
        // check if upload file sucessfull, can delete file at local
        if (response.code === 200) {
            let pathFile = path.resolve(__dirname, "util", "tmp", response.data);
            util_1.deleteLocalFiles([pathFile]);
        }
    }));
    function processImage(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield util_1.filterImageFromURL(url);
        });
    }
    // Start the Server
    app.listen(port, () => {
        console.log(`server running http://localhost:${port}`);
        console.log(`press CTRL+C to stop server`);
    });
}))();
//# sourceMappingURL=server.js.map