const express = require("express");
const router = express.Router();
const isEmptyObject = require("../../utils/isEmptyObject");
const Mustache = require("mustache");
const pdf = require("html-pdf");
const multer = require("multer");
var upload = multer();

// @route POST api/generate
// @desc Generate resume
// @access Public
router.post("/", upload.none(), async (req, res, next) => {
  if (
    isEmptyObject(req.body) ||
    req.body.template === null ||
    req.body.input === null ||
    isEmptyObject(req.body.template) ||
    isEmptyObject(req.body.input)
  ) {
    return res.status(400).json({
      error:
        "The HTML template and corresponding inputs (JSON) need to be provided.",
    });
  }

  var template = req.body.template;
  var input = JSON.parse(req.body.input);

  try {
    var renderedHtml = Mustache.render(template, input);
    pdf.create(renderedHtml).toStream((err, stream) => {
      if (err) return res.end(err.stack);
      res.setHeader("Content-type", "application/pdf");
      stream.pipe(res);
    });
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ errors: [{ msg: "Internal Server Error." }] });
  }
});

module.exports = router;
