---
title: 'Workflow bots: flow control'
sidebar_label: Flow control
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/docs/workflows/bots/fc-*.md @ 4f7248a (2026-07-06) -->

Flow-control bots (`FC*`) do not touch tasks or channels — they shape how the workflow itself runs: looping over arrays, branching on a value, and pausing. Use them instead of custom JavaScript whenever you can; the engine understands them natively and they generate proper subcontexts.

A note on **subcontexts**: `FCEach`, `FCEachBulk` and `FCSwitchAll` each spawn a fresh child context per iteration/match. Inside a subcontext, the loop variable is available and results are merged back into the parent when the loop finishes.

## FCEach

Iterates an array and runs the `STEP` branch once per item, each in its own subcontext where the loop variable resolves to the current item. `DONE` runs once at the end, in the parent context.

Key parameters: `control` (the array), `target` (the variable name; inside each subcontext `{{target}}` is the current item).

```yaml
- key: s1
  name: FCEach
  version: "4.1.0"
  data:
    control:
      - "5d23a26435513c1230fc671d"
      - "5d23a26435513c1230fc671e"
    target: recipient
  next:
    STEP: s_send      # runs once per item
    DONE: ""          # runs once, after all items
```

Gotchas:

- Iterations run **serially** (`async.eachOfSeries`). For parallel batches use `FCEachBulk`.
- The subcontext inherits the parent's `externalData` and adds `target → currentItem`.

## FCEachBulk

Splits `sourceArray` into batches and runs the `BATCH` branch once per batch (not per item). Designed to feed bulk bots like `PBBulkTaskUpdate` → `PBBulkMessage`.

Key parameters: `sourceArray`, `targetVariable` (inside the subcontext resolves to the batch array), `batchSize` (1–100, default 10), `concurrency` (1–10, default 1), `interBatchDelay` (ms between batches, default 300).

```yaml
- key: s_each
  name: FCEachBulk
  data:
    sourceArray: "{{tasks}}"
    targetVariable: "tasks"
    batchSize: 20
    interBatchDelay: 500
  next:
    BATCH: s_update   # runs once per batch
    DONE: ""
    ERROR: ""
```

Gotchas:

- **Item-level** errors (a row failing inside the batch bot) do **not** trigger `ERROR`. Only a **workflow-level** failure (a batch subcontext that could not execute) does.
- `batchSize` is auto-clamped to ≤ 100 and `concurrency` to ≤ 10. The current implementation processes batches sequentially even when `concurrency > 1`.
- Batch metrics are written to `externalData.bulkMetrics`.

## FCIfElse

Compares `left` and `right` with `operator` and routes to `IF` (true) or `ELSE` (false). Values are auto-cast (string/number/date coercion).

Key parameters: `left`, `right`, `operator` (`eq` default, `neq`, `gt`, `lt`, `gte`, `lte`).

```yaml
- key: s1
  name: FCIfElse
  data:
    left: "{{answer.amount}}"
    right: 100000
    operator: "gte"
  next:
    IF: s_high_value
    ELSE: s_normal
```

Gotchas:

- Coercion behavior for mixed types depends on the internal `compare` helper — test edge cases.
- For more than two branches, use `FCSwitchOne` or `FCSwitchAll`.

## FCSleep

Pauses for `milliseconds` (default 1000), then continues to `DEFAULT`.

```yaml
- key: s1
  name: FCSleep
  data:
    milliseconds: 2000
  next:
    DEFAULT: ""
```

Gotchas:

- The pause is a real `setTimeout` that **blocks the worker** for that duration. Avoid long sleeps inside high-throughput pipelines.
- Prefer this over a `CCJS setTimeout`.

## FCSwitchAll

Evaluates each case `rcaseA…rcaseE` against `lexpression` and runs **every** matching case, each in its own subcontext. After all matches, `DONE` runs. If nothing matched, `DEFAULT` runs (also as a subcontext).

Key parameters: `lexpression`, `rcaseA`…`rcaseE`, `operator` (`eq` default, `neq`, `gt`, `lt`).

```yaml
- key: s1
  name: FCSwitchAll
  data:
    lexpression: "{{answer.tags}}"
    rcaseA: "billing"
    rcaseB: "legal"
    rcaseC: "ops"
    operator: "eq"
  next:
    CASE_A: s_billing
    CASE_B: s_legal
    CASE_C: s_ops
    DEFAULT: s_default
    DONE: s_audit
```

Gotchas:

- Matching cases run **in series**, one subcontext at a time.
- Only cases present in `next` are evaluated — always declare `DEFAULT`.

## FCSwitchOne

Like `FCSwitchAll`, but runs only the **first** matching case and does **not** generate subcontexts or a `DONE` step. Falls back to `DEFAULT`.

Key parameters: `lexpression`, `rcaseA`…`rcaseE`, `operator` (`eq` default, `neq`, `gt`, `lt`).

```yaml
- key: s1
  name: FCSwitchOne
  data:
    lexpression: "{{answer.priority}}"
    rcaseA: "high"
    rcaseB: "medium"
    rcaseC: "low"
    operator: "eq"
  next:
    CASE_A: s_high
    CASE_B: s_medium
    CASE_C: s_low
    DEFAULT: s_unknown
```

Gotchas:

- Cases are evaluated A → B → C → D → E; the first match wins.
- Only cases present in `next` are considered — declare every case you want evaluated.
