import React from "react";
type OrganisationGraphProps = {
  _id?: string;
};
export default function OrganisationGraph({ _id }: OrganisationGraphProps) {
  return (
    <div className="text-black">
      OrganisationGraph
      <p>Organisation name: {_id}</p>
    </div>
  );
}
