# 📧 Sistema de Notificaciones de Suscripciones

Este documento explica cómo funciona el sistema de notificaciones automáticas para suscripciones que están por vencer o que ya expiraron.

## 📋 Descripción

El sistema automáticamente:
1. **Busca suscripciones por vencer**: Encuentra suscripciones activas que expiran en exactamente 3 días
2. **Busca suscripciones expiradas**: Encuentra suscripciones activas cuya fecha de expiración ya pasó
3. **Envía correos electrónicos**: Notifica a los usuarios correspondientes

## 🏗️ Arquitectura

### Servicios

- **`mailingService.ts`**: Contiene las funciones para enviar correos individuales
  - `send_expiring_soon()`: Envía correo cuando quedan 3 días
  - `send_expired()`: Envía correo cuando ya expiró

- **`subscriptionNotificationService.ts`**: Lógica de negocio para buscar y procesar suscripciones
  - `checkAndSendExpiringSoon()`: Busca y envía correos a suscripciones por vencer
  - `checkAndSendExpired()`: Busca y envía correos a suscripciones expiradas
  - `checkAndSendAllNotifications()`: Ejecuta ambas verificaciones

### Controladores y Rutas

- **`mailingController.ts`**: Controladores HTTP para ejecutar las verificaciones manualmente
- **`mailingRoute.ts`**: Rutas REST API

## 🔧 Configuración

### Variables de Entorno

Asegúrate de tener configuradas estas variables:

```env
RESEND_API_KEY=tu_api_key_de_resend
FROM_EMAIL=Connie 💛 <noreply@connieedelai.com>
PLATFORM_URL=https://app.connieedelai.com
```

### Status de Suscripciones

El sistema busca suscripciones con estos status:
- `"active"`
- `"activa"`
- `"activo"`

Si usas otros valores, actualiza el array en `subscriptionNotificationService.ts`:

```typescript
status: {
  [Op.in]: ["active", "activa", "activo", "tu_status_aqui"]
}
```

## 🚀 Uso

### Opción 1: Endpoints HTTP (Manual o desde Cron Externo)

Puedes llamar estos endpoints para ejecutar las verificaciones:

```http
POST /mailing/check-expiring-subscriptions
POST /mailing/check-expired-subscriptions
POST /mailing/check-all-subscription-notifications
```

**Ejemplo con cURL:**
```bash
curl -X POST http://localhost:5000/mailing/check-all-subscription-notifications
```

**Ejemplo para configurar un cron job externo:**
```bash
# Ejecutar todos los días a las 9:00 AM
0 9 * * * curl -X POST https://tu-dominio.com/mailing/check-all-subscription-notifications
```

### Opción 2: Node-Cron (Interno)

Si prefieres usar node-cron dentro de la aplicación:

1. **Instalar node-cron:**
```bash
npm install node-cron @types/node-cron
```

2. **Configurar en `bin/www.ts` o en `app.ts`:**
```typescript
import cron from "node-cron";
import { runSubscriptionNotificationsJob } from "../src/jobs/subscriptionNotificationsJob";

// Ejecutar todos los días a las 9:00 AM
cron.schedule("0 9 * * *", async () => {
  await runSubscriptionNotificationsJob();
});
```

### Opción 3: Servicios de Cloud

Puedes usar servicios de scheduling en la nube:

- **AWS EventBridge**: Configura una regla que llame al endpoint HTTP
- **Google Cloud Scheduler**: Programa una petición HTTP periódica
- **Azure Logic Apps**: Crea un workflow que se ejecute periódicamente

## 📊 Respuesta de los Endpoints

### Ejemplo de respuesta:

```json
{
  "message": "Verificación completa de suscripciones realizada",
  "expiring": {
    "total": 5,
    "sent": 5,
    "errors": 0,
    "results": [
      {
        "subscriptionId": 123,
        "userId": 456,
        "email": "usuario@example.com",
        "status": "sent"
      }
    ]
  },
  "expired": {
    "total": 2,
    "sent": 2,
    "errors": 0,
    "results": [...]
  },
  "summary": {
    "totalProcessed": 7,
    "totalSent": 7,
    "totalErrors": 0
  }
}
```

## 🔍 Lógica de Fechas

### Suscripciones por vencer (3 días)
- Busca suscripciones donde `end_date` está entre el inicio y el final del día en 3 días desde hoy
- Solo busca suscripciones con status activo

### Suscripciones expiradas
- Busca suscripciones donde `end_date` es menor que hoy (midnight)
- Solo busca suscripciones que todavía están marcadas como activas
- **Nota**: Considera descomentar la línea que actualiza el status a "expired" después de enviar el correo

## ⚙️ Personalización

### Cambiar el número de días de anticipación

En `subscriptionNotificationService.ts`, cambia:
```typescript
threeDaysFromNowStart.setDate(today.getDate() + 3); // Cambia 3 por el número de días
```

### Actualizar status automáticamente

En `checkAndSendExpired()`, descomenta esta línea:
```typescript
await subscription.update({ status: "expired" });
```

Esto marcará automáticamente las suscripciones como expiradas después de enviar el correo.

## 🐛 Troubleshooting

### Los correos no se envían

1. Verifica que `RESEND_API_KEY` esté configurado correctamente
2. Revisa los logs del servidor para ver errores específicos
3. Verifica que las suscripciones tengan usuarios asociados con emails válidos

### Las suscripciones no se encuentran

1. Verifica el formato de las fechas en la base de datos
2. Revisa que el status de las suscripciones coincida con los valores en el código
3. Verifica que las asociaciones entre Subscription y User estén correctas

### Cron job no se ejecuta

1. Si usas node-cron, verifica que el proceso del servidor esté corriendo
2. Si usas un cron externo, verifica los logs del sistema
3. Considera usar servicios de cloud scheduling para mayor confiabilidad

## 📝 Notas Adicionales

- El sistema está diseñado para evitar enviar correos duplicados
- Los errores se registran pero no detienen el procesamiento de otras suscripciones
- Cada correo se envía individualmente para mejor tracking de errores
- Los logs incluyen información detallada sobre cada operación

