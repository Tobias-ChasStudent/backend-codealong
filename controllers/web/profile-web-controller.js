const learningPathModel = require("../../models/mongodb/learning-path-model");
const userLearningPathModel = require("../../models/mongodb/user-learning-path-model");
const User = require("../../models/mysql/user-model")

module.exports = {
    home: async (req, res, next) => {
        console.log("Profile controller");
        try {
            const userId = req.user.userId
            const userLearningPaths = await userLearningPathModel.findOne({ userId }).lean()
            const learningPaths = userLearningPaths.learningPaths
            res.render('profile/home', { title: "Din profil", learningPaths });
        } catch (err) {
            next(err);
        }
    },
    startPath: async (req, res, next) => {
        const pathId = req.params.id
        const userId = req.user.userId

        let userLearningPath = await userLearningPathModel.findOne({ userId });

        if (!userLearningPath) {
            userLearningPath = await userLearningPathModel.create({ userId });
        }

        if (userLearningPath.learningPaths.find(x => x.learningPath._id = pathId)) {
            return res.redirect('/profile');
        }

        const learningPath = await learningPathModel.findById(pathId);

        userLearningPath.learningPaths.push({ learningPath, startedAt: new Date() })

        await userLearningPath.save()

        res.redirect("/profile")

    }

}