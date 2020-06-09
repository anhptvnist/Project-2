const AdminService =require('./admin.service');
exports.get =async (req, res) => {
    try {
         var user = await AdminService.get();
        //  LogInfo(req.user.email, ' get kpi unit ',req.user.company);
         res.status(200).json({
             success: true,
             messages: ['get_kpi_unit_success'],
             content: user
         })
     } catch (error) {
       
         res.status(400).json({
             success: false,
             messages: ['get_kpi_unit_fail'],
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
             messages: ['get_kpi_unit_success'],
             content: user
         })
     } catch (error) {
       
         res.status(400).json({
             success: false,
             messages: ['get_kpi_unit_fail'],
             content: error
         })
     }
 
 };