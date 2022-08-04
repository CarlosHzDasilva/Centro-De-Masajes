export const enlacesHttp = () => {
    //Función generica interna de peticiones
    const peticion = (direccion) => {
      const defaultHeader = {
        accept: "application/json",
      };
      
      //Sirve para controlar si mi servidor al que hago el fetch esta caido que corte rapidamente 
      // y no se quede esperando respuesta eternamente
      //Controller nos va a permitir aborter una peticion fetch manualmente
    //   const controller = new AbortController();
      
      //Corta por tiempo si la coumicacion no se lleva acabo despues de 3 segundos
    //   setTimeout(() => controller.abort(), 3000);
  
      return fetch(direccion)
        .then((res) =>
          res.ok
            ? res.json()
            //Aqui se rechaza la promesa dado que no funciono la peticion
            : Promise.reject({
                err: true,
                status: res.status || "00",
                statusText: res.statusText || "Error en el proceso",
              })
        )
        .catch((err) => err);
    };
  
    //Llamada para hacer un get
    const get = (url) => peticion(url);
  
    return {
      get,
    };
  };
  