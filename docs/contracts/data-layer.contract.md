# Data Layer Contract

## normalizePlayers()

### Guarantees

* Always returns an array
* Output structure is flat (no nested arrays)
* Each item contains:

    * playerName: string

### Fallback Rules

* null or undefined input → []
* missing or null name → "Unknown"

### Constraints

* Must not mutate input
* Must not throw errors for invalid input
