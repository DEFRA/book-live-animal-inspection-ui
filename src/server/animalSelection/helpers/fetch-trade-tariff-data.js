/* eslint-disable prettier/prettier */
import { createLogger } from '~/src/server/common/helpers/logging/logger'

const options = {
  method: 'get',
  headers: { 'Content-Type': 'application/json', preserveWhitespace: true } // Fixed Content-Type to 'application/json'
}
const logger = createLogger()

async function fetchAnimalData() {
  const heading = 'heading'
  const commodity = 'commodity'
  let animalGroupCode = null
  const getAnimalGroupsUrl =
    'https://www.trade-tariff.service.gov.uk/api/v2/chapters/01'
  const animalGroups = []

  logger.info(`:::::::: getAnimalGroupsUrl ::::::: ${getAnimalGroupsUrl}`)

  // Fetch animal groups
  const animalGroupsRes = await fetch(getAnimalGroupsUrl, options).catch(
    (err) => {
      logger.info(`err ${JSON.stringify(err.message)}`)
    }
  )

  logger.info(`:::::::: animalGroupsRes.ok ::::::: ${animalGroupsRes?.ok}`)

  if (animalGroupsRes && animalGroupsRes.ok) {
    // Check if response exists and is ok
    const getAnimalGroups = await animalGroupsRes.json()

    // Extract descriptions from the included items
    for (const item of getAnimalGroups.included) {
      // Use for...of to handle async/await
      if (item.type === heading && item.attributes.description_plain) {
        if (item.attributes.goods_nomenclature_item_id) {
          // Access the attribute correctly
          animalGroupCode =
            item.attributes.goods_nomenclature_item_id.substring(0, 4)

          // Construct the animal names URL dynamically after getting the code
          const getAnimalNamesUrl = `https://www.trade-tariff.service.gov.uk/api/v2/headings/${animalGroupCode}`

          const animalNameRes = await fetch(getAnimalNamesUrl, options).catch(
            (err) => {
              logger.info(`err ${JSON.stringify(err.message)}`)
            }
          )

          let animalNameDescriptions = [] // Initialize descriptions array

          if (animalNameRes && animalNameRes.ok) {
            // Check if response exists and is ok
            const animalNamesData = await animalNameRes.json()
            animalNameDescriptions = animalNamesData.included
              .filter((animal) => animal.type === commodity)
              .map((animal) => animal.attributes.description)
          }

          // Create animal group item and push to the array
          const animalGroupItem = {
            groupName: item.attributes.description_plain,
            animalNames: animalNameDescriptions
          }
          animalGroups.push(animalGroupItem)
        }
      }
    }
  }

  return animalGroups
}

export { fetchAnimalData }
