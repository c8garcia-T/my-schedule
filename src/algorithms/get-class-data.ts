interface ValidClassEntry {
  level: string;
  room: string | null;
  subbingFor: string | null;
  teacher: string;
  subject: string | null;
  period: number;
  timeSpan: string;
}

function computeClassEndTime(hour: number, minutes: number): number[] {
  minutes = minutes + 42;
  if (minutes > 59) {
    hour++;
    minutes -= 60;
  }
  return [hour, minutes];
}

export function getClassData(data: any[][], name: string): object {
  let invalidCasesCounter = 0;
  const validData: ValidClassEntry[] = [];
  for (let rowIdx = 0; rowIdx < data.length && rowIdx < 300; rowIdx++) {
    const row = data[rowIdx];
    const nameColumnIndx = row.indexOf(name);
    let period: null | number = null;
    let timeSpanVal: string = "";
    if (nameColumnIndx !== -1) {
      // Find the Period Column
      const periodRow = data[rowIdx - 3];
      for (let colIdx = nameColumnIndx - 1; colIdx >= 0; colIdx--) {
        if (typeof periodRow[colIdx] === "number") {
          if (periodRow[colIdx] % 1 === 0) {
            period = periodRow[colIdx];
            const rawTime = periodRow[colIdx + 1] * 24;
            let hour = Math.floor(rawTime);
            let minutes = Math.ceil((rawTime % 1) * 60);
            if (minutes === 60) {
              hour++;
              minutes = 0;
            }
            const classEndTime = computeClassEndTime(hour, minutes);
            const endHour = classEndTime[0];
            const endMinutes = classEndTime[1];
            const endTimeStr = `${endHour}:${endMinutes.toString().padEnd(2, "0")} PM`;
            timeSpanVal = `${hour}:${minutes.toString().padEnd(2, "0")} PM - ${endTimeStr}`;
            break;
          }
        }
      }
      if (period) {
        const dataSlice = data.slice(rowIdx - 3, rowIdx + 2);
        // save valid data
        const classEntry: ValidClassEntry = {
          level: dataSlice[0][nameColumnIndx],
          room: dataSlice[1][nameColumnIndx] ?? null,
          subbingFor: dataSlice[2][nameColumnIndx] ?? null,
          teacher: dataSlice[3][nameColumnIndx],
          subject: dataSlice[4][nameColumnIndx] ?? null,
          period: period,
          timeSpan: timeSpanVal,
        };
        validData.push(classEntry);
      } else {
        invalidCasesCounter++;
      }
    }
  }

  return { validData: validData, invalidCases: invalidCasesCounter };
}
