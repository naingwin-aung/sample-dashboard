import FormButton from "@/components/global/FormButton";
import FormError from "@/components/global/FormError";
import FormInput from "@/components/global/FormInput";
import FormLabel from "@/components/global/FormLabel";
import {
  useForm,
  Controller,
  type SubmitHandler,
  useFieldArray,
} from "react-hook-form";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { allPiersQueryOption } from "@/api/piers";
import FormTextArea from "@/components/global/FormTextArea";
import { PenBox, Trash2, X } from "lucide-react";
import BoatDialog from "./BoatDialog";
import GalleryUpload from "@/components/file-upload/gallery-upload";
import type { FormProduct } from "@/types/product";
import {
  createProductQueryOption,
  showProductQueryOption,
  updateProductQueryOption,
} from "@/api/products";
import { useNavigate, useParams } from "react-router-dom";

const ProductForm = ({ isCreate }: { isCreate: boolean }) => {
  const { id } = useParams();
  const productId = id ? Number(id) : 0;

  const { data: product, isPending: isLoadingProduct } = useQuery({
    ...showProductQueryOption(productId),
    enabled: !isCreate && !!productId,
  });

  const {
    register,
    handleSubmit,
    setError,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormProduct>();

  useEffect(() => {
    if (product && !isCreate) {
      const mappedBoats = product?.boats.map((boat: any) => ({
        id: boat.id,
        boat_id: boat.boat_id,
        start_date: boat.start_date,
        end_date: boat.end_date,
        schedule_times: boat.schedule_times.map((st: any) => ({
          id: st.id,
          start_time: st.start_time,
          end_time: st.end_time,
        })),
        tickets: boat.tickets.map((t: any) => ({
          id: t.id,
          name: t.name,
          short_description: t.short_description,
          prices: t.prices.map((p: any) => ({
            id: p.id,
            name: p.name,
            selling_price: p.selling_price,
            net_price: p.net_price,
          })),
        })),
        additional_options: boat.additional_options.map((ao: any) => ({
          id: ao.id,
          option: {
            id: ao.option.id,
          },
          selling_price: ao.selling_price,
          net_price: ao.net_price,
        })),
      }));

      const names: Record<string, string> = {};
      product.boats.forEach((boat: any) => {
        if (boat.boat) names[boat.boat_id] = boat.boat.name;
      });
      setBoatNames(names);

      reset({
        name: product.name,
        description: product.description,
        piers: product.piers?.map((p: any) => p.id.toString()) || [],
        images: product.images || [],
        boats: mappedBoats,
      });
    }
  }, [product, reset, isCreate]);

  const {
    fields: boatFields,
    append: appendBoat,
    remove: removeBoat,
    update: updateBoat,
  } = useFieldArray({
    name: "boats",
    control,
    keyName: "rhf_id",
  });

  const { data: all_piers } = useQuery({
    ...allPiersQueryOption(),
  });

  const [boatNames, setBoatNames] = useState<Record<string, string>>({});

  const getBoatName = (boatId: string | number) => {
    return boatNames[boatId] || boatId;
  };

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleSaveBoat = (newBoatData: any, boatName?: string) => {
    if (boatName && newBoatData.boat_id) {
      setBoatNames((prev) => ({ ...prev, [newBoatData.boat_id]: boatName }));
    }

    if (editingIndex !== null) {
      updateBoat(editingIndex, newBoatData);
    } else {
      appendBoat(newBoatData);
    }
    setDialogOpen(false);
    setEditingIndex(null);
  };

  const handleOpenNewBoat = () => {
    setEditingIndex(null);
    setDialogOpen(true);
  };

  const handleOpenEditBoat = (index: number) => {
    setEditingIndex(index);
    setDialogOpen(true);
  };

  const navigate = useNavigate();

  const createMutation = useMutation({
    ...createProductQueryOption(),
    onSuccess: () => {
      navigate("/products");
    },
  });

  const updateMutation = useMutation({
    ...updateProductQueryOption(),
    onSuccess: () => {
      navigate("/products");
    },
  });

  const onSubmit: SubmitHandler<FormProduct> = async (data) => {
    try {
      if (isCreate) {
        createMutation.mutate(data);
      } else {
        updateMutation.mutate({ productId, data });
      }
    } catch (error) {
      setError("root", {
        type: "manual",
        message: `Failed to ${
          isCreate ? "create" : "update"
        } pier. Please try again.`,
      });
    }
  };

  if (!isCreate && isLoadingProduct) {
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
            {/* Existing Images Section */}
            <FormLabel className="text-sm font-semibold text-gray-700">
              Existing Gallery
            </FormLabel>
            <div className="flex flex-wrap gap-4 mt-3">
              {product?.images.map((img: any, index: number) => (
                <div key={img.id || index} className="relative w-24 h-24 group">
                  <img
                    src={img.url || img}
                    className="w-full h-full object-cover rounded-lg border shadow-sm"
                    alt="Product Thumbnail"
                  />
                  <button
                    type="button"
                    // onClick={() => {
                    //   const updated = product?.images.filter((_, i) => i !== index);
                    //   setValue("old_images", updated);
                    // }}
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
        <div className="flex gap-4 mb-5">
          <div className="w-1/2 mb-6">
            <FormLabel htmlFor="name">Name</FormLabel>
            <FormInput
              id="name"
              placeholder="Enter name"
              {...register("name")}
            />
            {errors.name && <FormError message={errors.name.message} />}
          </div>

          <div className="w-1/2 mb-6">
            <FormLabel htmlFor="piers">Piers</FormLabel>
            <Controller
              name="piers"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  values={field.value?.map(String)}
                  onValuesChange={field.onChange}
                >
                  <MultiSelectTrigger className="w-full">
                    <MultiSelectValue
                      overflowBehavior="wrap"
                      placeholder="Select piers..."
                    />
                  </MultiSelectTrigger>
                  <MultiSelectContent>
                    <MultiSelectGroup>
                      {all_piers?.map((pier) => (
                        <MultiSelectItem
                          className="mb-0.5"
                          key={pier.id}
                          value={pier.id.toString()}
                        >
                          {pier.name}
                        </MultiSelectItem>
                      ))}
                    </MultiSelectGroup>
                  </MultiSelectContent>
                </MultiSelect>
              )}
            />
            {errors.piers && <FormError message={errors.piers.message} />}
          </div>
        </div>

        <div className="mb-5">
          <FormLabel htmlFor="description">Description</FormLabel>
          <FormTextArea
            id="description"
            className="min-h-[120px]"
            placeholder="Enter description"
            {...register("description")}
          />
          {errors.description && (
            <FormError message={errors.description.message} />
          )}
        </div>

        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-xs mb-5">
          <table className="min-w-full divide-y divide-gray-200 shadow-lg rounded-lg">
            <thead>
              <tr>
                <td className="w-0.5">
                  <BoatDialog
                    dialogOpen={dialogOpen}
                    setDialogOpen={setDialogOpen}
                    onSaveBoat={handleSaveBoat}
                    isEditing={editingIndex !== null}
                    initialBoatData={
                      editingIndex !== null
                        ? boatFields[editingIndex]
                        : undefined
                    }
                    handleOpenNewBoat={handleOpenNewBoat}
                  />
                </td>
                <td className="px-6 py-3 text-left text-sm tracking-wide text-gray-600">
                  Name
                </td>
                <td className="px-6 py-3 text-left text-sm tracking-wide text-gray-600">
                  Available start date
                </td>
                <td className="px-6 py-3 text-left text-sm tracking-wide text-gray-600">
                  Available end date
                </td>
                <td className="px-6 py-3 text-right text-sm tracking-wide text-gray-600">
                  Action
                </td>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {boatFields.map((boat, index) => (
                <tr key={boat.id}>
                  <td className="w-0.5"></td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm">
                    {getBoatName(boat.boat_id)}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm">
                    {boat.start_date}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm">
                    {boat.end_date}
                  </td>
                  <td className="px-6 py-3 text-end">
                    <span>
                      <PenBox
                        size={18}
                        strokeWidth={2.1}
                        className="inline me-4 text-gray-600 cursor-pointer"
                        onClick={() => handleOpenEditBoat(index)}
                      />
                      <Trash2
                        size={18}
                        strokeWidth={2.1}
                        className="inline text-red-600 cursor-pointer"
                        onClick={() => removeBoat(index)}
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default ProductForm;
