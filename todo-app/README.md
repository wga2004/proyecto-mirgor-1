# 📋 To-Do List App - Gestor de Tareas

**Aplicación moderna de gestión de tareas con almacenamiento local (localStorage)**

## ✨ Características

### 📝 Gestión de Tareas
- ✅ Agregar tareas manualmente
- ✅ Editar tareas existentes
- ✅ Eliminar tareas
- ✅ Marcar como completadas
- ✅ Establecer prioridades (Alta, Media, Baja)
- ✅ Agregar fechas de vencimiento
- ✅ Agregar categorías/etiquetas

### 🔄 Filtrado y Búsqueda
- 🔍 Buscar tareas por texto
- 🏷️ Filtrar por categoría
- 📊 Filtrar por estado (Todas, Activas, Completadas)
- 🎯 Filtrar por prioridad
- 📅 Filtrar por vencimiento

### 💾 Almacenamiento
- 💽 Persistencia con localStorage
- 📤 Exportar tareas a JSON
- 📥 Importar tareas desde JSON/CSV
- 🔄 Sincronización automática

### 📊 Estadísticas
- 📈 Contador de tareas totales
- ✓ Contador de tareas completadas
- ⏳ Contador de tareas pendientes
- 📉 Tasa de progreso visual

### 🎨 UI/UX
- 🌙 Tema oscuro/claro
- 📱 Diseño responsive
- ⌨️ Atajos de teclado
- 🎯 Interfaz intuitiva

---

## 🚀 Inicio Rápido

### Instalación

```bash
cd frontend
npm install
npm start
```

La aplicación abrirá en `http://localhost:3000/todo`

---

## 📖 Uso

### Agregar Tarea
1. Escribe el título en el campo de entrada
2. (Opcional) Establece prioridad, categoría y fecha
3. Presiona Enter o haz clic en "Agregar"

### Editar Tarea
1. Haz clic en el botón editar (✏️) de la tarea
2. Modifica los campos
3. Guarda los cambios

### Eliminar Tarea
- Haz clic en el botón eliminar (🗑️)
- Confirma la eliminación

### Marcar Completada
- Haz clic en el checkbox de la tarea
- Se marcará automáticamente como completada

### Filtrar y Buscar
- Usa el buscador para encontrar tareas
- Selecciona filtros para refinar resultados
- Combina múltiples filtros

### Importar/Exportar
- **Exportar:** Botón "Descargar" → Se descarga JSON
- **Importar:** Botón "Cargar" → Selecciona archivo JSON/CSV

---

## 🗄️ Estructura de Datos

### Tarea (Task)
```json
{
  "id": "uuid",
  "title": "Completar proyecto",
  "description": "Descripción opcional",
  "completed": false,
  "priority": "high",
  "category": "Trabajo",
  "dueDate": "2026-12-31",
  "tags": ["importante", "urgente"],
  "createdAt": "2026-06-11T10:00:00Z",
  "updatedAt": "2026-06-11T10:00:00Z"
}
```

### Prioridades
- `high` - Alta
- `medium` - Media
- `low` - Baja

### Categorías (personalizables)
- Trabajo
- Personal
- Compras
- Salud
- Hogar
- Educación

---

## 💾 LocalStorage

Las tareas se guardan automáticamente en `localStorage` bajo la clave:
```
mirgor:tasks
```

También se guardan las preferencias:
```
mirgor:preferences
{
  "theme": "light",
  "sortBy": "date",
  "filterBy": "all"
}
```

---

## 📤 Formato de Importación

### JSON
```json
[
  {
    "title": "Tarea 1",
    "description": "Descripción",
    "priority": "high",
    "category": "Trabajo",
    "dueDate": "2026-12-31"
  }
]
```

### CSV
```csv
title,description,priority,category,dueDate
Tarea 1,Descripción,high,Trabajo,2026-12-31
Tarea 2,Descripción,medium,Personal,2026-12-25
```

---

## ⌨️ Atajos de Teclado

| Atajo | Acción |
|-------|--------|
| `Ctrl + N` | Nueva tarea |
| `Ctrl + S` | Buscar |
| `Ctrl + E` | Exportar |
| `Ctrl + I` | Importar |
| `Escape` | Cerrar modal |
| `Enter` | Guardar/Agregar |

---

## 🎯 Estados

- **Activa:** Tarea sin completar
- **Completada:** Tarea marcada como hecha
- **Retrasada:** Fecha de vencimiento pasada

---

## 🔧 Tecnologías

- React 18 + TypeScript
- Tailwind CSS
- localStorage API
- UUID para IDs únicos
- React Icons

---

## 📱 Responsivo

- ✅ Desktop
- ✅ Tablet
- ✅ Mobile

---

## 🚀 Próximas Mejoras

- [ ] Sincronización con cloud (Firebase)
- [ ] Tareas recurrentes
- [ ] Colaboración en tiempo real
- [ ] Recordatorios/notificaciones
- [ ] Subtareas
- [ ] Comentarios
- [ ] Integración con calendario

---

**Mirgor To-Do List** - Gestor de tareas simple pero poderoso 📋✨
