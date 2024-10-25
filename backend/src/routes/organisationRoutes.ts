import express from "express";
import * as OrganisationController from "../controllers/organisationController"

const router = express.Router();

router.post("/create-organisation", OrganisationController.createOrganisation);

router.get("/get-organisations", OrganisationController.getOrganisations)

router.delete("/delete-organisation/:orgId", OrganisationController.deleteOrganisation)

router.patch("/edit-organisation/:orgId", OrganisationController.editOrganisation)

export default router;