import { Schema, model } from "mongoose";

const schema = new Schema({
    kuralNo: {
        type: Number,
        required: true,
        unique:false
    },
    kural: {
        type: String,
        required: true,
        unique:false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
});

const Kural = model("Kural", schema);

export default Kural
