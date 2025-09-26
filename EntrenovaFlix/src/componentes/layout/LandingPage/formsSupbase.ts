import { createClient } from "@supabase/supabase-js";
import "dotenv/config";
export class Supabase {
  supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  )

  async enviarFormularioCompleto(resposta_ia:string, ticket: string, telefone: string) {
    const { error } = await this.supabase.from("formulario1").insert({
      resposta_ia,
      ticket,
      telefone
    })

    if (error) throw new Error(error.message + error.cause)
  }
}
