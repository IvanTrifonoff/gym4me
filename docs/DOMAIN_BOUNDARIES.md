# Границы бизнес-доменов

## Gym

Владелец: `gym`.

Organization, Branch, StaffMember, Role, Permission, GymSettings, LoyaltyRule, Reward, Integration.

Gym не изменяет тренировочную историю спортсмена и не отправляет push напрямую.

## Trainer

Владелец: `trainer`.

TrainerProfile, TrainerAssignment, TrainerAvailability.

Доступ к спортсмену всегда проверяется policy: `canViewAthlete`, `canEditProgram`, `canViewStats`.

## Athlete

Владелец: `athlete`.

AthleteProfile, AthleteState, Workout, BodyweightEntry, CustomExercise.

Кастомное упражнение принадлежит конкретному спортсмену и не является глобальным каталогом без явного publish-механизма.

## Bookings

Владелец: `bookings`.

Тренер и спортсмен не меняют booking напрямую. Они вызывают BookingService.

## Notifications

Владелец: `notifications`.

Другие домены публикуют события, а notifications решает, создавать ли in-app сообщение, push, badge или retry.

## Analytics

Только чтение и read-model. Analytics не изменяет бизнес-состояние.
