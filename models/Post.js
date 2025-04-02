const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true     // 앞 뒤 공백 제거
    },
    content : {
        type : String,
        required: true
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',   // User 모델과 연결 (Foreign Key)
        required : true
    }, // 작성자 (User 모델과 연결)
    views : {
        type : Number,
        default : 0 // 기본값 : 0 (조회수 초기화)
    }
},{timestamps : true});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;