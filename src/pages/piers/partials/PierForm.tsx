import { createPierQueryOption, showPierQueryOption, updatePierQueryOption } from "@/api/piers";
import FormButton from "@/components/global/FormButton";
import FormInput from "@/components/global/FormInput";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

type FormFields = {
  name: string;
};

const PierForm = ({ isCreate }: { isCreate: boolean }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const pierId = id ? Number(id) : 0;

  const { data: pier, isPending: isLoadingPier } = useQuery({
    ...showPierQueryOption(pierId),
    enabled: !isCreate && !!pierId,
  });

  const createMutation = useMutation({
    ...createPierQueryOption(),
    onSuccess: () => {
      navigate("/piers");
    },
  });

  const updateMutation = useMutation({
    ...updatePierQueryOption(),
    onSuccess: () => {
      navigate("/piers");
    },
  });

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  useEffect(() => {
    if (pier) {
      reset({ name: pier.name });
    }
  }, [pier, reset]);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      if (isCreate) {
        createMutation.mutate({ name: data.name });
      } else {
        updateMutation.mutate({ pierId, data: { name: data.name } });
      }

      toast.success(`Pier ${isCreate ? 'created' : 'updated'} successfully.`);
    } catch (error) {
      setError("root", {
        type: "manual",
        message: `Failed to ${isCreate ? 'create' : 'update'} pier. Please try again.`,
      });
    }
  };

  if (!isCreate && isLoadingPier) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {errors.root && (
        <div className="text-red-500 text-sm mt-1.5">{errors.root.message}</div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2.5 text-gray-700"
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
