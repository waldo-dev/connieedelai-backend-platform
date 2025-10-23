import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const send_confirm_subscription = async (email: string) => {
  const { data, error } = await resend.emails.send({
    from: "Connie 💛 <onboarding@resend.dev>",
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
            <li>✨ <strong>Palabras de aliento</strong> cuando más lo necesites — porque a veces solo necesitamos que alguien nos diga: <em>“Vas bien, tú dale no más.”</em></li>
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
            <p style="font-size: 14px; color: #888; margin-top: 4px;">Creadora de la plataforma <strong>“Un Día a la Vez”</strong></p>
          </div>
        </div>

        <p style="text-align: center; font-size: 12px; color: #aaa; margin-top: 20px;">
          © ${new Date().getFullYear()} Un Día a la Vez | Este mensaje fue enviado con cariño 💛
        </p>
      </div>
    `,
  });
  return data;
};

const send_select_plan = async (plan: any) => {
  console.log("🚀 ~ send_select_plan ~ plan:", plan)
  // const { data, error } = await resend.emails.send({
  //   from: "Connie 💛 <onboarding@resend.dev>",
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
  console.log("🚀 ~ send_mass_email ~ subject:", subject)
  console.log("🚀 ~ send_mass_email ~ message:", message)
  console.log("🚀 ~ send_mass_email ~ recipients:", recipients)
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
    from: "Connie 💛 <onboarding@resend.dev>",
    to: recipients,
    subject,
    html: htmlContent,
  });

  if (error) throw new Error(error.message);
  return data;
};

const send_welcome_platform = async (userData: { email: string; name: string; plan: string }) => {
  const { data, error } = await resend.emails.send({
    from: "Connie 💛 <onboarding@resend.dev>",
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

  if (error) throw new Error(error.message);
  return data;
};

const send_admin_new_subscription = async (userData: { 
  email: string; 
  name: string; 
  plan: string; 
  phone?: string;
  registrationDate?: string;
}) => {
  const adminEmail = process.env.ADMIN_EMAIL || "waldojavier.vo@gmail.com";
  
  const { data, error } = await resend.emails.send({
    from: "Notificaciones Un Día a la Vez 🔔 <onboarding@resend.dev>",
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
                  <span style="color: #333; font-size: 15px; font-weight: bold;">${userData.plan}</span>
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
            <a href="${process.env.ADMIN_DASHBOARD_URL || 'https://undialavez.com/admin'}" 
               style="background-color: #0050ac; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-size: 15px; font-weight: bold; display: inline-block;">
              Ver en el panel de administración
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

  if (error) throw new Error(error.message);
  return data;
};

export default {
  send_confirm_subscription,
  send_select_plan,
  send_mass_email,
  send_welcome_platform,
  send_admin_new_subscription
};
