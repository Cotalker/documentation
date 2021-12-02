---
title: State Machines
sidebar_label: State Machines
---
import useBaseUrl from '@docusaurus/useBaseUrl';

State machines are definitions of how tasks behave. They define the initial state, to what state they can change, what triggers are executed, send reminders, and more.

## Get All SLAs in State Machine {#get-all-slas}
`GET /v1/tasks/{groupId}/sla/smstatemachine/{stateMachineId}`

## Get SLA by Id {#get-sla-by-id}
`GET /v1/tasks/{groupId}/sla/{slaId}`  

## Get All State Machines within Group
`GET /v1/tasks/{groupId}/sm/smstatemachine`

## Get All States within Group
`GET /v1/tasks/{groupId}/sm/smstate`

## Get All States within Company
`GET /v1/tasks/{groupId}/sm/smstate/all`
