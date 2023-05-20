const express = require("express");
const router = express.Router();
const Cow = require("../models/cow.model");
const User = require("../models/User.model");
const Sessions = require('../models/session.model')

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/ganado/add", (req, res, next) => {
  res.render("ganado/add");
});

router.get("/ganado/edit", (req, res, next) => {
  res.render("ganado/edit");
});

router.get("/cow", (req, res, next) => {
  res.render("cow");
});
router.get("/user", (req, res, next) => {

  
  User.find()
  res.render("user");
});

router.get("/ganado/list", (req, res) => {
  Cow.find().then((dataCow) => {
    console.log("ganado:", dataCow);
    res.render("ganado/list", { cow: dataCow });
  });
});

/*router.get("/ganado/add", (req, res, next) => {
  const body = req.params.body
  Cow.create(body)
  res.render("ganado/add");
});*/

router.post("/cows", async (req, res) => {
  const { number, breed, weight, price } = req.body;

  try {
    const newCow = await Cow.create({
      number,
      breed,
      weight,
      price,
    });

    res.redirect("/ganado/list");
  } catch (error) {
    console.error(error);
    res.send("Error al crear la vaca.");
  }
});

router.get("/ganado/edit/:id", (req, res, next) => {
  const id = req.params.id;
  Cow.findById(id).then((cow) => {
    console.log("VACAAAAAAAA", { cow });
    res.render(`ganado/edit`, { cow });
  });
});

router.delete("/cow/:id", (req, res) => {
  console.log("DELETE.....");
  const cowId = req.params.id;
  Cow.findByIdAndRemove(cowId)
    .then((dataCow) => {
      Cow.find().then((dataCow) => {
        console.log("ganado:", dataCow);
        res.render("ganado/list", { cow: dataCow });
      });
      // res.redirect("/", { cow: dataCow });
    })
    .catch((error) => {
      console.error(error);
      res.send("Error al eliminar la vaca.");
    });
});
router.get("/cow/:id", (req, res) => {
  const cowId = req.params.id;
  Cow.findById(cowId).then((dataCow) => {
    console.log('COOOOOOWWWWWWWW-------',{dataCow})
    res.render("cow", { cow: dataCow });
  });
});

router.post("/like/:id", async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id; // Suponiendo que ya tienes la información del usuario autenticado en el objeto req.user

  try {
    // Buscar el usuario en la base de datos y agregar el like a la vaca
    const user = await User.findById(userId);
    user.likes.push(id);
    await user.save();

    res.redirect("/ganado/list"); // Redirigir a la lista de vacas después de agregar el like
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al agregar el like");
  }
});

/* router.get('/cow/:id/edit', (req, res) => {
    const cowId = req.params.id;
  
    Cow.findById(cowId, (err, cow) => {
      if (err) {
        console.log(err);
        res.send("Error al obtener la vaca.");
      } else {
        res.render('ganado/edit', { cow: cow });
      }
    });
  }); */

router.post("/ganado/edit/:id", (req, res) => {
  const id = req.params.id;
  const updatedCowData = req.body;

  console.log({ id, updatedCowData });

  Cow.findByIdAndUpdate(id, updatedCowData, { new: true }).then(
    (response) =>{ 
      console.log('RESPONSEEEEEEEEE--------------RESPONSE -----',response)
      res.redirect("/ganado/list")
    }
  );
  /* (err, updatedCow) => {
      if (err) {
        console.log(err);
        res.send("Error al actualizar la vaca.");
      } else {
        res.redirect("/ganado/list");
      }
    } 
  );*/
});

module.exports = router;
