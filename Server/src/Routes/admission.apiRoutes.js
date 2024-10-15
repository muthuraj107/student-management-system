const express = require("express");
const router = express.Router();
const admission = require("../Controllers/admission.controller");
const course = require("../Controllers/course.controller");
const staff = require("../Controllers/staff.controller");
const enqiry = require("../Controllers/enqiry.controller");
//addmision
router.post("/std/post", admission.create);

router.get("/std/data", admission.data);

router.put("/std/put/:id", admission.update);

router.delete("/std/delete/:id", admission.delete);
//course

router.post("/course/post", course.create);

router.get("/course/data", course.data);

router.put('/course/put/:id',course.update)
router.delete('/course/delete/:id',course.remove)
//staff

router.post("/staff/post", staff.create);

router.get("/staff/data", staff.data);

router.put("/staff/put/:id", staff.update);

router.delete("/staff/delete/:id", staff.delete);


router.post('/staff/login',staff.login)

module.exports = router;
