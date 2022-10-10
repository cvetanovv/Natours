const Tour = require("../models/tourModel");

exports.getAllTours = async (req, res) => {
    try {
        const tours = await Tour.find();

        res.status(200).json({
            status: "success",
            results: tours.length,
            data: {
                tours: tours,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "Fail",
            message: err,
        });
    }
};

exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);

        res.status(200).json({
            status: "success",
            data: {
                tours: tour,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "Fail",
            message: err,
        });
    }
};

exports.createTour = async (req, res) => {
    try {
        // First way to create:
        // const newTour = new Tour({})
        // newTour.save()

        // Second way:
        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: "success",
            data: {
                tour: newTour,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "Fail",
            message: "Invalid data sent!",
        });
    }
};

exports.updateTour = async (req, res) => {

    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            status: "Success",
            data: {
                tour: tour
            },
        });
    } catch (err) {
            res.status(400).json({ 
                status: "Fail",
                message: err,
            });
        }
};

exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: "Success",
        data: null,
    });
};
