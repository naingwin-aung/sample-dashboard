import { allBoatTypeQueryOption } from "@/api/boat-types";
import {
  createBoatQueryOption,
  showBoatQueryOption,
  updateBoatQueryOption,
} from "@/api/boats";
import GalleryUpload from "@/components/file-upload/gallery-upload";
import FormButton from "@/components/global/FormButton";
import FormInput from "@/components/global/FormInput";
import FormLabel from "@/components/global/FormLabel";
import { useMutation, useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

type FormFields = {
  name: string;
  images: File[];
  boat_type_id: number;
  capacity: number;
  zones: Array<{
    id: number;
    images: File[];
    name: string;
    capacity: number;
  }>
};

const BoatForm = ({ isCreate }: { isCreate: boolean }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const boatId = id ? Number(id) : 0;

  const { data: all_boat_types } = useQuery({
    ...allBoatTypeQueryOption(),
  });

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
    control,
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
        {!isCreate && (
          <div className="mb-8 p-6 border rounded-xl bg-white shadow-xs">
            <FormLabel className="text-sm font-semibold text-gray-700">
              Existing Gallery
            </FormLabel>
            <div className="flex flex-wrap gap-4 mt-3">
              {boat?.images.map((img: any, index: number) => (
                <div key={img.id || index} className="relative w-24 h-24 group">
                  <img
                    src={img.url || img}
                    className="w-full h-full object-cover rounded-lg border shadow-sm"
                    alt="Product Thumbnail"
                  />
                  <button
                    type="button"
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-5">
          {/* <GalleryUpload /> */}
          <Controller
            name="images"
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <>
                <GalleryUpload
                  maxFiles={10}
                  maxSize={2 * 1024 * 1024}
                  onFilesChange={(files) => {
                    const fileObjects = files
                      .map((f) => f.file)
                      .filter((file): file is File => file instanceof File);
                    onChange(fileObjects);
                  }}
                />
                {error && (
                  <p className="text-red-500 text-sm">{error.message}</p>
                )}
              </>
            )}
          />
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-1/2">
            <label htmlFor="name" className="block mb-2.5 text-gray-700">
              Name
            </label>
            <FormInput
              id="name"
              placeholder="Enter name"
              {...register("name")}
            />
            {errors.name && (
              <div className="text-red-500 text-sm mt-1.5">
                {errors.name.message}
              </div>
            )}
          </div>
          <div className="w-1/2">
            <label
              htmlFor="boat_type_id"
              className="block mb-2.5 text-gray-700"
            >
              Type
            </label>
            <FormInput
              id="boat_type_id"
              placeholder="Enter boat type id"
              {...register("boat_type_id")}
            />
            {errors.boat_type_id && (
              <div className="text-red-500 text-sm mt-1.5">
                {errors.boat_type_id.message}
              </div>
            )}
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="name" className="block mb-2.5 text-gray-700">
            Capacity
          </label>
          <FormInput id="capacity" placeholder="Enter capacity" {...register("capacity")} />
          {errors.capacity && (
            <div className="text-red-500 text-sm mt-1.5">
              {errors.capacity.message}
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
