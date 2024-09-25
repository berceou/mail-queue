structure:
MailQueue/
├── src/
│ ├── config/
│ │ └── rabbitmq.ts # RabbitMQ ve Redis bağlantı ayarları
│ └── controllers/
│ │ └── mailController.ts # Mail kuyruğa gönderme işlevini yöneten controller
│ ├── services/
│ │ ├── mailService.ts # Mail gönderme ve Redis işlemleri
│ │ └── queueService.ts # RabbitMQ kuyruğa ekleme ve tüketme işlemleri
│ ├── tests/
│ │ └── mailService.test.ts # Unit testler (Jest ile)
│ ├── types/
│ │ └── mailTypes.ts # Mail veri tipleri (TypeScript arayüzleri)
│ ├── utils/
│ │ └── logger.ts # Logger fonksiyonları (loglama işlemleri)
│ ├── producer.ts # Kuyruğa mail ekleyen başlatıcı dosya
│ ├── consumer.ts # Kuyruktan mail işleyen başlatıcı dosya
│ └── app.ts # Uygulama girişi, sunucu başlatma
├── .env # Ortam değişkenleri (Redis, RabbitMQ ayarları)
├── .gitignore # Git ignore dosyası
├── package.json # Proje bağımlılıkları ve scriptler
├── tsconfig.json # TypeScript yapılandırma dosyası
└── jest.config.js # Jest yapılandırma dosyası
