# 🎯 Proyecto Mirgor 1 - Gestor Integral de Costos y Entregas

**Aplicación profesional para gestión de costos, estructura de productos, compras y entregas con dashboard de indicadores en tiempo real.**

---

## 📋 Características Principales

### 1. **Gestión de Estructura de Producto (BOM)**
- Definición jerárquica de componentes
- Cálculo automático de costos unitarios
- Análisis de márgenes y rentabilidad
- Versionado de BOMs
- Control de costos por componente

### 2. **Módulo de Compras**
- Gestión integral de órdenes de compra (PO)
- Registro y seguimiento de proveedores
- Seguimiento de pagos y vencimientos
- Historial completo de compras
- Estados de órdenes en tiempo real

### 3. **Gestión de Entregas**
- Planificación según demanda y cronograma
- Seguimiento de estado de entregas
- Alertas automáticas de retrasos
- Control de inventario y ubicaciones
- Validación de entregas a tiempo

### 4. **Dashboard de Indicadores (KPIs)**
- Costo real vs. costo target en tiempo real
- Análisis de varianza de costos por producto
- Porcentaje de entregas a tiempo
- Timeline de entregas planificadas
- Rendimiento de proveedores
- Gráficos interactivos y exportables

---

## 🛠️ Stack Tecnológico

**Frontend:**
- React 18 + TypeScript
- Tailwind CSS para UI/UX
- Recharts para visualización de datos
- React Router para navegación
- Axios para API calls

**Backend:**
- Node.js 18 + Express.js
- TypeScript para type safety
- PostgreSQL 15 para persistencia
- JWT para autenticación
- Docker & Docker Compose

---

## 📁 Estructura del Proyecto

```
proyecto-mirgor-1/
├── frontend/                 # Aplicación React
│   ├── src/
│   │   ├── pages/           # Páginas principales
│   │   ├── components/      # Componentes reutilizables
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
│
├── backend/                  # API Node.js/Express
│   ├── src/
│   │   ├── routes/          # Rutas de API
│   │   ├── database/        # Schema y migraciones
│   │   └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
│
├── docker-compose.yml        # Orquestación de contenedores
├── .env.example              # Variables de entorno
├── API.md                    # Documentación de API
├── INSTALLATION.md           # Guía de instalación
└── README.md
```

---

## 🚀 Inicio Rápido

### Con Docker (Recomendado)

```bash
# 1. Clonar repositorio
git clone https://github.com/wga2004/proyecto-mirgor-1.git
cd proyecto-mirgor-1

# 2. Copiar variables de entorno
cp .env.example .env

# 3. Levantar contenedores
docker-compose up --build
```

Acceso:
- 🌐 Frontend: http://localhost:3000
- 🔌 API: http://localhost:3001/api
- 🗄️ PostgreSQL: localhost:5432

### Instalación Local

Ver [INSTALLATION.md](./INSTALLATION.md) para instrucciones detalladas.

---

## 📚 Documentación

- **[API.md](./API.md)** - Documentación completa de endpoints
- **[INSTALLATION.md](./INSTALLATION.md)** - Guía de instalación
- **[backend/README.md](./backend/README.md)** - Setup backend
- **[frontend/README.md](./frontend/README.md)** - Setup frontend

---

## 💡 Flujo de Uso

```
1. REGISTRARSE → 2. CREAR PRODUCTOS → 3. REGISTRAR PROVEEDORES
        ↓
4. CREAR ÓRDENES DE COMPRA → 5. PLANIFICAR ENTREGAS
        ↓
6. MONITOREAR KPIs EN DASHBOARD → 7. GENERAR REPORTES
```

---

## 🔐 Autenticación

Todas las rutas están protegidas con JWT. Al login/register, recibirás un token que debe enviarse en el header:

```
Authorization: Bearer <token>
```

---

## 📊 KPIs Disponibles

| Indicador | Descripción |
|-----------|-------------|
| **Costo Target vs Real** | Comparativa de costos planificados vs. reales |
| **Varianza de Costos** | Desviación por producto en porcentaje |
| **Entregas a Tiempo** | Porcentaje de entregas puntuales |
| **Estado de Entregas** | Distribución: Pendientes, En tránsito, Completadas |
| **Rendimiento Proveedores** | Tasa de cumplimiento y días de retraso |
| **Timeline de Entregas** | Proyección de entregas por fecha |

---

## 🔧 Configuración

### Variables de Entorno (.env)

```env
# Base de Datos
DB_USER=mirgor
DB_PASSWORD=mirgor123
DB_NAME=mirgor_db

# JWT
JWT_SECRET=your-super-secret-key-change-in-production

# Backend
NODE_ENV=development
PORT=3001

# Frontend
REACT_APP_API_URL=http://localhost:3001/api
```

---

## 🐛 Troubleshooting

### Error de conexión a BD
```bash
docker-compose down -v
docker-compose up --build
```

### Puerto en uso
```bash
# Cambiar en .env
PORT=3002
```

### Borrar datos y reiniciar
```bash
docker-compose down -v  # Elimina volúmenes
docker-compose up --build
```

---

## 👨‍💼 Desarrollador

**Ingeniero Recibido en Harvard**  
**MBA en Economía - MIT**  
*Proyecto Mirgor 1 - Junio 2026*

---

## 📄 Licencia

Proyecto privado. Todos los derechos reservados.

---

**¿Preguntas o problemas?** Consulta [API.md](./API.md) o [INSTALLATION.md](./INSTALLATION.md)