const KoaRouter = require('koa-router');

const hamburguesa = require('./routes/hamburguesa');
const hamburguesa_ingrediente = require('./routes/hamburguesa_ingrediente');
const ingrediente = require('./routes/ingrediente');
const index = require('./routes/index');

const router = new KoaRouter();

router.use('/', index.routes());
console.log('\n\n\n ---------------------\n\n\t\t use /hamburguesa \n\n-------------------\n\n\n\n');


router.use('/hamburguesa', hamburguesa.routes());
router.use('/ingrediente', ingrediente.routes());
router.use('/hamburguesa', hamburguesa_ingrediente.routes());
router.use('/hamburguesa_ingrediente', hamburguesa_ingrediente.routes());




module.exports = router;
