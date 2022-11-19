const { User, Thoughts } = require("../models");

module.exports = {
  // Get all courses
  getThoughts(req, res) {
    Thoughts.find()
      .then((courses) => res.json(courses))
      .catch((err) => res.status(500).json(err));
  },
  // Get a course
  getThought(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtId })

      .select("-__v")
      .then((course) =>
        !course
          ? res.status(404).json({ message: "No course with that ID" })
          : res.json(course)
      )
      .catch((err) => {
        res.status(500).json(err);
        console.log(err);
      });
  },
  // Create a course
  createThought(req, res) {
    Thoughts.create(req.body)
      .then(async (course) => {
        // update user model
        await User.findByIdAndUpdate(
          req.body.userId,
          { $push: { thoughts: course._id } },
          { new: true }
        );
        res.json(course);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a course
  deleteThought(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No thought with that ID" });
        }
        return User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
      })
      .then(() => res.json({ message: "Thought deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a course
  updateThought(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((course) =>
        !course
          ? res.status(404).json({ message: "No course with this id!" })
          : res.json(course)
      )
      .catch((err) => res.status(500).json(err));
  },
  addReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((course) =>
        !course
          ? res.status(404).json({ message: "No course with this id!" })
          : res.json(course)
      )
      .catch((err) => res.status(500).json(err));
  },
  removeReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((course) =>
        !course
          ? res.status(404).json({ message: "No course with this id!" })
          : res.json(course)
      )
      .catch((err) => res.status(500).json(err));
  },
};
