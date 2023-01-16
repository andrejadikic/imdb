const {schemaNews}  = require('../../common/joivalidate');
const { sequelize,  News } = require('../../models');

const getNews = async (req, res) => {
  try {
    res.status(200).json(await News.findAll())
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const updateNews = async (req, res) => {
  try {
    const { id,title, text, author } = req.body;
    const news = { title, text, author };
    
    const validate = schemaNews.validate(news);
    if (validate.error) throw new Error( validate.error.details[0].message);
   
    await News.update(news, { where: 
      {id}
    })
    .then(genre=>{
      res.status(200).json(genre);
    })
    
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const deleteNews = async (req, res) => {
  try {
    const { id } = req.body;
    await News.destroy({
      where: {id}
    })
    .then(news =>{
      res.status(200).json(news);
    })
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createNews = async (req, res) => {
  try {
    const news = req.body;
    
    const validate = schemaNews.validate(news);
    if (validate.error) throw new Error( validate.error.details[0].message);
    
    const existingNews = await News.findOne({where: {title:news.title}});
    if (existingNews) throw new Error('News already exists');

    await News.create(news).then( news =>{
      res.status(200).json(news);
    })
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

exports.getNews = getNews;
exports.deleteNews = deleteNews;
exports.updateNews = updateNews;
exports.createNews = createNews;