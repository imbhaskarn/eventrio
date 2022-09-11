const db = require('../models');

const eventCreateApi = async (req, res) => {
    let t;
    const data = req.body;
    try {
        t = await db.sequelize.transaction();
        const userID = data.user_id;
        const eventData = {
            image_url: data.service_image,
            description: data.service_about,
            user_id: userID
        };
        // TODO: update query as it takes time to run all
        let allServiceID;
        if (Array.isArray(data.services) && data.services.length > 0) {
            allServiceID = await data.services.filter(
                async (service) => await db.service.findByPk(service)
            );
        }
        const eventModel = await db.event.create(
            { ...eventData, services: allServiceID },
            { transaction: t }
        );
        await t.commit();
        return res
            .status(201)
            .json({ success: true, message: 'event is added', data: { eventID: eventModel.id } });
    } catch (err) {
        console.log(err);
        if (t) {
            await t.rollback();
        }
        return res.status(500).send({ status: false, message: 'Error' });
    }
};

module.exports = {
    eventCreateApi
};
