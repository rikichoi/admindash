import React from "react";

type EditOrganisationModalProps = {
  name?: string;
};

export default function EditOrganisationModal({
  name,
}: EditOrganisationModalProps) {
  return <div>{name}</div>;
}
