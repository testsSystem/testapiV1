var models = require("../../../models");

exports.createSession = async (req, res, nex) => {
  var response = {
    seccusss: false,
    message: [],
    data: {},
  };

  const role = await models.Users.findOne({
    where: {
      role: 2,
    },
  });

  if (!role) {
    console.log("not found llllllllllllll");
  } else {
    //   console.log( + "jjjjjjjjjjjjjj");
    models.Tests.create({
      user_id: role,
      test_key: req.body.test_key,
      test_id: req.body.test_id,
    }).then((found) => {
      if (found) {
        (response.seccusss = true), response.message.push("get seccusss");
        response.data = found;
      }
      res.send(response);
    });
  }

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
