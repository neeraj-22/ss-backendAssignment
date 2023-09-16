//Service Kitchen
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.reactTest = catchAsyncErrors(async (req, res) => {

  const { nameTest } = req.params;

  const message = `Hello ${nameTest}`

  res.status(200).json({
    success: true,
    message
  })
})