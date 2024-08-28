import { errorMessages } from '~/src/server/common/validations/errorMessages.js'

const validateDate = (day, month, year) => {
  if (!day) {
    return errorMessages.dateDayRequired
  }
  if (!month) {
    return errorMessages.dateMonthRequired
  }
  if (!year) {
    return errorMessages.dateYearRequired
  }

  const DateDay = parseInt(day, 10)
  const DateMonth = parseInt(month, 10)
  const DateYear = parseInt(year, 10)

  if (isNaN(DateDay) || isNaN(DateMonth) || isNaN(DateYear)) {
    return errorMessages.dateNumbersOnly
  } else if (
    DateDay < 1 ||
    DateDay > 31 ||
    DateMonth < 1 ||
    DateMonth > 12 ||
    DateYear < 1900 ||
    DateYear > 2100
  ) {
    return errorMessages.dateInvalid
  }

  const inputDate = new Date(DateYear, DateMonth - 1, DateDay)
  const currentDate = new Date()
  if (inputDate <= currentDate) {
    return errorMessages.dateInFutureOnly
  }

  return null
}

const validateAnimalCount = (animalCount) => {
  if (!animalCount || animalCount.trim() === '') {
    return errorMessages.animalCountRequired
  }

  if (isNaN(animalCount)) {
    return errorMessages.animalCountNumberOnly
  }
  return null
}

const validators = {
  validateDate,
  validateAnimalCount
}

export { validators }
