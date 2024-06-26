const { query, validationResult, matchedData } = require('express-validator')
const z = require('zod')
const { CustomError } = require('../../errors/CustomError')
const ERROR_CODES = require('../../errors/errorCodes')

validateGetProducts = [
    query('limit')
        .default(10)
        .toInt()
        .isInt({ min: 1 }),
    query('page')
        .default(1)
        .toInt()
        .isInt({ min: 1 }),
    query('category')
        .isString()
        .optional(),
    query('availability')
        .isBoolean()
        .toBoolean()
        .optional(),
    query('sort')
        .default(undefined)
        .isIn([undefined, 'asc', 'desc']),
    (req, res, next) => {
        try {
            validationResult(req).throw()
            req.query = matchedData(req)
            next()
        } catch (error) {
            res.status(400)
            res.send({ errors: error.array() })
        }
    }
]

const productSchema = z.object({
    title: z.string(),
    description: z.string(),
    code: z.string(),
    price: z.number().int().nonnegative(),
    status: z.boolean().default(true),
    stock: z.number().int().nonnegative(),
    category: z.string(),
    thumbnail: z.array(z.string().url()).optional(),
})

function validateNewProduct(req, res, next) {
    const result = productSchema.safeParse(req.body)
    if (result.success) {
        // cambia el contenido del body con los datos correctos
        req.body = result.data
        return next()
    }

    throw new CustomError({
        name: 'ValidationError',
        message: "Invalid input to create product",
        cause: result.error.errors,
        code: ERROR_CODES.INVALID_INPUT
    })
}

function validateUpdateProduct(req, res, next) {
    const result = productSchema.partial().safeParse(req.body)
    if (result.success) {
        // cambia el contenido del body con los datos correctos
        req.body = result.data
        return next()
    }

    throw new CustomError({
        name: 'ValidationError',
        message: "Invalid input to update product",
        cause: result.error.errors,
        code: ERROR_CODES.INVALID_INPUT
    })
}

module.exports = { validateGetProducts, validateNewProduct, validateUpdateProduct }