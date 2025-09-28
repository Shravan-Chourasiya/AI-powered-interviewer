import mongoose, { Document, Schema } from "mongoose";


//schema for typescript
export interface Interview extends Document {
    questions: object[];
    answers: object[];
    status: string;
    userid: string;
    fieldname: string;
    company: string;
    duration: string;
    position: string;
}

const InterviewSchema: Schema<Interview> = new Schema({
    questions: {
        type: [Object],
    },
    answers: {
        type: [Object]
    },
    status: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
    fieldname: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
})

const InterviewModel = (() => {
    try {
        return mongoose.models.Interview as mongoose.Model<Interview> || mongoose.model<Interview>("Interview", InterviewSchema);
    } catch (error) {
        throw new Error(`Failed to create Interview model: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
})();

export default InterviewModel;