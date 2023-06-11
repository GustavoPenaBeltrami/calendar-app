const { response } = require("express")
const Evento = require("../models/Evento")


const getEventos = async (req, res = response) => {

    const eventos = await Evento.find().populate('user', 'name');

    try {
        res.json({
            ok: true,
            eventos
        })

    } catch (error) {
        console.log(error)
        res.json({
            ok: false
        })
    }
}


const crearEvento = async (req, res = response) => {


    const evento = new Evento(req.body)

    try {

        evento.user = req.uid
        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error status 500: Talk with administration'
        });
    }
}


const actualizarEvento = async (req, res = response) => {

    const eventoId = req.params.id
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe evento con ese id'
            })
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tienes permisos necesarios'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });

        return res.json({
            ok: true,
            evento: eventoActualizado
        })

    } catch (error) {
        console.log(error)
        return res.json({
            ok: false
        })
    }
}


const borrarEvento = async (req, res = response) => {

    //lo que recibe en el url
    const eventoId = req.params.id

    //el id del usuario que envia la peticion, lo saca del token
    const uid = req.uid;


    try {

        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe evento con ese id'
            })
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tienes permisos necesarios'
            })
        }

        await Evento.findByIdAndDelete(eventoId);
        return res.json({
            ok: true,
            eventoId,
            uid
        })

    } catch (error) {
        console.log(error)
        return res.json({
            ok: false,
        })
    }
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    borrarEvento
}