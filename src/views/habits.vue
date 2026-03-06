<template>
  <main class="app">
    <div class="app-gradient">
      <section class="app-container">
        <header class="app-header">
          <!-- Optional brand/title on the left -->
          <!-- <h1 class="app-title">ticked</h1> -->

          <button class="add-btn" aria-label="Add habit">
            +
          </button>
        </header>

        <section class="habits">
          <section
            v-for="habit in habits"
            :key="habit.id"
            class="habit-block"
          >
            <p class="habit-month">{{ habit.monthLabel }}</p>
            <h2 class="habit-title">{{ habit.name }}</h2>

            <div class="days-row">
              <div
                v-for="day in habit.days"
                :key="day.id"
                class="day-cell"
              >
                <button
                  type="button"
                  class="day-dot"
                  :class="{ completed: day.completed }"
                  @click="toggleDay(habit.id, day.id)"
                >
                  {{ day.date }}
                </button>
                <span class="weekday">{{ day.weekday }}</span>
              </div>
            </div>
          </section>
        </section>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type Day = {
  id: string
  date: number
  weekday: string
  completed: boolean
}

type Habit = {
  id: number
  name: string
  monthLabel: string
  days: Day[]
}

// Temporary hard-coded mock data
const habits = ref<Habit[]>([
  {
    id: 1,
    name: 'sleep 8hrs',
    monthLabel: 'jan',
    days: [
      { id: 'jan-10-sleep', date: 10, weekday: 'M', completed: true },
      { id: 'jan-11-sleep', date: 11, weekday: 'T', completed: true },
      { id: 'jan-12-sleep', date: 12, weekday: 'W', completed: true },
      { id: 'jan-13-sleep', date: 13, weekday: 'T', completed: false },
      { id: 'jan-14-sleep', date: 14, weekday: 'F', completed: false },
      { id: 'jan-15-sleep', date: 15, weekday: 'S', completed: false }
    ]
  },
  {
    id: 2,
    name: 'meditate',
    monthLabel: 'jan',
    days: [
      { id: 'jan-10-med', date: 10, weekday: 'M', completed: true },
      { id: 'jan-11-med', date: 11, weekday: 'T', completed: false },
      { id: 'jan-12-med', date: 12, weekday: 'W', completed: true },
      { id: 'jan-13-med', date: 13, weekday: 'T', completed: false },
      { id: 'jan-14-med', date: 14, weekday: 'F', completed: true },
      { id: 'jan-15-med', date: 15, weekday: 'S', completed: false }
    ]
  },
  {
    id: 3,
    name: 'exercise',
    monthLabel: 'jan',
    days: [
      { id: 'jan-10-ex', date: 10, weekday: 'M', completed: true },
      { id: 'jan-11-ex', date: 11, weekday: 'T', completed: true },
      { id: 'jan-12-ex', date: 12, weekday: 'W', completed: false },
      { id: 'jan-13-ex', date: 13, weekday: 'T', completed: true },
      { id: 'jan-14-ex', date: 14, weekday: 'F', completed: true },
      { id: 'jan-15-ex', date: 15, weekday: 'S', completed: false }
    ]
  }
])

function toggleDay(habitId: number, dayId: string) {
  const habit = habits.value.find(h => h.id === habitId)
  if (!habit) return

  const day = habit.days.find(d => d.id === dayId)
  if (!day) return

  day.completed = !day.completed
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: #ffffff;
  color: #111111;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    sans-serif;
}

/* subtle left-to-right gradient like the screenshot */
.app-gradient {
  min-height: 100vh;  
}

.app-container {
  max-width: 100%;
  margin: 0 auto;
  padding: 24px 20px 40px;
}

.app-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 24px;
}

.app-title {
  font-size: 1.25rem;
  font-weight: 700;
}

.add-btn {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1.4rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #111111;
  color: #ffffff;
}

.add-btn:hover {
  opacity: 0.9;
}

.habits {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.habit-block {
  padding-bottom: 8px;
}

.habit-month {
  margin: 0;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: #a3a3a3;
}

.habit-title {
  margin: 4px 0 12px;
  font-size: 1.6rem;
  font-weight: 700;
}

.days-row {
  display: flex;
  gap: 12px;
}

.day-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.day-dot {
  width: 36px;
  height: 36px;
  border-radius: 999px;
  border: none;
  outline: none;
  cursor: pointer;
  background: #f3f3f3;
  color: #4b4b4b;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.day-dot.completed {
  background: #111111;
  color: #ffffff;
}

.day-dot:active {
  transform: scale(0.96);
}

.weekday {
  font-size: 0.7rem;
  color: #a3a3a3;
}
</style>
