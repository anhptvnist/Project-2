const StudentService = require('./student.service');

exports.getClassOfTern  =async (req, res) => {
    try {
        var classes = await StudentService.getClassOfTern (req.params);
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

exports.registerClass= async (req, res)=>{
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

 exports.getlistclassofStudent  =async (req, res) => {
    try {
        var classes = await StudentService.getlistclassofStudent (req.params);
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

exports.searchData  =async (req, res) => {
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
