const KoaRouter = require('koa-router');

const Sequelize = require('sequelize');

const router = new KoaRouter();



// GET hamburguesa_ingrediente
router.get('hamburguesa_ingrediente', '/', async (ctx) => {
  console.log("Buscar hamburguesa");

    const hamburguesa_ingrediente = await ctx.orm.hamburguesa_ingrediente.findAll({
      attributes: ['id', 'hamburguesaId', 'ingredienteId']
    });
    console.log(hamburguesa_ingrediente);

    ctx.response.body = hamburguesa_ingrediente;
    ctx.response.status = 200;
 });

 
// PUT new ingrediente
router.put('hamburguesa', '/:hamburguesaId/ingrediente/:ingredienteId', async (ctx) => {
    // Validate request
      // Create a ingrediente
      console.log("agregar ingrediente")

      function isInteger(x) { return (Number.isInteger(Number(x))); }
      
      hid = ctx.params.hamburguesaId;
      iid = ctx.params.ingredienteId;

      console.log('hamburguesa id: ', hid)
      console.log('ingrediente id: ', iid)

      if (!isInteger(hid)) {
        ctx.response.body = "id de hamburguesa inválido";
        ctx.response.status = 400;
        console.log('-- el id del hamburguesa id no es un numero -- ')
        return 
      }

      if (!isInteger(iid)) {
        ctx.response.body = "id de ingrediente inválido";
        ctx.response.status = 400;
        console.log('-- el id del hamburguesa id no es un numero -- ')
        return 
      }


      const ingrediente_ = await ctx.orm.ingrediente.findByPk(iid,{
        attributes: ['id', 'nombre', 'descripcion']
      });
        console.log('ingrediente', ingrediente_)
        if (!ingrediente_) {
          ctx.response.body = "ingrediente inexistente";
          ctx.response.status = 404;
          console.log('ingrediente inexistente')
          return
        }

        const hamburguesa_ = await ctx.orm.hamburguesa.findByPk(hid,{
          attributes: ['id', 'nombre', 'descripcion']
        });
        console.log('hamburguesa', hamburguesa_)

        if (!hamburguesa_) {
          ctx.response.body = "hamburguesa inexistente";
          ctx.response.status = 404;
          console.log('hamburguesa inexistente')
          return
        }

        const h_i = {
          "hamburguesaId": hid,
          "ingredienteId": iid
        }
        const hamburguesa_ingrediente = ctx.orm.hamburguesa_ingrediente.build(h_i);
        hamburguesa_ingrediente.save()
        ctx.response.body = 'Ingrediente agregado';
        ctx.response.status = 201;

    });


 // DELTE ONE ingediente with an id
 router.del('hamburguesa', '/:hamburguesaId/ingrediente/:ingredienteId', async (ctx) => {

  console.log("sacar ingrediente")

  function isInteger(x) { return (Number.isInteger(Number(x))); }
  
  hid = ctx.params.hamburguesaId;
  iid = ctx.params.ingredienteId;
  console.log("ids: ", hid, iid);

  if (!isInteger(hid)) {
    ctx.response.body = "id de hamburguesa inválido";
    ctx.response.status = 400;
    console.log('-- el id de hamburguesa id no es un numero -- ')
    return 
  }

  if (!isInteger(iid)) {
    ctx.response.body = "id de ingrediente inválido";
    ctx.response.status = 400;
    console.log('-- el id del hamburguesa id no es un numero -- ')
    return 
  }
  console.log(" - - - - - - - oooooooo - - - - - - - ");

  const ingrediente_ = await ctx.orm.ingrediente.findByPk(iid,{
    attributes: ['id', 'nombre', 'descripcion']
  });

  if (!ingrediente_) {
    ctx.response.body = "ingrediente inexistente";
    ctx.response.status = 404;
    console.log('-- el id del ingrediente ya existia -- ')
    return
  }
  console.log(" - - - - - - - xxxxxxxxxx - - - - - - - ");

  const hamburguesa = await ctx.orm.hamburguesa.findByPk(hid,{
    attributes: ['id', 'nombre', 'descripcion']
  });

  if (!hamburguesa) {
    ctx.response.body = "hamburguesa inexistente";
    ctx.response.status = 404;
    console.log('-- el id del ingrediente ya existia -- ')
    return
  }
  console.log(" - - - - - - - yyyyyyy - - - - - - - ");


  const rowDeleted = await ctx.orm.hamburguesa_ingrediente.destroy({
    where: {
      hamburguesaId: hid,
      ingredienteId: iid
      }
 });
   // rowDeleted will return number of rows deleted
   if(rowDeleted > 0){
      console.log('Deleted successfully');
      ctx.response.body = "ingrediente retirado";
      ctx.response.status = 200;
      console.log("200 - - - ")
      return 

    } else {
      console.log("404 else")
      ctx.response.body = "ingrediente inexistente en la hamburguesa";
      ctx.response.status = 404;
      console.log(" eslse 400 - - - ")
      return
    }
  
});
 

    module.exports = router;
