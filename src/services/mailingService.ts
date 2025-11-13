import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Email remitente configurado en Resend (debe estar verificado)
const FROM_EMAIL = process.env.FROM_EMAIL || "Connie 💛 <noreply@connieedelai.com>";
const FROM_EMAIL_NOTIFICATIONS = process.env.FROM_EMAIL_NOTIFICATIONS || "Notificaciones Un Día a la Vez 🔔 <notificaciones@connieedelai.com>";

const send_confirm_subscription = async (email: string) => {
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject: "¡Bienvenida al newsletter de Un Día a la Vez 🌿!",
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9fafb; padding: 40px 0;">
        <div style="max-width: 600px; background-color: #ffffff; margin: auto; border-radius: 10px; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <h1 style="color: #0050ac; font-size: 28px; margin-bottom: 20px; text-align: center;">💛 ¡Hola hola, mi chica linda!</h1>

          <p style="font-size: 16px; color: #333; line-height: 1.6; margin-bottom: 20px;">
            ¡Qué alegría tenerte por aquí! Gracias de todo corazón por sumarte a esta comunidad tan especial que está creciendo día a día gracias a cada una de ustedes: 
            <strong>"Un día a la vez"</strong> 💛
          </p>

          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            Desde ahora, estaré en tu bandeja de entrada de manera semanal, compartiéndote contenido hecho con mucho amor y propósito, para acompañarte en este camino hacia una vida más consciente, activa y en armonía contigo misma.
          </p>

          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            Aquí no venimos a hacer todo perfecto, venimos a hacerlo real. Y por eso, al ser parte de este espacio, vas a recibir:
          </p>

          <ul style="font-size: 16px; color: #333; line-height: 1.8; padding-left: 20px;">
            <li>✨ <strong>Guías y recursos</strong> que te ayudarán a dar pasos firmes hacia tu bienestar.</li>
            <li>✨ <strong>Contenido cercano, motivacional y muy personal</strong>, desde mi experiencia como coach, entrenadora, chef, y mujer en constante evolución (¡muchas perspectivas, estoy segura que tú también! 💪🏻).</li>
            <li>✨ <strong>Información anticipada</strong> de programas y materiales especiales de la plataforma de entrenamiento y nutrición <strong>"Un día a la vez"</strong>.</li>
            <li>✨ <strong>Palabras de aliento</strong> cuando más lo necesites — porque a veces solo necesitamos que alguien nos diga: <em>"Vas bien, tú dale no más."</em></li>
          </ul>

          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            Este newsletter más que solo información es una <strong>compañía</strong>, una pausa en tu semana para reconectar contigo y recordarte que sí puedes 💛
          </p>

          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            Gracias por confiar y por estar aquí.<br/>
            Te envío un abrazo grande...
          </p>

          <div style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
            <p style="font-size: 16px; color: #0050ac; font-weight: bold; margin-bottom: 4px;">Tu coach y compañera de camino,</p>
            <p style="font-size: 16px; color: #333; margin: 0;">Connie 🌿</p>
            <p style="font-size: 14px; color: #888; margin-top: 4px;">Creadora de la plataforma <strong>"Un Día a la Vez"</strong></p>
          </div>
        </div>

        <p style="text-align: center; font-size: 12px; color: #aaa; margin-top: 20px;">
          © ${new Date().getFullYear()} Un Día a la Vez | Este mensaje fue enviado con cariño 💛
        </p>
      </div>
    `,
  });

  if (error) {
    console.error("❌ Error enviando correo de confirmación:", error);
    throw new Error(error.message);
  }
  
  console.log("✅ Correo de confirmación enviado a:", email);
  return data;
};

const send_select_plan = async (plan: any) => {
  // const { data, error } = await resend.emails.send({
  //   from: FROM_EMAIL,
  //   to: [email],
  //   subject: "¡Bienvenida a Un Día a la Vez 🌿!",
  //   html: `
  //     <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9fafb; padding: 40px 0;">
  //       <div style="max-width: 600px; background-color: #ffffff; margin: auto; border-radius: 10px; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
  //         <h1 style="color: #0050ac; font-size: 28px; margin-bottom: 20px; text-align: center;">💛 ¡Hola hola, mi chica linda!</h1>

  //         <p style="font-size: 16px; color: #333; line-height: 1.6; margin-bottom: 20px;">
  //           ¡Qué alegría tenerte por aquí! Gracias de todo corazón por sumarte a esta comunidad tan especial que está creciendo día a día gracias a cada una de ustedes: 
  //           <strong>"Un día a la vez"</strong> 💛
  //         </p>

  //         <p style="font-size: 16px; color: #333; line-height: 1.6;">
  //           Desde ahora, estaré en tu bandeja de entrada de manera semanal, compartiéndote contenido hecho con mucho amor y propósito, para acompañarte en este camino hacia una vida más consciente, activa y en armonía contigo misma.
  //         </p>

  //         <p style="font-size: 16px; color: #333; line-height: 1.6;">
  //           Aquí no venimos a hacer todo perfecto, venimos a hacerlo real. Y por eso, al ser parte de este espacio, vas a recibir:
  //         </p>

  //         <ul style="font-size: 16px; color: #333; line-height: 1.8; padding-left: 20px;">
  //           <li>✨ <strong>Guías y recursos</strong> que te ayudarán a dar pasos firmes hacia tu bienestar.</li>
  //           <li>✨ <strong>Contenido cercano, motivacional y muy personal</strong>, desde mi experiencia como coach, entrenadora, chef, y mujer en constante evolución (¡muchas perspectivas, estoy segura que tú también! 💪🏻).</li>
  //           <li>✨ <strong>Información anticipada</strong> de programas y materiales especiales de la plataforma de entrenamiento y nutrición <strong>"Un día a la vez"</strong>.</li>
  //           <li>✨ <strong>Palabras de aliento</strong> cuando más lo necesites — porque a veces solo necesitamos que alguien nos diga: <em>“Vas bien, tú dale no más.”</em></li>
  //         </ul>

  //         <p style="font-size: 16px; color: #333; line-height: 1.6;">
  //           Este newsletter más que solo información es una <strong>compañía</strong>, una pausa en tu semana para reconectar contigo y recordarte que sí puedes 💛
  //         </p>

  //         <p style="font-size: 16px; color: #333; line-height: 1.6;">
  //           Gracias por confiar y por estar aquí.<br/>
  //           Te envío un abrazo grande...
  //         </p>

  //         <div style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
  //           <p style="font-size: 16px; color: #0050ac; font-weight: bold; margin-bottom: 4px;">Tu coach y compañera de camino,</p>
  //           <p style="font-size: 16px; color: #333; margin: 0;">Connie 🌿</p>
  //           <p style="font-size: 14px; color: #888; margin-top: 4px;">Creadora de la plataforma <strong>“Un Día a la Vez”</strong></p>
  //         </div>
  //       </div>

  //       <p style="text-align: center; font-size: 12px; color: #aaa; margin-top: 20px;">
  //         © ${new Date().getFullYear()} Un Día a la Vez | Este mensaje fue enviado con cariño 💛
  //       </p>
  //     </div>
  //   `,
  // });
  return "hola";
}

const send_mass_email = async (subject: string, message: string, recipients: string[]) => {
  if (!recipients || recipients.length === 0) {
    throw new Error("Debe incluir al menos un destinatario");
  }

  const htmlContent = `
    <div style="font-family: Helvetica, Arial, sans-serif; background-color: #f9fafb; padding: 40px 0;">
      <div style="max-width: 600px; background-color: #ffffff; margin: auto; border-radius: 10px; padding: 40px;">
        <h2 style="color: #0050ac;">${subject}</h2>
        <div style="font-size: 16px; color: #333; line-height: 1.6;">
          ${message.replace(/\n/g, "<br/>")}
        </div>
        <div style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
          <p style="font-size: 14px; color: #888;">💛 Enviado por el equipo de <strong>Un Día a la Vez</strong></p>
        </div>
      </div>
    </div>
  `;

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: recipients,
    subject,
    html: htmlContent,
  });

  if (error) throw new Error(error.message);
  return data;
};

const send_welcome_platform_ore = async (userData: { email: string; name: string; plan: string }) => {
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [userData.email],
    subject: "¡Bienvenida a la plataforma Un Día a la Vez! 🌟",
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9fafb; padding: 40px 0;">
        <div style="max-width: 600px; background-color: #ffffff; margin: auto; border-radius: 10px; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <h1 style="color: #0050ac; font-size: 28px; margin-bottom: 20px; text-align: center;">💛 ¡Hola ${userData.name}!</h1>

          <p style="font-size: 16px; color: #333; line-height: 1.6; margin-bottom: 20px;">
            ¡Qué emoción tenerte aquí! Has dado un paso gigante al unirte a la plataforma <strong>"Un Día a la Vez"</strong> 🌿
          </p>

          <p style="font-size: 16px; color: #333; line-height: 1.6; margin-bottom: 20px;">
            Ya eres oficialmente parte de esta hermosa comunidad de mujeres que decidieron priorizarse, cuidarse y transformar sus vidas... 
            <strong>un día a la vez</strong> 💪🏻
          </p>

          <div style="background-color: #f0f7ff; border-left: 4px solid #0050ac; padding: 20px; margin: 25px 0; border-radius: 5px;">
            <p style="font-size: 16px; color: #333; margin: 0; line-height: 1.6;">
              <strong>✨ Tu plan seleccionado:</strong> ${userData.plan}
            </p>
          </div>

          <p style="font-size: 16px; color: #333; line-height: 1.6; margin-bottom: 15px;">
            Ahora tienes acceso a:
          </p>

          <ul style="font-size: 16px; color: #333; line-height: 1.8; padding-left: 20px; margin-bottom: 25px;">
            <li>🏋️‍♀️ <strong>Entrenamientos personalizados</strong> diseñados para ti</li>
            <li>🥗 <strong>Planes de nutrición</strong> equilibrados y deliciosos</li>
            <li>📚 <strong>Contenido exclusivo</strong> para tu bienestar integral</li>
            <li>💬 <strong>Comunidad de apoyo</strong> de mujeres que comparten tu camino</li>
            <li>🎯 <strong>Seguimiento personalizado</strong> de tus avances</li>
          </ul>

          <p style="font-size: 16px; color: #333; line-height: 1.6; margin-bottom: 20px;">
            Recuerda: esto no se trata de perfección, se trata de <strong>progreso</strong>. Cada paso cuenta, 
            cada decisión consciente suma, y yo estaré aquí acompañándote en todo momento.
          </p>

          <div style="text-align: center; margin: 35px 0;">
            <a href="${process.env.PLATFORM_URL || 'https://app.connieedelai.com'}" 
               style="background-color: #0050ac; color: white; padding: 15px 40px; text-decoration: none; border-radius: 25px; font-size: 16px; font-weight: bold; display: inline-block;">
              Ir a mi plataforma 🚀
            </a>
          </div>

          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            Gracias por confiar en mí y por darte esta oportunidad.<br/>
            ¡Nos vemos adentro! 💛
          </p>

          <div style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
            <p style="font-size: 16px; color: #0050ac; font-weight: bold; margin-bottom: 4px;">Con todo mi cariño,</p>
            <p style="font-size: 16px; color: #333; margin: 0;">Connie 🌿</p>
            <p style="font-size: 14px; color: #888; margin-top: 4px;">Tu coach y compañera de camino</p>
          </div>
        </div>

        <p style="text-align: center; font-size: 12px; color: #aaa; margin-top: 20px;">
          © ${new Date().getFullYear()} Un Día a la Vez | Este mensaje fue enviado con cariño 💛
        </p>
      </div>
    `,
  });

  if (error) {
    console.error("❌ Error enviando correo de bienvenida a:", userData.email, error);
    throw new Error(error.message);
  }
  
  console.log("✅ Correo de bienvenida enviado a:", userData.email);
  return data;
};

const send_welcome_platform_plata = async (userData: { email: string; name: string; plan: string }) => {
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [userData.email],
    subject: "¡Bienvenida al Plan Plata de Un Día a la Vez! ✨",
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f0f4f8; padding: 40px 0;">
        <div style="max-width: 600px; background-color: #ffffff; margin: auto; border-radius: 12px; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
          <h1 style="color: #0070c9; font-size: 28px; margin-bottom: 20px; text-align: center;">💎 ¡Hola ${userData.name}!</h1>

          <p style="font-size: 16px; color: #333; line-height: 1.6; margin-bottom: 20px;">
            ¡Qué alegría tenerte en el <strong>Plan Plata</strong> de la plataforma <strong>"Un Día a la Vez"</strong> 🌿
          </p>

          <p style="font-size: 16px; color: #333; line-height: 1.6; margin-bottom: 20px;">
            Hoy das un paso precioso por ti. Este espacio está hecho para acompañarte con cariño, motivación y herramientas prácticas para avanzar <strong>un día a la vez</strong>.
          </p>

          <div style="background-color: #e8f4ff; border-left: 4px solid #0070c9; padding: 20px; margin: 25px 0; border-radius: 8px;">
            <p style="font-size: 16px; color: #333; margin: 0; line-height: 1.6;">
              <strong>✨ Tu plan seleccionado:</strong> ${userData.plan}
            </p>
          </div>

          <p style="font-size: 16px; color: #333; line-height: 1.6; margin-bottom: 15px;">
            Con el <strong>Plan Plata</strong> vas a disfrutar de:
          </p>

          <ul style="font-size: 16px; color: #333; line-height: 1.8; padding-left: 20px; margin-bottom: 25px;">
            <li>🏋️‍♀️ Entrenamientos guiados ideales para mantener tu constancia y energía.</li>
          </ul>

          <p style="font-size: 16px; color: #333; line-height: 1.6; margin-bottom: 20px;">
            Recuerda: no se trata de hacerlo perfecto, sino de caminar con firmeza y amor propio. Estoy contigo en cada paso.
          </p>

          <div style="text-align: center; margin: 35px 0;">
            <a href="${process.env.PLATFORM_URL || 'https://app.connieedelai.com'}"
               style="background-color: #0070c9; color: white; padding: 15px 40px; text-decoration: none; border-radius: 25px; font-size: 16px; font-weight: bold; display: inline-block;">
              Ir a mi plataforma 🚀
            </a>
          </div>

          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            Gracias por confiar en mí. <strong>Hoy comienza una etapa hermosa para ti</strong>.<br/>
            ¡Nos vemos dentro! 💛
          </p>

          <div style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
            <p style="font-size: 16px; color: #0070c9; font-weight: bold; margin-bottom: 4px;">Con cariño infinito,</p>
            <p style="font-size: 16px; color: #333; margin: 0;">Connie 🌿</p>
            <p style="font-size: 14px; color: #888; margin-top: 4px;">Tu coach y compañera en este camino</p>
          </div>
        </div>

        <p style="text-align: center; font-size: 12px; color: #aaa; margin-top: 20px;">
          © ${new Date().getFullYear()} Un Día a la Vez | Este mensaje fue enviado con cariño 💛
        </p>
      </div>
    `,
  });

  if (error) {
    console.error("❌ Error enviando correo de bienvenida Plan Plata a:", userData.email, error);
    throw new Error(error.message);
  }
  
  console.log("✅ Correo de bienvenida Plan Plata enviado a:", userData.email);
  return data;
};

const send_welcome_platform = async (userData: { email: string; name: string; plan: string }) => {
  const planName = (userData.plan || "").toLowerCase();

  if (planName.includes("plata")) {
    return send_welcome_platform_plata(userData);
  }

  if (planName.includes("oro")) {
    return send_welcome_platform_ore(userData);
  }

  // Plantilla por defecto
  return send_welcome_platform_ore(userData);
};

const send_admin_new_subscription = async (userData: { 
  email: string; 
  name: string; 
  plan: string; 
  phone?: string;
  plan_type?: string;
  registrationDate?: string;
  selectedPlan?: any;
}) => {
  const adminEmail = process.env.ADMIN_EMAIL || "connie.edelai@gmail.com";
  
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL_NOTIFICATIONS,
    to: [adminEmail],
    subject: `🎉 Nueva suscripción en la plataforma - ${userData.name}`,
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9fafb; padding: 40px 0;">
        <div style="max-width: 600px; background-color: #ffffff; margin: auto; border-radius: 10px; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <h1 style="color: #0050ac; font-size: 26px; margin-bottom: 20px; text-align: center;">🎉 ¡Nueva Suscripción!</h1>

          <p style="font-size: 16px; color: #333; line-height: 1.6; margin-bottom: 25px;">
            Hola Connie,
          </p>

          <p style="font-size: 16px; color: #333; line-height: 1.6; margin-bottom: 25px;">
            Una nueva usuaria se ha suscrito a la plataforma <strong>"Un Día a la Vez"</strong>. 
            Aquí están los detalles:
          </p>

          <div style="background-color: #f8f9fa; border-radius: 8px; padding: 25px; margin: 25px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef;">
                  <strong style="color: #0050ac; font-size: 14px;">👤 Nombre:</strong>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; text-align: right;">
                  <span style="color: #333; font-size: 15px;">${userData.name}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef;">
                  <strong style="color: #0050ac; font-size: 14px;">📧 Email:</strong>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; text-align: right;">
                  <span style="color: #333; font-size: 15px;">${userData.email}</span>
                </td>
              </tr>
              ${userData.phone ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef;">
                  <strong style="color: #0050ac; font-size: 14px;">📱 Teléfono:</strong>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; text-align: right;">
                  <span style="color: #333; font-size: 15px;">${userData.phone}</span>
                </td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef;">
                  <strong style="color: #0050ac; font-size: 14px;">💎 Plan seleccionado:</strong>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; text-align: right;">
                  <span style="color: #333; font-size: 15px; font-weight: bold;">${userData.selectedPlan.nombre} - ${userData.plan_type}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0;">
                  <strong style="color: #0050ac; font-size: 14px;">📅 Fecha de registro:</strong>
                </td>
                <td style="padding: 10px 0; text-align: right;">
                  <span style="color: #333; font-size: 15px;">${userData.registrationDate || new Date().toLocaleDateString('es-CL', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </td>
              </tr>
            </table>
          </div>

          <p style="font-size: 16px; color: #333; line-height: 1.6; margin-top: 25px;">
            El correo de bienvenida ha sido enviado automáticamente a la usuaria.
          </p>

          <div style="text-align: center; margin: 35px 0;">
            <a href="${process.env.ADMIN_DASHBOARD_URL || 'https://app.connieedelai.com/administration/users'}" 
               style="background-color: #0050ac; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-size: 15px; font-weight: bold; display: inline-block;">
              Ver en plataforma
            </a>
          </div>

          <div style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
            <p style="font-size: 14px; color: #888; margin: 0;">
              💛 Sistema de notificaciones - <strong>Un Día a la Vez</strong>
            </p>
          </div>
        </div>

        <p style="text-align: center; font-size: 12px; color: #aaa; margin-top: 20px;">
          © ${new Date().getFullYear()} Un Día a la Vez | Notificación automática del sistema
        </p>
      </div>
    `,
  });

  if (error) {
    console.error("❌ Error enviando notificación al admin:", error);
    throw new Error(error.message);
  }
  
  console.log("✅ Notificación de nueva suscripción enviada al admin");
  return data;
};

const send_expiring_soon = async (userData: { email: string; name: string; expirationDate: Date | string }) => {
  // Formatear la fecha en español (ej: "Martes 04 de noviembre del 2025")
  const expirationDate = typeof userData.expirationDate === 'string' 
    ? new Date(userData.expirationDate) 
    : userData.expirationDate;
  
  const formattedDate = expirationDate.toLocaleDateString('es-CL', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const platformUrl = process.env.PLATFORM_URL || 'https://app.connieedelai.com';
  const loginUrl = `${platformUrl}/login`;

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [userData.email],
    subject: 'Tu membresía de bienestar "Un día a la vez" caducará pronto',
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9fafb; padding: 40px 0;">
        <div style="max-width: 600px; background-color: #ffffff; margin: auto; border-radius: 10px; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <h1 style="color: #0050ac; font-size: 28px; margin-bottom: 20px; text-align: center;">💛 ¡Hola, ${userData.name}!</h1>

          <p style="font-size: 16px; color: #333; line-height: 1.6; margin-bottom: 20px;">
            📣 ¡Tu membresía <strong>"Un día a la vez"</strong> en www.connieedelai.com finalizará pronto!
          </p>

          <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; margin: 25px 0; border-radius: 5px;">
            <p style="font-size: 16px; color: #333; margin: 0; line-height: 1.6;">
              ⚠️ Tu acceso a la membresía se detendrá el día <strong>${formattedDate}</strong>.
            </p>
          </div>

          <p style="font-size: 16px; color: #333; line-height: 1.6; margin-bottom: 25px;">
            💫 Si deseas continuar accediendo a contenido exclusivo para miembros y seguir avanzando en tu objetivo, renueva tu membresía.
          </p>

          <div style="text-align: center; margin: 35px 0;">
            <a href="${loginUrl}" 
               style="background-color: #0050ac; color: white; padding: 15px 40px; text-decoration: none; border-radius: 25px; font-size: 16px; font-weight: bold; display: inline-block;">
              ⚡ Renovar mi membresía
            </a>
          </div>

          <p style="font-size: 16px; color: #333; line-height: 1.6; margin-top: 25px;">
            Con cariño,<br/>
            <strong>Tu coach amiga Connie</strong> 💛
          </p>

          <div style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
            <p style="font-size: 14px; color: #888; margin: 0;">
              💛 <strong>Un Día a la Vez</strong> - Tu plataforma de bienestar
            </p>
          </div>
        </div>

        <p style="text-align: center; font-size: 12px; color: #aaa; margin-top: 20px;">
          © ${new Date().getFullYear()} Un Día a la Vez | Este mensaje fue enviado con cariño 💛
        </p>
      </div>
    `,
  });

  if (error) {
    console.error("❌ Error enviando correo de membresía por vencer a:", userData.email, error);
    throw new Error(error.message);
  }
  
  console.log("✅ Correo de membresía por vencer enviado a:", userData.email);
  return data;
};

const send_expired = async (userData: { email: string; name: string }) => {
  const platformUrl = process.env.PLATFORM_URL || 'https://app.connieedelai.com';
  const loginUrl = `${platformUrl}/login`;

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [userData.email],
    subject: 'Tu membresía de bienestar en la plataforma "Un día a la vez" de www.connieedelai.com ha expirado 🚩',
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9fafb; padding: 40px 0;">
        <div style="max-width: 600px; background-color: #ffffff; margin: auto; border-radius: 10px; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <h1 style="color: #0050ac; font-size: 28px; margin-bottom: 20px; text-align: center;">💛 Hola, hola ${userData.name}</h1>

          <p style="font-size: 16px; color: #333; line-height: 1.6; margin-bottom: 20px;">
            ¡Oh no! Tu acceso a la plataforma <strong>"Un día a la vez"</strong> ha finalizado. 💔
          </p>

          <p style="font-size: 16px; color: #333; line-height: 1.6; margin-bottom: 25px;">
            🌱 Si deseas continuar accediendo a contenido exclusivo para miembros y seguir avanzando en tu objetivo de bienestar, renueva tu membresía 💪🏻
          </p>

          <div style="text-align: center; margin: 35px 0;">
            <a href="${loginUrl}" 
               style="background-color: #0050ac; color: white; padding: 15px 40px; text-decoration: none; border-radius: 25px; font-size: 16px; font-weight: bold; display: inline-block;">
              ⚡ Renovar mi membresía ahora
            </a>
          </div>

          <p style="font-size: 16px; color: #333; line-height: 1.6; margin-top: 25px;">
            ¡Nos vemos dentro!<br/>
            Con cariño, tu coach amiga... 💛
          </p>

          <div style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
            <p style="font-size: 14px; color: #888; margin: 0;">
              💛 <strong>Un Día a la Vez</strong> - Tu plataforma de bienestar
            </p>
          </div>
        </div>

        <p style="text-align: center; font-size: 12px; color: #aaa; margin-top: 20px;">
          © ${new Date().getFullYear()} Un Día a la Vez | Este mensaje fue enviado con cariño 💛
        </p>
      </div>
    `,
  });

  if (error) {
    console.error("❌ Error enviando correo de membresía expirada a:", userData.email, error);
    throw new Error(error.message);
  }
  
  console.log("✅ Correo de membresía expirada enviado a:", userData.email);
  return data;
};

export default {
  send_confirm_subscription,
  send_select_plan,
  send_mass_email,
  send_welcome_platform_ore,
  send_welcome_platform_plata,
  send_admin_new_subscription,
  send_expiring_soon,
  send_expired
};
