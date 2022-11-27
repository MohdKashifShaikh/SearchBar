const adModel = require("../models/adModel");
const companyModel = require("../models//companyModel");

exports.search = async (req, res) => {
  const { searchtext } = req.body;
  try {
    const match = {
      $or: [
        { primaryText: { $regex: searchtext, $options: "i" } },
        { headline: { $regex: searchtext, $options: "i" } },
        { description: { $regex: searchtext, $options: "i" } },
      ],
    };
    // let response = await adModel.aggregate([{ $match: match }]);

    let response1 = await adModel.find().populate("companyId");

    const response2 = response1.filter((val) => {
      if (
        val.primaryText
          .toLowerCase()
          .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
          .search(searchtext.toLowerCase().replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")) >=
          0 ||
        val.headline
          .toLowerCase()
          .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
          .search(searchtext.toLowerCase().replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")) >=
          0 ||
        val.description
          .toLowerCase()
          .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
          .search(searchtext.toLowerCase().replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")) >=
          0 ||
        val.companyId.name
          .toLowerCase()
          .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
          .search(searchtext.toLowerCase().replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")) >= 0
      ) {
        return true;
      } else {
        return false;
      }
    });
    res.status(200).json({ data: response2 });
  } catch (error) {
    console.log("Error in Searching : ", error.toString());
    res.status(500).json({ err: "Error in Searching!" });
  }
};
