"use client";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  example: string;
  exampleRequired: string;
};

export default function ItemForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form
      className="m-auto flex flex-col gap-3 border-2 rounded-xl p-12 max-w-3xl w-full text-black"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-3xl">Make a donation</h1>
      {/* register your input into the hook by invoking the "register" function */}
      <input
        className="border p-2"
        defaultValue="test"
        {...register("example")}
      />

      {/* include validation with required or other standard HTML validation rules */}
      <input
        className="border p-2"
        {...register("exampleRequired", { required: true })}
      />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

      <input className="p-3 hover:cursor-pointer hover:bg-slate-900 bg-black rounded-lg text-white" type="submit" />
    </form>
  );
}
