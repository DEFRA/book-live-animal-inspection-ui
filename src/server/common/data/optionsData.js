const optionsData = {
  locations: [
    { value: 1, text: 'Sevington, England' },
    { value: 2, text: 'Fishguard, Wales' },
    { value: 3, text: 'Pembroke Dock, Wales' },
    { value: 4, text: 'Holyhead, Wales' }
  ],
  vehicleTypes: [
    { value: 1, text: 'Class B: car or small van' },
    { value: 2, text: 'Class C1: large van up to 7.5 tonnes' },
    { value: 3, text: 'Class C: heavy goods vehicle over 7.5 tonnes' },
    {
      value: 4,
      text: 'Class CE: heavy goods vehicle over 7.5 tonnes towing a trailer'
    }
  ],
  vehicleUnloadTypes: [
    { value: 1, text: 'Rear-unloading vehicle' },
    { value: 2, text: 'Side-unloading vehicle' },
    { value: 3, text: 'Vehicle can be unloaded from the rear or the side' }
  ],
  declarationOptions: [
    { value: 1, text: 'Yes, I understand and agree' },
    { value: 2, text: 'No, I do not wish to continue' }
  ]
}

export { optionsData }
