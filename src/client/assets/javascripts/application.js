import { initAll } from 'govuk-frontend'

import '../stylesheets/application.scss'

import '../images/favicon.ico'
import '../images/favicon.svg'
import '../images/govuk-icon-180.png'
import '../images/govuk-icon-192.png'
import '../images/govuk-icon-512.png'
import '../images/govuk-icon-mask.svg'

import accessibleAutocomplete from './components/accessible-autocomplete.min.js'

initAll()

accessibleAutocomplete({
  element: document.querySelector('#animal-selection-container'),
  id: 'animalSelection',
  source: function (query, populateResults) {
    fetch(`/animalReferenceData?q=${query}`)
      .then((response) => response.json())
      .then((data) => {
        populateResults(data)
      })
  },
  minLength: 2 // Minimum characters to trigger the autocomplete
})
