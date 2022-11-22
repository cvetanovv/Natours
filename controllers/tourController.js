const { query } = require("express");
const Tour = require("../models/tourModel");

exports.getAllTours = async (req, res) => {
    try {
        // Build Query
        // 1A) Filtering
        const queryObj = { ...req.query };
        const excludeFields = ["page", "sort", "limit", "fields"];
        excludeFields.forEach((el) => delete queryObj[el]);

        // 1B) Advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(
            /\b(gt|gte|lt|lte)\b/g,
            (match) => `$${match}`
        );

        let query = await Tour.find(JSON.parse(queryStr));

        // 2) Sorting
        // if (req.query.sort) {
        //     const sortBy = req.query.sort.split(",").join(" ")
        //     console.log("Hello")
        //     query = query.sort(sortBy);
        // } else {
        //     query = query.sort("-createdAt")
        // }

        // 3) Field Limiting
        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields);
        }
        // else {
        //     query = query.select("__v");
        // }

        // Execute Query
        const tours = await query;

        // Send Response
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
            message: err,
        });
    }
};

exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            status: "Success",
            data: {
                tour: tour,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "Fail",
            message: err,
        });
    }
};

exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: "Success",
            data: null,
        });
    } catch (err) {
        res.status(400).json({
            status: "Fail",
            message: err,
        });
    }
};
