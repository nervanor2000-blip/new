# Seen - Görev Takip Uygulaması

Bu repo içinde iki parça bulunur:

1. Basit bir statik görev takip arayüzü (`index.html`, `style.css`, `app.js`)
2. n8n'e import edebileceğin örnek bir otomasyon (`n8n/seen-task-intake-workflow.json`)

## n8n otomasyonu: Görev Alma ve Önceliklendirme

Workflow adı: **Seen - Görev Alma ve Önceliklendirme**

### Ne yapar?

- `POST /webhook/seen-task-intake` ile gelen görev verisini alır.
- `title` zorunlu olacak şekilde payload normalize eder.
- `priority` alanına göre görevi sınıflandırır (`low`, `normal`, `high`, `critical`).
- Öncelik `high/critical` ise acil mesaj, diğerlerinde normal mesaj üretir.
- Sonucu JSON olarak webhook yanıtında döner.

### Import adımları

1. n8n panelinde **Workflows > Import from File** seç.
2. `n8n/seen-task-intake-workflow.json` dosyasını yükle.
3. Workflow'u **Active** yap.

### Test örneği

```bash
curl -X POST http://localhost:5678/webhook/seen-task-intake \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Müşteri demo hazırlığı",
    "description": "Sunum akışını finalize et",
    "priority": "high",
    "source": "landing-form"
  }'
```

## Statik arayüzü çalıştırma

```bash
python3 -m http.server 8080
```

Ardından tarayıcıda `http://localhost:8080` adresini aç.
