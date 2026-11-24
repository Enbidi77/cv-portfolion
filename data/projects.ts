import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "realtime-chat",
    slug: "realtime-chat",
    title: {
      en: "Real-Time Chat Application",
      vi: "Ứng dụng trò chuyện thời gian thực",
    },
    shortDescription: {
      en: "A production-ready monorepo application using Next.js and NestJS microservices with real-time messaging, video calls, and multi-tenant architecture.",
      vi: "Ứng dụng monorepo sẵn sàng triển khai thực tế sử dụng microservices Next.js và NestJS hỗ trợ nhắn tin thời gian thực, gọi video và kiến trúc đa người thuê (multi-tenant).",
    },
    fullDescription: {
      en: "A comprehensive real-time communication platform built as a monorepo with Next.js frontend and NestJS microservices backend. The application supports instant messaging, WebRTC video calls with screen sharing, workspace management, and multi-tenant architecture. It features a robust permission system (RBAC), audit logging, thread replies, and background job processing with BullMQ.",
      vi: "Nền tảng giao tiếp thời gian thực toàn diện được xây dựng dưới dạng monorepo với frontend Next.js và backend microservices NestJS. Ứng dụng hỗ trợ nhắn tin tức thì, gọi video WebRTC kèm chia sẻ màn hình, quản lý không gian làm việc và kiến trúc đa người thuê. Hệ thống tích hợp phân quyền chặt chẽ (RBAC), nhật ký kiểm toán (audit logs), trả lời theo luồng (thread) và xử lý tác vụ ngầm với BullMQ.",
    },
    image: "/images/projects/chat-app.webp",
    category: "realtime",
    categories: ["realtime", "fullstack"],
    previewUrl: "https://chat-app-nest-next-api-nine.vercel.app",
    technologies: [
      "Next.js",
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "BullMQ",
      "WebSocket",
      "WebRTC",
    ],
    features: {
      en: [
        "Real-time messaging with WebSocket communication",
        "Video calls and screen sharing via WebRTC signaling",
        "Online/offline user presence tracking",
        "Workspace management with multi-tenant architecture",
        "PostgreSQL database with Prisma ORM",
        "Redis caching and BullMQ background jobs",
        "Role-based access control (RBAC) permissions",
        "Audit logs and thread replies",
      ],
      vi: [
        "Nhắn tin thời gian thực qua giao thức WebSocket",
        "Gọi video và chia sẻ màn hình qua cơ chế WebRTC signaling",
        "Theo dõi trạng thái online/offline của người dùng",
        "Quản lý không gian làm việc với kiến trúc multi-tenant",
        "Cơ sở dữ liệu PostgreSQL sử dụng Prisma ORM",
        "Bộ đệm Redis và xử lý hàng đợi tác vụ ngầm với BullMQ",
        "Hệ thống phân quyền truy cập theo vai trò (RBAC)",
        "Ghi nhật ký kiểm toán và tính năng phản hồi theo luồng",
      ],
    },
    liveUrl: "https://chat-app-nest-next-api-nine.vercel.app/",
    githubUrl: "https://github.com/Enbidi77",
    architecture: [
      {
        label: "Client Layer",
        layer: "Presentation",
        protocol: "HTTPS / WSS",
        description: {
          en: "Next.js App Router, React 19, Tailwind CSS, Lucide Icons",
          vi: "Next.js App Router, React 19, Tailwind CSS, Lucide Icons",
        },
      },
      {
        label: "API Gateway & Edge SSR",
        layer: "Gateway",
        protocol: "HTTP/2 REST & WebSocket Proxy",
        description: {
          en: "Next.js Route Handlers, JWT Session Validation, Rate Limiting",
          vi: "Next.js Route Handlers, Xác thực phiên JWT, Giới hạn tần suất gọi",
        },
      },
      {
        label: "NestJS Microservices Core",
        layer: "Services",
        protocol: "TCP Microservices / WebRTC Signaling",
        description: {
          en: "Auth Service, Chat Gateway, Room Signaling, BullMQ Worker",
          vi: "Auth Service, Chat Gateway, WebRTC Signaling, Xử lý hàng đợi BullMQ",
        },
      },
      {
        label: "Persistence & In-Memory Data",
        layer: "Data Store",
        protocol: "PostgreSQL & Redis Cluster",
        description: {
          en: "PostgreSQL via Prisma ORM, Redis Pub/Sub & BullMQ job queues",
          vi: "PostgreSQL qua Prisma ORM, Redis Pub/Sub & hàng đợi BullMQ",
        },
      },
    ],
    challenges: {
      en: [
        "Implementing reliable real-time communication across multiple clients",
        "Designing a scalable multi-tenant architecture",
        "Managing WebRTC signaling for video calls and screen sharing",
      ],
      vi: [
        "Đảm bảo đường truyền giao tiếp thời gian thực ổn định trên quy mô nhiều client",
        "Thiết kế kiến trúc multi-tenant cô lập dữ liệu an toàn",
        "Xử lý quá trình WebRTC signaling phục vụ gọi video và chia sẻ màn hình",
      ],
    },
    solutions: {
      en: [
        "Used WebSocket with Redis Pub/Sub for horizontal scaling",
        "Implemented workspace-based data isolation with RBAC",
        "Built a custom WebRTC signaling server with NestJS gateways",
      ],
      vi: [
        "Kết hợp WebSocket với Redis Pub/Sub hỗ trợ mở rộng hệ thống theo chiều ngang",
        "Phân tách dữ liệu theo không gian làm việc kết hợp phân quyền RBAC",
        "Xây dựng máy chủ WebRTC signaling tùy chỉnh với NestJS Gateway",
      ],
    },
  },
  {
    id: "social-media",
    slug: "social-media",
    title: {
      en: "Personal Social Media Application",
      vi: "Ứng dụng mạng xã hội cá nhân",
    },
    shortDescription: {
      en: "A full-featured social media platform with real-time messaging, Elasticsearch search, and microservices architecture.",
      vi: "Nền tảng mạng xã hội đầy đủ tính năng với nhắn tin thời gian thực, tìm kiếm toàn văn Elasticsearch và kiến trúc microservices.",
    },
    fullDescription: {
      en: "A modern social media application featuring JWT authentication, real-time messaging via WebSocket, Redis Pub/Sub for event broadcasting, and Elasticsearch for full-text search. Built with a microservices architecture and a responsive Tailwind CSS interface.",
      vi: "Ứng dụng mạng xã hội hiện đại tích hợp xác thực JWT, nhắn tin thời gian thực qua WebSocket, Redis Pub/Sub điều phối sự kiện và Elasticsearch tìm kiếm dữ liệu toàn văn. Xây dựng theo kiến trúc microservices cùng giao diện Tailwind CSS trực quan.",
    },
    image: "/images/projects/social-media.webp",
    category: "realtime",
    categories: ["realtime", "fullstack"],
    previewUrl: "https://gallery-web-app-psi.vercel.app",
    technologies: [
      "Next.js",
      "NestJS",
      "TypeScript",
      "Redis",
      "Elasticsearch",
      "WebSocket",
      "Tailwind CSS",
    ],
    features: {
      en: [
        "JWT authentication and authorization",
        "Real-time messaging with WebSocket",
        "Redis Pub/Sub for event broadcasting",
        "Elasticsearch full-text search",
        "Responsive Tailwind CSS interface",
        "Microservices architecture",
      ],
      vi: [
        "Xác thực và phân quyền người dùng bằng JWT",
        "Nhắn tin tức thì với WebSocket",
        "Phát tán sự kiện qua Redis Pub/Sub",
        "Tìm kiếm toàn văn nâng cao với Elasticsearch",
        "Giao diện người dùng tối ưu trên mọi thiết bị với Tailwind CSS",
        "Kiến trúc dịch vụ vi mô (microservices)",
      ],
    },
    liveUrl: "https://gallery-web-app-psi.vercel.app/",
    githubUrl: "https://github.com/Enbidi77",
    architecture: [
      {
        label: "Client Frontend",
        layer: "Presentation",
        protocol: "HTTPS / WebSocket",
        description: {
          en: "Next.js responsive SPA with Tailwind CSS & Framer Motion",
          vi: "Giao diện SPA Next.js với Tailwind CSS & Framer Motion",
        },
      },
      {
        label: "Backend Gateway",
        layer: "Gateway",
        protocol: "REST API & JWT Auth",
        description: {
          en: "NestJS modular backend with token authentication & routing",
          vi: "Backend NestJS theo module tích hợp xác thực token & định tuyến",
        },
      },
      {
        label: "Event & Search Pipeline",
        layer: "Services",
        protocol: "Redis Pub/Sub & Elasticsearch Indexing",
        description: {
          en: "Real-time feed distribution and instant search engine",
          vi: "Phân phối bảng tin thời gian thực và máy chủ tìm kiếm siêu tốc",
        },
      },
      {
        label: "Storage & Cache Tier",
        layer: "Data Store",
        protocol: "SQL & Redis Memory",
        description: {
          en: "Relational persistence with Redis multi-level caching",
          vi: "Lưu trữ quan hệ bền vững kết hợp bộ nhớ đệm đa tầng Redis",
        },
      },
    ],
    challenges: {
      en: [
        "Handling massive real-time feed fan-out updates across followers",
        "Implementing low-latency fuzzy search across millions of posts",
      ],
      vi: [
        "Xử lý phân phối cập nhật bảng tin thời gian thực tới lượng lớn follower",
        "Đạt độ trễ tìm kiếm cực thấp trên khối lượng bài viết lớn với Elasticsearch",
      ],
    },
    solutions: {
      en: [
        "Implemented Redis Pub/Sub event broadcasting for active feeds",
        "Configured Elasticsearch inverted indices with custom n-gram tokenizers",
      ],
      vi: [
        "Ứng dụng Redis Pub/Sub phát tán sự kiện tức thì cho bảng tin trực tiếp",
        "Cấu hình inverted index trên Elasticsearch với custom tokenizers n-gram",
      ],
    },
  },
  {
    id: "exchange-rate",
    slug: "exchange-rate",
    title: {
      en: "USD/JPY Exchange Rate Prediction",
      vi: "Hệ thống dự báo tỷ giá USD/JPY",
    },
    shortDescription: {
      en: "A web application that predicts USD/JPY exchange rate movements using historical market data.",
      vi: "Ứng dụng web dự báo biến động tỷ giá hối đoái USD/JPY dựa trên phân tích dữ liệu thị trường lịch sử.",
    },
    fullDescription: {
      en: "An analytical web application that leverages historical market data to predict USD/JPY exchange rate movements. The system features a Spring Boot backend for data processing and prediction models, a Vue.js frontend for interactive visualization, Docker containerization for consistent deployments, and GitLab CI/CD for automated pipelines.",
      vi: "Ứng dụng phân tích tài chính sử dụng dữ liệu lịch sử để dự đoán xu hướng tỷ giá USD/JPY. Hệ thống sử dụng Spring Boot làm backend xử lý dữ liệu và mô hình dự báo, Vue.js hiển thị biểu đồ trực quan tương tác, Docker đóng gói ứng dụng và GitLab CI/CD tự động hóa quy trình triển khai.",
    },
    image: "/images/projects/exchange-rate.webp",
    category: "fullstack",
    categories: ["fullstack"],
    previewUrl: "https://exchange-rate.duynguyen.dev",
    technologies: [
      "Spring Boot",
      "Vue.js",
      "Docker",
      "GitLab CI/CD",
      "Java",
    ],
    features: {
      en: [
        "Spring Boot backend with prediction models",
        "Vue.js interactive frontend",
        "Docker containerization",
        "GitLab CI/CD automated pipelines",
        "Historical data analysis and visualization",
      ],
      vi: [
        "Backend Spring Boot tích hợp mô hình tính toán dự báo",
        "Frontend Vue.js với biểu đồ phân tích tương tác mượt mà",
        "Đóng gói môi trường đồng nhất bằng Docker container",
        "Quy trình tự động hóa kiểm thử và triển khai GitLab CI/CD",
        "Phân tích và biểu diễn trực quan dữ liệu thị trường",
      ],
    },
    githubUrl: "https://github.com/Enbidi77",
    architecture: [
      {
        label: "Visualization UI",
        layer: "Presentation",
        protocol: "HTTPS REST",
        description: {
          en: "Vue.js reactive dashboard with interactive financial charts",
          vi: "Giao diện dashboard Vue.js với biểu đồ tài chính tương tác",
        },
      },
      {
        label: "Core API Service",
        layer: "Application",
        protocol: "Spring Boot REST",
        description: {
          en: "Spring Boot microservice with quantitative predictive algorithms",
          vi: "Microservice Spring Boot tích hợp thuật toán dự báo định lượng",
        },
      },
      {
        label: "CI/CD & Container Orchestration",
        layer: "DevOps",
        protocol: "Docker & GitLab CI/CD",
        description: {
          en: "Automated test runner, container image builds and delivery",
          vi: "Tự động hóa kiểm thử, đóng gói container Docker và phân phối",
        },
      },
      {
        label: "Market Data Lake",
        layer: "Data Store",
        protocol: "Time-Series Query Engine",
        description: {
          en: "Historical FX market data persistence and metrics cache",
          vi: "Lưu trữ dữ liệu lịch sử thị trường ngoại hối và bộ nhớ cache chỉ số",
        },
      },
    ],
    challenges: {
      en: [
        "Ensuring low compute latency when processing historical exchange tick data",
        "Standardizing multi-stage builds and automated deployment across pipelines",
      ],
      vi: [
        "Tối ưu thời gian tính toán mô hình định lượng trên chuỗi dữ liệu tick lịch sử",
        "Chuẩn hóa quy trình multi-stage build và tự động hóa triển khai trên pipeline",
      ],
    },
    solutions: {
      en: [
        "Optimized numerical linear algebra routines and multi-threaded calculations",
        "Containerized using multi-stage Dockerfiles with GitLab CI caching",
      ],
      vi: [
        "Tối ưu các hàm tính toán đại số tuyến tính và xử lý đa luồng trên Spring Boot",
        "Đóng gói Docker multi-stage kết hợp bộ đệm cache trên GitLab CI",
      ],
    },
  },
  {
    id: "vehicle-rental",
    slug: "vehicle-rental",
    title: {
      en: "Vehicle Rental Management System",
      vi: "Hệ thống quản lý cho thuê phương tiện",
    },
    shortDescription: {
      en: "A comprehensive vehicle tracking and rental management application with serverless backend functions.",
      vi: "Ứng dụng quản lý và định vị phương tiện cho thuê toàn diện trên nền tảng backend Serverless.",
    },
    fullDescription: {
      en: "A vehicle tracking and rental management system built with a serverless architecture. Features include a robust backend API, PostgreSQL database design for complex relationships, AWS Lambda for serverless functions, AWS SQS for message queuing, and an Angular frontend for fleet management.",
      vi: "Hệ thống quản lý vận hành và giám sát đội xe cho thuê xây dựng trên nền tảng serverless. Ứng dụng bao gồm RESTful API, thiết kế cơ sở dữ liệu PostgreSQL quan hệ chặt chẽ, AWS Lambda xử lý tác vụ phi máy chủ, AWS SQS hàng đợi tin nhắn và giao diện Angular quản lý toàn diện.",
    },
    image: "/images/projects/vehicle-rental.webp",
    category: "enterprise",
    categories: ["enterprise", "fullstack"],
    previewUrl: "https://rental-fleet.duynguyen.dev",
    technologies: [
      "Angular",
      "PostgreSQL",
      "AWS Lambda",
      "AWS SQS",
      "Node.js",
    ],
    features: {
      en: [
        "Backend API development with serverless functions",
        "PostgreSQL database design for complex relationships",
        "AWS Lambda for event-driven processing",
        "AWS SQS for asynchronous message queuing",
        "Angular frontend for fleet management",
      ],
      vi: [
        "Phát triển backend API dựa trên kiến trúc Serverless",
        "Thiết kế cơ sở dữ liệu PostgreSQL cho các quan hệ thực thể phức tạp",
        "AWS Lambda xử lý hướng sự kiện linh hoạt",
        "AWS SQS điều phối hàng đợi tin nhắn bất đồng bộ",
        "Giao diện Angular quản trị đội xe tiện lợi",
      ],
    },
    githubUrl: "https://github.com/Enbidi77",
    architecture: [
      {
        label: "Fleet Operator Portal",
        layer: "Presentation",
        protocol: "HTTPS",
        description: {
          en: "Angular single page application for dispatchers and fleet managers",
          vi: "Ứng dụng Angular quản trị đội xe và điều phối hành trình",
        },
      },
      {
        label: "Serverless Compute",
        layer: "Compute",
        protocol: "AWS API Gateway & Lambda",
        description: {
          en: "On-demand Node.js micro-functions handling rental lifecycles",
          vi: "Hàm phi máy chủ Node.js trên AWS Lambda xử lý vòng đời thuê xe",
        },
      },
      {
        label: "Message Queue Pipeline",
        layer: "Messaging",
        protocol: "AWS SQS Asynchronous Events",
        description: {
          en: "Decoupled queue system for rental confirmations & billing jobs",
          vi: "Hàng đợi bất đồng bộ xử lý xác nhận đặt xe và hóa đơn tự động",
        },
      },
      {
        label: "Relational Database",
        layer: "Data Store",
        protocol: "PostgreSQL Connection Pool",
        description: {
          en: "Relational schema modeling complex vehicle, customer, and booking entities",
          vi: "Cơ sở dữ liệu PostgreSQL mô hình hóa các quan hệ xe, khách hàng và đơn thuê",
        },
      },
    ],
    challenges: {
      en: [
        "Managing cold starts in AWS Lambda for bursty booking requests",
        "Ensuring idempotent transaction processing for payment and vehicle booking states",
      ],
      vi: [
        "Kiểm soát hiện tượng cold start trên AWS Lambda khi lượng yêu cầu đặt xe tăng đột biến",
        "Đảm bảo tính bất biến (idempotent) khi xử lý trạng thái thanh toán và khóa xe",
      ],
    },
    solutions: {
      en: [
        "Configured Lambda provisioned concurrency and lightweight bundle trees",
        "Employed SQS FIFO queues with unique idempotency keys",
      ],
      vi: [
        "Cấu hình provisioned concurrency trên Lambda và tối ưu kích thước gói mã nguồn",
        "Sử dụng hàng đợi SQS FIFO kết hợp khóa định danh giao dịch duy nhất",
      ],
    },
  },
  {
    id: "loan-portal",
    slug: "loan-portal",
    title: {
      en: "Loan Portal",
      vi: "Cổng thông tin kết nối tài chính & vay vốn",
    },
    shortDescription: {
      en: "A platform helping brokers find suitable lenders for borrowers with advanced search and background job processing.",
      vi: "Nền tảng hỗ trợ chuyên viên môi giới tìm kiếm gói vay từ các tổ chức tín dụng phù hợp cho khách hàng.",
    },
    fullDescription: {
      en: "A brokerage platform designed to match borrowers with suitable lenders. Built with ASP.NET Core and featuring Elasticsearch for fast, faceted search across lender products, background job processing for data synchronization, third-party API integrations, and efficient data access via Dapper ORM and SQL stored procedures.",
      vi: "Nền tảng kết nối người vay với tổ chức tín dụng phù hợp. Hệ thống được xây dựng bằng ASP.NET Core, ứng dụng Elasticsearch cho khả năng tìm kiếm đa tiêu chí siêu tốc, xử lý đồng bộ dữ liệu ngầm, tích hợp API bên thứ ba và truy xuất dữ liệu tối ưu qua Dapper ORM cùng SQL Stored Procedure.",
    },
    image: "/images/projects/loan-portal.webp",
    category: "enterprise",
    categories: ["enterprise", "fullstack"],
    previewUrl: "https://broker-loans.duynguyen.dev",
    technologies: [
      "ASP.NET Core",
      "C#",
      "Elasticsearch",
      "Dapper",
      "SQL Server",
    ],
    features: {
      en: [
        "ASP.NET Core backend architecture",
        "Elasticsearch for fast, faceted search",
        "Background job processing",
        "Third-party API integrations",
        "Dapper ORM with SQL stored procedures",
      ],
      vi: [
        "Kiến trúc backend hiệu năng cao với ASP.NET Core",
        "Elasticsearch hỗ trợ tìm kiếm phân khúc đa tiêu chí nhanh chóng",
        "Xử lý tác vụ đồng bộ ngầm ổn định",
        "Tích hợp API dịch vụ tài chính bên thứ ba",
        "Tối ưu truy vấn dữ liệu với Dapper ORM và Stored Procedure",
      ],
    },
    githubUrl: "https://github.com/Enbidi77",
    architecture: [
      {
        label: "Loan Broker Interface",
        layer: "Presentation",
        protocol: "HTTPS / REST",
        description: {
          en: "Responsive web portal for brokers and loan applicant processing",
          vi: "Cổng thông tin web hỗ trợ môi giới và xử lý hồ sơ vay vốn",
        },
      },
      {
        label: "Enterprise API Layer",
        layer: "Backend",
        protocol: "ASP.NET Core Web API",
        description: {
          en: "C# backend services with high-throughput request pipelines",
          vi: "Dịch vụ C# backend xử lý luồng nghiệp vụ với thông lượng cao",
        },
      },
      {
        label: "Search & Third-Party Integrations",
        layer: "Search & Integration",
        protocol: "Elasticsearch & Banking APIs",
        description: {
          en: "Faceted loan product indexing and lender rating integrations",
          vi: "Chỉ mục tìm kiếm gói vay đa tiêu chí và tích hợp API ngân hàng",
        },
      },
      {
        label: "Database & Stored Procedures",
        layer: "Data Store",
        protocol: "SQL Server & Dapper ORM",
        description: {
          en: "High-performance stored procedures and optimized queries via Dapper",
          vi: "Tối ưu hóa truy vấn và Stored Procedure tốc độ cao qua Dapper ORM",
        },
      },
    ],
    challenges: {
      en: [
        "Aggregating hundreds of dynamic bank loan products with custom filtering rules",
        "Executing sub-50ms database queries over large loan applicant history records",
      ],
      vi: [
        "Tổng hợp hàng trăm gói vay tài chính với các điều kiện xét duyệt phức tạp",
        "Duy trì thời gian phản hồi truy vấn dưới 50ms trên lịch sử hồ sơ vay lớn",
      ],
    },
    solutions: {
      en: [
        "Built faceted Elasticsearch indices synchronized via background workers",
        "Authored hand-tuned SQL Server stored procedures called via lightweight Dapper ORM",
      ],
      vi: [
        "Xây dựng chỉ mục tìm kiếm Elasticsearch đồng bộ định kỳ qua Background Worker",
        "Trực tiếp tinh chỉnh Stored Procedure trên SQL Server kết hợp Dapper ORM",
      ],
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug || p.id === slug);
}
