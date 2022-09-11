/* eslint-disable camelcase */
const db = require('../models');

const serviceCreateApi = async (req, res) => {
    let t;
    const data = req.body;

    try {
        t = await db.sequelize.transaction();
        const serviceData = {
            name: data.service_name,
            image_url: data.service_image,
            service_type: data.service_type,
            about: data.about,
            phone_number: data.service_phone_no || data.service_phone_number,
            address: data.address,
            latitude: data.location.lat || data.location.latitude,
            longitude: data.location.lng || data.location.longitude
        };
        const service = await db.service.create({ ...serviceData }, { transaction: t });
        const subServiceData = [];
        if (data.sub_services.length > 0) {
            data.sub_services.forEach(async (sub_service) => {
                subServiceData.push({
                    image_url: sub_service.sub_services_image,
                    name: sub_service.name,
                    price: sub_service.price_per,
                    service_id: service.id,
                    price_type: sub_service.price_type
                });
            });
            console.log(subServiceData);
            await db.sub_service.bulkCreate(subServiceData, { transaction: t });
        }
        const gallaryData = [];
        if (data.gallaries.length > 0) {
            data.gallaries.forEach(async (gallary) => {
                gallaryData.push({
                    image_url: gallary,
                    service_id: service.id
                });
            });
            await db.service_gallary.bulkCreate(gallaryData, { transaction: t });
        }
        await t.commit();
        return res.status(201).send({
            status: true,
            message: 'service added successfully',
            data: {
                service_id: service.id
            }
        });
    } catch (err) {
        console.log(err);
        if (t) {
            await t.rollback();
        }
        return res.status(500).send({ status: false, message: 'Error' });
    }
};

const serviceFetchApi = async (req, res) => {
    const serviceID = parseInt(req.query.service_id);
    const limit = parseInt(req.query.limit);
    const serviceType = req.query.service_type;
    let serviceModel;
    if (typeof serviceID === 'number' && serviceID > 0) {
        const service = await db.service.findByPk(serviceID);
        const sub_service = await db.sub_service.findAll({ where: { service_id: serviceID } });
        const gallaries = await db.service_gallary.findAll({ where: { service_id: serviceID } });

        serviceModel = { service: service, sub_service: sub_service, gallaries: gallaries };
    } else if (typeof limit === 'number' && limit > 0) {
        const services = await db.service.findAll({ limit: limit, order: [['id', 'DESC']] });
        serviceModel = { service: services };
    } else if (typeof serviceType === 'string') {
        const services = await db.service.findAll({
            where: { service_type: serviceType },
            include: [
                {
                    model: db.sub_service,
                    required: true
                },
                {
                    model: db.service_gallary,
                    required: true
                }
            ]
        });
        serviceModel = { service: services };
    } else {
        return res.status(400).send({ status: false, message: 'please enter service_id' });
    }
    if (!serviceModel) {
        return res.status(404).send({ status: false, message: 'No data found' });
    }

    return res.status(200).json({ status: true, data: serviceModel });
};

module.exports = {
    serviceCreateApi,
    serviceFetchApi
};
