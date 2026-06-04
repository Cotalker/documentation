---
title: Tutoriales
sidebar_label: Tutoriales
displayed_sidebar: developer
---

Las páginas de referencia te dicen *qué* hace cada comando. Esta página te muestra *cómo* se combinan, con recetas completas para seguir paso a paso sobre las cosas que realmente vas a hacer en un proyecto. Cada receta lista qué necesitás antes de empezar y cómo se ve el éxito, para que sepas cuándo funcionó.

Si todavía no instalaste y te autenticaste, arrancá por [Instalación](./installation.md) y [Autenticación](./authentication.md) — todas las recetas de abajo asumen que tenés un perfil funcionando.

## Receta 1 — Iniciar sesión y confirmar tu setup

**Qué necesitás:** `cotctl` instalado, y acceso de administrador a un entorno.

```bash
# Login (flujo de navegador por defecto)
cotctl login --url https://web.cotalker.com --subdomain acme

# Confirmar que el perfil se guardó
cotctl profile list
```

**Cómo se ve el éxito:** `cotctl profile list` muestra una fila `acme` con tu URL y usuario. Estás listo para ejecutar cualquier comando con `-c acme`.

## Receta 2 — Crear una encuesta nueva desde cero

**Qué necesitás:** un perfil funcionando, y una idea del formulario que querés construir.

```bash
# 1. Escribí el YAML (ver la referencia de Encuestas para la estructura)
vim my-survey.yaml

# 2. Validalo offline — detectá errores antes de tocar el entorno
cotctl validate -f my-survey.yaml

# 3. Previsualizá lo que se enviaría, sin cambiar nada
cotctl apply -f my-survey.yaml -c acme --dry-run

# 4. Aplicá de verdad
cotctl apply -f my-survey.yaml -c acme
```

**Cómo se ve el éxito:**

```
Survey "my_survey" created successfully (id: 507f1f77bcf86cd799439011)
```

<div className="alert alert--info">

Esta secuencia validate → dry-run → apply es el default seguro para *todo* recurso, no solo encuestas. Construí el hábito ahora.

</div>

## Receta 3 — Modificar una encuesta existente

**Qué necesitás:** el `code` de una encuesta que ya existe.

```bash
# 1. Exportala como punto de partida
cotctl surveys export existing_survey -c acme -o survey.yaml

# 2. Editá el YAML
vim survey.yaml

# 3. Validá, luego aplicá — se actualiza automáticamente porque el code existe
cotctl validate -f survey.yaml
cotctl apply -f survey.yaml -c acme
```

**Cómo se ve el éxito:** `Survey "existing_survey" updated successfully`. Podés agregar, quitar, editar y reordenar preguntas libremente — `cotctl` las matchea por `identifier` y preserva sus IDs.

## Receta 4 — Promover una encuesta entre entornos

**Qué necesitás:** perfiles para el entorno origen y el destino.

```bash
# 1. Exportar del origen
cotctl surveys export my_survey -c acme-prod -o survey.yaml

# 2. Aplicar al destino
cotctl apply -f survey.yaml -c devteam
```

**Cómo se ve el éxito:** la encuesta se crea en el entorno destino. El YAML exportado contiene IDs del origen, pero se ignoran al crear — el destino genera los suyos.

## Receta 5 — Construir y desplegar un workflow desde un scaffold

Esta es la grande — el ciclo completo desde la nada hasta un workflow en vivo.

**Qué necesitás:** un perfil funcionando y un nombre + código corto para tu flujo.

```bash
# 1. Generar el esqueleto
cotctl workflows scaffold --name ordenes-compra --code oc \
  --display "Órdenes de Compra"

# 2. Personalizar los archivos generados:
#    - estados en data-model/states.yaml
#    - transiciones en workflow.yaml
#    - roles/permisos en access/

# 3. Validar la carpeta entera offline
cotctl validate --dir ordenes-compra/

# 4. Aplicar — las entidades se despliegan en el orden de dependencias correcto, automáticamente
cotctl apply --dir ordenes-compra/ -c dev

# 5. Correr el checklist de preparación para producción contra el workflow en vivo
cotctl validate --workflow ordenes_compra -c dev
```

**Cómo se ve el éxito:** el paso 4 reporta `N created, 0 errors`, y el paso 5 termina con `production ready`. Los pasos 2–5 forman un ciclo que podés repetir con seguridad — cada apply es idempotente.

## A dónde ir después

- [Referencia YAML de recursos](./resources/surveys.md) — el esquema detrás de cada archivo que editás
- [Solución de problemas](./troubleshooting.md) — cuando una receta no sale según el plan
- [CI/CD](./ci-cd.md) — corré estos flujos automáticamente en cada merge
