import i18next from 'i18next'

import CookieStorage from '@/shared/CookieStorage'

const i18n = () => {
  const storage = new CookieStorage()

  i18next.init({
    lng:
      storage.getItem(window.ENV?.ENV_LANGUAGE_COOKIE_NAME) ??
      window.ENV?.ENV_FRONTEND_DEFAULT_LANG ??
      'lt',
    interpolation: {
      escapeValue: false,
    },
    fallbackLng: 'lt',
    resources: {
      lt: {
        components: {
          RcSesDatePicker: {
            close: 'Uždaryti',
            openCalendar: 'Atverti datos pasirinkimo kalendorių',
            previousMonth: 'Praėjęs mėnuo',
            thisWeek: 'Ši savaitė',
            thisMonth: 'Šis mėnuo',
          },

          RcSesFileDropzone: {
            label: 'Nutempkite failą čia arba įkelkite iš kompiuterio',
          },

          RcSesFileInput: {
            label: 'Įkelti failą',
          },

          RcSesSearchableArea: {
            placeholder: 'Ieškoti',
          },

          RcSesSelectField: {
            noData: 'Nėra duomenų',
          },
        },
      },
      en: {
        components: {
          RcSesDatePicker: {
            close: 'Close',
            openCalendar: 'Open datepicker calendar',
            previousMonth: 'Previous month',
            thisWeek: 'This week',
            thisMonth: 'This month',
          },

          RcSesFileDropzone: {
            label: 'Drag and drop file over this area or click here to browse',
          },

          RcSesFileInput: {
            label: 'Upload file',
          },

          RcSesSearchableArea: {
            placeholder: 'Search',
          },

          RcSesSelectField: {
            noData: 'No results',
          },
        },
      },
    },
  })

  return { i18next }
}

export default i18n
