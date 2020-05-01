const KoaRouter = require('koa-router');

const Sequelize = require('sequelize');

const router = new KoaRouter();


// GET ingediente
router.get('ingrediente', '/', async (ctx) => {
  console.log("Buscar ingrediente");

    const ingredientes = await ctx.orm.ingrediente.findAll({
      attributes: ['id', 'nombre', 'descripcion']
    });
    console.log(ingredientes);

    ctx.response.body = ingredientes;
    ctx.response.message = "resultados obtenidos";
    ctx.response.status = 200;
 });

 // GET ONE ingediente with an id
 router.get('/ingrediente', '/:id', async (ctx) => {
  console.log('GET ONE')

  function isInteger(x) { return (Number.isInteger(Number(x))); }

  const id_ = ctx.params.id;

    if (!isInteger(id_)) {
        ctx.response.body = "id invalido";
        ctx.response.message = "id invalido";
        ctx.response.status = 400;
        console.log('id integer:', isInteger(id_))
        return
      };
 
    const ingrediente = await ctx.orm.ingrediente.findByPk(id_,{
      attributes: ['id', 'nombre', 'descripcion']
    });

      if (ingrediente) {
        ctx.response.body = ingrediente;
        ctx.response.message = "operacion exitosa";
        ctx.response.status = 200;
        console.log("200")

      } else {
        console.log("404 else")
        ctx.response.body = "ingrediente inexistente";
        ctx.response.message = "ingrediente inexistente";
        ctx.response.status = 404;
      }
    })

// POST new ingrediente
router.post('ingrediente', '/', async (ctx) => {
    // Validate request
      // Create a ingrediente
      console.log("crear ingrediente")
      function isInteger(x) { return (Number.isInteger(Number(x))); }

      
      //id = ctx.request.body.id;
      nombre = ctx.request.body.nombre;
      descripcion = ctx.request.body.descripcion;

      if (!nombre || !descripcion) {
        ctx.response.body = "input invalido";
        ctx.response.message = "input invalido";
        ctx.response.status = 400;
        console.log('-- falta un input -- ')
        return
      }

      /*if (!isInteger(id)) {
        ctx.response.body = "input invalido";
        ctx.response.message = "input invalido";
        ctx.response.status = 400;
        console.log('-- el id del ingrediente id no es un numero -- ')
        return 
      }*/

      console.log(Object.keys(ctx.request.body))
      const set = new Set(Object.keys(ctx.request.body));

      if (set.size != 2){//3) {
        ctx.response.body = "input invalido";
        ctx.response.message = "input invalido";
        ctx.response.status = 400;
        console.log('-- el numero de inputs no es 3 -- ')
        return
      }

      /*const ingrediente_ = await ctx.orm.ingrediente.findByPk(id,{
        attributes: ['id', 'nombre', 'descripcion']
      });
  
        if (ingrediente_) {
          ctx.response.message = "input invalido";
          ctx.response.body = "input invalido";
          ctx.response.status = 400;
          console.log('-- el id del ingrediente ya existia -- ')
          return
  
        }*/

        var id = await ctx.orm.ingrediente.findAll({
          attributes: [[Sequelize.fn('max', Sequelize.col('id')), 'max_id']],
          raw: true,
        });
    
        var max_id = id[0].max_id 

        if (!id[0].max_id) {
          max_id = 1;
          console.log('No habian hamburguesas')
        }
        else {
          max_id++ 
        }

      const ingrediente = {
        id: max_id,
        nombre: nombre,
        descripcion: descripcion,
      };
      
      console.log("parametros: ", ingrediente)
    
      // Save ingrediente in the database
      const new_ingrediente = ctx.orm.ingrediente.build(ingrediente);
      new_ingrediente.save()
      ctx.response.body = new_ingrediente;
      ctx.response.message = 'ingrediente creada'
      ctx.response.status = 200;
    });


 // DELTE ONE ingediente with an id
 router.del('/ingrediente', '/:id', async (ctx) => {
  console.log('DELETE ONE')

  function isInteger(x) { return (Number.isInteger(Number(x))); }

  const id_ = ctx.params.id;

    if (!isInteger(id_)) {
        ctx.response.body = "ingrediente inexistente";
        ctx.response.message = "ingrediente inexistente";
        ctx.response.status = 404;
        console.log('id integer:', isInteger(id_))
        return
      };
 
    const ingrediente = await ctx.orm.ingrediente.findByPk(id_,{
      attributes: ['id', 'nombre', 'descripcion']
    });

      if (ingrediente) {
        ingrediente.destroy();
        ctx.response.body = "ingrediente eliminada";
        ctx.response.message = "ingrediente eliminada";
        ctx.response.status = 200;
        console.log("200")

      } else {
        console.log("404 else")
        ctx.response.body = "ingrediente inexistente";
        ctx.response.message = "ingrediente inexistente";
        ctx.response.status = 404;
      }
    })
 

    module.exports = router;
