# API boundaries v1

## Athlete

```text
GET  /api/v1/athlete/me
GET  /api/v1/athlete/program
PUT  /api/v1/athlete/program
GET  /api/v1/athlete/workouts
POST /api/v1/athlete/workouts
GET  /api/v1/athlete/notifications
```

## Trainer

```text
GET  /api/v1/trainer/me
GET  /api/v1/trainer/athletes
GET  /api/v1/trainer/athletes/:id/stats
GET  /api/v1/trainer/athletes/:id/program
PUT  /api/v1/trainer/athletes/:id/program
GET  /api/v1/trainer/availability
PUT  /api/v1/trainer/availability
GET  /api/v1/trainer/bookings
POST /api/v1/trainer/bookings/:id/confirm
POST /api/v1/trainer/bookings/:id/reject
```

## Gym

```text
GET  /api/v1/gym/branches
POST /api/v1/gym/branches
GET  /api/v1/gym/staff
POST /api/v1/gym/staff/invites
PUT  /api/v1/gym/staff/:id
GET  /api/v1/gym/loyalty/rules
PUT  /api/v1/gym/loyalty/rules/:id
```

Legacy `/api/...` endpoints remain adapters during migration.
