const KoaRouter = require('koa-router');

const Sequelize = require('sequelize');

const router = new KoaRouter();


// GET Burguers
router.get('hamburguesa', '/', async (ctx) => {
  console.log("Buscar hamburguesa");

    const hamburguesas = await ctx.orm.hamburguesa.findAll({
      attributes: ['id', 'nombre', 'precio', 'descripcion', 'imagen']
    });
    console.log(hamburguesas);

    ctx.response.body = hamburguesas;
    ctx.response.status = 200;
 });

 // GET ONE Hamburger with an id
 router.get('hamburguesa/:id', '/', async (ctx) => {
  console.log('GET ONE')
    if (!ctx.request.body.id) {
        res.status(400).send({
          message: "id invalido"
        });
        return;
      }

    const id_ = ctx.request.body.id;
  
    const hamburguesa = await ctx.orm.hamburguesa.findByPk({
      where: {id: id_},
      attributes: ['id', 'nombre', 'precio', 'descripcion', 'imagen']
    });

      if (hamburguesa) {
        ctx.response.body = hamburguesa;
        ctx.response.status = 200;
        console.log("200")

      } else {
        console.log("404 else")
        ctx.response.body = "hamburguesa inexistente";
        ctx.response.status = 404;
      }
    })
      /*.catch(err => {
        console.log("404 error")
        res.status(404).send({
          message: "hamburguesa inexistente" // revisar si es un error no encontrar la hamburguesa 
        });
      });*/

// POST new Hamburger
router.post('burgers', '/', async (ctx) => {
  // Validate request
  /* if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  */
    // Create a Hamburger
    console.log("crear hamburguesa")
    const hamburguesas = await ctx.orm.hamburguesa.findAll({
      attributes:  [Sequelize.fn('max', Sequelize.col('id'))],
      raw: true,
     });
    console.log('hamburguesas:',hamburguesas[0].max)

    var id_ = hamburguesas[0].max;
    if (!id_){
      console.log(' id:', id_)
      id_ = 1;

     // console.log('max_id', max_id)

    }
    else {
      id_ += 1; 
      console.log('else', id_)

    }
    console.log('fuera else', id_)

    const hamburger = {
      id:id_,
      nombre: ctx.request.body.nombre,
      descripcion: ctx.request.body.descripcion,
      precio: ctx.request.body.precio,
      imagen: ctx.request.body.imagen
    };

    
    console.log("parametros: ", hamburger)
  
    // Save Hamburger in the database
    const new_burger = ctx.orm.hamburguesa.build(hamburger);
    new_burger.save({fields: ['id', 'nombre', 'precio', 'descripcion', 'foto']})
    ctx.response.body = new_burger;
    ctx.response.status = 201;

  });

// POST new hamburguesa
router.post('hamburguesa', '/', async (ctx) => {
    // Validate request
    /* if (!req.body.title) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
    */
      // Create a hamburguesa
      console.log("crear hamburguesa")
      const hamburguesa = {
        nombre: ctx.request.body.nombre,
        descripcion: ctx.request.body.descripcion,
        precio: ctx.request.body.precio,
        imagen: ctx.request.body.imagen
      };
      
      console.log("parametros: ", hamburguesa)
    
      // Save hamburguesa in the database
      const new_hamburguesa = ctx.orm.hamburguesa.build(hamburguesa);
      ctx.assert('new_hamburguesa', 200, 'logrado');


    });

module.exports = router;

/*
router.get('hamburguesas', '/', async (ctx) => {
  ctx.orm.hamburguesa.findAll(req, res);

  .then(data => {
    console.log("200")
    res.status(200).send(data);
  })
  .catch(err => {
    console.log("500 error -- :(")
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving hamburguesas."
    });
  });

  //await ctx.render('hamburguesas/index', { hamburguesas });
});

module.exports = router;
*/
 