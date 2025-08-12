const router = require("express").Router();
const Paidsalaries = require("../../models/emp-manager/paidSalaries")

router.post("/", async (req, res) => {
  const emplid = req.body.emplid;
  const accountnumber = req.body.accountnumber;
  const basicsalary = req.body.basicsalary;
  const totalsalary = req.body.totalsalary;
  const paiddate = Date(req.body.paiddate);

  const newPaidsalaries = new Paidsalaries({
    emplid,
    accountnumber,
    basicsalary,
    totalsalary,
    paiddate,
  });

  newPaidsalaries.save();
  res.status(200).send({ Message: "Salary Paid" });
});

router.route("/").get(async (req, res) => {
  data = await Paidsalaries.find();
  res.status(200).send({ data: data });
});


module.exports = router;
