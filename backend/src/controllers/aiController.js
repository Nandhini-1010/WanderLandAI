const {
  generateSummary,
} = require("../services/geminiService");

const getSummary = async (
  req,
  res
) => {
  try {
    const { content } = req.body;

    const summary =
      await generateSummary(content);

    res.status(200).json({
      success: true,
      summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getSummary,
};