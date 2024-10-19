import express from "express";
import * as OrganisationController from "../controllers/organisationController"

const router = express.Router();

router.post("/create-organisation", OrganisationController.createOrganisation);

router.get("/get-organisations", OrganisationController.getOrganisations)

export default router;