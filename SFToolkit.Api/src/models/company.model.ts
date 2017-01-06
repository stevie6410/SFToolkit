import * as mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
    name: String,
    erpName: String,
    description: String
});

const Company = mongoose.model('Company', companySchema); 

export { Company }