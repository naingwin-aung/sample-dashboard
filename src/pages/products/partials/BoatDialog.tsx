import FormButton from "@/components/global/FormButton";
import FormInput from "@/components/global/FormInput";
import FormLabel from "@/components/global/FormLabel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2 } from "lucide-react";
import {
  useFieldArray,
  useForm,
  type FieldArrayWithId,
  type SubmitHandler,
} from "react-hook-form";
import { useEffect, useState } from "react";
import TicketItem from "./TicketItem";
import { Button } from "@/components/ui/button";
import type { FormProduct } from "@/types/product";

export type LocalBoatForm = {
  id: string | number;
  boat_id: string | number;
  start_date: string;
  end_date: string;
  schedule_times: Array<{
    id: string | number;
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
};

interface BoatDialogProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  onSaveBoat: (newBoatData: LocalBoatForm) => void;
  isEditing: boolean;
  initialBoatData?: FieldArrayWithId<FormProduct, "boats", "id">;
  handleOpenNewBoat?: () => void;
}

const BoatDialog = ({
  dialogOpen,
  setDialogOpen,
  onSaveBoat,
  isEditing,
  initialBoatData,
  handleOpenNewBoat,
}: BoatDialogProps) => {
  const [activeTab, setActiveTab] = useState<"schedule" | "tickets">(
    "schedule"
  );

  const getNewScheduleTemplate = () => ({
    id: Math.random().toString(36).substr(2, 9),
    start_time: "",
    end_time: "",
  });

  const getNewTicketTemplate = () => ({
    id: Math.random().toString(36).substr(2, 9),
    name: "",
    short_description: "",
    options: [],
  });

  const getNewOptionTemplate = () => ({
    id: Math.random().toString(36).substr(2, 9),
    option_name: "",
    market_price: 0,
    net_price: 0,
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<LocalBoatForm>();

  useEffect(() => {
    if (dialogOpen) {
      if (isEditing && initialBoatData) {
        reset({
          id: initialBoatData.id,
          boat_id: initialBoatData.boat_id,
          start_date: initialBoatData.start_date,
          end_date: initialBoatData.end_date,
          schedule_times: initialBoatData.schedule_times,
          tickets: initialBoatData.tickets,
        });
      } else {
        reset({
          id: Math.random().toString(36).substring(2, 9),
          boat_id: "",
          start_date: "",
          end_date: "",
          schedule_times: [getNewScheduleTemplate()],
          tickets: [getNewTicketTemplate()],
        });
      }
    }
  }, [dialogOpen, isEditing, initialBoatData, reset]);

  const {
    fields: scheduleFields,
    append: appendSchedule,
    remove: removeSchedule,
  } = useFieldArray({
    control,
    name: "schedule_times",
  });

  const {
    fields: ticketFields,
    append: appendTicket,
    remove: removeTicket,
  } = useFieldArray({
    control,
    name: "tickets",
  });

  const handleLocalSubmit: SubmitHandler<LocalBoatForm> = (data) => {
    onSaveBoat(data);
    setDialogOpen(false);
    setActiveTab("schedule");
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Plus
          size={19}
          className="cursor-pointer ms-3.5 text-gray-600 hover:text-gray-900"
          onClick={handleOpenNewBoat}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-5xl max-h-[95vh] overflow-y-auto">
        <DialogTitle className="mb-5">
          {isEditing ? "Edit Boat" : "Add Boat"}
        </DialogTitle>
        <DialogDescription asChild>
          <Tabs
            defaultValue={activeTab}
            value={activeTab}
            onValueChange={setActiveTab}
          >
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
                            {...register(`schedule_times.${index}.start_time`)}
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

              <div className="flex justify-end">
                <Button
                  className="bg-white text-black border-[1.8px] border-dashed hover:bg-white cursor-pointer"
                  onClick={() => setActiveTab("tickets")}
                >
                  Next
                </Button>
              </div>
            </TabsContent>

            {/* --- Tickets Tab --- */}
            <TabsContent value="tickets">
              <div className="mt-3">
                <button
                  type="button"
                  className="mb-4 flex items-center text-gray-600 cursor-pointer border border-dashed border-green-400 rounded p-2 w-max"
                  onClick={() => appendTicket(getNewTicketTemplate())}
                >
                  <Plus
                    size={18}
                    className="me-1.5 text-green-500 cursor-pointer"
                  />
                  <span className="text-sm text-green-500">Add Ticket</span>
                </button>

                {/* Map over tickets */}
                {ticketFields.map((ticket, ticketIndex) => (
                  <TicketItem
                    key={ticket.id}
                    ticketIndex={ticketIndex}
                    control={control}
                    register={register}
                    removeTicket={removeTicket}
                    getNewOptionTemplate={getNewOptionTemplate}
                  />
                ))}

                <div className="flex justify-between items-center">
                  <Button
                    className="bg-white text-black border-[1.8px] border-dashed hover:bg-white cursor-pointer"
                    onClick={() => setActiveTab("schedule")}
                  >
                    Previous
                  </Button>

                  <FormButton
                    onClick={handleSubmit(handleLocalSubmit)}
                    disabled={isSubmitting}
                  >
                    {isEditing ? "Update" : "Save"}
                  </FormButton>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default BoatDialog;
