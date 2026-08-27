# Событийные контракты v1

Envelope:

```json
{
  "id": "event_01",
  "type": "booking.confirmed",
  "version": 1,
  "occurredAt": "2026-08-27T12:00:00.000Z",
  "actor": { "type": "trainer", "id": "trainer_01" },
  "payload": {}
}
```

Минимальные события:

- `athlete.created`
- `trainer.assigned`
- `booking.requested`
- `booking.confirmed`
- `booking.rejected`
- `booking.cancelled`
- `booking.done`
- `loyalty.points_awarded`
- `reward.redeemed`
- `notification.created`
- `push.delivery_failed`

События идемпотентны по `id` и не содержат секреты или полный пользовательский state.
