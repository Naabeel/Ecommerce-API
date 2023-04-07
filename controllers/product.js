const Product = require("../models/Products");
const db = require("../config/mongoose");

module.exports.home = function (req, res) {
  Product.find({}, function (err, product) {
    if (err) {
      console.log("error while finding the products");
      return;
    }

    return res.render("home", {
      title: "Products",
      Products: product,
    });
  });
};

// for adding the product to the database
module.exports.addproduct = function (req, res) {
  console.log(req.body);

  Product.create(req.body, function (err) {
    if (err) {
      console.log("error");
      return;
    }
    return res.redirect("back");
  });
};

// for updating the product
module.exports.updating = function (req, res) {
  console.log(req.body);

  Product.findByIdAndUpdate(req.params.id, req.body, function (err) {
    if (err) {
      console.log("error while updating the product");
      return;
    }
    return res.redirect("back");
  });
};

// for deleting the product
module.exports.delete = function (req, res) {
  console.log(req.params);
  Product.findByIdAndDelete(req.params.id, function (err) {
    if (err) {
      console.log("error while deleting the product");
      return;
    }

    return res.redirect("back");
  });
};

// Controllers for API testing and all
module.exports.addProducttodb = function (req, res) {
  Product.create(req.body, function (err) {
    if (err) {
      console.log("err");
      return;
    }

    return res.json(200, {
      message: "data added to the schema",
    });
  });
};

module.exports.findallproduct = async function (req, res) {
  const product = await Product.find({});

  return res.json(200, {
    message: "found all the products",
    data: {
      products: product,
    },
  });
};

module.exports.deleteProduct = function (req, res) {
  console.log(req.params.id);
  Product.findByIdAndDelete(req.params.id, function (err) {
    if (err) {
      return res.json(500, {
        message: "unable to delete",
      });
    }
    return res.json(200, {
      message: "Product Deleted",
    });
  });
};

// for updating the Quantity of the products
module.exports.updation = async function (req, res) {
  Product.findById(req.params.id, function (err, product) {
    console.log(product);
    if (err) {
      return res.json(500, { message: "unable to update" });
    }

    if (product) {
      Product.findByIdAndUpdate(
        req.params.id,
        {
          id: product.id,
          name: product.name,
          quantity: parseInt(product.quantity) + parseInt(req.query.number),
        },
        function (err) {
          if (err) {
            console.log("error");
            return;
          }
        }
      );
    }
    return res.json(200, {
      message: "Product Updated",
    });
  });
};
