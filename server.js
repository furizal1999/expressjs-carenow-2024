const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const admin = require("firebase-admin");
const creds = require("./carenow-2024-firebase-adminsdk-o57sq-337cbb8d9a.json");

admin.initializeApp({
  credential: admin.credential.cert(creds),
});

const firestore = admin.firestore();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());

app.post("/api/insert-patient", async (req, res) => {
  try {
    const patientId = req.body.patientId;
    const dataSend = {
      patientId: req.body.patientId,
      patientName: req.body.patientName,
      dateOfTreatment: req.body.dateOfTreatment,
      treatmentDescription: req.body.treatmentDescription,
      medicationsPrescribed: req.body.medicationsPrescribed,
      costOfTreatment: req.body.costOfTreatment,
    };

    const response = await firestore
      .collection("Patient")
      .doc(patientId)
      .set(dataSend);
    if (response) {
      res.send(dataSend);
    } else {
      res.send("Insert data failed.");
    }
  } catch (error) {
    res.send("error: " + error);
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log("Server is running in Port: " + port);
});
