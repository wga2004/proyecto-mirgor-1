# 📚 Documentación API - Proyecto Mirgor

## Base URL
```
http://localhost:3001/api
```

## Autenticación

Todas las rutas (excepto login/register) requieren token JWT en el header:

```
Authorization: Bearer <token>
```

---

## Autenticación

### Registro
```http
POST /auth/register
```

**Body:**
```json
{
  "email": "usuario@example.com",
  "password": "contraseña123",
  "name": "Nombre Usuario"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "usuario@example.com",
    "name": "Nombre Usuario"
  },
  "token": "jwt_token"
}
```

### Login
```http
POST /auth/login
```

**Body:**
```json
{
  "email": "usuario@example.com",
  "password": "contraseña123"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "usuario@example.com",
    "name": "Nombre Usuario"
  },
  "token": "jwt_token"
}
```

---

## Productos

### Listar todos los productos
```http
GET /products
```

**Response:**
```json
[
  {
    "id": "uuid",
    "sku": "PROD-001",
    "name": "Producto A",
    "description": "Descripción del producto",
    "target_cost": 150.00,
    "components": [
      {
        "id": "uuid",
        "component_name": "Componente 1",
        "quantity": 2,
        "unit_cost": 50.00
      }
    ]
  }
]
```

### Obtener un producto
```http
GET /products/:id
```

### Crear producto
```http
POST /products
```

**Body:**
```json
{
  "sku": "PROD-001",
  "name": "Producto A",
  "description": "Descripción",
  "target_cost": 150.00,
  "components": [
    {
      "name": "Componente 1",
      "quantity": 2,
      "unit_cost": 50.00
    }
  ]
}
```

### Actualizar producto
```http
PUT /products/:id
```

---

## Órdenes de Compra

### Listar órdenes de compra
```http
GET /purchase-orders
```

### Crear orden de compra
```http
POST /purchase-orders
```

**Body:**
```json
{
  "supplier_id": "uuid",
  "expected_delivery_date": "2026-12-31",
  "notes": "Notas opcionales",
  "items": [
    {
      "product_id": "uuid",
      "quantity": 100,
      "unit_price": 25.00
    }
  ]
}
```

### Actualizar estado de orden
```http
PATCH /purchase-orders/:id/status
```

**Body:**
```json
{
  "status": "confirmed"
}
```

**Estados válidos:** `pending`, `confirmed`, `shipped`, `delivered`

---

## Entregas

### Listar entregas
```http
GET /deliveries
```

### Filtrar entregas por estado
```http
GET /deliveries/status/:status
```

**Estados válidos:** `pending`, `in_transit`, `completed`, `delayed`

### Crear entrega
```http
POST /deliveries
```

**Body:**
```json
{
  "purchase_order_id": "uuid",
  "product_id": "uuid",
  "quantity": 50,
  "scheduled_delivery_date": "2026-12-15",
  "location": "Almacén Principal"
}
```

### Actualizar entrega
```http
PATCH /deliveries/:id
```

**Body:**
```json
{
  "status": "completed",
  "actual_delivery_date": "2026-12-15",
  "notes": "Entregado correctamente"
}
```

---

## Dashboard - KPIs

### Obtener KPIs principales
```http
GET /dashboard/kpis
```

### Análisis de varianza de costos
```http
GET /dashboard/cost-variance
```

### Timeline de entregas
```http
GET /dashboard/delivery-timeline
```

### Rendimiento de proveedores
```http
GET /dashboard/supplier-performance
```

---

## Códigos de Error

| Código | Descripción |
|--------|-------------|
| 200 | Éxito |
| 201 | Creado exitosamente |
| 400 | Solicitud inválida |
| 401 | No autorizado |
| 404 | No encontrado |
| 500 | Error interno del servidor |
