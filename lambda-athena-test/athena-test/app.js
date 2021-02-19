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
        console.log("defined aws");
        const AthenaExpress = require("athena-express");
        console.log("defined AthenaExpress");
        const athenaExpressConfig = { aws }; //configuring athena-express with aws sdk object
        const athenaExpress = new AthenaExpress(athenaExpressConfig);
        console.log("configured athenaExpress");
        let myQuery = "SELECT title, genres, release_date, tagline FROM movies.itc6460_movie_metadata limit 10";
        console.log("Starting queryy...");
        let query = await athenaExpress.query(myQuery);
        console.log(query);
    
        response = {
            'statusCode': 200,
            'body': JSON.stringify(query)
        }
    } catch (err) {
        console.log(err);
        response = {
            'statusCode': 200,
            'body': JSON.stringify('error: {err}')
        }
        return err;
    }

    return response
};
