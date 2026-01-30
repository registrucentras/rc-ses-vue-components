import { render, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import { createVuetify } from 'vuetify'

import RcSesAlert from './RcSesAlert.vue'

const vuetify = createVuetify()

describe('RcSesAlert', () => {
  it('renders the alert text via slot', () => {
    render(RcSesAlert, {
      slots: { default: 'Slot Alert' },
      global: { plugins: [vuetify] },
    })
    expect(screen.getByText('Slot Alert')).toBeInTheDocument()
  })
})
