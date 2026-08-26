<template>
  <div ref="rootEl" class="rc-ses-date-picker-v2">
    <v-menu
      v-model="open"
      :close-on-content-click="false"
      :disabled="props.disabled"
      location="bottom"
      origin="auto"
      offset="4"
      :content-class="'rc-ses-date-picker-v2__overlay'"
    >
      <template #activator="{ props: menuProps }">
        <div :class="triggerClasses">
          <RcSesInputV2
            :id="inputId"
            v-model="inputText"
            :label="props.label"
            :helper="props.helper"
            :error="props.error"
            :explainer="props.explainer"
            :explainer-title="props.explainerTitle"
            :placeholder="placeholderText"
            :accessible-label="props.accessibleLabel"
            :disabled="props.disabled"
            :optional="props.optional"
            :show-label="props.showLabel"
            :show-explainer="props.showExplainer"
            :show-helper="props.showHelper"
            :show-trailing="false"
            :aria-expanded="open"
            :aria-controls="panelId"
            aria-haspopup="dialog"
            @focus="onInputFocus"
            @blur="onInputBlur"
            @keydown="onInputKeydown"
          >
            <template #leading>
              <button
                v-bind="menuProps"
                type="button"
                class="rc-ses-date-picker-v2__calendar-button"
                :aria-label="openCalendarLabel"
                :aria-expanded="open"
                :aria-controls="panelId"
                aria-haspopup="dialog"
                :disabled="props.disabled || undefined"
              >
                <v-icon icon="$calendar" aria-hidden="true" />
              </button>
            </template>
          </RcSesInputV2>
        </div>
      </template>

      <div
        :id="panelId"
        class="rc-ses-date-picker-v2__panel"
        role="dialog"
        :aria-label="monthLabel"
        @keydown="onPanelKeydown"
      >
        <div class="rc-ses-date-picker-v2__header">
          <button
            type="button"
            class="rc-ses-date-picker-v2__nav"
            :aria-label="previousMonthLabel"
            @click="shiftMonth(-1)"
          >
            <v-icon icon="$caretLeft" aria-hidden="true" />
          </button>

          <p class="rc-ses-date-picker-v2__month-label">{{ monthLabel }}</p>

          <button
            type="button"
            class="rc-ses-date-picker-v2__nav"
            :aria-label="nextMonthLabel"
            @click="shiftMonth(1)"
          >
            <v-icon icon="$caretRight" aria-hidden="true" />
          </button>
        </div>

        <div class="rc-ses-date-picker-v2__weekdays" aria-hidden="true">
          <span
            v-for="weekday in weekdayLabels"
            :key="weekday"
            class="rc-ses-date-picker-v2__weekday"
          >
            {{ weekday }}
          </span>
        </div>

        <div class="rc-ses-date-picker-v2__grid" role="grid" :aria-label="monthLabel">
          <div
            v-for="(week, weekIndex) in weeks"
            :key="weekIndex"
            class="rc-ses-date-picker-v2__week"
            role="row"
          >
            <button
              v-for="day in week"
              :id="dayDomId(day.iso)"
              :key="day.iso"
              type="button"
              role="gridcell"
              :class="dayClasses(day)"
              :aria-selected="isDaySelected(day)"
              :aria-disabled="day.disabled || undefined"
              :aria-current="day.today ? 'date' : undefined"
              :aria-label="dayAriaLabel(day)"
              :tabindex="isFocusedDay(day) ? 0 : -1"
              :disabled="day.disabled"
              @click="onSelectDay(day)"
              @mouseenter="onDayHover(day)"
              @focusin="onDayHover(day)"
            >
              {{ day.dayNumber }}
            </button>
          </div>
        </div>
      </div>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format as formatDate,
  isAfter,
  isBefore,
  isMatch,
  isSameDay,
  isToday,
  isValid,
  parse,
  parseISO,
  startOfMonth,
  subDays,
  subMonths,
} from 'date-fns'
import { enUS, lt } from 'date-fns/locale'
import { useTranslation } from 'i18next-vue'
import { v4 as uuidv4 } from 'uuid'
import { computed, nextTick, ref, watch } from 'vue'

import datePickerV2Defaults from '@/components/common/DatePickerV2/defaults'
import type {
  DatePickerV2CalendarDay,
  DatePickerV2ModelValue,
  DatePickerV2Props,
  DatePickerV2RangeValue,
} from '@/components/common/DatePickerV2/types'
import RcSesInputV2 from '@/components/common/inputs/InputV2/RcSesInputV2.vue'

import './style.scss'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DatePickerV2Props>(), datePickerV2Defaults)

const model = defineModel<DatePickerV2ModelValue>({ default: null })
const open = defineModel<boolean>('open', { default: false })

const { t, i18next } = useTranslation()

const generatedId = uuidv4()
const inputId = computed(() => props.id ?? generatedId)
const panelId = computed(() => `${inputId.value}-panel`)

const rootEl = ref<HTMLElement | null>(null)
const viewDate = ref(new Date())
const focusedIso = ref<string | null>(null)
const hoverIso = ref<string | null>(null)
const rangeDraftStart = ref<string | null>(null)
const inputText = ref('')
const inputFocused = ref(false)
const skipCommitOnClose = ref(false)

const dateFnsLocale = computed(() => (i18next.language?.startsWith('lt') ? lt : enUS))

const weekdayLabels = computed(() => {
  const monday = parseISO('2023-01-02')
  return Array.from({ length: 7 }, (_, index) =>
    formatDate(addDays(monday, index), 'EEEEEE', { locale: dateFnsLocale.value }),
  )
})

const previousMonthLabel = computed(() =>
  t('RcSesDatePickerV2.previousMonth', { ns: 'components' }),
)

const nextMonthLabel = computed(() =>
  t('RcSesDatePickerV2.nextMonth', { ns: 'components' }),
)

const openCalendarLabel = computed(() =>
  t('RcSesDatePickerV2.openCalendar', { ns: 'components' }),
)

const placeholderText = computed(
  () => props.placeholder ?? t('RcSesDatePickerV2.placeholder', { ns: 'components' }),
)

const monthLabel = computed(() => {
  const pattern = i18next.language?.startsWith('lt') ? "yyyy 'm.' LLLL" : 'LLLL yyyy'

  return formatDate(viewDate.value, pattern, { locale: dateFnsLocale.value })
})

const triggerClasses = computed(() => [
  'rc-ses-date-picker-v2__trigger',
  {
    'rc-ses-date-picker-v2__trigger--disabled': props.disabled,
    'rc-ses-date-picker-v2__trigger--open': open.value,
  },
])

const toIso = (date: Date) => formatDate(date, 'yyyy-MM-dd')

const parseIso = (value: string | null | undefined): Date | null => {
  if (!value) {
    return null
  }

  const parsed = parseISO(value)
  return isValid(parsed) ? parsed : null
}

const parseTypedDate = (value: string): Date | null => {
  const trimmed = value.trim()
  if (!trimmed) {
    return null
  }

  if (isMatch(trimmed, props.format)) {
    const parsed = parse(trimmed, props.format, new Date())
    // Round-trip rejects overflow dates (e.g. 2026-02-31 → Mar 3).
    if (isValid(parsed) && formatDate(parsed, props.format) === trimmed) {
      return parsed
    }
  }

  const isoParsed = parseISO(trimmed)
  if (isValid(isoParsed) && toIso(isoParsed) === trimmed) {
    return isoParsed
  }

  return null
}

const isPickerInteractionTarget = (target: EventTarget | null) => {
  if (!(target instanceof Element)) {
    return false
  }

  if (rootEl.value?.contains(target)) {
    return true
  }

  // Menu content is teleported outside the root.
  return Boolean(
    target.closest('.rc-ses-date-picker-v2__panel') ||
      target.closest('.rc-ses-date-picker-v2__overlay'),
  )
}

const singleValue = computed(() => {
  if (props.range || Array.isArray(model.value)) {
    return null
  }

  return typeof model.value === 'string' ? model.value : null
})

const rangeValue = computed((): DatePickerV2RangeValue => {
  if (Array.isArray(model.value)) {
    return [model.value[0] ?? null, model.value[1] ?? null]
  }

  return [null, null]
})

const formatDisplayDate = (iso: string) => {
  const parsed = parseIso(iso)
  if (!parsed) {
    return iso
  }

  try {
    return formatDate(parsed, props.format)
  } catch {
    return iso
  }
}

const displayValue = computed(() => {
  if (props.range) {
    const [start, end] = rangeValue.value
    if (!start && !end) {
      return ''
    }

    if (start && end) {
      return `${formatDisplayDate(start)} – ${formatDisplayDate(end)}`
    }

    const partial = start || end
    return partial ? formatDisplayDate(partial) : ''
  }

  return singleValue.value ? formatDisplayDate(singleValue.value) : ''
})

watch(
  displayValue,
  (value) => {
    if (!inputFocused.value) {
      inputText.value = value
    }
  },
  { immediate: true },
)

const minDateObj = computed(() => parseIso(props.minDate))
const maxDateObj = computed(() => parseIso(props.maxDate))

const isDateDisabled = (date: Date) => {
  if (minDateObj.value && isBefore(date, minDateObj.value)) {
    return true
  }

  if (maxDateObj.value && isAfter(date, maxDateObj.value)) {
    return true
  }

  return false
}

const splitRangeInput = (value: string) =>
  value
    // Prefer en/em dash or arrow; only treat ASCII "-" as a separator when spaced
    // so ISO-like dates (yyyy-MM-dd) are not split apart.
    .split(/\s*[–—→]\s*|\s+-\s+/)
    .map((part) => part.trim())
    .filter(Boolean)

/** Resolve a calendar month/year from typed text (full date, yyyy-MM, or year). */
const resolveCalendarAnchor = (value: string): Date | null => {
  const trimmed = value.trim()
  if (!trimmed) {
    return null
  }

  const firstPart = props.range ? splitRangeInput(trimmed)[0] ?? trimmed : trimmed

  const fullDate = parseTypedDate(firstPart)
  if (fullDate) {
    return fullDate
  }

  if (/^\d{4}-\d{2}$/.test(firstPart)) {
    const yearMonth = parse(firstPart, 'yyyy-MM', new Date())
    if (isValid(yearMonth) && formatDate(yearMonth, 'yyyy-MM') === firstPart) {
      return yearMonth
    }
  }

  const yearMatch = firstPart.match(/^(\d{4})\b/)
  if (yearMatch) {
    const year = Number(yearMatch[1])
    if (year >= 1000 && year <= 9999) {
      return new Date(year, viewDate.value.getMonth(), 1)
    }
  }

  return null
}

const commitTypedValue = () => {
  if (props.disabled || inputText.value === displayValue.value) {
    return
  }

  const raw = inputText.value.trim()

  if (!raw) {
    model.value = props.range ? [null, null] : null
    rangeDraftStart.value = null
    hoverIso.value = null
    inputText.value = displayValue.value
    return
  }

  if (props.range) {
    const parts = splitRangeInput(raw)

    if (parts.length === 1) {
      const startDate = parseTypedDate(parts[0]!)
      if (!startDate || isDateDisabled(startDate)) {
        inputText.value = displayValue.value
        return
      }

      const startIso = toIso(startDate)
      model.value = [startIso, null]
      rangeDraftStart.value = startIso
      hoverIso.value = startIso
      viewDate.value = startDate
      inputText.value = displayValue.value
      return
    }

    if (parts.length >= 2) {
      const startDate = parseTypedDate(parts[0]!)
      const endDate = parseTypedDate(parts[1]!)
      if (
        !startDate ||
        !endDate ||
        isDateDisabled(startDate) ||
        isDateDisabled(endDate)
      ) {
        inputText.value = displayValue.value
        return
      }

      const startIso = toIso(startDate)
      const endIso = toIso(endDate)
      model.value = isAfter(startDate, endDate) ? [endIso, startIso] : [startIso, endIso]
      rangeDraftStart.value = null
      hoverIso.value = null
      viewDate.value = startDate
      inputText.value = displayValue.value
      return
    }

    inputText.value = displayValue.value
    return
  }

  const date = parseTypedDate(raw)
  if (!date || isDateDisabled(date)) {
    inputText.value = displayValue.value
    return
  }

  model.value = toIso(date)
  viewDate.value = date
  inputText.value = displayValue.value
}

const onInputFocus = () => {
  inputFocused.value = true
}

const onInputBlur = (event: FocusEvent) => {
  inputFocused.value = false

  if (isPickerInteractionTarget(event.relatedTarget)) {
    return
  }

  // Clicking teleported panel days often has relatedTarget=null while the menu is open.
  if (open.value) {
    requestAnimationFrame(() => {
      if (open.value || isPickerInteractionTarget(document.activeElement)) {
        return
      }

      commitTypedValue()
    })
    return
  }

  commitTypedValue()
}

const onInputKeydown = (event: KeyboardEvent) => {
  if (props.disabled) {
    return
  }

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    open.value = true
    return
  }

  if (event.key === 'Enter') {
    event.preventDefault()
    commitTypedValue()
    open.value = false
    return
  }

  if (event.key === 'Escape' && open.value) {
    event.preventDefault()
    open.value = false
    inputText.value = displayValue.value
  }
}

const calendarDays = computed((): DatePickerV2CalendarDay[] => {
  const monthStart = startOfMonth(viewDate.value)
  const monthEnd = endOfMonth(viewDate.value)
  const mondayIndex = (monthStart.getDay() + 6) % 7
  const gridStart = subDays(monthStart, mondayIndex)
  const gridEnd = addDays(gridStart, 41)

  return eachDayOfInterval({ start: gridStart, end: gridEnd }).map((date) => {
    const iso = toIso(date)
    return {
      date,
      iso,
      dayNumber: date.getDate(),
      outside: isBefore(date, monthStart) || isAfter(date, monthEnd),
      today: isToday(date),
      disabled: isDateDisabled(date),
    }
  })
})

const weeks = computed(() => {
  const result: DatePickerV2CalendarDay[][] = []
  for (let index = 0; index < calendarDays.value.length; index += 7) {
    result.push(calendarDays.value.slice(index, index + 7))
  }

  return result
})

const dayDomId = (iso: string) => `${panelId.value}-day-${iso}`

const isFocusedDay = (day: DatePickerV2CalendarDay) =>
  (focusedIso.value ?? calendarDays.value.find((entry) => !entry.disabled)?.iso) ===
  day.iso

const isDaySelected = (day: DatePickerV2CalendarDay) => {
  if (props.range) {
    const [start, end] = rangeValue.value
    return day.iso === start || day.iso === end || day.iso === rangeDraftStart.value
  }

  return day.iso === singleValue.value
}

const isInClosedRange = (
  day: DatePickerV2CalendarDay,
  startIso: string,
  endIso: string,
) => {
  const start = parseIso(startIso)
  const end = parseIso(endIso)
  if (!start || !end) {
    return false
  }

  const from = isBefore(end, start) ? end : start
  const to = isBefore(end, start) ? start : end

  return (
    (isAfter(day.date, from) || isSameDay(day.date, from)) &&
    (isBefore(day.date, to) || isSameDay(day.date, to))
  )
}

const orderedRange = (
  startIso: string,
  endIso: string,
): { start: string; end: string } => {
  const start = parseIso(startIso)!
  const end = parseIso(endIso)!

  if (isBefore(end, start)) {
    return { start: endIso, end: startIso }
  }

  return { start: startIso, end: endIso }
}

const dayClasses = (day: DatePickerV2CalendarDay) => {
  const [committedStart, committedEnd] = rangeValue.value
  const draftStart = rangeDraftStart.value
  const previewEnd = hoverIso.value

  let inRange = false
  let rangePreview = false
  let rangeStart = false
  let rangeEnd = false

  if (props.range) {
    if (committedStart && committedEnd) {
      const ordered = orderedRange(committedStart, committedEnd)
      inRange = isInClosedRange(day, ordered.start, ordered.end)
      rangeStart = day.iso === ordered.start
      rangeEnd = day.iso === ordered.end
    } else if (draftStart && previewEnd) {
      const ordered = orderedRange(draftStart, previewEnd)
      rangePreview = isInClosedRange(day, ordered.start, ordered.end)
      rangeStart = day.iso === ordered.start
      rangeEnd = day.iso === ordered.end
    } else if (draftStart) {
      rangeStart = day.iso === draftStart
    }
  }

  return [
    'rc-ses-date-picker-v2__day',
    {
      'rc-ses-date-picker-v2__day--outside': day.outside,
      'rc-ses-date-picker-v2__day--today': day.today,
      'rc-ses-date-picker-v2__day--disabled': day.disabled,
      'rc-ses-date-picker-v2__day--selected':
        !props.range && day.iso === singleValue.value,
      'rc-ses-date-picker-v2__day--in-range': inRange && !rangeStart && !rangeEnd,
      'rc-ses-date-picker-v2__day--range-preview':
        rangePreview && !rangeStart && !rangeEnd,
      'rc-ses-date-picker-v2__day--range-start': rangeStart,
      'rc-ses-date-picker-v2__day--range-end': rangeEnd,
    },
  ]
}

const dayAriaLabel = (day: DatePickerV2CalendarDay) =>
  formatDate(day.date, 'PPP', { locale: dateFnsLocale.value })

const shiftMonth = (delta: number) => {
  viewDate.value = delta < 0 ? subMonths(viewDate.value, 1) : addMonths(viewDate.value, 1)
}

const focusDay = (iso: string) => {
  focusedIso.value = iso
  const parsed = parseIso(iso)
  if (parsed) {
    viewDate.value = parsed
  }

  nextTick(() => {
    document.getElementById(dayDomId(iso))?.focus()
  })
}

const onDayHover = (day: DatePickerV2CalendarDay) => {
  if (props.range && rangeDraftStart.value && !day.disabled) {
    hoverIso.value = day.iso
  }
}

const onSelectDay = (day: DatePickerV2CalendarDay) => {
  if (day.disabled || props.disabled) {
    return
  }

  focusedIso.value = day.iso

  if (!props.range) {
    model.value = day.iso
    inputText.value = displayValue.value
    skipCommitOnClose.value = true
    open.value = false
    return
  }

  if (!rangeDraftStart.value) {
    rangeDraftStart.value = day.iso
    hoverIso.value = day.iso
    model.value = [day.iso, null]
    inputText.value = displayValue.value
    return
  }

  const start = rangeDraftStart.value
  const end = day.iso
  const startDate = parseIso(start)!
  const endDate = parseIso(end)!

  model.value = isAfter(startDate, endDate) ? [end, start] : [start, end]
  rangeDraftStart.value = null
  hoverIso.value = null
  inputText.value = displayValue.value
  skipCommitOnClose.value = true
  open.value = false
}

const moveFocus = (deltaDays: number) => {
  const current =
    parseIso(focusedIso.value) ??
    calendarDays.value.find((day) => !day.disabled)?.date ??
    viewDate.value

  let next = addDays(current, deltaDays)
  for (let step = 0; step < 62; step += 1) {
    if (!isDateDisabled(next)) {
      focusDay(toIso(next))
      return
    }

    next = addDays(next, deltaDays > 0 ? 1 : -1)
  }
}

const onPanelKeydown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    moveFocus(-1)
  }

  if (event.key === 'ArrowRight') {
    event.preventDefault()
    moveFocus(1)
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault()
    moveFocus(-7)
  }

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    moveFocus(7)
  }

  if (event.key === 'Enter' || event.key === ' ') {
    const day = calendarDays.value.find((entry) => entry.iso === focusedIso.value)
    if (day) {
      event.preventDefault()
      onSelectDay(day)
    }
  }

  if (event.key === 'Escape') {
    event.preventDefault()
    open.value = false
  }

  if (event.key === 'PageUp') {
    event.preventDefault()
    shiftMonth(-1)
  }

  if (event.key === 'PageDown') {
    event.preventDefault()
    shiftMonth(1)
  }
}

watch(open, (isOpen) => {
  if (!isOpen) {
    rangeDraftStart.value = null
    hoverIso.value = null

    if (skipCommitOnClose.value) {
      skipCommitOnClose.value = false
      inputText.value = displayValue.value
      return
    }

    if (!inputFocused.value) {
      commitTypedValue()
    }

    return
  }

  const [rangeStart, rangeEnd] = rangeValue.value

  if (props.range && rangeStart && !rangeEnd) {
    rangeDraftStart.value = rangeStart
    hoverIso.value = rangeStart
  }

  const fromInput = resolveCalendarAnchor(inputText.value)
  const fromModel = parseIso(singleValue.value || rangeStart || rangeEnd || null)
  const anchor = fromInput ?? fromModel ?? new Date()

  viewDate.value = anchor
  focusDay(toIso(anchor))
})
</script>
