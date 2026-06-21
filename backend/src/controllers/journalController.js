const Journal = require("../models/Journal");

const createJournal = async (req, res) => {
  try {
    const journal = await Journal.create({
  ...req.body,
  user: req.user.userId,
});
    res.status(201).json({
      success: true,
      data: journal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getJournals = async (req, res) => {
  try {
    const journals = await Journal.find({
  user: req.user.userId,
});

    res.status(200).json({
      success: true,
      count: journals.length,
      data: journals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateJournal = async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);

    if (!journal) {
      return res.status(404).json({
        success: false,
        message: "Journal not found",
      });
    }

    if (journal.user.toString() !== req.user.userId) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    const updatedJournal = await Journal.findByIdAndUpdate(
  req.params.id,
  req.body,
  {
    new: true,
    runValidators: true,
  }
);

res.status(200).json({
  success: true,
  data: updatedJournal,
});

    // UPDATE CODE WILL GO HERE NEXT

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteJournal = async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);

    if (!journal) {
      return res.status(404).json({
        success: false,
        message: "Journal not found",
      });
    }

    if (journal.user.toString() !== req.user.userId) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    await Journal.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Journal deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createJournal,
  getJournals,
  updateJournal,
  deleteJournal,
};