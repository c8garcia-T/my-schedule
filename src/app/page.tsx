"use client";
import { useEffect, useState } from "react";
import { searchForSchedule } from "@/algorithms/search-for-schedule";
import { read, utils } from "xlsx";
import { Schedule } from "@/ui/schedule";
import { ClassEntry } from "@/types/search-for-schedule-types";
import { DateTime } from "luxon";
import { Calendar } from "lucide-react";
import { EmptySchedule } from "@/ui/emptySchedule";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [fileData, setFileData] = useState<any[][] | null>(null);
  const [scheduleData, setScheduleData] = useState<ClassEntry[]>();
  const [dateToday, setDateToday] = useState<string>();
  const [debouncedName, setDebouncedName] = useState(name);

  useEffect(() => {
    setDateToday(DateTime.local().toLocaleString(DateTime.DATE_FULL));
    const nameSaved = localStorage.getItem("nameInput");
    if (nameSaved) {
      setName(nameSaved);
    }
  }, []);
  useEffect(() => {
    if (debouncedName && fileData) {
      setScheduleData(
        searchForSchedule(fileData, debouncedName.trim()).schedule,
      );
      try {
        localStorage.setItem("nameInput", debouncedName.trim());
      } catch (error) {}
    }
  }, [debouncedName, fileData]);

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setDebouncedName(name);
    }, 400);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [name]);

  return (
    <main className="m-2 flex flex-col">
      <h1 className="text text-center text-3xl">Hello!</h1>
      <div className="mx-auto my-4 flex w-2/3 flex-col justify-center gap-x-2 gap-y-2 sm:flex-row">
        <input
          type="text"
          className="input input-primary sm:input-md input-sm"
          placeholder="Type your name here"
          value={name}
          onChange={(event) => {
            const nameInput = event.target.value;
            if (nameInput.length > 1) {
              const nameComponents = nameInput.split("");
              const nameStandardized = `${nameComponents[0].toUpperCase()}${nameComponents.length > 1 ? nameComponents.slice(1, nameComponents.length).join("").toLocaleLowerCase() : ""}`;
              setName(nameStandardized);
            } else {
              setName(nameInput);
            }
          }}
        />
        <input
          type="file"
          className="file-input file-input-primary file-input-xs sm:file-input-md"
          accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onChange={(event) => {
            const fileInput = event.target.files?.[0];
            if (!fileInput) {
              setFileData(null);
              return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
              const fileContentAsArrayBuffer = e.target?.result;
              if (fileContentAsArrayBuffer) {
                const fileBytes = new Uint8Array(
                  fileContentAsArrayBuffer as ArrayBuffer,
                );
                const workbook = read(fileBytes, { type: "array" });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const worksheetData: any[][] = utils.sheet_to_json(worksheet, {
                  header: 1,
                  skipHidden: false,
                  raw: true,
                });
                setFileData(worksheetData);
              }
            };
            reader.readAsArrayBuffer(fileInput);
          }}
        />
      </div>
      {scheduleData && (
        <div className="mx-auto flex max-w-xl flex-col sm:w-2/3">
          <div className="mb-4 flex w-full flex-row items-center justify-between gap-x-2">
            <div>
              <h1 className="text-4xl font-bold">Today&apos;s Schedule</h1>
              <p className="mt-1">{dateToday}</p>
            </div>
            <div className="badge w-full max-w-fit">
              <span className="inline-flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                <p>{`${scheduleData.length} Classes`}</p>
              </span>
            </div>
          </div>
          {scheduleData.length === 0 && <EmptySchedule name={debouncedName} />}
          {debouncedName && <Schedule scheduleData={scheduleData} />}
        </div>
      )}
    </main>
  );
}
