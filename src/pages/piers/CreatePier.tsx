import FormButton from "@/components/global/FormButton";
import FormInput from "@/components/global/FormInput";
import { useForm, type SubmitHandler } from "react-hook-form";

type FormFields = {
  name: string;
};

const CreatePier = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error();
      console.log(data);
    } catch (error) {
      console.error(error);
      setError("name", {
        type: "manual",
        message: "Failed to create pier. Please try again.",
      });
    }
  };

  return (
    <section className="w-full lg:w-6xl mx-auto border border-gray-200 rounded-2xl p-6">
      <h1 className="text-2xl font-medium mb-8">Create Pier</h1>
      {errors.root && (
        <div className="text-red-500 text-sm mt-1.5">{errors.root.message}</div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2.5 font-medium text-gray-700"
          >
            Name
          </label>
          <FormInput
            id="name"
            placeholder="Enter name"
            {...register("name")}
          />
        </div>
        <div className="flex justify-end">
          <FormButton disabled={isSubmitting}>Save</FormButton>
        </div>
      </form>
    </section>
  );
};

export default CreatePier;
