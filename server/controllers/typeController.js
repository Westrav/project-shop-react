const {Type} = require('../models/models')
const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res) {
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }
    async delete(req,res) {
        const {id} = req.params
        Type.destroy({where:{id}})
        return res.json({message:"type deleted", typeId:id})
    }


}

module.exports = new TypeController()
