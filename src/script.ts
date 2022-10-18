import {
  format,
  getUnixTime,
  subMonths,
  addMonths,
  fromUnixTime,
  startOfWeek,
  eachDayOfInterval,
  isSameMonth,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  isSameDay,
} from 'date-fns'

const datePickerButton = document.querySelector(
  '.date-picker-button',
) as HTMLButtonElement
const datePicker = document.querySelector('.date-picker') as HTMLDivElement
const datePickerHeaderText = document.querySelector(
  '.current-month',
) as HTMLDivElement
const prevMonthButton = document.querySelector(
  '.prev-month-button',
) as HTMLButtonElement
const nextMonthButton = document.querySelector(
  '.next-month-button',
) as HTMLButtonElement
const datePickerGrid = document.querySelector(
  '.date-picker-grid-dates',
) as HTMLDivElement

let currentDate: Date
datePickerButton?.addEventListener('click', () => {
  datePicker.classList.toggle('show')
  if (datePickerButton.dataset.selectedDate) {
    const selectedDate = fromUnixTime(
      parseInt(datePickerButton.dataset.selectedDate),
    )
    currentDate = selectedDate
    console.log(selectedDate)
    setDatePicker(selectedDate)
  }
})

nextMonthButton.addEventListener('click', () => {
  currentDate = addMonths(currentDate, 1)
  if (datePickerButton.dataset.selectedDate) {
    const selectedDate = fromUnixTime(
      parseInt(datePickerButton.dataset.selectedDate),
    )
    setDatePicker(selectedDate)
  }
})
prevMonthButton.addEventListener('click', () => {
  currentDate = subMonths(currentDate, 1)
  if (datePickerButton.dataset.selectedDate) {
    const selectedDate = fromUnixTime(
      parseInt(datePickerButton.dataset.selectedDate),
    )
    setDatePicker(selectedDate)
  }
})

const setDate = (date: Date) => {
  currentDate = date
  datePickerButton.textContent = format(date, 'MMM do, yyyy')
  datePickerButton.dataset.selectedDate = `${getUnixTime(date)}`
}
const setDatePicker = (date: Date) => {
  datePickerHeaderText.innerText = format(currentDate, 'MMM do, yyyy')
  const firstOfWeek = startOfWeek(startOfMonth(currentDate))
  const lastOfWeek = endOfWeek(endOfMonth(currentDate))
  const dates = eachDayOfInterval({start: firstOfWeek, end: lastOfWeek})
  console.log(dates)
  datePickerGrid.innerHTML = ''
  dates.forEach(newDate => {
    const dateElement: HTMLButtonElement = document.createElement('button')
    dateElement.textContent = `${newDate.getDate()}`
    if (dateElement) {
      dateElement.classList.add('date')
      if (!isSameMonth(newDate, currentDate)) {
        dateElement.classList.add('date-picker-other-month-date')
      }
      if (isSameDay(newDate, date)) {
        dateElement.classList.add('selected')
      }
      datePickerGrid.appendChild(dateElement)
      dateElement.addEventListener('click', () => {
        setDate(newDate)
        datePicker.classList.remove('show')
      })
    }
  })
}
setDate(new Date())
