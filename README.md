# Seen - Görev Takip Uygulaması

Önce şunu netleştirelim: Bu proje bir **frontend (statik web) uygulaması**. Görmek için bir web sunucusu ile açman gerekiyor.

## Uygulamayı nasıl görürüm?

### Yöntem 1 (Önerilen)

```bash
./run.sh
```

Sonra tarayıcıdan aç:

- `http://localhost:8080`

### Yöntem 2 (Elle)

```bash
python3 -m http.server 8080
```

Sonra tarayıcıdan aç:

- `http://localhost:8080`

> Not: Sadece dosyaya çift tıklayıp açmak bazı ortamlarda JS/CSS davranışında sorun çıkarabilir. Bu yüzden sunucu ile açman daha doğru.

---

## n8n otomasyonu (opsiyonel)

`n8n/seen-task-intake-workflow.json` dosyası n8n'e import edebileceğin örnek bir otomasyon içerir.

### Ne yapar?

- `POST /webhook/seen-task-intake` ile görev alır
- `title` alanını doğrular
- `priority` değerine göre (`low`, `normal`, `high`, `critical`) akışı dallandırır
- JSON response döner

### Import adımları

1. n8n panelinde **Workflows > Import from File** seç
2. `n8n/seen-task-intake-workflow.json` dosyasını yükle
3. Workflow’u aktif et

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
