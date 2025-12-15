import FormButton from "@/components/global/FormButton";
import FormInput from "@/components/global/FormInput";
import FormLabel from "@/components/global/FormLabel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2 } from "lucide-react";
import {
  useFieldArray,
  useForm,
  type Control,
  type SubmitHandler,
} from "react-hook-form";
import type { FormFields } from "./ProductForm";
import { useEffect } from "react";

type LocalBoatForm = {
  id: string | number;
  boat_id: string | number;
  start_date: string;
  end_date: string;
  schedule_times: Array<{
    id: string | number;
    start_time: string;
    end_time: string;
  }>;
};

interface BoatDialogProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  onSaveBoat: (newBoatData: LocalBoatForm) => void;
  isEditing: boolean;
  initialBoatData?: LocalBoatForm;
}

const BoatDialog = ({
  dialogOpen,
  setDialogOpen,
  onSaveBoat,
  isEditing,
  initialBoatData,
}: BoatDialogProps) => {
  const getNewScheduleTemplate = () => ({
    id: Math.random().toString(36).substr(2, 9),
    start_time: "",
    end_time: "",
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<LocalBoatForm>({
    defaultValues: {
      boat_id: initialBoatData?.boat_id || "",
      start_date: initialBoatData?.start_date || "",
      end_date: initialBoatData?.end_date || "",
      schedule_times: initialBoatData?.schedule_times || [
        getNewScheduleTemplate(),
      ],
    },
  });

  useEffect(() => {
    if (dialogOpen) {
      reset({
        id: initialBoatData?.id || "",
        boat_id: initialBoatData?.boat_id || "",
        start_date: initialBoatData?.start_date || "",
        end_date: initialBoatData?.end_date || "",
        schedule_times: initialBoatData?.schedule_times || [
          getNewScheduleTemplate(),
        ],
      });
    }
  }, [dialogOpen, initialBoatData, reset]);

  const {
    fields: scheduleFields,
    append: appendSchedule,
    remove: removeSchedule,
  } = useFieldArray({
    control,
    name: "schedule_times",
  });

  const handleLocalSubmit: SubmitHandler<LocalBoatForm> = (data) => {
    onSaveBoat(data);
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="ms-2.5 text-gray-600 cursor-pointer hover:bg-gray-100"
        >
          <Plus size={19} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle className="mb-5">
            {isEditing ? "Edit Boat" : "Add Boat"}
          </DialogTitle>
          <form onSubmit={handleSubmit(handleLocalSubmit)}>
            <Tabs defaultValue="schedule">
              <TabsList>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
              </TabsList>
              <TabsContent value="schedule">
                <div className="flex items-center gap-4 mt-3 mb-7">
                  <div className="w-1/3">
                    <FormLabel htmlFor="boat">Boat</FormLabel>
                    <FormInput
                      id="boat"
                      placeholder="Select boat"
                      {...register("boat_id")}
                    />
                  </div>
                  <div className="w-1/3">
                    <FormLabel htmlFor="start_date">
                      Available start date
                    </FormLabel>
                    <FormInput
                      id="start_date"
                      placeholder="Select start date"
                      {...register("start_date")}
                    />
                  </div>
                  <div className="w-1/3">
                    <FormLabel htmlFor="end_date">Available end date</FormLabel>
                    <FormInput
                      id="end_date"
                      placeholder="Select end date"
                      {...register("end_date")}
                    />
                  </div>
                </div>

                <h3 className="font-medium">Schedule Times</h3>
                <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-xs mb-5 mt-3">
                  <table className="min-w-full divide-y divide-gray-200 shadow-lg rounded-lg">
                    <thead>
                      <tr>
                        <th className="w-0.5">
                          <Plus
                            size={19}
                            className="ms-2.5 text-gray-600 cursor-pointer"
                            onClick={() =>
                              appendSchedule(getNewScheduleTemplate())
                            }
                          />
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium tracking-wide text-gray-600">
                          Start time
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium tracking-wide text-gray-600">
                          End time
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium tracking-wide text-gray-600"></th>
                      </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                      {scheduleFields.map((schedule, index) => (
                        <tr key={schedule.id}>
                          <td className="w-0.5"></td>
                          <td className="px-6 py-3 whitespace-nowrap text-sm">
                            <FormInput
                              id="start_time"
                              placeholder="Enter start time"
                              {...register(
                                `schedule_times.${index}.start_time`
                              )}
                            />
                          </td>
                          <td className="px-6 py-3 whitespace-nowrap text-sm">
                            <FormInput
                              id="end_time"
                              placeholder="Enter end time"
                              {...register(`schedule_times.${index}.end_time`)}
                            />
                          </td>
                          <td className="px-6 py-3 text-end">
                            {scheduleFields.length > 1 && (
                              <span>
                                <Trash2
                                  size={18}
                                  strokeWidth={2.1}
                                  className="inline text-red-600 cursor-pointer"
                                  onClick={() => removeSchedule(index)}
                                />
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="text-end">
                  <Button className="mt-6 cursor-pointer">Next</Button>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default BoatDialog;
