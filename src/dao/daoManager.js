export const getManagerCart = async () => {
    const modelCart = process.env.SELECTEDBDD == 1 ? await import('./MongoDB/models/cart.js') : await import('./Postgresql/models/cart.js');
    return modelCart;
}

export const getManagerMessages = async () => {
    const modelMessage = process.env.SELECTEDBDD == 1 ? await import('./MongoDB/models/message.js') : await import('./Postgresql/models/message.js')
    return modelMessage;
}

export const getManagerProducts = async () => {
    const modelProduct = process.env.SELECTEDBDD == 1 ? await import('./MongoDB/models/product.js') : await import('./Postgresql/models/product.js')
    return modelProduct;
}

