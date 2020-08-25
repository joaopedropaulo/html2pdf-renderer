const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// @route POST api/generate
// @desc Generate resume
// @access Private
router.post(
  "/",
  //[
  //  [
  //    check("skills", "Skills are not properly formatted.").isArray(),
  //    check("skills", "Skills cannot be empty.").notEmpty(),
  //    check("skills.*.name", "Skill name is required.").notEmpty(),
  //    check(
  //      "skills.*.experienceLevel",
  //      "Experience level must be a number between 1 and 5."
  //    ).isIn([1, 2, 3, 4, 5]),
  //  ],
  //],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      return res.json("Hello");
    } catch (err) {
      console.error(err.message);
      return res
        .status(500)
        .json({ errors: [{ msg: "Internal Server Error." }] });
    }
  }
);

module.exports = router;
