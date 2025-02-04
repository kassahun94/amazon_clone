const functions = require("firebase-functions");
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

// Rate limiting variables
let currentInstances = 0;
const MAX_INSTANCES = 10;

app.get("/", (_, res) => {
	res.status(200).json({ message: "success!!!" });
});

app.post("/payments/create", async (req, res) => {
	if (currentInstances >= MAX_INSTANCES) {
		return res.status(429).json({ message: "Too Many Requests" });
	}

	currentInstances++;

	const { total } = req.body;

	if (typeof total !== "number" || isNaN(total) || total <= 0) {
		currentInstances--;
		return res.status(400).json({
			message: "Total must be a valid number greater than 0",
		});
	}

	try {
		const paymentIntent = await stripeInstance.paymentIntents.create({
			amount: Math.round(total * 100),
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
	} finally {
		currentInstances--;
	}
});

exports.api = functions.https.onRequest(app);
