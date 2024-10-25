"use client";
import { createItemSchema, CreateItemSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type AddItemModalProps = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  _id: string;
};

export default function AddItemModal({
  setShowModal,
  _id,
}: AddItemModalProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateItemSchema>({
    resolver: zodResolver(createItemSchema),
  });
  const onSubmit: SubmitHandler<CreateItemSchema> = async (data) => {
    const {
      activeStatus,
      description,
      donationGoalValue,
      name,
      summary,
      totalDonationValue,
      itemImage,
      orgId,
    } = data;

    const formData = new FormData();
    formData.append("activeStatus", activeStatus.toString());
    formData.append("description", description);
    formData.append("donationGoalValue", donationGoalValue);
    formData.append("name", name);
    formData.append("summary", summary);
    formData.append("totalDonationValue", totalDonationValue);
    formData.append("itemImage", itemImage);
    formData.append("orgId", orgId);

    await axios
      .post("http://localhost:5000/api/item/create-item", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(function (response) {
        console.log(response);
        reset();
        setShowModal(false);
        router.push("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <input hidden value={_id} {...register("orgId")}></input>
      <div className="flex flex-col">
        <h2>Name</h2>
        <input className="border-2 p-2 rounded-lg" {...register("name")} />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </div>
      <div className="flex flex-col">
        <h2>Image</h2>
        <Controller
          control={control}
          render={({ field }) => (
            <input
              type="file"
              onChange={(e) => {
                field.onChange(e.target.files?.[0]);
              }}
              className="border-2 p-2 rounded-lg"
            />
          )}
          name="itemImage"
        />
        {errors.itemImage && (
          <span className="text-red-500">
            {errors.itemImage?.message as string}
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <h2>Active Status</h2>
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
        <h2>Summary</h2>
        <input className="border-2 p-2 rounded-lg" {...register("summary")} />
        {errors.summary && (
          <span className="text-red-500">{errors.summary.message}</span>
        )}
      </div>
      <div className="flex flex-col">
        <h2>Description</h2>
        <input
          className="border-2 p-2 rounded-lg"
          {...register("description")}
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </div>
      <div className="flex flex-col">
        <h2>donationGoalValue</h2>
        <input
          className="border-2 p-2 rounded-lg"
          {...register("donationGoalValue")}
        />
        {errors.donationGoalValue && (
          <span className="text-red-500">
            {errors.donationGoalValue.message}
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <h2>totalDonationValue</h2>
        <input
          className="border-2 p-2 rounded-lg"
          {...register("totalDonationValue")}
        />
        {errors.totalDonationValue && (
          <span className="text-red-500">
            {errors.totalDonationValue.message}
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
