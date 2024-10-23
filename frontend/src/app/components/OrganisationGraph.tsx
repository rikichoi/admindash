import React from "react";
type OrganisationGraphProps = {
  name?: string;
};
export default function OrganisationGraph({ name }: OrganisationGraphProps) {
  return (
    <div className="text-black">
      OrganisationGraph
      <p>Organisation name: {name}</p>
    </div>
  );
}
