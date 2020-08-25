const StudentService = require('./student.service');

exports.getClassOfTern = async (req, res) => {
    try {
        var classes = await StudentService.getClassOfTern(req.params);
        res.status(200).json({
            success: true,
            messages: ['getClassOfTern _success'],
            content: classes
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ['getClassOfTern _fail'],
            content: error
        })
    }
};

exports.registerClass = async (req, res) => {
    try {
        var registerclass = await StudentService.registerClass(req.params);
        res.status(200).json({
            success: true,
            messages: ['Register_class_success'],
            content: registerclass
        })
    } catch (error) {

        res.status(400).json({
            success: false,
            messages: ['Register_class_fail'],
            content: error
        })
    }
}

exports.getlistclassofStudent = async (req, res) => {
    try {
        var classes = await StudentService.getlistclassofStudent(req.params);
        res.status(200).json({
            success: true,
            messages: ['getlistclassofStudent _success'],
            content: classes
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ['getlistclassofStudent _fail'],
            content: error
        })
    }
};

exports.searchData = async (req, res) => {
    try {
        var classes = await StudentService.searchData(req.params);
        res.status(200).json({
            success: true,
            messages: ['search_data_success'],
            content: classes
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ['search_data_fail'],
            content: error
        })
    }
};
exports.deleteClass = async (req, res) => {
    try {
        var registerclass = await StudentService.deleteClass(req.params);
        res.status(200).json({
            success: true,
            messages: ['Register_class_success'],
            content: registerclass
        })
    } catch (error) {

        res.status(400).json({
            success: false,
            messages: ['Register_class_fail'],
            content: error
        })
    }
}


exports.getlistclassoftern = async (req, res) => {
    try {
        var classes = await StudentService.getlistclassoftern(req.params);
        res.status(200).json({
            success: true,
            messages: ['getlistclassoftern _success'],
            content: classes
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ['getlistclassoftern _fail'],
            content: error
        })
    }
};


exports.getPointOfStudent = async (req, res) => {
    try {
        var classes = await StudentService.getPointOfStudent(req.params);
        res.status(200).json({
            success: true,
            messages: ['getPointOfStudent_success'],
            content: classes
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ['getPointOfStudent_fail'],
            content: error
        })
    }
};

exports.getInfoStudent = async (req, res) => {
    if (req.query.test !== undefined) {
        test(req, res);
    } else {
        try {
            var classes = await StudentService.getInfoStudent(req.params);
            res.status(200).json({
                success: true,
                messages: ['getInfoStudent_success'],
                content: classes
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                messages: ['getInfoStudent_fail'],
                content: error
            })
        }
    }
};

test = async (req, res) =>{
    try {
        var classes = await StudentService.test(req.query);
        res.status(200).json({
            success: true,
            messages: ['test_success'],
            content: classes
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ['test_fail'],
            content: error
        })
    }
}
