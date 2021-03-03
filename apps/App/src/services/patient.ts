import AWS from "aws-sdk";
AWS.config.update({region: process.env.REGION});
const dynamoDb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

export class Patient {
  public async Initialize() {
    // Patient Info
    const ids = ['111', '112', '113', '114', '115', '116', '117', '118', '119'];
    const firstNames = ['Martin', 'Bradley', 'Rob'];
    const lastNames = ['Greyling', 'Henderson', 'Louw'];
    const genders = ['Male', 'Female'];
    const races = ['Green', 'Gold', 'Orange'];
    const ages = [20, 30, 44, 53,65, 72];
    const bloodTypes = ['A+', 'A-', 'B+', 'B-','O+', 'O-'];

    // Patient History
    const bloodPressures = ['120/70', '140/85', '155/90'];
    const cholestrols = [125, 200, 170];
    const glucoses = [7.8, 8, 10, 4];
    const heights = [170, 190, 210, 155];
    const weights = [54, 45, 79, 120, 150];
    const doctors = ['Dr House', 'Dr Kamlan', 'Dr Grey'];

    // Create dummy info
    for(let i = 0; i < ids.length; i++) { 
      // Create patient info record
      const patientInfo = {
        id: ids[i],
        type: 'info',
        time: Date.now(),
        firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
        lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
        age: ages[Math.floor(Math.random() * ages.length)],
        gender: genders[Math.floor(Math.random() * genders.length)],
        race: races[Math.floor(Math.random() * races.length)],
        bloodTypes: bloodTypes[Math.floor(Math.random() * bloodTypes.length)],
      };
      // Create patient history
      const patientHistory = {
        id: patientInfo.id,
        type: 'check-up',
        time: Date.now(),
        bloodPressure: bloodPressures[Math.floor(Math.random() * bloodPressures.length)],
        cholestrol: cholestrols[Math.floor(Math.random() * cholestrols.length)],
        glucose: glucoses[Math.floor(Math.random() * glucoses.length)],
        height: heights[Math.floor(Math.random() * heights.length)],
        weight: weights[Math.floor(Math.random() * weights.length)],
        doctor: doctors[Math.floor(Math.random() * doctors.length)],
      };

      // Save to DB
      const params1 = {
        TableName : process.env.DB_TABLE_NAME,
        Item: patientInfo
      };

      const params2 = {
        TableName : process.env.DB_TABLE_NAME,
        Item: patientHistory
      };
  
      dynamoDb.put(params1, function(err, data) {
        if (err) console.log(err);
        else console.log(data);
      });

      dynamoDb.put(params2, function(err, data) {
        if (err) console.log(err);
        else console.log(data);
      });
    }

    return 'Initialized';
  }
  public async Create(body) { 
    console.log(body); 
    // Save to DB
    const params1 = {
      TableName : process.env.DB_TABLE_NAME,
      Item: body
    };

    dynamoDb.put(params1, function(err, data) {
      if (err) console.log(err);
      else console.log(data);
    });


    return 'Data Saved';
  }
  public async Read(id, type) {  
    // Save to DB
    const params1 = {
      TableName : process.env.DB_TABLE_NAME,
      Key: { id: id, type: type }
    };
    
    return await dynamoDb.get(params1).promise();
  }
}
