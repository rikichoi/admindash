"use client";
import { Item } from "@/lib/types";
import { editItemSchema, EditItemSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import FormSubmitButton from "../FormSubmitButton";
import { deleteItem, editItem } from "./actions";

type EditItemModalProps = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  _id: string;
  item: Item | null;
  itemId: string | null;
};

export default function EditItemModal({
  setShowModal,
  _id,
  item,
  itemId,
}: EditItemModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EditItemSchema>({
    resolver: zodResolver(editItemSchema),
    defaultValues: {
      activeStatus: item?.activeStatus,
      description: item?.description,
      donationGoalValue: item?.donationGoalValue.toString(),
      name: item?.name,
      summary: item?.summary,
      totalDonationValue: item?.totalDonationValue.toString(),
      orgId: item?.orgId,
    },
  });

  useEffect(() => {
    if (!item) return;
    setValue("activeStatus", item.activeStatus);
    setValue("description", item.description);
    setValue("donationGoalValue", item.donationGoalValue.toString());
    setValue("name", item.name);
    setValue("summary", item.summary);
    setValue("totalDonationValue", item.totalDonationValue.toString());
    setValue("orgId", item.orgId);
  }, [item]);

  const onSubmit: SubmitHandler<EditItemSchema> = async (data) => {
    if (!itemId) return;
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (data) {
        formData.append(key, value);
      }
    });
    try {
      await editItem(formData, itemId, _id);
      reset();
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }

    // await axios
    //   .patch(`http://localhost:5000/api/item/edit-item/${itemId}`, formData, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //     reset();
    //     setShowModal(false);
    //     router.refresh();
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };

  async function delItem(e: React.FormEvent) {
    e.preventDefault();
    if (!itemId) return;
    try {
      setIsDeleting(true);
      await deleteItem(itemId, _id);
      setIsDeleting(false);
      reset();
      setShowModal(false);
    } catch (error) {
      setIsDeleting(false);
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col gap-3">
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
          className="p-2 border-2 bg-black text-white hover:cursor-pointer rounded-lg"
          isLoading={isSubmitting}
        >
          Edit Item
        </FormSubmitButton>
      </form>
      <form onSubmit={(e) => delItem(e)} className="flex flex-col">
        <FormSubmitButton
          type="submit"
          isLoading={isDeleting}
          className="p-2 border-2 bg-red-600 text-white hover:cursor-pointer rounded-lg"
        >
          Delete Item
        </FormSubmitButton>
      </form>
    </div>
  );
}
