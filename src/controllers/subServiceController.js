const db = require('../models');

const subServiceCreateApi = async (req, res) => {
    let t;
    const data = req.body;
    try {
        t = await db.sequelize.transaction();
        const subService = await db.sub_service.create(
            {
                name: data.title,
                price: data.price,
                image_url: data.sub_service_image,
                service_id: data.service_id
            },
            { transaction: t }
        );
        await t.commit();
        return res.status(201).send({
            status: true,
            message: 'sub service added successfully',
            data: { sub_service: subService }
        });
    } catch (error) {
        console.log(error);
        if (t) {
            await t.rollback();
        }
        return res.status(500).send({ status: false, message: 'Error' });
    }
};

const subServiceUpdateApi = async (req, res) => {
    let t;
    const data = req.body;
    try {
        t = await db.sequelize.transaction();
        const subService = await db.sub_service.update(
            { name: data.title, price: data.price, image_url: data.sub_service_image },
            { where: { id: data.sub_service_id, row_status: 'active' }, returning: true },
            { transaction: t }
        );
        if (subService[0]) {
            await t.commit();
            return res.status(200).send({
                status: true,
                message: 'sub service update successfully',
                data: {
                    sub_service: subService
                }
            });
        }
        return res.status(404).send({
            status: false,
            message: `sub_service_id:${data.sub_service_id} dosn't exist.`
        });
    } catch (error) {
        console.log(error);
        if (t) {
            await t.rollback();
        }
        return res.status(500).send({ status: false, message: 'Error' });
    }
};

module.exports = {
    subServiceCreateApi,
    subServiceUpdateApi
};
