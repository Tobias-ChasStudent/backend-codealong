const userLearningPathModel = require('../../models/mongodb/user-learning-path-model')

module.exports = {
    updateStep: async (req, res) => {
        const {
            pathId,
            stepId
        } = req.body
        const userId = req.user.userId

        const userLearningPath = await userLearningPathModel.findOne({
            userId
        })
        const learningPath = userLearningPath.learningPaths.find(x => x._id = pathId)

        const step = learningPath.learningPath.steps.find(x => x._id == stepId)

        step.done = !step.done

        await userLearningPath.save()

        res.sendStatus(200)
    }
}