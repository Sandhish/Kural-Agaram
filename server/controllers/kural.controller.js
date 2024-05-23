import Kural from "../models/kural.model.js";

export const ThirukkuralIndex = async (req, res) => {
    try {
        const kural = await Kural.find();
        res.json(kural)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

export const ThirukkuralAdd = async (req, res) => {
    const newKural = new Kural({
        kuralNo: req.body.kuralNo,
        kural: req.body.kural,
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
        const kural = await Kural.findById(req.params.id);
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
        await Kural.deleteOne({ _id: kuralId });
        res.json({ message: "Thirukkural deleted!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const ThirukkuralUpdate = async (req, res) => {
    try {
        const updatedKural = await Kural.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { kuralNo: req.body.kuralNo, kural: req.body.kural } },
            { new: true }
        );
        res.status(200).json(updatedKural);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
