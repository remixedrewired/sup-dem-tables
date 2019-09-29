const { Router } = require("express");
const planningCtrl = require("../controllers");
const { cache } = require("../middleware");

const router = Router();

router.get("/planning/all", cache, planningCtrl.getAll);
router.get("/planning/:id", cache, planningCtrl.getOne);
router.post("/planning", planningCtrl.createOne);
router.delete("/planning/:id", cache, planningCtrl.deleteOne);
module.exports = router;
