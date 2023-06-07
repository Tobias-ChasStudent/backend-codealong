const LearningPath = require('./../../models/mongodb/learning-path-model')

module.exports = {
    home: async (req, res) => {
        let learningPaths = await LearningPath.find().lean()
        console.log(learningPaths);
        if (learningPaths.length === 0) {
            const learningPath = new LearningPath({
                title: "Grunder i python",
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                estimatedHours: 40,
                steps: ["Starta programmet", "Se video 1", "Gör uppgift 1", "Se video 2", "Gör uppgift 2", "Se video 3", "Gör uppgift 3", "Gör slut uppgift"]
            })
            const learningPath2 = new LearningPath({
                title: "Mer av python",
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                estimatedHours: 40,
                steps: ["Starta programmet", "Se video 1", "Gör uppgift 1", "Se video 2", "Gör uppgift 2", "Se video 3", "Gör uppgift 3", "Gör slut uppgift"]
            })

            await learningPath.save()
            await learningPath2.save()

            learningPaths = await LearningPath.find().lean()
        }

        res.render('home', {
            title: "KodCampus Start",
            learningPaths
        });
    }
}