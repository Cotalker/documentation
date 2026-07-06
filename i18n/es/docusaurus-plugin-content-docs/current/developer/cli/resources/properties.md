---
title: Tipos de propiedad y propiedades (YAML)
sidebar_label: Propiedades y tipos
displayed_sidebar: developer
---

El modelo de datos de Cotalker se construye a partir de dos recursos relacionados: **tipos de propiedad** y **propiedades**. Entender la relación entre ellos es la clave de todo el modelo, así que empecemos por ahí.

## El modelo mental: tipo vs. instancia

Un **tipo de propiedad** es un *esquema* — define la forma de algo, como "una Ubicación tiene una dirección, una ciudad y un país." Una **propiedad** es una *instancia* de ese esquema — como "Santiago, en Av. Providencia 1234, en Chile."

Si trabajaste con bases de datos, un tipo de propiedad es la definición de la tabla y una propiedad es una fila. Defines el tipo una vez, y luego creas tantas propiedades de ese tipo como necesites.

Como las propiedades dependen de su tipo, el tipo debe existir primero — y `cotctl apply --dir` impone exactamente ese orden (tipos de propiedad antes que propiedades).

## Tipos de propiedad

Un tipo de propiedad declara un `code`, un nombre `display` y una lista de `schemaNodes` (sus campos):

```yaml
kind: PropertyType
code: location
display: Location
hidden: true
schemaNodes:
  - key: address
    display: Address
    basicType: string
    validators:
      required: true
  - key: city
    display: City
    basicType: string
```

| Campo | Requerido | Notas |
|---|---|---|
| `kind` | Sí | Siempre `PropertyType` |
| `code` | Sí | Único por empresa. **Inmutable tras la creación** |
| `display` | Sí | Nombre para mostrar en la UI |
| `hidden` | No | Por defecto `true`. Ver abajo |
| `viewPermissions` | Condicional | Nombres de AccessRole. **Requerido cuando `hidden: false`** |
| `schemaNodes` | No | Las definiciones de campos |

### Tipos visibles vs. ocultos

La mayoría de los tipos de propiedad son maquinaria interna (estados de workflow, configuración) y deberían quedar en `hidden: true`. Pon `hidden: false` solo para tipos que los usuarios realmente navegan en la UI de la plataforma — catálogos de ubicaciones, equipos o empleados que aparecen en selectores de formularios. Cuando lo hagas, **debes** listar los roles que pueden navegarlos:

```yaml
hidden: false
viewPermissions:
  - Admin
  - "Human Resources"   # los espacios están permitidos en los nombres de rol
```

<div className="alert alert--info">

**No puedes borrar un schema node vía YAML.** Si el servidor tiene campos que tu YAML no, `cotctl` los conserva — la omisión nunca es destructiva acá. Para retirar un nodo, pon `isActive: false` en él.

</div>

## Propiedades

Una propiedad es una instancia. Nombra su tipo y completa el esquema con un `schemaInstance`:

```yaml
kind: Property
code: santiago
display: Santiago
propertyType: location          # inmutable tras la creación
schemaInstance:
  address: Av. Providencia 1234
  city: Santiago
  country: Chile
```

| Campo | Requerido | Notas |
|---|---|---|
| `kind` | Sí | Siempre `Property` |
| `code` | Sí | Único por empresa. Mín. 3 caracteres. **Inmutable** |
| `display` | Sí | Nombre para mostrar (mutable) |
| `propertyType` | Sí | El **code** del tipo. **Inmutable tras la creación** |
| `schemaInstance` | No | Los datos, indexados por el `schemaNodes[].key` del tipo |

Las claves dentro de `schemaInstance` deben coincidir con los campos `key` que definiste en el tipo de propiedad. Para ver qué claves son válidas:

```bash
cotctl property-types get location -c acme
```

### Jerarquías con `subproperty`

Las propiedades pueden formar árboles padre-hijo vía `subproperty` (una lista de códigos de propiedades hijas) — útil para cosas como regiones que contienen ciudades:

```yaml
kind: Property
code: region_sur
display: Región Sur
propertyType: location
subproperty:
  - santiago
  - temuco
```

Las hijas deben existir antes que el padre — o aplicarse en el mismo archivo de batch.

<div className="alert alert--primary">

**Dos campos inmutables en una propiedad: `code` y `propertyType`.** Ninguno puede cambiar tras la creación. Para "mover" una propiedad a otro tipo, desactiva la vieja y crea una nueva con el tipo correcto — los datos no se migran automáticamente.

</div>

## Desactivar

Prefiere el comando dedicado:

```bash
cotctl properties deactivate santiago -c acme
```

Si una propiedad todavía está referenciada por un workflow o formulario activo, la desactivación se **bloquea** — resuelve la dependencia primero. Nota que desactivar un *tipo* de propiedad no desactiva sus propiedades; quedan activas pero huérfanas, así que desactiva en el orden correcto.

## Ver también

- [apply](../commands/apply.md) — el orden de apply pone tipos antes que propiedades
- [Workflows](./workflows.md) — los estados de workflow son propiedades
- [Cargos](./jobtitles.md) — referencian tipos de propiedad y propiedades
