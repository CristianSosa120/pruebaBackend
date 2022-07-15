const fs = require('fs'),
  eventStream = require('event-stream'),
  CustomerSchema = require('./models/customer'),
  CampaingSchema = require('./models/campaing');

const write = async (line, fileFields, campaing, separator) => {
  let lineSplit = line.split(separator);
  
  let customer = CustomerSchema({
    campaing,
    firstName: lineSplit[fileFields.firstName],
    lastName: lineSplit[fileFields.lastName],
    phones: lineSplit[fileFields.phones],
    address: lineSplit[fileFields.address],
  });
  await customer.save();
}

const readFile = (file, fileFields, campaing, separator) => {
  let lineNr = 0;
  return new Promise(
    function(resolve, reject){
      let readStream = fs.createReadStream(file)
      .pipe(eventStream.split())
      .pipe(eventStream.mapSync(async function(line){
          readStream.pause();
          lineNr += 1;
          if( lineNr > 1 ){
            await write(line, fileFields, campaing, separator);
          }
          readStream.resume();
        })
        .on('error', function(err){
          resolve(false);
        })
        .on('end', function(){
          reject(true);
        })
      );
    }
  );
}

module.exports = async function upload(req, res) {
  const { body: { fileFields, separator }, file } = req;
  const campaing = await CampaingSchema.findOne().sort({ _id: -1 });
  try {
    await readFile(file.path, JSON.parse(fileFields), campaing._id, separator);
  } catch (error) {
    console.log(error);
  }

  res.send({success:true});
}