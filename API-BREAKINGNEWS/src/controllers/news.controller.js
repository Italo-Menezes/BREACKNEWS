import { addCommentService, deleteCommentService, createService, findAllService, countNews, topNewsService, findByIdService, searchByTitleService, byUserService, updateService, eraseService, likeNewsService, deletelikeNewsService } from '../services/news.service.js'




const create = async (req, res) => {
  try {

    const { title, text, banner } = req.body;

    if (!title || !text || !banner) {
      return res.status(400).send({ message: 'Missing params' })
    }

    await createService({
      title,
      text,
      banner,
      user: req.userId
    })

    res.status(201).send({ message: 'News created' })
  }
  catch (error) {
    res.status(500).send({ message: error.message })
  }


}

const findAll = async (req, res) => {
  try {
    let { limit, offset } = req.query;

    limit = Number(limit)
    offset = Number(offset)

    if (!limit) {
      limit = 5;
    }

    if (!offset) {
      offset = 0;
    }


    const news = await findAllService(offset, limit)
    const total = await countNews()
    const currentURl = req.baseUrl

    const next = limit + offset;
    const nexrURL = next < total ? `${currentURl}?limit=${limit}&offset=${next}` : null;


    const prev = offset - limit < 0 ? null : offset - limit;
    const prevURl = prev != null ? `${currentURl}?limit=${limit}&offset=${prev}` : null;


    if (news.length === 0) {
      return res.status(404).send({ message: 'News not found' })
    }
    res.status(200).send({
      nexrURL,
      prevURl,
      limit,
      offset,
      total,

      resuts: news.map(Item => {
        return {
          id: Item._id,
          title: Item.title,
          text: Item.text,
          banner: Item.banner,
          likes: Item.likes,
          Comments: Item.comments,
          name: Item.user.name,
          username: Item.user.username,
          avatar: Item.user.avatar,
        }
      })
    })
  }
  catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const topnews = async (req, res) => {
  try {

    const news = await topNewsService()

    if (!news) {
      return res.status(404).send({ message: 'News not found' })
    }


    res.status(200).send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        Comments: news.comments,
        name: news.user.name,
        username: news.user.username,
        avatar: news.user.avatar,
      }

    })
  }
  catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const findById = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await findByIdService(id)

    console.log(news._id)

    return res.status(200).send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        Comments: news.comments,
        name: news.user.name,
        username: news.user.username,
        avatar: news.user.avatar,
      }
    })
  }
  catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const SearchByTitle = async (req, res) => {
  try {
    const { title } = req.query;


    const news = await searchByTitleService(title);

    if (news.length === 0) {
      return res.status(404).send({ message: 'News not found' })
    }

    res.status(200).send({
      resuts: news.map((Item) => ({
        id: Item._id,
        title: Item.title,
        text: Item.text,
        banner: Item.banner,
        likes: Item.likes,
        Comments: Item.comments,
        name: Item.user.name,
        username: Item.user.username,
        avatar: Item.user.avatar,
      }
      ))
    })
  }
  catch (error) {
    res.status(500).send({ message: error.message })
  }

}

const byUser = async (req, res) => {
  try {
    const id = req.userId;

    const news = await byUserService(id)

    res.status(200).send({
      resuts: news.map((Item) => ({
        id: Item._id,
        title: Item.title,
        text: Item.text,
        banner: Item.banner,
        likes: Item.likes,
        Comments: Item.comments,
        name: Item.user.name,
        username: Item.user.username,
        avatar: Item.user.avatar,
      }
      ))
    })
  }
  catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const update = async (req, res) => {
  try {
    const { title, text, banner } = req.body;
    const { id } = req.params;

    if (!title && !text && !banner) {
      return res.status(400).send({ message: 'Missing params' })
    }

    const news = await findByIdService(id)

    const id1 = news.user._id
    const id2 = req.userId

    /* TRANSFORMANDO EM STRING  */
    const id1String = id1.toString()
    const id2String = id2.toString()


    if (id1String !== id2String) { /* comparar strings */
      return res.status(401).send({ message: 'Not authorized' })
    }

    await updateService(id, title, text, banner)

    res.status(200).send({ message: 'News updated' })

  }
  catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const erase = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await findByIdService(id)

    const id1 = news.user._id
    const id2 = req.userId

    /* TRANSFORMANDO EM STRING  */
    const id1String = id1.toString()
    const id2String = id2.toString()

    if (id1String !== id2String) { /* comparar strings */
      return res.status(401).send({ message: 'Not authorized' })
    }


    await eraseService(id)

    res.status(200).send({ message: 'News deleted' })

  }
  catch (error) {
    res.status(500).send({ message: error.message })
  }


}

const likeNews = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const newsliked = await likeNewsService(id, userId)

    console.log(newsliked)

    if (!newsliked) {
      await deletelikeNewsService(id, userId)
      return res.status(200).send({ message: 'like remove ' })
    }


    res.status(200).send({ message: 'News liked' })

  }
  catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const addComment = async (req, res) => {
  try {

    const { id } = req.params;
    const userId = req.userId;
    const { comment } = req.body

    if (!comment) {
      return res.status(400).send({ message: 'Missing params' })
    }

    await addCommentService(id, comment, userId)

    res.status(200).send({ message: 'Comment added' })
  }
  catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const deleteComment = async (req, res) => {
  try {

    const { idnews, idComment } = req.params;
    const userId = req.userId;



    const commentDelet = await deleteCommentService(idnews, idComment, userId)

    const commentFinder = commentDelet.comments.find(comment => comment.idComment === idComment)

    if(!commentFinder){
      return res.status(404).send({ message: 'Comment not found' })
    }
    


    if(commentFinder.userId !== userId){
      return res.status(401).send({ message: 'Not authorized' })
    }

    res.status(200).send({ message: 'Comment remove' })
  }
  catch (error) {
    res.status(500).send({ message: error.message })
  }
}





export {
  create,
  findAll,
  topnews,
  findById,
  SearchByTitle,
  byUser,
  update,
  erase,
  likeNews,
  addComment,
  deleteComment
}

