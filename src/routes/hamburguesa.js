const KoaRouter = require('koa-router');

const Sequelize = require('sequelize');

const router = new KoaRouter();


// GET Burguers
router.get('hamburguesa', '/', async (ctx) => {
  console.log("Buscar hamburguesa");

    const hamburguesas = await ctx.orm.hamburguesa.findAll({
      attributes: ['id', 'nombre', 'precio', 'descripcion', 'imagen'], 
      raw: true
    });

    var output = []

    for (x=0; x < hamburguesas.length; x++){
      const hamburguesa_ingrediente = await ctx.orm.hamburguesa_ingrediente.findAll({
        attributes: ['ingredienteId'],
        where: {
          'hamburguesaId': hamburguesas[x].id
        }, 
        raw: true
      });

      var ingredientes = []
      for (i=0; i<hamburguesa_ingrediente.length; i++) {
        ingredientes.push({
          "path": "https://" + ctx.request.host + "/ingrediente/" + hamburguesa_ingrediente[i].ingredienteId
        });
      }
      output.push({
        "id": hamburguesas[x].id,
        "nombre": hamburguesas[x].nombre,
        "precio": hamburguesas[x].precio,
        "descripcion": hamburguesas[x].descripcion,
        "ingredientes": ingredientes
      });
    }

    
    console.log(hamburguesas);

    ctx.response.body = output;
    ctx.response.status = 200;
    ctx.response.message = "resultados obtenidos"
 });

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
      ctx.response.message = "input invalido";
      ctx.response.status = 400;
      return
    }

    console.log(Object.keys(ctx.request.body))
    const set = new Set(Object.keys(ctx.request.body));

    if (set.size != 4) {
      ctx.response.body = "input invalido";
      ctx.response.message = "input invalido";
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

    const output = {
      "id": new_hamburguesa.id,
      "nombre": new_hamburguesa.nombre,
      "precio": new_hamburguesa.precio,
      "descripcion": new_hamburguesa.descripcion,
      "imagen": new_hamburguesa.imagen,
      "ingredientes": []
    }
    ctx.response.body = output;
    ctx.response.message = 'hamburguesa creada'
    ctx.response.status = 201;
  });

 // GET ONE Hamburger with an id
 router.get('/hamburguesa', '/:id', async (ctx) => {
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
 
    const hamburguesa = await ctx.orm.hamburguesa.findByPk(id_,{
      attributes: ['id', 'nombre', 'precio', 'descripcion', 'imagen'], 
 
    });

      if (hamburguesa) {
        const hamburguesa_ingrediente = await ctx.orm.hamburguesa_ingrediente.findAll({
          attributes: ['ingredienteId'],
          where: {
            'hamburguesaId': hamburguesa.id
          }, 
          raw: true
        });

        var ingredientes = []
        for (i=0; i<hamburguesa_ingrediente.length; i++) {
          ingredientes.push({
            "path": "https://" + ctx.request.host + "/ingrediente/" + hamburguesa_ingrediente[i].ingredienteId
          });
        }


        ctx.response.body = {"menssage": "operacion exitosa", 
        "body": 
          {
          "id": hamburguesa.id,
          "nombre": hamburguesa.nombre,
          "precio": hamburguesa.precio,
          "descripcion": hamburguesa.descripcion,
          "ingredientes": ingredientes
        }};

        ctx.response.status = 200;
        console.log("200")
        

      } else {
        console.log("404 else")
        ctx.response.body = "hamburguesa inexistente";
        ctx.response.menssage = "hamburguesa inexistente";
        ctx.response.status = 404;
      }
    })


 // DELTE ONE Hamburger with an id
 router.del('/hamburguesa', '/:id', async (ctx) => {
  console.log('DELETE ONE')

  function isInteger(x) { return (Number.isInteger(Number(x))); }

  const id_ = ctx.params.id;

    if (!isInteger(id_)) {
        ctx.response.body = "hamburguesa inexistente";
        ctx.response.message = "hamburguesa inexistente";
        ctx.response.status = 404;
        console.log('id integer:', isInteger(id_))
        return
      };
 
    const hamburguesa = await ctx.orm.hamburguesa.findByPk(id_,{
      attributes: ['id', 'nombre', 'precio', 'descripcion', 'imagen']
    });

      if (hamburguesa) {
        hamburguesa.destroy();
        ctx.response.message = "hamburguesa eliminada";
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
      ctx.response.message = "paramtros invalidos";
      ctx.response.status = 400;
      console.log('id invalido:')
      return
    };

  nombre = ctx.request.body.nombre;
  descripcion = ctx.request.body.descripcion;
  precio = ctx.request.body.precio;
  imagen = ctx.request.body.imagen;

  if (!nombre && !descripcion && !precio && !imagen) {
    ctx.response.message = "parametros invalidos";
    ctx.response.body = "parametros invalidos";
    ctx.response.status = 400;
    console.log('parametros invalido, falta al menos 1')
    return
  }

  console.log(Object.keys(ctx.request.body))
  const set = new Set(Object.keys(ctx.request.body));

  /*if (set.size != 4) {
    ctx.response.body = "parametros invalido";
    ctx.response.status = 400;
    console.log('no hay 4 exactamente parametros')
    return
  }*/

  var hamburguesa = await ctx.orm.hamburguesa.findByPk(id_,{
    attributes: ['id', 'nombre', 'precio', 'descripcion', 'imagen']
  })
    if (hamburguesa) {

      var n_input = 5;

      if (nombre) {
        nombre = hamburguesa.nombre;
        n_input--
      }
      if (!precio) {
        precio = hamburguesa.precio;
        n_input--
      }
      if (!descripcion) {
        descripcion = hamburguesa.descripcion;
        n_input--
      }
      if (!imagen) {
        imagen = hamburguesa.imagen;
        n_input--
      }

      // tengo parametro extra?
      if (n_input != set.size) {
        ctx.response.body = "parametros invalidos";
        ctx.response.message = "parametros invalidos";
        ctx.response.status = 400;
        console.log('n_input: ', n_input)
        console.log('set.size: ', set.size)
        console.log('parametros de más invalido:')
        return
      }

      console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n\n\thamburguesa", hamburguesa, '\n\n - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -');

      hamburguesa.update(ctx.request.body)
      await hamburguesa.save();
      ctx.response.body = {'id': hamburguesa.id, 
                            'nombre': hamburguesa.nombre, 
                            'precio': hamburguesa.precio, 
                            'descripcion': hamburguesa.descripcion, 
                            'imagen': hamburguesa.imagen
                          };
      ctx.response.message = "peracion exitosa"
      ctx.response.status = 200;
      console.log("200")
      return

    } else {
      console.log("404 else")
      ctx.response.body = "hamburguesa inexistente";
      ctx.response.message = "hamburguesa inexistente";
      ctx.response.status = 404;
      
    }

});

    module.exports = router;
