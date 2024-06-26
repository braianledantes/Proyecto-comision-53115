const { Router } = require('express')
const { validateGetProducts, validateNewProduct, validateUpdateProduct } = require('../middlewares/validations/products.validations')
const { userIsLoggedIn, validateUserRoles } = require('../middlewares/auth')
const { ROLES } = require('../data/userRoles')

const createProductsRouter = ({ productsController }) => {
    const router = Router()

    router.get('/', validateGetProducts, productsController.getPaginationProducts)
    router.post('/', userIsLoggedIn, validateUserRoles(ROLES.ADMIN, ROLES.PREMIUM), validateNewProduct, productsController.createProduct)

    router.get('/:pid', productsController.getProduct)
    router.put('/:pid', userIsLoggedIn, validateUserRoles(ROLES.ADMIN, ROLES.PREMIUM), validateUpdateProduct, productsController.updateProduct)
    router.delete('/:pid', userIsLoggedIn, validateUserRoles(ROLES.ADMIN, ROLES.PREMIUM), productsController.deleteProduct)

    return router
}

module.exports = createProductsRouter