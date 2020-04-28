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
      // Create a hamburguesa
      console.log("crear hamburguesa")
      nombre = ctx.request.body.nombre;
      descripcion = ctx.request.body.descripcion;
      precio = ctx.request.body.precio;
      imagen = ctx.request.body.imagen;

      if (!nombre || !descripcion || !precio || ! imagen) {
        ctx.response.body = "input invalido";
        ctx.response.status = 400;
        return
      }

      console.log(Object.keys(ctx.request.body))
      const set = new Set(Object.keys(ctx.request.body));

      if (set.size != 4) {
        ctx.response.body = "input invalido";
        ctx.response.status = 400;
        return
      }

      var hamburguesas = await ctx.orm.hamburguesa.findAll({
        attributes: [[Sequelize.fn('max', Sequelize.col('id')), 'max_id']],
        raw: true,
      });

      var max_id = hamburguesas[0].max_id 

      if (!hamburguesas[0].max_id) {
        max_id = 1;
        console.log('No habian hamburguesas')
      }
      else {
        max_id++ 
      }

      const hamburguesa = {
        id: max_id,
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        imagen: imagen
      };
      
      console.log("parametros: ", hamburguesa)
    
      // Save hamburguesa in the database
      const new_hamburguesa = ctx.orm.hamburguesa.build(hamburguesa);
      new_hamburguesa.save()
      ctx.response.body = hamburguesa;
      ctx.response.message = 'hamburguesa creada'
      ctx.response.status = 201;
    });


 // DELTE ONE Hamburger with an id
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


// PATCH ONE Hamburger with an id
router.patch('hamburguesa', '/:id', async (ctx) => {
  console.log('patch burger')
  function isInteger(x) { return (Number.isInteger(Number(x))); }

  const id_ = ctx.params.id;

  if (!isInteger(id_)) {
      ctx.response.body = "paramtros invalidos";
      ctx.response.status = 400;
      console.log('id invalido:')
      return
    };

  nombre = ctx.request.body.nombre;
  descripcion = ctx.request.body.descripcion;
  precio = ctx.request.body.precio;
  imagen = ctx.request.body.imagen;

  if (!nombre || !descripcion || !precio || ! imagen) {
    ctx.response.body = "parametros invalidos";
    ctx.response.status = 400;
    console.log('parametros invalido, falta 1')
    return
  }

  console.log(Object.keys(ctx.request.body))
  const set = new Set(Object.keys(ctx.request.body));

  if (set.size != 4) {
    ctx.response.body = "parametros invalido";
    ctx.response.status = 400;
    console.log('no hay 4 exactamente parametros')
    return
  }

  var hamburguesa = await ctx.orm.hamburguesa.findByPk(id_,{
    attributes: ['id', 'nombre', 'precio', 'descripcion', 'imagen']
  })
  /*.then(burga => {
    console.log('then update')
    console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n\n\thamburguesa", burga.dataValues, '\n\n - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -');
    burga.updateAttributes({
      nombre: nombre,
      precio: precio,
      descripcion: descripcion,
      imagen: imagen
    })

    console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n\n\thamburguesa", burga, '\n\n - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -');

  })
    */

    if (hamburguesa) {
      console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n\n\thamburguesa", hamburguesa, '\n\n - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -');

      hamburguesa.update(ctx.request.body)
      await hamburguesa.save();
      ctx.response.body = {'id': hamburguesa.id, 
                            'nombre': hamburguesa.nombre, 
                            'precio': hamburguesa.precio, 
                            'descripcion': hamburguesa.descripcion, 
                            'imagen': hamburguesa.imagen};
      ctx.response.status = 200;
      console.log("200")
      return

    } else {
      console.log("404 else")
      ctx.response.body = "hamburguesa inexistente";
      ctx.response.status = 404;
      
    }

});

 

    module.exports = router;
