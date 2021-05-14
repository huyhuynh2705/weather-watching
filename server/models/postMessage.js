import mongoose from 'mongoose';
// Tham khảo
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})
// Tham khảo
var PostMessage = mongoose.model('PostMessage', postSchema);
// Tham khảo
export default PostMessage;