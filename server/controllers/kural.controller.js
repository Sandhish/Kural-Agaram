import Kural from "../models/kural.model.js";
import KuralList from "../models/kuralList.model.js";

export const ThirukkuralList = async (req, res) => {
    try {
        const kuralList = await KuralList.find({}, 'kural');
        const flattenedKurals = kuralList.flatMap(doc => doc.kural.map(kural => ({
            Number: kural.Number,
            Line1: kural.Line1,
            Line2: kural.Line2,
            mk:kural.mk,
        })));
        res.json(flattenedKurals);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const ThirukkuralIndex = async (req, res) => {
    try {
        const kurals = await Kural.find({ user: req.user.id });
        res.json(kurals);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

export const ThirukkuralAdd = async (req, res) => {
    const newKural = new Kural({
        kuralNo: req.body.kuralNo,
        kural: req.body.kural,
        user: req.user.id
    });

    try {
        const kurals = await newKural.save();
        return res.status(201).json(kurals);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const ThirukkuralDetails = async (req, res) => {
    try {
        const kural = await Kural.findOne({ _id: req.params.id, user: req.user.id });
        if (kural == null) {
            return res.status(404).json({ message: "Cannot find kural" });
        } else {
            return res.json(kural);
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const ThirukkuralDelete = async (req, res) => {
    const kuralId = req.params.id;

    try {
        const kural = await Kural.findOne({ _id: kuralId, user: req.user.id });
        if (!kural) {
            return res.status(404).json({ message: "Kural not found" });
        }
        await Kural.deleteOne({ _id: kuralId });
        res.json({ message: "Thirukkural deleted!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const ThirukkuralUpdate = async (req, res) => {
    try {
        const kural = await Kural.findOne({ _id: req.params.id, user: req.user.id });
        if (!kural) {
            return res.status(404).json({ message: "Kural not found" });
        }
        const updatedKural = await Kural.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { $set: { kuralNo: req.body.kuralNo, kural: req.body.kural } },
            { new: true }
        );
        res.status(200).json(updatedKural);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
