import Hotel from "../../models/Hotel.js"

import dbConnect from '../../lib/dbConnect'

export default async function handler(req, res) {
    const { method } = req

    await dbConnect().then(console.log("dbconnected"))

    switch (method) {
        case 'GET':
            try {
                console.log("Getting Hotels")
                const hotels = await Hotel.find();
                res.status(200).json(hotels);
            } catch (err) {
                next(err);
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}



