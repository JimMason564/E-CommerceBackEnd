const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
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
  .then((tag) => {
    if (req.body.tagIds.length) {
      const TagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          tag_name,
        };
      });
      return tag.bulkCreate(TagIdArr);
    }
    res.status(200).json(tag);
  })
  .then((TagIdArr) => res.status(200).json(TagIdArr))
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
  .then(categoryData => {
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No id found'});
      return;
    }
    res.json(dbCategoryData);
  })
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