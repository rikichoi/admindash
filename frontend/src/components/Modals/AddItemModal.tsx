"use client";
import { createItemSchema, CreateItemSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Dispatch, SetStateAction } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import FormSubmitButton from "../FormSubmitButton";
import { postItem } from "@/server/api/actions";

type AddItemModalProps = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  _id: string;
};

export default function AddItemModal({ setShowModal, _id }: AddItemModalProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<CreateItemSchema>({
    resolver: zodResolver(createItemSchema),
  });
  const onSubmit: SubmitHandler<CreateItemSchema> = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (data) {
        formData.append(
          key,
          typeof value === "boolean" ? value.toString() : value
        );
      }
    });

    try {
      await postItem(formData, _id);
      reset();
      setShowModal(false);
    } catch (error) {
      alert(error);
    }
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
