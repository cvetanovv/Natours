const Tour = require("../models/tourModel");

exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: "Fail",
            message: "Missing name or price!",
        });
    }
    next();
};

exports.getAllTours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: "success",
        // results: tours.length,
        // data: {
        //     tours: tours,
        // },
    });
};

exports.getTour = (req, res) => {
    const id = req.params.id * 1;

    // const tour = tours.find((el) => el.id === id);

    // res.status(200).json({
    //     status: "success",
    //     data: {
    //         tours: tour,
    //     },
    // });
};

exports.createTour = (req, res) => {
    res.status(201).json({
        status: "success",
        // data: {
        //     tour: newTour,
        // },
    });
};

exports.updateTour = (req, res) => {
    res.status(200).json({
        status: "Success",
        data: {
            tour: "<Updated tour!>",
        },
    });
};

exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: "Success",
        data: null,
    });
};
