const studentController = require("../controller/student");
const router = require("express").Router();

router.post("/getData",studentController.getDynamicData);
router.post("/addStudent",studentController.addStudent);
router.get("/getAllData",studentController.getAllData);
router.post("/query",studentController.getQuery)

module.exports = router;