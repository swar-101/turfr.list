# Payment State Contract

## Allowed States

* pending
* pending_verification
* confirmed

## Valid Transitions

* pending → pending_verification
* pending_verification → confirmed

## Invalid Transitions

* pending → confirmed
* confirmed → pending
* confirmed → pending_verification

## UI Eligibility

### canUserPay(status)

User can pay ONLY IF: 

1. User has joined 
2. User is NOT organizer
3. Turf is confirmed
4. Player is NOT waitlisted
5. Payment is still pending 

* pending → true
* pending_verification → false
* confirmed → false
* waitlist → false
* unknown → false