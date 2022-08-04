export const enlacesHttp = () => {
    const peticion = (direccion, opciones) => {

        return fetch(direccion, opciones)
            .then((res) =>
                res.ok
                    ? res.json()
                    : Promise.reject({
                        err: true,
                        status: res.status || "00",
                        statusText: res.statusText || "Error en el proceso",
                    })
            )
            .catch((err) => err);
    };

    const get = (url, opciones = {}) => peticion(url, opciones);
    
    const post = (url, opciones) => peticion(url, opciones);

    const put = (url, opciones) => peticion(url, opciones);

    const remove = (url, opciones) => peticion(url, opciones);
    
    return {
        get,
        post,
        put,
        remove
    };
};
