import React from "react";
import LineGraph from "./Graphs/LineGraph";
type OrganisationGraphProps = {
  _id?: string;
};
export default function OrganisationGraph({ _id }: OrganisationGraphProps) {
  return (
    <div className="text-black">
      <LineGraph/>
    </div>
  );
}
