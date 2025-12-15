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
import { useQuery } from "@tanstack/react-query";
import { allPiersQueryOption } from "@/api/piers";
import FormTextArea from "@/components/global/FormTextArea";
import { PenBox, Trash2 } from "lucide-react";
import BoatDialog from "./BoatDialog";

type FormFields = {
  name: string;
  piers: string[] | number[];
  description: string;
  boats: Array<{
    id: string | number;
    boat_id: string | number;
    start_date: string;
    end_date: string;
    schedule_times: Array<{
      start_time: string;
      end_time: string;
    }>;
    tickets: Array<{
      id: string | number;
      name: string;
      short_description: string;
      options: Array<{
        option_name: string;
        market_price: number;
        net_price: number;
      }>;
    }>;
  }>;
};

const ProductForm = ({ isCreate }: { isCreate: boolean }) => {
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const { fields: boatFields } = useFieldArray({
    name: "boats",
    control,
  });

  const { data: all_piers } = useQuery({
    ...allPiersQueryOption(),
  });

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

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
        <div className="flex gap-4 mb-5">
          <div className="w-1/2 mb-6">
            <FormLabel htmlFor="name">Name</FormLabel>
            <FormInput
              id="name"
              placeholder="Enter name"
              {...register("name", {
                required: "Name is required",
              })}
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
              {boatFields.map((boat) => (
                <tr key={boat.id}>
                  <td className="w-0.5"></td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm">
                    Sample Boat
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm">
                    12-Dec-2025
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm">
                    15-Dec-2025
                  </td>
                  <td className="px-6 py-3 text-end">
                    <span>
                      <PenBox
                        size={18}
                        strokeWidth={2.1}
                        className="inline me-4 text-gray-600 cursor-pointer"
                      />
                      <Trash2
                        size={18}
                        strokeWidth={2.1}
                        className="inline text-red-600 cursor-pointer"
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
