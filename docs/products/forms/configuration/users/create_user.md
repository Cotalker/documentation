---
title: Crear Usuario
---

import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import UserTypes, {toc as Title1TOC} from '/i18n/es/docusaurus-plugin-content-docs/current/products/forms/configuration/users/_user_types.mdx'; 


## Introducción {#intro}
Se pueden crear usuarios según diferentes [_cargos_](/docs/products/forms/configuration/users/user_types) o roles, habilitándolos para realizar sus funciones correspondientes y limitando su acceso a data y acciones.

Cada usuario ingresado será registrado dentro de la sección _Usuarios_.

Los nuevos usuarios recibirán instrucciones por correo electrónico para ingresar a Cotalker.

## Requisitos {#requirements}
Sólo usuarios con el cargo de [_administrador_](/docs/products/forms/configuration/users/user_types#admin) pueden crear usuarios.

## Pasos para Crear un Usuario {#steps}

<Tabs>
<TabItem value="desktop" label="Escritorio" default>

1. Selecciona **Usuarios** desde **Configuración** en el _menu principal_.
2. Presiona el botón de acciones desde el panel de **Usuarios**.

<div className="img_sizing">

![create user](/img/productos_es/product_forms_users_create_01.png)

</div>

3. Elije la opción **Nuevo usuario**.

<div className="img_sizing">

![create user](/img/productos_es/product_forms_users_create_02.png)

</div>

4. Completa y envía el formulario.

<div className="img_sizing">

![create user](/img/productos_es/product_forms_users_create_03.png)

</div>

</TabItem>
<TabItem value="mobile" label="Versión Móvil" default>

1. Selecciona **Usuarios** desde **Configuración** en el _menu principal_.
2. Presiona el botón de acciones desde el panel de **Usuarios**.
3. Elije la opción **Nuevo usuario**.
4. Completa y envía el formulario.

<div className="img_sizing">

![create user](/img/productos_es/product_forms_users_create_01m.png)

</div>

</TabItem>
</Tabs>


## Detalles del Formulario {#details}

<details>
<summary>Crear Nuevo Usuario</summary>
<div>

<div className="img_sizing_small">

![create user](/img/productos_es/product_forms_users_create_04.png)

</div>

- **<span className="badge badge--danger">1.</span> Nombres**: Escribe el nombre o nombres del usuario.
- **<span className="badge badge--danger">2.</span> Apellidos**: Escribe el apellido o apellidos del usuario
- **<span className="badge badge--danger">3.</span> E-Mail**: Ingresa el email del usuario. (Ver advertencia abajo.)
- **<span className="badge badge--danger">4.</span> Cargo**: Elige uno de los [cargos](/docs/products/forms/configuration/users/user_types) disponibles.  
<UserTypes/>

:::caution Atención
El email se utilizará como identificador del usuario y por lo tanto **no** podrá ser cambiado o editado después que se envíe el formulario.

**Nota**: _La data ingresada en los campos `Nombres`, `Apellidos` y `Cargo` se puede editar desde el [Panel Administrativo](/docs/documentation/admin/users)._
:::




</div>
</details>


## Resultado Esperado {#results}
Al enviar el formulario, el perfil de usuario es creado y podrás ver los siguientes comprobantes de éxito:

- A. Mensaje de Sistema
- B. Usuario presente en panel de _Usuarios_.

<div className="img_sizing">

![create user](/img/productos_es/product_forms_users_create_05.png)

</div>

:::info Importante
Un correo electrónico es enviado al usuario con sus credenciales para que pueda [ingresar a Cotalker](/docs/documentation/client/platform_access/first_steps).
:::