const KoaRouter = require('koa-router');

const router = new KoaRouter();


// GET Burguers
router.get('hamburguesa', '/', async (ctx) => {
  console.log("Buscar hamburguesa");

    const hamburguesas = await ctx.orm.hamburguesa.findAll({
      attributes: ['nombre', 'precio', 'descripcion', 'imagen']
    });
    console.log(hamburguesas);

    ctx.response.body = hamburguesas;
    ctx.response.status = 200;
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
 