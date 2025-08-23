let express = require("express");
let userControl  = require("../controller/usercont");
let courseControl = require("../controller/coursecont");
let scheduleControl= require("../controller/schedulecont");
let examControl=require("../controller/examcont");
let questionControl = require("../controller/questioncont");
let assignmentControl = require("../controller/assignmentcont");
let submissionControl = require("../controller/submissioncont");
const { route } = require("../app");
let router = express.Router();

// router.get("/",userControl.homepage);

//user registration and login
router.post("/register",userControl.register);
router.post("/login",userControl.login);

//course routes
router.post("/createCourse",courseControl.createCourse);
router.get("/viewAllCourses", courseControl.viewAllCourses);
router.get("/viewCourseById", courseControl.viewCourseById);    
router.put("/updateCourseById", courseControl.updateCourseById);
router.delete("/deleteCourseById", courseControl.deleteCourseById);
router.get("/searchSubjectByName", courseControl.searchSubjectByName);


//schedule routes
router.post("/createSchedule", scheduleControl.createSchedule);
router.get("/viewAllSchedule", scheduleControl.viewAllSchedule);
router.get("/viewScheduleById", scheduleControl.viewScheduleById);
router.put("/updateScheduleById", scheduleControl.updateScheduleById);
router.delete("/deleteScheduleById", scheduleControl.deleteScheduleById);
router.get("/searchScheduleByDate", scheduleControl.searchScheduleByDate);

//exam routes
router.post("/createExam", examControl.createExam);
router.get("/viewAllExam", examControl.viewAllExam);
router.get("/viewExamById", examControl.viewExamById);
router.put("/updateExamById", examControl.updateExamById);
router.delete("/deleteExamById/:id", examControl.deleteExamById);
router.get("/searchExamsByDate", examControl.searchExamsByDate);

// Question routes
router.post("/createQuestion",questionControl.createQuestion);
router.get("/viewAllQuestion",questionControl.viewAllQuestion);
router.get("/viewQuestionById", questionControl.viewQuestionById);
router.put("/updateQuestionById", questionControl.updateQuestionById);
router.delete("/deleteQuestionById", questionControl.deleteQuestionById);
router.get("/searchQuestionByQuestion",questionControl.searchQuestionByQuestion);

// Assign Question to Exam
router.post("/assignQuestionToExam", questionControl.assignQuestionToExam);

// Search Question by Exam Name
router.get("/searchQuestionByExam/:examName", questionControl.searchQuestionByExam);

// Search Question by Course Name
router.get("/searchQuestionByCourse/:courseName", questionControl.searchQuestionByCourse);


// Assignment routes
router.post("/assignExamToStudent",assignmentControl.assignExamToStudent);
router.get("/viewAllAssignExams/:id", assignmentControl.viewAllAssignExams);

// Submission routes
router.post("/submitExamAnswers/:id/:examId", submissionControl.submitExamAnswers);
router.get("/getExamResult/:id/:examId",submissionControl.getExamResult);
module.exports=router;