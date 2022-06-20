import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();
  const path = require('path');

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

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
  app.get( "/filteredimage", async ( req, res ) => {

    // define response.
    let response = {
      code: 200,
      status: true,
      data: '',
      msg: ''
    }

    // 1. validate the image_url query
    let url = req.query.image_url

    // 2. call filterImageFromURL(image_url) to filter the image
    await processImage(url)
    // 3. send the resulting file in the response
    .then(
      // case sucessfull
      function(value) {
        response.data = value
        res.send(response)
      }
    )
    .catch(
      // case failed
      function(error) {
        response.msg = error
        response.code = 500
        response.status = false
        res.send(response)
      }
    )

    // 4. deletes any files on the server on finish of the response
    // check if upload file sucessfull, can delete file at local
    if (response.code === 200) {
      let pathFile = path.resolve(__dirname, "util", "tmp", response.data)
      deleteLocalFiles([pathFile])
    }

  });

  async function  processImage(url: string) {
    return await filterImageFromURL(url);
  }

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();