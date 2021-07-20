---
id: howtoimplement
title: Preamble of a Cotalker Project
sidebar_label: Preamble of a Cotalker Project
---

import Mermaid from '@theme/Mermaid';

# Understaning Cotalker {#understaning-cotalker}

Cotalker offers a suite of tools that can be mixed to build custom workflows.
This is guild with good practices so that projects are successful for all parties. 

# Stakeholders {#stakeholders}

<Mermaid chart={`
	graph TD;
	    U[Users] --> B 
	    B[Supervisors] --> M
	    M[Management]  --> C --> M
	    C[Consultant] --> I --> C
	    I[Implementators]   --> A
	    A[Administration]  -.-> C
	    U & B & M --> A
`}/>

* __Users__: They use the platform and workflows.
* __Supervisors__: They create and manage tasks.
* __Management__: They view dashboards and indicators.

NOTE: A person can have more than just one role.

* __Consultant__: External industry expert and Cotalker representative .
* __Implementator__: They setup Cotalker based on the Consultant requirements.
* __Administrator__: They make incremental changes to the platform and monitor usage.

# Lifecycle {#lifecycle}

This is a standard overview of a client lifecycle:

<Mermaid chart={`
	graph TD;
	    A(Requirements) --> B;
	    B(Implementation Phase 1) --> C;
	    C(Customer Feedback) -.-> A;
	    C --> D;
	    D(Implementation Phase 2) --> E;
	    E(Delivery) --> F(Maintenance);
	    F -.-> A;
`}/>

* __Requirement__ phase it the most important to determine the size and complexity of the project. Good requierments allow good implementations
* __Implementation Phase-1__ Is to show the client how the final product would look like, it will not be fully funcitional, but sections, menu some surveys should be visible. This should take around the 10% of the total implementation time.
* __Customer Feedback__ This allows that all stakeholders can agree on how the final product would look like.
* __Implementation Phase-2__ Finish connecting and setting up the workflows.
* __Delivery__ Project release
