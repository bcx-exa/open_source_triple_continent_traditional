var AWS = require("aws-sdk");



async function updateFrontend() {​​​​

  var autoscaling = new AWS.AutoScaling();



  var name = process.env.NODE_ENV == "prod" ? "arm_asg_prod" : "arm_asg_dev";

  var params = {​​​​

      AutoScalingGroupName: name, 

      Preferences: {​​​​

      InstanceWarmup: 400, 

      MinHealthyPercentage: 50

      }​​​​

    }​​​​;



 autoscaling.startInstanceRefresh(params, function(err, data) {​​​​

   if (err) console.log(err, err.stack); // an error occurred

   else     console.log(data);           // successful response

   /*

   data = {​​​​

    InstanceRefreshId: "08b91cf7-8fa6-48af-b6a6-d227f40f1b9b"

   }​​​​

   */

 }​​​​);

}​​​​



// Wordpress Update

updateFrontend();



// Database Updates

//updateDatabase();