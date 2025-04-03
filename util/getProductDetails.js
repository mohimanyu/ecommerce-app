exports.getProductDetails = (req) => {
    return {
        id: req.params.id || req.body.id || null,
        title: req.body.title || "",
        imageUrl: req.body.imageUrl || "",
        price: req.body.price || "",
        description: req.body.description || "",
    };
};
