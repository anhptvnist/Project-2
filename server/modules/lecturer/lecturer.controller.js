const LecturerService = require('./lecturer.service');

exports.getlistclassofLecturer =async (req, res) => {
    try {
        var classes = await LecturerService.getlistclassofLecturer(req.params);
        res.status(200).json({
            success: true,
            messages: ['get_class_by_lec_success'],
            content: classes
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ['get_list_lecturer_fail'],
            content: error
        })
    }
};


