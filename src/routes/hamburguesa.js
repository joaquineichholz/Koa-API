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
 router.get('/hamburguesa', '/:id', async (ctx) => {
  console.log('GET ONE')

  function isInteger(x) { return (Number.isInteger(Number(x))); }

  const id_ = ctx.params.id;

    if (!isInteger(id_)) {
        ctx.response.body = "id invalido";
        ctx.response.status = 400;
        console.log('id integer:', isInteger(id_))
        return
      };
 
    const hamburguesa = await ctx.orm.hamburguesa.findByPk(id_,{
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

 // GET ONE Hamburger with an id
 router.del('/hamburguesa', '/:id', async (ctx) => {
  console.log('DELETE ONE')

  function isInteger(x) { return (Number.isInteger(Number(x))); }

  const id_ = ctx.params.id;

    if (!isInteger(id_)) {
        ctx.response.body = "hamburguesa inexistente";
        ctx.response.status = 404;
        console.log('id integer:', isInteger(id_))
        return
      };
 
    const hamburguesa = await ctx.orm.hamburguesa.findByPk(id_,{
      attributes: ['id', 'nombre', 'precio', 'descripcion', 'imagen']
    });

      if (hamburguesa) {
        hamburguesa.destroy();
        ctx.response.body = "hamburguesa eliminada";
        ctx.response.status = 200;
        console.log("200")

      } else {
        console.log("404 else")
        ctx.response.body = "hamburguesa inexistente";
        ctx.response.status = 404;
      }
    })
 