// netlify/functions/my-function.js

export async function handler(event, context) {
    // You can use event.queryStringParameters, event.body, etc. for input
    // Handle logic here
  
    return {
      statusCode: 200, // HTTP status code
      body: JSON.stringify({ message: 'Hello from Netlify serverless function!' }), // Response body
    };
  }
  