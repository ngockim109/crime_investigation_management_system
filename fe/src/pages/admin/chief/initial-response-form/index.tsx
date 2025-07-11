import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon } from "lucide-react"
import { useParams } from "react-router-dom"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import PatrolOfficersList from "./components/patrol-officer-list"
import MedicalRescueSupport from "./components/medical-supports"
import ScenePreservationMeasures from "./components/scene-preservation-measures"
import moment from "moment"
import { toast } from "react-toastify"
import { initialResponseApi } from "@/api/initial-response"
import { resetInitialResponse, setMedicalSupports, setPreservationMeasures } from "@/redux/reduxInitialResponse"
import { toUSATimeISOString } from "@/utils/date"

export default function InitialResponseForm() {
  const dispatch = useDispatch()
  const { caseId } = useParams<{ caseId: string }>()
  const case_id = caseId || ""

  const [arrivalTime, setArrivalTime] = useState("")
  const [arrivalPeriod, setArrivalPeriod] = useState("")
  const [assessment, setAssessment] = useState("")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [month, setMonth] = useState<Date | undefined>(date)
  const [openDatePicker, setOpenDatePicker] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [initialResponseId, setInitialResponseId] = useState<string | undefined>(undefined)

  const preservationMeasures = useSelector((state: RootState) => state.initialResponse.preservation_measures)
  const medicalSupports = useSelector((state: RootState) => state.initialResponse.medical_supports)

  const fetchInitialResponse = async () => {
    if (!caseId) return
    dispatch(resetInitialResponse())
    setIsLoading(true)
    try {
      const res = await initialResponseApi.getInitialResponseByCaseId(caseId)
      const data = res.data
      setInitialResponseId(data.initial_responses_id)
      setDate(new Date(data.dispatching_time))
      setAssessment(data.preliminary_assessment)

      const arrival = new Date(data.arrival_time)
      setArrivalTime(moment(arrival).format("HH:mm"))
      setArrivalPeriod(moment(arrival).format("A"))

      dispatch(setMedicalSupports(data.medical_supports || []))
      dispatch(setPreservationMeasures(data.preservation_measures || []))
    } catch (err) {
      console.error("Error fetching initial response:", err)
    } finally {
      setIsLoading(false)
    }
  }
  console.log(case_id)

  useEffect(() => {
    fetchInitialResponse()
  }, [case_id])

  // const handleSubmit = async () => {
  //   if (!date || !moment(date).isValid()) {
  //     toast.error("Please select a valid dispatching date.")
  //     return
  //   }

  //   setIsLoading(true)

  //   const dispatchingDate = moment(date).toDate()
  //   const arrivalDateTime = moment(`${moment(date).format("YYYY-MM-DD")} ${arrivalTime} ${arrivalPeriod}`, "YYYY-MM-DD hh:mm A").toDate()

  //   const formattedMedicalSupports = medicalSupports.map((ms) => {
  //     const { medical_supports_id, ...rest } = ms
  //     return {
  //       ...rest,
  //       time_of_arrival: toUSATimeISOString(ms.time_of_arrival),
  //     }
  //   })

  //   const formattedPreservationMeasures = preservationMeasures.map(({ preservation_measures_id, ...rest }) => rest)

  //   const payload = {
  //     dispatching_time: dispatchingDate.toISOString(),
  //     arrival_time: arrivalDateTime.toISOString(),
  //     preliminary_assessment: assessment,
  //     case_id: caseId,
  //     preservation_measures: formattedPreservationMeasures,
  //     medical_supports: formattedMedicalSupports
  //   }

  //   try {
  //     await initialResponseApi.createInitialResponse(payload)
  //     toast.success("Initial response submitted successfully!")
  //     await fetchInitialResponse()

  //   } catch (err) {
  //     toast.error("Failed to submit initial response")
  //     console.error(err)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }
  const handleSave = async () => {

    setIsLoading(true)

    if (!date || !moment(date).isValid()) {
      toast.error("Please select a valid dispatching date.")
      return
    }

    setIsLoading(true)

    const dispatchingDate = moment(date).toDate()
    const arrivalDateTime = moment(
      `${moment(date).format("YYYY-MM-DD")} ${arrivalTime} ${arrivalPeriod}`,
      "YYYY-MM-DD hh:mm A"
    ).toDate()

    const formattedMedicalSupports = medicalSupports.map(({ medical_supports_id, ...rest }) => ({
      ...rest,
      time_of_arrival: toUSATimeISOString(rest.time_of_arrival),
    }))

    const formattedPreservationMeasures = preservationMeasures.map(({ preservation_measures_id, ...rest }) => rest)

    const payload = {
      dispatching_time: dispatchingDate.toISOString(),
      arrival_time: arrivalDateTime.toISOString(),
      preliminary_assessment: assessment,
      case_id: caseId,
      preservation_measures: formattedPreservationMeasures,
      medical_supports: formattedMedicalSupports,
    }

    try {
      if (initialResponseId) {
        await initialResponseApi.updateInitialResponse(initialResponseId, payload)
        toast.success("Initial response updated successfully!")
      } else {
        await initialResponseApi.createInitialResponse(payload)
        toast.success("Initial response created successfully!")
      }

      await fetchInitialResponse()
    } catch (err) {
      toast.error("Failed to save initial response")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const Section = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-blue-100">
      {children}
    </div>
  )

  return (
    <div >
      <h2 className="text-center text-2xl font-bold mb-10 text-[#1A2C47] tracking-wide uppercase">INITIAL RESPONSE</h2>
      <Section>
        {/* Dispatch Time */}
        <Card>
          <CardContent className="flex justify-between items-center">
            <label className="block font-semibold">TIME OF DISPATCHING FORCES TO THE SCENE</label>
            <div className="flex flex-col">
              <Popover open={openDatePicker} onOpenChange={setOpenDatePicker}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-28 justify-between font-medium bg-blue-100"
                    disabled={isLoading}
                  >
                    {date ? moment(date).format("YYYY-MM-DD") : "Choose"}
                    <CalendarIcon className="size-3.5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    month={month}
                    today={new Date()}
                    onMonthChange={setMonth}
                    onSelect={(d) => {
                      setDate(d)
                      setOpenDatePicker(false)
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>
      </Section>
      <Section>
        {/* Arrival Time */}
        <Card>
          <CardContent className="flex items-center justify-between">
            <label className="block font-semibold mb-2">TIME OF ARRIVAL AT THE SCENE</label>
            <div className="flex items-center gap-2">
              <Input
                type="time"
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
                className="w-32 bg-blue-100"
                disabled={isLoading}
              />
              <div className="flex border rounded-md overflow-hidden bg-blue-100 p-1">
                <button
                  className={`px-2 py-1 rounded-sm text-sm ${arrivalPeriod === "AM" ? "bg-white" : "bg-blue-100"}`}
                  onClick={() => setArrivalPeriod("AM")}
                  disabled={isLoading}
                >
                  AM
                </button>
                <button
                  className={`px-2 py-1 rounded-sm text-sm ${arrivalPeriod === "PM" ? "bg-white" : "bg-blue-100"}`}
                  onClick={() => setArrivalPeriod("PM")}
                  disabled={isLoading}
                >
                  PM
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>
      <Section>
        <PatrolOfficersList case_id={case_id} />
      </Section>
      <Section>
        {/* Assessment */}
        <Card>
          <CardContent>
            <label className="block font-semibold mb-2">PRELIMINARY ASSESSMENT OF THE SCENE SITUATION</label>
            <Textarea
              className="w-full"
              value={assessment}
              onChange={(e) => setAssessment(e.target.value)}
              disabled={isLoading}
            />
          </CardContent>
        </Card>
      </Section>
      <Section>
        <ScenePreservationMeasures
          refetch={fetchInitialResponse}
          initialResponseId={initialResponseId}
        />
      </Section>
      <Section>
        <MedicalRescueSupport
          refetch={fetchInitialResponse}
          initialResponseId={initialResponseId}
        />
      </Section>


      <div className="flex justify-between items-center mt-6">
        <Button variant="ghost" className="border rounded-sm" disabled={isLoading}>
          Cancel
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="bg-blue-100"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
          <Button className="bg-gray-500" disabled={isLoading}>
            Next page
          </Button>
        </div>
      </div>
    </div>
  )
}