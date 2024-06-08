
const express = require('express')
const fs = require('fs')
const app = express()
const PORT = 3000

app.use(express.json())

app.post('/canciones', (req, res) => { // sirve para agregar una canción
})

app.get('/canciones', (req, res) => { // codigo para obtener las canciones
})

app.put('/canciones/:id', (req, res) => { // sirve para editar la cancion
})

app.delete('/canciones/:id', (req, res) => { //  eliminar una cancion
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})

//POST me sirve para agregar las canciones 
app.post('/canciones', (req, res) => {
    const nuevaCancion = req.body
    fs.readFile('repertorio.json', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo JSON:', err)
            res.status(500).send('Error al leer el archivo JSON')
            return
        }

        let canciones = JSON.parse(data) // codigo para asignar un id a cada cancion
        nuevaCancion.id = canciones.length + 1 // agrega una nueva cancion
        canciones.push(nuevaCancion)
        fs.writeFile('repertorio.json', JSON.stringify(canciones), (err) => {
            if (err) {
                console.error('Error al escribir en el archivo JSON:', err)
                res.status(500).send('Error al escribir en el archivo JSON')
                return
            }
            console.log('Canción agregada correctamente')
            res.send('Canción agregada correctamente')
        })
    })
})

//GET me sirve para adquirir todas las canciones que deseo utilizar
app.get('/canciones', (req, res) => {
    fs.readFile('repertorio.json', (err, data) => { // lee el archivo que contiene las canciones
        if (err) {
            console.error('Error al leer el archivo JSON:', err)
            res.status(500).send('Error al leer el archivo JSON')
            return
        }
        const canciones = JSON.parse(data)
        res.json(canciones)
    })
})


//el PUT me sirve para editar las canciones que ya tengo 
app.put('/canciones/:id', (req, res) => {
    const id = req.params.id
    const cancionActualizada = req.body

    fs.readFile('repertorio.json', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo JSON:', err)
            res.status(500).send('Error al leer el archivo JSON')
            return
        }

        let canciones = JSON.parse(data) // encuentra la cancion
        const indice = canciones.findIndex(cancion => cancion.id == id)
        if (indice === -1) {
            console.error('Canción no encontrada')
            res.status(404).send('Canción no encontrada')
            return
        }

        canciones[indice] = cancionActualizada // actualiza para la cancion nueva
        fs.writeFile('repertorio.json', JSON.stringify(canciones), (err) => {
            if (err) {
                console.error('Error al escribir en el archivo JSON:', err)
                res.status(500).send('Error al escribir en el archivo JSON')
                return
            }
            console.log('Canción actualizada correctamente')
            res.send('Canción actualizada correctamente')
        })
    })
})

//el DELETE me sirve a la hora de querer eliminar alguna cancion
app.delete('/canciones/:id', (req, res) => {
    const id = req.params.id
    fs.readFile('repertorio.json', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo JSON:', err);
            res.status(500).send('Error al leer el archivo JSON');
            return;
        }

        let canciones = JSON.parse(data)
        const indice = canciones.findIndex(cancion => cancion.id == id);
        if (indice === -1) {
            console.error('Canción no encontrada')
            res.status(404).send('Canción no encontrada')
            return
        }

        canciones.splice(indice, 1) // elimina la cancion
        fs.writeFile('repertorio.json', JSON.stringify(canciones), (err) => {
            if (err) {
                console.error('Error al escribir en el archivo JSON:', err)
                res.status(500).send('Error al escribir en el archivo JSON')
                return
            }
            console.log('Canción eliminada correctamente')
            res.send('Canción eliminada correctamente')
        })
    })
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})





