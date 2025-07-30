let express = require("express");
let examControl  = require("../controller/examcontrol");
let scheduleControl= require("../controller/schedulecont");
let router = express.Router();

router.get("/",examControl.homepage);
router.post("/register",examControl.register);
router.post("/login",examControl.login);

router.post("/createschedule", scheduleControl.createSchedule);


module.exports=router;