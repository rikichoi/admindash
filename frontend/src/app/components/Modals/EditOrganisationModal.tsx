"use client";
import { Organisation } from "@/app/lib/types";
import {
  createOrganisationSchema,
  CreateOrganisationSchema,
} from "@/app/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type EditOrganisationModalProps = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  organisation: Organisation | undefined;
};

export default function AddOrganisationModal({
  setShowModal,
  organisation,
}: EditOrganisationModalProps) {
  const router = useRouter();

  useEffect(() => {
    if (!organisation) return;
    setValue("ABN", organisation.ABN);
    setValue("activeStatus", organisation.activeStatus);
    setValue("description", organisation.description);
    setValue("image", organisation.image);
    setValue("name", organisation.name);
    setValue("phone", organisation.phone.toString());
    setValue("summary", organisation.summary);
    setValue("website", organisation.website);
    setValue(
      "totalDonationItemsCount",
      organisation.totalDonationItemsCount.toString()
    );
    setValue(
      "totalDonationsCount",
      organisation.totalDonationsCount.toString()
    );
    setValue(
      "totalDonationsValue",
      organisation.totalDonationsValue.toString()
    );
  }, [organisation]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateOrganisationSchema>({
    resolver: zodResolver(createOrganisationSchema),
    defaultValues: {
      ABN: organisation?.ABN,
      activeStatus: organisation?.activeStatus,
      description: organisation?.description,
      image: organisation?.image,
      name: organisation?.name,
      phone: organisation?.phone.toString(),
      summary: organisation?.summary,
      website: organisation?.website,
      totalDonationItemsCount: organisation?.totalDonationItemsCount.toString(),
      totalDonationsCount: organisation?.totalDonationsCount.toString(),
      totalDonationsValue: organisation?.totalDonationsValue.toString(),
    },
  });

  const onSubmit: SubmitHandler<CreateOrganisationSchema> = async (data) => {
    const {
      activeStatus,
      description,
      image,
      name,
      phone,
      summary,
      totalDonationItemsCount,
      totalDonationsCount,
      totalDonationsValue,
      website,
      ABN,
    } = data;
    console.log(data);

    if (organisation) {
      await axios
        .patch(
          `http://localhost:5000/api/organisation/edit-organisation/${organisation._id}`,
          {
            activeStatus,
            ABN,
            description,
            image,
            name,
            phone: parseInt(phone),
            summary,
            totalDonationItemsCount: parseInt(totalDonationItemsCount),
            totalDonationsCount: parseInt(totalDonationsCount),
            totalDonationsValue: parseInt(totalDonationsValue),
            website,
          }
        )
        .then(function (response) {
          console.log(response);
          reset();
          setShowModal(false);
          router.push("/");
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.error("Organisation is undefined");
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <h2>ABN</h2>
        <input className="border-2 p-2 rounded-lg" {...register("ABN")} />
        {errors.ABN && (
          <span className="text-red-500">{errors.ABN.message}</span>
        )}
      </div>
      <div className="flex flex-col">
        <h2>activeStatus</h2>
        <input
          type="checkbox"
          className="border-2 p-2 rounded-lg"
          {...register("activeStatus")}
        />
        {errors.activeStatus && (
          <span className="text-red-500">{errors.activeStatus.message}</span>
        )}
      </div>
      <div className="flex flex-col">
        <h2>description</h2>
        <input
          className="border-2 p-2 rounded-lg"
          {...register("description")}
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </div>
      <div className="flex flex-col">
        <h2>image</h2>
        <input className="border-2 p-2 rounded-lg" {...register("image")} />
        {errors.image && (
          <span className="text-red-500">{errors.image.message}</span>
        )}
      </div>
      <div className="flex flex-col">
        <h2>name</h2>
        <input className="border-2 p-2 rounded-lg" {...register("name")} />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </div>
      <div className="flex flex-col">
        <h2>phone</h2>
        <input className="border-2 p-2 rounded-lg" {...register("phone")} />
        {errors.phone && (
          <span className="text-red-500">{errors.phone.message}</span>
        )}
      </div>
      <div className="flex flex-col">
        <h2>summary</h2>
        <input className="border-2 p-2 rounded-lg" {...register("summary")} />
        {errors.summary && (
          <span className="text-red-500">{errors.summary.message}</span>
        )}
      </div>
      <div className="flex flex-col">
        <h2>website</h2>
        <input className="border-2 p-2 rounded-lg" {...register("website")} />
        {errors.website && (
          <span className="text-red-500">{errors.website.message}</span>
        )}
      </div>
      <div className="flex flex-col">
        <h2>totalDonationsCount</h2>
        <input
          className="border-2 p-2 rounded-lg"
          {...register("totalDonationsCount")}
        />
        {errors.totalDonationsCount && (
          <span className="text-red-500">
            {errors.totalDonationsCount.message}
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <h2>totalDonationItemsCount</h2>
        <input
          className="border-2 p-2 rounded-lg"
          {...register("totalDonationItemsCount")}
        />
        {errors.totalDonationItemsCount && (
          <span className="text-red-500">
            {errors.totalDonationItemsCount.message}
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <h2>totalDonationsValue</h2>
        <input
          className="border-2 p-2 rounded-lg"
          {...register("totalDonationsValue")}
        />
        {errors.totalDonationsValue && (
          <span className="text-red-500">
            {errors.totalDonationsValue.message}
          </span>
        )}
      </div>
      <input
        type="submit"
        className="p-2 border-2 bg-black text-white hover:cursor-pointer rounded-lg"
      />
    </form>
  );
}
