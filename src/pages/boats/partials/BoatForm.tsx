import { createBoatQueryOption, showBoatQueryOption, updateBoatQueryOption } from "@/api/boats";
import {
  createPierQueryOption,
  showPierQueryOption,
  updatePierQueryOption,
} from "@/api/piers";
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

const BoatForm = ({ isCreate }: { isCreate: boolean }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const boatId = id ? Number(id) : 0;

  const { data: boat, isPending: isLoadingBoat } = useQuery({
    ...showBoatQueryOption(boatId),
    enabled: !isCreate && !!boatId,
  });

  const createMutation = useMutation({
    ...createBoatQueryOption(),
    onSuccess: () => {
      navigate("/boats");
    },
  });

  const updateMutation = useMutation({
    ...updateBoatQueryOption(),
    onSuccess: () => {
      navigate("/boats");
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
    if (boat) {
      reset({ name: boat.name });
    }
  }, [boat, reset]);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      if (isCreate) {
        createMutation.mutate({ name: data.name });
      } else {
        updateMutation.mutate({ boatId, data: { name: data.name } });
      }

      toast.success(`Boat ${isCreate ? "created" : "updated"} successfully.`);
    } catch (error) {
      setError("root", {
        type: "manual",
        message: `Failed to ${
          isCreate ? "create" : "update"
        } boat. Please try again.`,
      });
    }
  };

  if (!isCreate && isLoadingBoat) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {errors.root && (
        <div className="text-red-500 text-sm mt-1.5">{errors.root.message}</div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label htmlFor="name" className="block mb-2.5 text-gray-700">
            Name
          </label>
          <FormInput id="name" placeholder="Enter name" {...register("name")} />
          {errors.name && (
            <div className="text-red-500 text-sm mt-1.5">
              {errors.name.message}
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <FormButton disabled={isSubmitting}>
            {isCreate ? "Save" : "Update"}
          </FormButton>
        </div>
      </form>
    </div>
  );
};

export default BoatForm;
