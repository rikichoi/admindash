"use client";
import { Organisation } from "@/lib/types";
import {
  editOrganisationSchema,
  EditOrganisationSchema,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import FormSubmitButton from "../FormSubmitButton";
import ImageDropzone from "../ImageDropzone";
import axios from "axios";

type EditOrganisationModalProps = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  organisation: Organisation | undefined;
  _id?: string;
};

export default function EditOrganisationModal({
  // setShowModal,
  organisation,
  _id,
}: EditOrganisationModalProps) {
  useEffect(() => {
    if (organisation) {
      setValue("ABN", organisation.ABN.toString());
      setValue("activeStatus", organisation.activeStatus);
      setValue("description", organisation.description);
      setValue("previousImages", organisation.image);
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
    }
    console.log(organisation)
  }, [organisation]);

  const {
    register,
    handleSubmit,
    setValue,
    // reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EditOrganisationSchema>({
    resolver: zodResolver(editOrganisationSchema),
    defaultValues: {
      ABN: organisation?.ABN,
      activeStatus: organisation?.activeStatus,
      description: organisation?.description,
      previousImages: organisation?.image,
      name: organisation?.name,
      phone: organisation?.phone.toString(),
      summary: organisation?.summary,
      website: organisation?.website,
      totalDonationItemsCount: organisation?.totalDonationItemsCount.toString(),
      totalDonationsCount: organisation?.totalDonationsCount.toString(),
      totalDonationsValue: organisation?.totalDonationsValue.toString(),
    },
  });


  const onSubmit: SubmitHandler<EditOrganisationSchema> = async (data) => {
    if (!_id) return;
    const {
      activeStatus,
      description,
      newImages,
      previousImages,
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

    const formData = new FormData();
    formData.append("ABN", ABN);
    formData.append("activeStatus", activeStatus.toString());
    formData.append("description", description);
    if (newImages) {
      newImages.forEach((image) => formData.append("newImages", image));
    }
    if (previousImages) {
      previousImages.forEach((image) => {
        if (image) {
          formData.append("previousImages[]", image);
        }
      });
    }
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("summary", summary);
    formData.append("totalDonationItemsCount", totalDonationItemsCount);
    formData.append("totalDonationsCount", totalDonationsCount);
    formData.append("totalDonationsValue", totalDonationsValue);
    formData.append("website", website);
    formData.forEach((e) => console.log(e));
    await axios
      .patch(
        `http://${process.env.ENDPOINT_URL}/api/organisation/edit-organisation/${_id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <h2>name</h2>
        <input className="border-2 p-2 rounded-lg" {...register("name")} />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </div>
      <div className="flex flex-col">
        <h2>ABN</h2>
        <input className="border-2 p-2 rounded-lg" {...register("ABN")} />
        {errors.ABN && (
          <span className="text-red-500">{errors.ABN.message}</span>
        )}
      </div>
      <div className="flex flex-col">
        <h2>Old Images</h2>
        <Controller
          control={control}
          render={({ field }) => (
            <ImageDropzone previousImageField={field} />
          )}
          name="previousImages"
        />
        {errors.previousImages && (
          <span className="text-red-500">{errors.previousImages.message}</span>
        )}
      </div>
      <div className="flex flex-col">
        <h2>New Images</h2>
        <Controller
          control={control}
          render={({ field }) => <ImageDropzone newImageField={field} />}
          name="newImages"
        />
        {errors.newImages && (
          <span className="text-red-500">{errors.newImages.message}</span>
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
      <FormSubmitButton
        type="submit"
        isLoading={isSubmitting}
        className="p-2 border-2 bg-black text-white hover:cursor-pointer rounded-lg"
      >
        Submit
      </FormSubmitButton>
    </form>
  );
}
