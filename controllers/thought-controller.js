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
    Thoughts.findOne({ _id: req.params.thoughId })

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
      .then((course) => res.json(course))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a course
  deleteThought(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
      .then((user) => {
        if (user) {
          res.status(404).json({ message: "No user with that ID" });
        }
      })
      .then(() => res.json({ message: "Course and students deleted!" }))
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
      { _id: req.params.reactionId },
      { $pull: { reactions: req.params.reactionId } },
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
