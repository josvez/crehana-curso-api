const data = [
        {
            "id" :1,
            "nombre": "t450",
            "marca" : "lenovo"
        },
        {
            "id" :2,
            "nombre": "x260",
            "marca" : "lenovo"
        },
        {
            "id" :3,
            "nombre": "t470",
            "marca" : "lenovo"
        }
]
// const data = []

// CALBACK TIPO SINCRONA
/* const  getDatos = () =>  {
    return datos;
} */
// CALLBACK TIPO SINCRONA AUN, AUNQUE ESTE SINCRONIZA PARA EJECUTARSE DESPUES
/* const getDatos = () => {
    setTimeout(() => data, 1500)
} */
// TIPO ASINCRONA CON PROMISE
const getDatos = () => {
    return new Promise ((resolve, reject) => {
        if (data.length == 0) {
            reject(new Error("ERROR"))
        }
        setTimeout(() => {
            resolve(data)
            return data
        }, 1500)
    })
}
// LLAMARLO EN FORMA SINCRONA
/* getDatos()
.then((data) => console.log(data)) */
// LLAMARLO EN FORMA ASINCRONA
async function asincrono () {
    const datos_asincrono = await getDatos()
    console.log(datos_asincrono)
}
asincrono()