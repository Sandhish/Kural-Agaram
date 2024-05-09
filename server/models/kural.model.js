import { Schema,model } from "mongoose";

const schema = new Schema({
    kuralNo:{
        type:Number,
        required:true,
        unique:true,
    },
    kural:{
        type:String,
        required:true,
        unique: true,
    },
});

const Kural = model("Kural",schema);

export default Kural
