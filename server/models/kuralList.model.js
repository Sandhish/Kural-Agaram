import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const kuralSchema = new Schema({
    kural: [{
        Number: Number,
        Line1: String,
        Line2: String,
    }]
});

const KuralList = model('KuralList', kuralSchema);

export default KuralList;