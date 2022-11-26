const adModel = require("../models/adModel");

exports.search = async (req, res) => {
  const { searchtext } = req.body;
  try {
    const match = {
      $or: [
        { _id: { $regex: searchtext, $options: "i" } },
        { primaryText: { $regex: searchtext, $options: "i" } },
        { headline: { $regex: searchtext, $options: "i" } },
        { description: { $regex: searchtext, $options: "i" } },
      ],
    };
    let response = await adModel.aggregate([{ $match: match }]);
    // console.log(JSON.stringify(response));
    res.status(200).json({ data: response });
  } catch (error) {
    console.log("Error in Searching : ", error.toString());
    res.status(500).json({ err: "Error in Searching!" });
  }
};
