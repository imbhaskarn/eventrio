const db = require('../models');

const packageCreateApi = async (req, res) => {
    let t;
    const data = req.body;
    try {
        const t = await db.sequelize.transaction();
        const userID = req.payload.userID;
        const dataPkgData = {
            image_url: data.package_image,
            name: data.package_name,
            date: data.package_date,
            time: data.package_time,
            user_id: userID
        };
        const packageCart = await db.package_cart.create(dataPkgData, { transaction: t });
        await t.commit();
        return res.status(201).json({
            success: true,
            message: 'Package is generated',
            data: { package_id: packageCart.id }
        });
    } catch (err) {
        console.log(err);
        if (t) {
            await t.rollback();
        }
        return res.status(500).send({ status: false, message: 'Error' });
    }
};

const packageServiceAddApi = async (req, res) => {
    let t;
    const data = req.body;
    let packageTotalPrice = 0;
    try {
        t = await db.sequelize.transaction();
        const packageID = data.package_id;
        const services = data.services.map((service) => {
            packageTotalPrice = service.total_price + packageTotalPrice;
            return {
                service_id: service.service_id,
                package_cart_id: packageID,
                total_service_price: service.total_price,
                total_guest: service.total_guest,
                sub_service: service.sub_service,
                price: service.price
            };
        });
        const package = await db.package_cart.findByPk(packageID);
        console.log('total Price :' + packageTotalPrice);
        if (package.total_price != null) {
            packageTotalPrice = parseFloat(packageTotalPrice) + parseFloat(package.total_price);
        }
        console.log(package.package_total_price);
        await db.service_package.bulkCreate(services, { order: [['id', 'DESC']], transaction: t });
        await db.package_cart.update(
            { total_price: packageTotalPrice },
            { where: { id: packageID } },
            { transaction: t }
        );
        await t.commit();
        return res.status(201).json({
            success: true,
            message: 'Services added to package'
        });
    } catch (err) {
        console.log(err);
        if (t) {
            await t.rollback();
        }
        return res.status(500).send({ status: false, message: 'Error' });
    }
};

const packageFetchApi = async (req, res) => {
    const userID = req.payload.userID;
    const packageID = parseInt(req.query.package_id);
    const limit = parseInt(req.query.limit);
    let packageModel;
    if (typeof packageID === 'number' && packageID > 0) {
        const package = await db.package_cart.findOne({
            where: { id: packageID, user_id: userID }
        });
        const packageService = await db.sequelize.query(
            'select * from service_packages s join services  pc on s.service_id  =pc.id where s.package_cart_id  =$packageID',
            {
                bind: { packageID: packageID }
            }
        );
        packageModel = { packages: package, package_service: packageService[0] };
    } else if (typeof limit === 'number' && limit > 0) {
        const packagemodel = await db.package_cart.findAll({
            where: { user_id: userID },
            limit: limit,
            order: [['id', 'DESC']]
        });
        packageModel = { packages: packagemodel };
    } else {
        return res.status(400).send({ status: false, message: 'please enter package_id' });
    }
    if (!packageModel) {
        return res.status(404).send({ status: false, message: 'No data found' });
    }
    return res.status(200).json({ status: true, data: packageModel });
};

module.exports = {
    packageCreateApi,
    packageServiceAddApi,
    packageFetchApi
};
