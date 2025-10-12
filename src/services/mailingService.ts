import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const send_confirm_subscription = async (email: string) => {
  const { data, error } = await resend.emails.send({
    from: "Connie 💛 <onboarding@resend.dev>",
    to: [email],
    subject: "¡Bienvenida a Un Día a la Vez 🌿!",
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
  const { data, error } = await resend.emails.send({
    from: "Connie 💛 <onboarding@resend.dev>",
    to: [email],
    subject: "¡Bienvenida a Un Día a la Vez 🌿!",
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
  return "hola";
}

export default {
  send_confirm_subscription,
  send_select_plan
};
