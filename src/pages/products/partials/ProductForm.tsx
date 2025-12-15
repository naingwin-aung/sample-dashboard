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
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { allPiersQueryOption } from "@/api/piers";
import FormTextArea from "@/components/global/FormTextArea";
import { PenBox, Trash2 } from "lucide-react";
import BoatDialog from "./BoatDialog";
import GalleryUpload from "@/components/file-upload/gallery-upload";

type BoatOption = {
  id: string | number;
  option_name: string;
  market_price: number;
  net_price: number;
};

type Ticket = {
  id: string | number;
  name: string;
  short_description: string;
  options: BoatOption[];
};

type ScheduleTime = {
  id: string | number;
  start_time: string;
  end_time: string;
};

type Boat = {
  id: string | number;
  boat_id: string | number;
  start_date: string;
  end_date: string;
  schedule_times: ScheduleTime[]; // Updated to use the nested array
  tickets: Ticket[];
};

export type FormFields = {
  name: string;
  piers: string[] | number[];
  description: string;
  boats: Boat[];
  images: File[];
};

const ProductForm = ({ isCreate }: { isCreate: boolean }) => {
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const {
    fields: boatFields,
    append: appendBoat,
    remove: removeBoat,
    update: updateBoat,
  } = useFieldArray({
    name: "boats",
    control,
  });

  const { data: all_piers } = useQuery({
    ...allPiersQueryOption(),
  });

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleSaveBoat = (newBoatData: any) => {
    if (editingIndex !== null) {
      updateBoat(editingIndex, {
        ...newBoatData,
        id: boatFields[editingIndex].id,
      });
    } else {
      appendBoat({
        ...newBoatData,
        id: Math.random().toString(36).substr(2, 9),
      });
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

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      setError("root", {
        type: "manual",
        message: `Failed to ${
          isCreate ? "create" : "update"
        } pier. Please try again.`,
      });
    }
  };

  return (
    <div>
      {errors.root && (
        <div className="text-red-500 text-sm mt-1.5">{errors.root.message}</div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
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
                  onFilesChange={onChange}
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
                <MultiSelect onValuesChange={field.onChange}>
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
          <FormTextArea></FormTextArea>
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
                    {boat.boat_id}
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
