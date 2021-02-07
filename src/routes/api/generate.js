const express = require("express");
const router = express.Router();
const isEmptyObject = require("../../utils/isEmptyObject");
const Mustache = require("mustache");
const multer = require("multer");
const puppeteer = require("puppeteer");
var upload = multer();

// @route POST api/generate/html
// @desc Generate resume
// @access Public
router.post("/html", upload.none(), async (req, res, next) => {
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
    res.setHeader("Content-type", "text/html");
    return res.send(renderedHtml);
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ errors: [{ msg: "Internal Server Error." }] });
  }
});

// @route POST api/generate/pdf
// @desc Generate resume
// @access Public
router.post("/pdf", upload.none(), async (req, res, next) => {
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

  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  try {
    var renderedHtml = Mustache.render(template, input);

    const page = await browser.newPage();
    await page.setContent(renderedHtml);
    var pdf = await page.pdf({
      format: "A4",
      margin: { top: "1cm", bottom: "1cm" },
    });

    res.setHeader("Content-type", "application/pdf");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return res.status(200).send(pdf);
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ errors: [{ msg: "Internal Server Error." }] });
  } finally {
    await browser.close();
  }
});

module.exports = router;
