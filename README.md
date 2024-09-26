# Mail Queue Project

Bu proje, RabbitMQ ve Redis kullanarak bir mail kuyruğu uygulaması oluşturmayı amaçlamaktadır.
RabbitMQ ve Redisin aynı anda kullanılma amacı ikisini de kullanım durumunlarını proje yaparak kavramak ve karşılaştırabilmektir.

## Kullanılan Teknolojiler

- **TypeScript**: Projenin ana dili olarak kullanılır.
- **RabbitMQ**: Mesajlaşma kuyruğu için kullanılır, asenkron iletişim sağlar.
- **Redis**: Verilerin hızlı bir şekilde saklanması ve erişimi için kullanılır. Örnek olarak blacklist mailler
- **Winston**: Loglama işlemleri için kullanılır. Proje çalıştığı andan itibaren log dosyası oluşur ve takibi kolaylaştırır.
- **Jest**: Test yazmak ve çalıştırmak için kullanılır. test-coverage %80 olarak ayarlanmıştır.
- **Nodemailer**: Email göndermek için kullanılan kütüphane. SMTP üzerinden emailleri yönetmek için kullanıldı.

## Proje Yapısı

```
MailQueue/
├── src/
│   ├── config/
│   │   ├── config.ts        # Genel yapılandırma dosyası
│   │   ├── rabbitmq.ts      # RabbitMQ ile ilgili yapılandırmalar
│   │   └── redis.ts         # Redis ile ilgili yapılandırmalar
│   │
│   ├── controllers/
│   │   └── mailController.ts # Mail gönderim kontrolörü
│   │   └── blackListController.ts # Blacklist kontrolörü
│   │
│   ├── services/
│   │   ├── mailService.ts    # Mail gönderim işlemleri
│   │   └── queueService.ts    # Queue ile ilgili işlemler
│   │   └── blackListervice.ts    # Blacklist ile ilgili işlemler
│   │
│   ├── types/
│   │   └── mailType.ts       # Mail ile ilgili tip tanımlamaları
│   │
│   ├── utils/
│   │   └── logger.ts         # Logger yapılandırması (winston)
│   │
│   ├── consumers/
│   │   └── mailConsumer.ts    # Mail kuyruk tüketici
│   │
│   ├── producers/
│   │   └── mailProducer.ts    # Mail kuyruk üretici
│   │
│   ├── tests/ (jest)
│   │   └── app.test.ts
│   │   └── blackListService.test.ts
│   │   └── mailService.test.ts
│   │   └── queueService.test.ts
│   │   └── redis.test.ts
│   │   └── rabbitmq.test.ts
│   │
│   └── app.ts                # Express uygulaması başlatma dosyası
│
├── .env                       # Ortam değişkenleri
├── package.json               # Proje bağımlılıkları ve komutları
└── README.md                  # Proje hakkında bilgiler

```

## Projenin Çalışma Mantığı

Bu proje, iki ana bileşen içerir: **Producer** ve **Consumer**

1. **Producer**: Kullanıcı bir e-posta göndermek istediğinde, `mailProducer` bileşeni bu e-postayı RabbitMQ kuyruğuna ekler. E-posta, kuyrukta bir mesaj olarak bekletilir.

2. **Consumer**: `mailConsumer` bileşeni, RabbitMQ'dan mesajları dinler. Mesaj geldiğinde, `mailService` bileşeni bu mesajı alır ve gerekli işlemleri gerçekleştirir, yani e-posta gönderir.

3. **Redis**: Redis, belirli bir süre içinde gönderilen e-postaların durumu gibi bilgileri saklamak için kullanılır. Bu sayede, uygulama hızlı bir şekilde veri alabilir ve kaydedebilir.

## Kurulum

Projenin çalışabilmesi için öncelikle gerekli bağımlılıkları yüklemeniz gerekmektedir. Aşağıdaki komutu kullanarak gerekli paketleri kurabilirsiniz:

```bash
npm install
```

## Start

```bash
npm start
```

## Test

```bash
npm test
```

## Çevresel Değişkenler (.env)

Uygulamanın doğru çalışabilmesi için `.env` dosyasını oluşturmalı ve aşağıdaki değerleri eklemelisiniz:

```
PORT=3000
RABBITMQ_URL=amqp://localhost
RABBITMQ_QUEUE_NAME=mail_queue
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-email-password
```

## Redis ile Kayıtlı Verileri Görüntüleme

Redisi başlat:

```bash
redis-server
```

Redis CLI'yi aç:

```bash
redis-cli
```

Kayıtlı verileri görmek için aşağıdaki komutu kullanın. Örneğin, "blacklist" anahtarındaki verileri görüntülemek için:

```bash
keys blacklist:*
```

Belirli bir anahtarın değerini görmek için:

```bash
get blacklist:test@example.com
```

Tüm değerleri görmek için:

```bash
KEYS*
```

## RabbitMQ Yönetim Arayüzü

RabbitMQ, queue ve mesajlar üzerinde kontrol sağlamak için bir yönetim arayüzü.

RabbitMQ başlat:

```bash
rabbitmq-server
```

`http://localhost:15672/` adresine git. Varsayılan kullanıcı adı ve şifre olarak `guest`/`guest` kullanabilirsin. Panele ulaşmış olacaksın.

# API Kullanımı

Postman

email gönderme:

- **endpoint** `/send-mail`
- **method:** `POST`
- **body:**

```json
{
  "to": "recipient@example.com",
  "subject": "Test Email",
  "text": "This is a test email."
}
```

emaili blackliste ekleme:

- **endpoint** `/blacklist/add`
- **method:** `POST`
- **body:**

```json
{
  "email": "test@example.com"
}
```

emaili blacklistten çıkarma:

- **endpoint** `/blacklist/remove`
- **method:** `POST`
- **body:**

```json
{
  "email": "test@example.com"
}
```

**NOT:** blacklist ekleme çıkarma kontrollerini redis-cli aracılığıyla kontrol edebilirsin. queue alınan mail sayısını ve kontrolleri de rabbitMQ yönetim panelinden görüntüleyebilirsin

![exp-redis-cli](/images/rediscli.jpeg)

![exp-rabbitmq](/images/rabbitmqexp.jpeg)

# Redis, RabbitMQ, Kafka ve SNS Kıyaslaması

| Özellik               | Redis                         | RabbitMQ                     | Kafka                             | SNS                        |
| --------------------- | ----------------------------- | ---------------------------- | --------------------------------- | -------------------------- |
| **Temel Kullanım**    | Veri önbellekleme, pub/sub    | Mesaj kuyruğu, pub/sub       | Akış verisi işleme, mesaj kuyruğu | Bildirim ve mesaj iletimi  |
| **Veri Saklama**      | Bellek içi, kalıcı opsiyonlar | Bellek içi ve disk bazlı     | Disk bazlı                        | Kalıcı veri saklamaz       |
| **Mesaj Sırası**      | Sırasız desteklenir           | Sıralı (FIFO)                | Sıralı (partisyonlar arasında)    | Sırasız                    |
| **Performans**        | Yüksek hız, düşük gecikme     | Orta düzeyde hız             | Yüksek hız, düşük gecikme         | Yüksek hız                 |
| **Kullanım Alanları** | Oyunlar, web uygulamaları     | E-posta, bildirim sistemleri | Veri analitiği, olay akışları     | Mobil ve web bildirimleri  |
| **Zorluk Düzeyi**     | Kolay kurulum ve kullanımı    | Orta düzeyde yapılandırma    | Yüksek düzeyde yapılandırma       | Kolay kurulum ve kullanımı |

### Kullanım Senaryoları

- **Redis**: Hızlı veri erişimi gerektiren durumlar için idealdir, örneğin kullanıcı oturumlarını veya sıklıkla erişilen verileri önbelleğe almak.
- **RabbitMQ**: Asenkron e-posta gönderimleri gibi sistemler için kullanılır, mesajların güvenli bir şekilde teslim edilmesi sağlanır.

- **Kafka**: Gerçek zamanlı veri akışları ve büyük veri analitiği gerektiren uygulamalarda idealdir.

- **SNS**: Amazon'un Simple Notification Service'i, olay tabanlı bildirimler göndermek için kullanılır ve uygulama içi bildirimlerde yaygın olarak tercih edilir.
