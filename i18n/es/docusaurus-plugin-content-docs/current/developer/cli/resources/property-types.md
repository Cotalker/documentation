---
title: Tipos de propiedad (YAML)
sidebar_label: Tipos de propiedad
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/property-types.ts, src/schemas/property-type.schema.ts, src/resources/property-type.resource.ts, docs/property-types/ @ 4f7248a (2026-07-06) -->

Un **tipo de propiedad** es un esquema — define la forma de una clase de datos. Su lista de `schemaNodes` son los campos; cada [propiedad](./properties.md) de ese tipo los rellena. Si un tipo de propiedad es la definición de una tabla, una propiedad es una fila. Esta página es la referencia a fondo del lado del tipo y del comando `cotctl property-types`; para el modelo mental tipo-vs-instancia y el lado de la propiedad, empieza por [Propiedades y tipos](./properties.md).

<div className="alert alert--info">

**Dos comandos separados.** `cotctl property-types` gestiona las definiciones de tipo (esta página). `cotctl properties` gestiona las instancias. Son comandos de primer nivel distintos, y se aplican en ese orden.

</div>

## La forma de un tipo de propiedad

```yaml
kind: PropertyType
code: location                     # clave de upsert, inmutable
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
    isIndexable: true
```

| Campo | Requerido | Notas |
|---|---|---|
| `kind` | Sí | Siempre `PropertyType` |
| `code` | Sí | Único por empresa. **Inmutable tras la creación** |
| `display` | Sí | Nombre de despliegue en la UI |
| `hidden` | No | Predeterminado `true`. Mira visibilidad más abajo |
| `viewPermissions` | Condicional | **Nombres** de AccessRole. **Requerido (no vacío) cuando `hidden: false`** |
| `schemaNodes` | No | Las definiciones de campo (las keys deben ser únicas) |
| `isActive` | No | Predeterminado `true` |
| `displayTranslations`, `propertyImportPermissions`, `hierarchyLevel` | No | Etiqueta localizada, roles de importación, profundidad de jerarquía |

## Nodos de esquema: los campos

Cada entrada en `schemaNodes` define un campo. Los principales:

```yaml
schemaNodes:
  - key: office                    # el nombre del campo — se vuelve una key de schemaInstance
    display: Office Location
    basicType: COTProperty         # el tipo de dato
    subType: office_location       # requerido para COTProperty — el código del tipo destino
    isArray: false
    validators:
      required: false
    weight: 10                     # orden de despliegue (menor primero)
    isActive: true
```

| Campo del nodo | Requerido | Notas |
|---|---|---|
| `key` | Sí | Única dentro del tipo. La key que aparece en el `schemaInstance` de una propiedad |
| `basicType` | Sí | El tipo de dato (mira el catálogo más abajo). **Inmutable** una vez que el nodo existe |
| `subType` | Condicional | El **código** del PropertyType destino, requerido por el backend para `COTProperty`. **Inmutable** |
| `isArray` | No | Predeterminado `false`. Convierte el campo en una lista. **Inmutable** |
| `display`, `description` | No | Etiquetas |
| `validators` | No | `required`, `min`/`max`, `arrayMin`/`arrayMax` y una lista `validator` personalizada |
| `default`, `weight`, `visualization` | No | Valor predeterminado, orden de despliegue, pista de renderizado |
| `isActive`, `isHidden`, `isNonEditable`, `isIndexable` | No | Flags a nivel de nodo |

### El catálogo de `basicType`

Hay exactamente ocho tipos:

| `basicType` | Contiene | Notas |
|---|---|---|
| `string` | Texto libre, URLs, códigos | El caballo de batalla; indexable, admite arreglo |
| `number` | Entero o decimal | Aplican los validadores `min`/`max` |
| `date` | Fecha-hora ISO 8601 | |
| `boolean` | true/false | |
| `link` | Una URL | |
| `file` | Un `_id` de archivo | |
| `COTProperty` | Un `_id` de propiedad | Necesita `subType` (el código del tipo destino); el selector se filtra a él |
| `COTUser` | Un `_id` de usuario | El selector lista usuarios |

<div className="alert alert--info">

**Cómo los nodos de esquema se conectan con las propiedades.** Una propiedad de este tipo lleva un `schemaInstance` — un mapa de key/valor cuyas keys son exactamente los campos `key` que defines acá. Define un nodo `key: city`, y toda [propiedad](./properties.md) del tipo puede fijar `schemaInstance.city`. Para ver las keys válidas de un tipo, corre `cotctl property-types get <code>`.

</div>

## Inmutabilidad y la fusión no destructiva

<div className="alert alert--primary">

**El `basicType`, `subType` e `isArray` de un nodo quedan congelados una vez que el nodo existe.** Todo lo demás de un nodo (display, validadores, `isActive`, weight, …) es editable, pero no puedes cambiar lo que un campo *es* después de que los datos ya podrían ajustarse a él. Si tu YAML cambia uno de los tres atributos congelados en una key existente, `cotctl` rechaza el documento completo con un error de inmutabilidad — antes de tocar el backend. Para rehacer un campo, retira el nodo viejo y agrega uno nuevo bajo otra key.

</div>

<div className="alert alert--secondary">

**Omitir un nodo nunca lo borra.** Al aplicar un tipo, cualquier nodo que exista en el servidor pero no esté en tu YAML se **conserva** — se fusiona de vuelta en la actualización. Así un YAML parcial no puede descartar campos por accidente. Para retirar un nodo, inclúyelo explícitamente con `isActive: false`; no hay forma de borrar permanentemente un nodo de esquema por YAML.

</div>

## Tipos visibles vs. ocultos

La mayoría de los tipos de propiedad son maquinaria interna y quedan `hidden: true`. Pon `hidden: false` solo para catálogos que los usuarios realmente exploran en la UI (ubicaciones, equipos). Cuando lo hagas, **debes** listar los roles autorizados a verlo:

```yaml
hidden: false
viewPermissions:
  - Admin
  - "Human Resources"   # los nombres de rol pueden tener espacios — enciérralos entre comillas
```

`viewPermissions` son **nombres** de AccessRole, sensibles a mayúsculas. Esto se valida antes de cualquier llamada a la API — `hidden: false` con un `viewPermissions` vacío falla la validación. A la inversa, volver un tipo visible a `hidden: true` limpia sus `viewPermissions`, y `cotctl` te advierte cuando un apply haría eso.

## Trabajar con tipos de propiedad

```bash
# Lectura
cotctl property-types list                       # activos (predeterminado)
cotctl property-types list --all                 # incluir inactivos
cotctl property-types list --search loca         # mínimo 3 caracteres
cotctl property-types get location
cotctl property-types export location -o location.yaml
cotctl property-types export -o all-types.yaml   # todos los tipos, multidocumento

# Escritura
cotctl property-types apply -f location.yaml --dry-run
cotctl property-types apply -f location.yaml -y

# Retirar
cotctl property-types deactivate location
```

`apply` toma `-f/--file` (obligatorio), `--dry-run` y `-y/--yes`, y admite archivos multidocumento. No hay borrado — `deactivate` (poner `isActive: false`) es la vía de retiro.

<div className="alert alert--warning">

**El `subType` de un nodo `COTProperty` no se comprueba al aplicar.** Si un nodo apunta a un tipo de propiedad que aún no existe, `cotctl` lo acepta y falla en tiempo de ejecución. Aplica primero el tipo referenciado — en una aplicación por carpeta, ordena tus archivos para que las dependencias vayan primero.

</div>

## Orden de aplicación

Los tipos de propiedad se aplican **segundos, después de los roles** (porque `viewPermissions` referencia nombres de rol) y **antes de las propiedades, workflows y cargos** que los referencian. `cotctl apply --dir` impone el orden.

## Ver también

- [Propiedades y tipos](./properties.md) — el modelo tipo-vs-instancia y el lado de la propiedad (instancia)
- [Roles](./roles.md) — los `viewPermissions` que referencia un tipo visible
- [Cargos](./jobtitles.md) — referencian tipos de propiedad vía `allowedExtensions`
- [apply](../commands/apply.md) — los tipos de propiedad se aplican antes que las propiedades
