"use client";
import {
  createOrganisationSchema,
  CreateOrganisationSchema,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Dispatch, SetStateAction } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import FormSubmitButton from "../FormSubmitButton";
import { postOrganisation } from "./actions";
import ImageDropzone from "../ImageDropzone";
import axios from "axios";
import { useRouter } from "next/navigation";

type AddOrganisationModalProps = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export default function AddOrganisationModal({
  setShowModal,
}: AddOrganisationModalProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateOrganisationSchema>({
    resolver: zodResolver(createOrganisationSchema),
    defaultValues: {
      totalDonationItemsCount: "0",
      totalDonationsCount: "0",
      totalDonationsValue: "0",
    },
  });
  const onSubmit: SubmitHandler<CreateOrganisationSchema> = async (data) => {
    // try {
    //   await postOrganisation(data);
    //   reset();
    //   setShowModal(false);
    // } catch (error) {
    //   console.log(error);
    // }
    const {
      ABN,
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
    } = data;

    const formData = new FormData();
    formData.append("ABN", ABN);
    formData.append("activeStatus", activeStatus.toString());
    formData.append("description", description);
    image.forEach((file) => formData.append("image", file));
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("summary", summary);
    formData.append("totalDonationItemsCount", totalDonationItemsCount);
    formData.append("totalDonationsCount", totalDonationsCount);
    formData.append("totalDonationsValue", totalDonationsValue);
    formData.append("website", website);
    formData.forEach(e=>console.log(e))
     
    await axios
      .post(
        "http://localhost:5000/api/organisation/create-organisation",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then(function (response) {
        console.log(response);
        // reset();
        // setShowModal(false);
        // router.push("/");
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
        <h2>Image</h2>
        <Controller
          control={control}
          render={({ field }) => <ImageDropzone field={field} />}
          name="image"
        />
        {errors.image && (
          <span className="text-red-500">{errors.image.message}</span>
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
      <FormSubmitButton className=" bg-black " isLoading={isSubmitting}>
        Submit
      </FormSubmitButton>
    </form>
  );
}
