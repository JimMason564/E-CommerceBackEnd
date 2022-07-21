const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
        include: { model: Product }
    });
    res.status(200).json(categoryData);
} catch (err) {
    res.status(500).json(err);
}
});

router.get('/:id', async (req, res) => {
  try {
    const categoryID = await Category.findByPk(req.params.id, {
        include: { model: Product }
    });
    if (!categoryID) {
        res.status(404).json({message: 'Does not match existing category'});
        return;
    }
    res.status(200).json(categoryID);
} catch (err) {
    res.status(500).json(err);
}
});


router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})

router.put('/:id', async (req, res) => {
    try{
    const categoryUpdate = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    if(!categoryUpdate){
      res.status(404).json({ message: 'Category ID not found!' });
    }
  
    res.status(200).json(categoryUpdate);
  } catch (err) {
    res.status(500).json(err.message);
  }
  });


router.delete('/:id', async (req, res) => {
    Category.destroy({
        where: {
          id: req.params.id
        }
      })
      .then(categoryData => {
        if (!categoryData) {
          res.status(404).json({ message: 'Category id not found'});
          return;
        }
        res.json(categoryData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    });

module.exports = router;
