const db = require('../models');

const paymentCreateAPI = async (req, res) => {
    let t;
    const data = req.body;
    try {
        t = await db.sequelize.transaction();
        const payment = await db.payment.create(
            {
                package_id: data.package_id,
                payment_request_id: data.payment_request_id,
                amount: data.amount
            },
            { transaction: t }
        );
        await db.package_cart.update(
            { status: 'paid' },
            { where: { id: data.package_id } },
            { transaction: t }
        );
        await t.commit();
        return res.status(201).json({
            success: true,
            message: 'payment is created',
            data: { package_id: payment.id }
        });
    } catch (err) {
        console.log(err);
        if (t) {
            await t.rollback();
        }
        return res.status(500).send({ status: false, message: 'Error' });
    }
};

module.exports = {
    paymentCreateAPI
};
