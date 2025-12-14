import FormButton from "@/components/global/FormButton";
import FormError from "@/components/global/FormError";
import FormInput from "@/components/global/FormInput";
import FormLabel from "@/components/global/FormLabel";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
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
import { PenBox, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

type FormFields = {
  name: string;
  piers: string[] | number[];
};

const ProductForm = ({ isCreate }: { isCreate: boolean }) => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

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

  useEffect(() => {
    reset({ name: "hello", piers: ["19", "5"] });
  }, [reset]);

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
                  defaultValues={["19", "5"]}
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
                <th className="w-0.5">
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger>
                      <Plus
                        size={19}
                        className="ms-2.5 text-gray-600 cursor-pointer"
                      />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-5xl">
                      <DialogHeader>
                        <DialogTitle className="mb-5">Add Boat</DialogTitle>
                        <Tabs defaultValue="schedule">
                          <TabsList>
                            <TabsTrigger value="schedule">Schedule</TabsTrigger>
                            <TabsTrigger value="tickets">Tickets</TabsTrigger>
                          </TabsList>
                          <TabsContent value="schedule">
                            <div className="flex items-center gap-4 mt-3 mb-7">
                              <div className="w-1/3">
                                <FormLabel htmlFor="boat">Boat</FormLabel>
                                <FormInput
                                  id="boat"
                                  placeholder="Select boat"
                                />
                              </div>
                              <div className="w-1/3">
                                <FormLabel htmlFor="start_date">
                                  Available start date
                                </FormLabel>
                                <FormInput
                                  id="start_date"
                                  placeholder="Select start date"
                                />
                              </div>
                              <div className="w-1/3">
                                <FormLabel htmlFor="end_date">
                                  Available end date
                                </FormLabel>
                                <FormInput
                                  id="end_date"
                                  placeholder="Select end date"
                                />
                              </div>
                            </div>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="w-1/2">
                                <FormLabel htmlFor="start_time">
                                  Start time
                                </FormLabel>
                                <FormInput
                                  id="start_time"
                                  placeholder="Select start time"
                                />
                              </div>
                              <div className="w-1/2">
                                <FormLabel htmlFor="end_time">
                                  End time
                                </FormLabel>
                                <FormInput
                                  id="end_time"
                                  placeholder="Select end time"
                                />
                              </div>
                            </div>
                            <div className="text-end">
                              <Button className="mt-6 cursor-pointer">
                                Next
                              </Button>
                            </div>
                          </TabsContent>
                          <TabsContent value="tickets">
                            <div className="mt-3">
                              <div className="mb-4 flex items-center text-gray-600 cursor-pointer border border-dashed border-green-400 rounded p-2 w-max">
                                <Plus
                                  size={18}
                                  className="me-1.5 text-green-500 cursor-pointer"
                                />
                                <span className="text-sm text-green-500">
                                  Add Ticket
                                </span>
                              </div>
                              <div className="border border-gray-200 rounded-md p-4 mb-5">
                                <div className="flex justify-end">
                                  <div className="border border-red-600 rounded p-1 hover:border-red-700">
                                    <Trash2
                                      size={18}
                                      className=" text-red-600 hover:text-red-700 cursor-pointer"
                                    />
                                  </div>
                                </div>

                                <div className="flex items-center gap-4">
                                  <div className="w-1/2">
                                    <FormLabel htmlFor="name">Name</FormLabel>
                                    <FormInput
                                      id="name"
                                      placeholder="Enter name"
                                    />
                                  </div>

                                  <div className="w-1/2">
                                    <FormLabel htmlFor="short_description">
                                      Short description
                                    </FormLabel>
                                    <FormInput
                                      id="short_description"
                                      placeholder="Enter short description"
                                    />
                                  </div>
                                </div>

                                <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-xs mb-5 mt-6">
                                  <table className="min-w-full divide-y divide-gray-200 shadow-lg rounded-lg">
                                    <thead>
                                      <tr>
                                        <th className="w-0.5">
                                          <Plus
                                            size={19}
                                            className="ms-2.5 text-gray-600 cursor-pointer"
                                          />
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-medium tracking-wide text-gray-600">
                                          Options
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-medium tracking-wide text-gray-600">
                                          Market selling price
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-medium tracking-wide text-gray-600">
                                          Net price
                                        </th>
                                        <th className="px-6 py-3 text-right text-sm font-medium tracking-wide text-gray-600">
                                          Action
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                      <tr>
                                        <td className="w-0.5"></td>
                                        <td className="px-6 py-3 whitespace-nowrap text-sm">
                                          <FormInput
                                            id="option_name"
                                            placeholder="Enter option name"
                                          />
                                        </td>
                                        <td className="px-6 py-3 whitespace-nowrap text-sm">
                                          <FormInput
                                            id="market_price"
                                            placeholder="Enter market selling price"
                                          />
                                        </td>
                                        <td className="px-6 py-3 whitespace-nowrap text-sm">
                                          <FormInput
                                            id="net_price"
                                            placeholder="Enter net price"
                                          />
                                        </td>
                                        <td className="px-6 py-3 text-end">
                                          <span>
                                            <Trash2
                                              size={18}
                                              strokeWidth={2.1}
                                              className="inline text-red-600 cursor-pointer"
                                            />
                                          </span>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <Button className="cursor-pointer">
                                  Previous
                                </Button>
                                <Button className="cursor-pointer">
                                  Next
                                </Button>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium tracking-wide text-gray-600">
                  Name
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium tracking-wide text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="w-0.5"></td>
                <td className="px-6 py-3 whitespace-nowrap text-sm">
                  Sample Boat
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
