const AdminService =require('./admin.service');
exports.get =async (req, res) => {
    try {
         var user = await AdminService.get();
         res.status(200).json({
             success: true,
             messages: ['get_user_success'],
             content: user
         })
     } catch (error) {
       
         res.status(400).json({
             success: false,
             messages: ['get_user_fail'],
             content: error
         })
     }
 
 };

 exports.searchUser =async (req, res) => {
    try {
         var user = await AdminService.searchUser(req.params);
        //  LogInfo(req.user.email, ' get kpi unit ',req.user.company);
         res.status(200).json({
             success: true,
             messages: ['search_user_success'],
             content: user
         })
     } catch (error) {
       
         res.status(400).json({
             success: false,
             messages: ['search_user_fail'],
             content: error
         })
     }
 
 };

 exports.createSubjectSet =async (req, res) => {
    try {
         var subjects = await AdminService.createSubjectSet(req.body);
         res.status(200).json({
             success: true,
             messages: ['create_subjects_success'],
             content: subjects
         })
     } catch (error) {
       
         res.status(400).json({
             success: false,
             messages: ['create_subjects_fail'],
             content: error
         })
     }
 
 };

 exports.getSubjects =async (req, res) => {
    try {
         var subjects = await AdminService.getSubjects();
         res.status(200).json({
             success: true,
             messages: ['get_subjects_success'],
             content: subjects
         })
     } catch (error) {
       
         res.status(400).json({
             success: false,
             messages: ['get_subjects_fail'],
             content: error
         })
     }
 
 };

 exports.createSubject =async (req, res) => {
    try {
         var subject = await AdminService.createSubject(req.body);
         res.status(200).json({
             success: true,
             messages: ['create_subject_success'],
             content: subject
         })
     } catch (error) {
       
         res.status(400).json({
             success: false,
             messages: ['create_subject_fail'],
             content: error
         })
     }
 
 };

 exports.getSubject =async (req, res) => {
    try {
         var subject = await AdminService.getSubject();
         res.status(200).json({
             success: true,
             messages: ['get_subject_success'],
             content: subject
         })
     } catch (error) {
       
         res.status(400).json({
             success: false,
             messages: ['get_subject_fail'],
             content: error
         })
     }
 
 };

 exports.createTern =async (req, res) => {
    try {
         var tern = await AdminService.createTern(req.body);
         res.status(200).json({
             success: true,
             messages: ['create_Tern_success'],
             content: tern
         })
     } catch (error) {
       
         res.status(400).json({
             success: false,
             messages: ['create_Tern_fail'],
             content: error
         })
     }
 
 };

exports.getTern =async (req, res) => {
    try {
         var tern = await AdminService.getTern();
         res.status(200).json({
             success: true,
             messages: ['get_tern_success'],
             content: tern
         })
     } catch (error) {
       
         res.status(400).json({
             success: false,
             messages: ['get_tern_fail'],
             content: error
         })
     }
 
 };
 exports.startTern=async (req, res) => {
    try {
         var tern = await AdminService.startTern(req.params);
         res.status(200).json({
             success: true,
             messages: ['start_tern_success'],
             content: tern
         })
     } catch (error) {
       
         res.status(400).json({
             success: false,
             messages: ['start_tern_fail'],
             content: error
         })
     }
 };

 exports.endTern=async (req, res) => {
    try {
         var tern = await AdminService.endTern(req.params);
         res.status(200).json({
             success: true,
             messages: ['end_tern_success'],
             content: tern
         })
     } catch (error) {
       
         res.status(400).json({
             success: false,
             messages: ['end_tern_fail'],
             content: error
         })
     }
 };

 exports.editProfile=async (req, res) => {
    try {
         var profile = await AdminService.editProfile(req.body);
         res.status(200).json({
             success: true,
             messages: ['edit_profile_success'],
             content: profile
         })
     } catch (error) {
       
         res.status(400).json({
             success: false,
             messages: ['edit_profile_fail'],
             content: error
         })
     }
 };

 
 exports.getProfile=async (req, res) => {
    try {
         var profile = await AdminService.getProfile(req.params);
         res.status(200).json({
             success: true,
             messages: ['get_profile_success'],
             content: profile
         })
     } catch (error) {
       
         res.status(400).json({
             success: false,
             messages: ['get_profile_fail'],
             content: error
         })
     }
 };

 
 exports.createSession =async (req, res) => {
    try {
         var tern = await AdminService.createSession(req.body);
         res.status(200).json({
             success: true,
             messages: ['create_session_success'],
             content: tern
         })
     } catch (error) {
       
         res.status(400).json({
             success: false,
             messages: ['create_session_fail'],
             content: error
         })
     }
 
 };

exports.getSession =async (req, res) => {
    try {
         var tern = await AdminService.getSession();
         res.status(200).json({
             success: true,
             messages: ['get_session_success'],
             content: tern
         })
     } catch (error) {
       
         res.status(400).json({
             success: false,
             messages: ['get_session_fail'],
             content: error
         })
     }
 
 };

 
 exports.startSession=async (req, res) => {
    try {
         var session = await AdminService.startSession(req.params);
         res.status(200).json({
             success: true,
             messages: ['start_session_success'],
             content: session
         })
     } catch (error) {
       
         res.status(400).json({
             success: false,
             messages: ['start_session_fail'],
             content: error
         })
     }
 };

 exports.endSession=async (req, res) => {
    try {
         var session = await AdminService.endSession(req.params);
         res.status(200).json({
             success: true,
             messages: ['end_session_success'],
             content: session
         })
     } catch (error) {
       
         res.status(400).json({
             success: false,
             messages: ['end_session_fail'],
             content: error
         })
     }
 };

 exports.deleteSession= async (req, res)=>{
    try {
        var session = await AdminService.deleteSession(req.params);
        res.status(200).json({
            success: true,
            messages: ['end_session_success'],
            content: session
        })
    } catch (error) {
      
        res.status(400).json({
            success: false,
            messages: ['end_session_fail'],
            content: error
        })
    }
 }

 exports.test= async (req, res)=>{
    try {
        var session = await AdminService.test(req.params);
        res.status(200).json({
            success: true,
            messages: ['test_success'],
            content: session
        })
    } catch (error) {
      
        res.status(400).json({
            success: false,
            messages: ['test_fail'],
            content: error
        })
    }
 }

 exports.createClass= async (req, res)=>{
    try {
        var classes = await AdminService.createClass(req.body);
        res.status(200).json({
            success: true,
            messages: ['create_class_success'],
            content: classes
        })
    } catch (error) {
      
        res.status(400).json({
            success: false,
            messages: ['create_class_fail'],
            content: error
        })
    }
 }

 exports.getClass= async (req, res)=>{
    try {
        var classes = await AdminService.getClass(req.params);
        res.status(200).json({
            success: true,
            messages: ['get_class_success'],
            content: classes
        })
    } catch (error) {
      
        res.status(400).json({
            success: false,
            messages: ['get_class_fail'],
            content: error
        })
    }
 }

 
 exports.deleteClass= async (req, res)=>{
    try {
        var listclass = await AdminService.deleteClass(req.params);
        res.status(200).json({
            success: true,
            messages: ['delete_Class_success'],
            content: listclass
        })
    } catch (error) {
      
        res.status(400).json({
            success: false,
            messages: ['delete_Class_fail'],
            content: error
        })
    }
 }

 exports.assignment= async (req, res)=>{
    try {
        var assignmentclass = await AdminService.assignment(req.params);
        res.status(200).json({
            success: true,
            messages: ['assignment_class_success'],
            content: assignmentclass
        })
    } catch (error) {
      
        res.status(400).json({
            success: false,
            messages: ['assignment_class_fail'],
            content: error
        })
    }
 }

 
 exports.getLecturer= async (req, res)=>{
    try {
        var classes = await AdminService.getLecturer(req.params);
        res.status(200).json({
            success: true,
            messages: ['get_lecturer_success'],
            content: classes
        })
    } catch (error) {
      
        res.status(400).json({
            success: false,
            messages: ['get_lecturer_fail'],
            content: error
        })
    }
 }

 exports.getlistclassofLecturer= async (req, res)=>{
    try {
        var classes = await AdminService.getlistclassofLecturer(req.params);
        res.status(200).json({
            success: true,
            messages: ['get_list_lecturer_success'],
            content: classes
        })
    } catch (error) {
      
        res.status(400).json({
            success: false,
            messages: ['get_list_lecturer_fail'],
            content: error
        })
    }
 }

 exports.setPointOfStudent =async (req, res) => {
    try {
        var classes = await AdminService.setPointOfStudent(req.body);
        res.status(200).json({
            success: true,
            messages: ['set_point_success'],
            content: classes
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ['set_point _fail'],
            content: error
        })
    }
};

exports.getStudents=async (req, res) => {
    try {
        var classes = await AdminService.getStudents(req.params);
        res.status(200).json({
            success: true,
            messages: ['get_students_success'],
            content: classes
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ['get_students_fail'],
            content: error
        })
    }
};

exports.editStudents=async (req, res) => {
    try {
        var classes = await AdminService.editStudents(req.body);
        res.status(200).json({
            success: true,
            messages: ['edit_students_success'],
            content: classes
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ['edit_students_fail'],
            content: error
        })
    }
};

exports.updateStudents=async (req, res) => {
    try {
        var classes = await AdminService.updateStudents(req.body);
        res.status(200).json({
            success: true,
            messages: ['update_students_success'],
            content: classes
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ['update_students_fail'],
            content: error
        })
    }
};