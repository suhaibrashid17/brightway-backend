const express = require('express');
const { 
  CreateTest, 
  GetTestsByClass, 
  SaveMarks, 
  GetTestDetails 
} = require('../controllers/test-controller');

const router = express.Router();

router.post("/create", CreateTest);
router.get("/getbyclass", GetTestsByClass);
router.put("/savemarks", SaveMarks);
router.get("/details", GetTestDetails);

module.exports = router;