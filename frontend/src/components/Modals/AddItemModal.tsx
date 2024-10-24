"use client";
import { createItemSchema, CreateItemSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
// import axios from "axios";
// import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type AddItemModalProps = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export default function AddItemModal({}: // setShowModal,
AddItemModalProps) {
  // const router = useRouter();
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<CreateItemSchema>({
    resolver: zodResolver(createItemSchema),
  });
  const onSubmit: SubmitHandler<CreateItemSchema> = async (data) => {
    // const {
    //   activeStatus,
    //   description,
    //   image,
    //   name,
    //   phone,
    //   summary,
    //   totalDonationItemsCount,
    //   totalDonationsCount,
    //   totalDonationsValue,
    //   website,
    //   ABN,
    // } = data;
    console.log(data);

    // await axios
    //   .post("http://localhost:5000/api/organisation/create-organisation", {
    //     activeStatus,
    //     ABN,
    //     description,
    //     image,
    //     name,
    //     phone,
    //     summary,
    //     totalDonationItemsCount,
    //     totalDonationsCount,
    //     totalDonationsValue,
    //     website,
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //     reset();
    //     setShowModal(false);
    //     router.push("/");
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <h2>Name</h2>
        <input className="border-2 p-2 rounded-lg" {...register("name")} />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </div>
      <div className="flex flex-col">
        <h2>Image</h2>
        <input
          // type="file"
          className="border-2 p-2 rounded-lg"
          {...register("itemImage")}
        />
        {errors.itemImage && (
          <span className="text-red-500">{errors.itemImage.message}</span>
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
