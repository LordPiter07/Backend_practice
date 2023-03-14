
//1 es MongoDB, caso contrario usariamos Postgres (supuesto) o cualquier otra base que se pretenda usar.
export const getManagerProducts = async () => {
    const modelProduct = process.env.SELECTEDBDD === 1 ? await import('./MongoDB/models/Product') : await import('./FileSystem/models/Product');

    return modelProduct;
}

export const getManagerMessage = async () => {
    const modelMessage = process.env.SELECTEDBDD === 1 ? await import('./MongoDB/models/Message') : await import('./FileSystem/models/Message');

    return modelMessage;
}

