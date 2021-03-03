const AWS = require("aws-sdk");
const path = require("path");
const dotenv = require("dotenv-flow");

// Load ENV variables
dotenv.config({ path: path.resolve(process.cwd(), "./environments/") });

// Set AWS Credentials
const config = new AWS.Config({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

AWS.config.update(config);

function genKeyPair() {
  // Variables
  const ec2 = new AWS.EC2();
  const ssm = new AWS.SSM();
  const keyPairParams = {
    KeyName: process.env.KEYPAIR_NAME,
   };
   const SSMParams = {
    Name: process.env.KEYPAIR_NAME,
   };

  // Key Pair Logic
  if(!process.env.REMOVE_STACK) {
    const getSSMparams = {
      Name: process.env.KEYPAIR_NAME,
      WithDecryption: true
    };

    // Check if file exists
    ssm.getParameter(getSSMparams, function(err, data) {
      if (err) { 
        if(err.code == 'ParameterNotFound') {
          // Create Key Pair in AWS if a pem file doesn't exist
          ec2.createKeyPair(keyPairParams, function(err, data) {
            if (err) { 
              console.log(err, err.stack); 
            } 
            else {    
              // Write pem file to parameter store
              const paramsSSM = {
                Name: process.env.KEYPAIR_NAME,
                Value: data.KeyMaterial,
                Overwrite: true,
                Type: "SecureString",
              };
              ssm.putParameter(paramsSSM, function (err, data) {
                if (err) console.log(err, err.stack);
                else console.log("KeyPair Creator: Key Pair Created in Parameter Store!");
              });
            }         
          }); 
        } else {
          console.log(err, err.stack);
        }
      } 
      else {
        // pem exists, dont do anything 
        console.log("KeyPair Creator: Key already exists"); 
      }          
    });
  } else {
    // Delete keypair from AWS if REMOVE_STACK variable is set to true
    ec2.deleteKeyPair(keyPairParams, function(err, data) {
      if (err) console.log(err, err.stack); 
      else {
        ssm.deleteParameter(SSMParams, function(err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else     console.log("KeyPair Creator: Key deleted from Parameter Store");           // successful response
        });
      }    
    });
  }
}

// Run
genKeyPair();
