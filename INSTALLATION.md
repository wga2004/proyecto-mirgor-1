# 🚀 Guía de Instalación - Proyecto Mirgor

## Requisitos Previos

- Docker y Docker Compose (recomendado)
- Node.js 18+ (para desarrollo local)
- PostgreSQL 15+ (si ejecutas sin Docker)

## Opción 1: Instalación con Docker (Recomendado)

### 1. Clonar el repositorio
```bash
git clone https://github.com/wga2004/proyecto-mirgor-1.git
cd proyecto-mirgor-1
```

### 2. Crear archivo `.env`
```bash
cp .env.example .env
```

### 3. Levantar los contenedores
```bash
docker-compose up --build
```

Esto iniciará:
- PostgreSQL en puerto 5432
- Backend API en puerto 3001
- Frontend React en puerto 3000

### 4. Acceder a la aplicación
- **Frontend:** http://localhost:3000
- **API:** http://localhost:3001/api
- **Base de datos:** localhost:5432

## Opción 2: Instalación Local

### Backend

#### 1. Ir a la carpeta backend
```bash
cd backend
```

#### 2. Instalar dependencias
```bash
npm install
```

#### 3. Configurar base de datos
```bash
# Crear base de datos
createdb mirgor_db

# Ejecutar migraciones
npm run db:migrate
```

#### 4. Iniciar servidor
```bash
npm run dev
```

El servidor correrá en `http://localhost:3001`

### Frontend

#### 1. Ir a la carpeta frontend
```bash
cd frontend
```

#### 2. Instalar dependencias
```bash
npm install
```

#### 3. Iniciar aplicación
```bash
npm start
```

La aplicación abrirá en `http://localhost:3000`

## Variables de Entorno

### Backend (.env)
```env
NODE_ENV=development
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_USER=mirgor
DB_PASSWORD=mirgor123
DB_NAME=mirgor_db
JWT_SECRET=your-secret-key
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:3001/api
```

## Primeros Pasos

1. **Registrarse:** Crear cuenta en la pantalla de login
2. **Crear Productos:** Añadir productos con su estructura de costos (BOM)
3. **Registrar Proveedores:** Configurar proveedores en la BD
4. **Crear Órdenes de Compra:** Generar POs para los productos
5. **Gestionar Entregas:** Planificar y seguir entregas
6. **Monitorear KPIs:** Ver dashboard con métricas en tiempo real

## Troubleshooting

### Puerto ya en uso
```bash
# Cambiar puerto en .env
PORT=3002
```

### Conexión a base de datos falla
```bash
# Verificar conexión PostgreSQL
psql -U mirgor -d mirgor_db -c "SELECT 1"
```

### Limpiar Docker
```bash
docker-compose down -v
docker-compose up --build
```

## API Endpoints Principales

Para documentación completa, ver [API.md](./API.md)
