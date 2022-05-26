const { now } = require("sequelize/lib/utils");
var models = require("../../../models");

exports.createSession = async (req, res, nex) => {
  var response = {
    seccusss: false,
    message: [],
    data: {},
  };

  models.Session_tests.create({
    user_id: req.body.user_id,
    test_id: req.body.test_id,
  });

  //   console.log( + "jjjjjjjjjjjjjj");
  //   models.Tests.create({
  //     user_id: req.body.user_id,
  //     test_key: req.body.test_key,
  //     test_id: req.body.test_id,
  //   }).then((found) => {
  //     if (found) {
  //       (response.seccusss = true), response.message.push("get seccusss");
  //       response.data = found;
  //     }
  //     res.send(response);
  //   });
};

// exports.startTest = async (req, res) => {
//   var response = {
//     seccusss: false,
//     message: [],
//     data: {},
//   };
//   const { id } = req.params;
//   const updated = await models.Session_tests.findByPk(id);
//   if (updated) {
//     if (req.body.started_at) {
//       updated.started_at = req.body.started_at;
//     }
//   }
// };
// exports.endTest = (req, res) => {
//     console.log("first")
// }
