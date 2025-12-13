import { createPierQueryOption } from "@/api/piers";
import FormButton from "@/components/global/FormButton";
import FormInput from "@/components/global/FormInput";
import { useMutation } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FormFields = {
  name: string;
};

const PierForm = ({ isCreate }: { isCreate: boolean }) => {
  const navigate = useNavigate();

  const mutation = useMutation({
    ...createPierQueryOption(),
    onSuccess: () => {
      navigate("/piers");
    },
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      mutation.mutate({ name: data.name });
    } catch (error) {
      setError("name", {
        type: "manual",
        message: "Failed to create pier. Please try again.",
      });
    }
  };
  return (
    <div>
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
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors.name && (
            <div className="text-red-500 text-sm mt-1.5">
              {errors.name.message}
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <FormButton disabled={isSubmitting}>
            {
              isCreate ? 'Save' : 'Update'
            }
          </FormButton>
        </div>
      </form>
    </div>
  );
};

export default PierForm;
