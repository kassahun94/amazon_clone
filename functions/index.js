const functions = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Stripe = require("stripe");

dotenv.config();

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: "2022-11-15",
});

admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (_, res) => {
	res.status(200).json({ message: "successs!!!" });
});

app.post("/payments/create", async (req, res) => {
	const total = req.query.total;

	if (!total || isNaN(total) || total <= 0) {
		return res.status(403).json({
			message: "Total must be a valid number greater than 0",
		});
	}

	try {
		const paymentIntent = await stripeInstance.paymentIntents.create({
			amount: parseInt(total),
			currency: "usd",
		});
		res.status(201).json({
			clientSecret: paymentIntent.client_secret,
		});
	} catch (error) {
		console.error("Error creating payment intent: ", error);
		res.status(500).json({
			message: "Internal Server Error",
		});
	}
});

exports.api = functions.https.onRequest(app);
