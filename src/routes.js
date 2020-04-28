const KoaRouter = require('koa-router');

const hamburguesa = require('./routes/hamburguesa');
const index = require('./routes/index');

const router = new KoaRouter();

router.use('/', index.routes());
console.log('\n\n\n ---------------------\n\n\t\t use /hamburguesa \n\n-------------------\n\n\n\n');
router.use('/hamburguesa', hamburguesa.routes());
//router.use('/hamburguesa/id', hamburguesa.routes());

module.exports = router;
