import * as mongoose from 'mongoose';
import { autoPopulateAllFields } from '../controllers/utils';

const swiSchema = new mongoose.Schema({
    title: { type: String, required: true },
    revision: { type: String, required: true },
    isReleased: { type: Boolean, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    expert: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    approver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    stages: [{
        sequence: { type: String, required: true },
        text: { type: String },
        imageCaption: { type: String },
        isCriticalStep: { type: Boolean, required: true, default: false },
        carePoint: { type: String },
        hyperlink: { type: String },
        observations: [{
            text: { type: String },
            jobNumber: { type: String },
            observer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }

        }]
    }]
});

swiSchema.plugin(autoPopulateAllFields);

const SWI = mongoose.model('SWI', swiSchema);

export { SWI }