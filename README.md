# Mail Queue Project

Bu proje, RabbitMQ ve Redis kullanarak bir mail kuyruğu uygulaması oluşturmayı amaçlamaktadır. Proje, e-posta gönderimlerini asenkron hale getirerek daha verimli bir sistem sağlanmasına bir örnek göstermeyi hedeflemektedir.

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
│   │
│   ├── services/
│   │   ├── mailService.ts    # Mail gönderim işlemleri
│   │   └── queueService.ts    # Queue ile ilgili işlemler
│   │
│   ├── types/
│   │   └── mailType.ts       # Mail ile ilgili tip tanımlamaları
│   │
│   ├── utils/
│   │   └── logger.ts         # Logger yapılandırması
│   │
│   ├── consumers/
│   │   └── mailConsumer.ts    # Mail kuyruk tüketici
│   │
│   ├── producers/
│   │   └── mailProducer.ts    # Mail kuyruk üretici
│   │
│   └── app.ts                # Express uygulaması başlatma dosyası
│
├── .env                       # Ortam değişkenleri
├── package.json               # Proje bağımlılıkları ve komutları
└── README.md                  # Proje hakkında bilgiler

```

## Kullanılan Teknolojiler

- **TypeScript**: Projenin ana dili olarak kullanılır.
- **RabbitMQ**: Mesajlaşma kuyruğu için kullanılır, asenkron iletişim sağlar.
- **Redis**: Verilerin hızlı bir şekilde saklanması ve erişimi için kullanılır.
- **Winston**: Loglama işlemleri için kullanılır.
- **Jest**: Test yazmak ve çalıştırmak için kullanılır.

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

**TODO:::değerleri gir**

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
