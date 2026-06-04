---
title: Practicá primero en una compañía demo
sidebar_label: Compañía demo
displayed_sidebar: developer
---

Antes de apuntar `cotctl` al entorno de un cliente real, hacete un favor: **practicá primero en una compañía demo.** Este único hábito es la mejor forma de aprender la herramienta con cero riesgo — tu primer caso real nunca debería ser una compañía productiva.

## Por qué importa

`cotctl apply` hace cambios reales en un entorno real. Mientras todavía estás aprendiendo — agarrándole la mano a los perfiles, al ciclo validate → apply, a scaffoldear un workflow, a ver cómo se ve un error — querés un lugar donde los errores no cuesten nada. Una **compañía demo** es exactamente eso: un entorno descartable donde podés experimentar libremente, romper cosas, empezar de nuevo y ganar confianza antes de que nada toque a un cliente en vivo.

<div className="alert alert--primary">

**La regla práctica.** Tu *primera* corrida de punta a punta de cualquier flujo nuevo — y tu *primera* vez usando `cotctl` — debería ser en una compañía demo o sandbox, nunca en producción. Graduate a entornos reales solo cuando los pasos te salgan solos.

</div>

## Conseguir una compañía demo

Las compañías nuevas se crean a través del **Partner Platform de Cotalker** — la aplicación web de super-admin para gestionar organizaciones en el ecosistema de Cotalker, donde crear y configurar una compañía nueva es una capacidad incorporada.

- **Si tenés acceso de super-usuario al Partner Platform**, creá ahí una compañía demo nueva y usala como tu sandbox.
- **Si no**, pedile a tu contacto de Cotalker que te aprovisione una compañía demo/sandbox. Para el onboarding de partners suele ser ideal, ya que puede venir pre-cargada para parecerse a una implementación real.

De cualquier forma, el objetivo es el mismo: una compañía no productiva que controlás por completo.

## Conectar cotctl a ella

Una vez que tenés una compañía demo, logueate igual que a cualquier otro entorno — simplemente se vuelve otro perfil. Darle un nombre obvio (como `demo`) hace que sea difícil confundirla con el entorno de un cliente más adelante:

```bash
cotctl login --url https://web.cotalker.com --subdomain my-demo --profile demo
```

De ahí en más, todo lo que practiques corre contra `-c demo`:

```bash
cotctl validate --dir ordenes-compra/
cotctl apply    --dir ordenes-compra/ -c demo
cotctl validate --workflow ordenes_compra -c demo
```

<div className="alert alert--info">

**El flag `-c` es tu red de seguridad.** Como cada comando te obliga a nombrar la compañía explícitamente, la única forma de que un cambio llegue a producción es que *escribas* un perfil de producción. Mantener un perfil `demo` claramente nombrado vuelve obvia la opción segura. Mirá [Autenticación](./authentication.md) para ver cómo funcionan los perfiles.

</div>

## Una primera corrida sugerida

Una gran forma de estrenar tu compañía demo es hacer la receta completa de workflow de punta a punta — generar un scaffold, validarlo, aplicarlo, y correr el check de preparación para producción — todo contra `-c demo`:

```bash
cotctl workflows scaffold --name ordenes-compra --code oc --display "Órdenes de Compra"
cotctl validate --dir ordenes-compra/
cotctl apply    --dir ordenes-compra/ -c demo
cotctl validate --workflow ordenes_compra -c demo
```

Nada acá puede dañar a un cliente — así que experimentá, inspeccioná el resultado en la UI de la compañía demo, ajustá el YAML, y re-aplicá tantas veces como quieras.

## Graduarte a entornos reales

Una vez que estés cómodo, el trabajo real son los mismos comandos con un perfil distinto. Una progresión sana es:

**demo → staging → producción** — probá un cambio en tu compañía demo, promovelo al entorno de staging de un cliente, y recién después a producción. El flujo de [exportar e importar](./commands/export-import.md) es cómo llevás el mismo YAML a través de esos entornos.

## Próximos pasos

- [Tutoriales](./tutorials.md) — corré estos primero en tu compañía demo
- [Autenticación](./authentication.md) — perfiles y el flag `-c`
- [apply](./commands/apply.md) — lo que realmente cambia un entorno
