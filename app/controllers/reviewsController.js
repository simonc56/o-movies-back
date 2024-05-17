import { Review } from "../models/Review.js";   // import the Review model from the models folder
import reviewSchema from "../validation/reviewSchemas.js";  // import the reviewSchema object from the validation folder
import validateData from "../validation/validator.js";  // import the validateData file from the validation folder

const reviewsController = {
    async getReviews(req, res) {
        try {
            const reviews = await Review.findAll();
            return res.json({ status: "success", data: reviews });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: error.message });
        }
    },

    async getReviewById(req, res) {
        try {
            const review = await Review.findByPk(req.params.id);
            if (!review) {
                return res.status(404).json({ error: "Review not found" });
            }
            return res.json({ status: "success", data: true });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: error.message });
        }
    },

    async createReview(req, res) {
        try {
            const data = req.body;
            const { parsedData, errors } = validateData(data, reviewSchema.reviewSchema);
            if (errors) {
                return res.status(400).json({ error: errors });
            }
            await Review.create({
                content: parsedData.content
            })
            return res.json({ status: "success", data: true });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: error.message });
        }
    },

    async updateReview(req, res) {
        try {
            const data = req.body;
            const { parsedData, errors } = validateData(data, reviewSchema.reviewSchema);
            if (errors) {
                return res.status(400).json({ error: errors });
            }
            const review = await Review.findByPk(req.params.id);
            if (!review) {
                return res.status(404).json({ error: "Review not found" });
            }
            await review.update(parsedData);
            return res.json({ status: "success", data: true });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: error.message });
        }
    },

    async deleteReview(req, res) {
        try {
            const review = await Review.findByPk(req.params.id);
            if (!review) {
                return res.status(404).json({ error: "Review not found" });
            }
            await review.destroy();
            return res.json({ status: "success", data: true });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: error.message });
        }
    },
};

export default reviewsController;  // export the reviewsController object