const { Router } = require('express')
const { validateGetProducts } = require('../validations/products.validations.js')
const ProductManager = require('../dao/dbManagers/ProductManager.js')
const MessageManager = require('../dao/dbManagers/MessagesManager.js')
const CartsManager = require('../dao/dbManagers/CartsManager.js')

const pm = new ProductManager('./assets/productos.json')
const cm = new CartsManager()
const mm = new MessageManager()

const router = Router()

router.get('/home', async (req, res) => {
    const result = await pm.getProducts({ limit: Number.MAX_VALUE })
    const products = result.docs.map(p => ({
        ...p,
        thumbnail: p.thumbnail[0]
    }))
    const isEmpty = products.length === 0

    res.render('home', {
        isEmpty,
        products
    })
})

router.get('/products', validateGetProducts, async (req, res) => {
    let result = await pm.getProducts(req.query)

    const products = result.docs.map(p => ({
        ...p,
        thumbnail: p.thumbnail[0]
    }))

    res.render('products',{
        status: "success",
        payload: products,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage ? `/products?page=${result.prevPage}` : null,
        nextLink: result.hasNextPage? `/products?page=${result.nextPage}` : null
    })
})

router.get('/realtimeproducts', async (req, res) => {
    const products = await pm.getProducts({})
    res.render('realtimeproducts', { products })
})

router.get('/chat', async (_, res) => {
    const messages = await mm.getMessages()
    res.render('chat', { messages })
})

router.get('/carts/:cid', async (req, res) => {
    const products = await cm.getCartById(req.params.cid)
    console.log(products);
    res.render('carts', products)
})

module.exports = router