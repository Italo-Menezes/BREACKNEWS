import News from "../models/News.js";

export const createService = (body) => News.create(body);

export const findAllService = (offset, limit) => News.find().sort({ id: -1 }).skip(offset).limit(limit).populate
  ('user');

export const topNewsService = () => News.findOne().sort({ _id: -1 }).populate('user');

export const countNews = () => News.countDocuments();

export const findByIdService = (id) => News.findById(id).populate('user');

export const searchByTitleService = (title) => News.find({ title: { $regex: title, $options: 'i' } }).sort({ _id: -1 }).populate('user');


export const byUserService = (id) => News.find({ user: id }).sort({ _id: -1 }).populate('user');

export const updateService = (id, title, text, banner) => News.findOneAndUpdate(
  { _id: id },
  { title, text, banner },
  {
    rawResult: true,
  }
);

export const eraseService = (id) => News.findByIdAndDelete(id);

export const likeNewsService = (idnews, userId) => News.findOneAndUpdate(
  { _id: idnews, "likes.userId": { $nin: [userId] } }, { $push: { likes: { userId, create: new Date() } } }
);

export const deletelikeNewsService = (idnews, userId) => News.findOneAndUpdate(
  { _id: idnews, }, { $pull: { likes: { userId } } }
);

export const addCommentService = (idnews, comment, userId) => {
  const idComment = Math.floor(Date.now() * Math.random()).toString(36);

  return News.findOneAndUpdate(
    { id: idnews },
    {
      $push: {
        comments: { idComment, userId, comment, createdAt: new Date() }
      }
    }
  );
}

export const deleteCommentService= (idNews, idComment, userId) => News.findOneAndUpdate({ _id: idNews }, { $pull: { comments: { idComment, userId } }})





