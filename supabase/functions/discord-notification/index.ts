import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const DISCORD_WEBHOOK_URL = Deno.env.get('DISCORD_WEBHOOK_URL')

serve(async (req) => {
  try {
    const payload = await req.json()
    const { record, table, type } = payload

    let title = "🔔 새로운 데이터 알림"
    let fields = []
    let color = 0x3498db // Default Blue

    if (table === 'inquiries') {
      title = "📩 새로운 1:1 문의가 접수되었습니다"
      color = 0xFFA500 // Orange
      fields = [
        { name: "👤 성함", value: record.name || "N/A", inline: true },
        { name: "📧 이메일", value: record.email || "N/A", inline: true },
        { name: "📝 문의내용", value: record.message || "N/A" }
      ]
    } else if (table === 'beta_applications') {
      title = "🚀 새로운 베타 테스터 신청이 접수되었습니다!"
      color = 0x1A6B5A // Primary Deep
      fields = [
        { name: "👤 부모님 성함", value: record.parent_name || "N/A", inline: true },
        { name: "📞 연락처", value: record.phone || "N/A", inline: true },
        { name: "📧 이메일", value: record.email || "N/A", inline: true },
        { name: "👶 자녀 정보", value: `${record.child_gender || "미지정"} (${record.child_grade || "미지정"})`, inline: true },
        { name: "💡 신청 동기", value: record.motivation || "없음" }
      ]
    }

    const discordPayload = {
      embeds: [{
        title: title,
        color: color,
        fields: fields,
        footer: { text: `Table: ${table} | Type: ${type}` },
        timestamp: new Date().toISOString()
      }]
    }

    if (!DISCORD_WEBHOOK_URL) {
      throw new Error('DISCORD_WEBHOOK_URL is not set')
    }

    const res = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordPayload),
    })

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
