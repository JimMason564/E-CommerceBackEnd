const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll(
      {
        include:[{ model: Product }]
      }
    );
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async(req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id,
      {
        include: [{ model: Product }]
      });
      if (!tagData) {
        res.status(404).json({ message: 'No id found' });
        return;
      }
      res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post('/', (req, res) => {
  Tag.create(req.body)
  .then((tag) => res.status(200).json(tag))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then((tag) => res.status(200).json(tag))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', async(req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!tagData) {
      res.status(404).json({ message: 'No id found'});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;