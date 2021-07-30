const mongoose = require('mongoose');

const connectToMongo = async () => {
    try {
        await mongoose.connect(`${process.env.MONGOdb_URI}superiorSounds`,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex: true
            });

        console.log(`MongoDB Connected`);
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
    }

}



module.exports = connectToMongo;