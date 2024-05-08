import { Schema,model } from "mongoose";

const schema = new Schema({
    kural:{
        type:String,
        required:true,
        unique: true,
    },
});

const Kural = model("Kural",schema);

export default Kural
