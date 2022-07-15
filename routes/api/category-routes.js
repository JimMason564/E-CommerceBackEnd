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
    const categoryData = await Category.findByPk(req.params.id, {
        include: { model: Product }
    });
    if (!categoryData) {
        res.status(404).json({message: 'Does not match existing category'});
        return;
    }
    res.status(200).json(categoryData);
} catch (err) {
    res.status(500).json(err);
}
});


router.post('/', (req, res) => {
  try {
    const categoryData = Category.create(req.body);
    res.status(200).json(categoryData);
} catch (err) {
    res.status(500).json(err);
}
});

router.put('/:id', (req, res) => {
   // update a category by its `id` value
   try {
    const categoryData = Category.update(req.body, {
        where: {
            id: req.params.id,
        },
    });
    if (!categoryData[0]) {
        res.status(404).json({ message: 'No category found with that id!' });
        return;
    }
    res.status(200).json(categoryData);
} catch (err) {
    res.status(500).json(err);
}
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
        where: {
            id: req.params.id,
        },
    });
    if (!categoryData) {
        res.status(404).json({ message: 'No category found with that id!' });
        return;
    }
    res.status(200).json(categoryData);
} catch (err) {
    res.status(500).json(err);
}
});

module.exports = router;
