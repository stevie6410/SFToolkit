import * as mongoose from 'mongoose';
import { autoPopulateAllFields } from '../controllers/utils';

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    defaultCompany: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true }
});

userSchema.plugin(autoPopulateAllFields);

const User = mongoose.model('User', userSchema); 

export { User }