const router = require('express').Router();
const { redirect } = require('express/lib/response');
const { Tag, Product, ProductTag } = require('../../models');











router.get('/', async (req, res) => {
  const getTags = await Tag.findAll({
    attributes:['id'],
    include: [{
      model: Product,
      through: ProductTag
    }]
  }) .then(getTags =>res.json(getTags))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
});
})









router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    })
    if (!tagData) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    } 
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});














router.post("/", async (req, res) => {
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});









router.put("/:id", async (req, res) => {
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateTag[0]) {
      res.status(404).json({ message: "No match" });
      return;
    }
    res.status(200).json(updateTag);
  } catch (err) {
    res.status(400).json(err);
  }
});









router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((deleteTag) => {
    res.json(deleteTag)
  })
  .catch((err) => res.json(err));
});


module.exports = router;
