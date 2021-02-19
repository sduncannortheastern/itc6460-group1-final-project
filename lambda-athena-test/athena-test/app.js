// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {

    try {
        // const ret = await axios(url);
        console.log("In the function..");
        const aws = require("aws-sdk");
        const AthenaExpress = require("athena-express");
        const athenaExpressConfig = { aws }; //configuring athena-express with aws sdk object
        const athenaExpress = new AthenaExpress(athenaExpressConfig);
        let myQuery = {
            sql: "SELECT title, genres, release_date, tagline FROM itc6460_movie_metadata limit 10" /* required */,
            db: "movies" /* optional. You could specify a database here or in the advance configuration option mentioned above*/
        };
        console.log("Starting queryy...");
        athenaExpress
        .query(myQuery)
        .then(results => {
            console.log(results);
        })
    .catch(error => {
        console.log(error);
    });
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello world',
                // location: ret.data.trim()
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
